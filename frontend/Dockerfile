# Use an official Node.js Alpine base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first
COPY package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy the frontend application code
COPY . .

# Set the environment to development
ENV NODE_ENV=development

# Document the Vite development server port
EXPOSE 5173

# Start the Vite development server and allow access outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]