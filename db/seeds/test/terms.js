/*eslint-disable camelcase*/
/*eslint-disable no-console*/

const categories = require('../../data/categories');
const terms = require('../../data/terms');

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
      let patientsPromises = [];

      patients.forEach(patient => {
        patientsPromises.push(createPatient(knex, patient));
      });

      return Promise.all(patientsPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
