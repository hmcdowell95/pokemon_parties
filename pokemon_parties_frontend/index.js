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
    if (n.trim() === "" || t.trim() === "") {return alert("inputs cannot be blank")}
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
    this.species = species;
    this.nickname = nickname;
    this.type = type;
    this.level = level;
    this.game_id = game_id;
}
// ^^^ add level up function

function add_pokemon(b) {
    b.preventDefault();
    let form_inputs = b.path[1].getElementsByTagName('input');
    form_inputs[1].value = form_inputs[1].value.toLowerCase();
    if (form_inputs[1].value.trim() === "") {return alert("Species can't be blank")}
    fetch(`https://pokeapi.co/api/v2/pokemon/${form_inputs[1].value}`)
    .then(resp => {if (resp.ok) {return resp.json()} else {throw new Error("Invalid species")}})
    .then(json => {get_types(json.types.map(x => x.type.name))})
    .catch((error) => alert(error));
    function get_types(t) {
        let ty = t.join(" and ");
        let s = form_inputs[1].value.charAt(0).toUpperCase() + form_inputs[1].value.slice(1);
        let n = form_inputs[2].value.trim();
        let l = parseInt(form_inputs[3].value);
        if (n === "") {n = s};
        if (isNaN(l) || l < 1 || l > 100) {l = 1};
        let newpokemon = new Pokemon(s, n, ty, l, parseInt(form_inputs[0].value));
        add_to_database(newpokemon);
        pokemon_on_page(newpokemon);
        form_inputs[1].value = "";
        form_inputs[2].value = "";
        form_inputs[3].value = "";
        b.path[1].style.display="none";
    }
}

function add_to_database(p) {
    let config = {method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(p)
    };
    fetch(POKEMON_URL, config)
}

function pokemon_on_page(p) {
    let parent = document.getElementById(p.game_id).lastChild;
    let poke = document.createElement('li');
    console.log(p)
    poke.innerHTML = `<p>Name: ${p.nickname}, Species: ${p.species}</p>
    <p>Type: ${p.type}, Level: ${p.level}</p><button class="remove">Release</button>`;
    parent.appendChild(poke);
    // add lister for button
}

// make lister function here