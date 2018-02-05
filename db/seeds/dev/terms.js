

const createCategory = (knex, category) => {
  return knex('categories').insert(continent, 'id')
    .then(categoryId => {
      let filteredTerms = termsData.filter(term => term.category_name === category.name);

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
        categoriesData.map(category => createCategory(knex, category))
      ]);
    })

    .catch(error => console.log(`Error seeding data: ${error}`));
};
