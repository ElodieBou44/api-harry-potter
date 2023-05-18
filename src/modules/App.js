// Point central de l'application qui va venir jouer avec les données et afficher des méthodes pour modifier / filtrer / rechercher dans les données.

import characters from "../data/characters.js";

export default class App {
	characters;
	#selectedCharacters;

	/**
	 * Constructeur de la propriété 'characters'
	 */
	constructor() {
		this.characters = characters;
		this.#selectedCharacters = [];
		// Appel de la méthode d'affichage
		this.displayCharacters(this.characters);
	}

	// ************************************ AFFICHAGE ************************************

	/**
	 * Méthode d'affichage des caractères en vue Liste
	 * @param {array} tCharacters = caractères que l'on veut afficher
	 */
	displayCharacters(tCharacters) {
		const mainEl = document.querySelector("main");
		const ulEl = document.createElement("ul");
		mainEl.innerHTML = "";
		console.log(tCharacters);
		tCharacters.forEach((character) => {
			const liEl = document.createElement("li");
			const articleEl = document.createElement("article");

			// Aller chercher le formulaire de vue et l'input sélectionnés
			const viewForm = document.getElementById("viewForm");
			const selectedInput = viewForm.querySelector(
				'input[name="view"]:checked'
			);
			const selectedValue = selectedInput.value;
			articleEl.innerHTML = `
					<img src="${character.image}" alt="Image for ${character.name}">
					<h2>${character.name}</h2>
					<h3 class="opt">${character.alternate_names}</h3>
					<ul class="opt">
					  <li>DoB - ${character.dateOfBirth}</li>
					  <li>House - ${character.house}</li>
					  <li>Patronus - ${character.patronus}</li>
					</ul>
					`;

			liEl.appendChild(articleEl);
			ulEl.appendChild(liEl);
		});

		mainEl.appendChild(ulEl);
	}

	// ************************************* FILTRE *************************************
	/**
	 * Méthode d'ajout de filtres de façon dynamique
	 */
	addFilters() {
		// Pour les maisons
		let tHouse = [];
		this.characters.forEach(function (character) {
			const house = character.house;
			if (!tHouse.includes(house) && house != "") {
				tHouse.push(house);
			}
		});
		const filterForm = document.getElementById("filterForm");
		const labelFilterHouse = document.createElement("label");
		labelFilterHouse.innerHTML = `Filters<br><br><h4>Houses</h4>`;
		filterForm.appendChild(labelFilterHouse);
		tHouse.forEach((house) => {
			const inputFilterH = document.createElement("input");
			inputFilterH.name = "filter";
			inputFilterH.type = "radio";
			inputFilterH.id = house;
			inputFilterH.value = house;
			const labelFilterH = document.createElement("label");
			labelFilterH.innerHTML = house;

			labelFilterHouse.appendChild(inputFilterH);
			inputFilterH.insertAdjacentElement("afterend", labelFilterH);
		});
		// Pour les origines
		let tAncestry = [];
		this.characters.forEach(function (character) {
			const ancestry = character.ancestry;
			if (!tAncestry.includes(ancestry) && ancestry != "") {
				tAncestry.push(ancestry);
			}
		});
		const labelFilterAncestry = document.createElement("label");
		labelFilterAncestry.innerHTML = `<br><br><h4>Ancestry</h4>`;
		filterForm.appendChild(labelFilterAncestry);
		tAncestry.forEach((ances) => {
			const inputFilterA = document.createElement("input");
			inputFilterA.name = "filter";
			inputFilterA.type = "radio";
			inputFilterA.id = ances;
			inputFilterA.value = ances;
			const labelFilterA = document.createElement("label");
			labelFilterA.innerHTML = ances;

			labelFilterAncestry.appendChild(inputFilterA);
			inputFilterA.insertAdjacentElement("afterend", labelFilterA);
		});
	}

	// *************************************** TRI ***************************************
	/**
	 * Méthode d'ajout d'options de tri
	 */
	addOptions() {
		const sortForm = document.getElementById("sortForm");
		const labelSort = document.createElement("label");
		labelSort.innerHTML = `Sort - Name / Date<br><br>`;
		sortForm.appendChild(labelSort);
		// Select Ascending / Descending
		const selectSortAD = document.createElement("select");
		selectSortAD.name = "sort";
		selectSortAD.id = "asc/desc";
		selectSortAD.value = "asc/desc";
		selectSortAD.innerHTML = `
			<option value="default">Select</option>
			<option value="asc">Ascending</option>
			<option value="desc">Descending</option>
		`;
		labelSort.appendChild(selectSortAD);
		// Select Name / Date
		const selectSortND = document.createElement("select");
		selectSortND.name = "sort";
		selectSortND.id = "name/date";
		selectSortND.value = "name/date";
		selectSortND.innerHTML = `
			<option value="default">Select</option>
			<option value="name">Name</option>
			<option value="date">Date</option>
		`;
		labelSort.appendChild(selectSortND);
	}

	/**
	 * Méthode de tri selon le nom ou la date
	 */
	sortSelectedOptionND(selectedOptionND, order) {
		let tAllCharacters = this.characters.slice();
		console.log(order);
		switch (selectedOptionND) {
			case "name":
				let tSortedN = [];
				tSortedN = tAllCharacters.sort((a, b) => {
					const nameA = a.name;
					const nameB = b.name;

					return nameA.localeCompare(nameB);
				});
				if (order == "asc") {
					this.displayCharacters(tSortedN);
				} else {
					tSortedN = tSortedN.reverse();
					this.displayCharacters(tSortedN);
				}
				break;
			case "date":
				let tSortedD = tAllCharacters.sort((a, b) => {
					const dateA = new Date(a.dateOfBirth);
					const dateB = new Date(b.dateOfBirth);
					if (isNaN(dateA)) return 1;
					if (isNaN(dateB)) return -1;

					return dateA - dateB;
				});
				if (order == "asc") {
					this.displayCharacters(tSortedD);
				} else {
					tSortedD = tSortedD.reverse();
					this.displayCharacters(tSortedD);
				}
				break;
		}
	}

	// ************************************ RECHERCHE ************************************

	/**
	 * Méthode qui recherche un personnage selon l'entrée de recherche de l'utilisateur
	 * @param {string} searchString - Chaine selon laquelle effectuer la recherche
	 */
	searchCharacters(searchString) {
		this.#selectedCharacters = [];
		this.characters.forEach((character) => {
			if (
				character.name.includes(searchString) ||
				character.house.includes(searchString) ||
				character.ancestry.includes(searchString)
			) {
				this.#selectedCharacters.push(character);
			}
		});
		this.displayCharacters(this.#selectedCharacters);
	}
}
