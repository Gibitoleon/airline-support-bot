# Use an official Node.js Alpine base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first
COPY package*.json ./

# Install all dependencies, including development dependencies
RUN npm ci

# Copy the backend application code
COPY . .

# Set the environment to development
ENV NODE_ENV=development

# Document the Express server port
EXPOSE 3000

# Start the application with Nodemon
CMD ["npm", "run", "dev"]