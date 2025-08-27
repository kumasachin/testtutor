import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  {
    id: "life-uk-test-3",
    title: "Life in the UK Test 3",
    description:
      "Official practice test covering Industrial Revolution and Victorian Britain - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "When did the Industrial Revolution begin?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Industrial Revolution began in the mid-18th century (around 1750) in Britain.",
        order: 1,
        points: 1,
        options: [
          { label: "Early 18th century", isCorrect: false, order: 1 },
          { label: "Mid-18th century", isCorrect: true, order: 2 },
          { label: "Late 18th century", isCorrect: false, order: 3 },
          { label: "Early 19th century", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What powered the first factories?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The first factories were powered by water wheels, using the flow of rivers to drive machinery.",
        order: 2,
        points: 1,
        options: [
          { label: "Steam engines", isCorrect: false, order: 1 },
          { label: "Water wheels", isCorrect: true, order: 2 },
          { label: "Electricity", isCorrect: false, order: 3 },
          { label: "Wind power", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who improved the steam engine?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "James Watt improved the steam engine in the 1760s, making it much more efficient and practical for industrial use.",
        order: 3,
        points: 1,
        options: [
          { label: "George Stephenson", isCorrect: false, order: 1 },
          { label: "James Watt", isCorrect: true, order: 2 },
          { label: "Richard Arkwright", isCorrect: false, order: 3 },
          { label: "Isambard Kingdom Brunel", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the first railway to carry passengers?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Liverpool to Manchester railway, opened in 1830, was the first to carry passengers using steam locomotives.",
        order: 4,
        points: 1,
        options: [
          { label: "London to Birmingham", isCorrect: false, order: 1 },
          { label: "Liverpool to Manchester", isCorrect: true, order: 2 },
          { label: "London to Brighton", isCorrect: false, order: 3 },
          { label: "Edinburgh to Glasgow", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who built the Great Western Railway?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Isambard Kingdom Brunel built the Great Western Railway, connecting London to the west of England.",
        order: 5,
        points: 1,
        options: [
          { label: "George Stephenson", isCorrect: false, order: 1 },
          { label: "Isambard Kingdom Brunel", isCorrect: true, order: 2 },
          { label: "James Watt", isCorrect: false, order: 3 },
          { label: "Richard Trevithick", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did Queen Victoria become queen?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Queen Victoria became queen in 1837 at the age of 18 and reigned for 63 years until 1901.",
        order: 6,
        points: 1,
        options: [
          { label: "1835", isCorrect: false, order: 1 },
          { label: "1837", isCorrect: true, order: 2 },
          { label: "1840", isCorrect: false, order: 3 },
          { label: "1845", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Great Exhibition?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Exhibition of 1851 was held in the Crystal Palace in London to display Britain's industrial achievements.",
        order: 7,
        points: 1,
        options: [
          { label: "A trade fair", isCorrect: false, order: 1 },
          {
            label: "An exhibition of industrial achievements",
            isCorrect: true,
            order: 2,
          },
          { label: "A military parade", isCorrect: false, order: 3 },
          { label: "A religious gathering", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Where was the Crystal Palace built?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Crystal Palace was built in Hyde Park, London, for the Great Exhibition of 1851.",
        order: 8,
        points: 1,
        options: [
          { label: "Hyde Park", isCorrect: true, order: 1 },
          { label: "Regent's Park", isCorrect: false, order: 2 },
          { label: "St James's Park", isCorrect: false, order: 3 },
          { label: "Greenwich Park", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Irish potato famine?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Irish potato famine (1845-1852) was caused by disease affecting potato crops, leading to mass starvation and emigration.",
        order: 9,
        points: 1,
        options: [
          { label: "A war in Ireland", isCorrect: false, order: 1 },
          {
            label: "A disease affecting potato crops",
            isCorrect: true,
            order: 2,
          },
          { label: "A tax on potatoes", isCorrect: false, order: 3 },
          { label: "A trade dispute", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When was slavery abolished in the British Empire?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Slavery was abolished in the British Empire in 1833, though the slave trade had been banned earlier in 1807.",
        order: 10,
        points: 1,
        options: [
          { label: "1807", isCorrect: false, order: 1 },
          { label: "1833", isCorrect: true, order: 2 },
          { label: "1840", isCorrect: false, order: 3 },
          { label: "1850", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Lord Nelson?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Lord Nelson was a British naval commander who defeated the French fleet at the Battle of Trafalgar in 1805.",
        order: 11,
        points: 1,
        options: [
          { label: "An army general", isCorrect: false, order: 1 },
          { label: "A naval commander", isCorrect: true, order: 2 },
          { label: "A politician", isCorrect: false, order: 3 },
          { label: "An explorer", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Where is Nelson's Column?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Nelson's Column is in Trafalgar Square, London, commemorating Admiral Nelson's victory at Trafalgar.",
        order: 12,
        points: 1,
        options: [
          { label: "Parliament Square", isCorrect: false, order: 1 },
          { label: "Trafalgar Square", isCorrect: true, order: 2 },
          { label: "Russell Square", isCorrect: false, order: 3 },
          { label: "Leicester Square", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the Duke of Wellington?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Duke of Wellington was a British general who defeated Napoleon at the Battle of Waterloo in 1815.",
        order: 13,
        points: 1,
        options: [
          { label: "A naval commander", isCorrect: false, order: 1 },
          {
            label: "A general who defeated Napoleon",
            isCorrect: true,
            order: 2,
          },
          { label: "A prime minister", isCorrect: false, order: 3 },
          { label: "An explorer", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When was the Battle of Waterloo?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of Waterloo took place in 1815, where Wellington and Blücher defeated Napoleon.",
        order: 14,
        points: 1,
        options: [
          { label: "1805", isCorrect: false, order: 1 },
          { label: "1815", isCorrect: true, order: 2 },
          { label: "1820", isCorrect: false, order: 3 },
          { label: "1825", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Reform Act of 1832?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Reform Act of 1832 increased the number of people who could vote and made the electoral system fairer.",
        order: 15,
        points: 1,
        options: [
          {
            label: "A law about working conditions",
            isCorrect: false,
            order: 1,
          },
          {
            label: "A law increasing voting rights",
            isCorrect: true,
            order: 2,
          },
          { label: "A law about trade", isCorrect: false, order: 3 },
          { label: "A law about education", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the first British Prime Minister?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sir Robert Walpole is generally regarded as the first British Prime Minister, serving from 1721-1742.",
        order: 16,
        points: 1,
        options: [
          { label: "William Pitt", isCorrect: false, order: 1 },
          { label: "Sir Robert Walpole", isCorrect: true, order: 2 },
          { label: "Lord North", isCorrect: false, order: 3 },
          { label: "Earl of Godolphin", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When were the first police forces established?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The first police forces were established in the 19th century, with the Metropolitan Police founded in 1829.",
        order: 17,
        points: 1,
        options: [
          { label: "18th century", isCorrect: false, order: 1 },
          { label: "19th century", isCorrect: true, order: 2 },
          { label: "20th century", isCorrect: false, order: 3 },
          { label: "17th century", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who founded the Metropolitan Police?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sir Robert Peel founded the Metropolitan Police in 1829, and police officers are still sometimes called 'Bobbies' after him.",
        order: 18,
        points: 1,
        options: [
          { label: "Sir Robert Walpole", isCorrect: false, order: 1 },
          { label: "Sir Robert Peel", isCorrect: true, order: 2 },
          { label: "Duke of Wellington", isCorrect: false, order: 3 },
          { label: "Lord Byron", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Free Trade movement?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Free Trade movement wanted to remove restrictions on trade, particularly the Corn Laws that kept food prices high.",
        order: 19,
        points: 1,
        options: [
          { label: "A movement to increase taxes", isCorrect: false, order: 1 },
          {
            label: "A movement to remove trade restrictions",
            isCorrect: true,
            order: 2,
          },
          {
            label: "A movement for workers' rights",
            isCorrect: false,
            order: 3,
          },
          {
            label: "A movement for women's rights",
            isCorrect: false,
            order: 4,
          },
        ],
      },
      {
        stem: "When were the Corn Laws repealed?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Corn Laws were repealed in 1846 by Prime Minister Sir Robert Peel, allowing free trade in grain.",
        order: 20,
        points: 1,
        options: [
          { label: "1840", isCorrect: false, order: 1 },
          { label: "1846", isCorrect: true, order: 2 },
          { label: "1850", isCorrect: false, order: 3 },
          { label: "1855", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Crimean War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Crimean War (1853-1856) was fought between Britain, France, and Turkey against Russia.",
        order: 21,
        points: 1,
        options: [
          { label: "A war against France", isCorrect: false, order: 1 },
          { label: "A war against Russia", isCorrect: true, order: 2 },
          { label: "A war against Germany", isCorrect: false, order: 3 },
          { label: "A civil war", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Florence Nightingale?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Florence Nightingale was a nurse who improved medical care during the Crimean War and founded modern nursing.",
        order: 22,
        points: 1,
        options: [
          { label: "A doctor", isCorrect: false, order: 1 },
          { label: "A nurse", isCorrect: true, order: 2 },
          { label: "A teacher", isCorrect: false, order: 3 },
          { label: "A politician", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When was the Indian Mutiny?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Indian Mutiny (Indian Rebellion) occurred in 1857 against British rule in India.",
        order: 23,
        points: 1,
        options: [
          { label: "1855", isCorrect: false, order: 1 },
          { label: "1857", isCorrect: true, order: 2 },
          { label: "1860", isCorrect: false, order: 3 },
          { label: "1865", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the British Empire's largest colony?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "India was the largest and most important colony of the British Empire, often called 'the jewel in the crown'.",
        order: 24,
        points: 1,
        options: [
          { label: "Canada", isCorrect: false, order: 1 },
          { label: "India", isCorrect: true, order: 2 },
          { label: "Australia", isCorrect: false, order: 3 },
          { label: "South Africa", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-4",
    title: "Life in the UK Test 4",
    description:
      "Official practice test covering 20th century Britain and World Wars - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "When did the First World War begin?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The First World War began in 1914 and lasted until 1918.",
        order: 1,
        points: 1,
        options: [
          { label: "1912", isCorrect: false, order: 1 },
          { label: "1914", isCorrect: true, order: 2 },
          { label: "1916", isCorrect: false, order: 3 },
          { label: "1918", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What event triggered the First World War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The assassination of Archduke Franz Ferdinand in Sarajevo in 1914 triggered the First World War.",
        order: 2,
        points: 1,
        options: [
          { label: "Invasion of Belgium", isCorrect: false, order: 1 },
          {
            label: "Assassination of Archduke Franz Ferdinand",
            isCorrect: true,
            order: 2,
          },
          { label: "Sinking of the Lusitania", isCorrect: false, order: 3 },
          { label: "German submarine attacks", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which countries fought alongside Britain in WWI?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "France, Russia, and later the USA fought alongside Britain against Germany, Austria-Hungary, and Turkey.",
        order: 3,
        points: 1,
        options: [
          { label: "France, Russia, and the USA", isCorrect: true, order: 1 },
          { label: "Germany and Austria", isCorrect: false, order: 2 },
          { label: "Italy and Japan", isCorrect: false, order: 3 },
          { label: "Spain and Portugal", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Battle of the Somme?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of the Somme (1916) was a major WWI battle where 60,000 British soldiers were killed or wounded on the first day.",
        order: 4,
        points: 1,
        options: [
          { label: "A naval battle", isCorrect: false, order: 1 },
          { label: "A major land battle in France", isCorrect: true, order: 2 },
          { label: "An air battle", isCorrect: false, order: 3 },
          { label: "A battle in Germany", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did women get the vote in Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Women over 30 got the vote in 1918, and all women over 21 got equal voting rights in 1928.",
        order: 5,
        points: 1,
        options: [
          { label: "1918 and 1928", isCorrect: true, order: 1 },
          { label: "1920 and 1930", isCorrect: false, order: 2 },
          { label: "1915 and 1925", isCorrect: false, order: 3 },
          { label: "1922 and 1932", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who were the Suffragettes?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Suffragettes were women who campaigned for the right to vote, led by Emmeline Pankhurst.",
        order: 6,
        points: 1,
        options: [
          {
            label: "Women campaigning for the vote",
            isCorrect: true,
            order: 1,
          },
          { label: "Women working in factories", isCorrect: false, order: 2 },
          {
            label: "Women serving in the military",
            isCorrect: false,
            order: 3,
          },
          { label: "Women in Parliament", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Easter Rising?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Easter Rising was an armed rebellion in Dublin in 1916 by Irish republicans seeking independence from Britain.",
        order: 7,
        points: 1,
        options: [
          { label: "A religious celebration", isCorrect: false, order: 1 },
          { label: "An Irish rebellion in 1916", isCorrect: true, order: 2 },
          { label: "A workers' strike", isCorrect: false, order: 3 },
          { label: "A political party", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did Ireland become independent?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Ireland was partitioned in 1921, with the Irish Free State becoming independent while Northern Ireland remained part of the UK.",
        order: 8,
        points: 1,
        options: [
          { label: "1916", isCorrect: false, order: 1 },
          { label: "1921", isCorrect: true, order: 2 },
          { label: "1925", isCorrect: false, order: 3 },
          { label: "1930", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the General Strike?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The General Strike of 1926 was when millions of workers stopped work in support of coal miners' pay and conditions.",
        order: 9,
        points: 1,
        options: [
          { label: "A military action", isCorrect: false, order: 1 },
          { label: "A workers' strike in 1926", isCorrect: true, order: 2 },
          { label: "A political revolution", isCorrect: false, order: 3 },
          { label: "A trade agreement", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Great Depression?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Depression was a severe economic downturn in the 1930s that caused mass unemployment worldwide.",
        order: 10,
        points: 1,
        options: [
          { label: "A war", isCorrect: false, order: 1 },
          {
            label: "An economic downturn in the 1930s",
            isCorrect: true,
            order: 2,
          },
          { label: "A natural disaster", isCorrect: false, order: 3 },
          { label: "A political crisis", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did the Second World War begin?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Second World War began in 1939 when Germany invaded Poland, prompting Britain and France to declare war.",
        order: 11,
        points: 1,
        options: [
          { label: "1937", isCorrect: false, order: 1 },
          { label: "1939", isCorrect: true, order: 2 },
          { label: "1940", isCorrect: false, order: 3 },
          { label: "1941", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Prime Minister during most of WWII?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Winston Churchill was Prime Minister during most of WWII, leading Britain from 1940 to 1945.",
        order: 12,
        points: 1,
        options: [
          { label: "Neville Chamberlain", isCorrect: false, order: 1 },
          { label: "Winston Churchill", isCorrect: true, order: 2 },
          { label: "Clement Attlee", isCorrect: false, order: 3 },
          { label: "Stanley Baldwin", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Battle of Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of Britain (1940) was an air battle when the RAF defended Britain against German air attacks.",
        order: 13,
        points: 1,
        options: [
          { label: "A naval battle", isCorrect: false, order: 1 },
          { label: "An air battle in 1940", isCorrect: true, order: 2 },
          { label: "A land battle", isCorrect: false, order: 3 },
          { label: "A submarine battle", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Blitz?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Blitz was the German bombing campaign against British cities during WWII, particularly London.",
        order: 14,
        points: 1,
        options: [
          { label: "A British military operation", isCorrect: false, order: 1 },
          {
            label: "German bombing of British cities",
            isCorrect: true,
            order: 2,
          },
          { label: "A naval blockade", isCorrect: false, order: 3 },
          { label: "A propaganda campaign", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did the USA join WWII?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The USA joined WWII in 1941 after the attack on Pearl Harbor by Japan.",
        order: 15,
        points: 1,
        options: [
          { label: "1939", isCorrect: false, order: 1 },
          { label: "1941", isCorrect: true, order: 2 },
          { label: "1942", isCorrect: false, order: 3 },
          { label: "1943", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was D-Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "D-Day (6 June 1944) was the Allied invasion of Nazi-occupied France, beginning the liberation of Western Europe.",
        order: 16,
        points: 1,
        options: [
          { label: "The end of the war", isCorrect: false, order: 1 },
          { label: "The Allied invasion of France", isCorrect: true, order: 2 },
          { label: "The bombing of Germany", isCorrect: false, order: 3 },
          { label: "The surrender of Italy", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did WWII end in Europe?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "WWII ended in Europe on 8 May 1945 (VE Day) when Germany surrendered.",
        order: 17,
        points: 1,
        options: [
          { label: "May 1944", isCorrect: false, order: 1 },
          { label: "May 1945", isCorrect: true, order: 2 },
          { label: "June 1945", isCorrect: false, order: 3 },
          { label: "August 1945", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What does VE Day stand for?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "VE Day stands for Victory in Europe Day, celebrating the end of WWII in Europe on 8 May 1945.",
        order: 18,
        points: 1,
        options: [
          { label: "Victory in England Day", isCorrect: false, order: 1 },
          { label: "Victory in Europe Day", isCorrect: true, order: 2 },
          { label: "Victory over Evil Day", isCorrect: false, order: 3 },
          { label: "Veterans' Equality Day", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the welfare state?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The welfare state was a system of social security introduced after WWII to provide healthcare, education, and benefits.",
        order: 19,
        points: 1,
        options: [
          { label: "A system of government", isCorrect: false, order: 1 },
          { label: "A system of social security", isCorrect: true, order: 2 },
          { label: "A military alliance", isCorrect: false, order: 3 },
          { label: "An economic policy", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who introduced the NHS?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The NHS was introduced by the Labour government in 1948, with Aneurin Bevan as Health Minister.",
        order: 20,
        points: 1,
        options: [
          { label: "Winston Churchill", isCorrect: false, order: 1 },
          { label: "Aneurin Bevan", isCorrect: true, order: 2 },
          { label: "Clement Attlee", isCorrect: false, order: 3 },
          { label: "William Beveridge", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When was the NHS established?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The National Health Service (NHS) was established in 1948, providing free healthcare for all.",
        order: 21,
        points: 1,
        options: [
          { label: "1946", isCorrect: false, order: 1 },
          { label: "1948", isCorrect: true, order: 2 },
          { label: "1950", isCorrect: false, order: 3 },
          { label: "1952", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was rationing?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Rationing was a system during and after WWII that limited the amount of food and goods people could buy.",
        order: 22,
        points: 1,
        options: [
          { label: "A tax system", isCorrect: false, order: 1 },
          {
            label: "A system limiting food and goods",
            isCorrect: true,
            order: 2,
          },
          { label: "A voting system", isCorrect: false, order: 3 },
          { label: "A military system", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did rationing end?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Food rationing ended in 1954, nearly a decade after WWII ended.",
        order: 23,
        points: 1,
        options: [
          { label: "1950", isCorrect: false, order: 1 },
          { label: "1954", isCorrect: true, order: 2 },
          { label: "1956", isCorrect: false, order: 3 },
          { label: "1960", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Festival of Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Festival of Britain in 1951 celebrated British achievements and marked recovery from WWII.",
        order: 24,
        points: 1,
        options: [
          { label: "A music festival", isCorrect: false, order: 1 },
          {
            label: "A celebration of British achievements",
            isCorrect: true,
            order: 2,
          },
          { label: "A political rally", isCorrect: false, order: 3 },
          { label: "A religious event", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-5",
    title: "Life in the UK Test 5",
    description:
      "Official practice test covering modern Britain and contemporary society - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "Who was the first woman Prime Minister of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Margaret Thatcher was the first woman Prime Minister, serving from 1979 to 1990.",
        order: 1,
        points: 1,
        options: [
          { label: "Margaret Thatcher", isCorrect: true, order: 1 },
          { label: "Theresa May", isCorrect: false, order: 2 },
          { label: "Liz Truss", isCorrect: false, order: 3 },
          { label: "Tony Blair", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did the UK join the European Economic Community (EEC)?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The UK joined the EEC (now EU) in 1973 under Prime Minister Edward Heath.",
        order: 2,
        points: 1,
        options: [
          { label: "1970", isCorrect: false, order: 1 },
          { label: "1973", isCorrect: true, order: 2 },
          { label: "1975", isCorrect: false, order: 3 },
          { label: "1979", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the minimum age to serve on a jury in England, Wales, and Northern Ireland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The minimum age to serve on a jury is 18 years old in England, Wales, and Northern Ireland.",
        order: 3,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "18", isCorrect: true, order: 2 },
          { label: "21", isCorrect: false, order: 3 },
          { label: "25", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which of these is a British overseas territory?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St Helena is a British overseas territory in the South Atlantic Ocean.",
        order: 4,
        points: 1,
        options: [
          { label: "Malta", isCorrect: false, order: 1 },
          { label: "St Helena", isCorrect: true, order: 2 },
          { label: "Cyprus", isCorrect: false, order: 3 },
          { label: "Hong Kong", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What percentage of the UK population has a disability?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Approximately 19% of the UK population has a disability or long-term health condition.",
        order: 5,
        points: 1,
        options: [
          { label: "10%", isCorrect: false, order: 1 },
          { label: "19%", isCorrect: true, order: 2 },
          { label: "25%", isCorrect: false, order: 3 },
          { label: "30%", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the maximum amount of time you can be held by police without being charged?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Generally, police can hold you for up to 24 hours without charge, though this can be extended in certain circumstances.",
        order: 6,
        points: 1,
        options: [
          { label: "12 hours", isCorrect: false, order: 1 },
          { label: "24 hours", isCorrect: true, order: 2 },
          { label: "48 hours", isCorrect: false, order: 3 },
          { label: "72 hours", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which flower is associated with England?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The rose is the national flower of England, particularly the red rose associated with the House of Lancaster.",
        order: 7,
        points: 1,
        options: [
          { label: "Daffodil", isCorrect: false, order: 1 },
          { label: "Rose", isCorrect: true, order: 2 },
          { label: "Thistle", isCorrect: false, order: 3 },
          { label: "Shamrock", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the currency of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The pound sterling (£) is the official currency of the United Kingdom.",
        order: 8,
        points: 1,
        options: [
          { label: "Euro", isCorrect: false, order: 1 },
          { label: "Pound sterling", isCorrect: true, order: 2 },
          { label: "Dollar", isCorrect: false, order: 3 },
          { label: "Franc", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the population of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The UK population is approximately 67 million people as of recent estimates.",
        order: 9,
        points: 1,
        options: [
          { label: "60 million", isCorrect: false, order: 1 },
          { label: "67 million", isCorrect: true, order: 2 },
          { label: "75 million", isCorrect: false, order: 3 },
          { label: "80 million", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Church of England also known as?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Church of England is also known as the Anglican Church.",
        order: 10,
        points: 1,
        options: [
          { label: "Presbyterian Church", isCorrect: false, order: 1 },
          { label: "Anglican Church", isCorrect: true, order: 2 },
          { label: "Methodist Church", isCorrect: false, order: 3 },
          { label: "Baptist Church", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is Christmas Day celebrated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Christmas Day is celebrated on 25 December each year in the UK.",
        order: 11,
        points: 1,
        options: [
          { label: "24 December", isCorrect: false, order: 1 },
          { label: "25 December", isCorrect: true, order: 2 },
          { label: "26 December", isCorrect: false, order: 3 },
          { label: "1 January", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the minimum age to vote in UK elections?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The minimum age to vote in UK elections is 18 years old.",
        order: 12,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "18", isCorrect: true, order: 2 },
          { label: "21", isCorrect: false, order: 3 },
          { label: "25", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What do the letters BBC stand for?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "BBC stands for British Broadcasting Corporation, the UK's public service broadcaster.",
        order: 13,
        points: 1,
        options: [
          {
            label: "British Broadcasting Corporation",
            isCorrect: true,
            order: 1,
          },
          { label: "British Business Corporation", isCorrect: false, order: 2 },
          { label: "British Book Company", isCorrect: false, order: 3 },
          { label: "British Banking Corporation", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which is the longest river in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The River Severn is the longest river in the UK, flowing for 220 miles (354 km).",
        order: 14,
        points: 1,
        options: [
          { label: "River Thames", isCorrect: false, order: 1 },
          { label: "River Severn", isCorrect: true, order: 2 },
          { label: "River Trent", isCorrect: false, order: 3 },
          { label: "River Mersey", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the name of the British flag?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The British flag is called the Union Flag or Union Jack.",
        order: 15,
        points: 1,
        options: [
          { label: "St George's Cross", isCorrect: false, order: 1 },
          { label: "Union Jack", isCorrect: true, order: 2 },
          { label: "Royal Standard", isCorrect: false, order: 3 },
          { label: "Red Ensign", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many countries make up the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Four countries make up the UK: England, Scotland, Wales, and Northern Ireland.",
        order: 16,
        points: 1,
        options: [
          { label: "Three", isCorrect: false, order: 1 },
          { label: "Four", isCorrect: true, order: 2 },
          { label: "Five", isCorrect: false, order: 3 },
          { label: "Six", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the highest mountain in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Ben Nevis in Scotland is the highest mountain in the UK at 1,345 metres (4,413 feet).",
        order: 17,
        points: 1,
        options: [
          { label: "Snowdon", isCorrect: false, order: 1 },
          { label: "Ben Nevis", isCorrect: true, order: 2 },
          { label: "Scafell Pike", isCorrect: false, order: 3 },
          { label: "Helvellyn", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which city is known as the 'Second City' of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Birmingham is often referred to as the UK's 'Second City' due to its size and economic importance.",
        order: 18,
        points: 1,
        options: [
          { label: "Manchester", isCorrect: false, order: 1 },
          { label: "Birmingham", isCorrect: true, order: 2 },
          { label: "Liverpool", isCorrect: false, order: 3 },
          { label: "Glasgow", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the most popular sport in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Football (soccer) is the most popular sport in the UK, with millions of fans and players.",
        order: 19,
        points: 1,
        options: [
          { label: "Cricket", isCorrect: false, order: 1 },
          { label: "Football", isCorrect: true, order: 2 },
          { label: "Rugby", isCorrect: false, order: 3 },
          { label: "Tennis", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is Burns Night celebrated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Burns Night is celebrated on 25 January each year to honor the Scottish poet Robert Burns.",
        order: 20,
        points: 1,
        options: [
          { label: "25 January", isCorrect: true, order: 1 },
          { label: "1 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the famous tennis tournament held in London?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Wimbledon is the famous tennis tournament held in London every summer.",
        order: 21,
        points: 1,
        options: [
          { label: "Wimbledon", isCorrect: true, order: 1 },
          { label: "Queen's Club", isCorrect: false, order: 2 },
          { label: "Eastbourne", isCorrect: false, order: 3 },
          { label: "Birmingham Classic", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the traditional Sunday lunch in Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sunday roast is the traditional British Sunday lunch, typically featuring roasted meat with vegetables.",
        order: 22,
        points: 1,
        options: [
          { label: "Fish and chips", isCorrect: false, order: 1 },
          { label: "Sunday roast", isCorrect: true, order: 2 },
          { label: "Shepherd's pie", isCorrect: false, order: 3 },
          { label: "Bangers and mash", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What does 'Boxing Day' commemorate?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Boxing Day (26 December) traditionally commemorated giving gifts to servants and the poor.",
        order: 23,
        points: 1,
        options: [
          { label: "A boxing match", isCorrect: false, order: 1 },
          { label: "Giving gifts to servants", isCorrect: true, order: 2 },
          { label: "Opening gift boxes", isCorrect: false, order: 3 },
          { label: "A religious ceremony", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the capital of Scotland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Edinburgh is the capital city of Scotland and home to the Scottish Parliament.",
        order: 24,
        points: 1,
        options: [
          { label: "Glasgow", isCorrect: false, order: 1 },
          { label: "Edinburgh", isCorrect: true, order: 2 },
          { label: "Aberdeen", isCorrect: false, order: 3 },
          { label: "Dundee", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-6",
    title: "Life in the UK Test 6",
    description:
      "Official practice test covering British government, law, and citizenship - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "How often are general elections held in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "General elections must be held at least every 5 years, though they can be called earlier.",
        order: 1,
        points: 1,
        options: [
          { label: "Every 3 years", isCorrect: false, order: 1 },
          { label: "Every 5 years", isCorrect: true, order: 2 },
          { label: "Every 7 years", isCorrect: false, order: 3 },
          { label: "Every 10 years", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the House of Commons?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The House of Commons is the lower house of Parliament where elected MPs (Members of Parliament) sit.",
        order: 2,
        points: 1,
        options: [
          {
            label: "The upper house of Parliament",
            isCorrect: false,
            order: 1,
          },
          { label: "The lower house of Parliament", isCorrect: true, order: 2 },
          { label: "The royal palace", isCorrect: false, order: 3 },
          { label: "The supreme court", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the House of Lords?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The House of Lords is the upper house of Parliament, made up of appointed members and hereditary peers.",
        order: 3,
        points: 1,
        options: [
          {
            label: "The lower house of Parliament",
            isCorrect: false,
            order: 1,
          },
          { label: "The upper house of Parliament", isCorrect: true, order: 2 },
          { label: "The government cabinet", isCorrect: false, order: 3 },
          { label: "The civil service", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who is the head of the UK government?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Prime Minister is the head of the UK government and leads the party with the most MPs.",
        order: 4,
        points: 1,
        options: [
          { label: "The Queen", isCorrect: false, order: 1 },
          { label: "The Prime Minister", isCorrect: true, order: 2 },
          { label: "The Speaker", isCorrect: false, order: 3 },
          { label: "The Lord Chancellor", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who is the head of state in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The monarch (currently King Charles III) is the head of state in the UK.",
        order: 5,
        points: 1,
        options: [
          { label: "The Prime Minister", isCorrect: false, order: 1 },
          { label: "The monarch", isCorrect: true, order: 2 },
          { label: "The Speaker", isCorrect: false, order: 3 },
          { label: "The Archbishop", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Speaker's role in the House of Commons?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Speaker chairs debates in the House of Commons and keeps order during parliamentary proceedings.",
        order: 6,
        points: 1,
        options: [
          { label: "To represent the government", isCorrect: false, order: 1 },
          {
            label: "To chair debates and keep order",
            isCorrect: true,
            order: 2,
          },
          { label: "To write laws", isCorrect: false, order: 3 },
          { label: "To judge court cases", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the cabinet?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The cabinet is a group of the most senior government ministers, chosen by the Prime Minister.",
        order: 7,
        points: 1,
        options: [
          { label: "All Members of Parliament", isCorrect: false, order: 1 },
          { label: "Senior government ministers", isCorrect: true, order: 2 },
          { label: "Civil servants", isCorrect: false, order: 3 },
          { label: "Local councillors", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the opposition?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The opposition is the political party with the second largest number of MPs, led by the Leader of the Opposition.",
        order: 8,
        points: 1,
        options: [
          { label: "Government critics", isCorrect: false, order: 1 },
          {
            label: "The second largest political party",
            isCorrect: true,
            order: 2,
          },
          { label: "Independent MPs", isCorrect: false, order: 3 },
          { label: "The House of Lords", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the civil service?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The civil service consists of politically neutral government employees who work for any government.",
        order: 9,
        points: 1,
        options: [
          { label: "Elected politicians", isCorrect: false, order: 1 },
          {
            label: "Politically neutral government employees",
            isCorrect: true,
            order: 2,
          },
          { label: "Members of Parliament", isCorrect: false, order: 3 },
          { label: "Local government workers", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is devolution?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Devolution is the transfer of powers from central government to Scotland, Wales, and Northern Ireland.",
        order: 10,
        points: 1,
        options: [
          { label: "Independence from the UK", isCorrect: false, order: 1 },
          {
            label:
              "Transfer of powers to Scotland, Wales, and Northern Ireland",
            isCorrect: true,
            order: 2,
          },
          { label: "Local government reform", isCorrect: false, order: 3 },
          { label: "Constitutional monarchy", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the role of magistrates?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Magistrates are volunteers who judge minor criminal cases and some civil matters in local courts.",
        order: 11,
        points: 1,
        options: [
          { label: "To arrest criminals", isCorrect: false, order: 1 },
          { label: "To judge minor criminal cases", isCorrect: true, order: 2 },
          { label: "To make laws", isCorrect: false, order: 3 },
          { label: "To defend accused people", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Crown Court?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Crown Court deals with serious criminal cases and is presided over by judges and juries.",
        order: 12,
        points: 1,
        options: [
          { label: "A civil court", isCorrect: false, order: 1 },
          {
            label: "A court for serious criminal cases",
            isCorrect: true,
            order: 2,
          },
          { label: "A family court", isCorrect: false, order: 3 },
          { label: "An appeals court", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the role of a jury?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "A jury listens to evidence in court and decides whether someone is guilty or innocent.",
        order: 13,
        points: 1,
        options: [
          { label: "To arrest suspects", isCorrect: false, order: 1 },
          { label: "To decide guilt or innocence", isCorrect: true, order: 2 },
          { label: "To sentence criminals", isCorrect: false, order: 3 },
          { label: "To investigate crimes", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many people are there in a jury?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "A jury consists of 12 people in England, Wales, and Northern Ireland, and 15 in Scotland.",
        order: 14,
        points: 1,
        options: [
          { label: "10", isCorrect: false, order: 1 },
          { label: "12", isCorrect: true, order: 2 },
          { label: "15", isCorrect: false, order: 3 },
          { label: "20", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the role of the police?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The police protect life and property, maintain order, prevent crime, and detect criminals.",
        order: 15,
        points: 1,
        options: [
          { label: "To make laws", isCorrect: false, order: 1 },
          {
            label: "To protect life and property, maintain order",
            isCorrect: true,
            order: 2,
          },
          { label: "To judge court cases", isCorrect: false, order: 3 },
          { label: "To run the government", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is council tax?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Council tax is a local tax paid to fund local government services like education, social services, and waste collection.",
        order: 16,
        points: 1,
        options: [
          { label: "A national tax", isCorrect: false, order: 1 },
          {
            label: "A local tax for local services",
            isCorrect: true,
            order: 2,
          },
          { label: "A business tax", isCorrect: false, order: 3 },
          { label: "A property purchase tax", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is income tax?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Income tax is a tax paid on earnings from employment and other sources of income.",
        order: 17,
        points: 1,
        options: [
          { label: "A tax on property", isCorrect: false, order: 1 },
          { label: "A tax on earnings", isCorrect: true, order: 2 },
          { label: "A tax on purchases", isCorrect: false, order: 3 },
          { label: "A tax on inheritance", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is National Insurance?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "National Insurance is a system of contributions that provides benefits like pensions, unemployment benefits, and healthcare.",
        order: 18,
        points: 1,
        options: [
          { label: "Private health insurance", isCorrect: false, order: 1 },
          {
            label: "A system providing benefits and pensions",
            isCorrect: true,
            order: 2,
          },
          { label: "Car insurance", isCorrect: false, order: 3 },
          { label: "House insurance", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "From what age can you drive a car in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "You can drive a car in the UK from age 17, but must have a valid driving licence and insurance.",
        order: 19,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "17", isCorrect: true, order: 2 },
          { label: "18", isCorrect: false, order: 3 },
          { label: "21", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the legal drinking age in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The legal drinking age in the UK is 18, though 16-17 year olds can drink wine, beer, or cider with a meal.",
        order: 20,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "18", isCorrect: true, order: 2 },
          { label: "21", isCorrect: false, order: 3 },
          { label: "25", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the age of criminal responsibility in England, Wales, and Northern Ireland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The age of criminal responsibility is 10 in England, Wales, and Northern Ireland, meaning children can be charged with crimes from this age.",
        order: 21,
        points: 1,
        options: [
          { label: "8", isCorrect: false, order: 1 },
          { label: "10", isCorrect: true, order: 2 },
          { label: "12", isCorrect: false, order: 3 },
          { label: "14", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is domestic violence?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Domestic violence is threatening behaviour, violence, or abuse between adults who are or have been in a relationship.",
        order: 22,
        points: 1,
        options: [
          { label: "Violence in public places", isCorrect: false, order: 1 },
          {
            label: "Violence between people in relationships",
            isCorrect: true,
            order: 2,
          },
          { label: "Violence against property", isCorrect: false, order: 3 },
          { label: "Violence at work", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is forced marriage?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Forced marriage is when someone is married against their will and is illegal in the UK.",
        order: 23,
        points: 1,
        options: [
          { label: "An arranged marriage", isCorrect: false, order: 1 },
          {
            label: "Marriage against someone's will",
            isCorrect: true,
            order: 2,
          },
          { label: "A civil partnership", isCorrect: false, order: 3 },
          { label: "A religious ceremony", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is female genital mutilation (FGM)?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Female genital mutilation (FGM) is the practice of cutting female genitals and is illegal in the UK.",
        order: 24,
        points: 1,
        options: [
          { label: "A medical procedure", isCorrect: false, order: 1 },
          {
            label: "An illegal practice of cutting female genitals",
            isCorrect: true,
            order: 2,
          },
          { label: "A religious ceremony", isCorrect: false, order: 3 },
          { label: "A cultural tradition", isCorrect: false, order: 4 },
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
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const testUser = await prisma.user.upsert({
      where: { email: "admin@testtutor.com" },
      update: {},
      create: {
        email: "admin@testtutor.com",
        name: "Test Admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Created/found user: Test Admin");

    // Create a regular test user
    const regularUserPassword = await bcrypt.hash("user123", 10);
    const regularUser = await prisma.user.upsert({
      where: { email: "user@testtutor.com" },
      update: {},
      create: {
        email: "user@testtutor.com",
        name: "Test User",
        password: regularUserPassword,
        role: "USER",
      },
    });

    console.log("✅ Created/found user: Test User");

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

    // Create Driving Theory domain
    const drivingTheoryDomain = await prisma.domain.upsert({
      where: { name: "driving-theory" },
      update: {},
      create: {
        name: "driving-theory",
        displayName: "Driving Theory",
        description: "UK Driving Theory Test preparation",
        icon: "🚗",
        config: {
          timeLimit: 57,
          passPercentage: 86,
          difficulty: "medium",
        },
      },
    });

    console.log("✅ Created/found domain: Driving Theory");

    // Create driving theory tests
    const drivingTheoryTests = [
      {
        id: "driving-theory-test-1",
        title: "Driving Theory Practice Test 1",
        description:
          "Official DVSA practice test covering highway code, road signs, and safe driving",
        timeLimit: 57,
        passPercentage: 86,
        questions: [
          {
            stem: "What should you do when you see a red traffic light?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "A red traffic light means you must stop completely and wait until the light turns green.",
            order: 1,
            points: 1,
            options: [
              { label: "Slow down", isCorrect: false, order: 1 },
              { label: "Stop completely", isCorrect: true, order: 2 },
              { label: "Proceed with caution", isCorrect: false, order: 3 },
              {
                label: "Speed up to clear intersection",
                isCorrect: false,
                order: 4,
              },
            ],
          },
          {
            stem: "What is the national speed limit on a single carriageway?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "The national speed limit on single carriageways is 60 mph for cars.",
            order: 2,
            points: 1,
            options: [
              { label: "50 mph", isCorrect: false, order: 1 },
              { label: "60 mph", isCorrect: true, order: 2 },
              { label: "70 mph", isCorrect: false, order: 3 },
              { label: "80 mph", isCorrect: false, order: 4 },
            ],
          },
          {
            stem: "When must you use headlights?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "You must use headlights at night, in poor visibility conditions, and when it's raining to ensure you can see and be seen.",
            order: 3,
            points: 1,
            options: [
              { label: "Only at night", isCorrect: false, order: 1 },
              { label: "In poor visibility", isCorrect: false, order: 2 },
              { label: "When it's raining", isCorrect: false, order: 3 },
              { label: "All of the above", isCorrect: true, order: 4 },
            ],
          },
          {
            stem: "What does a triangular road sign indicate?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "Triangular road signs indicate warnings of potential hazards ahead.",
            order: 4,
            points: 1,
            options: [
              { label: "Information", isCorrect: false, order: 1 },
              { label: "Warning", isCorrect: true, order: 2 },
              { label: "Prohibition", isCorrect: false, order: 3 },
              { label: "Mandatory instruction", isCorrect: false, order: 4 },
            ],
          },
          {
            stem: "What is the minimum stopping distance at 30 mph?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "At 30 mph, the minimum stopping distance is 23 metres (9m thinking distance + 14m braking distance).",
            order: 5,
            points: 1,
            options: [
              { label: "23 metres", isCorrect: true, order: 1 },
              { label: "36 metres", isCorrect: false, order: 2 },
              { label: "53 metres", isCorrect: false, order: 3 },
              { label: "73 metres", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        id: "driving-theory-test-2",
        title: "Driving Theory Practice Test 2",
        description:
          "Additional practice covering hazard perception and traffic rules",
        timeLimit: 57,
        passPercentage: 86,
        questions: [
          {
            stem: "When approaching a roundabout, which lane should you use to turn right?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "When turning right at a roundabout, you should use the right-hand lane and signal right.",
            order: 1,
            points: 1,
            options: [
              { label: "Left lane", isCorrect: false, order: 1 },
              { label: "Right lane", isCorrect: true, order: 2 },
              { label: "Either lane", isCorrect: false, order: 3 },
              { label: "Middle lane only", isCorrect: false, order: 4 },
            ],
          },
          {
            stem: "What should you do if your vehicle starts to skid?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "If your vehicle skids, ease off the accelerator and steer gently into the direction of the skid.",
            order: 2,
            points: 1,
            options: [
              { label: "Brake hard", isCorrect: false, order: 1 },
              { label: "Steer away from the skid", isCorrect: false, order: 2 },
              {
                label: "Ease off accelerator and steer into the skid",
                isCorrect: true,
                order: 3,
              },
              {
                label: "Accelerate out of the skid",
                isCorrect: false,
                order: 4,
              },
            ],
          },
          {
            stem: "What is the legal minimum tread depth for car tyres?",
            type: "SINGLE_CHOICE" as const,
            explanation:
              "The legal minimum tread depth for car tyres in the UK is 1.6mm across the central three-quarters of the tyre.",
            order: 3,
            points: 1,
            options: [
              { label: "1.0mm", isCorrect: false, order: 1 },
              { label: "1.6mm", isCorrect: true, order: 2 },
              { label: "2.0mm", isCorrect: false, order: 3 },
              { label: "3.0mm", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ];

    // Create driving theory tests
    for (const testData of drivingTheoryTests) {
      console.log(`📝 Creating driving theory test: ${testData.title}`);

      const test = await prisma.test.create({
        data: {
          id: testData.id,
          title: testData.title,
          description: testData.description,
          domainId: drivingTheoryDomain.id,
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
            difficulty: "MEDIUM",
            tags: "driving-theory",
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
      `📊 Created ${comprehensiveLifeInUKTests.length} Life in UK tests and ${drivingTheoryTests.length} Driving Theory tests`
    );
    console.log(
      `📈 Total Life in UK questions: ${comprehensiveLifeInUKTests.reduce((total, test) => total + test.questions.length, 0)}`
    );
    console.log(
      `📈 Total Driving Theory questions: ${drivingTheoryTests.reduce((total, test) => total + test.questions.length, 0)}`
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
