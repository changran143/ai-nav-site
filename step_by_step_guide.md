# 🚀 企鹅AI基地 - 保姆级执行教程

## 📋 今日任务清单（第1天）

### ✅ 立即执行（今天完成）

#### 1. 服务器和域名采购（30分钟）
```bash
# 1.1 购买阿里云ECS服务器
# 访问：https://ecs.console.aliyun.com/
# 配置选择：
# - 地域：选择离你最近的（如华东1-杭州）
# - 实例规格：2核4G (ecs.c6.large)
# - 操作系统：Ubuntu 20.04 LTS
# - 存储：40GB SSD
# - 网络：专有网络VPC
# 预计费用：约200-300元/月

# 1.2 购买域名
# 访问：https://wanwang.aliyun.com/domain/
# 推荐域名：penguinai.com / penguin-ai.com / ai-penguin.com
# 预计费用：50-100元/年

# 1.3 购买数据库（可选，初期可使用SQLite）
# 访问：https://rds.console.aliyun.com/
# 配置：PostgreSQL 基础版 1核1G
# 预计费用：约100元/月
```

#### 2. 本地开发环境搭建（1小时）

```bash
# 2.1 安装Python 3.9+
# Windows: 从 https://python.org 下载安装
# Mac: brew install python@3.9
# Ubuntu: sudo apt install python3.9 python3.9-venv

# 2.2 创建项目目录
mkdir penguinai-backend
cd penguinai-backend

# 2.3 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2.4 安装基础依赖
pip install flask flask-sqlalchemy flask-jwt-extended
pip install flask-cors python-dotenv psycopg2-binary
pip install flask-migrate marshmallow

# 2.5 创建基础项目结构
mkdir app
mkdir app/models app/api app/templates app/static
touch app/__init__.py app/models/__init__.py app/api/__init__.py
touch config.py run.py requirements.txt
```

#### 3. 基础项目配置（1小时）

```python
# config.py 内容
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///penguinai.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
class DevelopmentConfig(Config):
    DEBUG = True
    
class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

```python
# run.py 内容
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

```python
# app/__init__.py 内容
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # 初始化扩展
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # 注册蓝图
    from app.api import auth_bp, tools_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(tools_bp)
    
    return app
```

#### 4. 创建第一个API接口（30分钟）

```python
# app/api/__init__.py 内容
from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
tools_bp = Blueprint('tools', __name__)

from app.api import auth, tools
```

```python
# app/api/auth.py 内容
from flask import jsonify, request
from app.api import auth_bp

@auth_bp.route('/api/auth/test', methods=['GET'])
def test():
    return jsonify({
        'success': True,
        'message': '企鹅AI基地API正常工作！',
        'version': '1.0.0'
    })

@auth_bp.route('/api/auth/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': '2026-04-02T12:00:00Z'
    })
```

```python
# app/api/tools.py 内容
from flask import jsonify
from app.api import tools_bp

@tools_bp.route('/api/tools/test', methods=['GET'])
def test_tools():
    return jsonify({
        'success': True,
        'message': '工具API正常工作！',
        'data': []
    })
```

#### 5. 测试本地环境（15分钟）

```bash
# 5.1 启动开发服务器
python run.py

# 5.2 测试API接口
# 在浏览器访问：http://localhost:5000/api/auth/test
# 应该看到：{"success": true, "message": "企鹅AI基地API正常工作！"}
```

## 📅 明天任务预告（第2天）

### 数据库模型创建
- [ ] 用户模型设计
- [ ] 工具模型设计
- [ ] 数据库迁移脚本

### 用户认证系统
- [ ] 注册接口
- [ ] 登录接口
- [ ] JWT token生成

## 🎯 本周目标

### 第1周目标
- [ ] 开发环境完全搭建
- [ ] 基础API框架完成
- [ ] 用户认证系统完成
- [ ] 前端页面模板化开始

### 成功标准
- [ ] 本地服务器正常启动
- [ ] API接口正常响应
- [ ] 用户能够注册登录
- [ ] 前端能够调用后端API

## 📞 获取帮助

### 遇到问题怎么办？
1. **查看错误日志**: 仔细阅读错误信息
2. **Google搜索**: 复制错误信息搜索
3. **官方文档**: 查看Flask、SQLAlchemy文档
4. **GitHub Issues**: 搜索相关issue

### 推荐学习资源
- [Flask官方文档](https://flask.palletsprojects.com/)
- [SQLAlchemy文档](https://docs.sqlalchemy.org/)
- [JWT认证教程](https://flask-jwt-extended.readthedocs.io/)

## 💡 贴心提示

### 开发习惯
1. **保存进度**: 每完成一个功能就提交到Git
2. **记录笔记**: 记录遇到的问题和解决方案
3. **备份代码**: 定期备份到GitHub或云端

### 时间管理
1. **专注时间**: 每天至少2小时专注开发
2. **任务拆分**: 将大任务拆分成小任务
3. **及时休息**: 避免长时间连续工作

---

## 🚀 立即开始行动！

### 第1步：采购服务器和域名（现在就做）
1. 打开阿里云官网
2. 购买ECS服务器
3. 注册域名

### 第2步：搭建开发环境（今天完成）
1. 安装Python和虚拟环境
2. 创建项目结构
3. 配置基础Flask应用

### 第3步：测试API（今天完成）
1. 启动开发服务器
2. 测试API接口
3. 确保环境正常

完成今天的任务后，你就拥有了完整的开发环境和基础API框架！明天我们继续数据库和用户认证系统的开发。

有任何问题随时问我，我会全程指导你完成每一步！
