const categories = require('../../data/categories');
const terms = require('../../data/terms');

const createCategory = (knex, category) => {
  return knex('categories').insert(continent, 'id')
    .then(categoryId => {
      let filteredTerms = terms.filter(term => term.category_name === category.name);

      return Promise.all([
        filteredTerms.map(term =>{
          createTerm(knex, { ...term, category_id: categoryId[0] })
        })
      ])
    })
}

const createTerm = (knex, term) => {
  return knex('terms').insert(term);
}

exports.seed = function(knex, Promise) {
  return knex('terms').del()
    .then(() => knex('categories').del())

    .then(() => {
      return Promise.all([
        categories.map(category => createCategory(knex, category))
      ]);
    })

    .catch(error => console.log(`Error seeding data: ${error}`));
};
