FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
# Cloudtype이 할당하는 PORT 사용, 0.0.0.0로 바인딩 필수
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
