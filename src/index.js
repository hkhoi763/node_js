/** @format */

//goi module
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')

const app = express() //tao app
const port = 80 //cong

//ko có nó req.body=undefine
//Là middleware body-parser nhưng đã tích hợp sẵn trong express
app.use(express.urlencoded({ extended: true })) //trường hợp client gửi lên server dạng form data
app.use(express.json()) //trường hợp client gửi lên server dạng json

//Tạo view engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', //doi duoi file handlebars -> hbs
    }),
)
app.set('view engine', 'hbs') //set view engine

//dinh tuyen views, static folder,...
app.set('views', './src/resources/views') //set file /views->/template
app.use(express.static(path.join(__dirname, 'src/public'))) //dinh tuyen static folder, path bat dau localhost=src/resources

//ROUTE
route(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
