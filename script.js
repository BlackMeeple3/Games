// --- 1️⃣ Supabase client ---
const supabaseClient = window.supabase.createClient(
  'https://axdwlpufjxbjxqtuveal.supabase.co',  // sostituisci con il tuo URL
  'sb_publishable_j3_92NhNt3Ui-GDFxbpcbQ_Km4oDBDg' // sostituisci con la tua anon key
);

// --- 2️⃣ Lista giochi ---
const games = Array.from({ length: 50 }, (_, i) => ({
  id: `game-${i + 1}`,
  image: `games/game-${i + 1}.jpg`
}));

// --- 3️⃣ Riferimenti DOM ---
const grid = document.getElementById('grid');
const submitBtn = document.getElementById('submitBtn');
const modal = document.getElementById('modal');
const nameInput = document.getElementById('nameInput');
const sendBtn = document.getElementById('send');

let selected = [];

// --- 4️⃣ Render griglia giochi ---
games.forEach(game => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<img src="${game.image}" alt="Gioco ${game.id}">`;

  div.onclick = () => {
    if (selected.includes(game.id)) {
      selected = selected.filter(id => id !== game.id);
      div.classList.remove('selected');
    } else {
      selected.push(game.id);
      div.classList.add('selected');
    }
    submitBtn.style.display = selected.length ? 'block' : 'none';
  };

  grid.appendChild(div);
});

// --- 5️⃣ Mostra il modal quando clicchi Invia ---
submitBtn.onclick = () => {
  modal.classList.remove('hidden');
  // blocco scroll solo sotto il modal
  document.body.style.overflow = 'hidden';
};

// --- 6️⃣ Funzione chiudi modal ---
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto'; // riabilita scroll pagina
}

// --- 7️⃣ Invia dati a Supabase ---
sendBtn.onclick = async () => {
  const name = nameInput.value.trim() || null;

  // Inserisci partecipante
  const { data: participant, error } = await supabaseClient
    .from('participants')
    .insert({ name })
    .select()
    .single();

  if (error) {
    alert('Errore Supabase: ' + error.message);
    closeModal();
    return;
  }

  // Inserisci selezioni
  const rows = selected.map(game_id => ({
    participant_id: participant.id,
    game_id
  }));

  const { error: selectionError } = await supabaseClient
    .from('selections')
    .insert(rows);

  if (selectionError) {
    alert('Errore salvataggio selezioni: ' + selectionError.message);
    closeModal();
    return;
  }

  alert('Scelte inviate!');
  selected = [];
  closeModal();
  // reset input
  nameInput.value = '';
  // nascondi bottone invio
  submitBtn.style.display = 'none';
};
