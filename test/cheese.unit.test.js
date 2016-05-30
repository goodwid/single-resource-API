const Cheese = require('../models/cheese.js');

describe('Cheese model', () => {
  it('requires name', done => {
    const place = new Cheese();
    place.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const place = new Cheese({name: 'Kerrygold White Cheddar', milk: 'cow', region:'Ireland'});
    place.validate()
    .then(done)
    .catch(done);
  });

});
