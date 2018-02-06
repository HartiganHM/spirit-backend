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
    response.status(200).json(terms);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

//////  GET ALL CATEGORIES  //////

app.get('/api/v1/categories', (request, response) => {
  database('categories').select()
  .then((categories) => {
    response.status(200).json(categories);
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  GET TERMS BY CATEGORY ID  //////

app.get('/api/v1/categories/:category_id/terms', (request, response) => {
  const { category_id } = request.params;

  database('terms').where('category_id', category_id).select()
  .then((terms) => {
    response.status(200).json(terms);
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  GET TERMS BY TERMS ID //////

app.get('/api/v1/terms/:terms_id', (request, response) => {
  const { terms_id } = request.params;

  database('terms').where('id', terms_id).select()
  .then((term) => {
    response.status(200).json(term)
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  CREATE NEW TERM  //////

app.post('/api/v1/terms', (request, response) => {
  const newTerm = request.body;

  database('terms').returning('id').insert(newTerm)
  .then((id) => {
    response.status(201).json(id)
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  CREATE NEW CATEGORY  //////

app.post('/api/v1/categories', (request, response) => {
  const newCategory = request.body;

  database('categories').returning('id').insert(newCategory)
  .then((id) => {
    response.status(201).json(id)
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});


//////  UPDATE TERM  //////

app.put('/api/v1/terms/:terms_id', (request, response) => {
  const { terms_id } = request.params;
  const updatedTerm = request.body;

  database('terms').where('id', terms_id).update(updatedTerm)
  .then(() => {
    response.status(200).send({
      success: `Term ${terms_id} updated.`
    })
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  UPDATE CATEGORY  //////

app.put('/api/v1/categories/:category_id', (request, response) => {
  const { category_id } = request.params;
  const updatedCategory = request.body;

  database('categories').where('id', category_id).update(updatedCategory)
  .then(() => {
    response.status(200).send({
      success: `Category ${category_id} updated.`
    })
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  DELETE TERM  //////

app.delete('/api/v1/terms/:terms_id', (request, response) => {
  const { terms_id } = request.params;

  database('terms').where('id', terms_id).delete()
  .then(() => {
    response.status(200).send({
      success: `Term ${terms_id} deleted.`
    })
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

//////  DELETE CATEGORY  //////

app.delete('/api/v1/category/:category_id', (request, response) => {
  const { category_id } = request.params;

  database('categories').where('id', category_id).delete()
  .then(() => {
    response.status(200).send({
      success: `Category ${category_id} deleted.`
    })
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});




