const express = require('express');                                             //  Requires Express
const app = express();                                                          //  Tell the app to use Express
const path = require('path');                                                   //  Used in line 10 to tell the app where to find static files such as the HTML
const bodyParser = require('body-parser');                                      //  Enables the parsing of body data in API requests
const environment = process.env.NODE_ENV || 'development';                      //  Determines the environment to be used and sets initial value to development
const configuration = require('./knexfile')[environment];                       //  Pulls in the knexfile and passes in correct environment
const database = require('knex')(configuration);  

app.set('port', process.env.PORT || 3000);                                      //  Sets port initially to 3000 but allows it to be changed if in a production environment
app.use(express.static(path.join(__dirname, 'public')));                        //  Tells the app where to find static files
app.use(bodyParser.json());                                                     //  Tells the app to use body-parser for json
app.use(bodyParser.urlencoded({ extended: true }));                             //  Tells the app to use body-parser for HTML

app.listen(app.get('port'), () => {                                             //  Sets port to the port being used in line 9 and console logs that port
  console.log(`Spirit is running on localhost:${app.get('port')}.`);
});

//////  GET ALL TERMS  //////
app.get('/api/v1/terms', (request, response) => {
  database('terms').select()
  .then((terms) => {
    return response.status(200).json(terms);
  })
  .catch((error) => {
    return response.status(500).json({ error });
  });
});

//////  GET ALL CATEGORIES  //////
app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
  .then((categories) => {
    return response.status(200).json(categories);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  GET TERMS BY CATEGORY ID  //////
app.get('/api/v1/categories/:category_id/terms', (request, response) => {
  const { category_id } = request.params;

  //probably need an error check here for category not found

  database('terms').where('category_id', category_id).select()
  .then((terms) => {
    return response.status(200).json(terms);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  GET TERMS BY TERMS ID //////
app.get('/api/v1/terms/:terms_id', (request, response) => {
  const { terms_id } = request.params;

  //probably need an error check here for term not found

  database('terms').where('id', terms_id).select()
  .then((term) => {
    return response.status(200).json(term)
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  CREATE NEW TERM  //////
// NOTE:  Requires category id in params and then term and definition in body.  Call will add the category name to the term.
app.post('/api/v1/categories/:category_id/terms', async (request, response) => {
  const newTerm = request.body;
  const { category_id } = request.params;

  for (let requiredParameter of ['term', 'definition']) {
    if (!newTerm[requiredParameter]) {
      return response.status(422).json({ error: `Missing required parameter - ${requiredParameter}`})
    }
  }
  const categoryName = await database('categories').where('id', category_id).select()
  if (!categoryName.length) {
    return response.status(422).json({ error: `Category not found` })
  }

  const addTerm = await Object.assign({}, newTerm, { category_id: category_id, category_name: categoryName[0].name });

  database('terms').returning('id').insert(addTerm)
  .then((id) => {
    return response.status(201).json(id)
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  CREATE NEW CATEGORY  //////
app.post('/api/v1/categories', (request, response) => {
  const newCategory = request.body;

  for (let requiredParameter of ['name']) {
    if (!newCategory[requiredParameter]) {
      return response.status(422).json({ error: `Missing required parameter - ${requiredParameter}`})
    }
  }
  database('categories').returning('id').insert(newCategory)
  .then((id) => {
    return response.status(201).json(id)
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});


//////  UPDATE TERM  //////
app.put('/api/v1/terms/:terms_id', async (request, response) => {
  const { terms_id } = request.params;
  const updatedTerm = request.body;
  const termToUpdate = await database('terms').where('id', terms_id).select()

  if (!termToUpdate.length) {
    return response.status(422).json({ error: `Term id not found.` })
  }

  await database('terms').where('id', terms_id).update(updatedTerm)
  .then(() => {
    return response.status(200).send({
      success: `Term ${terms_id} updated.`
    })
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  UPDATE CATEGORY  //////

app.put('/api/v1/categories/:category_id', async (request, response) => {
  const { category_id } = request.params;
  const updatedCategory = request.body;

  const categoryToUpdate = await database('categories').where('id', category_id).select()
  if (!categoryToUpdate.length) {
    return response.status(422).json({ error: `Category not found.` })
  }

  await database('categories').where('id', category_id).update(updatedCategory)
  .then(() => {
    return response.status(200).send({
      success: `Category ${category_id} updated.`
    })
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  DELETE TERM  //////

app.delete('/api/v1/terms/:terms_id', (request, response) => {
  const { terms_id } = request.params;

  const killedTerm = database('terms').where('id', terms_id).select()
  if (!killedTerm.length) {
    return response.status(422).json({ error: `Term ${terms_id} not found` })
  }

  database('terms').where('id', terms_id).delete()
  .then(() => {
    return response.status(200).send({
      success: `Term ${terms_id} deleted.`
    })
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

//////  DELETE CATEGORY  //////

app.delete('/api/v1/category/:category_id', (request, response) => {
  const { category_id } = request.params;
  const killedCategory = database('categories').where('id', category_id).select()

  if (!killedCategory.length) {
    return response.status(422).json({ error: `Category ${category_id} not found.` })
  }

  database('categories').where('id', category_id).delete()
  .then(() => {
    return response.status(200).send({
      success: `Category ${category_id} deleted.`
    })
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});




