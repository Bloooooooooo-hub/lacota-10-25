FROM node:20-alpine
WORKDIR /app

# Copier config
COPY package.json package-lock.json* ./

# Installer dépendances
RUN npm install --legacy-peer-deps

# Copier le reste du code
COPY . .

# Build Next.js
RUN npm run build

# Exposer le port
EXPOSE 3101

# Variables d’environnement
ENV NODE_ENV=production
ENV PORT=3101

# Lancer en prod
CMD ["npm", "start"]
