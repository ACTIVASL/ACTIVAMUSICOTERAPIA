import { Patient } from './types';

export const INITIAL_PATIENTS: Patient[] = [
  // --- CASO 1: NEURODIVERSIDAD & COMUNICACIÓN (Lucas) ---
  {
    id: 'demo-1',
    status: 'active',
    name: 'Lucas Mateo',
    age: 8,
    diagnosis: 'TEA Grado 1 - Desafío en Comunicación Social',
    pathologyType: 'neurodiversidad',
    photo: '/assets/demo/boy.png',
    contact: 'Madre (Laura): 600 111 222 - Preferencia: WhatsApp',
    joinedDate: '2024-02-01',
    sessionsCompleted: 12,
    sessions: [
      {
        id: 101,
        date: '2024-05-02',
        type: 'individual',
        price: 45,
        paid: true,
        billable: true,
        isAbsent: false,
        notes:
          'Sesión de Vínculo: Lucas inicia tocando el piano en el registro grave (cluster). Muestro "Espejo Musical" replicando su intensidad. Logramos 4 segundos de contacto visual sostenido al final de la frase musical.',
        activities: ['Improvisación Clínica (Técnica de Espejo)', 'Holding Sonoro (Voz)'],
        scores: [3, 2, 2, 2, 2], // Inicial: Baja interacción
      },
      {
        id: 102,
        date: '2024-05-09',
        type: 'individual',
        price: 45,
        paid: true,
        billable: true,
        isAbsent: false,
        notes:
          'Avance: Acepta el intercambio de turnos (Turn-taking) en el xilófono. Sonríe ante la cadencia V-I. La música actúa como "pegamento social".',
        activities: ['Diálogos Rítmicos (Pregunta-Respuesta)', 'Canción de Bienvenida'],
        scores: [3, 4, 3, 3, 3], // Mejora en Comunicación
      },
      {
        id: 103,
        date: '2024-05-16',
        type: 'individual',
        price: 45,
        paid: true,
        billable: true,
        isAbsent: false,
        notes:
          'Hito Clínico: Lucas completa la frase cantada "Hay un amigo en..." con "Mí". Primer uso comunicativo de voz cantada en contexto.',
        activities: [
          'Songwriting (Completar Frases)',
          'Improvisación Referencial (Nordoff-Robbins)',
        ],
        scores: [4, 5, 4, 4, 4], // Pico de desempeño
      },
    ],
    clinicalFormulation: {
      synthesis:
        'Niño de 8 años con TEA. Muestra "Oído Absoluto" latente. La estructura musical reduce su ansiedad y permite la apertura social.',
      hypothesis:
        'El uso de improvisación clínica (Nordoff-Robbins) facilita la emergencia del "Niño Musical", puenteando las defensas autistas.',
      preserved: {
        selected: ['Oído Musical', 'Memoria Melódica', 'Motricidad Fina'],
        text: 'Capacidad extraordinaria para replicar estructuras armónicas complejas.',
      },
      difficulties: {
        selected: ['Hipersensibilidad', 'Contacto Visual', 'Flexibilidad Cognitiva'],
        text: 'Rigidez ante cambios de tonalidad bruscos.',
      },
      regulators: {
        selected: ['Piano Grave', 'Estructura ABA', 'Compás Binario'],
        text: 'El registro grave le enraíza (Grounding).',
      },
    },
    initialGoals:
      '1. Establecer atención conjunta > 10s. 2. Fomentar la intención comunicativa a través del completar frases musicales.',
    safetyProfile: {
      epilepsy: false,
      dysphagia: false,
      flightRisk: false,
      hyperacusis: true,
      mobilityAid: 'none',
      alerts: [
        'ISO: Evitar frecuencias agudas (>2000Hz) sin aviso previo.',
        'Anticipar el final de la sesión con 5 min de antelación.',
      ],
      allergies: '',
      psychomotorAgitation: false,
      chokingHazard: false,
      disruptiveBehavior: false,
    },
    musicalIdentity: {
      likes: ['Bandas Sonoras (Disney)', 'Piano Clásico (Minimalismo)'],
      dislikes: ['Gritos', 'Platos de batería', 'Caos sonoro'],
      biographicalSongs: ['Toy Story - Hay un amigo en mí', 'Himno de la Alegría'],
      instrumentsOfInterest: ['Piano de Cola', 'Xilófono Bajo', 'Ocean Drum'],
      musicalTraining: false,
      sensitivityLevel: 'high',
    },
    socialContext: {
      livingSituation: 'Vive con padres y hermana mayor.',
      caregiverNetwork: 'Madre participa activamente. Colegio con apoyos.',
      recentLifeEvents: ['Cambio de tutora escolar genera ansiedad.'],
    },
    reference: 'NR-KID-01',
    musicStyles: 'Disney, Einaudi, Mozart.',
    dislikedSounds: 'Sonidos metálicos estridentes.',
  },
  {
    id: 'demo-2',
    status: 'active',
    name: 'Sofia Valderrama',
    age: 7,
    diagnosis: 'Síndrome de Down',
    pathologyType: 'neurodiversidad',
    photo: '/assets/demo/girl.png',
    contact: 'Padre: 600 333 444',
    joinedDate: '2024-01-20',
    sessionsCompleted: 6,
    sessions: [
      {
        id: 201,
        date: '2024-05-12',
        type: 'group',
        price: 25,
        paid: true,
        billable: true,
        isAbsent: false,
        notes: 'Líder natural del grupo hoy.',
        activities: ['Baile', 'Dinámicas grupales'],
        location: 'Sala Infantil',
      },
    ],
    clinicalFormulation: {
      synthesis: 'Alta sociabilidad y motivación por el baile.',
      hypothesis: 'El movimiento rítmico mejora su hipotonía leve.',
      preserved: { selected: ['Ritmo Corporal', 'Empatía'], text: 'Siempre saluda a todos.' },
      difficulties: {
        selected: ['Dicción', 'Atención Sostenida'],
        text: 'Se distrae con estímulos visuales.',
      },
      regulators: { selected: ['Canciones con Gestos'], text: '' },
    },
    initialGoals: 'Mejorar articulación y secuenciación motora.',
    safetyProfile: {
      epilepsy: false,
      dysphagia: false,
      flightRisk: false,
      hyperacusis: false,
      mobilityAid: 'none',
      alerts: [],
      allergies: 'Frutos Secos',
      psychomotorAgitation: false,
      chokingHazard: false,
      disruptiveBehavior: false,
    },
    musicalIdentity: {
      likes: ['Pop Actual', 'Canciones de Gestos'],
      dislikes: ['Música lenta'],
      biographicalSongs: ['Baby Shark', 'Despacito'],
      instrumentsOfInterest: ['Maracas', 'Pandereta'],
      musicalTraining: false,
      sensitivityLevel: 'low',
    },
    socialContext: {
      livingSituation: 'Familia numerosa.',
      caregiverNetwork: 'Acude extraescolares.',
      recentLifeEvents: [],
    },
    reference: 'REF-KID-02',
    musicStyles: 'Pop, Baile.',
    dislikedSounds: '',
  },

  // --- CASO 2: DEMENCIA & IDENTIDAD (Carmen) ---
  {
    id: 'demo-3',
    status: 'active',
    name: 'Carmen De la Fuente',
    age: 74,
    diagnosis: 'Alzheimer Fase LEVE/MODERADA (GDS 4)',
    pathologyType: 'dementia',
    photo: '/assets/demo/grandma1.png',
    contact: 'Hija (Ana): 600 555 666 - Urgencias: Yerno',
    joinedDate: '2023-11-15',
    sessionsCompleted: 15,
    sessions: [
      {
        id: 301,
        date: '2024-04-10',
        type: 'individual',
        price: 40,
        paid: true,
        billable: true,
        isAbsent: false,
        notes:
          'Ingresa desorientada en tiempo ("¿Dónde está mi madre?"). Iniciamos ISO con tarareo suave. Al cantar "Dos Gardenias", conecta con su identidad de esposa. Llora de emoción (Catarsis positiva).',
        activities: ['Validación Emocional', 'Reminiscencia Musical Focalizada'],
        scores: [2, 4, 3, 5, 3], // Memoria baja, Emoción Alta
      },
      {
        id: 302,
        date: '2024-04-17',
        type: 'individual',
        price: 40,
        paid: true,
        billable: true,
        isAbsent: false,
        notes:
          'Gran lucidez hoy. Pudo tocar la escala de Do Mayor en el piano (Memoria Procedimental intacta). Relató anécdota de su boda con gran detalle tras escuchar el vals.',
        activities: ['Re-activación Procedimental (Piano)', 'Asociación Libre (Música-Palabra)'],
        scores: [3, 5, 4, 5, 4], // Pico cognitivo
      },
    ],
    clinicalFormulation: {
      synthesis:
        'Antigua profesora de piano. El deterioro cognitivo (GDS 4) afecta su memoria reciente pero su "Memoria Musical" es una fortaleza inexpugnable.',
      hypothesis:
        'La música actúa como "tecnología de acceso" a su biografía, reduciendo la ansiedad por desorientación.',
      preserved: {
        selected: ['Lectura Musical', 'Memoria Procedimental', 'Sensibilidad Estética'],
        text: 'Capaz de tocar partituras simples a primera vista (Satie).',
      },
      difficulties: {
        selected: ['Memoria Reciente', 'Anomia', 'Desorientación Espacial'],
        text: '"Loop" repetitivo de preguntas sobre ubicación.',
      },
      regulators: {
        selected: ['Chopin (Nocturnos)', 'Boleros (Los Panchos)'],
        text: 'La métrica ternaria (3/4) la calma inmediatamente.',
      },
    },
    initialGoals:
      '1. Reducir episodios de agitación vespertina (Sündowning). 2. Validar su rol de "Maestra" para sostener autoestima.',
    safetyProfile: {
      epilepsy: false,
      dysphagia: false,
      flightRisk: true,
      hyperacusis: false,
      mobilityAid: 'none',
      alerts: [
        'Riesgo de fuga si se angustia (Vigilancia en salida).',
        'No confrontar olvidos (Usar validación).',
      ],
      allergies: '',
      psychomotorAgitation: true,
      chokingHazard: false,
      disruptiveBehavior: false,
    },
    musicalIdentity: {
      likes: ['Chopin', 'Boleros', 'Zarzuela'],
      dislikes: ['Reggaeton', 'Electrónica', 'Ritmos muy marcados'],
      biographicalSongs: ['Dos Gardenias - Machín', 'Nocturno Op.9 - Chopin'],
      instrumentsOfInterest: ['Piano Vertical', 'Voz (Soprano)'],
      musicalTraining: true,
      sensitivityLevel: 'medium',
    },
    socialContext: {
      livingSituation: 'Vive sola con cuidadora 12h.',
      caregiverNetwork: 'Hija visita diario, pero Carmen no siempre la reconoce.',
      recentLifeEvents: ['Viudez hace 2 años (Duelo no resuelto)'],
    },
    reference: 'ALZ-SNR-01',
    musicStyles: 'Clásica, Boleros, Zarzuela.',
    dislikedSounds: 'Ruidos de obra o taladros.',
  },
  // --- CASO 3: NEUROREHABILITACIÓN (Isabel - NMT) ---
  {
    id: 'demo-4',
    status: 'active',
    name: 'Isabel Cifuentes',
    age: 82,
    diagnosis: 'Parkinson (Estadio 3 - Hoehn & Yahr)',
    pathologyType: 'neuro',
    photo: '/assets/demo/grandma2.png',
    contact: 'Residencia Sol: 911 222 333 (Supervisora)',
    joinedDate: '2024-01-05',
    sessionsCompleted: 8,
    sessions: [
      {
        id: 401,
        date: '2024-05-11',
        type: 'individual',
        price: 50,
        paid: false,
        billable: true,
        isAbsent: false,
        notes:
          'Protocolo RAS (Rhythmic Auditory Stimulation). Iniciamos marcha a 60 bpm (metrónomo). Se observa arrastre de pies. Al subir a 90 bpm con música de marcha militar, la longitud de zancada aumenta un 30%.',
        activities: ['RAS (Estimulación Rítmica Auditiva)', 'PSE (Patterned Sensory Enhancement)'],
        scores: [2, 4, 3, 5, 5], // Físico/Motor muy alto con música
      },
    ],
    clinicalFormulation: {
      synthesis:
        'Paciente con Parkinson avanzado. Bradicinesia severa y bloqueos (Freezing) en giros. La señal auditiva rítmica actúa como "prótesis temporal" para su sistema motor.',
      hypothesis:
        'La técnica RAS (NMT) by-passea los ganglios basales dañados, activando áreas motoras suplementarias.',
      preserved: {
        selected: ['Comprensión', 'Gusto Musical', 'Sincronización Rítmica'],
        text: 'Capacidad intacta de sincronizar tapping con beat externo.',
      },
      difficulties: {
        selected: ['Voz', 'Inicio de Marcha', 'Equilibrio'],
        text: 'Congelación (Freezing) al pasar por puertas.',
      },
      regulators: {
        selected: ['Marchas Militares', 'Pasodobles (2/4)'],
        text: 'El ritmo binario marcado es el único driver efectivo.',
      },
    },
    initialGoals:
      '1. Aumentar cadencia de marcha a 100 pasos/min con RAS. 2. Mejorar volumen vocal mediante ejercicios de canto respiratorio.',
    safetyProfile: {
      epilepsy: false,
      dysphagia: true,
      flightRisk: false,
      hyperacusis: false,
      mobilityAid: 'walker',
      alerts: ['Riesgo alto de caída en giros.', 'DISFAGIA: Espesar líquidos (Néctar).'],
      allergies: '',
      psychomotorAgitation: false,
      chokingHazard: true,
      disruptiveBehavior: false,
    },
    musicalIdentity: {
      likes: ['Pasodobles', 'Copla', 'Marchas de San Marcial'],
      dislikes: ['Música relajante (le duerme)'],
      biographicalSongs: ['Suspiros de España', 'La Bandera'],
      instrumentsOfInterest: ['Castañuelas (Adaptadas)', 'Tambor'],
      musicalTraining: false,
      sensitivityLevel: 'medium',
    },
    socialContext: {
      livingSituation: 'Institucionalizada en Residencia.',
      caregiverNetwork: 'Personal de planta.',
      recentLifeEvents: ['Caída reciente aumenta miedo a caminar.'],
    },
    reference: 'NMT-PARK-02',
    musicStyles: 'Copla, Marchas.',
    dislikedSounds: '',
  },
  {
    id: 'demo-5',
    status: 'active',
    name: 'Antonio Machado',
    age: 79,
    diagnosis: 'Recuperación Post-Ictus',
    pathologyType: 'acquired',
    photo: '/assets/demo/grandpa.png',
    contact: 'Esposa: 600 888 999',
    joinedDate: '2024-03-10',
    sessionsCompleted: 3,
    sessions: [],
    clinicalFormulation: {
      synthesis: 'Afasia de Broca y hemiparesia derecha.',
      hypothesis: 'La Terapia de Entonación Melódica (MIT) facilita el habla.',
      preserved: {
        selected: ['Canto', 'Comprensión'],
        text: 'Puede cantar frases que no puede hablar.',
      },
      difficulties: { selected: ['Habla Espontánea', 'Movilidad mano Dcha'], text: '' },
      regulators: { selected: ['Canciones Populares'], text: '' },
    },
    initialGoals: 'Recuperar frases funcionales (Agua, Baño).',
    safetyProfile: {
      epilepsy: true,
      dysphagia: false,
      flightRisk: false,
      hyperacusis: false,
      mobilityAid: 'wheelchair',
      alerts: ['Historial de crisis post-ictus.'],
      allergies: '',
      psychomotorAgitation: false,
      chokingHazard: false,
      disruptiveBehavior: false,
    },
    musicalIdentity: {
      likes: ['Manolo Escobar', 'Flamenco'],
      dislikes: [],
      biographicalSongs: ['Mi Carro'],
      instrumentsOfInterest: ['Cajón (Mano Izda)'],
      musicalTraining: false,
      sensitivityLevel: 'medium',
    },
    socialContext: {
      livingSituation: 'Vive con esposa.',
      caregiverNetwork: 'Esposa cuidadora principal.',
      recentLifeEvents: [],
    },
    reference: 'REF-SNR-03',
    musicStyles: 'Flamenco.',
    dislikedSounds: '',
  },
];
