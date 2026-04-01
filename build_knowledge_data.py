# -*- coding: utf-8 -*-
"""从 _kb_extract.txt 生成 knowledge-data.js（需先运行 docx 提取到 D:\\cursorwenjian\\_kb_extract.txt）"""
import json
import re
import html

SRC = r"D:\cursorwenjian\_kb_extract.txt"
OUT = r"D:\cursorwenjian\ai-nav-site\knowledge-data.js"


def clean(s: str) -> str:
    if not s:
        return ""
    s = s.replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    s = html.unescape(s)
    return s.strip()


def paragraphs(s: str) -> str:
    """按句拆成段落，避免单段过长。"""
    s = clean(s)
    parts = [p for p in s.split("。") if p.strip()]
    chunks = []
    buf = []
    for p in parts:
        buf.append(p.strip() + "。")
        if len(buf) >= 5:
            chunks.append("".join(buf))
            buf = []
    if buf:
        chunks.append("".join(buf))
    return "\n\n".join(chunks)


def find_nth(hay: str, needle: str, n: int) -> int:
    """n=0 为首次出现，n=1 为第二次……"""
    pos = -1
    for _ in range(n + 1):
        pos = hay.find(needle, pos + 1)
        if pos < 0:
            return -1
    return pos


def slice_between(full: str, start: str, end: str | None, start_occurrence: int = 0) -> str:
    i = find_nth(full, start, start_occurrence) if start_occurrence else full.find(start)
    if i < 0:
        return ""
    a = i
    if end is None:
        return full[a:]
    j = full.find(end, a + len(start))
    if j < 0:
        return full[a:]
    return full[a:j]


