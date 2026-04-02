@echo off
echo 🚀 企鹅AI基地 - 快速启动脚本
echo ================================

REM 检查Python版本
python --version
if %errorlevel% neq 0 (
    echo ❌ 未找到Python，请先安装Python 3.9+
    pause
    exit /b 1
)

REM 检查是否存在虚拟环境
if not exist "venv" (
    echo 📦 创建虚拟环境...
    python -m venv venv
)

REM 激活虚拟环境
echo 🔧 激活虚拟环境...
call venv\Scripts\activate

REM 安装依赖
echo 📚 安装依赖包...
pip install -r requirements.txt

REM 创建数据库
echo 🗄️ 初始化数据库...
set FLASK_APP=run.py
flask db init 2>nul || echo 数据库已初始化
flask db migrate -m "Initial migration" 2>nul || echo 迁移文件已存在
flask db upgrade

REM 创建初始数据
echo 🌱 创建初始数据...
python -c "
from app import create_app, db
from app.models import Category, User

app = create_app()
with app.app_context():
    # 创建分类
    categories = [
        {'name': 'AI 对话', 'slug': 'ai-chat', 'icon': '💬'},
        {'name': 'AI 绘画', 'slug': 'ai-art', 'icon': '🎨'},
        {'name': 'AI 视频', 'slug': 'ai-video', 'icon': '🎬'},
        {'name': 'AI 编程', 'slug': 'ai-coding', 'icon': '⌨️'},
        {'name': 'AI 自动化', 'slug': 'ai-automation', 'icon': '🔗'},
        {'name': 'AI 音频', 'slug': 'ai-audio', 'icon': '🎵'},
        {'name': 'AI 写作', 'slug': 'ai-writing', 'icon': '✏️'},
        {'name': '数据分析', 'slug': 'data-analysis', 'icon': '📊'}
    ]
    
    for cat_data in categories:
        if not Category.query.filter_by(slug=cat_data['slug']).first():
            cat = Category(**cat_data)
            db.session.add(cat)
    
    # 创建管理员用户
    if not User.query.filter_by(email='admin@penguinai.com').first():
        admin = User(
            username='admin',
            email='admin@penguinai.com',
            role='admin'
        )
        admin.set_password('admin123')
        db.session.add(admin)
    
    db.session.commit()
    print('初始数据创建完成！')
"

echo.
echo ✅ 环境准备完成！
echo.
echo 🎯 下一步操作：
echo 1. 启动开发服务器: python run.py
echo 2. 测试API接口: curl http://localhost:5000/api/auth/test
echo 3. 查看API文档: http://localhost:5000/api/auth/test
echo.
echo 📧 管理员账号：
echo 邮箱: admin@penguinai.com
echo 密码: admin123
echo.
echo 🚀 现在可以开始开发了！
pause
