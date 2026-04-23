export type QuestionOption = {
  id: string;
  text: string;
};

export type QuestionPair = {
  esquerra: string;
  dreta: string;
};

export type Question =
  | {
      id: string;
      bloc: number;
      blocNom: string;
      competencia: string;
      codi: string;
      tipus: "single" | "multiple" | "scenario";
      dificultat: "easy" | "medium" | "hard";
      pes: 1 | 2 | 3;
      enunciat: string;
      instruccio: string;
      opcions: QuestionOption[];
      respostaCorrecta: string | string[];
      explicacio: string;
      tags: string[];
      mouseOnly: true;
    }
  | {
      id: string;
      bloc: number;
      blocNom: string;
      competencia: string;
      codi: string;
      tipus: "ordering";
      dificultat: "easy" | "medium" | "hard";
      pes: 1 | 2 | 3;
      enunciat: string;
      instruccio: string;
      passos: string[];
      respostaCorrecta: { ordre: string[] };
      explicacio: string;
      tags: string[];
      mouseOnly: true;
    }
  | {
      id: string;
      bloc: number;
      blocNom: string;
      competencia: string;
      codi: string;
      tipus: "matching";
      dificultat: "easy" | "medium" | "hard";
      pes: 1 | 2 | 3;
      enunciat: string;
      instruccio: string;
      parelles: QuestionPair[];
      respostaCorrecta: { parelles: QuestionPair[] };
      explicacio: string;
      tags: string[];
      mouseOnly: true;
    }
  | {
      id: string;
      bloc: number;
      blocNom: string;
      competencia: string;
      codi: string;
      tipus: "hotspot";
      dificultat: "easy" | "medium" | "hard";
      pes: 1 | 2 | 3;
      enunciat: string;
      instruccio: string;
      opcions: { id: string; text: string }[];
      respostaCorrecta: { hotspotId: string };
      explicacio: string;
      tags: string[];
      mouseOnly: true;
    }
  | {
      id: string;
      bloc: number;
      blocNom: string;
      competencia: string;
      codi: string;
      tipus: "ui-click";
      dificultat: "easy" | "medium" | "hard";
      pes: 1 | 2 | 3;
      enunciat: string;
      instruccio: string;
      opcions: { id: string; text: string }[];
      respostaCorrecta: { targetId: string };
      explicacio: string;
      tags: string[];
      mouseOnly: true;
    };

type QuestionType = Question["tipus"];
type Difficulty = Question["dificultat"];

type BlockConfig = {
  bloc: number;
  blocNom: string;
  competencia: string;
  total: number;
  indicators: string[];
  topics: string[];
};

