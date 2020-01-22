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

const DB_LOCATION = process.env.DB_LOCATION;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const FRONTEND_URL = process.env.FRONTEND_URL;

mongoose.connect(`${DB_LOCATION}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mydb = mongoose.connection;
mydb.on('error', console.error.bind(console, 'connection error:'));

app.get('/cosmetcis', function (req, res) {
  CosmeticsItemModel.find({}, (err, items) => {
    if (err) {
      console.error('ERROR getting * Cosmetcis *');
      return;
    }

    return res
      .set({'Access-Control-Allow-Origin': FRONTEND_URL})
      .send(items)
  });
});

app.get('/cosmetcisItem', function (req, res) {
  const { id } = req.query;

  CosmeticsItemModel.findOne({ id }, (err, items) => {
    if (err) {
      console.error('ERROR  getting * CosmetcisItem *');
      return;
    }

    return res
      .set({'Access-Control-Allow-Origin': FRONTEND_URL})
      .send(items)
  });
});

app.listen(process.env.PORT || 6626);
