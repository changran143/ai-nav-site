/**
 * AI 使用知识库 - 章节数据（静态站演示版）
 * 与《网站更新需求文档》第三章结构对齐；完整内容与「待更新」占位并存
 */
(function () {
  const MD_STUB = "\n\n---\n\n> **提示：** 本节内容待补充，可参考《AI 使用知识库_零基础扫盲指南》文档后续导入。\n";

  window.KNOWLEDGE_CHAPTERS = [
    {
      id: "ch1",
      title: "第一章：AI 工具全景图",
      sections: [
        {
          slug: "sec07-dialogue-ai",
          title: "第七节：对话类 AI",
          status: "published",
          excerpt: "对话类大模型能做什么、常见产品与使用建议。",
          markdown:
            "# 第七节：对话类 AI\n\n" +
            "对话类 AI（Chat / 助手）是目前最普及的 AI 形态，通过自然语言完成问答、写作、编程辅助等任务。\n\n" +
            "## 典型能力\n\n" +
            "- 多轮对话与上下文理解\n" +
            "- 代码生成与解释\n" +
            "- 摘要、翻译、润色\n\n" +
            "## 使用示例\n\n" +
            "```text\n" +
            "请用三条要点总结下面文章的核心观点：\n" +
            "（粘贴正文）\n" +
            "```\n\n" +
            "## 表格示例\n\n" +
            "| 产品 | 特点 |\n" +
            "|------|------|\n" +
            "| ChatGPT | 生态成熟、插件丰富 |\n" +
            "| Claude | 长文本、推理强 |\n\n" +
            "> 选择工具时建议结合：**数据隐私**、**是否需翻墙**、**团队预算**。\n",
        },
        {
          slug: "sec08-image-ai",
          title: "第八节：图像生成 AI",
          status: "stub",
          excerpt: "文生图、图生图与常见工作流。",
          markdown: "# 第八节：图像生成 AI" + MD_STUB,
        },
        {
          slug: "sec09-video-ai",
          title: "第九节：视频生成 AI",
          status: "stub",
          excerpt: "文生视频、剪辑类 AI 概览。",
          markdown: "# 第九节：视频生成 AI" + MD_STUB,
        },
        {
          slug: "sec10-audio-ai",
          title: "第十节：音频/音乐 AI",
          status: "stub",
          excerpt: "TTS、音乐生成与配音。",
          markdown: "# 第十节：音频/音乐 AI" + MD_STUB,
        },
        {
          slug: "sec11-office-ai",
          title: "第十一节：办公效率 AI",
          status: "stub",
          excerpt: "文档、表格、邮件与会议场景。",
          markdown: "# 第十一节：办公效率 AI" + MD_STUB,
        },
        {
          slug: "sec12-coding-ai",
          title: "第十二节：编程辅助 AI",
          status: "published",
          excerpt: "IDE 插件、代码补全与 AI 编程最佳实践。",
          markdown:
            "# 第十二节：编程辅助 AI\n\n" +
            "编程辅助类工具通常以 **IDE 插件** 或 **独立编辑器** 形式出现，在写代码时提供补全、重构与解释。\n\n" +
            "## 示例：读取 JSON 的 Python 片段\n\n" +
            "```python\n" +
            "import json\n" +
            "from pathlib import Path\n\n" +
            "def load_config(path: str) -> dict:\n" +
            "    return json.loads(Path(path).read_text(encoding=\"utf-8\"))\n" +
            "```\n\n" +
            "## 示例：前端 fetch\n\n" +
            "```javascript\n" +
            "async function fetchJson(url) {\n" +
            "  const res = await fetch(url);\n" +
            "  if (!res.ok) throw new Error(res.statusText);\n" +
            "  return res.json();\n" +
            "}\n" +
            "```\n\n" +
            "建议：**敏感代码不上传公网模型**；企业场景优先选用支持私有部署或合规渠道的产品。\n",
        },
        {
          slug: "sec13-search-ai",
          title: "第十三节：搜索类 AI",
          status: "stub",
          excerpt: "AI 搜索与联网问答。",
          markdown: "# 第十三节：搜索类 AI" + MD_STUB,
        },
        {
          slug: "sec14-design-ai",
          title: "第十四节：设计类 AI",
          status: "stub",
          excerpt: "UI/UX、海报与品牌设计辅助。",
          markdown: "# 第十四节：设计类 AI" + MD_STUB,
        },
        {
          slug: "sec15-digital-human",
          title: "第十五节：数字人/语音克隆 AI",
          status: "stub",
          excerpt: "数字人、语音合成与合规注意。",
          markdown: "# 第十五节：数字人/语音克隆 AI" + MD_STUB,
        },
        {
          slug: "sec16-cn-vs-global",
          title: "第十六节：国内 AI VS 国外 AI 对比",
          status: "stub",
          excerpt: "能力、访问方式与选型。",
          markdown: "# 第十六节：国内 AI VS 国外 AI 对比" + MD_STUB,
        },
        {
          slug: "sec17-2026-list",
          title: "第十七节：2026 年 AI 产品推荐清单",
          status: "stub",
          excerpt: "持续更新的工具清单。",
          markdown: "# 第十七节：2026 年 AI 产品推荐清单" + MD_STUB,
        },
      ],
    },
    {
      id: "ch2",
      title: "第二章：核心概念扫盲",
      sections: [
        {
          slug: "sec18-llm",
          title: "第十八节：什么是「大语言模型」？",
          status: "stub",
          excerpt: "LLM 基本概念。",
          markdown: "# 第十八节：什么是「大语言模型」？" + MD_STUB,
        },
        {
          slug: "sec19-prompt",
          title: "第十九节：什么是「提示词/Prompt」",
          status: "stub",
          excerpt: "Prompt 结构与写作技巧。",
          markdown: "# 第十九节：什么是「提示词/Prompt」" + MD_STUB,
        },
        {
          slug: "sec20-token",
          title: "第二十节：什么是 Token？",
          status: "stub",
          excerpt: "计费与上下文窗口。",
          markdown: "# 第二十节：什么是 Token？" + MD_STUB,
        },
      ],
    },
    {
      id: "ch3",
      title: "第三章：快速上手篇",
      sections: [
        {
          slug: "sec38-overview",
          title: "第三十八节：快速上手篇概述",
          status: "stub",
          excerpt: "学习路径总览。",
          markdown: "# 第三十八节：快速上手篇概述" + MD_STUB,
        },
        {
          slug: "sec39-network",
          title: "第三十九节：网络环境",
          status: "stub",
          excerpt: "访问国外服务时的网络与安全提示。",
          markdown: "# 第三十九节：网络环境" + MD_STUB,
        },
      ],
    },
    {
      id: "appendix",
      title: "第八章：附录",
      sections: [
        {
          slug: "appendix-faq",
          title: "常见问题 FAQ",
          status: "stub",
          excerpt: "高频问题整理。",
          markdown: "# 常见问题 FAQ" + MD_STUB,
        },
        {
          slug: "appendix-glossary",
          title: "附录 D：术语表",
          status: "stub",
          excerpt: "AI 相关术语速查。",
          markdown: "# 术语表" + MD_STUB,
        },
      ],
    },
  ];
})();
