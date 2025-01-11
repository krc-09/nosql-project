const path = require('path');

const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67821d970e8baf1c677b4994')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));


 });

 app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findById(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
mongoConnect(() =>{
  
  app.listen(3000);
});