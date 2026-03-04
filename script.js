// --- 1️⃣ Supabase client ---
const supabaseClient = window.supabase.createClient(
  'https://axdwlpufjxbjxqtuveal.supabase.co',
  'sb_publishable_j3_92NhNt3Ui-GDFxbpcbQ_Km4oDBDg'
);

// ⚠️ LISTA iFINALE USATA DA TUTTO IL CODICE
// gamesRaw è definita in games-data.js, incluso prima di questo script
let games = [];

// --- 2️⃣ Riferimenti DOM ---
const grid = document.getElementById('grid');
const submitBtn = document.getElementById('submitBtn');
const nameSection = document.getElementById('nameSection');
const nameInput = document.getElementById('altroInput');
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
const loadingScreen = document.getElementById('loadingScreen');
const mainTitle = document.getElementById('mainTitle');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');
const timeFrom = document.getElementById('timeFrom');
const timeTo = document.getElementById('timeTo');
const applyDateFilter = document.getElementById('applyDateFilter');
const resetDateFilter = document.getElementById('resetDateFilter');

let selected = [];
let isAdmin = false;
let dateFilterRange = { from: null, to: null };

// Stato selezione nome
let selectedPresetName = null;

// --- 3️⃣ Stato filtri e ordinamento ---
let activeFilters = {
  playersRange: null,   // [min, max] | null
  difficulty: null,     // 'easy' | 'hard' | null
  time: null            // 'short' | 'long' | null
};

let activeSortOrder = 'default';
// 'default' | 'difficulty-asc' | 'difficulty-desc' | 'time-asc' | 'time-desc'

// --- 4️⃣ Popup ---
const popupOverlay = document.getElementById('popupOverlay');
const popupText = document.getElementById('popupText');
const popupClose = document.getElementById('popupClose');

function showPopup(game) {
  const difficultyStars = '★'.repeat(game.difficulty) + '☆'.repeat(5 - game.difficulty);

  const pdfLinkHtml = game.pdfLink
    ? `<div class="popup-section">
        <a href="${game.pdfLink}" target="_blank" rel="noopener noreferrer" class="popup-pdf-link">
          <svg class="pdf-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
            <path d="M14 2v6h6"/>
          </svg>
          <span>Regolamento</span>
        </a>
      </div>`
    : '';

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
    ${pdfLinkHtml}
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

// --- 5️⃣ CARICAMENTO GIOCHI ---
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
    games = validGames.filter(Boolean).slice(0, 50);
    games.sort((a, b) => {
      if (a.macroCategory !== b.macroCategory)
        return a.macroCategory.localeCompare(b.macroCategory, 'it');
      return a.name.localeCompare(b.name, 'it');
    });
    createFilters();
    renderGames();
    hideLoadingScreen();
  });
}

// --- 6️⃣ ANIMAZIONE TITOLO ---
function hideLoadingScreen() {
  loadingScreen.classList.add('fade-out');
  document.body.classList.add('loaded');
  setTimeout(() => { animateTitle(); }, 500);
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
    if (lineIndex < lines.length - 1) {
      mainTitle.appendChild(document.createElement('br'));
    }
  });
}

