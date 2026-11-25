// Sources : portfolio PDF et dossier de simulation Crazyflie fournis par Martin Mayer.
// Ajouter un projet ici, puis ajouter son aperçu dans index.html pour le mode sans JavaScript.
export const projects = [
  {
    id: 'tensegrity', category: 'robotics', page: 3, layout: 'featured',
    image: 'tensegrity', width: 1169, height: 1167,
    tags: ['Reinforcement learning', 'SAC', 'MuJoCo', 'OptiTrack', 'Kalman filter'],
    gallery: [{ image: 'TensegrityArena', format: 'png', model: true, fr: 'Arène expérimentale : robot tensegrity, structure et dispositif de capture de mouvement.', en: 'Experimental arena: tensegrity robot, frame and motion-capture setup.' }],
    videos: [{
      file: 'tensegrity-rollout', width: 640, height: 640,
      source: 'https://github.com/MartinMayerEPFL/MartinMayerEPFL/blob/main/assets/tensegrity_rollout.gif',
      fr: { title: 'Locomotion en simulation', caption: 'Le robot tensegrity en mouvement dans son environnement de simulation.' },
      en: { title: 'Locomotion in simulation', caption: 'The tensegrity robot moving in its simulation environment.' }
    }],
    fr: {
      category: 'ROBOTIQUE · RECHERCHE', title: 'Tensegrity', subtitle: 'Apprendre à un robot souple à se déplacer.',
      summary: 'De la simulation au robot réel : apprentissage par renforcement pour la locomotion et le suivi de vitesse.',
      imageAlt: 'Martin travaillant sur un robot tensegrity au laboratoire LIS, EPFL', label: 'LIS · EPFL',
      role: 'Recherche en robot learning', context: 'Laboratory of Intelligent Systems · EPFL',
      introduction: 'Comment apprendre à se déplacer à un robot dont la structure est souple ? Au Laboratory of Intelligent Systems de l’EPFL, je développe des politiques d’apprentissage par renforcement pour un robot tensegrity, en simulation MuJoCo et sur le robot réel.',
      details: [
        'Entraînement de politiques SAC discrètes pour la locomotion vers l’avant et le suivi de vitesse.',
        'Développement d’un dispositif sans réinitialisation manuelle pour permettre au robot de poursuivre son apprentissage sur le matériel.',
        'Enrichissement des observations grâce à la capture de mouvement OptiTrack et à un filtre de Kalman.',
        'Comparaison des hyperparamètres SAC pour rechercher la configuration la plus efficace en nombre d’échantillons.'
      ],
      metric: 'Sim → réel', metricLabel: 'Apprentissage en simulation et sur le robot'
    },
    en: {
      category: 'ROBOTICS · RESEARCH', title: 'Tensegrity', subtitle: 'Teaching a soft robot how to move.',
      summary: 'From simulation to hardware: reinforcement learning for locomotion and velocity tracking.',
      imageAlt: 'Martin working on a tensegrity robot at EPFL’s Laboratory of Intelligent Systems', label: 'LIS · EPFL',
      role: 'Robot learning research', context: 'Laboratory of Intelligent Systems · EPFL',
      introduction: 'How do you teach a robot with a compliant structure to move? At EPFL’s Laboratory of Intelligent Systems, I develop reinforcement learning policies for a tensegrity robot, in MuJoCo simulation and on real hardware.',
      details: [
        'Trained discrete SAC policies for forward locomotion and velocity tracking.',
        'Building a reset-free setup so the robot can keep learning on hardware without manual resets.',
        'Enriching observations with OptiTrack motion capture and a Kalman filter.',
        'Benchmarking SAC hyperparameters to identify the most sample-efficient configuration.'
      ],
      metric: 'Sim to real', metricLabel: 'Learning in simulation and on hardware'
    }
  },
  {
    id: 'haptic', category: 'robotics', page: 4, image: 'haptic', width: 520, height: 640,
    tags: ['PD impedance', 'UART', 'Haptics', 'Gravity compensation'],
    url: 'https://github.com/MartinMayerEPFL/Haptic_Teleoperation', linkType: 'code',
    videos: [{
      file: 'haptic-teleoperation', width: 640, height: 640,
      source: 'https://github.com/MartinMayerEPFL/MartinMayerEPFL/blob/main/assets/haptic_paddles_github.gif',
      fr: { title: 'Le toucher à distance', caption: 'Démonstration de la téléopération bilatérale avec les deux interfaces haptiques.' },
      en: { title: 'A shared sense of touch', caption: 'Bilateral teleoperation demonstrated with the two haptic paddles.' }
    }],
    fr: {
      category: 'CONTRÔLE & INTERACTION', title: 'Téléopération haptique', subtitle: 'Deux interfaces, un même sens du toucher.',
      summary: 'Une liaison bilatérale pour ressentir à distance les mouvements d’un autre opérateur.',
      imageAlt: 'Deux interfaces haptiques reliées pour la téléopération bilatérale', label: '10,2 ms · latence',
      role: 'Développement & contrôle', context: 'Téléopération bilatérale',
      introduction: 'Deux interfaces haptiques, une sensation de toucher partagée. J’ai développé une liaison de téléopération bilatérale par UART : les deux opérateurs peuvent ressentir les mouvements de l’autre à travers les interfaces.',
      details: [
        'Implémentation d’un contrôle d’impédance PD pour coupler les deux interfaces.',
        'Compensation de la gravité et des frottements dans la commande.',
        'Obtention d’une latence de position de 10,2 ms.'
      ],
      metric: '10,2 ms', metricLabel: 'Latence de position'
    },
    en: {
      category: 'CONTROL & INTERACTION', title: 'Haptic teleoperation', subtitle: 'Two interfaces. One shared sense of touch.',
      summary: 'A bilateral link that lets two operators feel each other’s movements.',
      imageAlt: 'Two haptic paddles connected for bilateral teleoperation', label: '10.2 ms · latency',
      role: 'Development & control', context: 'Bilateral teleoperation',
      introduction: 'Two haptic paddles, one shared sense of touch. I built a bilateral teleoperation link over UART, allowing two operators to feel each other’s movements through the interfaces.',
      details: [
        'Implemented PD impedance control to couple the two interfaces.',
        'Integrated gravity and friction compensation into the controller.',
        'Achieved a position latency of 10.2 ms.'
      ],
      metric: '10.2 ms', metricLabel: 'Position latency'
    }
  },
  {
    id: 'quadruped', category: 'robotics', page: 5, image: 'quadruped', width: 1344, height: 1004,
    tags: ['Python', 'PyBullet', 'PPO / SAC', 'Optuna', 'Hopf oscillators'],
    url: 'https://github.com/MartinMayerEPFL/Legged_Robot_Project2', linkType: 'code',
    videos: [
      {
        file: 'quadruped-walk', width: 960, height: 720,
        source: 'https://github.com/MartinMayerEPFL/Legged_Robot_Project2/blob/main/x_video/WlakingGait.mov',
        fr: { title: 'Allure de marche', caption: 'Locomotion du quadrupède en simulation PyBullet : une allure de marche.' },
        en: { title: 'Walking gait', caption: 'Quadruped locomotion in PyBullet simulation: a walking gait.' }
      },
      {
        file: 'quadruped-trot', width: 960, height: 720,
        source: 'https://github.com/MartinMayerEPFL/Legged_Robot_Project2/blob/main/x_video/TrottingGait.mov',
        fr: { title: 'Allure de trot', caption: 'Locomotion du quadrupède en simulation PyBullet : une allure de trot.' },
        en: { title: 'Trotting gait', caption: 'Quadruped locomotion in PyBullet simulation: a trotting gait.' }
      }
    ],
    fr: {
      category: 'LOCOMOTION & SIMULATION', title: 'Locomotion quadrupède', subtitle: 'Marcher, trotter, apprendre à sauter.',
      summary: 'Des oscillateurs couplés aux politiques de deep RL pour explorer la locomotion.',
      imageAlt: 'Robot quadrupède dans un environnement de simulation PyBullet', label: 'EPFL · Legged Robotics',
      role: 'Algorithmes de locomotion', context: 'EPFL · Cours de Legged Robotics',
      introduction: 'Sur un quadrupède simulé, j’ai exploré plusieurs approches complémentaires : générateurs de rythmes pour la marche et le trot, optimisation des sauts, puis apprentissage par renforcement profond.',
      details: [
        'Implémentation d’oscillateurs de Hopf couplés, convertis en trajectoires des pieds pour la marche et le trot.',
        'Optimisation des profils de force pour le saut avec Optuna.',
        'Entraînement de politiques de locomotion avec SAC et PPO.',
        'Développement en Python dans un environnement PyBullet ; code et vidéos disponibles sur GitHub.'
      ],
      metric: 'PPO / SAC', metricLabel: 'Politiques de locomotion apprises'
    },
    en: {
      category: 'LOCOMOTION & SIMULATION', title: 'Quadruped locomotion', subtitle: 'Walking, trotting, learning to jump.',
      summary: 'From coupled oscillators to deep RL policies: exploring how a robot learns to move.',
      imageAlt: 'Simulated quadruped in a PyBullet environment', label: 'EPFL · Legged Robotics',
      role: 'Locomotion algorithms', context: 'EPFL · Legged Robotics course',
      introduction: 'On a simulated quadruped, I explored complementary approaches: rhythm generators for walking and trotting, jump optimisation, and deep reinforcement learning.',
      details: [
        'Implemented coupled Hopf oscillators mapped to foot trajectories for walking and trotting.',
        'Optimised jumping force profiles with Optuna.',
        'Trained locomotion policies with SAC and PPO.',
        'Developed in Python and PyBullet; code and videos are available on GitHub.'
      ],
      metric: 'PPO / SAC', metricLabel: 'Learned locomotion policies'
    }
  },
  {
    id: 'sisyphus', category: 'robotics', page: 6, image: 'sisyphus', width: 1453, height: 1092,
    tags: ['Navigation', 'Manipulation', 'Visual perception', 'System integration'],
    fr: {
      category: 'ROBOTIQUE MOBILE · PROJET D’ÉQUIPE', title: 'Sisyphus', subtitle: 'Trois jours pour donner vie à un robot.',
      summary: 'Un manipulateur mobile développé au Leukerbad Robotics Hackathon 2026.',
      imageAlt: 'Rendu CAO de Sisyphus, robot mobile avec un bras manipulateur et un bac de transport', label: '1er prix · Hackathon 2026',
      role: 'Projet d’équipe', context: 'Leukerbad Robotics Hackathon · 2026',
      introduction: 'Sisyphus est un manipulateur mobile conçu pour la prise en charge et la livraison autonomes d’objets dans un environnement industriel intérieur. Notre équipe l’a développé en trois jours au Leukerbad Robotics Hackathon 2026.',
      details: [
        'Assemblage de la plateforme robotique et développement de sa pile logicielle en équipe.',
        'Intégration de la manipulation, de la navigation et de la perception visuelle.',
        'Premier prix du hackathon, réunissant 150 participants venus de toute l’Europe.'
      ],
      metric: '1er prix', metricLabel: '150 participants · 3 jours'
    },
    en: {
      category: 'MOBILE ROBOTICS · TEAM PROJECT', title: 'Sisyphus', subtitle: 'Three days to bring a robot to life.',
      summary: 'A mobile manipulator built at the Leukerbad Robotics Hackathon 2026.',
      imageAlt: 'CAD rendering of Sisyphus, a mobile robot with a manipulator arm and delivery container', label: '1st place · Hackathon 2026',
      role: 'Team project', context: 'Leukerbad Robotics Hackathon · 2026',
      introduction: 'Sisyphus is a mobile manipulator for autonomous item handling and delivery in indoor industrial settings. Our team developed it in three days at the Leukerbad Robotics Hackathon 2026.',
      details: [
        'Assembled the robot platform and built its software stack as a team.',
        'Combined manipulation, navigation and visual perception.',
        'Won first place at a hackathon bringing together 150 participants from across Europe.'
      ],
      metric: '1st place', metricLabel: '150 participants · 3 days'
    }
  },
  {
    id: 'sola', category: 'aerospace', page: 7, image: 'sola-aircraft', width: 640, height: 566,
    url: 'https://projetsola.com/', linkType: 'website',
    tags: ['UAV', 'Composites', 'Systems engineering', 'CNC', 'Leadership'],
    gallery: [
      { image: 'sola-prototype', fr: 'Intégration du prototype et de sa structure.', en: 'Prototype and airframe integration.' },
      { image: 'sola-workshop', fr: 'Usinage CNC d’un moule pour les pièces composites.', en: 'CNC machining a mould for composite parts.' },
      { image: 'sola-composite', fr: 'Fabrication et assemblage des éléments composites.', en: 'Manufacturing and assembly of composite components.' }
    ],
    fr: {
      category: 'AÉROSPATIAL & INGÉNIERIE SYSTÈME', title: 'SOLA', subtitle: 'L’énergie du soleil. L’ambition de voler loin.',
      summary: 'Un avion solaire autonome de 3 mètres d’envergure, conçu avec une équipe de huit étudiants.',
      imageAlt: 'SOLA, avion solaire autonome de trois mètres d’envergure', label: '2020–2026 · Fondateur & responsable',
      role: 'Fondateur & responsable de projet', context: '2020–2026 · Équipe de 8 étudiants',
      introduction: 'J’ai fondé SOLA et dirigé une équipe de huit étudiants pour concevoir un avion solaire autonome de trois mètres d’envergure. Le projet visait une endurance supérieure à huit heures de vol.',
      details: [
        'Définition des interfaces entre les sous-systèmes mécaniques, électroniques et de contrôle.',
        'Gestion du calendrier, du budget et des risques du projet.',
        'Fabrication de prototypes composites, usinés CNC et imprimés en 3D.',
        'Intégration des différentes disciplines autour d’un même objectif : un aéronef solaire autonome.'
      ],
      metric: '3 m', metricLabel: 'Envergure · objectif d’endurance : plus de 8 h'
    },
    en: {
      category: 'AEROSPACE & SYSTEMS ENGINEERING', title: 'SOLA', subtitle: 'Powered by the sun. Built to go further.',
      summary: 'A three-metre autonomous solar aircraft, developed with a team of eight students.',
      imageAlt: 'SOLA autonomous solar aircraft with a three-metre wingspan', label: '2020–2026 · Founder & Lead',
      role: 'Founder & project lead', context: '2020–2026 · Team of 8 students',
      introduction: 'I founded SOLA and led an eight-student team building a three-metre-wingspan autonomous solar aircraft. The design targeted more than eight hours of flight endurance.',
      details: [
        'Defined the interfaces between mechanical, electronic and control subsystems.',
        'Managed the project schedule, budget and risks.',
        'Built composite, CNC-machined and 3D-printed prototypes.',
        'Brought different disciplines together around a shared goal: an autonomous solar aircraft.'
      ],
      metric: '3 m', metricLabel: 'Wingspan · endurance target: more than 8 h'
    }
  },
  {
    id: 'aerial-robotics', category: 'aerospace', categories: ['robotics', 'aerospace'], layout: 'featured',
    image: 'aerial-robotics', width: 1920, height: 1080,
    tags: ['Webots', 'Computer vision', 'Cascaded PID', 'Trajectory planning', 'Python'],
    document: {
      href: 'assets/documents/aerial-robotics-analysis.pdf',
      fr: 'Analyse des trajectoires (PDF)', en: 'Trajectory analysis (PDF)'
    },
    videosLayout: 'stacked', mediaOrder: 'video-first',
    videos: [
      {
        file: 'aerial-robotics-course', width: 1600, height: 900,
        fr: { title: 'Deux tours de course autonome', caption: 'Transition vers le circuit mémorisé, puis deux tours chronométrés à 8,74 s et 8,82 s. Enregistrement Webots de 20,6 s, à vitesse de simulation réelle, avec retour caméra embarquée.' },
        en: { title: 'Two autonomous racing laps', caption: 'Transition to the memorised circuit, followed by two laps timed at 8.74 s and 8.82 s. A 20.6 s Webots recording at real simulation speed, with the onboard camera view.' }
      },
      {
        file: 'aerial-robotics-reconnaissance', width: 1600, height: 900,
        fr: { title: 'Reconnaissance visuelle du circuit', caption: 'Décollage, recherche des cinq portes, estimation de leur position et mémorisation du circuit. Les 65,6 s de reconnaissance sont conservées à vitesse de simulation réelle.' },
        en: { title: 'Visual reconnaissance of the circuit', caption: 'Take-off, detection of five gates, position estimation and circuit memorisation. The full 65.6 s reconnaissance recording is shown at real simulation speed.' }
      }
    ],
    gallery: [
      { image: 'aerial-trajectory-overview', format: 'svg', plot: true, fr: 'Reconnaissance et course : les courbes continues représentent les positions mesurées dans Webots ; les pointillés, la trajectoire planifiée ; les croix, les centres estimés par vision.', en: 'Reconnaissance and racing: solid lines show positions measured in Webots, dashed lines show the planned trajectory, and crosses mark visually estimated gate centres.' },
      { image: 'aerial-flight-profile', format: 'svg', plot: true, fr: 'Altitude et vitesse mesurées pendant cet enregistrement de la configuration stable, avec séparation des phases de reconnaissance et de course.', en: 'Altitude and speed measured in this recording of the stable configuration, separating the reconnaissance and racing phases.' }
    ],
    fr: {
      category: 'ROBOTIQUE AÉRIENNE & AUTONOMIE', title: 'Aerial Robotics', subtitle: 'Percevoir, mémoriser, voler en autonomie.',
      summary: 'Un Crazyflie simulé reconnaît cinq portes avec sa caméra, mémorise le circuit, puis enchaîne deux tours de course autonome.',
      imageAlt: 'Arène Webots du Crazyflie avec cinq portes et retour de la caméra embarquée', label: 'MICRO-502 · Simulation Webots',
      role: 'Projet de cours · vol autonome', context: 'MICRO-502 · EPFL',
      introduction: 'Ce projet de robotique aérienne associe perception, estimation, planification et commande dans Webots. Un Crazyflie repère les portes avec une caméra monoculaire, estime leur position à partir de leur hauteur connue et de l’état simulé du drone, puis mémorise le circuit pour passer de la reconnaissance à la course autonome.',
      details: [
        'Détection des portes magenta par segmentation HSV et filtrage morphologique, avec une machine à états pour la recherche, l’alignement, l’approche et la traversée.',
        'Estimation monoculaire de la position des portes et agrégation de douze observations pour mémoriser leurs centres et leurs orientations.',
        'Génération d’une trajectoire polynomiale de degré cinq, avec des points avant, au centre et après chaque porte.',
        'Suivi par commande PID en cascade, de la position aux moteurs, et comparaison des trajectoires mesurées et planifiées.'
      ],
      resultNote: 'Sur cet enregistrement Webots (seed 0), le tracker valide 15 franchissements : cinq portes pendant la reconnaissance, puis deux tours de course. Les deux tours sont chronométrés à 8,74 s et 8,82 s.',
      galleryTitle: 'Trajectoires & comportement en vol',
      metric: '15 / 15', metricLabel: 'Franchissements validés dans cette simulation'
    },
    en: {
      category: 'AERIAL ROBOTICS & AUTONOMY', title: 'Aerial Robotics', subtitle: 'Perceive, memorise, fly autonomously.',
      summary: 'A simulated Crazyflie detects five gates with its camera, memorises the circuit and completes two autonomous racing laps.',
      imageAlt: 'Crazyflie Webots arena with five gates and the onboard camera view', label: 'MICRO-502 · Webots simulation',
      role: 'Course project · autonomous flight', context: 'MICRO-502 · EPFL',
      introduction: 'This aerial robotics project combines perception, estimation, planning and control in Webots. A Crazyflie detects gates with a monocular camera, estimates their positions from their known height and the drone’s simulated state, then memorises the circuit to transition from reconnaissance to autonomous racing.',
      details: [
        'Detected magenta gates with HSV segmentation and morphological filtering, using a state machine for search, alignment, approach and traversal.',
        'Estimated gate positions through monocular geometry, aggregating twelve observations to memorise their centres and orientations.',
        'Generated a fifth-degree polynomial trajectory with waypoints before, at and after each gate.',
        'Tracked the trajectory using cascaded PID control from position to motor commands, comparing measured and planned paths.'
      ],
      resultNote: 'In this Webots recording (environment seed 0), the tracker validates 15 gate crossings: five during reconnaissance and five on each of two racing laps. The two racing laps are timed at 8.74 s and 8.82 s.',
      galleryTitle: 'Trajectories & flight behaviour',
      metric: '15 / 15', metricLabel: 'Gate crossings validated in this simulation'
    }
  },
  {
    id: 'squidframe', category: 'software', page: 8, layout: 'wide', image: null,
    tags: ['LLM', 'Benchmarking', 'Recursive planning', 'Product engineering'],
    url: 'https://squidframe.app/', linkType: 'website',
    fr: {
      category: 'LOGICIEL & INTELLIGENCE ARTIFICIELLE', title: 'SquidFrame', subtitle: 'Planifier. Évaluer. Améliorer.',
      summary: 'Des moteurs de planification récursive et une boucle d’évaluation pour améliorer la qualité des plans.',
      role: 'Fondateur & Product Engineer', context: '2025 — aujourd’hui',
      introduction: 'J’ai développé des moteurs de planification récursive pour un outil visuel collaboratif. Pour améliorer leur qualité, j’ai construit un banc de test qui exécute les classes du moteur, mesure leurs performances et confie l’évaluation des plans à un LLM distinct.',
      details: [
        'Développement de moteurs capables de décomposer des tâches en plans récursifs.',
        'Mesure du temps d’exécution, de la consommation de tokens et de la structure des arbres produits.',
        'Évaluation par un LLM de la faisabilité des actions, de la couverture et de la cohérence des plans.',
        'Boucle d’amélioration semi-supervisée : analyse, plan d’amélioration, mise à jour du code et nouveau test.'
      ],
      metric: 'Build · test', metricLabel: 'Une boucle d’amélioration continue'
    },
    en: {
      category: 'SOFTWARE & ARTIFICIAL INTELLIGENCE', title: 'SquidFrame', subtitle: 'Plan. Evaluate. Improve.',
      summary: 'Recursive planning engines and an evaluation loop to improve the quality of generated plans.',
      role: 'Founder & product engineer', context: '2025 — present',
      introduction: 'I built recursive task-planning engines for a collaborative visual tool. To improve their quality, I developed a benchmark harness that runs the product’s engine classes, measures performance and uses a separate LLM to evaluate the generated plans.',
      details: [
        'Developed engines that decompose tasks into recursive plans.',
        'Measured runtime, token usage and the structure of the generated trees.',
        'Used a separate LLM to assess actionability, coverage and coherence.',
        'Created a semi-supervised improvement loop: analysis, improvement plan, code update and retest.'
      ],
      metric: 'Build · test', metricLabel: 'A continuous improvement loop'
    }
  }
];

