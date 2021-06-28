
  const express = require('express');
  
  const bodyParser = require('body-parser');
  

  const app = express();

  const adminRoutes = require('./routes/admin');
  const shopRoutes = require('./routes/shop');

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/admin', adminRoutes);
  app.use(shopRoutes);

  app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
  });

  app.listen(3000);