// --- 7️⃣ CREAZIONE FILTRI ---
function createFilters() {
  const container = document.getElementById('filterSection');

  // Mantieni solo l'header originale dal DOM, ricostruisci il resto
  const header = container.querySelector('.filter-header');
  container.innerHTML = '';
  container.appendChild(header);

  const content = document.createElement('div');
  content.id = 'filterContent';
  content.className = 'filter-content';
  container.appendChild(content);

  // ── 1. GIOCATORI ────────────────────────────────────────
  const playersGroup = makeFilterGroup('👥 Numero di giocatori');
  const playersRanges = [
    { label: '1–2', range: [1, 2] },
    { label: '3–4', range: [3, 4] },
    { label: '5–6', range: [5, 6] },
    { label: '7–8', range: [7, 8] },
    { label: '8+',  range: [9, 99] },
  ];

  const playersButtons = document.createElement('div');
  playersButtons.className = 'filter-buttons';

  playersRanges.forEach(({ label, range }) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn-players';
    btn.innerHTML = `👥 ${label}`;
    btn.addEventListener('click', () => {
      if (activeFilters.playersRange && activeFilters.playersRange[0] === range[0]) {
        activeFilters.playersRange = null;
        btn.classList.remove('active');
      } else {
        playersButtons.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        activeFilters.playersRange = range;
        btn.classList.add('active');
      }
      applyFilters();
    });
    playersButtons.appendChild(btn);
  });

  playersGroup.appendChild(playersButtons);
  content.appendChild(playersGroup);
  content.appendChild(makeFilterDivider());

  // ── 2. DIFFICOLTÀ ────────────────────────────────────────
  const diffGroup = makeFilterGroup('⚖️ Difficoltà');
  const diffRow = document.createElement('div');
  diffRow.className = 'filter-buttons';

  const easyBtn = document.createElement('button');
  easyBtn.className = 'filter-btn-easy';
  easyBtn.innerHTML = '🟢 Facile <small style="opacity:.7;font-weight:400">(≤ 2/5)</small>';

  const hardBtn = document.createElement('button');
  hardBtn.className = 'filter-btn-hard';
  hardBtn.innerHTML = '🔴 Difficile <small style="opacity:.7;font-weight:400">(≥ 3/5)</small>';

  easyBtn.addEventListener('click', () => toggleDifficultyFilter('easy', easyBtn, hardBtn));
  hardBtn.addEventListener('click', () => toggleDifficultyFilter('hard', hardBtn, easyBtn));

  diffRow.appendChild(easyBtn);
  diffRow.appendChild(hardBtn);
  diffGroup.appendChild(diffRow);
  content.appendChild(diffGroup);
  content.appendChild(makeFilterDivider());

  // ── 3. TEMPO ─────────────────────────────────────────────
  const timeGroup = makeFilterGroup('⏱️ Durata partita');
  const timeRow = document.createElement('div');
  timeRow.className = 'filter-buttons';

  const shortBtn = document.createElement('button');
  shortBtn.className = 'filter-btn-short';
  shortBtn.innerHTML = '⚡ Veloce <small style="opacity:.7;font-weight:400">(≤ 45 min)</small>';

  const longBtn = document.createElement('button');
  longBtn.className = 'filter-btn-long';
  longBtn.innerHTML = '🕰️ Lungo <small style="opacity:.7;font-weight:400">(&gt; 45 min)</small>';

  shortBtn.addEventListener('click', () => toggleTimeFilter('short', shortBtn, longBtn));
  longBtn.addEventListener('click', () => toggleTimeFilter('long', longBtn, shortBtn));

  timeRow.appendChild(shortBtn);
  timeRow.appendChild(longBtn);
  timeGroup.appendChild(timeRow);
  content.appendChild(timeGroup);
  content.appendChild(makeFilterDivider());

  // ── 4. ORDINAMENTO ────────────────────────────────────────
  const sortGroup = makeFilterGroup('↕️ Ordina per');
  const sortRow = document.createElement('div');
  sortRow.className = 'sort-buttons';

  const sorts = [
    { id: 'default',         icon: '🎲', label: 'Default' },
    { id: 'difficulty-asc',  icon: '⚖️↑', label: 'Più facile' },
    { id: 'difficulty-desc', icon: '⚖️↓', label: 'Più difficile' },
    { id: 'time-asc',        icon: '⏱️↑', label: 'Più breve' },
    { id: 'time-desc',       icon: '⏱️↓', label: 'Più lungo' },
  ];

  sorts.forEach(({ id, icon, label }) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn-sort' + (id === 'default' ? ' active' : '');
    btn.innerHTML = `${icon} ${label}`;
    btn.addEventListener('click', () => {
      sortRow.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSortOrder = id;
      applyFilters();
    });
    sortRow.appendChild(btn);
  });

  sortGroup.appendChild(sortRow);
  content.appendChild(sortGroup);

  // ── Clear ────────────────────────────────────────────────
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-filters';
  clearBtn.id = 'clearFilters';
  clearBtn.textContent = '✕ Rimuovi filtri';
  clearBtn.style.display = 'none';
  clearBtn.addEventListener('click', resetAllFilters);
  content.appendChild(clearBtn);

  // ── Toggle collassa/espandi ──────────────────────────────
  const filterToggleEl = container.querySelector('.filter-toggle');
  header.onclick = () => {
    content.classList.toggle('collapsed');
    if (filterToggleEl) filterToggleEl.classList.toggle('collapsed');
  };
}

