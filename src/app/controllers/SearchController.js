/** @format */

class SearchController {
    index(req, res) {
        res.render('search', { title: 'Search Page' })
    }

    show(req, res) {
        res.send('Hi!!')
    }
}

module.exports = new SearchController()
