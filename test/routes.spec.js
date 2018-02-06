process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

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
    .get('/api/v1/terms/all')
    .then(response => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(132);
      response.body[0].should.have.property('id');
      response.body[0].should.have.property('term'); 
      response.body[0].should.have.property('definition');
      response.body[0].should.have.property('category_name');
      response.body[0].should.have.property('category_id');
      response.body[0].should.have.property('imageURL');   
    })
    .catch(error => {
      throw error;
    })
  })

  it('should get all categories', () => {
    return chai.request(server)
    .get('/api/v1/categories')
    .then(response => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(7);
      response.body[0].should.have.property('id');
      response.body[0].should.have.property('name');
    })
  })

  it('should get terms by category id', () => {
    let id;

    return chai.request(server)
    .get('/api/v1/categories')
    .then(response => {
      id = response.body[0].id;
    })
    .then(() => {
      return chai.request(server)
      .get(`/api/v1/categories/${id}/terms`)
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('term'); 
        response.body[0].should.have.property('definition');
        response.body[0].should.have.property('category_name');
        response.body[0].should.have.property('category_id');
        response.body[0].should.have.property('imageURL');   
      })
    })
  })

  it('should get terms by terms name', () => {
    return chai.request(server)
    .get('/api/v1/terms?term=Olfaction')
    .then(response => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body[0].should.have.property('id');
      response.body[0].should.have.property('term'); 
      response.body[0].should.have.property('definition');
      response.body[0].should.have.property('category_name');
      response.body[0].should.have.property('category_id');
      response.body[0].should.have.property('imageURL');
      response.body[0].term.should.equal('Olfaction');
      response.body[0].definition.should.equal('Receptors located in nose and are chemoreceptors for smell.  Primarily for detection hedonic for modulation and for emotional memory support for detail/discrimination.')
      response.body[0].category_name.should.equal('Sensory Systems');
      response.body[0].imageURL.should.equal('');
    })
  })
    
  it('should get terms by terms id', () => {
    let id;

    return chai.request(server)
    .get('/api/v1/terms?term=Olfaction')
    .then(response => {
      id = response.body[0].id;
    })
    .then(() => {
      return chai.request(server)
      .get(`/api/v1/terms/${id}`)
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('term'); 
        response.body[0].should.have.property('definition');
        response.body[0].should.have.property('category_name');
        response.body[0].should.have.property('category_id');
        response.body[0].should.have.property('imageURL');
        response.body[0].id.should.equal(id);
        response.body[0].term.should.equal('Olfaction');
        response.body[0].definition.should.equal('Receptors located in nose and are chemoreceptors for smell.  Primarily for detection hedonic for modulation and for emotional memory support for detail/discrimination.')
        response.body[0].category_name.should.equal('Sensory Systems');
        response.body[0].imageURL.should.equal('');
      })
    })
  })

});