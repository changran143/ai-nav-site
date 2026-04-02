# 🐧 企鹅AI基地 - 动态网站版本

> 一站式AI工具导航平台，从静态网站升级为功能完整的独立动态网站

## 🚀 快速开始

### 1. 环境准备

**Windows用户：**
```bash
# 双击运行
setup.bat
```

**Mac/Linux用户：**
```bash
# 给脚本执行权限
chmod +x setup.sh
# 运行脚本
./setup.sh
```

### 2. 启动开发服务器

```bash
# 激活虚拟环境
source venv/bin/activate  # Windows: venv\Scripts\activate

# 启动服务器
python run.py
```

### 3. 测试API

```bash
# 运行测试脚本
python test_api.py
```

## 📁 项目结构

```
penguinai/
├── app/                    # 应用主目录
│   ├── __init__.py        # 应用工厂
│   ├── models.py          # 数据模型
│   ├── api/               # API接口
│   │   ├── __init__.py
│   │   ├── auth.py        # 认证接口
│   │   ├── tools.py       # 工具接口
│   │   └── users.py       # 用户接口
│   └── utils/             # 工具函数
│       ├── __init__.py
│       └── validators.py  # 验证器
├── config.py              # 配置文件
├── run.py                 # 启动文件
├── requirements.txt       # 依赖包
├── setup.bat             # Windows安装脚本
├── setup.sh              # Mac/Linux安装脚本
├── test_api.py           # API测试脚本
└── .env.example          # 环境变量示例
```

## 🛠️ 技术栈

### 后端
- **框架**: Flask
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **认证**: JWT (Flask-JWT-Extended)
- **ORM**: SQLAlchemy
- **数据验证**: Marshmallow

### 前端
- **基础**: Vanilla JavaScript
- **样式**: CSS3
- **模板**: Jinja2

## 📡 API接口

### 认证模块
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取用户信息
- `POST /api/auth/refresh` - 刷新token

### 工具模块
- `GET /api/tools/` - 获取工具列表
- `GET /api/tools/<id>` - 获取工具详情
- `GET /api/tools/categories` - 获取分类列表

### 用户模块
- `GET /api/users/profile` - 获取用户资料
- `PUT /api/users/profile` - 更新用户资料

## 🔧 开发指南

### 添加新的API接口

1. 在 `app/models.py` 中定义数据模型
2. 在 `app/api/` 中创建新的路由文件
3. 在 `app/api/__init__.py` 中注册蓝图
4. 在 `test_api.py` 中添加测试

### 数据库迁移

```bash
# 创建迁移文件
flask db migrate -m "描述信息"

# 应用迁移
flask db upgrade
```

### 运行测试

```bash
# 运行API测试
python test_api.py

# 手动测试接口
curl http://localhost:5000/api/auth/test
```

## 📋 默认账号

### 管理员账号
- 邮箱: `admin@penguinai.com`
- 密码: `admin123`
- 角色: 管理员

### 测试账号
运行测试脚本时会自动创建：
- 邮箱: `test@example.com`
- 密码: `test123456`
- 角色: 普通用户

## 🚀 部署指南

### 1. 服务器准备

```bash
# 安装依赖
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx postgresql

# 克隆代码
git clone <repository-url>
cd penguinai

# 运行安装脚本
./setup.sh
```

### 2. 生产环境配置

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑生产环境配置
vim .env
```

### 3. Gunicorn配置

```bash
# 安装Gunicorn
pip install gunicorn

# 启动应用
gunicorn -w 4 -b 0.0.0.0:8000 wsgi:app
```

## 📊 功能特性

### ✅ 已完成
- [x] 用户注册/登录系统
- [x] JWT认证机制
- [x] 工具分类管理
- [x] 工具列表和详情
- [x] 用户资料管理
- [x] API文档和测试

### 🚧 开发中
- [ ] 工具评价系统
- [ ] 用户收藏功能
- [ ] 工具提交审核
- [ ] 会员订阅系统
- [ ] 支付集成
- [ ] 管理后台

### 📋 计划中
- [ ] 知识库系统
- [ ] 需求市场
- [ ] 社交功能
- [ ] AI推荐系统
- [ ] 移动端APP

## 🔒 安全特性

- JWT token认证
- 密码哈希存储
- 输入数据验证
- CORS跨域保护
- SQL注入防护

## 📈 性能优化

- 数据库索引优化
- API响应缓存
- 分页查询
- 连接池管理

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

## 📞 技术支持

如果你在开发过程中遇到问题：

1. 查看错误日志
2. 运行测试脚本
3. 检查API文档
4. 联系技术支持

## 📄 许可证

MIT License

---

🐧 **企鹅AI基地** - 让AI工具发现更简单！

> 从静态网站到动态平台的完美升级方案
