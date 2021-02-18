/** @format */

const fortunes = [
    'Conquer your fears or they will conquer you.',

    'Rivers need springs.',

    "Do not fear what you don't know.",

    'You will have a pleasant surprise.',

    'Whenever possible, keep it simple.',
]

class SitesController {
    home(req, res) {
        res.render('home', { title: 'Home Page' })
    }

    about(req, res) {
        const randomFortune =
            fortunes[Math.floor(Math.random() * fortunes.length)]
        res.render('about', { title: 'About Page', fortune: randomFortune })
    }

    table(req, res) {
        let n = 4,
            m = 5
        let table = []
        for (let i = 1; i <= n; i++) {
            let cell = []
            for (let j = 1; j <= m; j++) {
                cell.push(i + j)
            }
            table.push(cell)
        }

        res.render('table', { title: 'Table Page', tables: table })
    }

    page404(req, res) {
        res.status(404)
        res.render('404')
    }

    page500(err, req, res, next) {
        console.error(err.message)
        res.status(500)
        res.render('500')
    }
}

module.exports = new SitesController()
