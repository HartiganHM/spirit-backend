/*eslint-disable max-len*/

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return a 404 error for a route that does not exist', () => {
    return chai
      .request(server)
      .get('/sad')
      .catch(error => {
        error.should.have.status(404);
      });
  });
});

describe('API Routes', () => {
  describe('GET all terms', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should get all terms', () => {
      return chai
        .request(server)
        .get('/api/v1/terms/all')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(146);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('term');
          response.body[0].should.have.property('definition');
          response.body[0].should.have.property('category_name');
          response.body[0].should.have.property('category_id');
          response.body[0].should.have.property('imageURL');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET all categories', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should get all categories', () => {
      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(7);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET terms by category id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should get terms by category id', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
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
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 404 error if category is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/categories/0/terms')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET terms by terms name', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should get terms by terms name', () => {
      return chai
        .request(server)
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
          response.body[0].definition.should.equal(
            'Receptors located in nose and are chemoreceptors for smell.  Primarily for detection hedonic for modulation and for emotional memory support for detail/discrimination.'
          );
          response.body[0].category_name.should.equal('Sensory Systems');
          response.body[0].imageURL.should.equal('');
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 404 error when term is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/terms?term=pants')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET terms by terms id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should get terms by terms id', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/terms?term=Olfaction')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
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
              response.body[0].definition.should.equal(
                'Receptors located in nose and are chemoreceptors for smell.  Primarily for detection hedonic for modulation and for emotional memory support for detail/discrimination.'
              );
              response.body[0].category_name.should.equal('Sensory Systems');
              response.body[0].imageURL.should.equal('');
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 404 error when term id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/terms/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new term', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should create a new term', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .post(`/api/v1/categories/${id}/terms`)
            .send({
              term: 'New Term',
              definition: 'This is my definition'
            })
            .then(response => {
              response.should.have.status(201);
              response.should.be.json;
              response.body.should.be.a('array');
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 404 error if category is not found when creating a term', () => {
      return chai
        .request(server)
        .post('/api/v1/categories/0/terms')
        .send({
          term: 'New Term',
          definition: 'This is my definition'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error if parameters are missing', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .post(`/api/v1/categories/${id}/terms`)
            .send({
              term: 'New Term'
            })
            .then(response => {
              response.should.have.status(422);
              response.should.be.json;
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new category', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should create a new category', () => {
      return chai
        .request(server)
        .post('/api/v1/categories')
        .send({
          name: 'New Category'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error if parameters are missing', () => {
      return chai
        .request(server)
        .post('/api/v1/categories')
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT terms', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should update a term', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/terms/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .put(`/api/v1/terms/${id}`)
            .send({
              definition: 'Look I have a new definition!'
            })
            .then(response => {
              response.should.have.status(201);
              response.should.be.json;
              response.body.success.should.equal(`Term ${id} updated.`);
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error when terms id is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/terms/0')
        .send({
          definition: 'Look I have a new definition!'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT categories', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should update a category', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .put(`/api/v1/categories/${id}`)
            .send({
              name: 'Look I have a new name!'
            })
            .then(response => {
              response.should.have.status(201);
              response.should.be.json;
              response.body.success.should.equal(`Category ${id} updated.`);
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error when category is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/categories/0')
        .send({
          name: 'Look I have a new name!'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('DELETE terms', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should delete a term', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/terms/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .delete(`/api/v1/terms/${id}`)
            .then(response => {
              response.should.have.status(204);
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error when term is not found', () => {
      return chai
        .request(server)
        .delete('/api/v1/terms/0')
        .catch(response => {
          response.should.have.status(422);
          response.should.be.json;
        });
    });
  });

  describe('DELETE categories', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should delete a category', () => {
      let id;

      return chai
        .request(server)
        .get('/api/v1/categories/all')
        .then(response => {
          id = response.body[0].id;
        })
        .then(() => {
          return chai
            .request(server)
            .delete(`/api/v1/categories/${id}`)
            .then(response => {
              response.should.have.status(204);
            });
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return a 422 error when category is not found', () => {
      return chai
        .request(server)
        .delete('/api/v1/categories/0')
        .catch(error => {
          error.should.have.status(422);
          error.should.be.json;
        });
    });
  });
});
