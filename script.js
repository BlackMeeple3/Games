// --- 1️⃣ Supabase client ---
const supabaseClient = window.supabase.createClient(
  'https://axdwlpufjxbjxqtuveal.supabase.co',  
  'sb_publishable_j3_92NhNt3Ui-GDFxbpcbQ_Km4oDBDg'
);

// --- 2️⃣ Lista giochi completa con macrocategorie e difficoltà ---
const gamesRaw = [
  {
    id: 'game-1',
    name: 'Cascadia',
    description: `Cascadia è un gioco da tavolo per 1-4 giocatori della durata di circa 30-45 minuti, in cui i partecipanti costruiscono ecosistemi combinando tessere habitat e gettoni fauna per ottenere punti vittoria, bilanciando strategia e semplicità.`,
    image: 'games/Cascadia.jpg',
    players: { min: 1, max: 4 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['strategico', 'familiare', 'piazzamento tessere', 'medio', 'solitario'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 1.85
  },
  {
    id: 'game-2',
    name: 'Blood Rage',
    description: `Blood Rage è un gioco da tavolo per 2-4 giocatori della durata di circa 60-90 minuti, in cui i partecipanti guidano clan vichinghi in battaglie epiche, saccheggiando terre, guadagnando gloria e avanzando sul Ragnarök, combinando strategia di combattimento, gestione carte e controllo del territorio.`,
    image: 'games/Blood Rage.jpg',
    players: { min: 2, max: 4 },
    time: { min: 60, max: 120 },
    playtimeCategory: '> 60 min',
    tags: ['strategico', 'controllo territorio', 'competitivo', 'pesante'],
    macroCategory: 'strategici',
    difficulty: 3,
    weightBGG: 2.88
  },
  {
    id: 'game-3',
    name: 'Forest Shuffle',
    description: `Forest Shuffle è un gioco di carte strategico per 2-5 giocatori della durata di circa 40-60 minuti, in cui i partecipanti competono per raccogliere gli alberi più preziosi e attirare specie diverse per creare un habitat forestale equilibrato e ottenere il maggior numero di punti vittoria.`,
    image: 'games/Forest Shuffle.jpg',
    players: { min: 2, max: 5 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['carte', 'strategico', 'medio', 'competitivo'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: '2 (non da BGG)'
  },
  {
    id: 'game-4',
    name: 'Carcassonne',
    description: `Carcassonne è un gioco da tavolo per 2-5 giocatori della durata di circa 30-45 minuti, in cui i partecipanti piazzano tessere per costruire città, strade e campi, collocando i propri meeple strategicamente per guadagnare punti vittoria e dominare il paesaggio medievale.`,
    image: 'games/Carcassonne.jpg',
    players: { min: 2, max: 5 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['familiare', 'piazzamento tessere', 'leggero', 'competitivo'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 1.91
  },
  {
    id: 'game-5',
    name: 'Puerto Rico',
    description: `Puerto Rico è un gioco da tavolo per 2-5 giocatori della durata di circa 90-150 minuti, in cui i partecipanti gestiscono piantagioni, edifici e coloni sull'isola di Puerto Rico, ottimizzando produzione e spedizioni per guadagnare punti vittoria e diventare il governatore più potente.`,
    image: 'games/Puerto Rico.jpg',
    players: { min: 2, max: 5 },
    time: { min: 60, max: 120 },
    playtimeCategory: '> 60 min',
    tags: ['strategico', 'gestionale', 'pesante', 'competitivo'],
    macroCategory: 'strategici',
    difficulty: 3,
    weightBGG: 3.27
  },
  {
    id: 'game-6',
    name: 'The Castles of Burgundy',
    description: `The Castles of Burgundy è un gioco da tavolo per 2-4 giocatori della durata di circa 30-90 minuti, in cui i partecipanti sviluppano la propria regione nel Ducato di Borgogna piazzando tessere, commerciando e sfruttando abilità speciali per guadagnare punti vittoria strategicamente.`,
    image: 'games/The Castles of Burgundy.jpg',
    players: { min: 2, max: 4 },
    time: { min: 60, max: 120 },
    playtimeCategory: '> 60 min',
    tags: ['strategico', 'gestionale', 'medio', 'competitivo'],
    macroCategory: 'strategici',
    difficulty: 3,
    weightBGG: 2.99
  },
  {
    id: 'game-7',
    name: 'HEAT',
    description: `HEAT è un gioco da tavolo di corse automobilistiche per 1-6 giocatori della durata di circa 30-60 minuti, in cui i partecipanti gestiscono velocità, curve e stress del motore per tagliare il traguardo per primi, combinando gestione della mano e tattica.`,
    image: 'games/heat.jpg',
    players: { min: 1, max: 6 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['corse', 'familiare', 'competitivo', 'medio', 'solitario'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 2.4
  },
  {
    id: 'game-8',
    name: '7 Wonders',
    description: `7 Wonders è un gioco di carte per 2-7 giocatori della durata di circa 30 minuti, in cui i partecipanti sviluppano una civiltà attraverso tre ere costruendo edifici, potenziando l'economia, la scienza e l'esercito per ottenere il maggior numero di punti vittoria.`,
    image: 'games/7 wonders_.jpg',
    players: { min: 2, max: 7 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['carte', 'strategico', 'gruppi numerosi', 'medio'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 2.32
  },
  {
    id: 'game-9',
    name: 'Ticket to Ride',
    description: `Ticket to Ride è un gioco da tavolo per 2-5 giocatori della durata di circa 30-60 minuti, in cui i partecipanti costruiscono linee ferroviarie collegando città su una mappa, completando obiettivi segreti e ottimizzando percorsi per fare punti.`,
    image: 'games/ticket to ride.jpg',
    players: { min: 2, max: 5 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['familiare', 'strategico', 'medio', 'competitivo'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 1.88
  },
  {
    id: 'game-10',
    name: 'Wingspan',
    description: `Wingspan è un gioco da tavolo strategico per 1-5 giocatori della durata di circa 40-70 minuti, in cui i partecipanti attirano uccelli nei propri habitat, creando sinergie tra carte per ottenere risorse, uova e punti vittoria.`,
    image: 'games/Wingspan.jpg',
    imageClass: 'img-horizontal',
    players: { min: 1, max: 5 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['strategico', 'gestionale', 'medio', 'solitario'],
    macroCategory: 'strategici',
    difficulty: 3,
    weightBGG: 2.46
  },
  {
    id: 'game-11',
    name: 'Skull King',
    description: `Skull King è un gioco di carte di prese per 2-6 giocatori della durata di circa 30-45 minuti, in cui i partecipanti fanno previsioni sul numero di prese che riusciranno a vincere, utilizzando carte speciali e bluff per ottenere punti.`,
    image: 'games/skull king old.jpg',
    players: { min: 2, max: 6 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['party', 'carte', 'bluff', 'gruppi numerosi', 'leggero'],
    macroCategory: 'party game',
    difficulty: 0,
    weightBGG: '0 (non da BGG)'
  },
  {
    id: 'game-12',
    name: 'Samurai Sword',
    description: `Samurai Sword è un gioco di carte per 3-7 giocatori della durata di circa 30 minuti, ambientato nel Giappone feudale, in cui i partecipanti assumono ruoli segreti e si sfidano usando carte azione per eliminare gli avversari e raggiungere i propri obiettivi.`,
    image: 'games/samurai1.jpg',
    players: { min: 3, max: 7 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['party', 'ruoli segreti', 'carte', 'leggero'],
    macroCategory: 'party game',
    difficulty: 2,
    weightBGG: '1.76'
  },
  {
    id: 'game-13',
    name: 'Le rovine di Arnak',
    description: `Le rovine di Arnak è un gioco da tavolo per 1-4 giocatori della durata di circa 60-120 minuti, in cui i partecipanti esplorano un'isola misteriosa combinando deck-building e piazzamento lavoratori per scoprire rovine, combattere guardiani e ottenere punti.`,
    image: 'games/arnak.jpg',
    players: { min: 1, max: 4 },
    time: { min: 60, max: 120 },
    playtimeCategory: '> 60 min',
    tags: ['strategico', 'deck-building', 'piazzamento lavoratori', 'pesante', 'solitario'],
    macroCategory: 'strategici',
    difficulty: 3,
    weightBGG: 2.9
  },
  {
    id: 'game-14',
    name: 'Dorfromantik: The Board Game',
    description: `Dorfromantik: The Board Game è un gioco cooperativo per 1-6 giocatori della durata di circa 30-60 minuti, in cui i partecipanti costruiscono un paesaggio armonioso piazzando tessere per completare obiettivi e sbloccare nuovi contenuti.`,
    image: 'games/Dorfromantik.jpg',
    players: { min: 1, max: 6 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['cooperativo', 'familiare', 'piazzamento tessere', 'rilassante'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 1.75
  },
  {
    id: 'game-15',
    name: 'Monsters of Loch Lomond',
    description: `Monsters of Loch Lomond è un gioco di carte per 2-6 giocatori della durata di circa 20-30 minuti, in cui i partecipanti cercano di catturare creature leggendarie utilizzando strategia, fortuna e colpi di scena per accumulare punti.`,
    image: 'games/monster_.jpg',
    imageClass: 'img-soft-cover',
    players: { min: 2, max: 6 },
    time: { min: 10, max: 30 },
    playtimeCategory: '< 30 min',
    tags: ['carte', 'leggero', 'familiare', 'competitivo'],
    macroCategory: 'party game',
    difficulty: 2,
    weightBGG: '1.8'
  },
  {
    id: 'game-16',
    name: 'Scotland Yard',
    description: `Scotland Yard è un gioco da tavolo di deduzione per 3-6 giocatori della durata di circa 45-60 minuti, in cui un giocatore interpreta Mister X mentre gli altri sono detective che collaborano per rintracciarlo muovendosi su una mappa di Londra usando indizi e logica.`,
    image: 'games/scotland yard.jpg',
    imageClass: 'img-soft-cover',
    players: { min: 3, max: 6 },
    time: { min: 30, max: 60 },
    playtimeCategory: 'Tra 30 e 60 min',
    tags: ['deduzione', 'movimento nascosto', 'gruppo', 'medio'],
    macroCategory: 'strategici',
    difficulty: 2,
    weightBGG: 2.08
  },
  {
  id: 'game-17',
  name: 'Exploding Kittens',
  description: `Exploding Kittens è un gioco di carte per 2-5 giocatori della durata di circa 15-20 minuti, in cui i partecipanti pescano carte evitando di esplodere, usando azioni folli, bluff e colpi bassi per rimanere gli ultimi in gioco.`,
  image: 'games/exploding kittens.jpg',
  imageClass: 'img-horizontal',
  players: { min: 2, max: 5 },
  time: { min: 10, max: 30 },
  playtimeCategory: '< 30 min',
  tags: ['party', 'carte', 'bluff', 'leggero', 'familiare'],
  macroCategory: 'party game',
  difficulty: 0,
  weightBGG: 1.07
},
{
  id: 'game-18',
  name: 'Saboteur',
  description: `Saboteur è un gioco di carte per 3-10 giocatori della durata di circa 30 minuti, in cui i partecipanti interpretano nani minatori con ruoli segreti, cercando di costruire o sabotare tunnel per raggiungere l’oro.`,
  image: 'games/saboteur.jpg',
  imageClass: 'img-horizontal',
  players: { min: 3, max: 10 },
  time: { min: 20, max: 40 },
  playtimeCategory: 'Tra 30 e 60 min',
  tags: ['party', 'ruoli segreti', 'carte', 'bluff', 'gruppi numerosi'],
  macroCategory: 'party game',
  difficulty: 1,
  weightBGG: 1.38
},
{
  id: 'game-19',
  name: 'Bang! La Pallottola',
  description: `Bang! La Pallottola è un gioco di carte per 4-7 giocatori della durata di circa 30-40 minuti, ambientato nel Far West, in cui i partecipanti assumono ruoli segreti e si eliminano a colpi di carte tra bluff, deduzione e alleanze.`,
  image: 'games/bang.jpg',
  imageClass: 'img-soft-cover',
  players: { min: 4, max: 7 },
  time: { min: 30, max: 60 },
  playtimeCategory: 'Tra 30 e 60 min',
  tags: ['party', 'ruoli segreti', 'carte', 'bluff', 'gruppo'],
  macroCategory: 'party game',
  difficulty: 2,
  weightBGG: 1.65
},
{
  id: 'game-20',
  name: 'Monopoly',
  description: `Monopoly è un gioco da tavolo per 2-6 giocatori della durata di circa 60-180 minuti, in cui i partecipanti comprano, scambiano e sviluppano proprietà immobiliari cercando di mandare in bancarotta gli avversari.`,
  image: 'games/monopoly.jpg',
  players: { min: 2, max: 6 },
  time: { min: 60, max: 180 },
  playtimeCategory: '> 60 min',
  tags: ['familiare', 'economico', 'competitivo', 'classico'],
  macroCategory: 'party game',
  difficulty: 1,
  weightBGG: 1.19
},
{
  id: 'game-21',
  name: 'Labirinto',
  description: `Labirinto è un gioco da tavolo per 2-4 giocatori della durata di circa 20-30 minuti, in cui i partecipanti modificano un labirinto scorrevole per raggiungere tesori nascosti prima degli avversari.`,
  image: 'games/labirinto.jpg',
  imageClass: 'img-horizontal',
  players: { min: 2, max: 4 },
  time: { min: 20, max: 30 },
  playtimeCategory: '< 30 min',
  tags: ['familiare', 'movimento', 'leggero', 'competitivo'],
  macroCategory: 'party game',
  difficulty: 1,
  weightBGG: 1.35
},
{
  id: 'game-22',
  name: 'Hive',
  description: `Hive è un gioco scacchistico per 2 giocatori della durata di circa 20-30 minuti, in cui i partecipanti muovono insetti con abilità uniche cercando di circondare l’ape regina avversaria.`,
  image: 'games/hive.jpg',
  players: { min: 2, max: 2 },
  time: { min: 20, max: 30 },
  playtimeCategory: '< 30 min',
  tags: ['astratto', 'strategico', 'duello', 'competitivo'],
  macroCategory: 'strategici',
  difficulty: 2,
  weightBGG: 2.32
},
{
  id: 'game-23',
  name: 'Slapzi',
  description: `Slapzi è un gioco di carte rapido per 2-8 giocatori della durata di circa 10-15 minuti, in cui i partecipanti associano velocemente carte immagine e carte parola per essere i primi a liberarsi della mano.`,
  image: 'games/slapzi.png',
  imageClass: 'img-horizontal',
  players: { min: 2, max: 8 },
  time: { min: 10, max: 20 },
  playtimeCategory: '< 30 min',
  tags: ['party', 'velocità', 'familiare', 'leggero'],
  macroCategory: 'party game',
  difficulty: 0,
  weightBGG: '0 (non da BGG)'
},
{
  id: 'game-24',
  name: 'Unstable Unicorns',
  description: `Unstable Unicorns è un gioco di carte per 2-8 giocatori della durata di circa 30-45 minuti, in cui i partecipanti costruiscono eserciti di unicorni sabotando gli avversari con carte azione e colpi di scena.`,
  image: 'games/unstable unicorns.jpg',
  imageClass: 'img-horizontal',
  players: { min: 2, max: 8 },
  time: { min: 30, max: 60 },
  playtimeCategory: 'Tra 30 e 60 min',
  tags: ['party', 'carte', 'caotico', 'competitivo'],
  macroCategory: 'party game',
  difficulty: 1,
  weightBGG: 1.49
},
{
  id: 'game-25',
  name: 'Munchkin',
  description: `Munchkin è un gioco di carte per 3-6 giocatori della durata di circa 60-90 minuti, in cui i partecipanti esplorano dungeon, combattono mostri e tradiscono gli alleati per raggiungere per primi il livello 10.`,
  image: 'games/munchkin.jpg',
  imageClass: 'img-soft-cover',
  players: { min: 3, max: 6 },
  time: { min: 60, max: 120 },
  playtimeCategory: '> 60 min',
  tags: ['party', 'carte', 'umoristico', 'competitivo'],
  macroCategory: 'party game',
  difficulty: 2,
  weightBGG: 1.61
},
{
  id: 'game-26',
  name: 'Santorini',
  description: `Santorini è un gioco astratto per 2-4 giocatori della durata di circa 20-30 minuti, in cui i partecipanti costruiscono edifici e muovono i propri personaggi usando poteri divini per ottenere vantaggi strategici.`,
  image: 'games/santorini.jpg',
  players: { min: 2, max: 4 },
  time: { min: 20, max: 30 },
  playtimeCategory: '< 30 min',
  tags: ['astratto', 'strategico', 'competitivo'],
  macroCategory: 'strategici',
  difficulty: 2,
  weightBGG: 2.35
},
{
  id: 'game-27',
  name: 'Pandemic Legacy Season 1',
  description: `Pandemic Legacy Season 1 è un gioco cooperativo per 2-4 giocatori della durata di circa 60 minuti a partita, in cui i partecipanti affrontano una campagna narrativa evolutiva cercando di salvare l’umanità in un mondo post-apocalittico.`,
  image: 'games/pandemic legacy season 1.jpg',
  imageClass: 'img-soft-cover',
  players: { min: 2, max: 4 },
  time: { min: 60, max: 120 },
  playtimeCategory: '> 60 min',
  tags: ['cooperativo', 'campagna', 'narrativo', 'pesante'],
  macroCategory: 'strategici',
  difficulty: 3,
  weightBGG: 3.26
},
{
  id: 'game-28',
  name: 'Paladin',
  description: `Paladin è un gioco da tavolo strategico per 1-4 giocatori della durata di circa 60-120 minuti, in cui i partecipanti gestiscono risorse, lavoratori e azioni per sviluppare il proprio regno medievale.`,
  image: 'games/paladin.jpg',
  imageClass: 'img-soft-cover',
  players: { min: 1, max: 4 },
  time: { min: 60, max: 120 },
  playtimeCategory: '> 60 min',
  tags: ['strategico', 'gestionale', 'pesante', 'solitario'],
  macroCategory: 'strategici',
  difficulty: 3,
  weightBGG: 3.01
},
{
  id: 'game-29',
  name: 'Taboo',
  description: `Taboo è un party game per 4-8 giocatori della durata di circa 20-30 minuti, in cui i partecipanti devono far indovinare parole evitando termini proibiti, creando situazioni caotiche e divertenti.`,
  image: 'games/Taboo.jpg',
  players: { min: 4, max: 8 },
  time: { min: 20, max: 30 },
  playtimeCategory: '< 30 min',
  tags: ['party', 'parole', 'gruppi numerosi', 'familiare'],
  macroCategory: 'party game',
  difficulty: 0,
  weightBGG: 1.1
}

];

// ⚠️ LISTA FINALE USATA DA TUTTO IL CODICE
let games = [];// --- 1️⃣ Supabase client ---


// --- 3️⃣ Riferimenti DOM ---
const grid = document.getElementById('grid');
const submitBtn = document.getElementById('submitBtn');
const nameSection = document.getElementById('nameSection');
const nameInput = document.getElementById('nameInput');
const sendBtn = document.getElementById('send');
const closeNameSectionBtn = document.getElementById('closeNameSection');
const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const adminPasswordSection = document.getElementById('adminPasswordSection');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminContent = document.getElementById('adminContent');
const resetDataBtn = document.getElementById('resetDataBtn');
const chartCanvas = document.getElementById('voteChart');
const categoryFiltersDiv = document.getElementById('categoryFilters');
const tagFiltersDiv = document.getElementById('tagFilters');
const clearFiltersBtn = document.getElementById('clearFilters');
const filterHeader = document.getElementById('filterHeader');
const filterContent = document.getElementById('filterContent');
const filterToggle = document.querySelector('.filter-toggle');
const loadingScreen = document.getElementById('loadingScreen');
const mainTitle = document.getElementById('mainTitle');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');
const applyDateFilter = document.getElementById('applyDateFilter');
const resetDateFilter = document.getElementById('resetDateFilter');

let selected = [];
let isAdmin = false;
let activeFilters = {
  categories: [],
  maxPlayers: null,
  maxTime: null
};
let dateFilterRange = { from: null, to: null };

// --- 4️⃣ Toggle filtri ---
filterHeader.onclick = () => {
  filterContent.classList.toggle('collapsed');
  filterToggle.classList.toggle('collapsed');
};

// --- 5️⃣ Popup ---
const popupOverlay = document.getElementById('popupOverlay');
const popupText = document.getElementById('popupText');
const popupClose = document.getElementById('popupClose');

function showPopup(game) {
  const difficultyStars = '★'.repeat(game.difficulty) + '☆'.repeat(5 - game.difficulty);
  
  popupText.innerHTML = `
    <h3>${game.name}</h3>
    <div class="popup-section">
      <span class="popup-label">Giocatori:</span> ${game.players.min}-${game.players.max}
    </div>
    <div class="popup-section">
      <span class="popup-label">Durata:</span> ${game.time.min}-${game.time.max} min
    </div>
    <div class="popup-section">
      <span class="popup-label">Categoria:</span> ${game.macroCategory}
    </div>
    <div class="popup-section">
      <span class="popup-label">Difficoltà:</span> ${difficultyStars}
    </div>
    <div class="popup-section">
      <span class="popup-label">Tags:</span> ${game.tags.join(', ')}
    </div>
    <div class="popup-section" style="margin-top: 16px;">
      ${game.description}
    </div>
  `;
  popupOverlay.classList.add('active');
}

function closePopup() {
  popupOverlay.classList.remove('active');
}

popupClose.onclick = closePopup;
popupOverlay.onclick = (e) => {
  if (e.target === popupOverlay) closePopup();
};

// --- 6️⃣ CARICAMENTO GIOCHI ---
function loadGames() {
  const checks = gamesRaw.map(game => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = game.image;
      img.onload = () => resolve(game);
      img.onerror = () => resolve(null);
    });
  });

  Promise.all(checks).then(validGames => {
    games = validGames
      .filter(Boolean)
      .slice(0, 50);

    games.sort((a, b) => {
      if (a.macroCategory !== b.macroCategory) {
        return a.macroCategory.localeCompare(b.macroCategory, 'it');
      }
      return a.name.localeCompare(b.name, 'it');
    });

    createFilters();
    renderGames();
    
    // Nascondi loading e mostra titolo animato
    hideLoadingScreen();
  });
}

// --- 7️⃣ ANIMAZIONE TITOLO ---
function hideLoadingScreen() {
  loadingScreen.classList.add('fade-out');
  document.body.classList.add('loaded');
  
  setTimeout(() => {
    animateTitle();
  }, 500);
}

function animateTitle() {
  const text = 'A cosa\nsi gioca?';
  const lines = text.split('\n');

  lines.forEach((line, lineIndex) => {
    const letters = line.split('');

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.className = 'letter';
      span.style.animationDelay = `${(index + lineIndex * 10) * 0.05}s`;
      mainTitle.appendChild(span);
    });

    // A capo tra le righe
    if (lineIndex < lines.length - 1) {
      mainTitle.appendChild(document.createElement('br'));
    }
  });
}

// --- 8️⃣ CREAZIONE FILTRI ---
function createFilters() {
  // Estrai tutte le macrocategorie uniche
  const categories = [...new Set(games.map(g => g.macroCategory))].sort();
  
  // Crea pulsanti categoria
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = cat;
    btn.onclick = () => toggleCategoryFilter(cat, btn);
    categoryFiltersDiv.appendChild(btn);
  });
  
  // Filtri numero giocatori
  tagFiltersDiv.innerHTML = '<div style="margin-bottom: 10px;"><strong>Giocatori:</strong></div>';
  const playersDiv = document.createElement('div');
  playersDiv.style.display = 'flex';
  playersDiv.style.gap = '8px';
  playersDiv.style.flexWrap = 'wrap';
  playersDiv.style.marginBottom = '20px';
  
  [2, 3, 4, 5, 6, 7, 8].forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = `${num}`;
    btn.onclick = () => togglePlayersFilter(num, btn);
    playersDiv.appendChild(btn);
  });
  tagFiltersDiv.appendChild(playersDiv);
  
  // Filtri durata
  const durationLabel = document.createElement('div');
  durationLabel.innerHTML = '<strong>Giochi che durano meno di:</strong>';
  durationLabel.style.marginBottom = '10px';
  tagFiltersDiv.appendChild(durationLabel);
  
  const durationDiv = document.createElement('div');
  durationDiv.style.display = 'flex';
  durationDiv.style.gap = '8px';
  durationDiv.style.flexWrap = 'wrap';
  
  [30, 45, 60, 90, 120, 150].forEach(time => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = `${time} minuti`;
    btn.onclick = () => toggleTimeFilter(time, btn);
    durationDiv.appendChild(btn);
  });
  tagFiltersDiv.appendChild(durationDiv);
}

function toggleCategoryFilter(category, btn) {
  const idx = activeFilters.categories.indexOf(category);
  if (idx > -1) {
    activeFilters.categories.splice(idx, 1);
    btn.classList.remove('active');
  } else {
    activeFilters.categories.push(category);
    btn.classList.add('active');
  }
  updateFilters();
}

function togglePlayersFilter(num, btn) {
  if (activeFilters.maxPlayers === num) {
    activeFilters.maxPlayers = null;
    btn.classList.remove('active');
  } else {
    btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    activeFilters.maxPlayers = num;
    btn.classList.add('active');
  }
  updateFilters();
}

function toggleTimeFilter(time, btn) {
  if (activeFilters.maxTime === time) {
    activeFilters.maxTime = null;
    btn.classList.remove('active');
  } else {
    btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    activeFilters.maxTime = time;
    btn.classList.add('active');
  }
  updateFilters();
}

function updateFilters() {
  const hasFilters = activeFilters.categories.length > 0 || 
                     activeFilters.maxPlayers !== null || 
                     activeFilters.maxTime !== null;
  clearFiltersBtn.style.display = hasFilters ? 'inline-block' : 'none';
  renderGames();
}

clearFiltersBtn.onclick = () => {
  activeFilters.categories = [];
  activeFilters.maxPlayers = null;
  activeFilters.maxTime = null;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  clearFiltersBtn.style.display = 'none';
  renderGames();
};

// --- 9️⃣ RENDERING GIOCHI ---
function renderGames() {
  grid.innerHTML = '';
  
  let filteredGames = games;
  
  if (activeFilters.categories.length > 0) {
    filteredGames = filteredGames.filter(g => 
      activeFilters.categories.includes(g.macroCategory)
    );
  }
  
  if (activeFilters.maxPlayers !== null) {
    filteredGames = filteredGames.filter(g => 
      g.players.max >= activeFilters.maxPlayers
    );
  }
  
  if (activeFilters.maxTime !== null) {
    filteredGames = filteredGames.filter(g => 
      g.time.max <= activeFilters.maxTime
    );
  }
  
  let currentCategory = null;
  
  filteredGames.forEach(game => {
    if (game.macroCategory !== currentCategory) {
      currentCategory = game.macroCategory;
      const header = document.createElement('div');
      header.className = 'category-header';
      header.textContent = currentCategory;
      grid.appendChild(header);
    }
    
    renderGame(game);
  });
}

function renderGame(game) {
  const div = document.createElement('div');
  div.className = 'card';

  if (selected.includes(game.id)) {
    div.classList.add('selected');
  }

  const difficultyClass = game.difficulty < 3 ? 'easy' : 'hard';

  div.innerHTML = `
    <img 
      src="${game.image}" 
      alt="${game.name}" 
      class="${game.imageClass || ''}"
    >
    <div class="game-icons">
      <div class="game-icon">👥 ${game.players.min}-${game.players.max}</div>
      <div class="game-icon">⏱️ ${game.time.min}-${game.time.max}'</div>
      <div class="difficulty-icon ${difficultyClass}">⚖️ ${game.difficulty}/5</div>
    </div>
    <div class="info-icon">ℹ️</div>
  `;

  div.onclick = (e) => {
    if (e.target.classList.contains('info-icon')) return;

    if (selected.includes(game.id)) {
      selected = selected.filter(id => id !== game.id);
      div.classList.remove('selected');
    } else {
      selected.push(game.id);
      div.classList.add('selected');
    }

    submitBtn.style.display = selected.length ? 'block' : 'none';
  };

  div.querySelector('.info-icon').onclick = (e) => {
    e.stopPropagation();
    showPopup(game);
  };

  grid.appendChild(div);
}


// --- 🔟 Mostra sezione nome ---
submitBtn.onclick = () => {
  nameSection.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// --- 1️⃣1️⃣ Chiudi sezione nome ---
closeNameSectionBtn.onclick = () => {
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 1️⃣2️⃣ Invia dati a Supabase ---
sendBtn.onclick = async () => {
  const name = nameInput.value.trim() || null;

  const { data: participant, error } = await supabaseClient
    .from('participants')
    .insert({ name })
    .select()
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  const rows = selected.map(game_id => ({
    participant_id: participant.id,
    game_id
  }));

  const { error: selectionError } = await supabaseClient
    .from('selections')
    .insert(rows);

  if (selectionError) {
    alert(selectionError.message);
    return;
  }

  alert('Scelte inviate!');
  selected = [];
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  nameInput.value = '';
  submitBtn.style.display = 'none';
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 1️⃣3️⃣ ADMIN PANEL ---
adminBtn.onclick = () => {
  adminPanel.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

closeAdminBtn.onclick = () => {
  adminPanel.classList.add('hidden');
  document.body.style.overflow = 'auto';
  isAdmin = false;
  adminPasswordSection.classList.remove('hidden');
  adminContent.classList.add('hidden');
  adminPasswordInput.value = '';
};

adminLoginBtn.onclick = () => {
  if (adminPasswordInput.value === 'ori3') {
    isAdmin = true;
    adminPasswordSection.classList.add('hidden');
    adminContent.classList.remove('hidden');
    loadAdminData();
  } else {
    alert('Password errata!');
    adminPasswordInput.value = '';
  }
};

// --- 1️⃣4️⃣ Filtro date admin ---
applyDateFilter.onclick = () => {
  dateFilterRange.from = dateFrom.value || null;
  dateFilterRange.to = dateTo.value || null;
  loadAdminData();
};

resetDateFilter.onclick = () => {
  dateFilterRange.from = null;
  dateFilterRange.to = null;
  dateFrom.value = '';
  dateTo.value = '';
  loadAdminData();
};

// --- 1️⃣5️⃣ Carica dati admin ---
async function loadAdminData() {
  let participantsQuery = supabaseClient
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  if (dateFilterRange.from) {
    participantsQuery = participantsQuery.gte('created_at', dateFilterRange.from);
  }
  if (dateFilterRange.to) {
    const toDate = new Date(dateFilterRange.to);
    toDate.setDate(toDate.getDate() + 1);
    participantsQuery = participantsQuery.lt('created_at', toDate.toISOString().split('T')[0]);
  }

  const { data: participants } = await participantsQuery;

  if (!participants) {
    alert('Errore nel caricamento dei dati');
    return;
  }

  const participantIds = participants.map(p => p.id);
  
  let selectionsQuery = supabaseClient
    .from('selections')
    .select('*');

  if (participantIds.length > 0) {
    selectionsQuery = selectionsQuery.in('participant_id', participantIds);
  } else {
    selectionsQuery = selectionsQuery.eq('participant_id', -1);
  }

  const { data: selections } = await selectionsQuery;

  displayVotesTable(participants, selections || []);
  displayChart(selections || []);
}

// --- 1️⃣6️⃣ Tabella voti ---
function displayVotesTable(participants, selections) {
  const tableDiv = document.getElementById('votesTable');
  let html = '<h3>Voti per Partecipante</h3><div style="overflow-x:auto;">';

  participants.forEach(p => {
    const userSelections = selections
      .filter(s => s.participant_id === p.id)
      .map(s => games.find(g => g.id === s.game_id)?.name || s.game_id)
      .join(', ');

    html += `
      <div style="padding:12px; border-bottom:1px solid #eee;">
        <strong>${p.name || 'Anonimo'}</strong>
        (${new Date(p.created_at).toLocaleString('it-IT')})<br>
        <small>Voti: ${userSelections || 'Nessuno'}</small>
      </div>
    `;
  });

  html += '</div>';
  tableDiv.innerHTML = html;
}

// --- 1️⃣7️⃣ Grafico ---
function displayChart(selections) {
  const voteCounts = {};
  selections.forEach(s => {
    voteCounts[s.game_id] = (voteCounts[s.game_id] || 0) + 1;
  });

  const sortedGames = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);

  if (sortedGames.length === 0) {
    document.getElementById('chartContainer').innerHTML = '<p>Nessun voto ancora</p>';
    return;
  }

  const labels = sortedGames.map(([id]) => games.find(g => g.id === id)?.name || id);
  const data = sortedGames.map(([, count]) => count);
  const colors = sortedGames.map((_, i) => `hsl(${(i * 137.5) % 360},70%,60%)`);

  const ctx = chartCanvas.getContext('2d');
  if (window.adminChart) window.adminChart.destroy();

  window.adminChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Numero Voti',
        data,
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('60%', '40%')),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Giochi Più Votati', font: { size: 18, weight: 'bold' } }
      }
    }
  });
}

// --- 1️⃣8️⃣ Reset dati ---
resetDataBtn.onclick = async () => {
  if (!confirm('Sei sicuro di voler cancellare TUTTI i dati?')) return;

  try {
    const { error: e1 } = await supabaseClient.from('selections').delete().gte('id', 0);
    if (e1) throw e1;

    const { error: e2 } = await supabaseClient.from('participants').delete().gte('id', 0);
    if (e2) throw e2;

    alert('Tutti i dati sono stati cancellati!');
    loadAdminData();
  } catch (err) {
    alert('Errore durante il reset');
    console.error(err);
  }
};

// --- 🚀 AVVIO ---
loadGames();

const MEEPLES = [];

// --- ✨ OGGETTI FLUTTUANTI ---
function createFloatingObjects() {
  const container = document.createElement('div');
  container.className = 'floating-objects';

  for (let i = 0; i < 6; i++) {
    const el = document.createElement('div');
    el.className = 'floating-object';

    const randomMeeple = MEEPLES[Math.floor(Math.random() * MEEPLES.length)];
    el.innerHTML = randomMeeple;

    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (18 + Math.random() * 12) + 's';

    container.appendChild(el);
  }

  document.body.appendChild(container);
}

// --- ✨ CARICA IL FILE SVG ESTERNO ---
fetch('/games/meeple.svg')
  .then(res => res.text())
  .then(svg => {
    MEEPLES.push(svg);
    createFloatingObjects();
  });

// --- 🎲 DADO 3D REALISTICO - LANCIO CON PUNTINI ---
function createDiceLauncher() {
  console.log('🎲 Inizializzazione dado launcher...');
  
  // Icona launcher
  const launcher = document.createElement('div');
  launcher.className = 'dice-launcher';
  launcher.innerHTML = '🎲';
  launcher.title = 'Lancia il dado!';
  
  // Overlay per il dado
  const overlay = document.createElement('div');
  overlay.className = 'dice-result-overlay';
  
  // Scena 3D
  const scene = document.createElement('div');
  scene.className = 'dice-scene';
  
  // Dado 3D
  const dice = document.createElement('div');
  dice.className = 'dice-3d';
  
  // Crea le 6 facce del dado con i puntini
  function createDots(num) {
    const dots = [];
    for (let i = 0; i < num; i++) {
      dots.push('<div class="dice-dot"></div>');
    }
    return dots.join('');
  }
  
  // Faccia 1
  const face1 = document.createElement('div');
  face1.className = 'dice-face';
  face1.setAttribute('data-face', '1');
  face1.innerHTML = createDots(1);
  dice.appendChild(face1);
  
  // Faccia 2
  const face2 = document.createElement('div');
  face2.className = 'dice-face';
  face2.setAttribute('data-face', '2');
  face2.innerHTML = createDots(2);
  dice.appendChild(face2);
  
  // Faccia 3
  const face3 = document.createElement('div');
  face3.className = 'dice-face';
  face3.setAttribute('data-face', '3');
  face3.innerHTML = createDots(3);
  dice.appendChild(face3);
  
  // Faccia 4
  const face4 = document.createElement('div');
  face4.className = 'dice-face';
  face4.setAttribute('data-face', '4');
  face4.innerHTML = createDots(4);
  dice.appendChild(face4);
  
  // Faccia 5
  const face5 = document.createElement('div');
  face5.className = 'dice-face';
  face5.setAttribute('data-face', '5');
  face5.innerHTML = createDots(5);
  dice.appendChild(face5);
  
  // Faccia 6
  const face6 = document.createElement('div');
  face6.className = 'dice-face';
  face6.setAttribute('data-face', '6');
  face6.innerHTML = createDots(6);
  dice.appendChild(face6);
  
  scene.appendChild(dice);
  overlay.appendChild(scene);
  
  console.log('✅ Dado 3D creato con 6 facce e puntini');
  
  // Rotazioni per mostrare ogni faccia
  const faceRotations = [
    { x: 0, y: 0 },      // Faccia 1
    { x: 0, y: 180 },    // Faccia 2
    { x: 0, y: -90 },    // Faccia 3
    { x: 0, y: 90 },     // Faccia 4
    { x: -90, y: 0 },    // Faccia 5
    { x: 90, y: 0 }      // Faccia 6
  ];
  
  // Click sul launcher per lanciare il dado
  launcher.onclick = () => {
    console.log('🎲 LANCIO DEL DADO!');
    
    if (launcher.classList.contains('rolling')) return;
    
    launcher.classList.add('rolling');
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log('🎲 Numero estratto:', randomNumber);

    // Mostra overlay
    overlay.classList.add('show');

    // Reset iniziale
    dice.style.transition = 'none';
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    // Forza il reflow
    void dice.offsetWidth;

    // 🎲 LANCIO REALISTICO - Rotazione caotica
    setTimeout(() => {
      dice.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // Tante rotazioni caotiche + rotazione finale
      const spins = 4 + Math.floor(Math.random() * 2); // 4-5 giri
      const finalRotation = faceRotations[randomNumber - 1];
      
      const randomX = Math.random() * 360;
      const randomY = Math.random() * 360;
      const randomZ = Math.random() * 360;
      
      const totalX = (360 * spins) + randomX + finalRotation.x;
      const totalY = (360 * spins) + randomY + finalRotation.y;
      const totalZ = (360 * spins) + randomZ;
      
      dice.style.transform = 
        `rotateX(${totalX}deg) rotateY(${totalY}deg) rotateZ(${totalZ}deg)`;
      
      console.log('🌀 Il dado sta rotolando...');
    }, 50);

    // Chiudi overlay dopo 3.5s
    setTimeout(() => {
      overlay.classList.remove('show');
      launcher.classList.remove('rolling');
      console.log(`👋 Risultato finale: ${randomNumber}`);
    }, 3500);
  };

  // Click sull'overlay per chiuderlo manualmente
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      launcher.classList.remove('rolling');
    }
  };
  
  document.body.appendChild(launcher);
  document.body.appendChild(overlay);
  console.log('✅ Dado launcher aggiunto al DOM');
}

// Avvia il launcher
createDiceLauncher();
