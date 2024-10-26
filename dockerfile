FROM node:16

ARG REPO_URL

# Installiere Git und klone das Repository
RUN apt-get update && apt-get install -y git
RUN git clone ${REPO_URL} /app

WORKDIR /app

# Installiere Abhängigkeiten und Prisma
RUN npm install
RUN npx prisma generate

# Starte die Anwendung
CMD ["npm", "start"]

# Expose Port
EXPOSE 3000
