const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();

// CORS-Einstellungen: Zulassen von allen Origins
const corsOptions = {
    origin: '*', // Alle Origins erlauben
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Route für GET /helloworld
app.get('/helloworld', (req, res) => {
    res.send("helloworld");
});

// Route für GET /api/languages
app.get('/api/languages', async (req, res) => {
    try {
        const languages = await prisma.Languages.findMany();
        res.json(languages);
    } catch (error) {
        console.error('Fehler beim Abrufen der Sprachen:', error);
        res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
    }
});

// Route für POST /api/languages
app.post('/api/languages', async (req, res) => {
    try {
        const {
            name,
            description,
            keywords,
            version,
            creator,
            filepath,
            picturepath
        } = req.body;

        // Validierung der erforderlichen Felder
        if (!name || !keywords || !filepath) {
            return res.status(400).json({ error: 'Die Felder "name", "keywords" und "filepath" sind erforderlich.' });
        }

        // Validierung, dass 'keywords' ein Array von Strings ist
        if (!Array.isArray(keywords) || !keywords.every(k => typeof k === 'string')) {
            return res.status(400).json({ error: '"keywords" muss ein Array von Strings sein.' });
        }

        // Erstellung des neuen Language-Eintrags in der Datenbank
        const newLanguage = await prisma.Language.create({
            data: {
                name,
                description: description || null,
                keywords,
                version: version || null,
                creator: creator || null,
                filepath,
                picturepath: picturepath || null,
            },
        });

        // Erfolgreiche Antwort mit dem erstellten Objekt
        res.status(201).json(newLanguage);
    } catch (error) {
        console.error('Fehler beim Erstellen der Sprache:', error);

        // Behandlung von Prisma-spezifischen Fehlern
        if (error.code === 'P2002') { // Unique Constraint Violation
            return res.status(409).json({ error: 'Ein Eintrag mit den angegebenen eindeutigen Feldern existiert bereits.' });
        }

        // Allgemeine Fehlerbehandlung
        res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
    }
});

// Route für PATCH /api/languages/:id
app.patch('/api/languages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validierung, dass mindestens ein Feld zum Aktualisieren übergeben wurde
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Es muss mindestens ein Feld zum Aktualisieren übergeben werden.' });
        }

        const updatedLanguage = await prisma.Language.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        res.status(200).json(updatedLanguage);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Sprache:', error);

        // Behandlung von Prisma-spezifischen Fehlern
        if (error.code === 'P2025') { // Record Not Found
            return res.status(404).json({ error: 'Sprache mit der angegebenen ID wurde nicht gefunden.' });
        }

        // Behandlung von Unique Constraint Violations
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Ein Eintrag mit den angegebenen eindeutigen Feldern existiert bereits.' });
        }

        // Allgemeine Fehlerbehandlung
        res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
    }
});

// Server starten
const PORT = process.env.BACKEND_PORT || 3111;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
