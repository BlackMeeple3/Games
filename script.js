// --- 1️⃣ Supabase client ---
const supabaseClient = window.supabase.createClient(
  'https://axdwlpufjxbjxqtuveal.supabase.co',  
  'sb_publishable_j3_92NhNt3Ui-GDFxbpcbQ_Km4oDBDg'
);

// --- 2️⃣ Lista giochi con nomi e descrizioni ---
const gamesRaw = [
  {
    id: 'game-1',
    name: 'Cascadia',
    description: `**Cascadia** è un gioco da tavolo per 1-4 giocatori della durata di circa 30-45 minuti, in cui i partecipanti costruiscono ecosistemi combinando tessere habitat e gettoni fauna per ottenere punti vittoria, bilanciando strategia e semplicità.`,
    image: 'games/game-1.jpg'
  },
  {
    id: 'game-2',
    name: 'Blood Rage',
    description: `**Blood Rage** è un gioco da tavolo per 2-4 giocatori della durata di circa 60-90 minuti, in cui i partecipanti guidano clan vichinghi in battaglie epiche, saccheggiando terre, guadagnando gloria e avanzando sul Ragnarök, combinando strategia di combattimento, gestione carte e controllo del territorio.`,
    image: 'games/game-2.jpg'
  },
  {
    id: 'game-3',
    name: 'Forest Shuffle',
    description: `Forest Shuffle è un gioco di carte strategico per 2-5 giocatori della durata di circa 40-60 minuti, in cui i partecipanti competono per raccogliere gli alberi più preziosi e attirare specie diverse per creare un habitat forestale equilibrato e ottenere il maggior numero di punti vittoria.`,
    image: 'games/game-3.jpg'
  },
  {
    id: 'game-4',
    name: 'Carcassonne',
    description: `Carcassonne è un gioco da tavolo per 2-5 giocatori della durata di circa 30-45 minuti, in cui i partecipanti piazzano tessere per costruire città, strade e campi, collocando i propri meeple strategicamente per guadagnare punti vittoria e dominare il paesaggio medievale.`,
    image: 'games/game-4.jpg'
  },
  {
    id: 'game-5',
    name: 'Puerto Rico',
    description: `Puerto Rico è un gioco da tavolo per 2-5 giocatori della durata di circa 90-150 minuti, in cui i partecipanti gestiscono piantagioni, edifici e coloni sull’isola di Puerto Rico, ottimizzando produzione e spedizioni per guadagnare punti vittoria e diventare il governatore più potente.`,
    image: 'games/game-5.jpg'
  },
  {
    id: 'game-6',
    name: 'The Castles of Burgundy',
    description: `The Castles of Burgundy è un gioco da tavolo per 2-4 giocatori della durata di circa 30-90 minuti, in cui i partecipanti sviluppano la propria regione nel Ducato di Borgogna piazzando tessere, commerciando e sfruttando abilità speciali per guadagnare punti vittoria strategicamente.`,
    image: 'games/game-6.jpg'
  }
];

// ⚠️ LISTA FINALE USATA DA TUTTO IL CODICE
let games = [];


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

let selected = [];
let isAdmin = false;

// --- 4️⃣ Popup ---
const popupOverlay = document.getElementById('popupOverlay');
const popupText = document.getElementById('popupText');
const popupClose = document.getElementById('popupClose');

function showPopup(text) {
  popupText.innerHTML = text;
  popupOverlay.classList.add('active');
}

function closePopup() {
  popupOverlay.classList.remove('active');
}

popupClose.onclick = closePopup;
popupOverlay.onclick = (e) => {
  if (e.target === popupOverlay) closePopup();
};

// --- 5️⃣ CARICAMENTO GIOCHI (immagini valide, ordine alfabetico, max 50) ---
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
      .sort((a, b) => a.name.localeCompare(b.name, 'it'))
      .slice(0, 50);

    games.forEach(renderGame);
  });
}

function renderGame(game) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${game.image}" alt="${game.name}">
    <div class="info-icon">ℹ️</div>
    <div class="game-info">
      <div class="game-name">${game.name}</div>
    </div>
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
    showPopup(game.description);
  };

  grid.appendChild(div);
}

// --- 6️⃣ Mostra sezione nome ---
submitBtn.onclick = () => {
  nameSection.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// --- 7️⃣ Chiudi sezione nome ---
closeNameSectionBtn.onclick = () => {
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 8️⃣ Invia dati a Supabase ---
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

// --- 9️⃣ ADMIN PANEL ---
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

// --- 🔟 Carica dati admin ---
async function loadAdminData() {
  const { data: participants } = await supabaseClient
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: selections } = await supabaseClient
    .from('selections')
    .select('*');

  if (!participants || !selections) {
    alert('Errore nel caricamento dei dati');
    return;
  }

  displayVotesTable(participants, selections);
  displayChart(selections);
}

// --- 1️⃣1️⃣ Tabella voti ---
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

// --- 1️⃣2️⃣ Grafico ---
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

// --- 1️⃣3️⃣ Reset dati ---
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
