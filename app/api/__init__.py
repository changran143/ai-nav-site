from flask import Blueprint

# 创建蓝图
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
tools_bp = Blueprint('tools', __name__, url_prefix='/api/tools')
users_bp = Blueprint('users', __name__, url_prefix='/api/users')
