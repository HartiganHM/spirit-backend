/*eslint-disable no-console*/
/*eslint-disable camelcase*/

const categories = require('../../data/categories');
const terms = require('../../data/terms');
const clinics = require('../../data/mockClinics');
const users = require('../../data/mockUsers');
const patients = require('../../data/mockPatients');
const primaryConcerns = require('../../data/mockPrimaryConcerns');
const sessions = [{}];
const processes = require('../../data/mockProcesses');
const treatmentPlans = require('../../data/mockTreatmentPlans');
const therapyGoals = require('../../data/mockTherapyGoals');

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
  return knex('primary_concerns')
    .insert(primaryConcern, 'id')
    .then(primaryConcernId => {
      let sessionsPromises = [];

      sessions.forEach(session => {
        sessionsPromises.push(
          createSessions(knex, {
            ...session,
            concern_id: primaryConcernId[0]
          })
        );
      });

      return Promise.all(sessionsPromises);
    })
    .catch(error => {
      throw error;
    });
};

const createSessions = (knex, session) => {
  return knex('sessions')
    .insert(session, 'id')
    .then(sessionId => {
      let processesPromises = [];
      let treatmentPlansPromises = [];
      let therapyGoalsPromises = [];

      processes.forEach(processes => {
        processesPromises.push(
          createProcesses(knex, {
            ...processes,
            session_id: sessionId[0]
          })
        );
      });

      treatmentPlans.forEach(treatmentPlan => {
        treatmentPlansPromises.push(
          createTreatmentPlans(knex, {
            ...treatmentPlan,
            session_id: sessionId[0]
          })
        );
      });

      therapyGoals.forEach(therapyGoal => {
        therapyGoalsPromises.push(
          createNewTherapyGoals(knex, {
            ...therapyGoal,
            session_id: sessionId[0]
          })
        );
      });

      const allSessionsPromises = [
        processesPromises,
        treatmentPlansPromises,
        therapyGoalsPromises
      ].map(innerPromiseArray => Promise.all(innerPromiseArray));

      return Promise.all(allSessionsPromises);
    })
    .catch(error => {
      throw error;
    });
};

const createProcesses = (knex, processes) => {
  return knex('processes').insert(processes);
};

const createTreatmentPlans = (knex, treatmentPlan) => {
  return knex('treatment_plans').insert(treatmentPlan);
};

const createNewTherapyGoals = (knex, therapyGoal) => {
  return knex('therapy_goals').insert(therapyGoal);
};

exports.seed = function(knex, Promise) {
  return knex('terms')
    .del()
    .then(() => knex('categories').del())
    .then(() => knex('therapy_goals').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE therapy_goals_id_seq RESTART WITH 1');
    })
    .then(() => knex('treatment_plans').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE treatment_plans_id_seq RESTART WITH 1');
    })
    .then(() => knex('processes').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE processes_id_seq RESTART WITH 1');
    })
    .then(() => knex('sessions').del())
    .then(function() {
      return knex.raw('ALTER SEQUENCE sessions_id_seq RESTART WITH 1');
    })
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
