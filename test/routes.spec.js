/*eslint-disable max-len*/
/*eslint-disable camelcase*/

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('Should return the homepage', () => {
    return chai
      .request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch(error => {
        throw error;
      });
  });

  it('Should return a 404 error for a route that does not exist', () => {
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

    it('Should get all terms', () => {
      return chai
        .request(server)
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
        });
    });
  });

  describe('GET all categories', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get all categories', () => {
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

  describe('GET all clinics', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get all clinics', () => {
      return chai
        .request(server)
        .get('/api/v1/clinics')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('abbreviation');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET all patients', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get all patients', () => {
      return chai
        .request(server)
        .get('/api/v1/patients')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('abstracted_name');
          response.body[0].should.have.property('clinic_name');
          response.body[0].should.have.property('ot_id');
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

    it('Should get terms by category id', () => {
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

    it('Should return a 404 error if category is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/categories/0/terms')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Category 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET clinics by id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get clinics by clinic id', () => {
      return chai
        .request(server)
        .get('/api/v1/clinics/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('abbreviation');
        });
    });

    it('Should return a 404 if clinic is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/clinics/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Clinic 0 not found."}');
        });
    });
  });

  describe('GET patients by id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get patients by id', () => {
      return chai
        .request(server)
        .get('/api/v1/patients/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('abstracted_name');
          response.body[0].should.have.property('clinic_name');
          response.body[0].should.have.property('ot_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 if user id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/patients/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Patient 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET patients by user_id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get patients by user id', () => {
      return chai
        .request(server)
        .get('/api/v1/users/1/patients')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('abstracted_name');
          response.body[0].should.have.property('clinic_name');
          response.body[0].should.have.property('ot_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 if user id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/users/0/patients')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"User 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET primary concerns by patient id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get primary concerns by patient id', () => {
      return chai
        .request(server)
        .get('/api/v1/patients/1/primary-concerns')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('description');
          response.body[0].should.have.property('domain_1');
          response.body[0].should.have.property('domain_2');
          response.body[0].should.have.property('domain_3');
          response.body[0].should.have.property('domain_4');
          response.body[0].should.have.property('domain_5');
          response.body[0].should.have.property('domain_6');
          response.body[0].should.have.property('notes');
          response.body[0].should.have.property('patient_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 if patient id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/patients/0/primary-concerns')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Patient 0 not found."}');
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

    it('Should get terms by terms name', () => {
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

    it('Should return a 404 error when term is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/terms?term=pants')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Term pants not found."}');
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

    it('Should get terms by terms id', () => {
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

    it('Should return a 404 error when term id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/terms/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Term 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST authenticate', () => {
    xit('should create a new JWT', () => {
      return chai
        .request(server)
        .post('/authenticate')
        .send({
          email: 'user@email.com',
          appName: 'spirit'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('string');
        })
        .catch(error => {
          throw error;
        });
    });

    xit('Should send a 422 if missing a parameter', () => {
      return chai
        .request(server)
        .post('/authenticate')
        .send({
          appName: 'spirit'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Missing required parameter - email"}'
          );
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

    it('Should create a new term', () => {
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

    it('Should return a 404 error if category is not found when creating a term', () => {
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

    it('Should return a 422 error if parameters are missing', () => {
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
              response.error.text.should.equal(
                '{"error":"Missing required parameter - definition"}'
              );
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

    it('Should create a new category', () => {
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

    it('Should return a 422 error if parameters are missing', () => {
      return chai
        .request(server)
        .post('/api/v1/categories')
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Missing required parameter - name"}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new clinic', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should create a new clinic', () => {
      return chai
        .request(server)
        .post('/api/v1/clinics')
        .send({
          name: 'Developmental_FX',
          abbreviation: 'DFX'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 422 error if parameters are missing', () => {
      return chai
        .request(server)
        .post('/api/v1/clinics')
        .send({
          name: 'Clinic_Place'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Missing required parameter - abbreviation"}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new patient', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should create a new patient', () => {
      return chai
        .request(server)
        .post('/api/v1/users/1/patients')
        .send({
          abstracted_name: 'DFXTH23'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 422 error if parameters are missing', () => {
      return chai
        .request(server)
        .post('/api/v1/users/1/patients')
        .then(response => {
          response.should.have.status(422);
          response.error.text.should.equal(
            '{"error":"Missing required parameter - abstracted_name"}'
          );
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error is user does not exist', () => {
      return chai
        .request(server)
        .post('/api/v1/users/0/patients')
        .send({
          abstracted_name: 'DFXTH23'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"User 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST primary concern', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should add a new primary concern to a patient', () => {
      return chai
        .request(server)
        .post('/api/v1/patients/1/primary-concerns')
        .send({
          description: 'Does not play well at school',
          domain_1: true,
          domain_2: false,
          domain_3: true,
          domain_4: true,
          domain_5: false,
          domain_6: true,
          notes: 'Plays well with parents around, but not while away'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 422 error if missing a required parameter', () => {
      return chai
        .request(server)
        .post('/api/v1/patients/1/primary-concerns')
        .send({
          domain_1: true,
          domain_2: false,
          domain_3: true,
          domain_4: true,
          domain_5: false,
          domain_6: true,
          notes: 'Plays well with parents around, but not while away'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Missing required parameter - description."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if patient id is not found', () => {
      return chai
        .request(server)
        .post('/api/v1/patients/0/primary-concerns')
        .send({
          description: 'Does not play well at school',
          domain_1: true,
          domain_2: false,
          domain_3: true,
          domain_4: true,
          domain_5: false,
          domain_6: true,
          notes: 'Plays well with parents around, but not while away'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Patient by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT primary concern', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a primary concern', () => {
      return chai
        .request(server)
        .put('/api/v1/primary-concerns/1')
        .send({ domain_1: true })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('Primary concern 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if primary concern is not found')
  });

  describe('PUT terms', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a term', () => {
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

    it('Should return a 422 error when terms id is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/terms/0')
        .send({
          definition: 'Look I have a new definition!'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Term 0 not found."}');
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

    it('Should update a category', () => {
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

    it('Should return a 422 error when category is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/categories/0')
        .send({
          name: 'Look I have a new name!'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Category 0 not found."}');
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

    it('Should delete a term', () => {
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

    it('Should return a 422 error when term is not found', () => {
      return chai
        .request(server)
        .delete('/api/v1/terms/0')
        .catch(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Term 0 not found."}');
        });
    });
  });

  describe('DELETE categories', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should delete a category', () => {
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

    it('Should return a 422 error when category is not found', () => {
      return chai
        .request(server)
        .delete('/api/v1/categories/0')
        .catch(error => {
          error.should.have.status(422);
          error.should.be.json;
          error.error.text.should.equal('{"error":"Category 0 not found."}');
        });
    });
  });
});
