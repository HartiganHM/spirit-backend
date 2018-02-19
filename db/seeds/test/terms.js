/*eslint-disable camelcase*/
/*eslint-disable no-console*/

const categories = require('../../data/categories');
const terms = require('../../data/terms');
const clinis = require('../../data/mockClinics');
const users = require('../../data/mockUsers');

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

const sessions = [{}];

const processes = [
  {
    sen_h_vestibular: '7F',
    mod_2_autonomic: '3R',
    exe_4b_self_control: '5A',
    pos_5_alignment_COG: '10F',
    soc_2_social_motivators: '3I'
  }
];

const treatmentPlans = [
  {
    modulation_sensory: 'Needs help recognizing social cues',
    modulation_task: 'Puzzle Games',
    modulation_environment: 'Solo play in quiet setting',
    modulation_predictability:
      'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
    modulation_self_regulation: 'Focus and attention',
    modulation_interaction: 'Encourage problem solving with guidance',
    modulation_JRC_AR_notes:
      'Record results from distance, but be engaged if needed',

    posture_sensory: 'Needs help recognizing social cues',
    posture_task: 'Puzzle Games',
    posture_environment: 'Solo play in quiet setting',
    posture_predictability:
      'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
    posture_self_regulation: 'Focus and attention',
    posture_interaction: 'Encourage problem solving with guidance',
    posture_JRC_AR_notes:
      'Record results from distance, but be engaged if needed',

    sensory_discrimination_sensory: 'Needs help recognizing social cues',
    sensory_discrimination_task: 'Puzzle Games',
    sensory_discrimination_environment: 'Solo play in quiet setting',
    sensory_discrimination_predictability:
      'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
    sensory_discrimination_self_regulation: 'Focus and attention',
    sensory_discrimination_interaction:
      'Encourage problem solving with guidance',
    sensory_discrimination_JRC_AR_notes:
      'Record results from distance, but be engaged if needed',

    social_emotional_sensory: 'Needs help recognizing social cues',
    social_emotional_task: 'Puzzle Games',
    social_emotional_environment: 'Solo play in quiet setting',
    social_emotional_predictability:
      'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
    social_emotional_self_regulation: 'Focus and attention',
    social_emotional_interaction: 'Encourage problem solving with guidance',
    social_emotional_JRC_AR_notes:
      'Record results from distance, but be engaged if needed',

    executive_functioning_sensory: 'Needs help recognizing social cues',
    executive_functioning_task: 'Puzzle Games',
    executive_functioning_environment: 'Solo play in quiet setting',
    executive_functioning_predictability:
      'Should start self-sufficiently, but rely on OT as puzzles become more difficult',
    executive_functioning_self_regulation: 'Focus and attention',
    executive_functioning_interaction:
      'Encourage problem solving with guidance',
    executive_functioning_JRC_AR_notes:
      'Record results from distance, but be engaged if needed'
  }
];

const therapyGoals = [
  {
    modulation_goal: 'Goal 1',
    modulation_ot_importance: 5,
    modulation_parent_importance: 5,
    modulation_ot_performance: 5,
    modulation_parent_performance: 5,
    modulation_ot_satisfaction: 5,
    modulation_parent_satisfaction: 5,

    posture_goal: 'Goal 2',
    posture_ot_importance: 5,
    posture_parent_importance: 5,
    posture_ot_performance: 5,
    posture_parent_performance: 5,
    posture_ot_satisfaction: 5,
    posture_parent_satisfaction: 5,

    sensory_discrimination_goal: 'Goal 3',
    sensory_discrimination_ot_importance: 5,
    sensory_discrimination_parent_importance: 5,
    sensory_discrimination_ot_performance: 5,
    sensory_discrimination_parent_performance: 5,
    sensory_discrimination_ot_satisfaction: 5,
    sensory_discrimination_parent_satisfaction: 5,

    social_emotional_goal: 'Goal 4',
    social_emotional_ot_importance: 5,
    social_emotional_parent_importance: 5,
    social_emotional_ot_performance: 5,
    social_emotional_parent_performance: 5,
    social_emotional_ot_satisfaction: 5,
    social_emotional_parent_satisfaction: 5,

    executive_functioning_goal: 'Goal 5',
    executive_functioning_ot_importance: 5,
    executive_functioning_parent_importance: 5,
    executive_functioning_ot_performance: 5,
    executive_functioning_parent_performance: 5,
    executive_functioning_ot_satisfaction: 5,
    executive_functioning_parent_satisfaction: 5
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
