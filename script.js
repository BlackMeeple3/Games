// --- 1️⃣ Supabase client ---
const supabaseClient = window.supabase.createClient(
  'https://axdwlpufjxbjxqtuveal.supabase.co',  
  'sb_publishable_j3_92NhNt3Ui-GDFxbpcbQ_Km4oDBDg'  // La tua chiave originale
);

// --- 2️⃣ Lista giochi con nomi e descrizioni ---
const games = [
  { id: 'game-1', name: 'Cascadia', description: `**Cascadia** è un gioco da tavolo per 1-4 giocatori della durata di circa 30-45 minuti, in cui i partecipanti costruiscono ecosistemi combinando tessere habitat e gettoni fauna per ottenere punti vittoria, bilanciando strategia e semplicità.`, image: 'games/game-1.jpg' },
  { id: 'game-2', name: 'Blood Rage', description: `**Blood Rage** è un gioco da tavolo per 2-4 giocatori della durata di circa 60-90 minuti, in cui i partecipanti guidano clan vichinghi in battaglie epiche, saccheggiando terre, guadagnando gloria e avanzando sul Ragnarök, combinando strategia di combattimento, gestione carte e controllo del territorio.`, image: 'games/game-2.jpg' },
  { id: 'game-3', name: 'Forest Shuffle', description: `Forest Shuffle è un gioco di carte strategico per 2‑5 giocatori della durata di circa 40‑60 minuti, in cui i partecipanti competono per raccogliere gli alberi più preziosi e attirare specie diverse per creare un habitat forestale equilibrato e ottenere il maggior numero di punti vittoria.`, image: 'games/game-3.jpg' },
  { id: 'game-4', name: 'Carcassone', description: `Carcassonne è un gioco da tavolo per 2-5 giocatori della durata di circa 30-45 minuti, in cui i partecipanti piazzano tessere per costruire città, strade e campi, collocando i propri meeple strategicamente per guadagnare punti vittoria e dominare il paesaggio medievale.`, image: 'games/game-4.jpg' },
  { id: 'game-5', name: 'Puerto Rico', description: `Puerto Rico è un gioco da tavolo per 2-5 giocatori della durata di circa 90-150 minuti, in cui i partecipanti gestiscono piantagioni, edifici e coloni sull’isola di Puerto Rico, ottimizzando produzione e spedizioni per guadagnare punti vittoria e diventare il governatore più potente.`, image: 'games/game-5.jpg' },
  { id: 'game-6', name: 'Castles of Burgundy', description: `The Castles of Burgundy è un gioco da tavolo per 2-4 giocatori della durata di circa 30-90 minuti, in cui i partecipanti sviluppano la propria regione nel Ducato di Borgogna piazzando tessere, commerciando e sfruttando abilità speciali per guadagnare punti vittoria strategicamente.`, image: 'games/game-6.jpg' },
  // Aggiungi qui gli altri giochi con i loro nomi e descrizioni
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `game-${i + 7}`,  // inizio da game-7 per evitare duplicati
    name: `Gioco ${i + 7}`,
    description: `Descrizione gioco ${i + 7}`,
    image: `games/game-${i + 7}.jpg`
  }))
];


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

