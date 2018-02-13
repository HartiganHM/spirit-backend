exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('processes', function(table) {
      table.increments('id').primary();
      table.string('sen_h_vestibular');
      table.string('sen_h_proprioception');
      table.string('sen_h_tactile');
      table.string('sen_h_auditory');
      table.string('sen_h_visual');
      table.string('sen_h_intero');
      table.string('sen_1_ability');
      table.string('sen_1_match');
      table.string('sen_1_classification');
      table.string('sen_1_spatial');
      table.string('sen_1_figure');
      table.string('sen_1_inferences');
      table.string('sen_2_initiation');
      table.string('sen_2_imitation');
      table.string('sen_2_affordance');
      table.string('sen_2_generativity');
      table.string('sen_3_sequencing');
      table.string('sen_3_sequencing_gestalt');
      table.string('sen_3_schema_selection');
      table.string('sen_3_schema_expansion');
      table.string('sen_3_modification');
      table.string('sen_4_timing');
      table.string('sen_4_timing_force');
      table.string('sen_4_spatial');
      table.string('sen_4_temporal');
      table.string('sen_4_control');
      table.string('sen_4_monitoring');
      table.string('sen_5_oral');
      table.string('sen_5_ocular');
      table.string('sen_5_postural');
      table.string('sen_5_limb');
      table.string('sen_5_gross');
      table.string('sen_5_fine');
      table.string('sen_5_tool');
      table.string('sen_5_projected');
      table.string('sen_6_somatodyspraxia');
      table.string('sen_6_visual');
      table.string('sen_6_generalized');
      table.string('sen_6_bmc');
      table.string('sen_6_praxis');

      table.string('mod_h_vestibular');
      table.string('mod_h_proprioception');
      table.string('mod_h_tactile');
      table.string('mod_h_auditory');
      table.string('mod_h_visual');
      table.string('mod_h_intero');
      table.string('mod_1_defensiveness');
      table.string('mod_1_over');
      table.string('mod_1_under');
      table.string('mod_1_variable');
      table.string('mod_2_attention');
      table.string('mod_2_action');
      table.string('mod_2_affect');
      table.string('mod_2_autonomic');
      table.string('mod_3_physiological');
      table.string('mod_3_sensory');
      table.string('mod_3_motor');
      table.string('mod_3_emotional');
      table.string('mod_3_cognitive');
      table.string('mod_3_social');
      table.string('mod_3_prosocial');
      table.string('mod_4a_passive');
      table.string('mod_4a_co_regulation');
      table.string('mod_4a_approach');
      table.string('mod_4a_adaptive');
      table.string('mod_4b_active');
      table.string('mod_4b_self_regulation');
      table.string('mod_4b_avoid');
      table.string('mod_4b_maladaptive');

      table.string('exe_1_orient');
      table.string('exe_1_inhibition');
      table.string('exe_2a_working');
      table.string('exe_2a_shifting');
      table.string('exe_2b_verbal');
      table.string('exe_2b_spatial');
      table.string('exe_2b_general');
      table.string('exe_2b_global');
      table.string('exe_2b_flexibility');
      table.string('exe_3_inhibition');
      table.string('exe_3_shifting');
      table.string('exe_3_sequencing');
      table.string('exe_3_monitoring');
      table.string('exe_4a_future');
      table.string('exe_4a_spatial');
      table.string('exe_4a_problem');
      table.string('exe_4a_reflective');
      table.string('exe_4a_internalized');
      table.string('exe_4b_motivational');
      table.string('exe_4b_effortful');
      table.string('exe_4b_self_control');
      table.string('exe_4b_self_regulation');
      table.string('exe_4b_self_compassion');

      table.string('pos_h_vestibular');
      table.string('pos_h_proprioception');
      table.string('pos_h_tactile');
      table.string('pos_h_auditory');
      table.string('pos_h_visual');
      table.string('pos_h_intero');
      table.string('pos_1_outer');
      table.string('pos_1_inner');
      table.string('pos_2_stability');
      table.string('pos_2_mobility');
      table.string('pos_2_tonic');
      table.string('pos_2_phasic');
      table.string('pos_2_muscle');
      table.string('pos_3_sagittal');
      table.string('pos_3_frontal');
      table.string('pos_3_transverse');
      table.string('pos_3_midlines');
      table.string('pos_4_diagram');
      table.string('pos_5_suck');
      table.string('pos_5_ocular');
      table.string('pos_5_antigravity');
      table.string('pos_5_reflex');
      table.string('pos_5_alignment_COG');
      table.string('pos_5_alignment_orient');
      table.string('pos_5_anticipatory');
      table.string('pos_5_interactive');
      table.string('pos_6_push');
      table.string('pos_6_bilateral');
      table.string('pos_6_grasp');
      table.string('pos_6_strength');
      table.string('pos_6_effortful');

      table.string('soc_1_regulation');
      table.string('soc_1_engagement');
      table.string('soc_1_reciprocity');
      table.string('soc_1_problem');
      table.string('soc_1_representation');
      table.string('soc_1_triangular');
      table.string('soc_1_comparative');
      table.string('soc_1_reflective');
      table.string('soc_2_self_awareness');
      table.string('soc_2_joint');
      table.string('soc_2_social_referencing');
      table.string('soc_2_imitation');
      table.string('soc_2_inferential');
      table.string('soc_2_contingent');
      table.string('soc_2_theory');
      table.string('soc_2_central');
      table.string('soc_2_mentalizing');
      table.string('soc_2_empathy');
      table.string('soc_2_social_motivators');
      table.string('soc_2_pro_social');
      table.string('soc_3_affective');
      table.string('soc_3_emotional_contagion');
      table.string('soc_3_activation_low');
      table.string('soc_3_emotional_cascade');
      table.string('soc_3_activation_high');
      table.string('soc_3_emotional_differentiation');
      table.string('soc_3_emotional_association');
      table.string('soc_3_self_control');
      table.string('soc_3_self_regulation');
      table.string('soc_3_self_compassion');
      table.boolean('soc_4_mental');
      table.boolean('soc_4_thoughts');
      table.boolean('soc_4_attachments');
      table.boolean('soc_4_trauma');

      table.integer('session_id').unsigned();
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('processes')]);
};
