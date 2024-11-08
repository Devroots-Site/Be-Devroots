# Verwende eine neuere Node-Version
FROM node:18

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json, bevor du npm installierst
# Das hilft dabei, den Docker-Cache effizient zu nutzen
COPY package*.json ./

# Installiere die Abhängigkeiten (einschließlich Prisma)
RUN npm install

# Kopiere den Rest des Codes in das Container-Verzeichnis
COPY . .

# Generiere den Prisma-Client
RUN npx prisma generate


# Starte die Anwendung
CMD ["npm", "start"]
