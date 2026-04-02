from flask import jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app import db
from app.models import User
from app.api import auth_bp
from app.utils.validators import validate_email, validate_password

@auth_bp.route('/test', methods=['GET'])
def test():
    return jsonify({
        'success': True,
        'message': '企鹅AI基地认证API正常工作！',
        'version': '1.0.0',
        'endpoints': [
            'POST /api/auth/register - 用户注册',
            'POST /api/auth/login - 用户登录',
            'GET /api/auth/me - 获取用户信息',
            'POST /api/auth/refresh - 刷新token'
        ]
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    """用户注册"""
    try:
        data = request.get_json()
        
        # 验证必填字段
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': {'message': '用户名、邮箱和密码不能为空'}
            }), 400
        
        # 验证邮箱格式
        if not validate_email(data['email']):
            return jsonify({
                'success': False,
                'error': {'message': '邮箱格式不正确'}
            }), 400
        
        # 验证密码强度
        if not validate_password(data['password']):
            return jsonify({
                'success': False,
                'error': {'message': '密码必须至少8位，包含字母和数字'}
            }), 400
        
        # 检查用户名是否已存在
        if User.query.filter_by(username=data['username']).first():
            return jsonify({
                'success': False,
                'error': {'message': '用户名已存在'}
            }), 400
        
        # 检查邮箱是否已存在
        if User.query.filter_by(email=data['email']).first():
            return jsonify({
                'success': False,
                'error': {'message': '邮箱已被注册'}
            }), 400
        
        # 创建新用户
        user = User(
            username=data['username'],
            email=data['email'],
            phone=data.get('phone', '')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # 生成token
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return jsonify({
            'success': True,
            'message': '注册成功！',
            'data': {
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {'message': f'注册失败：{str(e)}'}
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """用户登录"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': {'message': '邮箱和密码不能为空'}
            }), 400
        
        # 查找用户
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({
                'success': False,
                'error': {'message': '邮箱或密码错误'}
            }), 401
        
        if not user.is_active:
            return jsonify({
                'success': False,
                'error': {'message': '账号已被禁用'}
            }), 401
        
        # 生成token
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        # 更新最后登录时间
        user.last_login = db.func.current_timestamp()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': '登录成功！',
            'data': {
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'登录失败：{str(e)}'}
        }), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """获取当前用户信息"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({
                'success': False,
                'error': {'message': '用户不存在'}
            }), 404
        
        return jsonify({
            'success': True,
            'data': {'user': user.to_dict()}
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'获取用户信息失败：{str(e)}'}
        }), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """刷新访问token"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_active:
            return jsonify({
                'success': False,
                'error': {'message': '用户不存在或已被禁用'}
            }), 401
        
        new_token = create_access_token(identity=user_id)
        
        return jsonify({
            'success': True,
            'message': 'Token刷新成功',
            'data': {'access_token': new_token}
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'Token刷新失败：{str(e)}'}
        }), 500
