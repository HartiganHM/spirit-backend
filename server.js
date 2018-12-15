/*eslint-disable camelcase*/
/*eslint-disable no-console*/

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { KEYUTIL, KJUR, b64utoutf8 } = require('jsrsasign');
const cors = require('express-cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const key =
  environment === 'development' ? require('./devPubKey') : require('./pubKey');

const corsOptions = {
  allowedOrigins: [
    'localhost:3001',
    'localhost:3000',
    'rmorgan323.github.io',
    'spirit-fe.herokuapp.com'
  ],
  preflightContinue: true,
  headers: ['Content-Type', 'x-token']
};

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, x-token'
  );
  next();
};

////// HTTPS REDIRECT //////
const requireHTTPS = (request, response, next) => {
  if (request.headers['x-forwarded-proto'] !== 'https') {
    return response.redirect('https://' + request.get('host') + request.url);
  }
  next();
};

app.set('port', process.env.PORT || 3000);
app.set('spiritKey', process.env.SPIRIT_KEY);

if (environment !== 'development' && environment !== 'test') {
  app.use(requireHTTPS);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(allowCrossDomain);
app.use(cors(corsOptions));

app.listen(app.get('port'), () => {
  console.log(`Spirit is running on localhost:${app.get('port')}.`);
});

////// VALIDATE //////
const validate = (request, response) => {
  try {
    var jwToken =
      request.headers['x-token'] !== 'null' ? request.headers['x-token'] : '';
    var pubkey = KEYUTIL.getKey(key);
    var isValid = KJUR.jws.JWS.verifyJWT(jwToken, pubkey, {
      alg: ['RS256']
    });
    if (isValid) {
      var payloadObj = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(jwToken.split('.')[1])
      );
      return payloadObj;
    }
  } catch (error) {
    response.status(401).json({
      error: `Invalid token.  Please login again. Error: ${error} Request:${request}`
    });
  }
};

////// GET/CREATE USER //////
const getCurrentUser = async (request, response) => {
  const userObject = await validate(request, response);
  if (!userObject) {
    return;
  }

  const newUser = {
    email: userObject.un,
    name: userObject.n,
    authrocket_id: userObject.uid
  };

  let foundUser = null;
  await database('users')
    .where('authrocket_id', userObject.uid)
    .select()
    .then(async user => {
      if (!user.length) {
        foundUser = await createUser(response, newUser);
      } else {
        foundUser = user[0];
      }
    })
    .catch(error => {
      response.status(404).json({
        error
      });
    });
  return foundUser;
};

const createUser = async (response, user) => {
  let foundUser;
  await database('users')
    .insert(user)
    .then(() => {
      foundUser = user;
    })
    .catch(error => {
      response.status(500).json({
        error
      });
    });
  return foundUser;
};

//////  GET ALL USERS  //////
app.get('/api/v1/users', async (request, response) => {
  const currentUser = await getCurrentUser(request, response);
  if (!currentUser) {
    return;
  }
  database('users')
    .where('authrocket_id', currentUser.authrocket_id)
    .select()
    .then(user => {
      response.status(200).json(user);
    });
});

