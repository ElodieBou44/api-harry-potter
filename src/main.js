import App from "./modules/App.js";

// Instanciation d'un nouvel objet app de la classe App
const app = new App();

/**
 * Fonction d'ajout d'un bouton de réinitialisation à la fin
 * @param élément du formulaire auquel on doit attacher le bouton
 */
function addClearButton(formName) {
	const formButton = document.createElement("button");
	formButton.type = "reset";
	formButton.innerHTML = "Clear";
	formName.appendChild(formButton);
}

// **************************** RECHERCHE ****************************

const searchInputEl = document.querySelector("input[name='search']");
const searchButtonEl = document.querySelector("#searchForm button");

searchButtonEl.addEventListener("click", (evt) => {
	evt.preventDefault();
	const searchString = searchInputEl.value;
	app.searchCharacters(searchString);
});

// **************************** VUE ****************************
const viewForm = document.getElementById("viewForm");

viewForm.addEventListener("click", (evt) => {
	const selectedInput = viewForm.querySelector('input[name="view"]:checked');
	const selectedValue = selectedInput.value;
	const mainEl = document.querySelector("main");
	if (selectedValue == "grille") {
		mainEl.className = "grille";
	} else {
		mainEl.className = "liste";
	}
});

// **************************** TRI ****************************

const sortForm = document.getElementById("sortForm");
addClearButton(sortForm);

const selectSort = document.getElementById("sort");

// Écouteur d'événement du tri
selectSort.addEventListener("change", () => {
	const selectedOption = selectSort.value;
	let order = "";
	app.sortSelectedOption(selectedOption);
});

// Écouteur d'événement du bouton de vidage
const sortButton = sortForm.querySelector("button");
sortButton.addEventListener("click", (event) => {
	app.displayCharacters(app.characters);
});

// **************************** FILTRE ****************************

const filterForm = document.getElementById("filterForm");

// Ajout des filtres de façon dynamique
app.addFilters();
const filterInputs = filterForm.querySelectorAll("input[name='filter']");

// Écouteur d'événement pour la sélection d'un input
filterInputs.forEach((input) => {
	input.addEventListener("click", (event) => {
		const selectedFilter = event.target.value;
		const filterString = selectedFilter;
		let results = app.searchCharacters(filterString);
	});
});

// Ajout d'un bouton de vidage
addClearButton(filterForm);

// Écouteur d'événement du bouton de vidage
const filterButton = filterForm.querySelector("button");
filterButton.addEventListener("click", (event) => {
	app.displayCharacters(app.characters);
});
