/*eslint-disable camelcase*/
/*eslint-disable no-console*/

const categories = require('../../data/categories');
const terms = require('../../data/terms');

const clinics = [
  {
    name: 'Developmental_FX',
    abbreviation: 'DFX'
  }
];

const users = [
  {
    authrocket_id: 'usr_0vYfOixWwPnBDh1w8rxjGm',
    name: 'Hugh Hartigan',
    email: 'hartigan.hm@gmail.com',
    clinic: 'Developmental_FX',
    clinic_abbreviation: 'DFX'
  }
];

const patients = [
  {
    abstracted_name: 'DFXHH3',
    clinic_name: 'Developmental_FX'
  }
];

const primaryConcerns = [
  {
    description: 'Does not play well at school',
    domain_1: true,
    domain_2: false,
    domain_3: true,
    domain_4: true,
    domain_5: false,
    domain_6: true,
    notes: 'Plays well with parents around, but not while away'
  }
];

const createCategory = (knex, category) => {
  return knex('categories')
    .insert(category, 'id')
    .then(categoryId => {
      let termsPromises = [];

      let filteredTerms = terms.filter(
        term => term.category_name === category.name
      );

      filteredTerms.forEach(term => {
        termsPromises.push(
          createTerm(knex, { ...term, category_id: categoryId[0] })
        );
      });

      return Promise.all(termsPromises);
    });
};

const createTerm = (knex, term) => {
  return knex('terms').insert(term);
};

const createClinic = (knex, clinic) => {
  return knex('clinics')
    .insert(clinic, 'id')
    .then(clinicId => {
      let userPromises = [];

      let filteredUsers = users.filter(user => user.clinic === clinic.name);

      filteredUsers.forEach(user => {
        userPromises.push(
          createUser(knex, { ...user, clinic_id: clinicId[0] })
        );
      });

      return Promise.all(userPromises);
    })
    .catch(error => {
      throw error;
    });
};

const createUser = (knex, user) => {
  return knex('users')
    .insert(user, 'id')
    .then(userId => {
      let patientsPromises = [];

      let filteredPatients = patients.filter(
        patient => patient.clinic_name === user.clinic
      );

      filteredPatients.forEach(patient => {
        patientsPromises.push(
          createPatient(knex, { ...patient, ot_id: userId[0] })
        );
      });

      return Promise.all(patientsPromises);
    })
    .catch(error => {
      throw error;
    });
};

const createPatient = (knex, patient) => {
  return knex('patients')
    .insert(patient, 'id')
    .then(patientId => {
      let primaryConcernsPromises = [];

      primaryConcerns.forEach(concern => {
        primaryConcernsPromises.push(
          createPrimaryConcerns(knex, {
            ...concern,
            patient_id: patientId[0]
          })
        );
      });

      return Promise.all(primaryConcernsPromises);
    })
    .catch(error => {
      throw error;
    });
};

const createPrimaryConcerns = (knex, primaryConcern) => {
  return knex('primary_concerns').insert(primaryConcern);
};

exports.seed = function(knex, Promise) {
  return knex('terms')
    .del()
    .then(() => knex('categories').del())
    .then(() => knex('primary_concerns').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE primary_concerns_id_seq RESTART WITH 1');
    })
    .then(() => knex('patients').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE patients_id_seq RESTART WITH 1');
    })
    .then(() => knex('users').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    })
    .then(() => knex('clinics').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE clinics_id_seq RESTART WITH 1');
    })
    .then(() => {
      let categoriesPromises = [];

      categories.forEach(category => {
        categoriesPromises.push(createCategory(knex, category));
      });

      return Promise.all(categoriesPromises);
    })
    .then(() => {
      let clinicsPromises = [];

      clinics.forEach(clinic => {
        clinicsPromises.push(createClinic(knex, clinic));
      });

      return Promise.all(clinicsPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
