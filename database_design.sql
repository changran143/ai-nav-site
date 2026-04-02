-- 企鹅AI基地数据库架构设计
-- 创建时间：2026-04-02

-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'premium_admin')),
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- 会员等级表
CREATE TABLE membership_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    features JSON, -- 存储会员功能列表
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户会员订阅表
CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    membership_level_id INTEGER REFERENCES membership_levels(id),
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI工具分类表
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI工具表
CREATE TABLE tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    logo VARCHAR(100),
    category_id INTEGER REFERENCES categories(id),
    description TEXT NOT NULL,
    short_desc VARCHAR(500),
    pricing_type VARCHAR(50) CHECK (pricing_type IN ('free', 'freemium', 'paid', 'free_trial')),
    price_range VARCHAR(100),
    official_url VARCHAR(500),
    affiliate_url VARCHAR(500),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    submitted_by INTEGER REFERENCES users(id),
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工具标签表
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7), -- 十六进制颜色值
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工具标签关联表
CREATE TABLE tool_tags (
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);

-- 用户收藏表
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tool_id)
);

-- 工具评价表
CREATE TABLE tool_reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tool_id INTEGER REFERENCES tools(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    content TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tool_id)
);

-- 工具提交申请表
CREATE TABLE tool_submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    tool_name VARCHAR(200) NOT NULL,
    tool_url VARCHAR(500) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    description TEXT,
    pricing_info VARCHAR(100),
    contact_info VARCHAR(200),
    logo_url VARCHAR(500),
    screenshots JSON, -- 存储截图URL数组
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 需求市场工单表
CREATE TABLE market_tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    budget_range VARCHAR(100),
    contact_info VARCHAR(200),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'closed')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 支付订单表
CREATE TABLE payment_orders (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    order_type VARCHAR(50) CHECK (order_type IN ('membership', 'tool_submission', 'featured_placement')),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    gateway_order_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP,
    refunded_at TIMESTAMP
);

-- 系统配置表
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- 是否可以在前端访问
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 操作日志表
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id INTEGER,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 知识库章节表
CREATE TABLE knowledge_chapters (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 知识库文章表
CREATE TABLE knowledge_articles (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES knowledge_chapters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, -- Markdown内容
    sort_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_featured ON tools(is_featured);
CREATE INDEX idx_tools_active ON tools(is_active);
CREATE INDEX idx_tool_reviews_tool ON tool_reviews(tool_id);
CREATE INDEX idx_tool_reviews_rating ON tool_reviews(rating);
CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- 插入初始数据
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('AI 对话', 'ai-chat', '智能对话助手和聊天机器人', '💬', 1),
('AI 绘画', 'ai-art', 'AI图像生成和艺术创作工具', '🎨', 2),
('AI 视频', 'ai-video', 'AI视频生成和编辑工具', '🎬', 3),
('AI 编程', 'ai-coding', 'AI辅助编程和代码生成工具', '⌨️', 4),
('AI 自动化', 'ai-automation', 'AI自动化工作流和智能体工具', '🔗', 5),
('AI 音频', 'ai-audio', 'AI音频生成、音乐创作和语音工具', '🎵', 6),
('AI 写作', 'ai-writing', 'AI写作助手和内容生成工具', '✏️', 7),
('数据分析', 'data-analysis', 'AI数据分析和可视化工具', '📊', 8);

INSERT INTO membership_levels (name, price_monthly, price_yearly, features) VALUES
('免费版', 0, 0, '["浏览全部工具", "基础搜索筛选", "工具收藏(最多20个)", "基础评价功能"]'),
('月会员', 19.00, 0, '["全部免费版权益", "独家深度评测", "工具对比报告", "去广告体验", "优先客服支持", "无限工具收藏"]'),
('年会员', 0, 199.00, '["全部月会员权益", "课程8折优惠", "私密社群入口", "每月AI趋势报告", "线上交流活动", "专属1v1咨询"]');

INSERT INTO system_settings (key, value, description, is_public) VALUES
('site_name', '企鹅AI基地', '网站名称', true),
('site_description', '一站式AI资源服务平台', '网站描述', true),
('contact_email', '18562703379@163.com', '联系邮箱', true),
('tool_submission_free_count', '3', '免费用户每月可提交工具数量', false),
('featured_tool_price', '299.00', '首页推荐位价格(元/周)', false);
