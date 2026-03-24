/**
 * Cloudflare Worker: 工单安全中转
 *
 * 作用：
 * 1) 接收前端工单 JSON
 * 2) 使用服务端环境变量 FEISHU_WEBHOOK 转发给飞书机器人
 *
 * 部署后，把 worker URL 填到 script.js 的 TICKET_API_URL
 */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders()
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ ok: false, message: "Only POST is allowed." }, 405);
    }

    if (!env.FEISHU_WEBHOOK) {
      return json({ ok: false, message: "Missing FEISHU_WEBHOOK secret." }, 500);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, message: "Invalid JSON body." }, 400);
    }

    const name = (payload.name || "").trim();
    const contact = (payload.contact || "").trim();
    const title = (payload.title || "").trim();
    const content = (payload.content || "").trim();

    if (!name || !contact || !title || !content) {
      return json({ ok: false, message: "Missing required fields." }, 400);
    }

    const text = [
      "企鹅AI基地收到新工单：",
      `称呼：${name}`,
      `联系方式：${contact}`,
      `标题：${title}`,
      `内容：${content}`
    ].join("\n");

    const feishuResponse = await fetch(env.FEISHU_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg_type: "text",
        content: { text }
      })
    });

    if (!feishuResponse.ok) {
      const detail = await feishuResponse.text();
      return json(
        { ok: false, message: "Feishu send failed.", detail: detail.slice(0, 200) },
        502
      );
    }

    return json({ ok: true, message: "Ticket forwarded." }, 200);
  }
};
