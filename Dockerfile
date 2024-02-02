FROM node:21-alpine as base

FROM base as builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci
COPY src ./src
COPY prisma ./prisma
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run prisma:generate
RUN npm run build

FROM base as runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "node", "server.js" ]