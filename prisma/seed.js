const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding");
    const defaultLanguages = [
        {
            name: 'Asciidoc',
            description: 'AsciiDoc ist eine einfache Markup-Sprache, die zur Erstellung von Dokumentationen und anderen textbasierten Inhalten verwendet wird, und dabei ähnlich wie Markdown funktioniert, aber umfangreichere Formatierungsoptionen bietet.',
            keywords: ['documentation',],
            version: '1.2.0',
            creator: 'Bichler Bastian',
            filepath: 'asciidoc/ascii.html',
            picturepath: 'asciidoc/'
        },
        {
            name: 'CSS',
            description: 'CSS (Cascading Style Sheets) ist eine Stylesheet-Sprache',
            keywords: ['coding', 'styling', 'web-development'],
            version: '1.1.0',
            creator: 'Bichler Bastian',
            filepath: 'css/css.html',
            picturepath: 'css/'
        },
        {
            name: 'DevTools',
            description: 'Webentwicklertools, die in Google Chrome integriert sind.',
            keywords: ['tool', 'debugging',],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'devTools/devtools.html',
            picturepath: 'devTools/doc/_static/'
        },
        {
            name: 'Git',
            description: 'Versionsverwaltungssystem, das von Linus Torvalds entwickelt wurde, um den Linux-Kernel zu verwalten',
            keywords: ['tool', 'coding', 'backup',],
            version: '2.0.0',
            creator: 'Bichler Bastian',
            filepath: 'git/_build/html/index.html',
            picturepath: 'git/_static/'
        },
        {
            name: 'Java',
            description: 'Java ist eine objektorientierte Programmiersprache und eine eingetragene Marke des Unternehmens Sun Microsystems. Sie wurde 1995 von Sun Microsystems veröffentlicht und ist eine der am häufigsten verwendeten Programmiersprachen. ',
            keywords: ['coding', 'sql', 'software-development'],
            version: '2.2.0',
            creator: 'Bichler Bastian',
            filepath: 'java/_build/html/index.html',
            picturepath: 'java/_static/'
        },
        {
            name: 'Linux',
            description: 'Generelle Linux Befehle',
            keywords: ['os', 'tool'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'linux/_build/html/index.html',
            picturepath: 'linux/_static/'
        },
        {
            name: 'PHP',
            description: 'Eine serverseitige Skriptsprache, die hauptsächlich für die Webentwicklung verwendet wird. Es kann in HTML eingebettet werden und wird häufig mit MySQL-Datenbanken verwendet.',
            keywords: ['coding', 'sql', 'web-development'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'php/php.html',
            picturepath: 'php/'
        },
        {
            name: 'Python',
            description: 'Eine Python Dokumentation über die Grundlagen CLI Programme',
            keywords: ['coding', 'cli', 'tool', 'software-development'],
            version: '1.5.0',
            creator: 'Bichler Bastian',
            filepath: 'python/_build/html/index.html',
            picturepath: 'python/_static/'
        },
        {
            name: 'Sass',
            description: 'Sass ist eine Stylesheet-Sprache, die als CSS-Präprozessor bezeichnet wird. Sie ermöglicht es Entwicklern, CSS-Dateien effizienter und effektiver zu schreiben.',
            keywords: ['coding', 'styling', 'web-development'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'sass/sass.html',
            picturepath: 'sass/'
        },
        {
            name: 'JavaScript',
            description: 'JavaScript ist eine Skriptsprache, die hauptsächlich in Webseiten verwendet wird. Sie ermöglicht es, interaktive Elemente auf Webseiten zu erstellen, die sich dynamisch verhalten. JavaScript ist eine Skriptsprache, die hauptsächlich in Webseiten verwendet wird. Sie ermöglicht es, interaktive Elemente auf Webseiten zu erstellen, die sich dynamisch verhalten.',
            keywords: ['coding', 'web-development'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'javascript/_build/html/index.html',
            picturepath: 'javascript/_static/'
        },
        {
            name: 'Sphinx',
            description: 'Sphinx ist eine Documententation bassierend auf Pyhton linux und co',
            keywords: ['documentation'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'sphinx/_build/html/index.html',
            picturepath: 'sphinx/_static/'
        },
        {
            name: 'TypeScript',
            description: 'TypeScript ist eine von Microsoft entwickelte Programmiersprache, die als Übermenge von JavaScript entwickelt wurde. Sie fügt optionale statische Typisierung und andere Funktionen hinzu, die die Entwicklung von JavaScript-Anwendungen erleichtern.',
            keywords: ['coding', 'web-development'],
            version: '1.0.0',
            creator: 'Bichler Bastian',
            filepath: 'typescript/typescript.html',
            picturepath: 'typescript/'
        },

    ]

    await prisma.Language.deleteMany()
    for (const lang of defaultLanguages) {
        await prisma.language.upsert({
            where: { name: lang.name },
            update: {}, // Keine Aktualisierung, wenn der Eintrag bereits existiert
            create: lang,
        });
    }

}

main()
    .catch((e) => {
        console.error('Fehler beim Einfügen der Standarddaten:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });