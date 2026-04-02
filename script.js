/**
 * 企鹅AI基地 - 增强版主脚本
 * 功能：工具展示/搜索/筛选/排序、工具详情弹窗、提交工具、会员推广、邮件订阅、深浅主题等
 */

/* ========== 工具数据（按需求文档扩展字段） ========== */
const tools = [
  // ---- AI 对话 ----
  { id:"chatgpt", name:"ChatGPT", logo:"💬", category:"AI 对话", tags:["聊天","写作","编程"],
    desc:"OpenAI 出品的通用 AI 助手，支持文字对话、代码生成、文档写作和多模态交互，全球用户量最大的 AI 应用。",
    pricing:"freemium", priceRange:"免费 / Plus $20/月", url:"https://chatgpt.com/",
    affiliateLink:"https://chatgpt.com/", rating:4.8, reviewCount:12840, isFeatured:true },
  { id:"claude", name:"Claude", logo:"🧠", category:"AI 对话", tags:["长文","分析","编程"],
    desc:"Anthropic 出品，擅长超长文档处理、深度分析与结构化输出，编程和学术写作能力突出。",
    pricing:"freemium", priceRange:"免费 / Pro $20/月", url:"https://claude.ai/",
    affiliateLink:"https://claude.ai/", rating:4.7, reviewCount:6520, isFeatured:true },
  { id:"gemini", name:"Gemini", logo:"✨", category:"AI 对话", tags:["多模态","搜索","Google"],
    desc:"Google 推出的多模态 AI 助手，深度整合搜索引擎，支持文字、图片、代码多种交互。",
    pricing:"freemium", priceRange:"免费 / Advanced $19.99/月", url:"https://gemini.google.com/",
    affiliateLink:"https://gemini.google.com/", rating:4.5, reviewCount:8300, isFeatured:false },
  { id:"doubao", name:"豆包", logo:"🫘", category:"AI 对话", tags:["中文","日常","字节"],
    desc:"字节跳动推出的 AI 对话助手，中文体验优秀，适合日常问答和创作。",
    pricing:"free", priceRange:"免费", url:"https://www.doubao.com/",
    affiliateLink:"", rating:4.3, reviewCount:5120, isFeatured:false },
  { id:"grok", name:"Grok", logo:"⚡", category:"AI 对话", tags:["实时","Twitter","xAI"],
    desc:"xAI 推出的对话模型，接入 X（Twitter）实时数据，风格幽默直接。",
    pricing:"freemium", priceRange:"免费 / Premium 含 X 会员", url:"https://x.ai/",
    affiliateLink:"", rating:4.2, reviewCount:3200, isFeatured:false },
  { id:"wenxin", name:"文心一言", logo:"📝", category:"AI 对话", tags:["百度","中文","搜索"],
    desc:"百度推出的对话式大模型应用，中文语料丰富，适合国内用户日常使用。",
    pricing:"free", priceRange:"免费", url:"https://yiyan.baidu.com/",
    affiliateLink:"", rating:4.1, reviewCount:7600, isFeatured:false },
  { id:"kimi", name:"Kimi", logo:"🌙", category:"AI 对话", tags:["长上下文","整理","月之暗面"],
    desc:"月之暗面出品，支持超长上下文对话，擅长文档解读和信息整理。",
    pricing:"free", priceRange:"免费", url:"https://kimi.moonshot.cn/",
    affiliateLink:"", rating:4.4, reviewCount:4800, isFeatured:false },
  { id:"zhipu", name:"智谱清言", logo:"🔮", category:"AI 对话", tags:["GLM","学术","中文"],
    desc:"智谱 AI 推出的对话助手，基于 GLM 大模型，学术和知识问答能力突出。",
    pricing:"free", priceRange:"免费", url:"https://chatglm.cn/",
    affiliateLink:"", rating:4.2, reviewCount:3100, isFeatured:false },

  // ---- AI 绘画 ----
  { id:"midjourney", name:"Midjourney", logo:"🎨", category:"AI 绘画", tags:["文生图","高质量","艺术"],
    desc:"业界顶级的文生图工具，以极高的艺术质感和风格多样性著称，适合设计师和创意工作者。",
    pricing:"paid", priceRange:"$10-$120/月", url:"https://www.midjourney.com/",
    affiliateLink:"https://www.midjourney.com/", rating:4.9, reviewCount:15200, isFeatured:true },
  { id:"sd", name:"Stable Diffusion", logo:"🖼️", category:"AI 绘画", tags:["开源","本地部署","可控"],
    desc:"开源图像生成模型，拥有庞大的社区生态和丰富的 LoRA/ControlNet 扩展，风格高度可控。",
    pricing:"free", priceRange:"免费（开源）", url:"https://stability.ai/",
    affiliateLink:"", rating:4.6, reviewCount:9800, isFeatured:false },
  { id:"tusi", name:"吐司 Tusi", logo:"🍞", category:"AI 绘画", tags:["中文","社区","模型"],
    desc:"国内 AI 绘画模型分享平台，提供海量模型和在线生图服务。",
    pricing:"freemium", priceRange:"免费 / 会员制", url:"https://tusiart.com/",
    affiliateLink:"", rating:4.3, reviewCount:4200, isFeatured:false },
  { id:"jimeng", name:"即梦", logo:"💭", category:"AI 绘画", tags:["字节","创意","图像"],
    desc:"字节跳动旗下图像和创意生成平台，支持多种风格的 AI 绘图。",
    pricing:"freemium", priceRange:"免费额度 / 付费", url:"https://jimeng.jianying.com/",
    affiliateLink:"", rating:4.2, reviewCount:3600, isFeatured:false },
  { id:"kling-draw", name:"可灵", logo:"🌈", category:"AI 绘画", tags:["快手","图像","视频"],
    desc:"快手推出的 AI 创作平台，支持图像生成与视频创作。",
    pricing:"freemium", priceRange:"免费额度 / 付费", url:"https://klingai.com/",
    affiliateLink:"", rating:4.4, reviewCount:5100, isFeatured:false },
  { id:"ddesign", name:"堆友", logo:"🎯", category:"AI 绘画", tags:["设计","素材","3D"],
    desc:"阿里推出的设计与创意素材社区工具，支持 AI 辅助设计。",
    pricing:"freemium", priceRange:"免费 / Pro", url:"https://d.design/",
    affiliateLink:"", rating:4.1, reviewCount:2800, isFeatured:false },

  // ---- AI 视频 ----
  { id:"runway", name:"Runway", logo:"🎬", category:"AI 视频", tags:["视频生成","编辑","Gen-3"],
    desc:"领先的 AI 视频生成与编辑平台，Gen-3 Alpha 模型生成效果惊艳，好莱坞级制作质量。",
    pricing:"freemium", priceRange:"免费 / $12-$76/月", url:"https://runwayml.com/",
    affiliateLink:"https://runwayml.com/", rating:4.7, reviewCount:7400, isFeatured:true },
  { id:"pika", name:"Pika", logo:"⚡", category:"AI 视频", tags:["短视频","快速","创意"],
    desc:"AI 视频生成工具，适合快速制作创意短视频内容。",
    pricing:"freemium", priceRange:"免费额度 / $8/月起", url:"https://pika.art/",
    affiliateLink:"", rating:4.5, reviewCount:5600, isFeatured:false },
  { id:"hailuo", name:"海螺 AI", logo:"🐚", category:"AI 视频", tags:["MiniMax","视频","中文"],
    desc:"MiniMax 推出的 AI 视频生成工具，支持文本生成视频。",
    pricing:"freemium", priceRange:"免费额度 / 付费", url:"https://hailuoai.com/",
    affiliateLink:"", rating:4.3, reviewCount:3900, isFeatured:false },
  { id:"vidu", name:"Vidu", logo:"📹", category:"AI 视频", tags:["文生视频","中文","生数科技"],
    desc:"生数科技推出的文生视频平台，国产视频生成模型代表。",
    pricing:"freemium", priceRange:"免费额度 / 付费", url:"https://www.vidu.studio/",
    affiliateLink:"", rating:4.2, reviewCount:2400, isFeatured:false },
  { id:"tapnow", name:"TAPNOW", logo:"👆", category:"AI 视频", tags:["视频","创作","AI"],
    desc:"AI 驱动的视频创作工具。",
    pricing:"freemium", priceRange:"免费额度 / 付费", url:"https://tapnow.ai/",
    affiliateLink:"", rating:4.0, reviewCount:1800, isFeatured:false },

  // ---- AI 编程 ----
  { id:"cursor", name:"Cursor", logo:"⌨️", category:"AI 编程", tags:["IDE","代码","AI辅助"],
    desc:"AI 原生的代码编辑器，内置 GPT-4/Claude，支持智能补全、对话式编程和代码重构。",
    pricing:"freemium", priceRange:"免费 / Pro $20/月", url:"https://cursor.com/",
    affiliateLink:"https://cursor.com/", rating:4.8, reviewCount:6800, isFeatured:true },
  { id:"vscode", name:"VS Code", logo:"💻", category:"AI 编程", tags:["编辑器","插件","微软"],
    desc:"微软开源编辑器，搭配 GitHub Copilot 等 AI 插件，开发者必备工具。",
    pricing:"free", priceRange:"免费", url:"https://code.visualstudio.com/",
    affiliateLink:"", rating:4.7, reviewCount:18500, isFeatured:false },
  { id:"github-copilot", name:"GitHub Copilot", logo:"🤖", category:"AI 编程", tags:["补全","GitHub","AI"],
    desc:"GitHub 推出的 AI 代码助手，实时补全和建议代码，大幅提升编程效率。",
    pricing:"paid", priceRange:"$10/月", url:"https://github.com/features/copilot",
    affiliateLink:"", rating:4.6, reviewCount:11200, isFeatured:false },

  // ---- AI 自动化 ----
  { id:"openclaw", name:"OpenClaw", logo:"🦀", category:"AI 自动化", tags:["智能体","工作流","开源"],
    desc:"开源智能体与自动化工作流平台，支持构建和部署 AI Agent。",
    pricing:"free", priceRange:"免费（开源）", url:"https://openclaw.ai/",
    affiliateLink:"", rating:4.1, reviewCount:1200, isFeatured:false },
  { id:"n8n", name:"n8n", logo:"🔗", category:"AI 自动化", tags:["低代码","流程","集成"],
    desc:"开源低代码自动化平台，支持 400+ 应用集成，可视化编排工作流。",
    pricing:"freemium", priceRange:"免费(自托管) / Cloud €20/月", url:"https://n8n.io/",
    affiliateLink:"", rating:4.5, reviewCount:4300, isFeatured:false },
  { id:"zapier", name:"Zapier", logo:"⚙️", category:"AI 自动化", tags:["自动化","集成","SaaS"],
    desc:"全球最流行的 SaaS 自动化平台，支持 6000+ 应用互联互通。",
    pricing:"freemium", priceRange:"免费 / $19.99/月起", url:"https://zapier.com/",
    affiliateLink:"", rating:4.4, reviewCount:8900, isFeatured:false },

  // ---- AI 音频 ----
  { id:"elevenlabs", name:"ElevenLabs", logo:"🎙️", category:"AI 音频", tags:["语音","TTS","克隆"],
    desc:"顶级 AI 语音合成平台，支持语音克隆、多语言配音，音质近乎真人。",
    pricing:"freemium", priceRange:"免费 / $5-$99/月", url:"https://elevenlabs.io/",
    affiliateLink:"https://elevenlabs.io/", rating:4.7, reviewCount:5400, isFeatured:false },
  { id:"suno", name:"Suno", logo:"🎵", category:"AI 音频", tags:["音乐","作曲","歌曲"],
    desc:"AI 音乐生成平台，输入文字即可生成完整歌曲（含歌词、旋律、演唱）。",
    pricing:"freemium", priceRange:"免费 / Pro $10/月", url:"https://suno.com/",
    affiliateLink:"", rating:4.6, reviewCount:7200, isFeatured:false },

  // ---- AI 写作 ----
  { id:"notion-ai", name:"Notion AI", logo:"📓", category:"AI 写作", tags:["笔记","知识库","写作"],
    desc:"Notion 内置的 AI 写作助手，支持总结、续写、翻译和头脑风暴。",
    pricing:"paid", priceRange:"$10/月（附加）", url:"https://www.notion.so/product/ai",
    affiliateLink:"", rating:4.5, reviewCount:6100, isFeatured:false },
  { id:"jasper", name:"Jasper", logo:"✏️", category:"AI 写作", tags:["营销","文案","SEO"],
    desc:"面向营销团队的 AI 写作工具，擅长广告文案、社交媒体内容和 SEO 文章。",
    pricing:"paid", priceRange:"$49/月起", url:"https://www.jasper.ai/",
    affiliateLink:"https://www.jasper.ai/", rating:4.3, reviewCount:4500, isFeatured:false },

  // ---- 数据分析 ----
  { id:"julius", name:"Julius AI", logo:"📊", category:"数据分析", tags:["数据","可视化","分析"],
    desc:"AI 数据分析助手，上传数据即可自动生成图表、洞察和报告。",
    pricing:"freemium", priceRange:"免费 / Pro $20/月", url:"https://julius.ai/",
    affiliateLink:"", rating:4.4, reviewCount:2900, isFeatured:false },
];

