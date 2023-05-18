import App from "./modules/App.js";

// Créer une nouvelle application.
// On a seulement à instancer une seule application, plutôt que plusieurs objets.
const app = new App();

// On peut utiliser cette page pour faire tout ce qui n'a pas rapport à l'application, mais qui a rapport à l'interface.

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
	// evt.preventDefault();
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
// Ajout de selects, d'options de tri et d'un bouton 'clear' à l'aide de Javascript
app.addOptions();
const sortForm = document.getElementById("sortForm");
addClearButton(sortForm);

const selectSortAD = document.getElementById("asc/desc");
const selectSortND = document.getElementById("name/date");

// Écouteur d'événement pour le tri Ascendant/Descendant
selectSortAD.addEventListener("change", () => {
	const selectedOptionAD = selectSortAD.value;
	let order = "";
	switch (selectedOptionAD) {
		case "asc":
			order = "asc";
			break;
		case "desc":
			order = "desc";
			break;
		default:
			order = "asc";
	}
	// Écouteur d'événement pour le tri Nom/Date
	selectSortND.addEventListener("change", () => {
		const selectedOptionND = selectSortND.value;
		app.sortSelectedOptionND(selectedOptionND, order);
	});
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
	console.log(app.characters);
});