// --- 4️⃣ Render griglia giochi solo immagini esistenti (con icona info) ---
games.forEach(game => {
  const img = new Image();
  img.src = game.image;

  img.onload = () => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <div class="info-icon">ℹ️</div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-description hidden">${game.description}</div>
      </div>
    `;

    // Selezione gioco al click sulla card (esclusa l'icona)
    div.onclick = (e) => {
      if (e.target.classList.contains('info-icon')) return; // Ignora click su info
      if (selected.includes(game.id)) {
        selected = selected.filter(id => id !== game.id);
        div.classList.remove('selected');
      } else {
        selected.push(game.id);
        div.classList.add('selected');
      }
      submitBtn.style.display = selected.length ? 'block' : 'none';
    };

    // Mostra/nascondi descrizione al click sull'icona info
    const infoIcon = div.querySelector('.info-icon');
    const description = div.querySelector('.game-description');
    infoIcon.onclick = (e) => {
      e.stopPropagation(); // Blocca propagazione al click della card
      description.classList.toggle('hidden');
    };

    grid.appendChild(div);
  };
});


// --- 5️⃣ Mostra sezione nome ---
submitBtn.onclick = () => {
  nameSection.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// --- 6️⃣ Chiudi sezione nome ---
closeNameSectionBtn.onclick = () => {
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 7️⃣ Invia dati a Supabase ---
sendBtn.onclick = async () => {
  const name = nameInput.value.trim() || null;
  
  const { data: participant, error } = await supabaseClient
    .from('participants')
    .insert({ name })
    .select()
    .single();
  
  if (error) {
    console.error("Errore Supabase partecipante:", error);
    alert('Errore Supabase: ' + error.message);
    nameSection.classList.add('hidden');
    document.body.style.overflow = 'auto';
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
    console.error("Errore Supabase selezioni:", selectionError);
    alert('Errore salvataggio selezioni: ' + selectionError.message);
    nameSection.classList.add('hidden');
    document.body.style.overflow = 'auto';
    return;
  }
  
  alert('Scelte inviate!');
  selected = [];
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
  nameInput.value = '';
  submitBtn.style.display = 'none';
};

// --- 8️⃣ ADMIN PANEL ---
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
  const password = adminPasswordInput.value;
  if (password === 'ori3') {
    isAdmin = true;
    adminPasswordSection.classList.add('hidden');
    adminContent.classList.remove('hidden');
    loadAdminData();
  } else {
    alert('Password errata!');
    adminPasswordInput.value = '';
  }
};

// --- 9️⃣ Carica dati admin ---
async function loadAdminData() {
  // Carica partecipanti
  const { data: participants } = await supabaseClient
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });
  
  // Carica selezioni
  const { data: selections } = await supabaseClient
    .from('selections')
    .select('*');
  
  if (!participants || !selections) {
    alert('Errore nel caricamento dei dati');
    return;
  }
  
  // Mostra tabella voti
  displayVotesTable(participants, selections);
  
  // Mostra grafico
  displayChart(selections);
}

// --- 🔟 Mostra tabella voti ---
function displayVotesTable(participants, selections) {
  const tableDiv = document.getElementById('votesTable');
  let html = '<h3>Voti per Partecipante</h3><div style="overflow-x:auto;">';
  
  participants.forEach(p => {
    const userSelections = selections
      .filter(s => s.participant_id === p.id)
      .map(s => {
        const game = games.find(g => g.id === s.game_id);
        return game ? game.name : s.game_id;
      })
      .join(', ');
    
    html += `
      <div style="padding:12px; border-bottom:1px solid #eee;">
        <strong>${p.name || 'Anonimo'}</strong> (${new Date(p.created_at).toLocaleString('it-IT')})<br>
        <small>Voti: ${userSelections || 'Nessuno'}</small>
      </div>
    `;
  });
  
  html += '</div>';
  tableDiv.innerHTML = html;
}

// --- 1️⃣1️⃣ Mostra grafico ---
function displayChart(selections) {
  // Conta voti per gioco
  const voteCounts = {};
  selections.forEach(s => {
    voteCounts[s.game_id] = (voteCounts[s.game_id] || 0) + 1;
  });
  
  // Ordina per numero voti (decrescente)
  const sortedGames = Object.entries(voteCounts)
    .sort((a, b) => b[1] - a[1]);
  
  if (sortedGames.length === 0) {
    document.getElementById('chartContainer').innerHTML = '<p>Nessun voto ancora</p>';
    return;
  }
  
  const labels = sortedGames.map(([gameId]) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.name : gameId;
  });
  const data = sortedGames.map(([, count]) => count);
  
  // Colori vivaci
  const colors = sortedGames.map((_, i) => {
    const hue = (i * 137.5) % 360; // Golden angle
    return `hsl(${hue}, 70%, 60%)`;
  });
  
  // Crea grafico con Chart.js
  const ctx = chartCanvas.getContext('2d');
  
  // Distruggi grafico precedente se esistente
  if (window.adminChart) {
    window.adminChart.destroy();
  }
  
  window.adminChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Numero Voti',
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('60%', '40%')),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Giochi Più Votati',
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      }
    }
  });
}

// --- 1️⃣2️⃣ Reset dati ---
resetDataBtn.onclick = async () => {
  if (!confirm('Sei sicuro di voler cancellare TUTTI i dati? Questa azione è irreversibile!')) {
    return;
  }
  
  try {
    // Elimina tutte le selezioni
    const { error: selectionsError } = await supabaseClient
      .from('selections')
      .delete()
      .gte('id', 0); // Elimina tutte le righe
    
    if (selectionsError) {
      alert('Errore eliminazione selezioni: ' + selectionsError.message);
      return;
    }
    
    // Elimina tutti i partecipanti
    const { error: participantsError } = await supabaseClient
      .from('participants')
      .delete()
      .gte('id', 0); // Elimina tutte le righe
    
    if (participantsError) {
      alert('Errore eliminazione partecipanti: ' + participantsError.message);
      return;
    }
    
    alert('Tutti i dati sono stati cancellati!');
    loadAdminData();
  } catch (error) {
    console.error('Errore durante reset:', error);
    alert('Errore durante il reset dei dati');
  }
};
