//goi module
const express = require('express');
const handlebars= require('express-handlebars');
const path= require("path");

const app = express(); //tao app
const port = 80; //cong
const fortunes = [

"Conquer your fears or they will conquer you.",

"Rivers need springs.",

"Do not fear what you don't know.",

"You will have a pleasant surprise.",

"Whenever possible, keep it simple.",

]

const tours = [

{ id: 0, name: 'Hood River', price: 99.99 },

{ id: 1, name: 'Oregon Coast', price: 149.95 },

]

//ko biết tại sao nhưng thiếu nó vài cái route api ko chạy đc
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Tạo view engine
app.engine('hbs',handlebars({
  extname: '.hbs' //doi duoi file handlebars -> hbs
}));
app.set('view engine','hbs');//set view engine

//dinh tuyen views, static folder,...
app.set('views','./src/resources/views');//set file /views->/template
app.use(express.static(path.join(__dirname,'./src/public'))); //dinh tuyen static folder, path bat dau localhost=src/resources


//ROUTE
//trang home
app.get('/', (req, res) => {
  res.render('home'); //them gia tri {layout: 'ten layout'} neu muon render layout khac main//
});

//API for tours
app.get('/tours', (req, res) => res.render('tours',{tour:tours})) //liệt kê

app.post('/tours', (req, res) => {
  let newId=tours[-1].id+1;
  let newTour={id:newId,name:req.body.name,price:req.body.price};
  tours.push(newTour);
  res.render('tours',{tour:tours});
})

app.get('/tours/:id', (req, res) => { //update
  const p = [tours.find(p => p.id === parseInt(req.params.id))] //lấy từ đường dẫn, req.body thì lấy từ value client truyền xuống
  if(!p) return res.status(404).json({ error: 'No such tour exists' })

  if(req.body.name) p.name = req.body.name

  if(req.body.price) p.price = req.body.price

  res.render('tours',{tour:p})
})

app.delete('/tour/:id', (req, res) => { //delete 

  const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))

  if(idx < 0) return res.json({ error: 'No such tour exists.' })

  tours.splice(idx, 1)

  res.render('tours',{tour:tours})

})

//trang about
app.get('/about',(req, res)=>{
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

app.get('/table',(req,res)=>{
  let n=4,m=5;
  let table=[];
  for (let i = 1; i <= n; i++) {
    let cell=[];
    for (let j=1;j<=m;j++){
      cell.push(i+j);
    }
    table.push(cell);
  }

  res.render('table',{tables:table});
})

// trang 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

// trang 404
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})