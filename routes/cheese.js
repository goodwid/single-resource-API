
const bodyParser = require('body-parser').json();
const Cheese = require('../models/cheese');



server.get('/cheese', () => {
  const query = this.req.query.type ? {type: this.req.query.type} : {};
  Cheese.find(query)
    .select('name family')
    .lean()
    .then( results => this.res.send(results));
});

server.get('/:id', (req, res) => {
  Cheese.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({error: { message: 'Entry not found'}});
      }
    });
});

server.post('/', bodyParser, (req, res) => {
  new Cheese(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
});

server.put('/:id', bodyParser, (req, res) => {
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
server.delete('/:id', (req, res) => {
  Cheese.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
});
