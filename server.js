const express = require('express');
const app = express();
const url = require('url');
const mongoose = require('mongoose');

const cosmeticsItemSchema = new mongoose.Schema({
  id: String,
  price: Number,
  inStock: Boolean,
  previewUrl: String,
  itemUrl: String,
  info: Object,
  details: Object,
});

const CosmeticsItemModel = mongoose.model('cosmetics_item', cosmeticsItemSchema);

mongoose.connect('mongodb://mamarada.biz:27017/mr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mydb = mongoose.connection;
mydb.on('error', console.error.bind(console, 'connection error:'));

app.get('/cosmetcis', function (req, res) {
  CosmeticsItemModel.find({}, (err, items) => {
    if (err) {
      console.error('ERROR');
      return;
    }

    return res
      .set({'Access-Control-Allow-Origin': 'http://localhost:8000'})
      .send(items)
  });
});

app.get('/cosmetcisItem', function (req, res) {
  const { id } = req.query;

  CosmeticsItemModel.findOne({ id }, (err, items) => {
    if (err) {
      console.error('ERROR');
      return;
    }

    return res
      .set({'Access-Control-Allow-Origin': 'http://localhost:8000'})
      .send(items)
  });
});

app.listen(process.env.PORT || 6626);
