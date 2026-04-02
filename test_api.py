#!/usr/bin/env python3
"""
企鹅AI基地 - API测试脚本
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_api():
    """测试所有API接口"""
    print("🧪 开始测试企鹅AI基地API...")
    print("=" * 50)
    
    # 1. 测试认证API
    print("\n📝 测试认证API...")
    
    # 测试注册
    register_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "test123456"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=register_data)
        print(f"注册接口状态码: {response.status_code}")
        if response.status_code == 201:
            print("✅ 注册成功")
            token_data = response.json()['data']
            access_token = token_data['access_token']
        else:
            print(f"❌ 注册失败: {response.text}")
            return
    except Exception as e:
        print(f"❌ 注册请求失败: {e}")
        return
    
    # 测试登录
    login_data = {
        "email": "test@example.com",
        "password": "test123456"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
        print(f"登录接口状态码: {response.status_code}")
        if response.status_code == 200:
            print("✅ 登录成功")
            token_data = response.json()['data']
            access_token = token_data['access_token']
        else:
            print(f"❌ 登录失败: {response.text}")
            return
    except Exception as e:
        print(f"❌ 登录请求失败: {e}")
        return
    
    # 测试获取用户信息
    headers = {"Authorization": f"Bearer {access_token}"}
    try:
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        print(f"用户信息接口状态码: {response.status_code}")
        if response.status_code == 200:
            print("✅ 获取用户信息成功")
        else:
            print(f"❌ 获取用户信息失败: {response.text}")
    except Exception as e:
        print(f"❌ 用户信息请求失败: {e}")
    
    # 2. 测试工具API
    print("\n🔧 测试工具API...")
    
    # 测试获取工具列表
    try:
        response = requests.get(f"{BASE_URL}/api/tools/")
        print(f"工具列表接口状态码: {response.status_code}")
        if response.status_code == 200:
            data = response.json()['data']
            print(f"✅ 获取工具列表成功，共 {data['pagination']['total']} 个工具")
        else:
            print(f"❌ 获取工具列表失败: {response.text}")
    except Exception as e:
        print(f"❌ 工具列表请求失败: {e}")
    
    # 测试获取分类列表
    try:
        response = requests.get(f"{BASE_URL}/api/tools/categories")
        print(f"分类列表接口状态码: {response.status_code}")
        if response.status_code == 200:
            data = response.json()['data']
            print(f"✅ 获取分类列表成功，共 {len(data['categories'])} 个分类")
        else:
            print(f"❌ 获取分类列表失败: {response.text}")
    except Exception as e:
        print(f"❌ 分类列表请求失败: {e}")
    
    # 3. 测试用户API
    print("\n👤 测试用户API...")
    
    # 测试获取用户资料
    try:
        response = requests.get(f"{BASE_URL}/api/users/profile", headers=headers)
        print(f"用户资料接口状态码: {response.status_code}")
        if response.status_code == 200:
            print("✅ 获取用户资料成功")
        else:
            print(f"❌ 获取用户资料失败: {response.text}")
    except Exception as e:
        print(f"❌ 用户资料请求失败: {e}")
    
    print("\n🎉 API测试完成！")
    print("=" * 50)
    print("如果所有测试都显示 ✅，说明你的API环境已经搭建成功！")
    print("现在可以开始前端集成了。")

if __name__ == "__main__":
    test_api()