/* ========== 全局状态 ========== */
const state = {
  keyword: "",
  category: "全部",
  sort: "featured", // featured | newest | rating | reviews
  currentPage: "home", // home | tools | knowledge | market | premium | submit | about | user | admin
  favorites: JSON.parse(localStorage.getItem("penguin-favorites") || "[]"),
  detailTool: null,

  // 演示版用户/会员/订单/评论/提交记录（纯前端本地存储）
  user: JSON.parse(localStorage.getItem("penguin-user") || "null"),
  premiumLevel: localStorage.getItem("penguin-premium-level") || "free", // free | month | year
  toolReviews: JSON.parse(localStorage.getItem("penguin-tool-reviews") || "[]"),
  submissions: JSON.parse(localStorage.getItem("penguin-submissions") || "[]"),
  orders: JSON.parse(localStorage.getItem("penguin-orders") || "[]"),
};

const TICKET_API_URL = "https://penguin-ai-ticket.xuhaoliebiao.workers.dev";
const RECEIVER_EMAIL = "18562703379@163.com";

/* ========== DOM 缓存 ========== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const AUTH_USER_KEY = "penguin-user";
const AUTH_PREMIUM_KEY = "penguin-premium-level";
const REVIEWS_KEY = "penguin-tool-reviews";
const SUBMISSIONS_KEY = "penguin-submissions";
const ORDERS_KEY = "penguin-orders";

function isLoggedIn() {
  return !!state.user;
}

function isAdmin() {
  return state.user && state.user.role === "ADMIN";
}

function hasPremium() {
  return state.premiumLevel && state.premiumLevel !== "free";
}

function getOfficialLink(t) {
  return t.officialLink || t.url || "";
}

function getAffiliateLink(t) {
  return t.affiliateLink || "";
}

function persistUser() {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(state.user));
}

function persistPremium() {
  localStorage.setItem(AUTH_PREMIUM_KEY, state.premiumLevel);
}

function persistReviews() {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(state.toolReviews));
}

function persistSubmissions() {
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(state.submissions));
}

function persistOrders() {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
}

/* ========== 工具函数 ========== */
function getCategories() {
  const set = new Set(tools.map(t => t.category));
  return ["全部", ...Array.from(set)];
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(Math.max(0, empty - (half ? 0 : 0)));
}