// Helper: crea gruppo filtro con etichetta
function makeFilterGroup(labelText) {
  const group = document.createElement('div');
  group.className = 'filter-group';
  const label = document.createElement('div');
  label.className = 'filter-group-label';
  label.textContent = labelText;
  group.appendChild(label);
  return group;
}

// Helper: divisore visivo
function makeFilterDivider() {
  const d = document.createElement('div');
  d.className = 'filter-divider';
  return d;
}

// Toggle difficoltà (mutuamente esclusivi)
function toggleDifficultyFilter(val, activeBtn, otherBtn) {
  if (activeFilters.difficulty === val) {
    activeFilters.difficulty = null;
    activeBtn.classList.remove('active');
  } else {
    activeFilters.difficulty = val;
    activeBtn.classList.add('active');
    otherBtn.classList.remove('active');
  }
  applyFilters();
}

// Toggle tempo (mutuamente esclusivi)
function toggleTimeFilter(val, activeBtn, otherBtn) {
  if (activeFilters.time === val) {
    activeFilters.time = null;
    activeBtn.classList.remove('active');
  } else {
    activeFilters.time = val;
    activeBtn.classList.add('active');
    otherBtn.classList.remove('active');
  }
  applyFilters();
}

// Reset completo filtri + ordinamento
function resetAllFilters() {
  activeFilters = { playersRange: null, difficulty: null, time: null };
  activeSortOrder = 'default';
  document.querySelectorAll(
    '.filter-btn-players, .filter-btn-easy, .filter-btn-hard, .filter-btn-short, .filter-btn-long'
  ).forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.filter-btn-sort').forEach(b => b.classList.remove('active'));
  const defBtn = document.querySelector('.filter-btn-sort');
  if (defBtn) defBtn.classList.add('active');
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.style.display = 'none';
  renderGames();
}

// Aggiorna visibilità clearBtn e ridisegna
function applyFilters() {
  const hasFilter = activeFilters.playersRange || activeFilters.difficulty || activeFilters.time;
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.style.display = hasFilter ? 'inline-block' : 'none';
  renderGames();
}

