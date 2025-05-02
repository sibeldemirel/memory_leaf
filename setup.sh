echo -e "\n➡️ Construction et lancement des containers Docker..."
docker-compose up -d --build

echo -e "\n✅ Docker containers lancés.\n"

echo -e "\n➡️ Initialisation de Prisma (Migrations + Generate)..."
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma generate

echo -e "\n✅ Prisma initialisé.\n"

echo -e "\n🚀 Votre environnement MemoryLeaf est prêt !\n"

exit 0
