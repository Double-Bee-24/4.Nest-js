FROM node:22-alpine AS base
WORKDIR /usr/src

# Install dependencies for frontend
FROM base AS frontend-deps
WORKDIR /usr/src/frontend
COPY client/package*.json ./
RUN npm install --frozen-lockfile

# Build frontend
FROM frontend-deps AS frontend-builder
COPY client/. .
RUN npm run build

# Install dependencies for server
FROM base AS server-deps
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install --frozen-lockfile

# Build server
FROM server-deps AS server-builder
COPY server/. .
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install --omit=dev --frozen-lockfile

COPY --from=server-builder /usr/src/app/dist ./dist
COPY --from=server-builder /usr/src/app/seeding_data ./seeding_data
COPY --from=server-builder /usr/src/app/images ./images
COPY --from=frontend-builder /usr/src/frontend/dist ./static/client

EXPOSE 4000
CMD ["npm", "run", "start:prod"]
