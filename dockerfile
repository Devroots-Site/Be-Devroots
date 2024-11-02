FROM node:16


WORKDIR /app

# Installiere Abhängigkeiten und Prisma
RUN npm install
RUN npx prisma generate
RUN npm run prisma:seed


# Starte die Anwendung
CMD ["npm", "start"]

# Expose Port
EXPOSE 3111
