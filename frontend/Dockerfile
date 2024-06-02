# Use the official Node.js image as the base
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

ENV HOST 0.0.0.0

# # Build the TypeScript project
RUN npm run build

# Expose the port your Express.js app will run on
EXPOSE 3000

# Start the app
CMD ["npm","run", "preview"]