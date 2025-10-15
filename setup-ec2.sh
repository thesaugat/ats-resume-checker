#!/bin/bash
# EC2 Setup Script - Run this on your EC2 instance after first login

set -e

echo "🚀 Setting up EC2 instance for Docker deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

# Start and enable Docker
echo "▶️  Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

# Install git
echo "📚 Installing Git..."
sudo apt install -y git

# Create app directory
echo "📁 Creating app directory..."
mkdir -p ~/app
cd ~/app

# Clone repository (you'll need to replace this with your repo)
echo "📥 Clone your repository manually with:"
echo "cd ~/app"
echo "git clone https://github.com/thesaugat/ats-resume-checker.git ."

# Install additional utilities
echo "🛠️  Installing utilities..."
sudo apt install -y htop curl wget vim

# Setup firewall (UFW)
echo "🔒 Configuring firewall..."
sudo ufw --force enable
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 8000/tcp # Backend (optional, if you want direct access)
sudo ufw status

# Display versions
echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Installed versions:"
docker --version
docker-compose --version
git --version
echo ""
echo "⚠️  IMPORTANT: You need to log out and log back in for docker group changes to take effect!"
echo ""
echo "Next steps:"
echo "1. Log out and log back in (or run: newgrp docker)"
echo "2. Clone your repository to ~/app"
echo "3. Set up GitHub secrets"
echo "4. Push to main branch to trigger deployment"
echo ""
echo "🌐 Your EC2 Public IP: $(curl -s http://checkip.amazonaws.com)"