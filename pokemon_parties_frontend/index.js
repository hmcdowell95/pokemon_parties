const BASE_URL = "http://localhost:3000"
const GAME_URL = `${BASE_URL}/games`
const POKEMON_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(GAME_URL)
    .then(resp => resp.json())
    .then(json => rendergames(json))
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
    a.innerHTML = `<h2>${game.name}</h2>
    <button data-game-id="${game.id}" class="add">Add Pokemon</button>
    <form id="${game.name}" style="display: none">
    <input type="hidden" id="train" value="${game.id}">
    <label>Pokemon species:</label>
    <input type="text" id="new_species"><br>
    <label>Nickname:</label>
    <input type="text" id="new_name"><br>
    <label>Level:</label>
    <input type="text" id="levels"><br>
    <input type="submit" id="submit-pokemon">
    </form>
    <ul></ul>`;
    document.getElementsByTagName("body")[0].appendChild(a);
}