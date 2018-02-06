process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

console.log('heyo', chaiHttp);
chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach((done) => {
    knex.seed.run()
    .then(() => {
      done();
    });
  });

  it('should get all terms', () => {
    return chai.request(server)
    .get('/api/v1/terms')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      throw error;
    })
  })






});