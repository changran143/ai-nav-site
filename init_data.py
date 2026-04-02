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
            print(f"创建分类: {cat_data['name']}")
    
    # 创建管理员
    if not User.query.filter_by(email='admin@penguinai.com').first():
        admin = User(username='admin', email='admin@penguinai.com', role='admin')
        admin.set_password('admin123')
        db.session.add(admin)
        print("创建管理员账号")
    
    db.session.commit()
    print('✅ 初始数据创建完成！')
    print('📧 管理员账号: admin@penguinai.com')
    print('🔑 管理员密码: admin123')
