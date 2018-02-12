/*eslint-disable camelcase*/
/*eslint-disable no-console*/

const categories = require('../../data/categories');
const terms = require('../../data/terms');

const clinics = [
  {
    name: 'Developmental_FX',
    abbreviation: 'DFX'
  },
  {
    name: 'Clinic_World',
    abbreviation: 'CLW'
  }
]

const users = [
  {
    authrocket_id: 'usr_0vYfOixWwPnBDh1w8rxjGm',
    name: 'Hugh Hartigan',
    email: 'hartigan.hm@gmail.com',
    clinic: 'Developmental_FX',
    clinic_abbreviation: 'DFX'
  },
  {
    authrocket_id: 'usr_0vYfOixWwPnBDh1w812345',
    name: 'Tracy Stackhouse',
    email: 'tracy@developmentalfx.org',
    clinic: 'Developmental_FX',
    clinic_abbreviation: 'DFX'
  }
]

const patients = [
  {
    abstracted_name: 'DFXHH3',
    clinic_name: 'Developmental_FX',
  },
  {
    abstracted_name: 'DFXJF1',
    clinic_name: 'Developmental_FX',
  }
]

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

const createClinic = (knex, clinic) =>{
  return knex('clinics')
  .insert(clinic, 'id')
  .then(clinicId => {
    let userPromises = [];

    let filteredUsers = users.filter(
      user => user.clinic === clinic.name
    );

    filteredUsers.forEach(user => {
      userPromises.push(createUser(knex, user));
    });

    return Promise.all(userPromises);
  })
}

const createUser = (knex, clinic) => {
  return knex('users')
    .insert(user, 'id')
    .then(userId => {
      let patientsPromises = [];

      let filteredPatients = patients.filter(
        patient => patient.clinic_name === user.clinic_name
      );

      filteredPatients.forEach(patient => {
        patientsPromises.push(createPatient(knex, patient));
      });

      return Promise.all(patientsPromises);
    })
}

const createPatient = (knex, patient) => {
  return knex('patients').insert(patient);
}

exports.seed = function(knex, Promise) {
  return knex('terms')
    .del()
    .then(() => knex('categories').del())
    .then(() => {
      let categoriesPromises = [];

      categories.forEach(category => {
        categoriesPromises.push(createCategory(knex, category));
      });

      return Promise.all(categoriesPromises);
    })
    .then(() => {
      knex('patients').del()
    })
    .then(() => {
      let clinicsPromises = [];

      clinics.forEach(clinic => {
        clinicsPromises.push(createUser(knex, clinic));
      });

      return Promise.all(clinicsPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
