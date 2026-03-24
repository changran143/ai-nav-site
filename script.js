const tools = [
  {
    name: "ChatGPT",
    category: "AI 对话",
    desc: "通用 AI 助手，适合写作、编程、学习和问答。",
    url: "https://chatgpt.com/"
  },
  {
    name: "Claude",
    category: "AI 对话",
    desc: "擅长长文处理与结构化输出，适合文档与代码任务。",
    url: "https://claude.ai/"
  },
  {
    name: "Gemini",
    category: "AI 对话",
    desc: "Google 的多模态助手，可用于搜索、创作和分析。",
    url: "https://gemini.google.com/"
  },
  {
    name: "Midjourney",
    category: "AI 绘图",
    desc: "高质量文生图工具，常用于设计灵感和视觉素材生成。",
    url: "https://www.midjourney.com/"
  },
  {
    name: "Stable Diffusion Web",
    category: "AI 绘图",
    desc: "开源生态强，风格可控性高，适合进阶图像生成。",
    url: "https://stability.ai/"
  },
  {
    name: "Runway",
    category: "AI 视频",
    desc: "AI 视频生成与编辑平台，支持文本转视频。",
    url: "https://runwayml.com/"
  },
  {
    name: "Pika",
    category: "AI 视频",
    desc: "快速生成短视频内容，适合自媒体创作。",
    url: "https://pika.art/"
  },
  {
    name: "Notion AI",
    category: "效率办公",
    desc: "文档写作、总结、改写一体化，提升团队协作效率。",
    url: "https://www.notion.so/product/ai"
  },
  {
    name: "Perplexity",
    category: "AI 搜索",
    desc: "带来源引用的 AI 搜索问答工具，适合做信息调研。",
    url: "https://www.perplexity.ai/"
  },
  {
    name: "GitHub Copilot",
    category: "AI 编程",
    desc: "代码补全与智能建议，提升开发效率。",
    url: "https://github.com/features/copilot"
  },
  {
    name: "Cursor",
    category: "AI 编程",
    desc: "面向开发者的 AI IDE，支持代码理解和自动修改。",
    url: "https://www.cursor.com/"
  },
  {
    name: "飞书妙记",
    category: "效率办公",
    desc: "会议转写与总结助手，适合整理沟通纪要。",
    url: "https://www.feishu.cn/"
  }
];

const state = {
  keyword: "",
  category: "全部"
};

const searchInput = document.getElementById("searchInput");
const categoryTabs = document.getElementById("categoryTabs");
const toolGrid = document.getElementById("toolGrid");
const resultMeta = document.getElementById("resultMeta");

function getCategories() {
  const set = new Set(tools.map((t) => t.category));
  return ["全部", ...Array.from(set)];
}

function renderTabs() {
  const categories = getCategories();
  categoryTabs.innerHTML = categories
    .map((c) => {
      const cls = c === state.category ? "tab active" : "tab";
      return `<button class="${cls}" data-category="${c}">${c}</button>`;
    })
    .join("");
}

function filterTools() {
  const key = state.keyword.trim().toLowerCase();
  return tools.filter((t) => {
    const matchCategory = state.category === "全部" || t.category === state.category;
    const matchKeyword =
      key.length === 0 ||
      t.name.toLowerCase().includes(key) ||
      t.desc.toLowerCase().includes(key) ||
      t.category.toLowerCase().includes(key);
    return matchCategory && matchKeyword;
  });
}

function renderCards() {
  const list = filterTools();
  resultMeta.textContent = `共 ${list.length} 条结果`;
  if (list.length === 0) {
    toolGrid.innerHTML = '<div class="empty">没有找到结果，换个关键词试试。</div>';
    return;
  }
  toolGrid.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <h3>${item.name}</h3>
        <span class="tag">${item.category}</span>
        <p class="desc">${item.desc}</p>
        <a class="link" href="${item.url}" target="_blank" rel="noopener noreferrer">访问官网 →</a>
      </article>
    `
    )
    .join("");
}

searchInput.addEventListener("input", (e) => {
  state.keyword = e.target.value;
  renderCards();
});

categoryTabs.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-category]");
  if (!btn) return;
  state.category = btn.dataset.category;
  renderTabs();
  renderCards();
});

document.getElementById("year").textContent = new Date().getFullYear();
renderTabs();
renderCards();
