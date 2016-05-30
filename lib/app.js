const restify = require('restify');
const Cheese = require('../models/cheese');
const bodyParser = require('body-parser').json();
const morgan = require('morgan');

var app = restify.createServer({
  name: 'cheesyAPI',
  verstion: '0.0.1'
});

app.use(morgan('dev'));

app.get('/cheese', (req, res) => {
  const query = req.query.type ? {type: req.query.type} : {};
  Cheese.find(query)
    .select('name')
    .lean()
    .then( results => res.send(results));
});

app.get('/cheese/:id', (req, res) => {
  Cheese.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({error: { message: 'Entry not found'}});
      }
    });
});

app.post('/cheese', bodyParser, (req, res) => {
  new Cheese(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
});

app.put('/cheese/:id', bodyParser, (req, res) => {
  Cheese.findById(req.params.id)
    .then(result => {
      new Cheese(Object.assign(result, req.body)).save()
        .then(result => res.send(result))
        .catch(error => {
          console.log(error);
          res.json({error});
        });
    });
});
app.del('/cheese/:id', (req, res) => {
  Cheese.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
});



module.exports = app;
