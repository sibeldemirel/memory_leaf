FROM node:20-bookworm-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
# 1. Copy only package.json and lock first
COPY package*.json ./
# 2. Copy prisma folder (VERY IMPORTANT before install)
COPY prisma ./prisma
# 3. Install dependencies (postinstall will find prisma/schema.prisma)
RUN npm install
# 4. Copy the rest of the code
COPY . .
# 5. Build the project
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
