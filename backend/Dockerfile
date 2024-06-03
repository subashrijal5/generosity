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

# RUN npx drizzle-kit generate

# RUN npx drizzle-kit migrate

# # Build the TypeScript project
# RUN npm run build

# Expose the port your Express.js app will run on
EXPOSE 8081

# Start the app
CMD ["npm", "run", "dev"]