function pricingBadge(pricing) {
  const map = { free:"免费", freemium:"免费增值", paid:"付费" };
  const cls = { free:"badge-free", freemium:"badge-freemium", paid:"badge-paid" };
  return `<span class="pricing-badge ${cls[pricing] || ''}">${map[pricing] || pricing}</span>`;
}

function formatCount(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

function getToolReviews(toolId) {
  return state.toolReviews.filter(r => r.toolId === toolId);
}

function getToolStats(t) {
  const baseCount = Number(t.reviewCount || 0);
  const baseRating = Number(t.rating || 0);
  const baseTotal = baseRating * baseCount;

  const list = getToolReviews(t.id);
  const addedCount = list.length;
  const addedTotal = list.reduce((s, r) => s + Number(r.rating || 0), 0);

  const count = baseCount + addedCount;
  if (!count) return { rating: 0, reviewCount: 0 };
  const rating = (baseTotal + addedTotal) / count;
  return { rating: Math.round(rating * 10) / 10, reviewCount: count };
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "\"": return "&quot;";
      case "'": return "&#39;";
      default: return ch;
    }
  });
}

function isFav(id) {
  return state.favorites.includes(id);
}

function toggleFav(id) {
  if (!isLoggedIn()) {
    openAuth("login");
    return false;
  }
  const idx = state.favorites.indexOf(id);
  if (idx >= 0) state.favorites.splice(idx, 1);
  else state.favorites.push(id);
  localStorage.setItem("penguin-favorites", JSON.stringify(state.favorites));
  return true;
}

/* ========== 筛选 & 排序 ========== */
function filterAndSort() {
  const key = state.keyword.trim().toLowerCase();
  let list = tools.filter(t => {
    const matchCat = state.category === "全部" || t.category === state.category;
    const matchKey = !key
      || t.name.toLowerCase().includes(key)
      || t.desc.toLowerCase().includes(key)
      || t.category.toLowerCase().includes(key)
      || t.tags.some(tag => tag.toLowerCase().includes(key));
    return matchCat && matchKey;
  });

  switch(state.sort) {
    case "rating":   list.sort((a, b) => getToolStats(b).rating - getToolStats(a).rating); break;
    case "reviews":  list.sort((a, b) => getToolStats(b).reviewCount - getToolStats(a).reviewCount); break;
    case "newest":   list.sort((a,b) => tools.indexOf(a) - tools.indexOf(b)); break;
    case "featured":
    default:
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || getToolStats(b).rating - getToolStats(a).rating);
      break;
  }
  return list;
}

/* ========== 渲染：工具卡片 ========== */
function renderToolCard(t) {
  const stats = getToolStats(t);
  return `
  <article class="tool-card ${t.isFeatured ? 'featured' : ''}" data-id="${t.id}">
    ${t.isFeatured ? '<div class="featured-ribbon">推荐</div>' : ''}
    <div class="card-header">
      <div class="card-logo">${t.logo}</div>
      <div class="card-title-wrap">
        <h3 class="card-title">${t.name}</h3>
        <div class="card-rating">
          <span class="stars">${stars(stats.rating)}</span>
          <span class="rating-num">${stats.rating}</span>
          <span class="review-count">(${formatCount(stats.reviewCount)})</span>
        </div>
      </div>
      <button class="fav-btn ${isFav(t.id)?'active':''}" data-fav="${t.id}" title="收藏">
        ${isFav(t.id) ? '❤️' : '🤍'}
      </button>
    </div>
    <div class="card-tags">
      ${pricingBadge(t.pricing)}
      ${t.tags.slice(0,3).map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
    </div>
    <p class="card-desc">${t.desc}</p>
    <div class="card-footer">
      <button class="btn-detail" data-detail="${t.id}">查看详情</button>
      <a class="btn-visit" href="${getAffiliateLink(t) || getOfficialLink(t)}" target="_blank" rel="noopener noreferrer">
        前往官网 <span class="arrow">→</span>
      </a>
    </div>
  </article>`;
}

