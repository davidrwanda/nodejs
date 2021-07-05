// const { deleteById } = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.edit;
  if(!editmode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({where: {id: prodId}})
  // Product.findByPk(prodId)
  .then(products =>{
    const product = products[0];
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product
    });
  }).catch(err=>console.log(err));
};

exports.PostEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;
    return product.save();
  })
  .then( result => console.log("successfull updated"))
  .catch(err => console.log(err));
  res.redirect('/admin/products');
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(() =>{
    console.log('Product created successfull');
    return res.redirect('/');
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  // Product.findAll()
  .then( products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  });
    }).catch(err => console.log(err)); 
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(() => {
    console.log("Product Deleted");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};
