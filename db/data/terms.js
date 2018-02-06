const terms = [
  {
    term: 'JRC/AR',
    definition: `This is the abbreviation for Just Right Challenge and Adaptive Response. Since we are utilizing and ASI© model as one foundational frame of reference, the treatment plan needs to include mindful decisions about how the therapists might guide the JRC and what AR's are noted.  This is where you should note what treatment was offered and what the response was.  In the treatment planning section, do this related to the STEPSI© components.`,
    category_name: 'Spirit',
    imageURL: ''
  },
  {
    term: 'S-A-M',
    definition: `This is an abbreviation for Sensory-Affective-Motor, and was originated by Greenspan. For the SpIRiT©, Stackhouse and colleagues have elaborated the Sensory-Affective-Motor function into the low and high routes of processing that occur in each function.  This is the pivotal function that helps to 'connect the dots and trace the threads' of connection between the functions in the SpIRiT© model.  The idea here is for the clinician to select which aspect seems to be the "driver" of the concerns in that area (S-A-M) - it is a clinical decision/tacit response about what seems to be the most primary. This should be consistent, then, with what your clinical decisions are in each area.  It could be one, two, or all three (S-A-M), and it could vary from one area to another.`,
    category_name: 'Spirit',
    imageURL: true
  },
  {
    term: 'S in S-A-M: Sensory',
    definition: `High: Sensory Discrimination, Low: Sensory Modulation`,
    category_name: 'Spirit',
    imageURL: ''
  },
  {
    term: 'A in S-A-M: Affective',
    definition: `High: Motivational Biasing System, Low: Affective Valence`,
    category_name: 'Spirit',
    imageURL: ''
  },
  {
    term: 'M in S-A-M: Motor',
    definition: `High: Motor Planning Executive system, Low: Automatic postural and motor functions`,
    category_name: 'Spirit'
    imageURL: ''
  },
  {
    term: 'Vestibular',
    definition: 'Receptors located bilaterally in inner ears.  Receives information about gravity and movement in all planes and detects change, variation, speed, location of the movement.  Partners with proprioception and vision to give sense of balance and postural adaptation.  Participates with cranial nerves to control ocular motor function and integrate head/neck movements with body and space.  Gives rise to bilateral control, spatial awareness, body awareness, movement and balance, contributes to sense of self and sense of here/now and organizes for anticipation and future planning. Senses vibration and wellness of self and other.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Proprioception',
    definition: 'Receptors located in muscles and joint receptors.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Tactile',
    definition: 'Receptors located in the skin/dermis to detect quality of touch (+-) as well as detail, quality, location, intensity, duration and meaning of the input.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Auditory',
    definition: 'Receptors located bilaterally in middle/inner ears.  Apparatus of hearing, binaurally dependent.  Participates in sound localization and details deterction.  Gives rise to phoneme and speech detection.  Figure ground/environmental sound differentiation.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Visual',
    definition: 'Receptors located in our eyes.  Gives rise to visual acuity, binocularly dependent.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Intero',
    definition:  'Receptors located in viscera and are somatosensory in nature.  Detect changes in pressure.  The sensation of internal physiological change.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Olfaction',
    definition: 'Receptors located in nose and are chemoreceptors for smell.  Primarily for detection hedonic for modulation and for emotional memory support for detail/discrimination.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Sensory Responsivity & Recovery in relation to Arousal (ANS/CNS)',
    definition: `Note the reactivity and recovery to sensation (collectively this is what 'responsivity' means).  Sensory responsivity is behaviourally observed and occurs in relation to the arousal (CNS and/or ANS) state.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Arousal',
    definition: `Relative activation of the brain. Arousal is a state of relative activity or activation of energy in preparation for or during actual responsivity and behavior, occurs in both mind and body.  Arousal is relative to demand and responsivity to  sensory-affect-motor based input and is contextual/conditional. Arousal changes in preparation for the response in context (readiness). When it is well modulated, arousal is appropriate, proportional activation or adaptation to the input or context. Arousal difficulties are when the adaptation and or activation are not in-kind to the input or condition.  Arousal works in an inverted-U arousal-performance relationship, that reveals that performance is optimal in middle/optimal states of arousal and levels off as arousal is non-optimal (too high or low).  General CNS arousal ranges from a state of general nervous system quietness and inhibition to a state of activation or overactivation.  As it moves through these states, the arousal can be described in behavioral terms along a spectrum  as follows:  1. Asleep 2. Drowsy 3. Hypoalert  4. Calmly focused and Alert 5. Hyperalert  6. Flooded  7. Shutdown/protective inhibition. The final state cycles back to lower states, and in the lowest states, the nervous system might signal activation to support physiology.  The brain states of arousal can also be related to brainwave states:`,
    category_name: 'Modulation',
    imageURL: true
  },
  {
    term: 'Defensiveness',
    definition: 'Aversive or negative responsivity to sensation that has a neutral to positive general valence, or, negative/aversive/avoidant response to sensation due to progressive over-responding or lack of habituation.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Valance of Response',
    definition: 'The sensory/affective base function - the hedonic tone of the stimulus (pleasant/unpleasant; positive/neutral/negative detection).',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Over',
    definition: 'Disproportionately high responsivity to sensation.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Under',
    definition: 'Disproportionately low responsivity to sensation.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Variable',
    definition: 'Disproportionately and variable responsivity to sensation.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Attention',
    definition: `The person's ability to gain, direct, and sustain attention to salient, relevant information or stimulation.  It includes many sensory and cognitive capacities; much of this includes simultaneous activation and inhibition.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Action',
    definition: `Action is modulated via inhibitory control, it is the process where you are the "boss" of your action generation - able to grade and control the quality of motor action, and able to inhibit or manage the constant need for movement that all beings have as well as the stimulus driven call for motor output.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Affect',
    definition: `Affect is the pre-emotion basic physiological experience, based on valence, of the way arousal is impacted by stimulus, situation, or interaction; it gives rise to expression of emotion or feelings, including facial expressions, gestures, tone of voice, and other signs of emotion such as laughter or tears.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Autonomic',
    definition: `Autonomic is the general state of activation in the ANS, with relative activation or baseline resting state of SNS or PNS noted.  SNS: is responsible for arousing or preparing the body for action and when distressed, for the fear/fight/flight activation.  PNS: is the parasympathetic nervous system and is responsible for rest and relaxation, for activation of the vagal break, or for shutting down the system under duress.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Physiological',
    definition: 'Refers to those bodily changes that correspond to our feelings of being energized (up/down regulated) and include autonomic adjustments responsively to stimulus and demand on the system.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Sensory',
    definition: 'Modulation of sensation is related to hedonic tone (valence) for the purpose of arousal, attention, affect, or action regulation.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Emotional',
    definition: 'Refers to the processing of emotion, typically bottom up in nature, from interoceptive signal/feeling, Valence/sensory affective coding of the experience, Emotion coding and activation (basic emotion), ANS relative activation, Limbic loop processes into memory and language for complex emotional knowing (complex emotion) and activation of what to do with the feeling (emotion regulation) including problem solving (cognitive regulation of emotion).',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Cognitive',
    definition: 'Ability to use higher order thinking and problem solving to regulate behavior and experience and guide action/response.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Social',
    definition: 'Ability to connect with others and use this connection to govern behavior.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Prosocial',
    definition: 'Being able to organize own behavior in accordance with social needs, norms, and intentions.  Includes empathy, helping, sharing, promoting the wellness in others.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Passive',
    definition: 'Refers automatic processes that respond to and may try to influence the state of the nervous system to return to a more optimal state.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Active',
    definition: 'Active regulation that is aimed to obtain or maintain a more desired state through the active selection and engagement in actions/behaviors.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Co-Regulation',
    definition: 'Refers to the continuous unfolding of individual action that is susceptible to being continuously modified by the continuously changing actions of the partner.  Co-regulation is an important quality of interaction during which the dyad functions as an integrated entity to regulate each other’s behavior (Fogel, 2000).',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Self-Regulation',
    definition: `Refers to the automatic and volitional processes of attaining and maintaining harmony across neural functions that are under demand for the purpose of producing adaptive behavior.   It is the internal brain-based management and multiple levels of neural processing used to  guide one's own thoughts, behaviors, and feelings to reach goals, including the goal of homeostasis and mental equilibrium.`,
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Approach',
    definition: 'Refers to the moving toward or obtaining more of an input that is selected.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Avoid',
    definition: 'Refers to moving away from to get away from stimulation that is not aligned with desired state.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Adaptive',
    definition: 'Refers to behavior that allows individuals to adapt in a positive manner to various situations. It is a functional adjustment to a particular behavior. Adaptive behavior creates a condition where the individual can truly develop and grow.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Maladaptive',
    definition: 'Refers to action or behavior that is utilized to protect or reduce the impact of stimulation or experience, but the result is dysfunctional and non-productive.',
    category_name: 'Modulation',
    imageURL: ''
  },
  {
    term: 'Core Development',
    definition: 'Outer Core is assessed by looking at alignment of head over shoulders, shoulders over hips, and hips over pelvis.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Inner Core',
    definition: 'Access to Inner Core is alignment plus breath (three-dimensional movement of rib cage with graded inhalations and exhalations).',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Antigravity Control',
    definition: 'How well one can maintain the spinal curves against gravity.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Strength',
    definition: 'Enough power to accomplish the desired task.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Endurance',
    definition: 'Ability to sustain effort over time in order to accomplish the desired task.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Stability',
    definition: 'The ability to sustain core activation.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Mobility',
    definition: 'The ability to move on top of stability/core activation.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Top/Bottom',
    definition: 'Lines of connectivity between the upper and lower half of the body.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Left/Right',
    definition: 'Lines of connectivity between the two sides of the body.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Front/Back',
    definition: 'Lines of connectivity between the dorsal and ventral surfaces of the body.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Sagittal Plane',
    definition: 'This is the plane where flexion and extension occur.  Dorsi/plantar flexion of the foot/ankle.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Frontal Plane',
    definition: 'Allows for lateral flexion/extesion, as well as elevation/depression of the scapula, adduction and abduction to/away from midline.  Inversion/eversion of the foot.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Transverse Plane',
    definition: 'Allows for rotation around the point of stability.  Includes supination/pronation.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Midlines of Each Plane',
    definition: `Dividing the body into left and right halves using an imaginary line gives us the sagittal plane. Any forward and backward movement parallel to this line occurs in the sagittal plane.  With an imaginary line, divide the body into front and back halves and you have the frontal plane. Any lateral (side) movement parallel to the line will occur in the frontal plane.  The transverse plane, which divides the body into top and bottom halves. Movement parallel to the waistline, otherwise known as rotational movement, occurs in the transverse plane.  Midlines also divide the body into top/bottom, creating a 4th dimension within which the three dimensions function.`,
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Body Parts (1-8)',
    definition: `1) core abdominal control, 2) shoulder girdle core, 3) pelvic (trunk to LE) core, 4) head/neck to trunk core, 5) eyes in head core, 6) hand function control, 7) lower extremity, and 8) foot/base of support core.`,
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Suck/Swallow/Breath',
    definition: 'Coordinated synchrony of breath within the suck and swallow cycle for feeding and regulatory breathing.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Ocular',
    definition: 'There are four basic types of eye movements, saccades, smooth pursuit, vergence(con and di), and vestibulo-ocular movements.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Antigravity Control',
    definition: 'Ability to recruit muscle activation to hold against forces of gravity.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Muscle Tone',
    definition: `Is the continuous and passive partial contraction of the muscles, or the muscle's resistance to passive stretch during resting state.`,
    category_name: 'Posture',
    imageURL: ''
  }, 
  {
    term: 'Alignment/COG over BOS',
    definition: 'Postural and limb alignment based on skeletal and neuromuscular forces interacting with center of gravity.  Center of gravity of base of support.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Reflex Integration/Sensory Motor Patterns',
    definition: 'Primitive or primary movement patterns allow for infant motor development and are integrated as neuromotor foundations and sensory experience allow for more advanced automatic and volitional motor control.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Anticipatory Control',
    definition: 'A set of strategies of postural adjustment that an individual uses to prepare for specific voluntary movements.',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term:
    definition: 
    category_name:
    imageURL:
  },
  
  
]

