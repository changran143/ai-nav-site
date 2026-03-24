# 企鹅AI基地 - 工单安全配置（必做）

你的网站是静态站，不能把飞书 webhook 直接写在前端。
正确做法：前端 -> 中转接口 -> 飞书机器人。

本文是最简 Cloudflare Worker 方案。

## 1) 在 Cloudflare 创建 Worker

1. 打开 Cloudflare 仪表盘，进入 `Workers & Pages`
2. 点击 `Create` -> `Create Worker`
3. 把 `worker/cloudflare-worker.js` 文件里的代码全部复制进去，保存
4. 点击 `Deploy`

## 2) 配置秘密变量（最关键）

1. 进入这个 Worker 的 `Settings`
2. 找到 `Variables`
3. 新增 **Secret**：
   - Name: `FEISHU_WEBHOOK`
   - Value: 你的飞书 webhook 完整地址
4. 保存后重新 Deploy 一次

## 3) 把 Worker 地址填回前端

打开 `script.js`，找到：

```js
const TICKET_API_URL = "";
```

改成你的 Worker 地址，例如：

```js
const TICKET_API_URL = "https://your-worker-name.your-subdomain.workers.dev";
```

## 4) 提交并发布

在项目目录执行：

```bash
git add .
git commit -m "配置安全工单中转"
git push
```

## 5) 验证

打开网站 -> 工单 -> 填写并提交：

- 提交成功：页面显示“已通过安全中转发送”
- 飞书群收到消息
- 前端源码里看不到飞书 webhook

---

## 紧急建议（你已经泄露过 webhook）

因为之前 webhook 在前端出现过，请立刻在飞书机器人里：

1. 删除旧 webhook 或重置
2. 生成新 webhook
3. 把新 webhook 仅配置到 Worker Secret 中

这样可以避免被他人滥发消息。
