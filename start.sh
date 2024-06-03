#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Functions
start_dev() {
  echo -e "${GREEN}Copying ./backend/.env.example to ./backend/.env${NC}"
  cp ./backend/.env.example ./backend/.env

  echo -e "${GREEN}Starting Docker containers...${NC}"
  docker-compose up -d

  echo -e "${GREEN}Copying node_modules from containers to local directories...${NC}"
  copy_node_modules
}

copy_env_file() {
  read -p "Enter the path to your .env file (e.g., ./frontend/.env): " env_file_path
  if [ -f "$env_file_path" ]; then
    echo -e "${GREEN}Copying $env_file_path to ./frontend/.env${NC}"
    cp "$env_file_path" ./frontend/.env
  else
    echo -e "${RED}File not found: $env_file_path${NC}"
  fi
}

run_containers() {
  echo -e "${GREEN}Starting Docker containers...${NC}"
  docker-compose up -d
}

copy_node_modules() {
  frontend_container=$(docker-compose ps -q frontend)
  backend_container=$(docker-compose ps -q backend)

  if [ -n "$frontend_container" ]; then
    echo -e "${GREEN}Copying node_modules from frontend container to ./frontend/node_modules...${NC}"
    docker cp "$frontend_container:/app/node_modules" ./frontend/node_modules
  else
    echo -e "${RED}Frontend container not found.${NC}"
  fi

  if [ -n "$backend_container" ]; then
    echo -e "${GREEN}Copying node_modules from backend container to ./backend/node_modules...${NC}"
    docker cp "$backend_container:/app/node_modules" ./backend/node_modules
  else
    echo -e "${RED}Backend container not found.${NC}"
  fi
}

# Main menu
while true; do
  echo -e "${GREEN}Select an option:${NC}"
  echo "1. Start Dev"
  echo "2. Copy .env file"
  echo "3. Run Docker containers"
  echo "4. Copy node_modules from containers"
  echo "5. Exit"

  read -p "Enter your choice (1-5): " choice

  case $choice in
    1)
      start_dev
      ;;
    2)
      copy_env_file
      ;;
    3)
      run_containers
      ;;
    4)
      copy_node_modules
      ;;
    5)
      echo -e "${GREEN}Exiting...${NC}"
      exit 0
      ;;
    *)
      echo -e "${RED}Invalid choice. Please try again.${NC}"
      ;;
  esac
done