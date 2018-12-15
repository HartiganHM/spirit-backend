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
          response.body[0].should.have.property('passcode');
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
          response.body[0].should.have.property('passcode');
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

  describe('GET primary concerns by id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get a primary concern by id', () => {
      return chai
        .request(server)
        .get('/api/v1/primary-concerns/1')
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

    it('Should return a 404 error if primary concern is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/primary-concerns/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Primary concern 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET sessions by session id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get a session by id', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('concern_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if session id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Session 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET processes by process id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get a process by id', () => {
      return chai
        .request(server)
        .get('/api/v1/processes/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('sen_h_vestibular');
          response.body[0].should.have.property('sen_h_proprioception');
          response.body[0].should.have.property('sen_h_tactile');
          response.body[0].should.have.property('sen_h_auditory');
          response.body[0].should.have.property('sen_h_visual');
          response.body[0].should.have.property('sen_h_intero');
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if process id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/processes/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Process 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET treatment plans by id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get a treament plan by id', () => {
      return chai
        .request(server)
        .get('/api/v1/treatment-plans/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('modulation_sensory');
          response.body[0].should.have.property('modulation_task');
          response.body[0].should.have.property('modulation_environment');
          response.body[0].should.have.property('modulation_predictability');
          response.body[0].should.have.property('modulation_self_regulation');
          response.body[0].should.have.property('modulation_interaction');
          response.body[0].should.have.property('modulation_JRC_AR_notes');

          response.body[0].should.have.property('posture_sensory');
          response.body[0].should.have.property('posture_task');
          response.body[0].should.have.property('posture_environment');
          response.body[0].should.have.property('posture_predictability');
          response.body[0].should.have.property('posture_self_regulation');
          response.body[0].should.have.property('posture_interaction');
          response.body[0].should.have.property('posture_JRC_AR_notes');

          response.body[0].should.have.property(
            'sensory_discrimination_sensory'
          );
          response.body[0].should.have.property('sensory_discrimination_task');
          response.body[0].should.have.property(
            'sensory_discrimination_environment'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_predictability'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_self_regulation'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_interaction'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_JRC_AR_notes'
          );

          response.body[0].should.have.property('social_emotional_sensory');
          response.body[0].should.have.property('social_emotional_task');
          response.body[0].should.have.property('social_emotional_environment');
          response.body[0].should.have.property(
            'social_emotional_predictability'
          );
          response.body[0].should.have.property(
            'social_emotional_self_regulation'
          );
          response.body[0].should.have.property('social_emotional_interaction');
          response.body[0].should.have.property(
            'social_emotional_JRC_AR_notes'
          );

          response.body[0].should.have.property(
            'executive_functioning_sensory'
          );
          response.body[0].should.have.property('executive_functioning_task');
          response.body[0].should.have.property(
            'executive_functioning_environment'
          );
          response.body[0].should.have.property(
            'executive_functioning_predictability'
          );
          response.body[0].should.have.property(
            'executive_functioning_self_regulation'
          );
          response.body[0].should.have.property(
            'executive_functioning_interaction'
          );
          response.body[0].should.have.property(
            'executive_functioning_JRC_AR_notes'
          );
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if treatment plan id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/treatment-plans/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Treatment plan 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET therapy goals by id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get a therapy goal by id', () => {
      return chai
        .request(server)
        .get('/api/v1/therapy-goals/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('modulation_goal');
          response.body[0].should.have.property('modulation_ot_importance');
          response.body[0].should.have.property('modulation_parent_importance');
          response.body[0].should.have.property('modulation_ot_performance');
          response.body[0].should.have.property(
            'modulation_parent_performance'
          );
          response.body[0].should.have.property('modulation_ot_satisfaction');
          response.body[0].should.have.property(
            'modulation_parent_satisfaction'
          );

          response.body[0].should.have.property('posture_goal');
          response.body[0].should.have.property('posture_ot_importance');
          response.body[0].should.have.property('posture_parent_importance');
          response.body[0].should.have.property('posture_ot_performance');
          response.body[0].should.have.property('posture_parent_performance');
          response.body[0].should.have.property('posture_ot_satisfaction');
          response.body[0].should.have.property('posture_parent_satisfaction');

          response.body[0].should.have.property('sensory_discrimination_goal');
          response.body[0].should.have.property(
            'sensory_discrimination_ot_importance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_importance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_ot_performance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_performance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_satisfaction'
          );

          response.body[0].should.have.property('social_emotional_goal');
          response.body[0].should.have.property(
            'social_emotional_ot_importance'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_importance'
          );
          response.body[0].should.have.property(
            'social_emotional_ot_performance'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_performance'
          );
          response.body[0].should.have.property(
            'social_emotional_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_satisfaction'
          );

          response.body[0].should.have.property('executive_functioning_goal');
          response.body[0].should.have.property(
            'executive_functioning_ot_importance'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_importance'
          );
          response.body[0].should.have.property(
            'executive_functioning_ot_performance'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_performance'
          );
          response.body[0].should.have.property(
            'executive_functioning_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_satisfaction'
          );
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if therapy goal id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/therapy-goals/0')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Therapy goal 0 not found."}'
          );
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

    it('Should return an empty array if user id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/users/0/patients')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('[]');
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
  });

  describe('GET sessions by primary concern id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get sessions by primary concern id', () => {
      return chai
        .request(server)
        .get('/api/v1/primary-concerns/1/sessions')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('concern_id');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET processes by session id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get processes by session id', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/1/processes')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('sen_h_vestibular');
          response.body[0].should.have.property('sen_h_proprioception');
          response.body[0].should.have.property('sen_h_tactile');
          response.body[0].should.have.property('sen_h_auditory');
          response.body[0].should.have.property('sen_h_visual');
          response.body[0].should.have.property('sen_h_intero');
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should send a 404 if session id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/0/processes')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Session 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET treatment plans by session id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get treatment plans by session id', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/1/treatment-plans')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('modulation_sensory');
          response.body[0].should.have.property('modulation_task');
          response.body[0].should.have.property('modulation_environment');
          response.body[0].should.have.property('modulation_predictability');
          response.body[0].should.have.property('modulation_self_regulation');
          response.body[0].should.have.property('modulation_interaction');
          response.body[0].should.have.property('modulation_JRC_AR_notes');

          response.body[0].should.have.property('posture_sensory');
          response.body[0].should.have.property('posture_task');
          response.body[0].should.have.property('posture_environment');
          response.body[0].should.have.property('posture_predictability');
          response.body[0].should.have.property('posture_self_regulation');
          response.body[0].should.have.property('posture_interaction');
          response.body[0].should.have.property('posture_JRC_AR_notes');

          response.body[0].should.have.property(
            'sensory_discrimination_sensory'
          );
          response.body[0].should.have.property('sensory_discrimination_task');
          response.body[0].should.have.property(
            'sensory_discrimination_environment'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_predictability'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_self_regulation'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_interaction'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_JRC_AR_notes'
          );

          response.body[0].should.have.property('social_emotional_sensory');
          response.body[0].should.have.property('social_emotional_task');
          response.body[0].should.have.property('social_emotional_environment');
          response.body[0].should.have.property(
            'social_emotional_predictability'
          );
          response.body[0].should.have.property(
            'social_emotional_self_regulation'
          );
          response.body[0].should.have.property('social_emotional_interaction');
          response.body[0].should.have.property(
            'social_emotional_JRC_AR_notes'
          );

          response.body[0].should.have.property(
            'executive_functioning_sensory'
          );
          response.body[0].should.have.property('executive_functioning_task');
          response.body[0].should.have.property(
            'executive_functioning_environment'
          );
          response.body[0].should.have.property(
            'executive_functioning_predictability'
          );
          response.body[0].should.have.property(
            'executive_functioning_self_regulation'
          );
          response.body[0].should.have.property(
            'executive_functioning_interaction'
          );
          response.body[0].should.have.property(
            'executive_functioning_JRC_AR_notes'
          );
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should send a 404 if session id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/0/treatment-plans')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Session 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET therapy goals by session id', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should get therapy goals by session id', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/1/therapy-goals')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('modulation_goal');
          response.body[0].should.have.property('modulation_ot_importance');
          response.body[0].should.have.property('modulation_parent_importance');
          response.body[0].should.have.property('modulation_ot_performance');
          response.body[0].should.have.property(
            'modulation_parent_performance'
          );
          response.body[0].should.have.property('modulation_ot_satisfaction');
          response.body[0].should.have.property(
            'modulation_parent_satisfaction'
          );

          response.body[0].should.have.property('posture_goal');
          response.body[0].should.have.property('posture_ot_importance');
          response.body[0].should.have.property('posture_parent_importance');
          response.body[0].should.have.property('posture_ot_performance');
          response.body[0].should.have.property('posture_parent_performance');
          response.body[0].should.have.property('posture_ot_satisfaction');
          response.body[0].should.have.property('posture_parent_satisfaction');

          response.body[0].should.have.property('sensory_discrimination_goal');
          response.body[0].should.have.property(
            'sensory_discrimination_ot_importance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_importance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_ot_performance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_performance'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'sensory_discrimination_parent_satisfaction'
          );

          response.body[0].should.have.property('social_emotional_goal');
          response.body[0].should.have.property(
            'social_emotional_ot_importance'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_importance'
          );
          response.body[0].should.have.property(
            'social_emotional_ot_performance'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_performance'
          );
          response.body[0].should.have.property(
            'social_emotional_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'social_emotional_parent_satisfaction'
          );

          response.body[0].should.have.property('executive_functioning_goal');
          response.body[0].should.have.property(
            'executive_functioning_ot_importance'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_importance'
          );
          response.body[0].should.have.property(
            'executive_functioning_ot_performance'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_performance'
          );
          response.body[0].should.have.property(
            'executive_functioning_ot_satisfaction'
          );
          response.body[0].should.have.property(
            'executive_functioning_parent_satisfaction'
          );
          response.body[0].should.have.property('session_id');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should send a 404 if session id is not found', () => {
      return chai
        .request(server)
        .get('/api/v1/sessions/0/therapy-goals')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Session 0 not found."}');
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
          abbreviation: 'DFX',
          passcode: '5v1sy7'
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

  describe('POST new primary concern', () => {
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

  describe('POST new session', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should add a new session to a primary concern', () => {
      return chai
        .request(server)
        .post('/api/v1/primary-concerns/1/sessions')
        .send({})
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if primary concern id is not found', () => {
      return chai
        .request(server)
        .post('/api/v1/primary-concerns/0/sessions')
        .send({})
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Primary concern by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new process', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should add a new process to a session', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/1/processes')
        .send({
          sen_h_vestibular: '7F',
          mod_2_autonomic: '3R',
          exe_4b_self_control: '5A',
          pos_5_alignment_COG: '10F',
          soc_2_social_motivators: '3I'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if session id is not found', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/0/processes')
        .send({
          sen_h_vestibular: '7F',
          mod_2_autonomic: '3R',
          exe_4b_self_control: '5A',
          pos_5_alignment_COG: '10F',
          soc_2_social_motivators: '3I'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Session by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new treatment plan', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should add a new treatment plan to a session', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/1/treatment-plans')
        .send({
          modulation_sensory: 'Needs help recognizing social cues',
          modulation_task: 'Puzzle Games',
          modulation_environment: 'Solo play in quiet setting',
          modulation_predictability:
            'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
          modulation_self_regulation: 'Focus and attention',
          modulation_interaction: 'Encourage problem solving with guidance',
          modulation_JRC_AR_notes:
            'Record results from distance, but be engaged if needed'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if session id is not found', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/0/treatment-plans')
        .send({
          modulation_sensory: 'Needs help recognizing social cues',
          modulation_task: 'Puzzle Games',
          modulation_environment: 'Solo play in quiet setting',
          modulation_predictability:
            'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
          modulation_self_regulation: 'Focus and attention',
          modulation_interaction: 'Encourage problem solving with guidance',
          modulation_JRC_AR_notes:
            'Record results from distance, but be engaged if needed'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Session by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST new therapy goals', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should add a new therapy goal to a session', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/1/therapy-goals')
        .send({
          modulation_goal: 'Goal 1',
          modulation_ot_importance: 5,
          modulation_parent_importance: 5,
          modulation_ot_performance: 5,
          modulation_parent_performance: 5,
          modulation_ot_satisfaction: 5,
          modulation_parent_satisfaction: 5
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if session id is not found', () => {
      return chai
        .request(server)
        .post('/api/v1/sessions/0/therapy-goals')
        .send({
          modulation_goal: 'Goal 1',
          modulation_ot_importance: 5,
          modulation_parent_importance: 5,
          modulation_ot_performance: 5,
          modulation_parent_performance: 5,
          modulation_ot_satisfaction: 5,
          modulation_parent_satisfaction: 5
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Session by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT user', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a user', () => {
      return chai
        .request(server)
        .put('/api/v1/users/1')
        .send({ clinic: 'Developmental_FX1' })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('User 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should return a 404 error if no user is found', () => {
      return chai
        .request(server)
        .put('/api/v1/users/0')
        .send({ clinic: 'Developmental_FX1' })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"User by id 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT user - w/ PW check', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('should update user info with new clinic information', () => {
      return chai
        .request(server)
        .put('/api/v1/users/1/join')
        .send({
          passcode: '5v1sy7'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property('clinic');
          response.body.should.have.property('clinic_abbreviation');
          response.body.should.have.property('clinic_id');
          response.body.should.have.property('clinic_passcode');
          response.body.clinic.should.equal('Developmental_FX');
          response.body.clinic_abbreviation.should.equal('DFX');
          response.body.clinic_id.should.equal(1);
          response.body.clinic_passcode.should.equal('5v1sy7');
        })
        .catch(error => {
          throw error;
        });
    });

    it('should throw a 404 error when incorrect passcode is entered', () => {
      return chai
        .request(server)
        .put('/api/v1/users/1/join')
        .send({
          passcode: 'wrongpw'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Passcode does not match any existing clinics"}');
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

    it('Should throw a 404 error if primary concern is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/primary-concerns/0')
        .send({ domain_1: true })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Primary concern 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT session', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a session', () => {
      return chai
        .request(server)
        .put('/api/v1/sessions/1')
        .send({ completed: true })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('Session 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if session is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/sessions/0')
        .send({ completed: true })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Session 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT process', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a process', () => {
      return chai
        .request(server)
        .put('/api/v1/processes/1')
        .send({
          sen_h_vestibular: '3I'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('Process 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if process is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/processes/0')
        .send({
          sen_h_vestibular: '3I'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal('{"error":"Process 0 not found."}');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT treatment plan', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a treatment plan', () => {
      return chai
        .request(server)
        .put('/api/v1/treatment-plans/1')
        .send({
          modulation_task: 'Active play with obstacles'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('Treatment plan 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if treatment plan is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/treatment-plans/0')
        .send({
          modulation_task: 'Active play with obstacles'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Treatment plan 0 not found."}'
          );
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('PUT therapy goal', () => {
    beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });

    it('Should update a therapy goal', () => {
      return chai
        .request(server)
        .put('/api/v1/therapy-goals/1')
        .send({
          modulation_goal: 'Better balance'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.success.should.equal('Therapy goal 1 updated.');
        })
        .catch(error => {
          throw error;
        });
    });

    it('Should throw a 404 error if therapy goal is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/therapy-goals/0')
        .send({
          modulation_goal: 'Better balance'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"Therapy goal 0 not found."}'
          );
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

    it('Should return a 404 error when terms id is not found', () => {
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

    it('Should return a 404 error when category is not found', () => {
      return chai
        .request(server)
        .put('/api/v1/categories/0')
        .send({
          name: 'Look I have a new name!'
        })
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
