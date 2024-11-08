# Verwende eine neuere Node-Version
FROM node:18

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json, bevor du npm installierst
COPY package*.json ./

# Installiere die Abhängigkeiten (einschließlich Prisma)
RUN npm install --force

# Kopiere die Prisma-Dateien explizit, falls sie in /prisma gespeichert sind
COPY prisma ./prisma/

# Kopiere die .env-Datei, damit Prisma die benötigten Variablen hat
COPY .env .env

# Kopiere den Rest des Codes in das Container-Verzeichnis
COPY . .

# Debugging-Schritt: Zeigt den Inhalt des /app-Verzeichnisses
RUN ls -R /app

# Generiere den Prisma-Client
RUN npx prisma generate --schema=./prisma/schema.prisma


# Starte die Anwendung
CMD ["npm", "start"]
