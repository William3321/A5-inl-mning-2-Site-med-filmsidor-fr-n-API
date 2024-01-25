import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';
import fetch from 'node-fetch';
import { marked } from 'marked';

const app = express();
const port = 5080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.locals.marked = marked;

// Visa en lista med alla filmer
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        const movies = data.data; // Anpassa detta beroende på API-strukturen

        res.render('movielist', { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Visa en enskild filmsida baserat på filmens ID
// Visa en enskild filmsida baserat på filmens ID
app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`);
        const movie = await response.json();

        console.log('Movie data:', movie);

        // Check if the expected properties exist
        if (movie && movie.data && movie.data.attributes && movie.data.attributes.intro) {
            // Use marked to render the intro text
            movie.data.attributes.intro = marked(movie.data.attributes.intro);

            res.render('movieDetail', { movie });
        } else {
            console.error('Invalid movie data structure:', movie);
            res.status(404).render('notFound'); // Använd 404-status och rendera notFound-vyn
        }
    } catch (error) {
        console.error(error);
        res.status(404).render('notFound'); // Använd 404-status och rendera notFound-vyn
    }
});

// Handtag för 404-fel på andra sidor
app.use((req, res) => {
    res.status(404).render('notFound');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


export default app;