# 企鹅AI基地 - 后端API架构设计

## 🛠️ 技术栈
- **框架**: Flask + Flask-RESTful
- **数据库ORM**: SQLAlchemy
- **认证**: Flask-JWT-Extended
- **缓存**: Flask-Caching (Redis)
- **文件上传**: Flask-Uploads
- **数据验证**: Marshmallow
- **任务队列**: Celery
- **API文档**: Flask-RESTX (Swagger)

## 📡 API接口设计

### 1. 用户认证模块 (/api/auth)

```
POST   /api/auth/register          # 用户注册
POST   /api/auth/login             # 用户登录
POST   /api/auth/logout            # 用户登出
POST   /api/auth/refresh           # 刷新token
POST   /api/auth/forgot-password   # 忘记密码
POST   /api/auth/reset-password    # 重置密码
GET    /api/auth/me                # 获取当前用户信息
PUT    /api/auth/profile           # 更新用户资料
POST   /api/auth/verify-email      # 邮箱验证
```

### 2. AI工具模块 (/api/tools)

```
GET    /api/tools                  # 获取工具列表（支持分页、筛选、搜索）
GET    /api/tools/{id}             # 获取工具详情
GET    /api/tools/featured         # 获取推荐工具
GET    /api/tools/categories       # 获取分类列表
GET    /api/tools/tags             # 获取标签列表
POST   /api/tools                  # 提交新工具（需认证）
PUT    /api/tools/{id}             # 更新工具信息（管理员）
DELETE /api/tools/{id}             # 删除工具（管理员）
POST   /api/tools/{id}/favorite    # 收藏/取消收藏
GET    /api/tools/{id}/reviews     # 获取工具评价
POST   /api/tools/{id}/reviews     # 提交评价（需认证）
PUT    /api/tools/{id}/reviews/{review_id}    # 更新评价
DELETE /api/tools/{id}/reviews/{review_id}    # 删除评价
```

### 3. 会员系统模块 (/api/membership)

```
GET    /api/membership/plans       # 获取会员套餐列表
GET    /api/membership/current     # 获取当前会员状态
POST   /api/membership/subscribe   # 订阅会员
POST   /api/membership/cancel      # 取消订阅
GET    /api/membership/history     # 获取订阅历史
POST   /api/membership/webhook     # 支付回调处理
```

### 4. 需求市场模块 (/api/market)

```
GET    /api/market/tickets         # 获取需求列表
POST   /api/market/tickets         # 发布需求（需认证）
GET    /api/market/tickets/{id}    # 获取需求详情
PUT    /api/market/tickets/{id}    # 更新需求
DELETE /api/market/tickets/{id}    # 删除需求
POST   /api/market/tickets/{id}/apply # 申请承接需求
```

### 5. 知识库模块 (/api/knowledge)

```
GET    /api/knowledge/chapters     # 获取章节列表
GET    /api/knowledge/chapters/{id}/articles  # 获取章节文章
GET    /api/knowledge/articles/{id} # 获取文章详情
GET    /api/knowledge/search       # 搜索文章
POST   /api/knowledge/articles/{id}/view     # 增加浏览量
```

### 6. 管理后台模块 (/api/admin)

```
GET    /api/admin/dashboard        # 仪表盘数据
GET    /api/admin/users            # 用户管理
GET    /api/admin/tools            # 工具管理（审核）
PUT    /api/admin/tools/{id}/approve # 审核通过工具
PUT    /api/admin/tools/{id}/reject  # 拒绝工具
GET    /api/admin/submissions      # 提交管理
GET    /api/admin/orders           # 订单管理
GET    /api/admin/settings         # 系统设置
PUT    /api/admin/settings         # 更新系统设置
GET    /api/admin/logs             # 操作日志
```

### 7. 支付系统模块 (/api/payment)

```
POST   /api/payment/create         # 创建支付订单
GET    /api/payment/status/{order_no}  # 查询支付状态
POST   /api/payment/webhook        # 支付回调
GET    /api/payment/orders         # 获取订单列表
POST   /api/payment/refund         # 申请退款
```

## 🔐 认证和权限

### JWT Token 结构
```json
{
  "user_id": 123,
  "username": "admin",
  "role": "admin|user|premium_admin",
  "membership_level": "free|month|year",
  "exp": 1640995200,
  "iat": 1640908800
}
```

### 权限级别
- **游客**: 只能浏览公开内容
- **注册用户**: 可以收藏、评价、提交工具
- **会员**: 可以查看付费内容、无限收藏
- **管理员**: 可以管理所有内容
- **超级管理员**: 可以管理用户和系统设置

## 📝 API响应格式

### 成功响应
```json
{
  "success": true,
  "data": {...},
  "message": "操作成功",
  "timestamp": "2026-04-02T12:00:00Z"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "输入数据验证失败",
    "details": {
      "email": ["邮箱格式不正确"],
      "password": ["密码长度至少8位"]
    }
  },
  "timestamp": "2026-04-02T12:00:00Z"
}
```

### 分页响应
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 100,
      "pages": 5,
      "has_prev": false,
      "has_next": true
    }
  }
}
```

## 🚀 性能优化

### 1. 缓存策略
- **工具列表**: Redis缓存30分钟
- **分类标签**: Redis缓存24小时
- **用户信息**: Redis缓存1小时
- **热门工具**: Redis缓存1小时

### 2. 数据库优化
- 合理使用索引
- 分页查询优化
- 读写分离（如果需要）
- 连接池配置

### 3. API限流
- 基于用户ID的限流
- 基于IP的限流
- 不同接口不同限制

## 🛡️ 安全措施

### 1. 输入验证
- 所有输入严格验证
- SQL注入防护
- XSS攻击防护

### 2. 认证安全
- JWT token过期机制
- 刷新token机制
- 密码强度要求

### 3. 权限控制
- 基于角色的访问控制(RBAC)
- 接口级权限验证
- 资源级权限控制

### 4. 数据保护
- 敏感数据加密
- 日志脱敏
- 定期安全审计

## 📊 监控和日志

### 1. API监控
- 响应时间监控
- 错误率监控
- 流量监控

### 2. 日志记录
- 请求日志
- 错误日志
- 业务操作日志

### 3. 告警机制
- 异常告警
- 性能告警
- 安全告警