const BLOCKS: BlockConfig[] = [
  {
    bloc: 1,
    blocNom: "Cerca, gestió i anàlisi de la informació",
    competencia: "Gestió d'informació digital",
    total: 55,
    indicators: ["1.1.1", "1.1.2", "1.1.3", "1.1.4", "1.1.5", "1.1.6", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5"],
    topics: [
      "navegador",
      "cerca amb paraules clau",
      "diferència entre cercar i navegar",
      "fiabilitat de fonts",
      "dates d'actualització",
      "arxius i carpetes",
      "canvi de nom de fitxers",
      "cerca dins carpetes",
      "emmagatzematge local",
      "emmagatzematge al núvol",
      "unitats externes",
      "neteja de brossa digital",
      "classificació de dades",
      "full de càlcul",
      "funció SUMA",
      "funció COMPTA",
      "gràfics bàsics",
      "formularis digitals"
    ]
  },
  {
    bloc: 2,
    blocNom: "Comunicació i col·laboració",
    competencia: "Comunicació digital",
    total: 45,
    indicators: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5", "2.1.6", "2.2.1", "2.2.2", "2.2.3", "2.2.4"],
    topics: [
      "correu electrònic",
      "missatgeria instantània",
      "videoconferència",
      "comunicació síncrona",
      "comunicació asíncrona",
      "compartir enllaços",
      "permisos de compartició",
      "col·laboració en documents",
      "xarxes socials",
      "fòrums",
      "netiqueta",
      "propietat intel·lectual",
      "protecció de dades",
      "comunitats digitals",
      "serveis digitals públics"
    ]
  },
  {
    bloc: 3,
    blocNom: "Creació de continguts, programació i fabricació d'objectes",
    competencia: "Creació digital",
    total: 45,
    indicators: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.1.6", "3.2.1", "3.2.2", "3.2.3", "3.2.4"],
    topics: [
      "document de text",
      "presentació",
      "edició d'imatge",
      "edició d'àudio",
      "edició de vídeo",
      "encapçalaments i llistes",
      "cites",
      "exportació a PDF",
      "disseny gràfic simple",
      "repositoris de recursos",
      "integració de continguts",
      "impressora 3D",
      "talladora làser",
      "repositori de models 3D",
      "pensament computacional",
      "lògica d'instruccions",
      "llenguatges de programació",
      "intel·ligència artificial"
    ]
  },
  {
    bloc: 4,
    blocNom: "Seguretat, benestar i civisme",
    competencia: "Seguretat i civisme digital",
    total: 60,
    indicators: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5", "4.1.6", "4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5", "4.2.6"],
    topics: [
      "contrasenyes",
      "doble factor",
      "còpies de seguretat",
      "actualitzacions",
      "malware",
      "phishing",
      "suplantació d'identitat",
      "bloqueig de pantalla",
      "privacitat",
      "dades personals",
      "dades de menors",
      "configuració de privacitat",
      "transaccions segures",
      "ergonomia",
      "desconnexió digital",
      "continguts perjudicials",
      "sostenibilitat digital",
      "residus electrònics",
      "control parental",
      "identitat digital",
      "llicències",
      "fake news"
    ]
  },
  {
    bloc: 5,
    blocNom: "Autonomia i resolució de problemes",
    competencia: "Resolució de problemes digitals",
    total: 45,
    indicators: ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5", "5.1.6", "5.2.1", "5.2.2", "5.3.1", "5.3.2", "5.4.1"],
    topics: [
      "maquinari i programari",
      "sistema operatiu",
      "aplicacions",
      "finestres",
      "escriptori",
      "comptes d'usuari",
      "instal·lació d'apps",
      "actualització d'apps",
      "desinstal·lació d'apps",
      "USB",
      "Wi-Fi",
      "Bluetooth",
      "xarxa local",
      "compartir recursos",
      "tràmits en línia",
      "pagaments digitals",
      "geolocalització",
      "objectes connectats",
      "aprenentatge digital",
      "PMF i FAQ",
      "resolució d'incidències",
      "tria de dispositius"
    ]
  }
];

const DIFFICULTY_DISTRIBUTION: Record<Difficulty, number> = {
  easy: 100,
  medium: 100,
  hard: 50
};

const DIFFICULTY_WEIGHT: Record<Difficulty, 1 | 2 | 3> = {
  easy: 1,
  medium: 2,
  hard: 3
};

const TYPE_CYCLE: QuestionType[] = ["single", "multiple", "ordering", "matching", "scenario", "hotspot", "ui-click"];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function rotate<T>(items: T[], offset: number): T[] {
  const safeOffset = offset % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
}

function difficultyForIndex(index: number, total: number): Difficulty {
  const easyLimit = Math.floor(total * 0.4);
  const mediumLimit = easyLimit + Math.floor(total * 0.4);
  if (index < easyLimit) {
    return "easy";
  }
  if (index < mediumLimit) {
    return "medium";
  }
  return "hard";
}

function buildOptions(topic: string): QuestionOption[] {
  return [
    { id: "a", text: `Aplicar una opció adequada per a ${topic}` },
    { id: "b", text: `Fer una acció que no resol l'objectiu de ${topic}` },
    { id: "c", text: `Prioritzar una decisió poc segura en ${topic}` },
    { id: "d", text: `Ignorar la comprovació final en ${topic}` }
  ];
}

function createSingleLikeQuestion(
  id: string,
  bloc: BlockConfig,
  codi: string,
  topic: string,
  dificultat: Difficulty,
  tipus: "single" | "multiple" | "scenario"
): Question {
  const options = rotate(buildOptions(topic), hash(id) % 4);
  const correctSingle = options[0].id;
  const correctMultiple = [options[0].id, options[1].id].sort();

  return {
    id,
    bloc: bloc.bloc,
    blocNom: bloc.blocNom,
    competencia: bloc.competencia,
    codi,
    tipus,
    dificultat,
    pes: DIFFICULTY_WEIGHT[dificultat],
    enunciat: `En una situació real de ${topic}, quina acció és la més adequada per complir l'objectiu de manera segura i eficient?`,
    instruccio:
      tipus === "multiple"
        ? "Selecciona totes les opcions correctes."
        : "Selecciona una única opció correcta.",
    opcions: options,
    respostaCorrecta: tipus === "multiple" ? correctMultiple : correctSingle,
    explicacio: `La resposta correcta aplica bones pràctiques de nivell bàsic en ${topic} amb criteri funcional i de seguretat.`,
    tags: [topic, bloc.blocNom.toLowerCase(), dificultat],
    mouseOnly: true
  };
}

function createOrderingQuestion(id: string, bloc: BlockConfig, codi: string, topic: string, dificultat: Difficulty): Question {
  const orderBase = [
    `Preparar la informació necessària de ${topic}`,
    `Executar l'acció principal de ${topic}`,
    `Comprovar el resultat obtingut de ${topic}`,
    `Guardar o compartir el resultat segons el context`
  ];

  const shuffled = rotate(orderBase, (hash(id) % 3) + 1);

  return {
    id,
    bloc: bloc.bloc,
    blocNom: bloc.blocNom,
    competencia: bloc.competencia,
    codi,
    tipus: "ordering",
    dificultat,
    pes: DIFFICULTY_WEIGHT[dificultat],
    enunciat: `Ordena els passos per completar correctament una tasca de ${topic}.`,
    instruccio: "Fes clic als botons per ordenar de primer a últim.",
    passos: shuffled,
    respostaCorrecta: { ordre: orderBase },
    explicacio: `L'ordre correcte minimitza errors i assegura una execució coherent de la tasca de ${topic}.`,
    tags: [topic, "sequenciacio", dificultat],
    mouseOnly: true
  };
}

function createMatchingQuestion(id: string, bloc: BlockConfig, codi: string, topic: string, dificultat: Difficulty): Question {
  const pairs: QuestionPair[] = [
    { esquerra: `Objectiu de ${topic}`, dreta: "Definir què es vol aconseguir" },
    { esquerra: `Eina de ${topic}`, dreta: "Triar l'aplicació adequada" },
    { esquerra: `Verificació de ${topic}`, dreta: "Comprovar qualitat i seguretat" },
    { esquerra: `Conservació de ${topic}`, dreta: "Guardar en ubicació correcta" }
  ];

  return {
    id,
    bloc: bloc.bloc,
    blocNom: bloc.blocNom,
    competencia: bloc.competencia,
    codi,
    tipus: "matching",
    dificultat,
    pes: DIFFICULTY_WEIGHT[dificultat],
    enunciat: `Relaciona cada element de ${topic} amb la descripció corresponent.`,
    instruccio: "Per a cada element de l'esquerra, selecciona la correspondència correcta.",
    parelles: pairs,
    respostaCorrecta: { parelles: pairs },
    explicacio: `Cada correspondència identifica el rol correcte de cada element en una tasca bàsica de ${topic}.`,
    tags: [topic, "relacio", dificultat],
    mouseOnly: true
  };
}

function createHotspotQuestion(id: string, bloc: BlockConfig, codi: string, topic: string, dificultat: Difficulty): Question {
  const opts = [
    { id: "h1", text: "Element principal" },
    { id: "h2", text: "Element secundari" },
    { id: "h3", text: "Element incorrecte" },
    { id: "h4", text: "Element decoratiu" }
  ];
  const rotated = rotate(opts, hash(id) % 4);

  return {
    id,
    bloc: bloc.bloc,
    blocNom: bloc.blocNom,
    competencia: bloc.competencia,
    codi,
    tipus: "hotspot",
    dificultat,
    pes: DIFFICULTY_WEIGHT[dificultat],
    enunciat: `En la maqueta simplificada de ${topic}, selecciona la zona correcta per executar l'acció demanada.`,
    instruccio: "Fes clic a una única zona de la maqueta.",
    opcions: rotated,
    respostaCorrecta: { hotspotId: rotated[0].id },
    explicacio: `La zona correcta correspon a l'acció principal requerida pel cas de ${topic}.`,
    tags: [topic, "hotspot", dificultat],
    mouseOnly: true
  };
}

function createUIClickQuestion(id: string, bloc: BlockConfig, codi: string, topic: string, dificultat: Difficulty): Question {
  const opts = [
    { id: "u1", text: "Botó correcte" },
    { id: "u2", text: "Botó alternatiu" },
    { id: "u3", text: "Menú no relacionat" },
    { id: "u4", text: "Acció cancel·lar" }
  ];
  const rotated = rotate(opts, hash(`${id}-ui`) % 4);

  return {
    id,
    bloc: bloc.bloc,
    blocNom: bloc.blocNom,
    competencia: bloc.competencia,
    codi,
    tipus: "ui-click",
    dificultat,
    pes: DIFFICULTY_WEIGHT[dificultat],
    enunciat: `Davant una interfície de ${topic}, quina acció has de clicar per assolir l'objectiu?`,
    instruccio: "Selecciona l'element correcte de la interfície.",
    opcions: rotated,
    respostaCorrecta: { targetId: rotated[0].id },
    explicacio: `L'element correcte és el control funcional que resol la tasca de ${topic} amb el mínim risc.`,
    tags: [topic, "interficie", dificultat],
    mouseOnly: true
  };
}

function createQuestion(id: string, bloc: BlockConfig, codi: string, topic: string, dificultat: Difficulty, tipus: QuestionType): Question {
  if (tipus === "ordering") {
    return createOrderingQuestion(id, bloc, codi, topic, dificultat);
  }

  if (tipus === "matching") {
    return createMatchingQuestion(id, bloc, codi, topic, dificultat);
  }

  if (tipus === "hotspot") {
    return createHotspotQuestion(id, bloc, codi, topic, dificultat);
  }

  if (tipus === "ui-click") {
    return createUIClickQuestion(id, bloc, codi, topic, dificultat);
  }

  return createSingleLikeQuestion(id, bloc, codi, topic, dificultat, tipus);
}

function distributeDifficultiesPerBlock(total: number): Difficulty[] {
  const easy = Math.floor(total * 0.4);
  const medium = Math.floor(total * 0.4);
  const hard = total - easy - medium;
  return [
    ...Array.from({ length: easy }, () => "easy" as const),
    ...Array.from({ length: medium }, () => "medium" as const),
    ...Array.from({ length: hard }, () => "hard" as const)
  ];
}

function buildQuestions(): Question[] {
  const list: Question[] = [];

  BLOCKS.forEach((block) => {
    const difficulties = distributeDifficultiesPerBlock(block.total);
    for (let i = 0; i < block.total; i += 1) {
      const id = `B${block.bloc}-${String(i + 1).padStart(3, "0")}`;
      const codi = block.indicators[i % block.indicators.length];
      const topic = block.topics[i % block.topics.length];
      const dificultat = difficulties[i] ?? difficultyForIndex(i, block.total);
      const tipus = TYPE_CYCLE[(i + block.bloc) % TYPE_CYCLE.length];
      list.push(createQuestion(id, block, codi, topic, dificultat, tipus));
    }
  });

  const counts = list.reduce(
    (acc, q) => {
      acc[q.dificultat] += 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );

  if (
    list.length !== 250 ||
    counts.easy !== DIFFICULTY_DISTRIBUTION.easy ||
    counts.medium !== DIFFICULTY_DISTRIBUTION.medium ||
    counts.hard !== DIFFICULTY_DISTRIBUTION.hard
  ) {
    throw new Error("La distribució del banc de preguntes no compleix els valors esperats.");
  }

  return list;
}

const questions: Question[] = buildQuestions();

export default questions;

