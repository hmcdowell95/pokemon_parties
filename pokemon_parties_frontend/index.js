const BASE_URL = "http://localhost:3000"
const GAME_URL = `${BASE_URL}/games`
const POKEMON_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(GAME_URL)
    .then(resp => resp.json())
    .then(json => rendergames(json));
    
})

function rendergames(info) {
    for (const game of info) {
        new_game(game)
    }
}

function new_game(game) {
    let a = document.createElement("div");
    a.className = "card";
    a.id = game.id;
    a.innerHTML = `<h2>${game.name}</h2><p>Trainer: ${game.trainer_name}</p>
    <button data-game-id="${game.id}" class="add">Add Pokemon</button>
    <form id="${game.name}" style="display: none">
    <input type="hidden" id="train" value="${game.id}">
    <label>Pokemon species:</label>
    <input type="text" id="new_species"><br>
    <label>Nickname:</label>
    <input type="text" id="new_name"><br>
    <label>Level:</label>
    <input type="text" id="levels"><br>
    <input type="submit" class="submit-pokemon">
    </form>
    <ul></ul>`;
    document.getElementsByTagName("main")[0].appendChild(a);
    a.children[2].addEventListener("click", function() {
        document.getElementById(`${game.name}`).style.display="block"
    });
    a.children[3].getElementsByClassName('submit-pokemon')[0].addEventListener("click", e => add_pokemon(e))
}

function create_game() {
    let n = document.getElementById('new_game').value;
    let t = document.getElementById('new_trainer').value;
    const config = {method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    },
    body: JSON.stringify({name: n, trainer_name: t})
    };
    fetch(GAME_URL, config)
    // .then(response => response.json())
    // .then(data => console.log(data))
}

document.getElementById('create_game').addEventListener("click", function(e) {
    e.preventDefault();
    create_game();
    document.getElementById('new_game').value = "";
    document.getElementById('new_trainer').value = "";
})

function Pokemon(species, nickname, type, level, game_id) {
    return {species, nickname, type, level, game_id}
}

function add_pokemon(b) {
    b.preventDefault();
    console.log(b.path)
    // checks if valid pokemon and grabs types
    // create pokemon class object
    // then run fetch to create
    // and put on page
}