//////  GET ALL CLINICS //////
app.get('/api/v1/clinics', (request, response) => {
  database('clinics')
    .select()
    .then(clinics => {
      return response.status(200).json(clinics);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  GET ALL PATIENTS //////
app.get('/api/v1/patients', (request, response) => {
  database('patients')
    .select()
    .then(patients => {
      return response.status(200).json(patients);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  GET ALL TERMS  //////
app.get('/api/v1/terms/all', (request, response) => {
  database('terms')
    .select()
    .then(terms => {
      return response.status(200).json(terms);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  GET ALL CATEGORIES  //////
app.get('/api/v1/categories/all', (request, response) => {
  database('categories')
    .select()
    .then(categories => {
      return response.status(200).json(categories);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  GET TERMS BY TERMS NAME //////
app.get('/api/v1/terms', async (request, response) => {
  const query = request.query.term;

  try {
    const term = await database('terms')
      .where('term', query)
      .select();

    if (!term.length) {
      return response.status(404).json({
        error: `Term ${query} not found.`
      });
    } else {
      return response.status(200).json(term);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  GET CLINIC BY CLINIC ID //////
app.get('/api/v1/clinics/:clinic_id', async (request, response) => {
  const { clinic_id } = request.params;

  try {
    const clinic = await database('clinics')
      .where('id', clinic_id)
      .select();

    if (!clinic.length) {
      return response.status(404).json({
        error: `Clinic ${clinic_id} not found.`
      });
    } else {
      return response.status(200).json(clinic);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  GET PATIENT BY PATIENT ID //////
app.get('/api/v1/patients/:patient_id', async (request, response) => {
  const { patient_id } = request.params;

  try {
    const patient = await database('patients')
      .where('id', patient_id)
      .select();

    if (!patient.length) {
      return response.status(404).json({
        error: `Patient ${patient_id} not found.`
      });
    } else {
      return response.status(200).json(patient);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

///// GET PRIMARY CONCERN BY PRIMARY CONCERN ID /////
app.get(
  '/api/v1/primary-concerns/:primaryConcernId',
  async (request, response) => {
    const { primaryConcernId } = request.params;

    try {
      const primaryConcern = await database('primary_concerns')
        .where('id', primaryConcernId)
        .select();

      if (!primaryConcern.length) {
        return response.status(404).json({
          error: `Primary concern ${primaryConcernId} not found.`
        });
      } else {
        return response.status(200).json(primaryConcern);
      }
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

///// GET SESSION BY SESSION ID /////
app.get('/api/v1/sessions/:sessionId', async (request, response) => {
  const { sessionId } = request.params;

  try {
    const session = await database('sessions')
      .where('id', sessionId)
      .select();

    if (!session.length) {
      return response.status(404).json({
        error: `Session ${sessionId} not found.`
      });
    } else {
      return response.status(200).json(session);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  GET THERAPY GOALS FOR COMPARISON  //////
app.post('/api/v1/therapy-goals/compare', async (request, response) => {
  const { idArray } = request.body;

  if (idArray.length > 1) {
    const therapyGoals = await database('therapy_goals')
      .whereIn('session_id', idArray)
      .select();
    return response.status(200).json(therapyGoals);
  } else {
    return response.status(422).json({
      error: 'At least 2 ids required for comparison'
    });
  }
});

//////  GET PROCESSES FOR COMPARISON  //////
app.post('/api/v1/processes/compare', async (request, response) => {
  const { idArray } = request.body;

  if (idArray.length > 1) {
    const processes = await database('processes')
      .whereIn('session_id', idArray)
      .select();
    return response.status(200).json(processes);
  } else {
    return response.status(422).json({
      error: 'At least 2 ids required for comparison'
    });
  }
});

///// GET PROCESS BY PROCESS ID /////
app.get('/api/v1/processes/:processId', async (request, response) => {
  const { processId } = request.params;

  try {
    const processes = await database('processes')
      .where('id', processId)
      .select();

    if (!processes.length) {
      return response.status(404).json({
        error: `Process ${processId} not found.`
      });
    } else {
      return response.status(200).json(processes);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

///// GET TREATMENT PLAN BY TREATMENT PLAN ID /////
app.get(
  '/api/v1/treatment-plans/:treatmentPlanId',
  async (request, response) => {
    const { treatmentPlanId } = request.params;

    try {
      const treatmentPlan = await database('treatment_plans')
        .where('id', treatmentPlanId)
        .select();

      if (!treatmentPlan.length) {
        return response.status(404).json({
          error: `Treatment plan ${treatmentPlanId} not found.`
        });
      } else {
        return response.status(200).json(treatmentPlan);
      }
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

///// GET THERAPY GOALS BY THERAPY GOALS ID /////
app.get('/api/v1/therapy-goals/:therapyGoalsId', async (request, response) => {
  const { therapyGoalsId } = request.params;

  try {
    const therapyGoals = await database('therapy_goals')
      .where('id', therapyGoalsId)
      .select();

    if (!therapyGoals.length) {
      return response.status(404).json({
        error: `Therapy goal ${therapyGoalsId} not found.`
      });
    } else {
      return response.status(200).json(therapyGoals);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  GET TERMS BY TERM ID //////
app.get('/api/v1/terms/:terms_id', async (request, response) => {
  const { terms_id } = request.params;

  try {
    const term = await database('terms')
      .where('id', terms_id)
      .select();

    if (!term.length) {
      return response.status(404).json({
        error: `Term ${terms_id} not found.`
      });
    } else {
      return response.status(200).json(term);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  GET PATIENTS BY USER ID  //////
app.get('/api/v1/users/:user_id/patients', async (request, response) => {
  const { user_id } = request.params;

  try {
    const patients = await database('patients')
      .where('ot_id', user_id)
      .select();

    if (!patients.length) {
      return response.status(404).json([]);
    } else {
      return response.status(200).json(patients);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

///// GET PRIMARY CONCERNS BY PATIENT ID /////
app.get(
  '/api/v1/patients/:patientId/primary-concerns',
  async (request, response) => {
    const { patientId } = request.params;

    try {
      const primaryConcerns = await database('primary_concerns')
        .where('patient_id', patientId)
        .select();

      return response.status(200).json(primaryConcerns);
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

///// GET SESSION BY PRIMARY CONCERNS ID /////
app.get(
  '/api/v1/primary-concerns/:primaryConcernId/sessions',
  async (request, response) => {
    const { primaryConcernId } = request.params;

    try {
      const sessions = await database('sessions')
        .where('concern_id', primaryConcernId)
        .select();

      return response.status(200).json(sessions);
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

///// GET PROCESS BY SESSION ID /////
app.get('/api/v1/sessions/:sessionId/processes', async (request, response) => {
  const { sessionId } = request.params;

  try {
    const processes = await database('processes')
      .where('session_id', sessionId)
      .select();

    if (!processes.length) {
      return response.status(404).json({
        error: `Session ${sessionId} not found.`
      });
    } else {
      return response.status(200).json(processes);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

///// GET TREATMENT PLAN BY SESSION ID /////
app.get(
  '/api/v1/sessions/:sessionId/treatment-plans',
  async (request, response) => {
    const { sessionId } = request.params;

    try {
      const treatmentPlans = await database('treatment_plans')
        .where('session_id', sessionId)
        .select();

      if (!treatmentPlans.length) {
        return response.status(404).json({
          error: `Session ${sessionId} not found.`
        });
      } else {
        return response.status(200).json(treatmentPlans);
      }
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

///// GET THERAPY GOALS BY SESSION ID /////
app.get(
  '/api/v1/sessions/:sessionId/therapy-goals',
  async (request, response) => {
    const { sessionId } = request.params;

    try {
      const therapyGoals = await database('therapy_goals')
        .where('session_id', sessionId)
        .select();

      if (!therapyGoals.length) {
        return response.status(404).json({
          error: `Session ${sessionId} not found.`
        });
      } else {
        return response.status(200).json(therapyGoals);
      }
    } catch (error) {
      return response.status(500).json({
        error
      });
    }
  }
);

//////  GET TERMS BY CATEGORY ID  //////
app.get('/api/v1/categories/:category_id/terms', async (request, response) => {
  const { category_id } = request.params;

  try {
    const terms = await database('terms')
      .where('category_id', category_id)
      .select();

    if (!terms.length) {
      return response.status(404).json({
        error: `Category ${category_id} not found.`
      });
    } else {
      return response.status(200).json(terms);
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  CREATE NEW CATEGORY //////
app.post('/api/v1/categories', (request, response) => {
  const newCategory = request.body;

  for (let requiredParameter of ['name']) {
    if (!newCategory[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter - ${requiredParameter}`
      });
    }
  }
  database('categories')
    .returning('id')
    .insert(newCategory)
    .then(id => {
      return response.status(201).json(id);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  CREATE NEW CLINIC //////
// NOTE:  Requires name and abbreviation in body.
app.post('/api/v1/clinics', (request, response) => {
  const newClinic = request.body;

  for (let requiredParameter of ['name', 'abbreviation', 'passcode']) {
    if (!newClinic[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter - ${requiredParameter}`
      });
    }
  }

  database('clinics')
    .returning('id')
    .insert(newClinic)
    .then(id => {
      return response.status(201).json(id);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  CREATE NEW PATIENT //////
// NOTE:  Requires user id in params and then abstracted_name in body.
//        Call will add the clinic_name to the patient.
app.post('/api/v1/users/:user_id/patients', async (request, response) => {
  const newPatient = request.body;
  const { user_id } = request.params;

  for (let requiredParameter of ['abstracted_name']) {
    if (!newPatient[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter - ${requiredParameter}`
      });
    }
  }

  const clinicName = await database('users')
    .where('id', user_id)
    .select();

  if (!clinicName.length) {
    return response.status(404).json({
      error: `User ${user_id} not found.`
    });
  }

  const addPatient = await Object.assign({}, newPatient, {
    clinic_name: clinicName[0].clinic,
    ot_id: user_id
  });

  database('patients')
    .returning('id')
    .insert(addPatient)
    .then(id => {
      const newAbstractedName = newPatient.abstracted_name + id.toString();
      database('patients')
        .where('id', id[0])
        .update('abstracted_name', newAbstractedName, 'id')
        .then(id => {
          database('patients')
            .where('id', id[0])
            .select()
            .then(patient => {
              return response.status(201).json(patient);
            })
            .catch(error => {
              return response.status(500).json({
                error
              });
            });
        });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  CREATE NEW PRIMARY CONCERN //////
// NOTE:  Requires patient id in params and description in body.
//        Call will add the patient_id to primary concern.
app.post(
  '/api/v1/patients/:patientId/primary-concerns',
  async (request, response) => {
    const newPrimaryConcern = request.body;
    const { patientId } = request.params;

    for (let requiredParameter of ['description']) {
      if (!newPrimaryConcern[requiredParameter]) {
        return response.status(422).json({
          error: `Missing required parameter - ${requiredParameter}.`
        });
      }
    }

    const patientName = await database('patients')
      .where('id', patientId)
      .select();

    if (!patientName.length) {
      return response.status(404).json({
        error: `Patient by id ${patientId} not found.`
      });
    }

    const addPrimaryConcern = await Object.assign({}, newPrimaryConcern, {
      patient_id: patientId
    });

    database('primary_concerns')
      .returning('id')
      .insert(addPrimaryConcern)
      .then(id => {
        return response.status(201).json(id);
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  CREATE NEW SESSION //////
// NOTE:  Requires primary concern id in params.
//        Call will add the concern_id to session.
app.post(
  '/api/v1/primary-concerns/:primaryConcernId/sessions',
  async (request, response) => {
    const { primaryConcernId } = request.params;

    const primaryConcern = await database('primary_concerns')
      .where('id', primaryConcernId)
      .select();

    if (!primaryConcern.length) {
      return response.status(404).json({
        error: `Primary concern by id ${primaryConcernId} not found.`
      });
    }

    const addSession = await Object.assign(
      {},
      {
        concern_id: primaryConcernId
      }
    );

    database('sessions')
      .returning('id')
      .insert(addSession)
      .then(id => {
        return response.status(201).json(id);
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  CREATE NEW PROCESS //////
// NOTE:  Requires session id in params.
//        Call will add the session_id to process.
app.post('/api/v1/sessions/:sessionId/processes', async (request, response) => {
  const newProcess = request.body;
  const { sessionId } = request.params;

  const session = await database('sessions')
    .where('id', sessionId)
    .select();

  if (!session.length) {
    return response.status(404).json({
      error: `Session by id ${sessionId} not found.`
    });
  }

  const addProcess = await Object.assign({}, newProcess, {
    session_id: sessionId
  });

  database('processes')
    .returning('id')
    .insert(addProcess)
    .then(id => {
      return response.status(201).json(id);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  CREATE NEW TREATMENT PLAN //////
// NOTE:  Requires session id in params.
//        Call will add the session_id to treatment plan.
app.post(
  '/api/v1/sessions/:sessionId/treatment-plans',
  async (request, response) => {
    const newTreatmentPlan = request.body;
    const { sessionId } = request.params;

    const session = await database('sessions')
      .where('id', sessionId)
      .select();

    if (!session.length) {
      return response.status(404).json({
        error: `Session by id ${sessionId} not found.`
      });
    }

    const addTreatmentPlan = await Object.assign({}, newTreatmentPlan, {
      session_id: sessionId
    });

    database('treatment_plans')
      .returning('id')
      .insert(addTreatmentPlan)
      .then(id => {
        return response.status(201).json(id);
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  CREATE NEW THERAPY GOAL //////
// NOTE:  Requires session id in params.
//        Call will add the session_id to therapy goal.
app.post(
  '/api/v1/sessions/:sessionId/therapy-goals',
  async (request, response) => {
    const newTherapyGoal = request.body;
    const { sessionId } = request.params;

    const session = await database('sessions')
      .where('id', sessionId)
      .select();

    if (!session.length) {
      return response.status(404).json({
        error: `Session by id ${sessionId} not found.`
      });
    }

    const addTherapyGoal = await Object.assign({}, newTherapyGoal, {
      session_id: sessionId
    });

    database('therapy_goals')
      .returning('id')
      .insert(addTherapyGoal)
      .then(id => {
        return response.status(201).json(id);
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  CREATE NEW TERM //////
// NOTE:  Requires category id in params and then term and definition in body.
//        Call will add the category name to the term.
app.post('/api/v1/categories/:category_id/terms', async (request, response) => {
  const newTerm = request.body;
  const { category_id } = request.params;

  for (let requiredParameter of ['term', 'definition']) {
    if (!newTerm[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter - ${requiredParameter}`
      });
    }
  }
  const categoryName = await database('categories')
    .where('id', category_id)
    .select();
  if (!categoryName.length) {
    return response.status(404).json({
      error: `Category not found`
    });
  }

  const addTerm = await Object.assign({}, newTerm, {
    category_id: category_id,
    category_name: categoryName[0].name
  });

  database('terms')
    .returning('id')
    .insert(addTerm)
    .then(id => {
      return response.status(201).json(id);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE USER WITH CLINIC INFO //////
app.put('/api/v1/users/:userId', async (request, response) => {
  const { userId } = request.params;
  const updatedUser = request.body;
  const userToUpdate = await database('users')
    .where('id', userId)
    .select();

  if (!userToUpdate.length) {
    return response.status(404).json({
      error: `User by id ${userId} not found.`
    });
  }

  await database('users')
    .where('id', userId)
    .update(updatedUser)
    .then(() => {
      return response.status(201).send({
        success: `User ${userId} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  CHECK PASSWORD AND UPDATE USER CLINIC INFO  //////
app.put('/api/v1/users/:userId/join', async (request, response) => {
  const { userId } = request.params;
  const updatedUser = request.body;
  const password = updatedUser.passcode;

  const clinic = await database('clinics')
    .where('passcode', password)
    .select();
  if (!clinic.length) {
    return response.status(404).json({
      error: 'Passcode does not match any existing clinics'
    });
  }

  const infoToSave = {
    clinic: clinic[0].name,
    clinic_abbreviation: clinic[0].abbreviation,
    clinic_id: clinic[0].id,
    clinic_passcode: clinic[0].passcode
  };

  await database('users')
    .where('id', userId)
    .update(infoToSave)
    .then(() => {
      return response.status(201).json(infoToSave);
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE PRIMARY CONCERN //////
app.put(
  '/api/v1/primary-concerns/:primaryConcernId',
  async (request, response) => {
    const { primaryConcernId } = request.params;
    const updatedPrimaryConcern = request.body;
    const primaryConcernToUpdate = await database('primary_concerns')
      .where('id', primaryConcernId)
      .select();

    if (!primaryConcernToUpdate.length) {
      return response.status(404).json({
        error: `Primary concern ${primaryConcernId} not found.`
      });
    }

    await database('primary_concerns')
      .where('id', primaryConcernId)
      .update(updatedPrimaryConcern)
      .then(() => {
        return response.status(201).send({
          success: `Primary concern ${primaryConcernId} updated.`
        });
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  UPDATE SESSION //////
app.put('/api/v1/sessions/:sessionId', async (request, response) => {
  const { sessionId } = request.params;
  const updatedSession = request.body;
  const sessionToUpdate = await database('sessions')
    .where('id', sessionId)
    .select();

  if (!sessionToUpdate.length) {
    return response.status(404).json({
      error: `Session ${sessionId} not found.`
    });
  }

  await database('sessions')
    .where('id', sessionId)
    .update(updatedSession)
    .then(() => {
      return response.status(201).send({
        success: `Session ${sessionId} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE PROCESS //////
app.put('/api/v1/processes/:processId', async (request, response) => {
  const { processId } = request.params;
  const updatedProcess = request.body;
  const processToUpdate = await database('processes')
    .where('id', processId)
    .select();

  if (!processToUpdate.length) {
    return response.status(404).json({
      error: `Process ${processId} not found.`
    });
  }

  await database('processes')
    .where('id', processId)
    .update(updatedProcess)
    .then(() => {
      return response.status(201).send({
        success: `Process ${processId} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE TREATMENT PLAN //////
app.put(
  '/api/v1/treatment-plans/:treatmentPlanId',
  async (request, response) => {
    const { treatmentPlanId } = request.params;
    const updatedTreatmentPlan = request.body;
    const treatmentPlanToUpdate = await database('treatment_plans')
      .where('id', treatmentPlanId)
      .select();

    if (!treatmentPlanToUpdate.length) {
      return response.status(404).json({
        error: `Treatment plan ${treatmentPlanId} not found.`
      });
    }

    await database('treatment_plans')
      .where('id', treatmentPlanId)
      .update(updatedTreatmentPlan)
      .then(() => {
        return response.status(201).send({
          success: `Treatment plan ${treatmentPlanId} updated.`
        });
      })
      .catch(error => {
        return response.status(500).json({
          error
        });
      });
  }
);

//////  UPDATE THERAPY GOAL //////
app.put('/api/v1/therapy-goals/:therapyGoalId', async (request, response) => {
  const { therapyGoalId } = request.params;
  const updatedTherapyGoal = request.body;
  const therapyGoalToUpdate = await database('therapy_goals')
    .where('id', therapyGoalId)
    .select();

  if (!therapyGoalToUpdate.length) {
    return response.status(404).json({
      error: `Therapy goal ${therapyGoalId} not found.`
    });
  }

  await database('therapy_goals')
    .where('id', therapyGoalId)
    .update(updatedTherapyGoal)
    .then(() => {
      return response.status(201).send({
        success: `Therapy goal ${therapyGoalId} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE TERM //////
app.put('/api/v1/terms/:terms_id', async (request, response) => {
  const { terms_id } = request.params;
  const updatedTerm = request.body;
  const termToUpdate = await database('terms')
    .where('id', terms_id)
    .select();

  if (!termToUpdate.length) {
    return response.status(404).json({
      error: `Term ${terms_id} not found.`
    });
  }

  await database('terms')
    .where('id', terms_id)
    .update(updatedTerm)
    .then(() => {
      return response.status(201).send({
        success: `Term ${terms_id} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  UPDATE CATEGORY //////
app.put('/api/v1/categories/:category_id', async (request, response) => {
  const { category_id } = request.params;
  const updatedCategory = request.body;

  const categoryToUpdate = await database('categories')
    .where('id', category_id)
    .select();
  if (!categoryToUpdate.length) {
    return response.status(404).json({
      error: `Category ${category_id} not found.`
    });
  }

  await database('categories')
    .where('id', category_id)
    .update(updatedCategory)
    .then(() => {
      return response.status(201).send({
        success: `Category ${category_id} updated.`
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//////  DELETE TERM //////
app.delete('/api/v1/terms/:terms_id', async (request, response) => {
  const { terms_id } = request.params;

  try {
    const killedTerm = await database('terms')
      .returning('id')
      .where('id', terms_id)
      .delete();
    if (!killedTerm.length) {
      return response.status(422).json({
        error: `Term ${terms_id} not found`
      });
    } else {
      return response.status(204).json({
        success: `Term ${terms_id} deleted.`
      });
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

//////  DELETE CATEGORY //////
app.delete('/api/v1/categories/:category_id', (request, response) => {
  const { category_id } = request.params;

  try {
    const killedCategory = database('categories')
      .returning('id')
      .where('id', category_id)
      .delete();
    if (!Object.keys(killedCategory).length) {
      return response.status(422).json({
        error: `Category ${category_id} not found.`
      });
    } else {
      return response.status(204).json({
        success: `Category ${category_id} deleted.`
      });
    }
  } catch (error) {
    return response.status(500).json({
      error
    });
  }
});

module.exports = app;