// --- 8️⃣ RENDERING GIOCHI ---
function renderGames() {
  grid.innerHTML = '';
  let filtered = [...games];

  // Filtro giocatori per range
  if (activeFilters.playersRange) {
    const [rMin, rMax] = activeFilters.playersRange;
    filtered = filtered.filter(g => g.players.max >= rMin && g.players.min <= rMax);
  }

  // Filtro difficoltà
  if (activeFilters.difficulty === 'easy') {
    filtered = filtered.filter(g => Number(g.difficulty) <= 2);
  } else if (activeFilters.difficulty === 'hard') {
    filtered = filtered.filter(g => Number(g.difficulty) >= 3);
  }

  // Filtro tempo
  if (activeFilters.time === 'short') {
    filtered = filtered.filter(g => g.time.max <= 45);
  } else if (activeFilters.time === 'long') {
    filtered = filtered.filter(g => g.time.max > 45);
  }

  // Ordinamento
  switch (activeSortOrder) {
    case 'difficulty-asc':
      filtered.sort((a, b) => Number(a.difficulty) - Number(b.difficulty));
      break;
    case 'difficulty-desc':
      filtered.sort((a, b) => Number(b.difficulty) - Number(a.difficulty));
      break;
    case 'time-asc':
      filtered.sort((a, b) => a.time.max - b.time.max);
      break;
    case 'time-desc':
      filtered.sort((a, b) => b.time.max - a.time.max);
      break;
    default:
      filtered.sort((a, b) => {
        if (a.macroCategory !== b.macroCategory)
          return a.macroCategory.localeCompare(b.macroCategory, 'it');
        return a.name.localeCompare(b.name, 'it');
      });
  }

  // Messaggio lista vuota
  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'grid-column:1/-1;text-align:center;padding:40px;color:rgba(255,255,255,0.6);font-size:1.1rem;';
    empty.textContent = 'Nessun gioco corrisponde ai filtri selezionati.';
    grid.appendChild(empty);
    return;
  }

  // Header di categoria solo nell'ordinamento default
  const showCategoryHeaders = activeSortOrder === 'default';
  let currentCategory = null;

  filtered.forEach(game => {
    if (showCategoryHeaders && game.macroCategory !== currentCategory) {
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
  if (selected.includes(game.id)) div.classList.add('selected');

  const difficultyClass = game.difficulty < 3 ? 'easy' : 'hard';
  div.innerHTML = `
    <img src="${game.image}" alt="${game.name}" class="${game.imageClass || ''}">
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

// --- 9️⃣ Mostra sezione nome ---
submitBtn.onclick = () => {
  nameSection.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  selectedPresetName = null;
  nameInput.style.display = 'none';
  nameInput.value = '';
  document.querySelectorAll('.name-preset-btn').forEach(b => b.classList.remove('selected-name'));
};

// Gestione pulsanti nome preimpostati
document.getElementById('nameButtonsGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('.name-preset-btn');
  if (!btn) return;

  const name = btn.getAttribute('data-name');
  document.querySelectorAll('.name-preset-btn').forEach(b => b.classList.remove('selected-name'));
  btn.classList.add('selected-name');

  if (name === '__altro__') {
    selectedPresetName = '__altro__';
    nameInput.style.display = 'block';
    nameInput.focus();
  } else {
    selectedPresetName = name;
    nameInput.style.display = 'none';
    nameInput.value = '';
  }
});

// --- 🔟 Chiudi sezione nome ---
closeNameSectionBtn.onclick = () => {
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 1️⃣1️⃣ Invia dati a Supabase ---
sendBtn.onclick = async () => {
  let name = null;

  if (selectedPresetName === null) {
    alert('Seleziona il tuo nome!');
    return;
  }

  if (selectedPresetName === '__altro__') {
    const customName = nameInput.value.trim();
    name = customName || null;
  } else {
    name = selectedPresetName;
  }

  const { data: participant, error } = await supabaseClient
    .from('participants')
    .insert({ name })
    .select()
    .single();

  if (error) { alert(error.message); return; }

  const rows = selected.map(game_id => ({
    participant_id: participant.id,
    game_id
  }));

  const { error: selectionError } = await supabaseClient
    .from('selections')
    .insert(rows);

  if (selectionError) { alert(selectionError.message); return; }

  alert('Scelte inviate!');
  selected = [];
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  nameInput.value = '';
  selectedPresetName = null;
  submitBtn.style.display = 'none';
  nameSection.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// --- 1️⃣2️⃣ ADMIN PANEL ---
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

// --- 1️⃣3️⃣ Filtro date + orario admin ---
applyDateFilter.onclick = () => {
  const fromDate = dateFrom.value || null;
  const fromTime = timeFrom.value || '00:00';
  const toDate   = dateTo.value   || null;
  const toTime   = timeTo.value   || '23:59';

  dateFilterRange.from = fromDate ? `${fromDate}T${fromTime}:00` : null;
  dateFilterRange.to   = toDate   ? `${toDate}T${toTime}:59`    : null;
  loadAdminData();
};

resetDateFilter.onclick = () => {
  dateFilterRange.from = null;
  dateFilterRange.to   = null;
  dateFrom.value = '';
  dateTo.value   = '';
  timeFrom.value = '';
  timeTo.value   = '';
  loadAdminData();
};

// --- 1️⃣4️⃣ Carica dati admin ---
async function loadAdminData() {
  let participantsQuery = supabaseClient
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  if (dateFilterRange.from) participantsQuery = participantsQuery.gte('created_at', dateFilterRange.from);
  if (dateFilterRange.to)   participantsQuery = participantsQuery.lte('created_at', dateFilterRange.to);

  const { data: participants } = await participantsQuery;
  if (!participants) { alert('Errore nel caricamento dei dati'); return; }

  const participantIds = participants.map(p => p.id);

  let selectionsQuery = supabaseClient.from('selections').select('*');
  if (participantIds.length > 0) {
    selectionsQuery = selectionsQuery.in('participant_id', participantIds);
  } else {
    selectionsQuery = selectionsQuery.eq('participant_id', -1);
  }

  const { data: selections } = await selectionsQuery;
  displayVotesTable(participants, selections || []);
  displayChart(selections || []);
}

// --- 1️⃣5️⃣ Tabella voti ---
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

// --- 1️⃣6️⃣ Grafico ---
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
  const data   = sortedGames.map(([, count]) => count);
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

// --- 1️⃣7️⃣ Reset dati ---
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

fetch('/games/meeple.svg')
  .then(res => res.text())
  .then(svg => {
    MEEPLES.push(svg);
    createFloatingObjects();
  });

// --- 🎲 DADO 3D REALISTICO ---
function createDiceLauncher() {
  const launcher = document.createElement('div');
  launcher.className = 'dice-launcher';
  launcher.innerHTML = '🎲';
  launcher.title = 'Lancia il dado!';

  const overlay = document.createElement('div');
  overlay.className = 'dice-result-overlay';

  const scene = document.createElement('div');
  scene.className = 'dice-scene';

  const dice = document.createElement('div');
  dice.className = 'dice-3d';

  function createDots(num) {
    const dots = [];
    for (let i = 0; i < num; i++) dots.push('<div class="dice-dot"></div>');
    return dots.join('');
  }

  for (let i = 1; i <= 6; i++) {
    const face = document.createElement('div');
    face.className = 'dice-face';
    face.setAttribute('data-face', String(i));
    face.innerHTML = createDots(i);
    dice.appendChild(face);
  }

  scene.appendChild(dice);
  overlay.appendChild(scene);

  const faceRotations = [
    { x: 0,   y: 0   },
    { x: 0,   y: 180 },
    { x: 0,   y: -90 },
    { x: 0,   y: 90  },
    { x: -90, y: 0   },
    { x: 90,  y: 0   }
  ];

  launcher.onclick = () => {
    if (launcher.classList.contains('rolling')) return;
    launcher.classList.add('rolling');
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    overlay.classList.add('show');

    dice.style.transition = 'none';
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
    void dice.offsetWidth;

    setTimeout(() => {
      dice.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const spins = 4 + Math.floor(Math.random() * 2);
      const finalRotation = faceRotations[randomNumber - 1];
      const totalX = (360 * spins) + Math.random() * 360 + finalRotation.x;
      const totalY = (360 * spins) + Math.random() * 360 + finalRotation.y;
      const totalZ = (360 * spins) + Math.random() * 360;
      dice.style.transform = `rotateX(${totalX}deg) rotateY(${totalY}deg) rotateZ(${totalZ}deg)`;
    }, 50);

    setTimeout(() => {
      overlay.classList.remove('show');
      launcher.classList.remove('rolling');
    }, 3500);
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      launcher.classList.remove('rolling');
    }
  };

  document.body.appendChild(launcher);
  document.body.appendChild(overlay);
}

createDiceLauncher();
