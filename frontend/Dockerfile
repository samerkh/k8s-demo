# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the built files from the previous stage
COPY --from=build /usr/src/app/dist/frontend/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
