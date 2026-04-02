# 企鹅AI基地 - 部署和运维方案

## 🌐 服务器架构

### 推荐配置（初期）
```
Web服务器: 阿里云ECS (2核4G, 40GB SSD)
数据库: 阿里云RDS PostgreSQL (基础版)
缓存: 阿里云Redis (基础版)
CDN: 阿里云CDN
域名: 阿里云域名 + SSL证书
```

### 中期扩展配置
```
负载均衡: 阿里云SLB
Web服务器: 多台ECS实例
数据库: RDS高可用版
缓存: Redis集群
文件存储: 阿里云OSS
监控: 阿里云云监控
```

## 🚀 部署流程

### 1. 服务器初始化

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install -y python3 python3-pip python3-venv nginx postgresql redis-server

# 创建项目用户
sudo useradd -m -s /bin/bash penguinai
sudo usermod -aG sudo penguinai

# 创建项目目录
sudo mkdir -p /var/www/penguinai
sudo chown penguinai:penguinai /var/www/penguinai
```

### 2. 数据库配置

```bash
# 安装PostgreSQL
sudo apt install postgresql postgresql-contrib

# 创建数据库和用户
sudo -u postgres psql
CREATE DATABASE penguinai;
CREATE USER penguinai_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE penguinai TO penguinai_user;
\q
```

### 3. Python环境配置

```bash
# 切换到项目用户
sudo su - penguinai

# 创建虚拟环境
cd /var/www/penguinai
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 4. 应用部署

```bash
# 克隆代码
git clone https://github.com/your-username/ai-nav-site.git .

# 初始化数据库
python manage.py db-upgrade

# 创建管理员用户
python manage.py create-admin

# 收集静态文件
python manage.py collect-static
```

### 5. Gunicorn配置

创建 `/etc/systemd/system/penguinai.service`:

```ini
[Unit]
Description=PenguinAI Web Application
After=network.target

[Service]
User=penguinai
Group=penguinai
WorkingDirectory=/var/www/penguinai
Environment="PATH=/var/www/penguinai/venv/bin"
ExecStart=/var/www/penguinai/venv/bin/gunicorn --workers 3 --bind unix:penguinai.sock -m 007 wsgi:app
Restart=always

[Install]
WantedBy=multi-user.target
```

### 6. Nginx配置

创建 `/etc/nginx/sites-available/penguinai`:

```nginx
server {
    listen 80;
    server_name penguinai.com www.penguinai.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name penguinai.com www.penguinai.com;

    ssl_certificate /etc/letsencrypt/live/penguinai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/penguinai.com/privkey.pem;

    # SSL配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # 静态文件
    location /static/ {
        alias /var/www/penguinai/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 上传文件
    location /uploads/ {
        alias /var/www/penguinai/uploads/;
        expires 1y;
        add_header Cache-Control "public";
    }

    # 主应用
    location / {
        proxy_pass http://unix:/var/www/penguinai/penguinai.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API接口
    location /api/ {
        proxy_pass http://unix:/var/www/penguinai/penguinai.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

### 7. 启动服务

```bash
# 启动并设置开机自启
sudo systemctl start penguinai
sudo systemctl enable penguinai
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status penguinai
sudo systemctl status nginx
```

## 🔧 运维管理

### 1. 自动化部署脚本

创建 `deploy.sh`:

```bash
#!/bin/bash

# 部署脚本
set -e

echo "开始部署企鹅AI基地..."

# 拉取最新代码
git pull origin main

# 激活虚拟环境
source venv/bin/activate

# 安装新依赖
pip install -r requirements.txt

# 数据库迁移
python manage.py db-upgrade

# 收集静态文件
python manage.py collect-static

# 重启服务
sudo systemctl restart penguinai

echo "部署完成！"
```

### 2. 备份策略

创建 `backup.sh`:

```bash
#!/bin/bash

# 数据库备份
BACKUP_DIR="/var/backups/penguinai"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 数据库备份
pg_dump -h localhost -U penguinai_user penguinai > $BACKUP_DIR/db_$DATE.sql

# 文件备份
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/penguinai/uploads

# 删除7天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: $DATE"
```

### 3. 监控配置

#### 系统监控 (Prometheus + Grafana)

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'penguinai'
    static_configs:
      - targets: ['localhost:8000']
    metrics_path: '/metrics'
```

#### 日志监控 (ELK Stack)

```yaml
# docker-compose.yml
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5044:5044"

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
```

### 4. 性能优化

#### 数据库优化

```sql
-- PostgreSQL配置优化
-- /etc/postgresql/13/main/postgresql.conf

shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
```

#### Redis优化

```conf
# /etc/redis/redis.conf

maxmemory 512mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

#### Nginx优化

```nginx
# 工作进程数
worker_processes auto;

# 连接数
events {
    worker_connections 1024;
}

# 启用gzip压缩
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# 缓存配置
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔒 安全配置

### 1. 防火墙配置

```bash
# UFW配置
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw deny 5432  # 禁止外网访问数据库
sudo ufw deny 6379  # 禁止外网访问Redis
```

### 2. SSL证书

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d penguinai.com -d www.penguinai.com

# 设置自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. 数据库安全

```sql
-- 创建只读用户
CREATE USER readonly_user WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE penguinai TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- 限制连接数
ALTER USER penguinai_user CONNECTION LIMIT 50;
```

## 📊 监控指标

### 1. 系统指标
- CPU使用率
- 内存使用率
- 磁盘使用率
- 网络流量

### 2. 应用指标
- 响应时间
- 错误率
- 并发用户数
- API调用次数

### 3. 业务指标
- 用户注册数
- 工具提交数
- 会员订阅数
- 收入统计

## 🚨 告警规则

### 1. 系统告警
- CPU使用率 > 80%
- 内存使用率 > 90%
- 磁盘使用率 > 85%
- 服务不可用

### 2. 应用告警
- 错误率 > 5%
- 响应时间 > 2秒
- 数据库连接失败
- Redis连接失败

### 3. 业务告警
- 用户注册失败率 > 10%
- 支付失败率 > 5%
- 新工具提交数量异常

## 📈 扩展方案

### 1. 水平扩展
- 负载均衡器
- 多台Web服务器
- 数据库读写分离
- 缓存集群

### 2. 容器化部署
```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/penguinai
      - REDIS_URL=redis://redis:6379

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=penguinai
      - POSTGRES_USER=penguinai_user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs

volumes:
  postgres_data:
```

### 3. 云原生部署
- Kubernetes集群
- Helm Charts
- 自动扩缩容
- 服务网格
