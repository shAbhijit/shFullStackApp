###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine3.20 AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/backend/package*.json ./packages/backend/

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci --ignore-scripts

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine3.20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run db:generate --workspace packages/backend
RUN npm run build --workspace packages/backend

# Set NODE_ENV environment variable
ENV NODE_ENV=production

# Running `npm ci` removes the existing node_modules directory. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --workspace packages/backend && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine3.20 AS production

# defaults to local-build
ARG VERSION='local-build'
ARG BUILD_START
ARG COMMIT_SHA
LABEL org.opencontainers.image.created="$BUILD_START"
LABEL org.opencontainers.image.authors="Abhijit"
LABEL org.opencontainers.image.version="$VERSION"
LABEL org.opencontainers.image.revision="$COMMIT_SHA"
LABEL org.opencontainers.image.title="Book Api"
LABEL org.opencontainers.image.description="A RESTful API for managing books"
LABEL org.opencontainers.image.base.name="node:20-alpine"
ENV APP_VERSION=$VERSION
ENV DD_VERSION=$VERSION
ENV BACKEND_API_PORT=3001
ENV NODE_ENV=production
ENV NO_COLOR=true
HEALTHCHECK --interval=5m --timeout=10s --start-period=5s --retries=3 CMD curl --fail-with-body --write-out "\n%{http_code}\n" 127.0.0.1:3001/health || exit 1

# Use an environment variable for UID
ARG APP_UID=1001
RUN adduser -u $APP_UID -D appuser

# Copy the bundled code from the build stage to the production image
# changes rarely
COPY --chown=appuser:appuser --from=build /usr/src/app/packages/backend/prisma ./prisma
# changes often
COPY --chown=appuser:appuser --from=build /usr/src/app/node_modules ./node_modules
# changes often
COPY --chown=appuser:appuser --from=build /usr/src/app/packages/backend/dist ./dist

# invalidates cache anyway
RUN apk --no-cache add curl

USER appuser

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]
