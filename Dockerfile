# Stage 1: Build the application
FROM node:18-alpine AS builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM node:18-alpine AS runner

ENV NODE_ENV production
ENV PORT 3000


WORKDIR /app


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./


RUN npm install --production

EXPOSE 3000


CMD ["npm", "run", "start"]
