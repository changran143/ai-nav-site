import re
from email_validator import validate_email as email_validate, EmailNotValidError

def validate_email(email):
    """验证邮箱格式"""
    try:
        email_validate(email)
        return True
    except EmailNotValidError:
        return False

def validate_password(password):
    """验证密码强度"""
    if len(password) < 8:
        return False
    
    # 检查是否包含字母
    if not re.search(r'[a-zA-Z]', password):
        return False
    
    # 检查是否包含数字
    if not re.search(r'\d', password):
        return False
    
    return True

def validate_username(username):
    """验证用户名"""
    if len(username) < 3 or len(username) > 20:
        return False
    
    # 只允许字母、数字、下划线
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False
    
    return True
