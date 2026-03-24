const tools = [
  { name: "ChatGPT", category: "AI 对话", desc: "通用 AI 助手，适合写作、编程、学习和问答。", url: "https://chatgpt.com/" },
  { name: "Claude", category: "AI 对话", desc: "擅长长文处理与结构化输出。", url: "https://claude.ai/" },
  { name: "Gemini", category: "AI 对话", desc: "Google 的多模态 AI 助手。", url: "https://gemini.google.com/" },
  { name: "豆包", category: "AI 对话", desc: "字节系 AI 对话助手。", url: "https://www.doubao.com/" },
  { name: "Gork", category: "AI 对话", desc: "按你要求加入的对话工具。", url: "https://x.ai/" },
  { name: "文心一言", category: "AI 对话", desc: "百度推出的对话大模型应用。", url: "https://yiyan.baidu.com/" },
  { name: "Kimi", category: "AI 对话", desc: "擅长长上下文处理和信息整理。", url: "https://kimi.moonshot.cn/" },
  { name: "智谱清言", category: "AI 对话", desc: "智谱推出的 AI 对话助手。", url: "https://chatglm.cn/" },

  { name: "Midjourney", category: "AI 绘画", desc: "高质量文生图工具。", url: "https://www.midjourney.com/" },
  { name: "Stable Diffusion", category: "AI 绘画", desc: "开源生态强，风格可控性高。", url: "https://stability.ai/" },
  { name: "吐司", category: "AI 绘画", desc: "按你要求加入的 AI 绘画平台。", url: "https://tusiart.com/" },
  { name: "即梦", category: "AI 绘画", desc: "字节系图像/创意生成平台。", url: "https://jimeng.jianying.com/" },
  { name: "可灵", category: "AI 绘画", desc: "可用于图像和视频创作。", url: "https://klingai.com/" },
  { name: "堆友", category: "AI 绘画", desc: "设计与创意素材社区工具。", url: "https://d.design/" },

  { name: "Runway", category: "AI 视频", desc: "AI 视频生成与编辑平台。", url: "https://runwayml.com/" },
  { name: "Pika", category: "AI 视频", desc: "适合快速做短视频内容。", url: "https://pika.art/" },
  { name: "可灵", category: "AI 视频", desc: "支持文本转视频等能力。", url: "https://klingai.com/" },
  { name: "海螺", category: "AI 视频", desc: "按你要求加入的视频工具。", url: "https://hailuoai.com/" },
  { name: "Vidu", category: "AI 视频", desc: "文生视频平台。", url: "https://www.vidu.studio/" },
  { name: "TAPNOW", category: "AI 视频", desc: "按你要求加入的视频工具。", url: "https://tapnow.ai/" },

  { name: "Cursor", category: "AI 编程", desc: "面向开发者的 AI IDE。", url: "https://www.cursor.com/" },
  { name: "VS Code", category: "AI 编程", desc: "开发者常用编辑器，可搭配多种 AI 插件。", url: "https://code.visualstudio.com/" },
  { name: "OpenClaw", category: "AI 自动化", desc: "开源智能体/自动化工作流方向工具。", url: "https://github.com/" },
  { name: "n8n", category: "AI 自动化", desc: "低代码自动化流程平台。", url: "https://n8n.io/" }
];

const state = {
  keyword: "",
  category: "全部"
};

const TICKET_API_URL = "https://penguin-ai-ticket.xuhaoliebiao.workers.dev";
const RECEIVER_EMAIL = "18562703379@163.com";

const searchInput = document.getElementById("searchInput");
const categoryTabs = document.getElementById("categoryTabs");
const toolGrid = document.getElementById("toolGrid");
const resultMeta = document.getElementById("resultMeta");
const themeToggle = document.getElementById("themeToggle");
const ticketForm = document.getElementById("ticketForm");
const ticketStatus = document.getElementById("ticketStatus");
const emailFallback = document.getElementById("emailFallback");

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

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "切换深色";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "切换浅色";
  }
  localStorage.setItem("site-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("site-theme") || "dark";
  applyTheme(saved);
  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
  });
}

function buildMailtoLink(formData) {
  const subject = `【企鹅AI基地工单】${formData.title}`;
  const body = [
    `称呼：${formData.name}`,
    `联系方式：${formData.contact}`,
    "",
    "需求内容：",
    formData.content
  ].join("\n");
  return `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function submitTicketToApi(formData) {
  if (!TICKET_API_URL) return false;
  const response = await fetch(TICKET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  return response.ok;
}

function initTicketForm() {
  if (RECEIVER_EMAIL) {
    emailFallback.href = `mailto:${RECEIVER_EMAIL}`;
  } else {
    emailFallback.textContent = "邮件提交（请先配置邮箱）";
  }

  ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById("ticketName").value.trim(),
      contact: document.getElementById("ticketContact").value.trim(),
      title: document.getElementById("ticketTitle").value.trim(),
      content: document.getElementById("ticketContent").value.trim()
    };

    if (!formData.name || !formData.contact || !formData.title || !formData.content) {
      ticketStatus.textContent = "请把信息填写完整。";
      return;
    }

    ticketStatus.textContent = "正在提交...";
    try {
      const ok = await submitTicketToApi(formData);
      if (ok) {
        ticketStatus.textContent = "提交成功，已通过安全中转发送。";
        ticketForm.reset();
        return;
      }
      if (RECEIVER_EMAIL) {
        window.location.href = buildMailtoLink(formData);
        ticketStatus.textContent = "中转接口未配置，已切换到邮件发送。";
      } else {
        ticketStatus.textContent = "未配置中转接口和邮箱，请先在 script.js 里配置。";
      }
    } catch (error) {
      if (RECEIVER_EMAIL) {
        window.location.href = buildMailtoLink(formData);
        ticketStatus.textContent = "中转发送失败，已切换到邮件发送。";
      } else {
        ticketStatus.textContent = "提交失败：请检查中转接口或邮箱配置。";
      }
    }
  });
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
initTheme();
initTicketForm();
renderTabs();
renderCards();
