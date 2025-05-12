# Frontend Dockerfile
FROM node:20-alpine3.20 AS build

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./
COPY packages/frontend/package*.json ./packages/frontend/

# Install dependencies
RUN npm install

# Copy only the necessary source files
COPY packages/frontend/src ./packages/frontend/src
COPY packages/frontend/public ./packages/frontend/public
COPY packages/frontend/tsconfig.json ./packages/frontend/tsconfig.json

# Build the frontend
RUN npm run build --prefix packages/frontend

# Ensure no npm commands are invoked in the production stage
FROM nginx:stable-alpine AS production

# Copy the build output to the nginx html directory
COPY --from=build /app/packages/frontend/build /usr/share/nginx/html

# Expose the port for nginx
EXPOSE 8080

# Start nginx to serve the static files
CMD ["nginx", "-g", "daemon off;"]
