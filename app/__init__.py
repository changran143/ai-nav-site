from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from config import config

# 全局扩展实例
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # 初始化扩展
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # 注册蓝图
    from app.api import auth_bp, tools_bp, users_bp
    from app.api import auth, tools, users  # 导入路由模块
    app.register_blueprint(auth_bp)
    app.register_blueprint(tools_bp)
    app.register_blueprint(users_bp)
    
    # 健康检查端点
    @app.route('/health')
    def health():
        return {'status': 'healthy', 'service': 'penguinai-api'}
    
    # 根路由测试
    @app.route('/')
    def index():
        return '''
        <h1>🐧 企鹅AI基地 - API服务器</h1>
        <p>服务器正在正常运行！</p>
        <h3>测试接口：</h3>
        <ul>
            <li><a href="/health">健康检查</a></li>
            <li><a href="/api/auth/test">认证API测试</a></li>
            <li><a href="/api/tools/test">工具API测试</a></li>
        </ul>
        '''
    
    return app
