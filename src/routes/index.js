/** @format */

//import routers
const searchRouter = require('./search');
const sitesRouter = require('./sites');

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },

    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

function route(app) {
    //trang search
    app.use('/search', searchRouter);

    app.post('/search', (req, res) => {
        console.log(req.body);
        res.render('search', { title: 'Search Page' });
    });

    //API for tours
    app.get('/tours', (req, res) =>
        res.render('tours', { title: 'Tour Page', tour: tours }),
    ); //liệt kê

    app.post('/tours', (req, res) => {
        let newId = tours[-1].id + 1;
        let newTour = { id: newId, name: req.body.name, price: req.body.price };
        tours.push(newTour);
        res.render('tours', { tour: tours });
    });

    app.get('/tours/:id', (req, res) => {
        //update
        const p = [tours.find((p) => p.id === parseInt(req.params.id))]; //lấy từ đường dẫn, req.body thì lấy từ value client truyền xuống
        if (!p) return res.status(404).json({ error: 'No such tour exists' });

        if (req.body.name) p.name = req.body.name;

        if (req.body.price) p.price = req.body.price;

        res.render('tours', { tour: p });
    });

    app.delete('/tour/:id', (req, res) => {
        //delete

        const idx = tours.findIndex(
            (tour) => tour.id === parseInt(req.params.id),
        );

        if (idx < 0) return res.json({ error: 'No such tour exists.' });

        tours.splice(idx, 1);

        res.render('tours', { tour: tours });
    });

    //trang home
    app.use('/', sitesRouter);
}

module.exports = route;