export const translations = {
  fr: {
    skip: 'Aller au contenu', navProjects: 'Projets', navAbout: 'À propos', navContact: 'Contact',
    openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', navigation: 'Navigation principale', language: 'Langue du site',
    heroEyebrow: 'ROBOTIQUE & SYSTÈMES AUTONOMES', heroDescription: 'Apprendre aux robots.<br>Donner vie aux idées.',
    heroNote: 'MSc Robotics à l’EPFL. J’explore le lien entre<br class="desktop-break"> intelligence, contrôle et monde physique.',
    explore: 'Explorer les projets', meetMe: 'Faire connaissance', location: 'Lausanne, Suisse', scroll: 'La suite se découvre en défilant',
    projectsEyebrow: 'UNE SÉLECTION DE PROJETS · 2020–2026', projectsTitle: 'Du code.<br>Du concret<span class="accent">.</span>',
    projectsIntro: 'De l’apprentissage par renforcement au vol solaire, chaque projet est une façon de comprendre, de construire et d’aller plus loin.',
    filterLabel: 'Filtrer les projets', filterAll: 'Tous les projets', filterRobotics: 'Robotique', filterAerospace: 'Aérospatial', filterSoftware: 'Logiciel & IA', projectsHint: 'Une idée, un prototype, une histoire.',
    aboutEyebrow: 'UN PEU PLUS SUR MOI', aboutTitle: 'La curiosité<br>comme moteur<span class="accent">.</span>',
    aboutLead: 'Comprendre un système. Imaginer ce qu’il pourrait faire. Puis le construire.',
    aboutText: 'En dernière année de MSc Robotics à l’EPFL, je travaille sur l’apprentissage par renforcement et le contrôle de robots physiques. J’aime faire dialoguer les algorithmes, l’électronique et la mécanique pour passer d’une idée à un système qui fonctionne.',
    aboutOutside: 'En dehors du laboratoire, vous me trouverez en randonnée, sur une voie d’escalade, ou plongé dans la philosophie et les arts.',
    aboutLanguages: 'Français & anglais', practice: 'DE L’ALGORITHME AU PROTOTYPE', skillCode: 'Code & apprentissage', skillRobotics: 'Robotique & contrôle', skillBuild: 'Conception & fabrication', skillControl: 'Contrôle & estimation d’état', skillRL: 'Apprentissage par renforcement', skillEmbedded: 'Systèmes embarqués', skillPrototyping: 'Prototypage & composites',
    educationEyebrow: 'PARCOURS & FORMATION', educationTitle: 'Des fondations<br>pour explorer<span class="accent">.</span>',
    educationIntro: 'De la microtechnique à la robotique, avec une même envie de relier les disciplines.',
    educationMsc: 'Spécialisation en robotique', mscDates: '2025 — aujourd’hui', educationBsc: 'BSc Microtechnique', educationBscNote: 'Fondations en ingénierie & systèmes', educationEsa: 'Formation à la durabilité spatiale · Belgique',
    contactEmail: 'M’écrire par e-mail', contactEyebrow: 'UNE IDÉE, UN PROJET, UNE RENCONTRE ?', contactTitle: 'Construisons<br>la suite.', contactDescription: 'Robotique, recherche ou nouvelle aventure.<br>Tout commence par une conversation.',
    downloadPdf: 'Télécharger le portfolio', contactSignoff: 'Toujours curieux. Toujours en mouvement.', backTop: 'Retour en haut',
    close: 'Fermer', closeProject: 'Fermer le projet', discover: 'Découvrir le projet', role: 'Contribution', context: 'Contexte', technologies: 'Technologies', contributions: 'Le travail réalisé', codeLink: 'Voir le code sur GitHub', websiteLink: 'Visiter', sourcePdf: 'Voir dans le PDF', nextProject: 'Projet suivant',
    demonstrations: 'Le projet en mouvement', videoSource: 'Source GitHub', videoFallback: 'Ouvrir la vidéo', videoDownload: 'Télécharger la vidéo', viewFigure: 'Agrandir la figure',
    engineCaption: 'BOUCLE D’AMÉLIORATION DU MOTEUR', engineTest: 'Cas de test théoriques', engineData: 'Données utilisateur', engineBenchmark: 'Benchmark', engineEvaluator: 'LLM évaluateur', engineCore: 'Moteur SquidFrame', engineReport: 'Rapport d’évaluation', engineAgent: 'LLM agentique', engineResults: 'Résultats', engineAnalysis: 'Analyse', enginePlan: 'Plan d’amélioration', engineUpdate: 'Mise à jour du code', engineRetest: 'Retest',
    engineDescription: 'Les cas de test théoriques et les données utilisateur alimentent le benchmark, qui exécute le moteur SquidFrame. Les résultats passent au LLM évaluateur, puis au rapport d’évaluation. Le rapport guide un LLM agentique qui met à jour le code du moteur. Le moteur modifié est de nouveau testé dans le benchmark.',
    projectsVisible: count => `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`,
    languageChanged: 'Le site est maintenant en français.',
    description: 'Portfolio de Martin Mayer, étudiant en MSc Robotics à l’EPFL. Robot learning, contrôle, systèmes autonomes et prototypes : sept projets du code au monde physique.'
  },
  en: {
    skip: 'Skip to content', navProjects: 'Projects', navAbout: 'About', navContact: 'Contact',
    openMenu: 'Open menu', closeMenu: 'Close menu', navigation: 'Main navigation', language: 'Website language',
    heroEyebrow: 'ROBOTICS & AUTONOMOUS SYSTEMS', heroDescription: 'Teaching robots.<br>Bringing ideas to life.',
    heroNote: 'MSc Robotics at EPFL. Exploring the connection<br class="desktop-break"> between intelligence, control and the physical world.',
    explore: 'Explore the projects', meetMe: 'A little about me', location: 'Lausanne, Switzerland', scroll: 'There’s more to discover below',
    projectsEyebrow: 'SELECTED PROJECTS · 2020–2026', projectsTitle: 'From code.<br>To the real world<span class="accent">.</span>',
    projectsIntro: 'From reinforcement learning to solar flight, every project is a way to understand, build and explore what comes next.',
    filterLabel: 'Filter projects', filterAll: 'All projects', filterRobotics: 'Robotics', filterAerospace: 'Aerospace', filterSoftware: 'Software & AI', projectsHint: 'An idea, a prototype, a story.',
    aboutEyebrow: 'A LITTLE ABOUT ME', aboutTitle: 'Driven<br>by curiosity<span class="accent">.</span>',
    aboutLead: 'Understand a system. Imagine what it could do. Then build it.',
    aboutText: 'I’m a final-year MSc Robotics student at EPFL, working on reinforcement learning and control for physical robots. I enjoy bringing algorithms, electronics and mechanics together to turn an idea into a working system.',
    aboutOutside: 'Outside the lab, you’ll find me hiking, on a climbing route, or exploring philosophy and the arts.',
    aboutLanguages: 'French & English', practice: 'FROM ALGORITHM TO PROTOTYPE', skillCode: 'Code & learning', skillRobotics: 'Robotics & control', skillBuild: 'Design & manufacturing', skillControl: 'Control & state estimation', skillRL: 'Reinforcement learning', skillEmbedded: 'Embedded systems', skillPrototyping: 'Prototyping & composites',
    educationEyebrow: 'EDUCATION & BACKGROUND', educationTitle: 'Foundations<br>for exploration<span class="accent">.</span>',
    educationIntro: 'From microengineering to robotics, with the same drive to connect disciplines.',
    educationMsc: 'Robotics specialisation', mscDates: '2025 — present', educationBsc: 'BSc Microengineering', educationBscNote: 'Foundations in engineering & systems', educationEsa: 'Space sustainability training · Belgium',
    contactEmail: 'Send me an email', contactEyebrow: 'AN IDEA, A PROJECT, A CONVERSATION?', contactTitle: 'Let’s build<br>what’s next.', contactDescription: 'Robotics, research or a new adventure.<br>It all starts with a conversation.',
    downloadPdf: 'Download the portfolio', contactSignoff: 'Always curious. Always moving.', backTop: 'Back to top',
    close: 'Close', closeProject: 'Close project', discover: 'Explore the project', role: 'Contribution', context: 'Context', technologies: 'Technologies', contributions: 'The work behind it', codeLink: 'View code on GitHub', websiteLink: 'Visit', sourcePdf: 'View in the PDF', nextProject: 'Next project',
    demonstrations: 'The project in motion', videoSource: 'GitHub source', videoFallback: 'Open the video', videoDownload: 'Download video', viewFigure: 'Enlarge figure',
    engineCaption: 'ENGINE IMPROVEMENT LOOP', engineTest: 'Theoretical test cases', engineData: 'User data', engineBenchmark: 'Benchmark', engineEvaluator: 'LLM evaluator', engineCore: 'SquidFrame engine', engineReport: 'Evaluation report', engineAgent: 'Agentic LLM', engineResults: 'Results', engineAnalysis: 'Analysis', enginePlan: 'Improvement plan', engineUpdate: 'Code update', engineRetest: 'Retest',
    engineDescription: 'Theoretical test cases and user data feed a benchmark that runs the SquidFrame engine. Results go to an LLM evaluator, then into an evaluation report. The report guides a separate agentic LLM that updates the engine code. The updated engine is retested in the benchmark.',
    projectsVisible: count => `${count} project${count === 1 ? '' : 's'} shown.`,
    languageChanged: 'The website is now in English.',
    description: 'Portfolio of Martin Mayer, MSc Robotics student at EPFL. Robot learning, control, autonomous systems and prototypes: seven projects from code to the physical world.'
  }
};
