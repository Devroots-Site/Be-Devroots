# Verwende eine neuere Node-Version
FROM node:18

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Installiere pnpm
RUN npm install -g pnpm

# Kopiere die package.json und pnpm-lock.yaml, bevor du pnpm installierst
COPY package.json pnpm-lock.yaml ./

# Installiere die Abhängigkeiten mit pnpm
RUN pnpm install

# Kopiere die Prisma-Dateien und die .env-Datei
COPY prisma ./prisma/
COPY .env .env

# Kopiere den Rest des Codes in das Container-Verzeichnis
COPY . .

# Generiere den Prisma-Client explizit mit pnpm
RUN pnpm exec prisma generate

# Starte die Anwendung
CMD ["pnpm", "start"]
