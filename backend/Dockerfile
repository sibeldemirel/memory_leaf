# backend/Dockerfile
FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript -> dist/
RUN npm run build

# Vérification optionnelle (à commenter après test)
RUN ls -la dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
