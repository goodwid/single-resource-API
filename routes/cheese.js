const director = require('director');
const bodyParser = require('body-parser').json();
const Cheese = require('../models/cheese');

const router = new director.http.Router();

router.get('/', (req, res) => {
  const query = req.query.type ? {type: req.query.type} : {};
  Cheese.find(query)
    .select('name family')
    .lean()
    .then( results => res.json(results));
});

router.get('/:id', (req, res) => {
  Cheese.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({error: { message: 'Entry not found'}});
      }
    });
});
 
router.post('/', bodyParser, (req, res) => {
  new Cheese(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
});

router.put('/:id', bodyParser, (req, res) => {
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
router.delete('/:id', (req, res) => {
  Cheese.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
});
