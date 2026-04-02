from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User
from app.api import users_bp

@users_bp.route('/test', methods=['GET'])
@jwt_required()
def test():
    return jsonify({
        'success': True,
        'message': '用户API正常工作！'
    })

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """获取用户资料"""
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
            'error': {'message': f'获取用户资料失败：{str(e)}'}
        }), 500

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """更新用户资料"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({
                'success': False,
                'error': {'message': '用户不存在'}
            }), 404
        
        data = request.get_json()
        
        # 更新允许的字段
        if 'phone' in data:
            user.phone = data['phone']
        
        if 'avatar_url' in data:
            user.avatar_url = data['avatar_url']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': '资料更新成功',
            'data': {'user': user.to_dict()}
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {'message': f'更新资料失败：{str(e)}'}
        }), 500
