# Use Node.js image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy the rest of the code
COPY . .

# Build the React app
RUN npm run build

# Serve using nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]