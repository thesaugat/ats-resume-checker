#!/bin/bash
# Smart deployment script

cd ~/app

echo "🚀 Pulling latest code..."
git pull origin master

# Check what files changed
CHANGED_FILES=$(git diff HEAD@{1} --name-only)

# Check if Dockerfiles or requirements changed
if echo "$CHANGED_FILES" | grep -q -E "Dockerfile|requirements.txt|package.json"; then
    echo "🔨 Dockerfile or dependencies changed - full rebuild needed"
    sudo docker-compose -f docker-compose.prod.yml down
    sudo docker-compose -f docker-compose.prod.yml up -d --build
else
    echo "⚡ Code changes only - quick restart"
    sudo docker-compose -f docker-compose.prod.yml up -d
fi

echo "✅ Deployment complete!"
sudo docker ps