/* ========== 渲染：分类标签 ========== */
function renderCategoryTabs() {
  const el = $("#categoryTabs");
  if (!el) return;
  const cats = getCategories();
  el.innerHTML = cats.map(c =>
    `<button class="cat-tab ${c === state.category ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
}

/* ========== 渲染：排序按钮 ========== */
function renderSortBtns() {
  const el = $("#sortBtns");
  if (!el) return;
  const sorts = [
    { val:"featured", label:"推荐" },
    { val:"rating", label:"评分最高" },
    { val:"reviews", label:"最热门" },
    { val:"newest", label:"最新" },
  ];
  el.innerHTML = sorts.map(s =>
    `<button class="sort-btn ${s.val === state.sort ? 'active' : ''}" data-sort="${s.val}">${s.label}</button>`
  ).join('');
}

/* ========== 渲染：工具列表 ========== */
function renderToolGrid() {
  const grid = $("#toolGrid");
  const meta = $("#resultMeta");
  if (!grid) return;
  const list = filterAndSort();
  if (meta) meta.textContent = `共发现 ${list.length} 个 AI 工具`;
  if (list.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>没有找到匹配的工具，试试换个关键词？</p></div>';
    return;
  }
  grid.innerHTML = list.map(renderToolCard).join('');
}

/* ========== 渲染：首页精选工具（仅展示推荐） ========== */
function renderFeaturedTools() {
  const el = $("#featuredGrid");
  if (!el) return;
  const featured = tools.filter(t => t.isFeatured).slice(0, 6);
  el.innerHTML = featured.map(renderToolCard).join('');
}

/* ========== 知识库（静态数据 + Markdown；无评论） ========== */
const KNOWLEDGE_LS_COLLAPSE = "knowledge-sidebar-collapsed";
const KNOWLEDGE_LS_CHAPTER = "knowledge-chapter-open-";

function getKnowledgeChapters() {
  return window.KNOWLEDGE_CHAPTERS || [];
}

function flattenKnowledgeSections() {
  const list = [];
  getKnowledgeChapters().forEach(ch => {
    ch.sections.forEach(sec => {
      list.push({ ...sec, chapterId: ch.id, chapterTitle: ch.title });
    });
  });
  return list;
}

function findSectionBySlug(slug) {
  return flattenKnowledgeSections().find(s => s.slug === slug);
}

function getPrevNext(slug) {
  const list = flattenKnowledgeSections();
  const i = list.findIndex(s => s.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
  };
}

function renderMarkdownToHtml(md) {
  if (typeof marked === "undefined") return `<p>Markdown 组件未加载，请检查网络后刷新。</p>`;
  try {
    const raw = marked.parse(md || "", { async: false });
    return typeof raw === "string" ? raw : String(raw);
  } catch (e) {
    return `<p>内容渲染失败。</p>`;
  }
}

function highlightKnowledgeCode() {
  const body = $("#knowledgeArticleBody");
  if (!body || !window.Prism) return;
  body.querySelectorAll("pre code").forEach(el => {
    try {
      Prism.highlightElement(el);
    } catch (_) {}
  });
}

function renderKnowledgeArticle(slug) {
  const sec = findSectionBySlug(slug);
  const titleEl = $("#knowledgeArticleTitle");
  const excerptEl = $("#knowledgeArticleExcerpt");
  const breadcrumbEl = $("#knowledgeBreadcrumb");
  const bodyEl = $("#knowledgeArticleBody");
  const prevNextEl = $("#knowledgePrevNext");
  if (!bodyEl) return;
  if (!sec) {
    if (titleEl) titleEl.textContent = "未找到文章";
    bodyEl.innerHTML = "<p class=\"section-desc\">链接无效或文章未发布。</p>";
    return;
  }
  if (titleEl) titleEl.textContent = sec.title;
  if (excerptEl) excerptEl.textContent = sec.excerpt || "";
  if (breadcrumbEl) breadcrumbEl.textContent = `${sec.chapterTitle} · ${sec.title}`;

  bodyEl.innerHTML = renderMarkdownToHtml(sec.markdown || "");
  highlightKnowledgeCode();

  const { prev, next } = getPrevNext(slug);
  if (prevNextEl) {
    prevNextEl.innerHTML = `
      <div class="knowledge-prevnext-inner">
        ${prev
          ? `<button type="button" class="btn-outline knowledge-nav-btn" data-knowledge-slug="${prev.slug}">← 上一篇：${escapeHtml(prev.title)}</button>`
          : "<span class=\"knowledge-nav-placeholder\"></span>"}
        ${next
          ? `<button type="button" class="btn-outline knowledge-nav-btn" data-knowledge-slug="${next.slug}">下一篇：${escapeHtml(next.title)} →</button>`
          : "<span class=\"knowledge-nav-placeholder\"></span>"}
      </div>`;
  }
  $$(".knowledge-tree-link").forEach(a => {
    a.classList.toggle("is-active", a.dataset.knowledgeSlug === slug);
  });

  const h = `#knowledge/${slug}`;
  if (location.hash !== h) history.replaceState(null, "", h);
  updateKnowledgeReadingProgress();
}

function renderKnowledgeTree() {
  const nav = $("#knowledgeTree");
  if (!nav) return;
  const chs = getKnowledgeChapters();
  nav.innerHTML = chs.map(ch => {
    const open = localStorage.getItem(KNOWLEDGE_LS_CHAPTER + ch.id) !== "0";
    return `
      <div class="knowledge-chapter" data-chapter-id="${ch.id}">
        <button type="button" class="knowledge-chapter-toggle" data-chapter-toggle="${ch.id}" aria-expanded="${open}">
          <span class="knowledge-chapter-icon">${open ? "▼" : "▶"}</span>
          <span class="knowledge-chapter-name">${escapeHtml(ch.title)}</span>
        </button>
        <div class="knowledge-section-list" ${open ? "" : "hidden"}>
          ${ch.sections.map(s => `
            <a href="#knowledge/${s.slug}" class="knowledge-tree-link" data-knowledge-slug="${s.slug}" data-nav-ignore="1">${escapeHtml(s.title)}</a>
          `).join("")}
        </div>
      </div>`;
  }).join("");
}

function getDefaultKnowledgeSlug() {
  const list = flattenKnowledgeSections();
  return list[0]?.slug || "";
}

function initKnowledgePage() {
  renderKnowledgeTree();
  // 确保侧边栏默认不收缩
  localStorage.setItem(KNOWLEDGE_LS_COLLAPSE, "0");
  applyKnowledgeSidebarCollapsed();
  bindKnowledgeScrollProgress();
  
  // 重新绑定知识库相关事件
  bindKnowledgeEvents();
  
  const slug = parseKnowledgeHash().slug || getDefaultKnowledgeSlug();
  if (slug) renderKnowledgeArticle(slug);
}

function bindKnowledgeEvents() {
  // Event listeners for knowledge sidebar elements are now handled in the main init() function.
  // This function is kept for potential future knowledge-specific event bindings if needed,
  // but it no longer re-binds the core sidebar toggle/collapse events.
}

function parseKnowledgeHash() {
  const h = (location.hash || "").replace(/^#/, "");
  if (h.startsWith("knowledge/")) {
    const slug = h.slice("knowledge/".length).split("/")[0];
    return { slug: slug || null };
  }
  return { slug: null };
}

function applyKnowledgeSidebarCollapsed() {
  const collapsed = localStorage.getItem(KNOWLEDGE_LS_COLLAPSE) === "1";
  const shell = document.querySelector(".knowledge-shell");
  const btn = $("#knowledgeCollapseBtn");
  const sidebar = $("#knowledgeSidebar");
  
  console.log("应用侧边栏状态:", { collapsed, shell: !!shell, btn: !!btn, sidebar: !!sidebar });
  
  if (shell) shell.classList.toggle("knowledge-shell--collapsed", collapsed);
  if (btn) btn.textContent = collapsed ? "⟩" : "⟨";
  
  // 强制确保桌面端侧边栏可见
  if (sidebar && window.innerWidth > 768) {
    sidebar.style.transform = "translateX(0)";
    sidebar.classList.remove("knowledge-sidebar--open");
    console.log("强制显示桌面端侧边栏");
  }
}

function updateKnowledgeReadingProgress() {
  const main = document.querySelector(".knowledge-main");
  const bar = $("#knowledgeReadingBar");
  if (!main || !bar) return;
  const max = main.scrollHeight - main.clientHeight;
  const p = max <= 0 ? 100 : Math.min(100, Math.round((main.scrollTop / max) * 100));
  bar.style.width = `${p}%`;
  bar.setAttribute("aria-valuenow", String(p));
}

function bindKnowledgeScrollProgress() {
  const main = document.querySelector(".knowledge-main");
  if (!main || main.dataset.knowledgeScrollBound) return;
  main.dataset.knowledgeScrollBound = "1";
  main.addEventListener("scroll", () => updateKnowledgeReadingProgress(), { passive: true });
}

/* ========== 渲染：首页统计数字 ========== */
function renderStats() {
  const cats = new Set(tools.map(t => t.category));
  const statNum = $$('.stat-number');
  if (statNum.length >= 3) {
    animateCounter(statNum[0], tools.length);
    animateCounter(statNum[1], cats.size);
    animateCounter(statNum[2], tools.reduce((s, t) => s + getToolStats(t).reviewCount, 0));
  }
}

function animateCounter(el, target) {
  const dur = 1200;
  const start = performance.now();
  const fmt = target >= 1000;
  function step(now) {
    const progress = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(ease * target);
    el.textContent = fmt ? formatCount(val) : val;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = fmt ? formatCount(target) : target;
  }
  requestAnimationFrame(step);
}

/* ========== 工具详情弹窗 ========== */
function showDetail(id) {
  const t = tools.find(x => x.id === id);
  if (!t) return;
  state.detailTool = id;
  const stats = getToolStats(t);

  const canComment = isLoggedIn();
  const currentUserName = state.user?.name || "游客";
  const reviews = getToolReviews(t.id)
    .slice()
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  const ratingOptionsHtml = [1, 2, 3, 4, 5].map(i => `<option value="${i}">${i} 星</option>`).join("");

  const reviewsHtml = reviews.length
    ? reviews.slice(0, 8).map(r => {
        const date = r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "";
        return `
          <div class="review-item">
            <div class="review-top">
              <span class="review-user">${escapeHtml(r.userName || "用户")}</span>
              <span class="review-date">${date}</span>
            </div>
            <div class="review-stars">${stars(Number(r.rating || 0))}</div>
            <div class="review-content">${escapeHtml(r.content || "")}</div>
          </div>
        `;
      }).join("")
    : `<p class="section-desc">暂无评论，成为第一个试用体验分享的人吧。</p>`;

  const modal = $("#detailModal");
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-overlay" data-close-modal>
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" data-close-modal>&times;</button>
        <div class="detail-header">
          <div class="detail-logo">${t.logo}</div>
          <div>
            <h2 class="detail-name">${t.name}</h2>
            <div class="detail-rating">
              <span class="stars">${stars(stats.rating)}</span>
              <span class="rating-num">${stats.rating}</span>
              <span class="review-count">${formatCount(stats.reviewCount)} 条评价</span>
            </div>
          </div>
        </div>
        <div class="detail-badges">
          ${pricingBadge(t.pricing)}
          <span class="detail-price">${t.priceRange}</span>
        </div>
        <div class="detail-tags">
          ${t.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
        </div>
        <div class="detail-section">
          <h3>工具介绍</h3>
          <p>${t.desc}</p>
        </div>
        <div class="detail-section">
          <h3>适用场景</h3>
          <p>适合 ${t.tags.join('、')} 相关场景使用，可大幅提升相关领域的工作效率。</p>
        </div>
        <div class="detail-ad-slot">广告位：优质 Affiliate 资源推荐（演示）</div>
        <div class="detail-section">
          <h3>用户评分与评论</h3>
          <div class="reviews-summary">
            <div class="reviews-summary-row">
              <span class="stars">${stars(stats.rating)}</span>
              <span class="rating-num">${stats.rating}</span>
              <span class="review-count">（${formatCount(stats.reviewCount)} 条评价）</span>
            </div>
          </div>

          <div class="reviews-list">
            ${reviewsHtml}
          </div>

          <div class="review-form">
            <h4 class="review-form-title">发表评论</h4>
            ${canComment
              ? ""
              : `<p class="review-login-hint">登录后可发表评论。演示：使用邮箱/手机号注册；显示名或账号为 <b>admin</b> 可获得后台权限。</p>`
            }
            <div class="review-form-row">
              <label class="review-label" for="reviewRating">评分</label>
              <select id="reviewRating" class="review-select" ${canComment ? "" : "disabled"}>${ratingOptionsHtml}</select>
            </div>
            <textarea id="reviewContent" rows="4" maxlength="500" placeholder="写下你的使用体验（最多 500 字）" ${canComment ? "" : "disabled"}></textarea>
            <div class="review-form-actions">
              <button type="button" class="btn-primary-lg" data-submit-review ${canComment ? "" : "disabled"}>提交评论</button>
              <p id="reviewStatus" class="form-status"></p>
            </div>
          </div>
        </div>
        <div class="detail-actions">
          <a class="btn-primary-lg" href="${getAffiliateLink(t) || getOfficialLink(t)}" target="_blank" rel="noopener noreferrer">
            🚀 立即试用
          </a>
          <a class="btn-secondary-lg" href="${getOfficialLink(t)}" target="_blank" rel="noopener noreferrer">
            🔗 访问官网
          </a>
          <button class="btn-fav-lg ${isFav(t.id)?'active':''}" data-fav="${t.id}">
            ${isFav(t.id) ? '❤️ 已收藏' : '🤍 收藏'}
          </button>
        </div>
        <div class="detail-section">
          <h3>相关工具推荐</h3>
          <div class="related-tools">
            ${tools.filter(x => x.category === t.category && x.id !== t.id).slice(0,3).map(r => `
              <div class="related-card" data-id="${r.id}">
                <span class="related-logo">${r.logo}</span>
                <span class="related-name">${r.name}</span>
                <span class="related-rating">${stars(getToolStats(r).rating).slice(0,3)} ${getToolStats(r).rating}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = $("#detailModal");
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function applyPremiumUI() {
  const level = state.premiumLevel || "free";
  const btns = $$("[data-premium]");
  btns.forEach(btn => {
    const target = btn.dataset.premium;
    const isCurrent = target === level;
    btn.disabled = isCurrent;
    btn.style.opacity = isCurrent ? "0.7" : "";
  });
}

function renderUserPage() {
  // 让页面在不刷新情况下也能拿到最新数据
  state.user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
  state.premiumLevel = localStorage.getItem(AUTH_PREMIUM_KEY) || "free";
  state.favorites = JSON.parse(localStorage.getItem("penguin-favorites") || "[]");
  state.orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

  const info = $("#userInfoText");
  const logoutBtn = $("#logoutBtn");
  const favoritesGrid = $("#favoritesGrid");
  const favoritesEmpty = $("#favoritesEmpty");
  const ordersList = $("#ordersList");
  if (!info) return;

  if (state.user) {
    const extra = [state.user.email, state.user.phone].filter(Boolean).join(" · ");
    info.textContent = `已登录：${state.user.name}（${state.user.role === "ADMIN" ? "管理员" : "用户"}）${extra ? " · " + extra : ""}`;
    if (logoutBtn) logoutBtn.style.display = "";
  } else {
    info.textContent = "未登录";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (favoritesGrid) {
    const favTools = state.favorites
      .map(id => tools.find(t => t.id === id))
      .filter(Boolean);
    favoritesGrid.innerHTML = favTools.map(renderToolCard).join("");
    if (favoritesEmpty) favoritesEmpty.style.display = favTools.length ? "none" : "";
  }

  if (ordersList) {
    const orders = state.orders || [];
    if (!orders.length) {
      ordersList.textContent = "暂无订单（演示）";
    } else {
      ordersList.innerHTML = orders
        .slice()
        .sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime())
        .map(o => {
          const amt = o.amount != null ? `¥${o.amount}` : "";
          return `<div class="section-desc" style="padding:8px 0;border-bottom:1px solid var(--border)">${escapeHtml(o.type || "order")} · ${amt} · ${escapeHtml(o.status || "")}</div>`;
        })
        .join("");
    }
  }
}

function renderAdminPage() {
  state.user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
  state.submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");

  const container = $("#submissionsList");
  if (!container) return;

  if (!isAdmin()) {
    container.innerHTML = "请先登录管理员账号（演示：用户名 <b>admin</b>）。";
    return;
  }

  const submissions = (state.submissions || []).slice().sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());
  if (!submissions.length) {
    container.textContent = "暂无工具提交记录。";
    return;
  }

  container.innerHTML = submissions.map(sub => {
    const statusLabel = sub.status === "approved" ? "✅ 已通过" : sub.status === "rejected" ? "❌ 已拒绝" : "⏳ 待审核";
    const logoPreview = sub.logoDataUrl ? `<img src="${sub.logoDataUrl}" alt="logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;margin-right:10px;" />` : "";
    const screenshotCount = Array.isArray(sub.screenshotsDataUrls) ? sub.screenshotsDataUrls.length : 0;
    return `
      <div class="admin-submission-item">
        <div class="admin-submission-head">
          <div class="admin-submission-title">
            ${logoPreview}
            <div>
              <div style="font-weight:800">${escapeHtml(sub.toolName || "未知工具")}</div>
              <div class="section-desc">分类：${escapeHtml(sub.toolCategory || "")} · 方案：${escapeHtml(sub.plan || "")} · 截图：${screenshotCount}</div>
            </div>
          </div>
          <div class="admin-submission-status">${statusLabel}</div>
        </div>
        <div class="admin-submission-body">
          <div class="section-desc">官网：<a href="${escapeHtml(sub.toolUrl || "")}" target="_blank" rel="noopener noreferrer">${escapeHtml(sub.toolUrl || "")}</a></div>
          <div class="section-desc">提交者：${escapeHtml(sub.submitterName || "游客")} · 联系：${escapeHtml(sub.toolContact || "")}</div>
          <div class="section-desc">简介：${escapeHtml(sub.toolDesc || "")}</div>
        </div>
        <div class="admin-submission-actions">
          <button class="btn-outline" data-admin-action="approve" data-sub-id="${sub.id}" type="button">通过</button>
          <button class="btn-outline" data-admin-action="reject" data-sub-id="${sub.id}" type="button">拒绝</button>
        </div>
      </div>
    `;
  }).join("");
}

function validatePasswordRule(pw) {
  if (!pw || String(pw).length < 8) return "密码至少 8 位";
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return "密码需同时包含字母与数字";
  return "";
}

function updateAdminNavVisibility() {
  state.user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
  const el = $("#navAdminLink");
  if (!el) return;
  el.hidden = !isAdmin();
}

function openAuth(mode) {
  const modal = $("#authModal");
  if (!modal) return;

  const realMode = mode === "register" ? "register" : "login";
  modal.innerHTML = `
    <div class="modal-overlay" data-close-auth>
      <div class="modal-content auth-modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" data-close-auth>&times;</button>
        <div class="detail-header">
          <div class="detail-logo">🔐</div>
          <div>
            <h2 class="detail-name">${realMode === "register" ? "注册账号" : "登录"}</h2>
            <div class="section-desc">静态站演示：无需 X(Twitter) 验证；对接后端后可使用邮箱/短信验证码。</div>
          </div>
        </div>

        <div class="auth-tabs">
          <button type="button" class="auth-tab ${realMode === "login" ? "active" : ""}" data-auth-switch="login">登录</button>
          <button type="button" class="auth-tab ${realMode === "register" ? "active" : ""}" data-auth-switch="register">注册</button>
        </div>

        <div class="detail-section auth-fields">
          <label class="auth-label" for="authIdentifier">邮箱或手机号</label>
          <input id="authIdentifier" type="text" placeholder="邮箱或 11 位手机号" autocomplete="username" required />

          <label class="auth-label" for="authPassword" style="margin-top:12px">密码</label>
          <input id="authPassword" type="password" placeholder="至少 8 位，含字母+数字" autocomplete="${realMode === "register" ? "new-password" : "current-password"}" required />

          ${realMode === "register" ? `
            <label class="auth-label" for="authPassword2" style="margin-top:12px">确认密码</label>
            <input id="authPassword2" type="password" placeholder="再次输入密码" autocomplete="new-password" required />
            <label class="auth-label" for="authCaptcha" style="margin-top:12px">验证码（演示）</label>
            <input id="authCaptcha" type="text" placeholder="任意 6 位数字" maxlength="6" required />
            <label class="auth-check">
              <input type="checkbox" id="authAgree" required />
              <span>我已阅读并同意 <a href="#" data-noop="1">用户协议</a> 与 <a href="#" data-noop="1">隐私政策</a></span>
            </label>
          ` : `
            <label class="auth-check auth-check--inline">
              <input type="checkbox" id="authRemember" />
              <span>记住我（演示：7 天 / 30 天）</span>
            </label>
            <select id="authRememberDays" class="auth-select" aria-label="免登录天数">
              <option value="7">7 天</option>
              <option value="30">30 天</option>
            </select>
            <button type="button" class="btn-text-link" id="authForgotBtn">忘记密码？</button>
          `}

          <label class="auth-label" for="authDisplayName" style="margin-top:12px">显示名称（可选）</label>
          <input id="authDisplayName" type="text" placeholder="站内展示名；管理员演示可填 admin" />

          <p class="section-desc auth-hint">演示：账号为 <b>admin</b> 或显示名为 <b>admin</b> 时分配管理员，可看到「后台管理」入口。</p>
        </div>

        <div class="detail-actions">
          <button type="button" class="btn-primary-lg" data-auth-submit data-auth-mode="${realMode}">
            ${realMode === "register" ? "注册并登录" : "登录"}
          </button>
        </div>
        <p id="authStatus" class="form-status"></p>
      </div>
    </div>
  `;

  modal.classList.add("show");
  document.body.style.overflow = "hidden";

  const idInput = $("#authIdentifier");
  if (idInput) idInput.focus();

  const forgot = $("#authForgotBtn");
  if (forgot) forgot.addEventListener("click", () => {
    alert("忘记密码：正式环境将通过邮箱/手机验证码重置。当前为静态演示，请重新注册或联系管理员。");
  });

  modal.querySelectorAll("[data-auth-switch]").forEach(btn => {
    btn.addEventListener("click", () => openAuth(btn.dataset.authSwitch || "login"));
  });
}

function closeAuthModal() {
  const modal = $("#authModal");
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

/* ========== 页面导航（SPA 风格） ========== */
function navigateTo(page) {
  if (page === "admin") {
    state.user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
    if (!isLoggedIn()) {
      openAuth("login");
      const st = $("#authStatus");
      if (st) st.textContent = "请先登录。仅管理员可访问后台。";
      return;
    }
    if (!isAdmin()) {
      alert("无权访问后台管理（仅管理员）。");
      return;
    }
  }

  state.currentPage = page;
  $$('.page-section').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  $$('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const km = document.querySelector(".knowledge-main");
  if (km) km.scrollTop = 0;

  if (page === 'tools') {
    renderCategoryTabs();
    renderSortBtns();
    renderToolGrid();
  } else if (page === 'home') {
    renderFeaturedTools();
    renderStats();
  } else if (page === 'knowledge') {
    initKnowledgePage();
  } else if (page === 'premium') {
    applyPremiumUI();
  } else if (page === 'user') {
    renderUserPage();
  } else if (page === 'admin') {
    renderAdminPage();
  }
}

/* ========== 主题切换 ========== */
function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  const btn = $("#themeToggle");
  if (btn) btn.innerHTML = theme === "light" ? '🌙' : '☀️';
  localStorage.setItem("site-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("site-theme") || "dark";
  applyTheme(saved);
}

/* ========== 工单/需求表单 ========== */
function buildMailtoLink(fd) {
  const subj = `【企鹅AI基地工单】${fd.title}`;
  const body = [`称呼：${fd.name}`,`联系方式：${fd.contact}`,"",`需求内容：`,fd.content].join("\n");
  return `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
}

async function submitTicket(fd) {
  if (!TICKET_API_URL) return false;
  const r = await fetch(TICKET_API_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(fd) });
  return r.ok;
}

/* ========== 邮件订阅 ========== */
function handleSubscribe(email) {
  // 静态站暂存 localStorage，后续对接后端
  const subs = JSON.parse(localStorage.getItem("penguin-subscribers") || "[]");
  if (subs.includes(email)) return "您已订阅过了！";
  subs.push(email);
  localStorage.setItem("penguin-subscribers", JSON.stringify(subs));
  return "订阅成功！每周将收到 AI 工具简报 📬";
}

/* ========== 滚动动画 ========== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ========== 事件绑定 ========== */
function initEvents() {
  // 导航
  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-nav]');
    if (nav) { e.preventDefault(); navigateTo(nav.dataset.nav); }
  });

  // 登录/会员/退出（演示版，本地存储）
  document.addEventListener('click', e => {
    const openAuthBtn = e.target.closest('[data-open-auth]');
    if (openAuthBtn) {
      e.preventDefault();
      openAuth(openAuthBtn.dataset.openAuth || "login");
      return;
    }

    const logoutBtn = e.target.closest('#logoutBtn');
    if (logoutBtn) {
      state.user = null;
      persistUser();
      updateAdminNavVisibility();
      closeAuthModal();
      if (state.currentPage === 'user') renderUserPage();
      if (state.currentPage === 'admin') navigateTo('home');
      return;
    }

    const togglePremiumDemoBtn = e.target.closest('#togglePremiumDemoBtn');
    if (togglePremiumDemoBtn) {
      const next = hasPremium() ? 'free' : 'month';
      state.premiumLevel = next;
      persistPremium();
      // 根据页面刷新内容
      if (state.currentPage === 'knowledge') initKnowledgePage();
      if (state.currentPage === 'premium') applyPremiumUI();
      if (state.currentPage === 'user') renderUserPage();
      return;
    }

    const premiumBtn = e.target.closest('[data-premium]');
    if (premiumBtn) {
      const target = premiumBtn.dataset.premium || 'free';
      if (target === state.premiumLevel) return;
      state.premiumLevel = target;
      persistPremium();

      // 演示：只在开通月/年时写入一条“订单”
      if (target === 'month' || target === 'year') {
        const price = target === 'month' ? 19 : 199;
        state.orders = state.orders || [];
        state.orders.push({
          id: `ord_${Date.now()}`,
          type: 'premium',
          level: target,
          amount: price,
          status: 'paid',
          time: new Date().toISOString(),
        });
        persistOrders();
      }

      if (state.currentPage === 'knowledge') initKnowledgePage();
      if (state.currentPage === 'premium') applyPremiumUI();
      if (state.currentPage === 'user') renderUserPage();
      return;
    }

    const authSubmitBtn = e.target.closest('[data-auth-submit]');
    if (authSubmitBtn) {
      const mode = authSubmitBtn.dataset.authMode === "register" ? "register" : "login";
      const identifier = ($("#authIdentifier")?.value || "").trim();
      const pw = ($("#authPassword")?.value || "").trim();
      const displayName = ($("#authDisplayName")?.value || "").trim();
      const statusEl = $("#authStatus");

      if (!identifier) {
        if (statusEl) statusEl.textContent = "请输入邮箱或手机号。";
        return;
      }
      const pwErr = validatePasswordRule(pw);
      if (pwErr) {
        if (statusEl) statusEl.textContent = pwErr;
        return;
      }

      if (mode === "register") {
        const pw2 = ($("#authPassword2")?.value || "").trim();
        const agree = $("#authAgree")?.checked;
        const captcha = ($("#authCaptcha")?.value || "").trim();
        if (pw !== pw2) {
          if (statusEl) statusEl.textContent = "两次密码不一致。";
          return;
        }
        if (!agree) {
          if (statusEl) statusEl.textContent = "请勾选同意用户协议与隐私政策。";
          return;
        }
        if (captcha.length < 4) {
          if (statusEl) statusEl.textContent = "请输入验证码（演示任意 4 位以上）。";
          return;
        }
      } else {
        const remember = $("#authRemember")?.checked;
        const days = Number($("#authRememberDays")?.value || 7);
        if (remember) localStorage.setItem("penguin-remember-days", String(days));
        else localStorage.removeItem("penguin-remember-days");
      }

      const showName = displayName || identifier.split("@")[0] || "用户";
      const isAdm = showName === "admin" || identifier === "admin" || /^admin@/i.test(identifier);
      state.user = {
        id: `u_${Date.now()}`,
        name: showName,
        email: /@/.test(identifier) ? identifier : null,
        phone: /^\d{11}$/.test(identifier) ? identifier : null,
        role: isAdm ? "ADMIN" : "USER",
      };
      persistUser();
      updateAdminNavVisibility();
      closeAuthModal();

      if (state.currentPage === 'user') renderUserPage();
      if (state.currentPage === 'admin') renderAdminPage();
      return;
    }
  });

  // 搜索
  const searchInputs = $$('.search-input');
  searchInputs.forEach(inp => {
    inp.addEventListener('input', e => {
      state.keyword = e.target.value;
      // 同步所有搜索框
      searchInputs.forEach(other => { if(other !== e.target) other.value = e.target.value; });
      if (state.currentPage === 'tools') renderToolGrid();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        state.keyword = e.target.value;
        navigateTo('tools');
      }
    });
  });

  // 分类 & 排序
  document.addEventListener('click', e => {
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) {
      state.category = catBtn.dataset.cat;
      renderCategoryTabs();
      renderToolGrid();
    }
    const sortBtn = e.target.closest('[data-sort]');
    if (sortBtn) {
      state.sort = sortBtn.dataset.sort;
      renderSortBtns();
      renderToolGrid();
    }
  });

  // 收藏
  document.addEventListener('click', e => {
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      e.stopPropagation();
      const ok = toggleFav(favBtn.dataset.fav);
      if (!ok) return;
      // 刷新当前视图
      if (state.currentPage === 'tools') renderToolGrid();
      else if (state.currentPage === 'home') renderFeaturedTools();
      // 如果在弹窗里点的收藏
      if ($("#detailModal").classList.contains('show')) {
        showDetail(favBtn.dataset.fav);
      }
    }
  });

  // 工具详情
  document.addEventListener('click', e => {
    const detailBtn = e.target.closest('[data-detail]');
    if (detailBtn) { showDetail(detailBtn.dataset.detail); return; }
    const relatedCard = e.target.closest('.related-card[data-id]');
    if (relatedCard) { showDetail(relatedCard.dataset.id); return; }
    const closeAuthBtn = e.target.closest('[data-close-auth]');
    if (closeAuthBtn) closeAuthModal();
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) closeModal();
  });

  // 提交评论 & 后台审核（演示）
  document.addEventListener('click', e => {
    const reviewBtn = e.target.closest('[data-submit-review]');
    if (reviewBtn) {
      e.preventDefault();
      if (!isLoggedIn()) {
        openAuth("login");
        return;
      }
      const toolId = state.detailTool;
      const rating = Number($("#reviewRating")?.value || 0);
      const content = ($("#reviewContent")?.value || "").trim();
      const statusEl = $("#reviewStatus");

      if (!toolId) {
        if (statusEl) statusEl.textContent = "提交失败：缺少工具信息。";
        return;
      }
      if (!(rating >= 1 && rating <= 5)) {
        if (statusEl) statusEl.textContent = "请选择 1-5 分评分。";
        return;
      }
      if (!content) {
        if (statusEl) statusEl.textContent = "请填写评论内容。";
        return;
      }

      state.toolReviews.push({
        id: `rev_${Date.now()}`,
        toolId,
        userId: state.user?.id || "u_demo",
        userName: state.user?.name || "用户",
        rating,
        content,
        createdAt: new Date().toISOString(),
      });
      persistReviews();
      if (statusEl) statusEl.textContent = "✅ 评论已提交！";
      showDetail(toolId);
      return;
    }

    const adminActionBtn = e.target.closest('[data-admin-action]');
    if (adminActionBtn) {
      const action = adminActionBtn.dataset.adminAction;
      const subId = adminActionBtn.dataset.subId;
      if (!subId) return;
      if (!isAdmin()) {
        renderAdminPage();
        return;
      }

      state.submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");
      const idx = state.submissions.findIndex(s => s.id === subId);
      if (idx < 0) return;

      state.submissions[idx].status = action === "approve" ? "approved" : "rejected";
      state.submissions[idx].updatedAt = new Date().toISOString();
      persistSubmissions();
      renderAdminPage();
      return;
    }
  });

  // ESC 关闭弹窗
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($("#authModal")?.classList?.contains('show')) closeAuthModal();
      closeModal();
    }
  });

  // 主题切换
  const themeBtn = $("#themeToggle");
  if (themeBtn) themeBtn.addEventListener('click', () => {
    applyTheme(document.body.classList.contains("light") ? "dark" : "light");
  });

  // 工单表单
  const ticketForm = $("#ticketForm");
  if (ticketForm) ticketForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = {
      name: $("#ticketName").value.trim(),
      contact: $("#ticketContact").value.trim(),
      title: $("#ticketTitle").value.trim(),
      content: $("#ticketContent").value.trim(),
    };
    if (!fd.name||!fd.contact||!fd.title||!fd.content) {
      $("#ticketStatus").textContent = "请把信息填写完整。";
      return;
    }
    $("#ticketStatus").textContent = "正在提交...";
    try {
      const ok = await submitTicket(fd);
      if (ok) { $("#ticketStatus").textContent = "✅ 提交成功！"; ticketForm.reset(); return; }
      if (RECEIVER_EMAIL) { window.location.href = buildMailtoLink(fd); $("#ticketStatus").textContent = "已切换到邮件发送"; }
    } catch(err) {
      if (RECEIVER_EMAIL) { window.location.href = buildMailtoLink(fd); $("#ticketStatus").textContent = "已切换到邮件发送"; }
      else { $("#ticketStatus").textContent = "提交失败，请重试。"; }
    }
  });

  // 邮件订阅
  const subForm = $("#subscribeForm");
  if (subForm) subForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = $("#subEmail").value.trim();
    if (!email) return;
    const msg = handleSubscribe(email);
    $("#subStatus").textContent = msg;
    if (msg.includes("成功")) subForm.reset();
  });

  // 提交工具表单
  const submitToolForm = $("#submitToolForm");
  if (submitToolForm) submitToolForm.addEventListener('submit', async e => {
    e.preventDefault();
    const plan = document.querySelector('input[name="submit-plan"]:checked');
    const fd = {
      toolName: $("#stName").value.trim(),
      toolUrl: $("#stUrl").value.trim(),
      toolCategory: $("#stCategory").value,
      toolDesc: $("#stDesc").value.trim(),
      toolContact: $("#stContact").value.trim(),
      plan: plan ? plan.value : "free",
    };

    const logoInput = $("#stLogo");
    const screenshotsInput = $("#stScreenshots");
    const logoFile = logoInput?.files?.[0];
    const screenshotFiles = screenshotsInput?.files ? Array.from(screenshotsInput.files).slice(0, 3) : [];

    if (!fd.toolName || !fd.toolUrl || !fd.toolCategory || !fd.toolDesc || !fd.toolContact) {
      $("#submitToolStatus").textContent = "请填写完整信息。";
      return;
    }
    if (!logoFile) {
      $("#submitToolStatus").textContent = "请上传工具 Logo。";
      return;
    }
    if (logoFile.size > 1024 * 1024) {
      $("#submitToolStatus").textContent = "Logo 文件过大（建议 200KB 内）。";
      return;
    }

    const MAX_SCREENSHOT_SIZE = 2 * 1024 * 1024;
    for (const f of screenshotFiles) {
      if (f.size > MAX_SCREENSHOT_SIZE) {
        $("#submitToolStatus").textContent = "截图文件过大，请换更小的图片。";
        return;
      }
    }

    const fileToDataUrl = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("read file failed"));
      reader.readAsDataURL(file);
    });

    $("#submitToolStatus").textContent = "正在提交并保存（演示）...";
    try {
      const logoDataUrl = await fileToDataUrl(logoFile);
      const screenshotsDataUrls = [];
      for (const f of screenshotFiles) {
        screenshotsDataUrls.push(await fileToDataUrl(f));
      }

      state.submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");
      state.submissions.push({
        id: `sub_${Date.now()}`,
        toolName: fd.toolName,
        toolUrl: fd.toolUrl,
        toolCategory: fd.toolCategory,
        toolDesc: fd.toolDesc,
        toolContact: fd.toolContact,
        plan: fd.plan,
        logoDataUrl,
        screenshotsDataUrls,
        status: "pending",
        submitterName: state.user?.name || "游客",
        time: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      persistSubmissions();
      if (state.currentPage === "admin") renderAdminPage();
      if (state.currentPage === "user") renderUserPage();

      $("#submitToolStatus").textContent = "✅ 提交成功！已进入后台审核队列（演示）。";
      submitToolForm.reset();
    } catch (err) {
      $("#submitToolStatus").textContent = "提交失败，请重试。";
    }
  });

  // "查看全部工具" 按钮
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-goto-tools]');
    if (btn) navigateTo('tools');
  });

  window.addEventListener("hashchange", () => {
    const { slug } = parseKnowledgeHash();
    if (slug) navigateTo("knowledge");
  });

  document.addEventListener("click", e => {
    const link = e.target.closest("a.knowledge-tree-link");
    if (link) {
      e.preventDefault();
      navigateTo("knowledge");
      renderKnowledgeArticle(link.dataset.knowledgeSlug);
      const sidebar = $("#knowledgeSidebar");
      const mask = $("#knowledgeSidebarMask");
      sidebar?.classList.remove("knowledge-sidebar--open");
      mask?.setAttribute("hidden", "");
    }
    const prev = e.target.closest(".knowledge-nav-btn");
    if (prev?.dataset?.knowledgeSlug) {
      e.preventDefault();
      renderKnowledgeArticle(prev.dataset.knowledgeSlug);
    }
  });

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-chapter-toggle]");
    if (!t) return;
    const id = t.dataset.chapterToggle;
    const chapter = t.closest(".knowledge-chapter");
    const list = chapter?.querySelector(".knowledge-section-list");
    const icon = t.querySelector(".knowledge-chapter-icon");
    if (!list) return;
    list.hidden = !list.hidden;
    localStorage.setItem(KNOWLEDGE_LS_CHAPTER + id, list.hidden ? "0" : "1");
    if (icon) icon.textContent = list.hidden ? "▶" : "▼";
    t.setAttribute("aria-expanded", String(!list.hidden));
  });

  const colBtn = $("#knowledgeCollapseBtn");
  if (colBtn) {
    colBtn.addEventListener("click", () => {
      const cur = localStorage.getItem(KNOWLEDGE_LS_COLLAPSE) === "1";
      localStorage.setItem(KNOWLEDGE_LS_COLLAPSE, cur ? "0" : "1");
      applyKnowledgeSidebarCollapsed();
    });
  }

  const mobToggle = $("#knowledgeSidebarToggle");
  const mask = $("#knowledgeSidebarMask");
  const sidebar = $("#knowledgeSidebar");
  if (mobToggle && sidebar) {
    mobToggle.addEventListener("click", () => {
      sidebar.classList.toggle("knowledge-sidebar--open");
      if (mask) {
        if (sidebar.classList.contains("knowledge-sidebar--open")) mask.removeAttribute("hidden");
        else mask.setAttribute("hidden", "");
      }
    });
  }
  if (mask && sidebar) {
    mask.addEventListener("click", () => {
      sidebar.classList.remove("knowledge-sidebar--open");
      mask.setAttribute("hidden", "");
    });
  }

  const ks = $("#knowledgeSearchInput");
  if (ks) {
    ks.addEventListener("input", () => {
      const q = ks.value.trim().toLowerCase();
      const box = $("#knowledgeSearchResults");
      if (!box) return;
      if (!q) {
        box.hidden = true;
        box.innerHTML = "";
        return;
      }
      const hits = flattenKnowledgeSections().filter(s =>
        (s.title + (s.markdown || "") + (s.excerpt || "")).toLowerCase().includes(q)
      ).slice(0, 30);
      box.hidden = false;
      box.innerHTML = hits.length
        ? hits.map(h => `
            <button type="button" class="knowledge-search-hit" data-knowledge-slug="${h.slug}">
              <span class="knowledge-hit-title">${escapeHtml(h.title)}</span>
              <span class="knowledge-hit-meta">${escapeHtml(h.chapterTitle)}</span>
            </button>`).join("")
        : `<div class="knowledge-search-empty">无匹配小节</div>`;
    });
  }

  document.addEventListener("click", e => {
    const hit = e.target.closest(".knowledge-search-hit");
    if (hit?.dataset?.knowledgeSlug) {
      navigateTo("knowledge");
      renderKnowledgeArticle(hit.dataset.knowledgeSlug);
      const box = $("#knowledgeSearchResults");
      if (box) {
        box.hidden = true;
        box.innerHTML = "";
      }
      const inp = $("#knowledgeSearchInput");
      if (inp) inp.value = "";
    }
  });
}

/* ========== 移动端菜单 ========== */
function initMobileMenu() {
  const toggle = $("#mobileMenuToggle");
  const nav = $("#mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  // 点击导航项后自动收起
  nav.addEventListener('click', e => {
    if (e.target.closest('.nav-link')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

/* ========== 初始化 ========== */
function init() {
  initTheme();
  initEvents();
  initMobileMenu();
  updateAdminNavVisibility();
  const { slug } = parseKnowledgeHash();
  if (slug) navigateTo("knowledge");
  else navigateTo("home");
  setTimeout(initScrollAnimations, 300);
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
