import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const comprehensiveLifeInUKTests = [
  {
    id: "life-uk-test-1",
    title: "Life in the UK Test 1",
    description:
      "Official practice test covering British history, culture, and government - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      // Question 1
      {
        stem: "Who were the first people to arrive in Britain in what we call the Stone Age?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Hunter-gatherers were the first people to live in Britain during the Stone Age, around 10,000 years ago.",
        order: 1,
        points: 1,
        options: [
          { label: "Hunter-gatherers", isCorrect: true, order: 1 },
          { label: "Romans", isCorrect: false, order: 2 },
          { label: "Anglo-Saxons", isCorrect: false, order: 3 },
          { label: "Vikings", isCorrect: false, order: 4 },
        ],
      },
      // Question 2
      {
        stem: "What is Stonehenge?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Stonehenge is a prehistoric monument in Wiltshire, built around 5,000 years ago during the Neolithic period.",
        order: 2,
        points: 1,
        options: [
          { label: "A Roman amphitheatre", isCorrect: false, order: 1 },
          { label: "A prehistoric monument", isCorrect: true, order: 2 },
          { label: "A medieval castle", isCorrect: false, order: 3 },
          { label: "A Victorian railway station", isCorrect: false, order: 4 },
        ],
      },
      // Question 3
      {
        stem: "Where did the Romans first land in Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Julius Caesar first landed in Britain in 55 BC, followed by a more successful invasion in 54 BC, landing in what is now Kent.",
        order: 3,
        points: 1,
        options: [
          { label: "Kent", isCorrect: true, order: 1 },
          { label: "Sussex", isCorrect: false, order: 2 },
          { label: "Cornwall", isCorrect: false, order: 3 },
          { label: "Yorkshire", isCorrect: false, order: 4 },
        ],
      },
      // Question 4
      {
        stem: "Who was Boudicca?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Boudicca was a queen of the Celtic Iceni tribe who led a major uprising against occupying Roman forces in AD 60-61.",
        order: 4,
        points: 1,
        options: [
          { label: "A Roman emperor", isCorrect: false, order: 1 },
          {
            label: "A Celtic queen who fought the Romans",
            isCorrect: true,
            order: 2,
          },
          { label: "An Anglo-Saxon princess", isCorrect: false, order: 3 },
          { label: "A Viking warrior", isCorrect: false, order: 4 },
        ],
      },
      // Question 5
      {
        stem: "What did the Romans build across northern England?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Hadrian's Wall was built by the Romans across northern England to defend against Scottish tribes.",
        order: 5,
        points: 1,
        options: [
          { label: "The Great Wall", isCorrect: false, order: 1 },
          { label: "Hadrian's Wall", isCorrect: true, order: 2 },
          { label: "The London Wall", isCorrect: false, order: 3 },
          { label: "The Roman Road", isCorrect: false, order: 4 },
        ],
      },
      // Question 6
      {
        stem: "Who were the Anglo-Saxons?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Anglo-Saxons were tribes from northern Europe (Germany, Denmark, and the Netherlands) who came to Britain after the Romans left.",
        order: 6,
        points: 1,
        options: [
          { label: "Celtic tribes from Wales", isCorrect: false, order: 1 },
          { label: "Tribes from northern Europe", isCorrect: true, order: 2 },
          { label: "Roman soldiers", isCorrect: false, order: 3 },
          { label: "French knights", isCorrect: false, order: 4 },
        ],
      },
      // Question 7
      {
        stem: "What language did the Anglo-Saxons speak?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Anglo-Saxons spoke Anglo-Saxon or Old English, which is the basis of modern English language.",
        order: 7,
        points: 1,
        options: [
          { label: "Latin", isCorrect: false, order: 1 },
          { label: "Celtic", isCorrect: false, order: 2 },
          { label: "Anglo-Saxon (Old English)", isCorrect: true, order: 3 },
          { label: "Norman French", isCorrect: false, order: 4 },
        ],
      },
      // Question 8
      {
        stem: "Who was St Augustine?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St Augustine was sent by Pope Gregory the Great to lead the conversion of the Anglo-Saxons to Christianity and became the first Archbishop of Canterbury.",
        order: 8,
        points: 1,
        options: [
          { label: "An Anglo-Saxon king", isCorrect: false, order: 1 },
          { label: "A Roman general", isCorrect: false, order: 2 },
          {
            label:
              "A missionary who converted the Anglo-Saxons to Christianity",
            isCorrect: true,
            order: 3,
          },
          { label: "A Viking leader", isCorrect: false, order: 4 },
        ],
      },
      // Question 9
      {
        stem: "Where did the Vikings come from?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Vikings came from Denmark, Norway, and Sweden, raiding and later settling in parts of Britain.",
        order: 9,
        points: 1,
        options: [
          { label: "Germany", isCorrect: false, order: 1 },
          { label: "Denmark, Norway and Sweden", isCorrect: true, order: 2 },
          { label: "France", isCorrect: false, order: 3 },
          { label: "Ireland", isCorrect: false, order: 4 },
        ],
      },
      // Question 10
      {
        stem: "Who was Alfred the Great?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Alfred the Great was King of Wessex who successfully defended his kingdom against Viking invasion and is the only English king to be called 'the Great'.",
        order: 10,
        points: 1,
        options: [
          { label: "A Viking leader", isCorrect: false, order: 1 },
          { label: "A Roman emperor", isCorrect: false, order: 2 },
          {
            label: "King of Wessex who defeated the Vikings",
            isCorrect: true,
            order: 3,
          },
          { label: "A Norman duke", isCorrect: false, order: 4 },
        ],
      },
      // Question 11
      {
        stem: "When did the Norman Conquest take place?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Norman Conquest took place in 1066 when William the Conqueror defeated King Harold at the Battle of Hastings.",
        order: 11,
        points: 1,
        options: [
          { label: "1066", isCorrect: true, order: 1 },
          { label: "1065", isCorrect: false, order: 2 },
          { label: "1067", isCorrect: false, order: 3 },
          { label: "1070", isCorrect: false, order: 4 },
        ],
      },
      // Question 12
      {
        stem: "Who won the Battle of Hastings?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "William the Conqueror (William of Normandy) won the Battle of Hastings in 1066, defeating King Harold II.",
        order: 12,
        points: 1,
        options: [
          { label: "King Harold", isCorrect: false, order: 1 },
          { label: "William the Conqueror", isCorrect: true, order: 2 },
          { label: "Alfred the Great", isCorrect: false, order: 3 },
          { label: "Edward the Confessor", isCorrect: false, order: 4 },
        ],
      },
      // Question 13
      {
        stem: "What is the Domesday Book?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Domesday Book was a survey of England ordered by William the Conqueror in 1086 to record who owned what land and property.",
        order: 13,
        points: 1,
        options: [
          { label: "A religious text", isCorrect: false, order: 1 },
          { label: "A land and property survey", isCorrect: true, order: 2 },
          { label: "A book of laws", isCorrect: false, order: 3 },
          { label: "A history book", isCorrect: false, order: 4 },
        ],
      },
      // Question 14
      {
        stem: "What language did the Normans speak?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Normans spoke Norman French, which became the language of the royal court and nobility for several centuries.",
        order: 14,
        points: 1,
        options: [
          { label: "Latin", isCorrect: false, order: 1 },
          { label: "Norman French", isCorrect: true, order: 2 },
          { label: "Old English", isCorrect: false, order: 3 },
          { label: "Celtic", isCorrect: false, order: 4 },
        ],
      },
      // Question 15
      {
        stem: "When was the feudal system established in England?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The feudal system was established in England after the Norman Conquest in 1066, organizing society around land ownership and loyalty.",
        order: 15,
        points: 1,
        options: [
          { label: "Before the Norman Conquest", isCorrect: false, order: 1 },
          { label: "After the Norman Conquest", isCorrect: true, order: 2 },
          {
            label: "During the Anglo-Saxon period",
            isCorrect: false,
            order: 3,
          },
          { label: "In the Tudor period", isCorrect: false, order: 4 },
        ],
      },
      // Question 16
      {
        stem: "Who was Thomas Becket?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Thomas Becket was Archbishop of Canterbury who was murdered in Canterbury Cathedral in 1170 on the orders of King Henry II.",
        order: 16,
        points: 1,
        options: [
          { label: "A Norman knight", isCorrect: false, order: 1 },
          { label: "Archbishop of Canterbury", isCorrect: true, order: 2 },
          { label: "A medieval king", isCorrect: false, order: 3 },
          { label: "A Viking leader", isCorrect: false, order: 4 },
        ],
      },
      // Question 17
      {
        stem: "What are the Canterbury Tales?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Canterbury Tales is a collection of stories written by Geoffrey Chaucer in the 14th century about pilgrims traveling to Canterbury.",
        order: 17,
        points: 1,
        options: [
          {
            label: "A collection of stories by Geoffrey Chaucer",
            isCorrect: true,
            order: 1,
          },
          { label: "A religious text", isCorrect: false, order: 2 },
          { label: "A historical chronicle", isCorrect: false, order: 3 },
          { label: "A book of laws", isCorrect: false, order: 4 },
        ],
      },
      // Question 18
      {
        stem: "What was the Black Death?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Black Death was a plague that killed about one third of the population of England in the 14th century.",
        order: 18,
        points: 1,
        options: [
          { label: "A war", isCorrect: false, order: 1 },
          { label: "A plague", isCorrect: true, order: 2 },
          { label: "A famine", isCorrect: false, order: 3 },
          { label: "A flood", isCorrect: false, order: 4 },
        ],
      },
      // Question 19
      {
        stem: "What was the Peasants' Revolt?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Peasants' Revolt was an uprising in 1381 led by Wat Tyler against high taxes and social restrictions.",
        order: 19,
        points: 1,
        options: [
          { label: "A religious movement", isCorrect: false, order: 1 },
          { label: "An uprising against taxes", isCorrect: true, order: 2 },
          { label: "A military campaign", isCorrect: false, order: 3 },
          { label: "A trade dispute", isCorrect: false, order: 4 },
        ],
      },
      // Question 20
      {
        stem: "Which war between England and France lasted 116 years?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Hundred Years War between England and France lasted from 1337 to 1453 (116 years).",
        order: 20,
        points: 1,
        options: [
          { label: "The Hundred Years War", isCorrect: true, order: 1 },
          { label: "The Thirty Years War", isCorrect: false, order: 2 },
          { label: "The War of the Roses", isCorrect: false, order: 3 },
          { label: "The Seven Years War", isCorrect: false, order: 4 },
        ],
      },
      // Question 21
      {
        stem: "At which battle was Joan of Arc present?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Joan of Arc was present at the Battle of Orléans in 1429, where she helped the French defeat the English.",
        order: 21,
        points: 1,
        options: [
          { label: "Battle of Hastings", isCorrect: false, order: 1 },
          { label: "Battle of Orléans", isCorrect: true, order: 2 },
          { label: "Battle of Agincourt", isCorrect: false, order: 3 },
          { label: "Battle of Crécy", isCorrect: false, order: 4 },
        ],
      },
      // Question 22
      {
        stem: "What were the Wars of the Roses?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Wars of the Roses were civil wars between the House of Lancaster and House of York for the English throne.",
        order: 22,
        points: 1,
        options: [
          { label: "Wars with France", isCorrect: false, order: 1 },
          {
            label: "Civil wars between Lancaster and York",
            isCorrect: true,
            order: 2,
          },
          { label: "Wars with Scotland", isCorrect: false, order: 3 },
          { label: "Religious wars", isCorrect: false, order: 4 },
        ],
      },
      // Question 23
      {
        stem: "Who founded the House of Tudor?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry VII founded the House of Tudor when he defeated Richard III at the Battle of Bosworth Field in 1485.",
        order: 23,
        points: 1,
        options: [
          { label: "Henry VII", isCorrect: true, order: 1 },
          { label: "Henry VIII", isCorrect: false, order: 2 },
          { label: "Richard III", isCorrect: false, order: 3 },
          { label: "Edward IV", isCorrect: false, order: 4 },
        ],
      },
      // Question 24
      {
        stem: "When did the Middle Ages in Britain end?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Middle Ages in Britain ended in 1485 with the Battle of Bosworth Field and the start of the Tudor period.",
        order: 24,
        points: 1,
        options: [
          { label: "1485", isCorrect: true, order: 1 },
          { label: "1475", isCorrect: false, order: 2 },
          { label: "1495", isCorrect: false, order: 3 },
          { label: "1500", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-2",
    title: "Life in the UK Test 2",
    description:
      "Official practice test covering Tudor period, Reformation, and British Empire - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      // Tudor Period and Reformation - Questions 1-8
      {
        stem: "Who was the first Tudor king?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry VII was the first Tudor king, ruling from 1485 to 1509 after defeating Richard III at Bosworth Field.",
        order: 1,
        points: 1,
        options: [
          { label: "Henry VII", isCorrect: true, order: 1 },
          { label: "Henry VIII", isCorrect: false, order: 2 },
          { label: "Edward VI", isCorrect: false, order: 3 },
          { label: "Richard III", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Why did Henry VIII establish the Church of England?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry VIII established the Church of England to divorce Catherine of Aragon and marry Anne Boleyn, as the Pope refused to annul his marriage.",
        order: 2,
        points: 1,
        options: [
          { label: "To reform Catholic practices", isCorrect: false, order: 1 },
          {
            label: "To divorce Catherine of Aragon",
            isCorrect: true,
            order: 2,
          },
          {
            label: "To unite with Protestant Germany",
            isCorrect: false,
            order: 3,
          },
          { label: "To increase royal power", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many wives did Henry VIII have?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry VIII had six wives: Catherine of Aragon, Anne Boleyn, Jane Seymore, Anne of Cleves, Catherine Howard, and Catherine Parr.",
        order: 3,
        points: 1,
        options: [
          { label: "Four", isCorrect: false, order: 1 },
          { label: "Five", isCorrect: false, order: 2 },
          { label: "Six", isCorrect: true, order: 3 },
          { label: "Seven", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Mary I?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Mary I was Henry VIII's daughter who tried to restore Catholicism to England and was known as 'Bloody Mary' for persecuting Protestants.",
        order: 4,
        points: 1,
        options: [
          { label: "Henry VIII's sister", isCorrect: false, order: 1 },
          {
            label: "Henry VIII's daughter who restored Catholicism",
            isCorrect: true,
            order: 2,
          },
          { label: "A Protestant reformer", isCorrect: false, order: 3 },
          { label: "A Scottish queen", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How long did Elizabeth I reign?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Elizabeth I reigned for 45 years from 1558 to 1603, known as the Elizabethan Age.",
        order: 5,
        points: 1,
        options: [
          { label: "35 years", isCorrect: false, order: 1 },
          { label: "40 years", isCorrect: false, order: 2 },
          { label: "45 years", isCorrect: true, order: 3 },
          { label: "50 years", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who wrote plays during the Elizabethan period?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "William Shakespeare wrote many famous plays during the Elizabethan period, including Hamlet, Romeo and Juliet, and Macbeth.",
        order: 6,
        points: 1,
        options: [
          { label: "Christopher Marlowe", isCorrect: false, order: 1 },
          { label: "William Shakespeare", isCorrect: true, order: 2 },
          { label: "Ben Jonson", isCorrect: false, order: 3 },
          { label: "Geoffrey Chaucer", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Spanish Armada?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Spanish Armada was a fleet of ships sent by Spain to invade England in 1588, which was defeated by the English navy.",
        order: 7,
        points: 1,
        options: [
          { label: "A Spanish trading company", isCorrect: false, order: 1 },
          {
            label: "A fleet sent to invade England",
            isCorrect: true,
            order: 2,
          },
          { label: "A Spanish colony", isCorrect: false, order: 3 },
          { label: "A Spanish fortress", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Francis Drake?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Francis Drake was an English sea captain who was the first Englishman to circumnavigate the world and helped defeat the Spanish Armada.",
        order: 8,
        points: 1,
        options: [
          { label: "A Spanish admiral", isCorrect: false, order: 1 },
          { label: "An English sea captain", isCorrect: true, order: 2 },
          { label: "A French explorer", isCorrect: false, order: 3 },
          { label: "A Dutch trader", isCorrect: false, order: 4 },
        ],
      },
      // Stuart Period - Questions 9-16
      {
        stem: "Who became king after Elizabeth I died?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "James I (James VI of Scotland) became king after Elizabeth I died in 1603, uniting the English and Scottish crowns.",
        order: 9,
        points: 1,
        options: [
          { label: "Charles I", isCorrect: false, order: 1 },
          { label: "James I", isCorrect: true, order: 2 },
          { label: "William III", isCorrect: false, order: 3 },
          { label: "George I", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Gunpowder Plot?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Gunpowder Plot was a plan by Guy Fawkes and other Catholics to blow up Parliament and kill King James I in 1605.",
        order: 10,
        points: 1,
        options: [
          { label: "A plan to blow up Parliament", isCorrect: true, order: 1 },
          { label: "A military rebellion", isCorrect: false, order: 2 },
          { label: "A religious reformation", isCorrect: false, order: 3 },
          { label: "A trade dispute", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the King James Bible?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The King James Bible is an English translation of the Bible commissioned by King James I in 1611, also known as the Authorized Version.",
        order: 11,
        points: 1,
        options: [
          { label: "A Catholic Bible", isCorrect: false, order: 1 },
          {
            label: "An English translation of the Bible",
            isCorrect: true,
            order: 2,
          },
          { label: "A book of prayers", isCorrect: false, order: 3 },
          { label: "A religious commentary", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Why did civil war break out in 1642?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Civil war broke out in 1642 due to disputes between King Charles I and Parliament over religious and political power.",
        order: 12,
        points: 1,
        options: [
          {
            label: "Disputes between King and Parliament",
            isCorrect: true,
            order: 1,
          },
          { label: "Foreign invasion", isCorrect: false, order: 2 },
          { label: "Economic crisis", isCorrect: false, order: 3 },
          { label: "Natural disasters", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who led the Parliamentary forces in the Civil War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Oliver Cromwell led the Parliamentary forces (Roundheads) against King Charles I's Royalist forces (Cavaliers).",
        order: 13,
        points: 1,
        options: [
          { label: "King Charles I", isCorrect: false, order: 1 },
          { label: "Oliver Cromwell", isCorrect: true, order: 2 },
          { label: "Prince Rupert", isCorrect: false, order: 3 },
          { label: "Thomas Fairfax", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What happened to King Charles I?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "King Charles I was executed in 1649 after being found guilty of treason by Parliament during the English Civil War.",
        order: 14,
        points: 1,
        options: [
          { label: "He fled to France", isCorrect: false, order: 1 },
          { label: "He was executed", isCorrect: true, order: 2 },
          { label: "He abdicated", isCorrect: false, order: 3 },
          { label: "He died in battle", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Commonwealth?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Commonwealth was the republican government of England from 1649 to 1660, after the execution of Charles I.",
        order: 15,
        points: 1,
        options: [
          { label: "A trading alliance", isCorrect: false, order: 1 },
          {
            label: "The republican government after Charles I",
            isCorrect: true,
            order: 2,
          },
          { label: "A religious organization", isCorrect: false, order: 3 },
          { label: "A military alliance", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When was the monarchy restored?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The monarchy was restored in 1660 when Charles II returned from exile to become king, ending the Commonwealth period.",
        order: 16,
        points: 1,
        options: [
          { label: "1658", isCorrect: false, order: 1 },
          { label: "1660", isCorrect: true, order: 2 },
          { label: "1662", isCorrect: false, order: 3 },
          { label: "1665", isCorrect: false, order: 4 },
        ],
      },
      // Great Fire, Plague, and Science - Questions 17-20
      {
        stem: "When did the Great Fire of London occur?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Fire of London occurred in 1666, destroying much of medieval London but leading to rebuilding with better fire safety.",
        order: 17,
        points: 1,
        options: [
          { label: "1665", isCorrect: false, order: 1 },
          { label: "1666", isCorrect: true, order: 2 },
          { label: "1667", isCorrect: false, order: 3 },
          { label: "1668", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who designed St Paul's Cathedral?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sir Christopher Wren designed St Paul's Cathedral and many other churches in London after the Great Fire of 1666.",
        order: 18,
        points: 1,
        options: [
          { label: "Inigo Jones", isCorrect: false, order: 1 },
          { label: "Sir Christopher Wren", isCorrect: true, order: 2 },
          { label: "Nicholas Hawksmoor", isCorrect: false, order: 3 },
          { label: "John Vanbrugh", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who discovered the law of gravity?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sir Isaac Newton discovered the law of gravity and made major contributions to mathematics, physics, and astronomy.",
        order: 19,
        points: 1,
        options: [
          { label: "Galileo Galilei", isCorrect: false, order: 1 },
          { label: "Sir Isaac Newton", isCorrect: true, order: 2 },
          { label: "Robert Hooke", isCorrect: false, order: 3 },
          { label: "Edmund Halley", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Royal Society?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Royal Society was founded in 1660 to promote scientific knowledge and is one of the oldest scientific societies in the world.",
        order: 20,
        points: 1,
        options: [
          { label: "A royal household", isCorrect: false, order: 1 },
          { label: "A scientific society", isCorrect: true, order: 2 },
          { label: "A trading company", isCorrect: false, order: 3 },
          { label: "A military organization", isCorrect: false, order: 4 },
        ],
      },
      // Constitutional Monarchy - Questions 21-24
      {
        stem: "What was the Glorious Revolution?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Glorious Revolution in 1688 was when James II was overthrown and replaced by William III and Mary II, establishing constitutional monarchy.",
        order: 21,
        points: 1,
        options: [
          {
            label: "The overthrow of James II in 1688",
            isCorrect: true,
            order: 1,
          },
          { label: "The execution of Charles I", isCorrect: false, order: 2 },
          {
            label: "The restoration of Charles II",
            isCorrect: false,
            order: 3,
          },
          {
            label: "The defeat of the Spanish Armada",
            isCorrect: false,
            order: 4,
          },
        ],
      },
      {
        stem: "What was the Bill of Rights?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Bill of Rights (1689) limited the power of the monarchy and established the rights of Parliament and basic civil rights.",
        order: 22,
        points: 1,
        options: [
          { label: "A tax law", isCorrect: false, order: 1 },
          { label: "A law limiting royal power", isCorrect: true, order: 2 },
          { label: "A religious law", isCorrect: false, order: 3 },
          { label: "A military law", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is constitutional monarchy?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Constitutional monarchy is a system where the monarch's power is limited by law and Parliament has supreme authority.",
        order: 23,
        points: 1,
        options: [
          { label: "Unlimited royal power", isCorrect: false, order: 1 },
          {
            label: "Limited royal power with Parliament supreme",
            isCorrect: true,
            order: 2,
          },
          { label: "No monarchy", isCorrect: false, order: 3 },
          { label: "Military rule", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did England and Scotland unite to form Great Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "England and Scotland united in 1707 through the Act of Union to form the Kingdom of Great Britain.",
        order: 24,
        points: 1,
        options: [
          { label: "1703", isCorrect: false, order: 1 },
          { label: "1707", isCorrect: true, order: 2 },
          { label: "1710", isCorrect: false, order: 3 },
          { label: "1715", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
];

async function main() {
  try {
    console.log("🌱 Starting comprehensive database seed...");

    // Clear existing data
    await prisma.testAttempt.deleteMany();
    await prisma.option.deleteMany();
    await prisma.question.deleteMany();
    await prisma.test.deleteMany();
    await prisma.domain.deleteMany();
    await prisma.user.deleteMany();

    console.log("🧹 Cleared existing data");

    // Create or find the Life in UK domain
    const lifeInUKDomain = await prisma.domain.upsert({
      where: { name: "life-in-uk" },
      update: {},
      create: {
        name: "life-in-uk",
        displayName: "Life in UK",
        description: "Official Life in the UK citizenship test preparation",
        icon: "🇬🇧",
        config: {
          categories: ["history", "culture", "government", "law"],
          difficulty: "medium",
        },
      },
    });

    console.log("✅ Created/found domain: Life in UK");

    // Create a test user
    const testUser = await prisma.user.upsert({
      where: { email: "admin@testtutor.com" },
      update: {},
      create: {
        email: "admin@testtutor.com",
        name: "Test Admin",
        role: "ADMIN",
      },
    });

    console.log("✅ Created/found user: Test Admin");

    // Create each test
    for (const testData of comprehensiveLifeInUKTests) {
      console.log(`📝 Creating test: ${testData.title}`);

      const test = await prisma.test.create({
        data: {
          id: testData.id,
          title: testData.title,
          description: testData.description,
          domainId: lifeInUKDomain.id,
          creatorId: testUser.id,
          status: "PUBLISHED",
          config: {},
          passPercentage: testData.passPercentage,
          timeLimit: testData.timeLimit,
          shuffleQuestions: false,
          shuffleAnswers: false,
          isPublic: true,
          publishedAt: new Date(),
        },
      });

      // Create questions
      for (const questionData of testData.questions) {
        await prisma.question.create({
          data: {
            testId: test.id,
            stem: questionData.stem,
            explanation: questionData.explanation,
            type: questionData.type,
            order: questionData.order,
            points: questionData.points,
            options: {
              create: questionData.options.map((option) => ({
                label: option.label,
                isCorrect: option.isCorrect,
                order: option.order,
              })),
            },
          },
        });

        console.log(
          `  ➕ Added question ${questionData.order}: ${questionData.stem.substring(0, 50)}...`
        );
      }

      console.log(
        `✅ Test created: ${testData.title} with ${testData.questions.length} questions`
      );
    }

    console.log("");
    console.log("🎉 Comprehensive database seed completed successfully!");
    console.log(
      `📊 Created ${comprehensiveLifeInUKTests.length} complete tests with 24 questions each`
    );
    console.log(
      `📈 Total questions: ${comprehensiveLifeInUKTests.reduce((total, test) => total + test.questions.length, 0)}`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
