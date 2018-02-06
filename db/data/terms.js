const terms = [
  {
    term: 'JRC/AR',
    definition: `This is the abbreviation for Just Right Challenge and Adaptive Response. Since we are utilizing and ASI© model as one foundational frame of reference, the treatment plan needs to include mindful decisions about how the therapists might guide the JRC and what AR's are noted.  This is where you should note what treatment was offered and what the response was.  In the treatment planning section, do this related to the STEPSI© components.`,
    category_name: 'Spirit',
    imageURL: '',
  },
  {
    term: 'S-A-M',
    definition: `This is an abbreviation for Sensory-Affective-Motor, and was originated by Greenspan. For the SpIRiT©, Stackhouse and colleagues have elaborated the Sensory-Affective-Motor function into the low and high routes of processing that occur in each function.  This is the pivotal function that helps to 'connect the dots and trace the threads' of connection between the functions in the SpIRiT© model.  The idea here is for the clinician to select which aspect seems to be the "driver" of the concerns in that area (S-A-M) - it is a clinical decision/tacit response about what seems to be the most primary. This should be consistent, then, with what your clinical decisions are in each area.  It could be one, two, or all three (S-A-M), and it could vary from one area to another.`,
    category_name: 'Spirit',
    imageURL: 'true'
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
    category_name: 'Spirit',
    imageURL: ''
  },
  {
    term: 'Vestibular',
    definition: 'Receptors located bilaterally in inner ears.  Receives information about gravity and movement in all planes and detects change, variation, speed, location of the movement.  Partners with proprioception and vision to give sense of balance and postural adaptation.  Participates with cranial nerves to control ocular motor function and integrate head/neck movements with body and space.  Gives rise to bilateral control, spatial awareness, body awareness, movement and balance, contributes to sense of self and sense of here/now and organizes for anticipation and future planning. Senses vibration and wellness of self and other.',
    category_name: 'Sensory Systems',
    imageURL: ''
  },
  {
    term: 'Push/Pull/Reach',
    definition: 'Basic action patterns that are biomechanically possible',
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Bilateral Symmetrical/Bilateral Asymmetrical/Unilateral',
    definition: `The ability to use both sides of your body in a coordinated way either symmetrically, asymmetrically or unilaterally. Limbs can coordinate to work together to do the same task or they can work simultaneously at different tasks to complete the action.`,
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Grasp/Release',
    definition: `Fine manual, oral, ocular control allow for flexion-grasp/extension-release patterns.`,
    category_name: 'Posture',
    imageURL: '',
  },
  {
    term: 'Strength/ Endurance/Flexibility/BMI',
    definition: `Muscular strength is the amount of force that your muscles are able to produce in a single effort /ability to sustain body effort for duration. Muscular endurance is the ability of your muscles to perform repeated contractions or hold a single contraction over a period of time without fatigue / ability of your body's muscles, ligaments, tendons and joints to move through their full range of motion without tightness or discomfort /BMI, the acronym for body mass index and is an indicator of body composition.`,
    category_name: 'Posture',
    imageURL: ''
  },
  {
    term: 'Ideation',
    definition: `Coming up with ideas `,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Initiation',
    definition: `Starting idea once formulated`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Imitation',
    definition: `Matching actions to a modeled action`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Affordance-based ',
    definition: `Properties that evince particular action (obvious, imitative or expands?)`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Sequencing',
    definition: `Organizing a sequence to meet the idea/goal and carrying it to completion.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Body Scheme, Selection and Expansion',
    definition: `Based in awareness of body – internal map – neural memories and mapped to affordances and basic action patterns to generate chunks of action possibilities.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Execution',
    definition: `Includes the physical enactment of the act, includes space and time processing. The actual performance of the motor act, coordinating 2 or more actions simultaneously, ability to make precise motor responses and changes.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Monitoring',
    definition: `Awareness of goal/idea (ie was it completed and completed as planned?).`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Modification',
    definition: `Were errors corrected (ie was repeated performance smoothed/improved?).`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Timing/Force',
    definition: `Motor execution happens in a sequence of timing and the intensity of the muscle action is graded in response to body and environmental affordances.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Spatial Motor',
    definition: `Motor actions occur with body acting in the space around/environment and coordinated therein.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Control (Postural, FF, FB)',
    definition: `Postural control requires stability and postural control, anticipatory (feedforward) control and adjustment based on action forces or comparison to goal with correction or refinement or error correction (feedback).`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Oral',
    definition: `Mouth, includes tongue, cheeks, palate, teeth, jaw, in relation to hyoid based head neck complex and SSB/talk function.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Ocular',
    definition: `There are four basic types of eye movements, saccades, smooth pursuit, vergence(con and di), and vestibulo-ocular movements.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Postural',
    definition: `Body control through planes of movement with stability/mobility patterns.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Limb',
    definition: `Extremity - leg or arm and foot or hand anatomically part of whole.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Gross',
    definition: `General body based actions.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Fine',
    definition: `Refined distal body actions of the hands, feet, eyes or oral/facial structures`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Tool/Object',
    definition: `Motor skills often interact with a tool or object and this requires additional coordination and skill.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Projected Action Sequences',
    definition: `Anticipation of future events in the environment and the ability to adjust actions to meet those conditions. Ability to differentiate self and object action and make adjustments accordingly.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Ayres’ Factors',
    definition: `Sensory Discrimination leads to a number of difficulties that through research have been identified as the factors of dysfunction.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Praxis',
    definition: `The ability to conceive of, organize, and carry out a sequence of unfamiliar actions. (Ayres 1973)`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Somatodyspraxia',
    definition: `Somatosensory-based coordination difficulties. Note which areas of the process of praxis are also involved below.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Visual Dyspraxia',
    definition: `2D  and/or 3D  visual-constructional dyspraxia.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Generalized Dyspraxia',
    definition: `Overall somato/vestibular sensory-based and generalized process of praxis is fully disrupted in all areas as noted below.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'BMC/Balance/Sequencing/ML',
    definition: `Bilateral Motor Coordination issues, with Balance and Sequencing difficulties (vestibular base). The ability to use both sides of your body in a coordinated way – they can work together to do the same task or they can work simultaneously at different tasks to complete the action.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Praxis on Verbal Command',
    definition: `Ability to motor plan actions based on verbal request/description; often spatial in nature and related to understanding of prepositions.`,
    category_name: 'Sensory Discrimination',
    imageURL: ''
  },
  {
    term: 'Regulation',
    definition: `Ability to be calm and alert and maintain this while in response to stimulation/interaction around you.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Engagement',
    definition: `This is the capacity to show interest in and connect with and delight in others and includes shared gaze, shared affect, and shared imitation.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Reciprocity/Reciprocal Social Interaction',
    definition: `The capacity for shared back and forth connected interaction with initiating and responding in a back and forth shared manner.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Problem Solving',
    definition: `This is the capacity to use gestures and words(so communication based, to solve problems together and involves inter-subjective understanding.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Representational Symbolic Thinking',
    definition: `The ability to use symbols, pretend and imagination or creativity related to ideas, interactions and actions.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Triangular Thinking',
    definition: `The child is able to explore multiple reasons for a feeling, comparing feelings, and understanding triadic interactions among feeling states.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Comparative Thinking and Gray Area Thinking',
    definition: `Shades and gradations among different feeling states, the ability to describe degrees of feelings about anger, love, excitement, disappointment, and how the self is impacted by self-perception comparison to others.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Reflective Thinking',
    definition: `Reflecting on feelings in a relationship to an internalized sense of self.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Self/Other Awareness',
    definition: `An emerging awareness and knowledge of self as individual yet in relation to others, includes eventually how these two intersect including strengths, weaknesses, thoughts, beliefs, motivation, intentions, and emotions.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Joint Attention',
    definition: `Joint attention or shared attention is the shared focus of two individuals on an object. It is achieved when one individual alerts another to an object by means of eye-gazing, pointing or other verbal or non-verbal indications.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Social Referencing',
    definition: `Non-verbal interactive process where the cues are taken and exchanged with an-other in the environment, about which emotions and actions are appropriate in a certain context or situation.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Imitation',
    definition: `Behavior whereby an individual observes and replicates another's behavior; mimicry is matching because of contagion whereas emulation is imitation because of action of for purpose of intention, not just matching action, which is what imitation produces.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Inferential Thinking/Intention',
    definition: `Capacity to use observation and background knowledge with context of relationship to reach a logical conclusion about what was intended/desired in the other's mind or action.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Contingent Interaction/Reciprocal Actions',
    definition: `Caregiver response contiguity is characterized by the caregiver’s promptness and frequency or rate of response to the infant’s signals/  the back-and-forth flow of social interaction. The term reciprocity refers to how the behavior of one person influences and is influenced by the behavior of another person and vice versa.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Theory of Mind',
    definition: `Theory of Mind (often abbreviated ToM) is the ability to attribute mental states—beliefs, intents, desires, pretending, knowledge, etc.—to oneself and others and to understand that others have beliefs, desires, intentions, and perspectives that are different from one's own.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Central Coherence',
    definition: `Central coherence is the ability to focus on both details as well as wholes and in particular to extend this to the understanding of the social world.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Mentalising',
    definition: `The process by which we make sense of each other and ourselves, implicitly and explicitly, in terms of subjective states and mental processes. It is a profoundly social construct in the sense that we are attentive to the mental states of those we are with, physically or psychologically.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Empathy and Social Perspective',
    definition: `Perspective-taking is the process by which an individual views a situation from another's point-of-view.  Perspective-taking is  the cognitive, intellectual reaction to another's situation or experience and empathy is the visceral, emotional reaction.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Social Motivators (AAAA)',
    definition: `Our personal engagement is mediated by our social experience and we connect to motivation via intentional direction of action to shift, change, enhance or dampen attention, arousal, affect, or action.`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Mental Health Support indicated?',
    definition: `Y/N: If primarily emotion regulation, then often psychological support is needed.  Emotion regulation consists of “…the extrinsic and intrinsic processes responsible for monitoring, evaluating, and modifying emotional reactions, especially in their intensive and temporal features, to accomplish one's goals.”`,
    category_name: 'Social/Emotional Development',
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
    term: 'Thoughts and/or emotions require intervention or medication?',
    definition: `Y/N`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Attachment related care needed?',
    definition: `Y/N`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Trauma Informed care needed?',
    definition: `Y/N`,
    category_name: 'Social/Emotional Development',
    imageURL: ''
  },
  {
    term: 'Eye Scan/Saccadic Movements',
    definition: `There are four basic types of eye movements, saccadic eye movements and smooth pursuits are organized in the frontal cortex as a guided attentional mechanism.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Inhibition',
    definition: `The frontal cortex is able to mobilize top down stop signals across all the various neural functions, this is called inhibition or inhibitory control.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Working Memory',
    definition: `Holding facts in mind while manipulating information; accessing facts stored in long-term memory.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Verbal Working Memory',
    definition: `Holding verbal information in mind to make use of it for a here and now function.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Spatial Working Memory',
    definition: `Holding spatial information in mind to make use of it for a here and now function.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'General Working Memory',
    definition: `Holding information in mind to make use of it for a here and now function.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Initiation',
    definition: `Start function - often requires increase in action or arousal or activation.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Internalize Language',
    definition: `Luria (1973) and Vygotsky (1986) both proposed the importance of language as a mediating tool used to solve problems and as a control feature for self-regulation of behavior. Luria suggested a model wherein, initially, others in a child’s environment exert behavioral control and regulation over the child’s behaviors.  Over time, with the development of language-symbols, and through interaction with the environment itself, the child begins to apply language to regulate the self, and speech internalizes for the purposes of planning and self-regulation.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Shifting',
    definition: `Requires stop/inhibit of one attentional object and start of the next attentional object.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Global/Local Shifting',
    definition: `The gestalt/detail relationship in perception that leads to conceptualization and knowledge, the brain shifts between the feature/detail and the whole back and forth in forming a complex knowing of the 'what' and 'where' of information.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Flexibility Shifting',
    definition: `The ability to shift within and between information temporally, spatially, and conceptually.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Planning',
    definition: `The neurological processes involved in the formulation, evaluation and selection of a sequence of thoughts and actions to achieve a desired goal.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Sequencing',
    definition: `The steps to solve a problem and set up an action in the moment or for a goal.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Future-Oriented/Goal Directed',
    definition: `Our behavior is typically organized for something that will happen, in the next or extended moment, and this aspect of executive function allows for the organization of  behaviour towards a goal.  Mindfulness, and being in the moment is the penultimate ability to suspend future for the now/present moment.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Problem Solving',
    definition: `Problem solving refers to a state of desire for reaching a definite 'goal' from a present condition that either is not directly moving toward the goal, is far from it, or needs more complex logic for finding a missing description of conditions or steps toward the goal.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Motivational Bias',
    definition: `Internal drive to achieve either a goal, a valence based shift (to achieve comfort, safety or connection), oran experience that matches sense of self or condition.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Effortful Control',
    definition: `The ability to regulate and sustain, shift, enhance or change how much effort one invests into a goal.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Other',
    definition: `The list provided in the SpIRiT is not-comprehensive, so, if a child has an identified executive function component not listed here, this space allows for it to be added individually.`,
    category_name: 'Executive Functioning',
    imageURL: ''
  },
  {
    term: 'Spatial/Temporal Organization',
    definition: `Neural processing that supports either spatial knowing, temporal knowing, or how they work in tandem to help organize the self in relation to environment.\n
    Spatiotemporal adaptation is a process by which the child discovers and absorbs information from the environment and it has a developmental sequence and matures with the alteration or modification of performance. The spatiotemporal adaptation is, therefore, a process of continual interactions among growth, maturation, development and environmental transactions (Gilfoyle, Grady, Moore, 1990).`,
    category_name: 'Executive Functioning',
    imageURL: ''
  }
]

module.exports = terms;