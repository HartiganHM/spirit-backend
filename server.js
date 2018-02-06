const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);  

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const requireHTTPS = (request, response, next) => {
  if (request.headers['x-forwarded-proto'] !== 'https') {
    return response.redirect('https://' + request.get('host') + request.url);
  }
  next();  
};

// app.use(requireHTTPS);   // Comment this line in for production

app.listen(app.get('port'), () => {
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
app.get('/api/v1/categories/:category_id/terms', async (request, response) => {
  const { category_id } = request.params;

  try {
    const terms = await database('terms').where('category_id', category_id).select()

    if (!terms.length) {
      return response.status(404).json({ error: `Category ${category_id} not found.` })
    } else {
      return response.status(200).json(terms)
    } 
  } catch (error) {
    return response.status(500).json({ error })
  }
});

//////  GET TERMS BY TERMS ID //////
app.get('/api/v1/terms/:terms_id', async (request, response) => {
  const { terms_id } = request.params;

  try {
    const term = await database('terms').where('id', terms_id).select()

    if (!term.length) {
      return response.status(404).json({ error: `Term ${terms_id} not found.` })
    } else {
      return response.status(200).json(term)
    }
  } catch (error) {
    return response.status(500).json({ error })
  }
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
    return response.status(422).json({ error: `Term ${terms_id} not found.` })
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
    return response.status(422).json({ error: `Category ${category_id} not found.` })
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




