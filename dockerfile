# Verwende eine neuere Node-Version
FROM node:18

# Installiere Git, um das Repository zu klonen
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Klone das Repository
RUN git clone https://github.com/Devroots-Site/Be-Devroots .

# Installiere die Abhängigkeiten mit npm
RUN npm install

# Generiere den Prisma-Client explizit mit npm
RUN npx prisma generate

# Starte die Anwendung
CMD ["npm", "start"]
