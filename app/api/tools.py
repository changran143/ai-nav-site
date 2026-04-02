from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Tool, Category
from app.api import tools_bp

@tools_bp.route('/test', methods=['GET'])
def test():
    return jsonify({
        'success': True,
        'message': '工具API正常工作！',
        'data': {
            'total_tools': Tool.query.count(),
            'total_categories': Category.query.count()
        }
    })

@tools_bp.route('/', methods=['GET'])
def get_tools():
    """获取工具列表"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category = request.args.get('category')
        search = request.args.get('search')
        
        # 构建查询
        query = Tool.query.filter_by(is_active=True)
        
        if category:
            query = query.join(Tool.category).filter(Category.slug == category)
        
        if search:
            query = query.filter(
                Tool.name.contains(search) | 
                Tool.description.contains(search)
            )
        
        # 分页
        pagination = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        tools = [tool.to_dict() for tool in pagination.items]
        
        return jsonify({
            'success': True,
            'data': {
                'items': tools,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': pagination.total,
                    'pages': pagination.pages,
                    'has_prev': pagination.has_prev,
                    'has_next': pagination.has_next
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'获取工具列表失败：{str(e)}'}
        }), 500

@tools_bp.route('/categories', methods=['GET'])
def get_categories():
    """获取分类列表"""
    try:
        categories = Category.query.filter_by(is_active=True).order_by(Category.sort_order).all()
        return jsonify({
            'success': True,
            'data': {'categories': [cat.to_dict() for cat in categories]}
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'获取分类列表失败：{str(e)}'}
        }), 500

@tools_bp.route('/<int:tool_id>', methods=['GET'])
def get_tool(tool_id):
    """获取工具详情"""
    try:
        tool = Tool.query.get(tool_id)
        
        if not tool or not tool.is_active:
            return jsonify({
                'success': False,
                'error': {'message': '工具不存在'}
            }), 404
        
        return jsonify({
            'success': True,
            'data': {'tool': tool.to_dict()}
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'message': f'获取工具详情失败：{str(e)}'}
        }), 500
