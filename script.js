const supabaseClient = window.supabase.createClient(
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY'
)

const games = Array.from({ length: 50 }, (_, i) => ({
  id: `game-${i + 1}`,
  image: `games/game-${i + 1}.jpg`
}))

const grid = document.getElementById('grid')
const submitBtn = document.getElementById('submitBtn')
const modal = document.getElementById('modal')

let selected = []

games.forEach(game => {
  const div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `<img src="${game.image}">`

  div.onclick = () => {
    if (selected.includes(game.id)) {
      selected = selected.filter(id => id !== game.id)
      div.classList.remove('selected')
    } else {
      selected.push(game.id)
      div.classList.add('selected')
    }
    submitBtn.style.display = selected.length ? 'block' : 'none'
  }

  grid.appendChild(div)
})

submitBtn.onclick = () => modal.classList.remove('hidden')

document.getElementById('send').onclick = async () => {
  const name = document.getElementById('nameInput').value || null

  const { data: participant, error } = await supabaseClient
    .from('participants')
    .insert({ name })
    .select()
    .single()

  if (error) {
    alert('Errore Supabase')
    return
  }

  const rows = selected.map(game_id => ({
    participant_id: participant.id,
    game_id
  }))

  await supabaseClient.from('selections').insert(rows)

  modal.classList.add('hidden')
  alert('Scelte inviate!')
  selected = []
}
