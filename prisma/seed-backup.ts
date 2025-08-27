import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lifeInUKTests = [
  {
    id: "life-uk-test-1",
    title: "Life in the UK Test 1",
    description:
      "Official practice test covering British history, culture, and government - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
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
      {
        stem: "Where did the Romans first land in Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Julius Caesar first landed in Britain in 55 BC, followed by a more successful invasion in 54 BC.",
        order: 3,
        points: 1,
        options: [
          { label: "Dover", isCorrect: true, order: 1 },
          { label: "Portsmouth", isCorrect: false, order: 2 },
          { label: "Brighton", isCorrect: false, order: 3 },
          { label: "Hastings", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Boudicca?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Boudicca was a queen of the Iceni tribe who led a revolt against Roman rule in AD 60-61.",
        order: 4,
        points: 1,
        options: [
          { label: "A Roman general", isCorrect: false, order: 1 },
          { label: "A queen who fought the Romans", isCorrect: true, order: 2 },
          { label: "A Celtic goddess", isCorrect: false, order: 3 },
          { label: "An Anglo-Saxon princess", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What did the Romans build to keep out the Picts?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Hadrian's Wall was built by the Romans around AD 122 to defend against the Picts from Scotland.",
        order: 5,
        points: 1,
        options: [
          { label: "Offa's Dyke", isCorrect: false, order: 1 },
          { label: "Hadrian's Wall", isCorrect: true, order: 2 },
          { label: "The London Wall", isCorrect: false, order: 3 },
          { label: "The Great Wall", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which peoples invaded Britain in the 5th and 6th centuries?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Jutes, Angles, and Saxons invaded Britain after the Romans left, establishing Anglo-Saxon kingdoms.",
        order: 6,
        points: 1,
        options: [
          { label: "Vikings and Danes", isCorrect: false, order: 1 },
          { label: "Jutes, Angles and Saxons", isCorrect: true, order: 2 },
          { label: "Normans and French", isCorrect: false, order: 3 },
          { label: "Celts and Picts", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What language did the Anglo-Saxons speak?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Anglo-Saxons spoke Anglo-Saxon or Old English, which forms the basis of modern English.",
        order: 7,
        points: 1,
        options: [
          { label: "Latin", isCorrect: false, order: 1 },
          { label: "Anglo-Saxon (Old English)", isCorrect: true, order: 2 },
          { label: "Celtic", isCorrect: false, order: 3 },
          { label: "Norse", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the first Archbishop of Canterbury?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St Augustine became the first Archbishop of Canterbury in AD 597, sent by Pope Gregory to convert the Anglo-Saxons.",
        order: 8,
        points: 1,
        options: [
          { label: "St Patrick", isCorrect: false, order: 1 },
          { label: "St Augustine", isCorrect: true, order: 2 },
          { label: "St Columba", isCorrect: false, order: 3 },
          { label: "St David", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which century did the Vikings first raid Britain?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Vikings first raided Britain in AD 789, with the famous raid on Lindisfarne in AD 793.",
        order: 9,
        points: 1,
        options: [
          { label: "7th century", isCorrect: false, order: 1 },
          { label: "8th century", isCorrect: true, order: 2 },
          { label: "9th century", isCorrect: false, order: 3 },
          { label: "10th century", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was Alfred the Great?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Alfred the Great was King of Wessex from 871-899, known for defending against the Vikings and promoting learning.",
        order: 10,
        points: 1,
        options: [
          { label: "A Viking leader", isCorrect: false, order: 1 },
          { label: "King of Wessex", isCorrect: true, order: 2 },
          { label: "A Norman duke", isCorrect: false, order: 3 },
          { label: "A Roman emperor", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the Norman Conquest take place?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Norman Conquest occurred in 1066 when William the Conqueror defeated Harold at the Battle of Hastings.",
        order: 11,
        points: 1,
        options: [
          { label: "1065", isCorrect: false, order: 1 },
          { label: "1066", isCorrect: true, order: 2 },
          { label: "1067", isCorrect: false, order: 3 },
          { label: "1068", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Domesday Book?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Domesday Book was a survey of England ordered by William the Conqueror in 1086 to record land ownership.",
        order: 12,
        points: 1,
        options: [
          { label: "A religious text", isCorrect: false, order: 1 },
          { label: "A survey of England", isCorrect: true, order: 2 },
          { label: "A collection of laws", isCorrect: false, order: 3 },
          { label: "A war chronicle", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What type of law did Henry II establish?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry II established common law, a legal system that applied to the whole country rather than local customs.",
        order: 13,
        points: 1,
        options: [
          { label: "Roman law", isCorrect: false, order: 1 },
          { label: "Common law", isCorrect: true, order: 2 },
          { label: "Canon law", isCorrect: false, order: 3 },
          { label: "Viking law", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was murdered in Canterbury Cathedral in 1170?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Thomas Becket, Archbishop of Canterbury, was murdered in 1170 after his conflict with King Henry II.",
        order: 14,
        points: 1,
        options: [
          { label: "Thomas More", isCorrect: false, order: 1 },
          { label: "Thomas Becket", isCorrect: true, order: 2 },
          { label: "Thomas Cranmer", isCorrect: false, order: 3 },
          { label: "Thomas Wolsey", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was Magna Carta agreed?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Magna Carta was agreed in 1215 between King John and his barons, limiting the power of the king.",
        order: 15,
        points: 1,
        options: [
          { label: "1214", isCorrect: false, order: 1 },
          { label: "1215", isCorrect: true, order: 2 },
          { label: "1216", isCorrect: false, order: 3 },
          { label: "1217", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the name of the period of civil war from 1455-1485?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Wars of the Roses (1455-1485) was a series of civil wars between the Houses of Lancaster and York.",
        order: 16,
        points: 1,
        options: [
          { label: "The Hundred Years War", isCorrect: false, order: 1 },
          { label: "The Wars of the Roses", isCorrect: true, order: 2 },
          { label: "The English Civil War", isCorrect: false, order: 3 },
          { label: "The Barons' War", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who won the Battle of Bosworth Field in 1485?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry Tudor (later Henry VII) won the Battle of Bosworth Field in 1485, ending the Wars of the Roses.",
        order: 17,
        points: 1,
        options: [
          { label: "Richard III", isCorrect: false, order: 1 },
          { label: "Henry Tudor", isCorrect: true, order: 2 },
          { label: "Edward IV", isCorrect: false, order: 3 },
          { label: "Henry VI", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many wives did Henry VIII have?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Henry VIII had six wives: Catherine of Aragon, Anne Boleyn, Jane Seymore, Anne of Cleves, Catherine Howard, and Catherine Parr.",
        order: 18,
        points: 1,
        options: [
          { label: "Four", isCorrect: false, order: 1 },
          { label: "Five", isCorrect: false, order: 2 },
          { label: "Six", isCorrect: true, order: 3 },
          { label: "Seven", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the name of the English Reformation?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The English Reformation was when Henry VIII broke away from the Roman Catholic Church and established the Church of England.",
        order: 19,
        points: 1,
        options: [
          { label: "The Great Schism", isCorrect: false, order: 1 },
          { label: "The Protestant Reformation", isCorrect: false, order: 2 },
          { label: "The English Reformation", isCorrect: true, order: 3 },
          { label: "The Counter-Reformation", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the first Elizabeth I's father?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Elizabeth I was the daughter of Henry VIII and his second wife, Anne Boleyn.",
        order: 20,
        points: 1,
        options: [
          { label: "Henry VII", isCorrect: false, order: 1 },
          { label: "Henry VIII", isCorrect: true, order: 2 },
          { label: "Edward VI", isCorrect: false, order: 3 },
          { label: "James I", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the Spanish Armada defeated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Spanish Armada was defeated in 1588 during the reign of Elizabeth I.",
        order: 21,
        points: 1,
        options: [
          { label: "1587", isCorrect: false, order: 1 },
          { label: "1588", isCorrect: true, order: 2 },
          { label: "1589", isCorrect: false, order: 3 },
          { label: "1590", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who wrote Romeo and Juliet?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "William Shakespeare wrote Romeo and Juliet, along with many other famous plays and sonnets during the Elizabethan era.",
        order: 22,
        points: 1,
        options: [
          { label: "Christopher Marlowe", isCorrect: false, order: 1 },
          { label: "William Shakespeare", isCorrect: true, order: 2 },
          { label: "Ben Jonson", isCorrect: false, order: 3 },
          { label: "Francis Bacon", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who succeeded Elizabeth I to the throne?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "James I (James VI of Scotland) succeeded Elizabeth I in 1603, uniting the English and Scottish crowns.",
        order: 23,
        points: 1,
        options: [
          { label: "Charles I", isCorrect: false, order: 1 },
          { label: "James I", isCorrect: true, order: 2 },
          { label: "Henry VIII", isCorrect: false, order: 3 },
          { label: "Mary I", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the Gunpowder Plot take place?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Gunpowder Plot took place in 1605 when Guy Fawkes and other conspirators tried to blow up Parliament.",
        order: 24,
        points: 1,
        options: [
          { label: "1604", isCorrect: false, order: 1 },
          { label: "1605", isCorrect: true, order: 2 },
          { label: "1606", isCorrect: false, order: 3 },
          { label: "1607", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-2",
    title: "Life in the UK Test 2",
    description:
      "Official practice test covering the English Civil War, Industrial Revolution, and modern Britain - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "In which year did the English Civil War begin?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The English Civil War began in 1642 between supporters of King Charles I and Parliament.",
        order: 1,
        points: 1,
        options: [
          { label: "1641", isCorrect: false, order: 1 },
          { label: "1642", isCorrect: true, order: 2 },
          { label: "1643", isCorrect: false, order: 3 },
          { label: "1644", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who led the Parliamentary forces during the Civil War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Oliver Cromwell led the Parliamentary forces and later became Lord Protector of England.",
        order: 2,
        points: 1,
        options: [
          { label: "John Pym", isCorrect: false, order: 1 },
          { label: "Oliver Cromwell", isCorrect: true, order: 2 },
          { label: "Thomas Fairfax", isCorrect: false, order: 3 },
          { label: "John Hampden", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was Charles I executed?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "King Charles I was executed in 1649 after being found guilty of treason by Parliament.",
        order: 3,
        points: 1,
        options: [
          { label: "1648", isCorrect: false, order: 1 },
          { label: "1649", isCorrect: true, order: 2 },
          { label: "1650", isCorrect: false, order: 3 },
          { label: "1651", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the period without a king called?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Interregnum (1649-1660) was the period when England was a republic without a monarch.",
        order: 4,
        points: 1,
        options: [
          { label: "The Commonwealth", isCorrect: false, order: 1 },
          { label: "The Republic", isCorrect: false, order: 2 },
          { label: "The Interregnum", isCorrect: true, order: 3 },
          { label: "The Protectorate", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the monarchy restored?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The monarchy was restored in 1660 when Charles II returned from exile in France.",
        order: 5,
        points: 1,
        options: [
          { label: "1659", isCorrect: false, order: 1 },
          { label: "1660", isCorrect: true, order: 2 },
          { label: "1661", isCorrect: false, order: 3 },
          { label: "1662", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What catastrophes hit London in the 1660s?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "London was hit by the Great Plague in 1665 and the Great Fire in 1666.",
        order: 6,
        points: 1,
        options: [
          { label: "War and famine", isCorrect: false, order: 1 },
          { label: "Plague and fire", isCorrect: true, order: 2 },
          { label: "Flood and earthquake", isCorrect: false, order: 3 },
          { label: "Invasion and siege", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the architect who rebuilt London after the Great Fire?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Sir Christopher Wren designed many of London's churches, including St Paul's Cathedral, after the Great Fire.",
        order: 7,
        points: 1,
        options: [
          { label: "Inigo Jones", isCorrect: false, order: 1 },
          { label: "Sir Christopher Wren", isCorrect: true, order: 2 },
          { label: "Nicholas Hawksmoor", isCorrect: false, order: 3 },
          { label: "John Vanbrugh", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the Glorious Revolution?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Glorious Revolution took place in 1688 when James II was overthrown and replaced by William and Mary.",
        order: 8,
        points: 1,
        options: [
          { label: "1687", isCorrect: false, order: 1 },
          { label: "1688", isCorrect: true, order: 2 },
          { label: "1689", isCorrect: false, order: 3 },
          { label: "1690", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was agreed in the Bill of Rights 1689?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Bill of Rights 1689 confirmed the rights of Parliament and limited the powers of the king.",
        order: 9,
        points: 1,
        options: [
          { label: "The king's absolute power", isCorrect: false, order: 1 },
          { label: "Parliament's rights", isCorrect: true, order: 2 },
          { label: "Religious freedom", isCorrect: false, order: 3 },
          { label: "Universal suffrage", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did England and Scotland unite?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Act of Union in 1707 united England and Scotland to form Great Britain.",
        order: 10,
        points: 1,
        options: [
          { label: "1706", isCorrect: false, order: 1 },
          { label: "1707", isCorrect: true, order: 2 },
          { label: "1708", isCorrect: false, order: 3 },
          { label: "1709", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who led the Jacobite rebellion in 1745?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Bonnie Prince Charlie (Charles Edward Stuart) led the 1745 Jacobite rebellion to restore the Stuart monarchy.",
        order: 11,
        points: 1,
        options: [
          { label: "Robert the Bruce", isCorrect: false, order: 1 },
          { label: "Bonnie Prince Charlie", isCorrect: true, order: 2 },
          { label: "William Wallace", isCorrect: false, order: 3 },
          { label: "John Knox", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "At which battle was the Jacobite rebellion finally defeated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of Culloden in 1746 was the final defeat of the Jacobite rebellion.",
        order: 12,
        points: 1,
        options: [
          { label: "Bannockburn", isCorrect: false, order: 1 },
          { label: "Culloden", isCorrect: true, order: 2 },
          { label: "Stirling Bridge", isCorrect: false, order: 3 },
          { label: "Flodden", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which invention marked the beginning of the Industrial Revolution?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The steam engine, improved by James Watt, was crucial to the Industrial Revolution.",
        order: 13,
        points: 1,
        options: [
          { label: "The spinning jenny", isCorrect: false, order: 1 },
          { label: "The steam engine", isCorrect: true, order: 2 },
          { label: "The power loom", isCorrect: false, order: 3 },
          { label: "The cotton gin", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which century did the Industrial Revolution begin?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Industrial Revolution began in the mid-18th century in Britain.",
        order: 14,
        points: 1,
        options: [
          { label: "17th century", isCorrect: false, order: 1 },
          { label: "18th century", isCorrect: true, order: 2 },
          { label: "19th century", isCorrect: false, order: 3 },
          { label: "20th century", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who wrote 'The Wealth of Nations'?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Adam Smith wrote 'The Wealth of Nations' in 1776, a foundational work of modern economics.",
        order: 15,
        points: 1,
        options: [
          { label: "David Hume", isCorrect: false, order: 1 },
          { label: "Adam Smith", isCorrect: true, order: 2 },
          { label: "John Stuart Mill", isCorrect: false, order: 3 },
          { label: "Jeremy Bentham", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did Britain abolish the slave trade?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The slave trade was abolished in the British Empire in 1807, though slavery itself continued until 1833.",
        order: 16,
        points: 1,
        options: [
          { label: "1806", isCorrect: false, order: 1 },
          { label: "1807", isCorrect: true, order: 2 },
          { label: "1808", isCorrect: false, order: 3 },
          { label: "1809", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the British naval commander at the Battle of Trafalgar?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Admiral Nelson led the British fleet to victory at Trafalgar in 1805, where he was killed in action.",
        order: 17,
        points: 1,
        options: [
          { label: "Admiral Drake", isCorrect: false, order: 1 },
          { label: "Admiral Nelson", isCorrect: true, order: 2 },
          { label: "Admiral Blake", isCorrect: false, order: 3 },
          { label: "Admiral Rodney", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the Battle of Waterloo?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of Waterloo took place in 1815, where the Duke of Wellington defeated Napoleon.",
        order: 18,
        points: 1,
        options: [
          { label: "1814", isCorrect: false, order: 1 },
          { label: "1815", isCorrect: true, order: 2 },
          { label: "1816", isCorrect: false, order: 3 },
          { label: "1817", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Great Reform Act of 1832?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Reform Act of 1832 was the first major reform of Parliament, giving more people the right to vote.",
        order: 19,
        points: 1,
        options: [
          { label: "Railway regulation", isCorrect: false, order: 1 },
          { label: "Parliamentary reform", isCorrect: true, order: 2 },
          { label: "Factory conditions", isCorrect: false, order: 3 },
          { label: "Criminal justice", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did Queen Victoria come to the throne?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Queen Victoria came to the throne in 1837 at the age of 18 and reigned until 1901.",
        order: 20,
        points: 1,
        options: [
          { label: "1836", isCorrect: false, order: 1 },
          { label: "1837", isCorrect: true, order: 2 },
          { label: "1838", isCorrect: false, order: 3 },
          { label: "1839", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was opened in 1851 to showcase British technology?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Exhibition was held in 1851 in the Crystal Palace to showcase British industrial achievements.",
        order: 21,
        points: 1,
        options: [
          { label: "The British Museum", isCorrect: false, order: 1 },
          { label: "The Great Exhibition", isCorrect: true, order: 2 },
          { label: "The Royal Opera House", isCorrect: false, order: 3 },
          { label: "The National Gallery", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who wrote 'A Christmas Carol'?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Charles Dickens wrote 'A Christmas Carol' and many other novels highlighting Victorian social problems.",
        order: 22,
        points: 1,
        options: [
          { label: "George Eliot", isCorrect: false, order: 1 },
          { label: "Charles Dickens", isCorrect: true, order: 2 },
          { label: "Thomas Hardy", isCorrect: false, order: 3 },
          { label: "Anthony Trollope", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the Crimean War fought over?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Crimean War (1853-1856) was fought between Russia and an alliance including Britain, France, and Turkey.",
        order: 23,
        points: 1,
        options: [
          { label: "Trade routes", isCorrect: false, order: 1 },
          { label: "Russian expansion", isCorrect: true, order: 2 },
          { label: "Colonial territories", isCorrect: false, order: 3 },
          { label: "Religious freedom", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was known as 'The Lady with the Lamp'?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Florence Nightingale was known as 'The Lady with the Lamp' for her nursing work during the Crimean War.",
        order: 24,
        points: 1,
        options: [
          { label: "Mary Seacole", isCorrect: false, order: 1 },
          { label: "Florence Nightingale", isCorrect: true, order: 2 },
          { label: "Elizabeth Fry", isCorrect: false, order: 3 },
          { label: "Frances Power Cobbe", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-3",
    title: "Life in the UK Test 3",
    description:
      "Official practice test covering World Wars, modern Britain, and government - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "In which year did the First World War begin?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The First World War began in 1914 and lasted until 1918.",
        order: 1,
        points: 1,
        options: [
          { label: "1913", isCorrect: false, order: 1 },
          { label: "1914", isCorrect: true, order: 2 },
          { label: "1915", isCorrect: false, order: 3 },
          { label: "1916", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which battle is famous for the first day of fighting on 1 July 1916?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Battle of the Somme began on 1 July 1916 and was one of the bloodiest battles in human history.",
        order: 2,
        points: 1,
        options: [
          { label: "Battle of Verdun", isCorrect: false, order: 1 },
          { label: "Battle of the Somme", isCorrect: true, order: 2 },
          { label: "Battle of Passchendaele", isCorrect: false, order: 3 },
          { label: "Battle of Ypres", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did women over 30 get the vote?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Women over 30 got the vote in 1918, and all women over 21 got the vote in 1928.",
        order: 3,
        points: 1,
        options: [
          { label: "1917", isCorrect: false, order: 1 },
          { label: "1918", isCorrect: true, order: 2 },
          { label: "1919", isCorrect: false, order: 3 },
          { label: "1920", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What happened in 1922 in Ireland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Ireland was partitioned in 1922, with the Irish Free State becoming independent and Northern Ireland remaining part of the UK.",
        order: 4,
        points: 1,
        options: [
          { label: "Ireland joined the UK", isCorrect: false, order: 1 },
          { label: "Ireland was partitioned", isCorrect: true, order: 2 },
          { label: "Ireland became a republic", isCorrect: false, order: 3 },
          { label: "Ireland was occupied", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did the Great Depression begin?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Great Depression began in 1929 and lasted throughout the 1930s.",
        order: 5,
        points: 1,
        options: [
          { label: "1928", isCorrect: false, order: 1 },
          { label: "1929", isCorrect: true, order: 2 },
          { label: "1930", isCorrect: false, order: 3 },
          { label: "1931", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the British Prime Minister at the start of the Second World War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Neville Chamberlain was Prime Minister when Britain declared war on Germany in September 1939.",
        order: 6,
        points: 1,
        options: [
          { label: "Winston Churchill", isCorrect: false, order: 1 },
          { label: "Neville Chamberlain", isCorrect: true, order: 2 },
          { label: "Stanley Baldwin", isCorrect: false, order: 3 },
          { label: "Clement Attlee", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the Second World War end?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Second World War ended in 1945, with VE Day on 8 May and VJ Day on 15 August.",
        order: 7,
        points: 1,
        options: [
          { label: "1944", isCorrect: false, order: 1 },
          { label: "1945", isCorrect: true, order: 2 },
          { label: "1946", isCorrect: false, order: 3 },
          { label: "1947", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What does D-Day refer to?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "D-Day refers to the Allied invasion of Nazi-occupied France on 6 June 1944.",
        order: 8,
        points: 1,
        options: [
          { label: "The end of the war", isCorrect: false, order: 1 },
          { label: "The invasion of France", isCorrect: true, order: 2 },
          { label: "The bombing of London", isCorrect: false, order: 3 },
          { label: "The attack on Pearl Harbor", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which Labour leader became Prime Minister in 1945?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Clement Attlee led Labour to victory in 1945 and established the welfare state and NHS.",
        order: 9,
        points: 1,
        options: [
          { label: "Aneurin Bevan", isCorrect: false, order: 1 },
          { label: "Clement Attlee", isCorrect: true, order: 2 },
          { label: "Ernest Bevin", isCorrect: false, order: 3 },
          { label: "Herbert Morrison", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the National Health Service (NHS) established?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The NHS was established on 5 July 1948, providing free healthcare for all.",
        order: 10,
        points: 1,
        options: [
          { label: "1946", isCorrect: false, order: 1 },
          { label: "1947", isCorrect: false, order: 2 },
          { label: "1948", isCorrect: true, order: 3 },
          { label: "1949", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When did rationing end after the Second World War?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Food rationing finally ended in 1954, nearly 9 years after the war ended.",
        order: 11,
        points: 1,
        options: [
          { label: "1950", isCorrect: false, order: 1 },
          { label: "1952", isCorrect: false, order: 2 },
          { label: "1954", isCorrect: true, order: 3 },
          { label: "1956", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did Queen Elizabeth II come to the throne?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Queen Elizabeth II became queen in 1952 when her father King George VI died.",
        order: 12,
        points: 1,
        options: [
          { label: "1951", isCorrect: false, order: 1 },
          { label: "1952", isCorrect: true, order: 2 },
          { label: "1953", isCorrect: false, order: 3 },
          { label: "1954", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What was the 'Swinging Sixties'?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The 'Swinging Sixties' refers to the cultural revolution in Britain during the 1960s, particularly in music and fashion.",
        order: 13,
        points: 1,
        options: [
          { label: "An economic boom", isCorrect: false, order: 1 },
          { label: "A cultural revolution", isCorrect: true, order: 2 },
          { label: "A political movement", isCorrect: false, order: 3 },
          { label: "A scientific discovery", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which band was formed in Liverpool in the 1960s?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Beatles were formed in Liverpool in 1960 and became the most famous band in the world.",
        order: 14,
        points: 1,
        options: [
          { label: "The Rolling Stones", isCorrect: false, order: 1 },
          { label: "The Beatles", isCorrect: true, order: 2 },
          { label: "The Who", isCorrect: false, order: 3 },
          { label: "Led Zeppelin", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did Britain join the European Economic Community (EEC)?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Britain joined the EEC in 1973 under Prime Minister Edward Heath.",
        order: 15,
        points: 1,
        options: [
          { label: "1972", isCorrect: false, order: 1 },
          { label: "1973", isCorrect: true, order: 2 },
          { label: "1974", isCorrect: false, order: 3 },
          { label: "1975", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Who was the first woman Prime Minister of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Margaret Thatcher was the first woman Prime Minister, serving from 1979 to 1990.",
        order: 16,
        points: 1,
        options: [
          { label: "Theresa May", isCorrect: false, order: 1 },
          { label: "Margaret Thatcher", isCorrect: true, order: 2 },
          { label: "Elizabeth I", isCorrect: false, order: 3 },
          { label: "Victoria", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the Falklands War take place?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Falklands War took place in 1982 between Britain and Argentina.",
        order: 17,
        points: 1,
        options: [
          { label: "1981", isCorrect: false, order: 1 },
          { label: "1982", isCorrect: true, order: 2 },
          { label: "1983", isCorrect: false, order: 3 },
          { label: "1984", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Scottish Parliament building called?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The Scottish Parliament meets at Holyrood in Edinburgh.",
        order: 18,
        points: 1,
        options: [
          { label: "Holyrood", isCorrect: true, order: 1 },
          { label: "Balmoral", isCorrect: false, order: 2 },
          { label: "Stirling", isCorrect: false, order: 3 },
          { label: "Scone", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year was the Scottish Parliament established?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Scottish Parliament was established in 1999 following devolution.",
        order: 19,
        points: 1,
        options: [
          { label: "1997", isCorrect: false, order: 1 },
          { label: "1998", isCorrect: false, order: 2 },
          { label: "1999", isCorrect: true, order: 3 },
          { label: "2000", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Welsh Assembly now called?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Welsh Assembly is now called the Senedd Cymru (Welsh Parliament).",
        order: 20,
        points: 1,
        options: [
          { label: "Welsh Parliament", isCorrect: true, order: 1 },
          { label: "Welsh Assembly", isCorrect: false, order: 2 },
          { label: "Welsh Council", isCorrect: false, order: 3 },
          { label: "Welsh Senate", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "In which year did the UK leave the European Union?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The UK left the European Union on 31 January 2020, following the Brexit referendum.",
        order: 21,
        points: 1,
        options: [
          { label: "2019", isCorrect: false, order: 1 },
          { label: "2020", isCorrect: true, order: 2 },
          { label: "2021", isCorrect: false, order: 3 },
          { label: "2022", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "How many countries make up the United Kingdom?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The United Kingdom consists of four countries: England, Scotland, Wales, and Northern Ireland.",
        order: 22,
        points: 1,
        options: [
          { label: "Three", isCorrect: false, order: 1 },
          { label: "Four", isCorrect: true, order: 2 },
          { label: "Five", isCorrect: false, order: 3 },
          { label: "Six", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the capital of Northern Ireland?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Belfast is the capital and largest city of Northern Ireland.",
        order: 23,
        points: 1,
        options: [
          { label: "Dublin", isCorrect: false, order: 1 },
          { label: "Belfast", isCorrect: true, order: 2 },
          { label: "Derry", isCorrect: false, order: 3 },
          { label: "Armagh", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Union Jack?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Union Jack is the national flag of the United Kingdom, combining the crosses of England, Scotland, and Ireland.",
        order: 24,
        points: 1,
        options: [
          { label: "The national anthem", isCorrect: false, order: 1 },
          { label: "The national flag", isCorrect: true, order: 2 },
          { label: "The royal coat of arms", isCorrect: false, order: 3 },
          { label: "The national motto", isCorrect: false, order: 4 },
        ],
      },
    ],
  },
  {
    id: "life-uk-test-4",
    title: "Life in the UK Test 4",
    description:
      "Official practice test covering British culture, traditions, and sports - 24 questions",
    timeLimit: 45,
    passPercentage: 75,
    questions: [
      {
        stem: "When is Christmas Day?",
        type: "SINGLE_CHOICE" as const,
        explanation: "Christmas Day is celebrated on 25 December each year.",
        order: 1,
        points: 1,
        options: [
          { label: "24 December", isCorrect: false, order: 1 },
          { label: "25 December", isCorrect: true, order: 2 },
          { label: "26 December", isCorrect: false, order: 3 },
          { label: "31 December", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is Boxing Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Boxing Day is 26 December, traditionally when servants received gifts from their employers.",
        order: 2,
        points: 1,
        options: [
          { label: "25 December", isCorrect: false, order: 1 },
          { label: "26 December", isCorrect: true, order: 2 },
          { label: "31 December", isCorrect: false, order: 3 },
          { label: "1 January", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is New Year's Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "New Year's Day is 1 January, marking the start of the new year.",
        order: 3,
        points: 1,
        options: [
          { label: "31 December", isCorrect: false, order: 1 },
          { label: "1 January", isCorrect: true, order: 2 },
          { label: "2 January", isCorrect: false, order: 3 },
          { label: "6 January", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is St George's Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St George's Day, the patron saint of England, is celebrated on 23 April.",
        order: 4,
        points: 1,
        options: [
          { label: "1 March", isCorrect: false, order: 1 },
          { label: "17 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: true, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is St Patrick's Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St Patrick's Day, the patron saint of Ireland, is celebrated on 17 March.",
        order: 5,
        points: 1,
        options: [
          { label: "1 March", isCorrect: false, order: 1 },
          { label: "17 March", isCorrect: true, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is St David's Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St David's Day, the patron saint of Wales, is celebrated on 1 March.",
        order: 6,
        points: 1,
        options: [
          { label: "1 March", isCorrect: true, order: 1 },
          { label: "17 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is St Andrew's Day?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "St Andrew's Day, the patron saint of Scotland, is celebrated on 30 November.",
        order: 7,
        points: 1,
        options: [
          { label: "1 March", isCorrect: false, order: 1 },
          { label: "17 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: true, order: 4 },
        ],
      },
      {
        stem: "What is the traditional Sunday lunch called?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The traditional Sunday lunch is called a Sunday roast, typically featuring roasted meat and vegetables.",
        order: 8,
        points: 1,
        options: [
          { label: "Fish and chips", isCorrect: false, order: 1 },
          { label: "Sunday roast", isCorrect: true, order: 2 },
          { label: "Full English breakfast", isCorrect: false, order: 3 },
          { label: "Shepherd's pie", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the most popular sport in the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation: "Football (soccer) is the most popular sport in the UK.",
        order: 9,
        points: 1,
        options: [
          { label: "Cricket", isCorrect: false, order: 1 },
          { label: "Rugby", isCorrect: false, order: 2 },
          { label: "Football", isCorrect: true, order: 3 },
          { label: "Tennis", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the famous tennis tournament held in London?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Wimbledon is the famous tennis tournament held in London every summer.",
        order: 10,
        points: 1,
        options: [
          { label: "Wimbledon", isCorrect: true, order: 1 },
          { label: "Queen's Club", isCorrect: false, order: 2 },
          { label: "Roland Garros", isCorrect: false, order: 3 },
          { label: "US Open", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "Which sport is played at Lord's?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Cricket is played at Lord's, which is known as the 'Home of Cricket'.",
        order: 11,
        points: 1,
        options: [
          { label: "Football", isCorrect: false, order: 1 },
          { label: "Cricket", isCorrect: true, order: 2 },
          { label: "Rugby", isCorrect: false, order: 3 },
          { label: "Tennis", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Ashes?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Ashes is a cricket series played between England and Australia.",
        order: 12,
        points: 1,
        options: [
          { label: "A football competition", isCorrect: false, order: 1 },
          { label: "A cricket series", isCorrect: true, order: 2 },
          { label: "A rugby tournament", isCorrect: false, order: 3 },
          { label: "A tennis championship", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is haggis?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Haggis is a traditional Scottish dish made from sheep's offal, oatmeal, and spices.",
        order: 13,
        points: 1,
        options: [
          {
            label: "A Scottish musical instrument",
            isCorrect: false,
            order: 1,
          },
          { label: "A traditional Scottish dish", isCorrect: true, order: 2 },
          { label: "A Scottish dance", isCorrect: false, order: 3 },
          { label: "A Scottish castle", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "When is Burns Night celebrated?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Burns Night is celebrated on 25 January to honor the Scottish poet Robert Burns.",
        order: 14,
        points: 1,
        options: [
          { label: "25 January", isCorrect: true, order: 1 },
          { label: "1 March", isCorrect: false, order: 2 },
          { label: "23 April", isCorrect: false, order: 3 },
          { label: "30 November", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Proms?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Proms is a series of classical music concerts held annually at the Royal Albert Hall.",
        order: 15,
        points: 1,
        options: [
          { label: "A music festival", isCorrect: true, order: 1 },
          { label: "A food festival", isCorrect: false, order: 2 },
          { label: "A flower show", isCorrect: false, order: 3 },
          { label: "A boat race", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Edinburgh Festival famous for?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Edinburgh Festival is famous for arts, culture, and particularly comedy shows.",
        order: 16,
        points: 1,
        options: [
          { label: "Food", isCorrect: false, order: 1 },
          { label: "Arts and culture", isCorrect: true, order: 2 },
          { label: "Sports", isCorrect: false, order: 3 },
          { label: "Technology", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Grand National?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Grand National is a famous horse race held annually at Aintree Racecourse near Liverpool.",
        order: 17,
        points: 1,
        options: [
          { label: "A car race", isCorrect: false, order: 1 },
          { label: "A horse race", isCorrect: true, order: 2 },
          { label: "A boat race", isCorrect: false, order: 3 },
          { label: "A dog race", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Boat Race?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Boat Race is an annual rowing race between Oxford and Cambridge universities on the River Thames.",
        order: 18,
        points: 1,
        options: [
          { label: "A sailing competition", isCorrect: false, order: 1 },
          { label: "A rowing race", isCorrect: true, order: 2 },
          { label: "A swimming race", isCorrect: false, order: 3 },
          { label: "A motor boat race", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is Morris dancing?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Morris dancing is a traditional English folk dance performed by groups of dancers.",
        order: 19,
        points: 1,
        options: [
          { label: "A ballroom dance", isCorrect: false, order: 1 },
          { label: "A folk dance", isCorrect: true, order: 2 },
          { label: "A ballet", isCorrect: false, order: 3 },
          { label: "A modern dance", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the currency of the UK?",
        type: "SINGLE_CHOICE" as const,
        explanation: "The currency of the UK is the pound sterling (£).",
        order: 20,
        points: 1,
        options: [
          { label: "Euro", isCorrect: false, order: 1 },
          { label: "Dollar", isCorrect: false, order: 2 },
          { label: "Pound sterling", isCorrect: true, order: 3 },
          { label: "Franc", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the Church of England also known as?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "The Church of England is also known as the Anglican Church.",
        order: 21,
        points: 1,
        options: [
          { label: "Catholic Church", isCorrect: false, order: 1 },
          { label: "Anglican Church", isCorrect: true, order: 2 },
          { label: "Methodist Church", isCorrect: false, order: 3 },
          { label: "Presbyterian Church", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What percentage of the UK population has a disability?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "Around 20% of the UK population has some form of disability.",
        order: 22,
        points: 1,
        options: [
          { label: "10%", isCorrect: false, order: 1 },
          { label: "15%", isCorrect: false, order: 2 },
          { label: "20%", isCorrect: true, order: 3 },
          { label: "25%", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What is the minimum age to vote in UK elections?",
        type: "SINGLE_CHOICE" as const,
        explanation:
          "You must be 18 years old or over to vote in UK elections.",
        order: 23,
        points: 1,
        options: [
          { label: "16", isCorrect: false, order: 1 },
          { label: "17", isCorrect: false, order: 2 },
          { label: "18", isCorrect: true, order: 3 },
          { label: "21", isCorrect: false, order: 4 },
        ],
      },
      {
        stem: "What does BBC stand for?",
        type: "SINGLE_CHOICE" as const,
        explanation: "BBC stands for British Broadcasting Corporation.",
        order: 24,
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
    ],
  },
];

async function main() {
  try {
    console.log("🌱 Starting database seed with 24-question tests...");

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
          timeLimit: 45,
          passingScore: 75,
        },
        isActive: true,
      },
    });

    console.log(`✅ Created/found domain: ${lifeInUKDomain.displayName}`);

    // Create or find a user for test creation
    const testUser = await prisma.user.upsert({
      where: { email: "admin@testtutor.com" },
      update: {},
      create: {
        email: "admin@testtutor.com",
        name: "Test Admin",
        password: "admin-password-placeholder",
        role: "ADMIN",
      },
    });

    console.log(`✅ Created/found user: ${testUser.name}`);

    // Create tests
    for (const testData of lifeInUKTests) {
      console.log(`📝 Creating test: ${testData.title}`);

      // Delete existing test if it exists
      await prisma.test.deleteMany({
        where: { id: testData.id },
      });

      const test = await prisma.test.create({
        data: {
          id: testData.id,
          title: testData.title,
          description: testData.description,
          domainId: lifeInUKDomain.id,
          creatorId: testUser.id,
          status: "PUBLISHED",
          config: {
            timeLimit: testData.timeLimit,
            questionsPerTest: testData.questions.length,
            passingScore: testData.passPercentage,
            allowRetakes: true,
            shuffleQuestions: false,
            showCorrectAnswers: true,
          },
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
          `  ➕ Added question: ${questionData.stem.substring(0, 50)}...`
        );
      }

      console.log(
        `✅ Test created: ${test.title} with ${testData.questions.length} questions`
      );
    }

    console.log("\n🎉 Database seed completed successfully!");
    console.log(
      `📊 Created ${lifeInUKTests.length} tests with ${lifeInUKTests.reduce((acc, test) => acc + test.questions.length, 0)} total questions`
    );
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