def main():
    raw = open(SRC, encoding="utf-8").read()

    MD_STUB = (
        "\n\n---\n\n> **提示：** 本节在《AI使用知识库：零基础扫盲指南》Word 稿中标记为待更新；"
        "站点将随文档修订同步补充。\n"
    )

    # 正文切片（与 Word 结构一致）
    # 第二遍节标题与目录重复，除第一节外对「开始标记」取第二次出现（occurrence=1）
    blocks = {
        "sec01-what-is-ai": (
            "第一节：什么是AI？在当下",
            "第二节：AI的发展简史",
            "第一节：什么是 AI？",
            0,
        ),
        "sec02-ai-history": (
            "第二节：AI的发展简史",
            "第三节：AI能做什么？不能做什么（能力边界）",
            "第二节：AI 的发展简史",
            1,
        ),
        "sec03-ai-limits": (
            "第三节：AI能做什么？不能做什么（能力边界）",
            "第四节：AI会取代人类吗？",
            "第三节：AI 能做什么？不能做什么（能力边界）",
            1,
        ),
        "sec04-ai-jobs": (
            "第四节：AI会取代人类吗？",
            "第五节：常见AI误解和澄清",
            "第四节：AI 会取代人类吗？",
            1,
        ),
        "sec05-myths": (
            "第五节：常见AI误解和澄清",
            "第二章：AI产品全景图第六节：当前主流AI产品分类总览",
            "第五节：常见 AI 误解和澄清",
            0,
        ),
        "sec06-product-overview": (
            "第六节：当前主流AI产品分类总览",
            "第七节：对话类AI",
            "第六节：当前主流 AI 产品分类总览",
            0,
        ),
        "sec07-dialogue-ai": (
            "第七节：对话类AI",
            "第八节：图像生成AI等待更新",
            "第七节：对话类 AI",
            0,
        ),
        "sec12-coding-ai": (
            "第十二节：编程辅助AI",
            "第十三节：搜索类AI等待更新",
            "第十二节：编程辅助 AI",
            0,
        ),
    }

    extracted = {}
    for slug, (sta, end, md_title, occ) in blocks.items():
        body = slice_between(raw, sta, end, start_occurrence=occ)
        if not body:
            extracted[slug] = {"title": md_title, "md": "# " + md_title + "\n\n（正文未能从文档自动切片，请检查源文件。）"}
            continue
        # 去掉节标题行首重复（保留标题作为 #）
        inner = body
        for prefix in (sta, sta.replace("在当下", "")):
            if inner.startswith(prefix):
                inner = inner[len(prefix) :].lstrip("，。 \n")
                break
        md = "# " + md_title + "\n\n" + paragraphs(inner)
        extracted[slug] = {"title": md_title, "md": md}

    # 固定标题与文档一致
    titles_fix = {
        "sec01-what-is-ai": "第一节：什么是 AI？",
        "sec02-ai-history": "第二节：AI 的发展简史",
        "sec03-ai-limits": "第三节：AI 能做什么？不能做什么（能力边界）",
        "sec04-ai-jobs": "第四节：AI 会取代人类吗？",
        "sec05-myths": "第五节：常见 AI 误解和澄清",
        "sec06-product-overview": "第六节：当前主流 AI 产品分类总览",
        "sec07-dialogue-ai": "第七节：对话类 AI",
        "sec12-coding-ai": "第十二节：编程辅助 AI",
    }
    for slug, t in titles_fix.items():
        if slug in extracted:
            extracted[slug]["md"] = "# " + t + "\n\n" + extracted[slug]["md"].split("\n\n", 1)[-1]

    stub_sections = [
        ("sec08-image-ai", "第八节：图像生成 AI", "文档中本节标记为「等待更新」。"),
        ("sec09-video-ai", "第九节：视频生成 AI", "文档中本节标记为「等待更新」。"),
        ("sec10-audio-ai", "第十节：音频/音乐 AI", "文档中本节标记为「等待更新」。"),
        ("sec11-office-ai", "第十一节：办公效率 AI", "文档中本节标记为「等待更新」。"),
        ("sec13-search-ai", "第十三节：搜索类 AI", "文档中本节标记为「等待更新」。"),
        ("sec14-design-ai", "第十四节：设计类 AI", "文档中本节标记为「等待更新」。"),
        ("sec15-digital-human", "第十五节：数字人/语音克隆 AI", "文档中本节标记为「等待更新」。"),
        ("sec16-cn-vs-global", "第十六节：国内 AI VS 国外 AI 对比", "文档中本节标记为「等待更新」。"),
        ("sec17-2026-list", "第十七节：2026 年 AI 产品推荐清单", "文档中本节标记为「待更新」。"),
    ]

    def stub_md(title: str, note: str) -> str:
        return f"# {title}\n\n> {note}" + MD_STUB

    lines = []
    lines.append("/**")
    lines.append(" * AI 使用知识库 — 与《AI使用知识库：零基础扫盲指南》Word 稿对齐（自动由 build_knowledge_data.py 生成）")
    lines.append(" */")
    lines.append("(function () {")
    lines.append("  const MD_STUB = " + json.dumps(MD_STUB, ensure_ascii=False) + ";")
    lines.append("  window.KNOWLEDGE_CHAPTERS = [")

    # Chapter 0
    lines.append("    {")
    lines.append('      id: "ch0",')
    lines.append('      title: "第一章：AI 基础认知",')
    lines.append("      sections: [")
    for slug in [
        "sec01-what-is-ai",
        "sec02-ai-history",
        "sec03-ai-limits",
        "sec04-ai-jobs",
        "sec05-myths",
    ]:
        ex = extracted[slug]
        lines.append("        {")
        lines.append(f'          slug: {json.dumps(slug)},')
        lines.append(f'          title: {json.dumps(titles_fix[slug], ensure_ascii=False)},')
        lines.append('          status: "published",')
        lines.append(f'          excerpt: {json.dumps(ex["md"][:120].replace(chr(10), " "), ensure_ascii=False)},')
        lines.append(f'          markdown: {json.dumps(ex["md"], ensure_ascii=False)},')
        lines.append("        },")
    lines.append("      ],")
    lines.append("    },")

    # Chapter 1 — 产品全景
    lines.append("    {")
    lines.append('      id: "ch1",')
    lines.append('      title: "第二章：AI 产品全景图",')
    lines.append("      sections: [")

    lines.append("        {")
    lines.append('          slug: "sec06-product-overview",')
    lines.append(f'          title: {json.dumps(titles_fix["sec06-product-overview"], ensure_ascii=False)},')
    lines.append('          status: "published",')
    lines.append(
        f'          excerpt: {json.dumps(extracted["sec06-product-overview"]["md"][:120].replace(chr(10), " "), ensure_ascii=False)},'
    )
    lines.append(f'          markdown: {json.dumps(extracted["sec06-product-overview"]["md"], ensure_ascii=False)},')
    lines.append("        },")

    lines.append("        {")
    lines.append('          slug: "sec07-dialogue-ai",')
    lines.append(f'          title: {json.dumps(titles_fix["sec07-dialogue-ai"], ensure_ascii=False)},')
    lines.append('          status: "published",')
    lines.append(
        f'          excerpt: {json.dumps(extracted["sec07-dialogue-ai"]["md"][:120].replace(chr(10), " "), ensure_ascii=False)},'
    )
    lines.append(f'          markdown: {json.dumps(extracted["sec07-dialogue-ai"]["md"], ensure_ascii=False)},')
    lines.append("        },")

    for slug, title, note in stub_sections:
        if slug in ("sec08-image-ai", "sec09-video-ai", "sec10-audio-ai", "sec11-office-ai"):
            sm = stub_md(title, note)
            lines.append("        {")
            lines.append(f'          slug: {json.dumps(slug)},')
            lines.append(f'          title: {json.dumps(title, ensure_ascii=False)},')
            lines.append('          status: "stub",')
            lines.append(f'          excerpt: {json.dumps(note, ensure_ascii=False)},')
            lines.append(f'          markdown: {json.dumps(sm, ensure_ascii=False)},')
            lines.append("        },")

    lines.append("        {")
    lines.append('          slug: "sec12-coding-ai",')
    lines.append(f'          title: {json.dumps(titles_fix["sec12-coding-ai"], ensure_ascii=False)},')
    lines.append('          status: "published",')
    lines.append(
        f'          excerpt: {json.dumps(extracted["sec12-coding-ai"]["md"][:120].replace(chr(10), " "), ensure_ascii=False)},'
    )
    lines.append(f'          markdown: {json.dumps(extracted["sec12-coding-ai"]["md"], ensure_ascii=False)},')
    lines.append("        },")

    for slug, title, note in stub_sections:
        if slug.startswith("sec13") or slug.startswith("sec14") or slug.startswith("sec15") or slug.startswith("sec16") or slug.startswith("sec17"):
            sm = stub_md(title, note)
            lines.append("        {")
            lines.append(f'          slug: {json.dumps(slug)},')
            lines.append(f'          title: {json.dumps(title, ensure_ascii=False)},')
            lines.append('          status: "stub",')
            lines.append(f'          excerpt: {json.dumps(note, ensure_ascii=False)},')
            lines.append(f'          markdown: {json.dumps(sm, ensure_ascii=False)},')
            lines.append("        },")

    lines.append("      ],")
    lines.append("    },")

    # Chapter 2 — 核心概念（文档后部多为目录占位，保留 stub）
    lines.append("    {")
    lines.append('      id: "ch2",')
    lines.append('      title: "第三章：核心概念扫盲（零术语门槛）",')
    lines.append("      sections: [")
    concept_stubs = [
        ("sec18-llm", "第十八节：什么是「大语言模型」？", "文档后续章节待导入。"),
        ("sec19-prompt", "第十九节：什么是「提示词/Prompt」", "文档后续章节待导入。"),
        ("sec20-token", "第二十节：什么是 Token？", "文档后续章节待导入。"),
    ]
    for slug, title, note in concept_stubs:
        lines.append("        {")
        lines.append(f'          slug: {json.dumps(slug)},')
        lines.append(f'          title: {json.dumps(title, ensure_ascii=False)},')
        lines.append('          status: "stub",')
        lines.append(f'          excerpt: {json.dumps(note, ensure_ascii=False)},')
        lines.append(f'          markdown: {json.dumps(stub_md(title, note), ensure_ascii=False)},')
        lines.append("        },")
    lines.append("      ],")
    lines.append("    },")

    lines.append("    {")
    lines.append('      id: "ch3",')
    lines.append('      title: "第四章：快速上手篇",')
    lines.append("      sections: [")
    lines.append("        {")
    lines.append('          slug: "sec38-overview",')
    lines.append('          title: "第三十八节：快速上手篇概述",')
    lines.append('          status: "stub",')
    lines.append('          excerpt: "文档后续章节待导入。",')
    lines.append(f'          markdown: {json.dumps(stub_md("第三十八节：快速上手篇概述", "文档后续章节待导入。"), ensure_ascii=False)},')
    lines.append("        },")
    lines.append("        {")
    lines.append('          slug: "sec39-network",')
    lines.append('          title: "第三十九节：网络环境",')
    lines.append('          status: "stub",')
    lines.append('          excerpt: "文档后续章节待导入。",')
    lines.append(f'          markdown: {json.dumps(stub_md("第三十九节：网络环境", "文档后续章节待导入。"), ensure_ascii=False)},')
    lines.append("        },")
    lines.append("      ],")
    lines.append("    },")

    lines.append("    {")
    lines.append('      id: "appendix",')
    lines.append('      title: "第八章：附录",')
    lines.append("      sections: [")
    lines.append("        {")
    lines.append('          slug: "appendix-faq",')
    lines.append('          title: "常见问题 FAQ",')
    lines.append('          status: "stub",')
    lines.append(f'          markdown: {json.dumps(stub_md("常见问题 FAQ", "文档附录待导入。"), ensure_ascii=False)},')
    lines.append('          excerpt: "附录待导入。",')
    lines.append("        },")
    lines.append("        {")
    lines.append('          slug: "appendix-glossary",')
    lines.append('          title: "附录 D：术语表",')
    lines.append('          status: "stub",')
    lines.append(f'          markdown: {json.dumps(stub_md("附录 D：术语表", "文档附录待导入。"), ensure_ascii=False)},')
    lines.append('          excerpt: "附录待导入。",')
    lines.append("        },")
    lines.append("      ],")
    lines.append("    },")

    lines.append("  ];")
    lines.append("})();")

    out = "\n".join(lines)
    open(OUT, "w", encoding="utf-8").write(out)
    print("Wrote", OUT, "chars", len(out))


if __name__ == "__main__":
    main()
