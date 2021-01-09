//goi module
const express = require('express');
const handlebars= require('express-handlebars');

const app = express(); //tao app
const port = 80; //cong
const fortunes = [

"Conquer your fears or they will conquer you.",

"Rivers need springs.",

"Do not fear what you don't know.",

"You will have a pleasant surprise.",

"Whenever possible, keep it simple.",

]

//Tạo view engine
app.engine('hbs',handlebars({
  extname: '.hbs' //doi duoi file handlebars -> hbs
}));
app.set('view engine','hbs');//set view engine

//dinh tuyen views, static folder,...
app.set('views','./template');//set file /views->/template
app.use(express.static('./template/resources')); //dinh tuyen static folder

//ROUTE
//trang home
app.get('/', (req, res) => {
  res.render('home'); //them gia tri {layout: 'ten layout'} neu muon render layout khac main//
});

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

// trang 404
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// trang 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})