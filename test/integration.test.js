const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
require ('../lib/setup-mongoose');

const assert = chai.assert;
chai.use(chaiHttp);

const testData = {
  name: 'Humboldt Fog',
  milk: 'goat',
  region: 'California'
};


describe('integration', () => {
  const request = chai.request(app);
  let id;
  describe('POST', () => {
    it('inserts record', done => {
      request
        .post('/cheese')
        .send(testData)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          id = result._id;
          assert.isObject(result);
          assert.propertyVal(result, 'name', 'Humboldt Fog');
          done();
        });
    });


  });
  describe('GET', () => {
    it('retrieves the record', done => {
      request
        .get(`/cheese/${id}`)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(result);
          assert.propertyVal(result, '_id', id);
          done();
        });
    });
  });
  describe('PUT', () => {

    it('modifies the record', done => {
      request.get(`/cheese/${id}`).end((err, res) => {
        const record = JSON.parse(res.text);
        record.name = 'Bleu';
        request
          .put(`/cheese/${id}`)
          .send(record)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            assert.isObject(result);
            assert.propertyVal(result, 'name', 'Bleu');
            done();
          });
      });
    });
  });

  describe('DELETE', () => {
    it('removes the record', done => {
      request.delete(`/cheese/${id}`).end((err, res) => {
        const result = JSON.parse(res.text);
        assert.isObject(result);
        assert.propertyVal(result, '_id', id);
        request
          .get(`/cheese/${id}`)
          .end((err, res) => {
            const getResult = JSON.parse(res.text);
            assert.isObject(getResult);
            const expectedMessage = {error: { message: 'Entry not found'}};
            assert.deepEqual(getResult, expectedMessage);

            done();
          });
      });
    });
  });

});
