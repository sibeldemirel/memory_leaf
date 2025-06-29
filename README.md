# 🌿 MemoryLeaf

**MemoryLeaf** est une application de mémorisation inspirée d'Anki, combinant un système de cartes, un mode Pomodoro et une interface zen. Développée dans le cadre du titre professionnel **Concepteur Développeur d'Applications (CDA)**, elle utilise une architecture monolithique structurée en frontend React/Next.js, backend Express.js, avec un double stockage PostgreSQL/MongoDB.

---

## 🧱 Architecture

- **Frontend** : Next.js + TailwindCSS
- **Backend** : Express.js + TypeScript
- **Base de données relationnelle** : PostgreSQL (Prisma)
- **Base de données NoSQL** : MongoDB (Mongoose pour les logs/actions)
- **Conteneurisation** : Docker & Docker Compose

---

## ⚙️ Fonctionnalités

- 🗃️ Gestion des decks et cartes mémoire
- ⏱️ Timer Pomodoro intégré pour révisions efficaces
- 👤 Authentification (JWT)
- 📜 Historique des actions utilisateur (logs MongoDB)
- 🧪 Tests unitaires avec Jest
- 🌐 API REST documentée avec Swagger

---

## 🚀 Lancer le projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/memoryleaf.git
cd memoryleaf
```

### 2. Créer les fichiers `.env`

#### Backend (`./backend/.env`)
```env
DATABASE_URL=postgresql://USER:PASSWORD@postgres:5432/memoryleaf
MONGO_URI=mongodb://memoryleaf-mongo:27017/memoryleaf
JWT_SECRET=changeme
```

#### Frontend (`./frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Lancer via Docker

```bash
docker-compose up --build
```
### Ou lancer l'environnement avec le script setup.sh

```bash
sh setup.sh
```

- 🖥️ Frontend : http://localhost:3000  
- 📡 Backend API : http://localhost:5000  
- 🐘 PostgreSQL : port `5432`  
- 🍃 MongoDB : port `27017`

---

## 🧪 Tests

```bash
# Lancer les tests du backend
docker exec -it memoryleaf-backend npm test
```

---

## 📁 Structure

```
memoryleaf/
├── backend/            # Express.js + Prisma + Mongoose
├── frontend/           # Next.js + TailwindCSS
├── docker-compose.yml
└── README.md
```

---

## 📖 Auteurs

Projet réalisé par Sibel DEMIREL
📅 Année : 2025  
🏫 Formation : CDA - 2iAcademy