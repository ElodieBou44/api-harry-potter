import characters from "../data/characters.js";

export default class App {
	characters;
	#selectedCharacters;

	/**
	 * Constructeur de la propriété 'characters'
	 */
	constructor() {
		this.characters = characters.filter(
			(character) =>
				character.dateOfBirth !== null && character.image !== ""
		);
		this.#selectedCharacters = [];

		// Changement du format de date de naissance à (MM-JJ-AAAA) pour que le tri à l'aide de l'objet Date fonctionne
		this.characters = this.characters.map((character) => {
			const parts = character.dateOfBirth.split("-");
			const reversedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
			return { ...character, dateOfBirth: reversedDate };
		});

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
					<div>
					<h2>${character.name}</h2>
					<h3 class="opt">${character.alternate_names}</h3>
					<ul class="opt">
					  <li>DoB - ${character.dateOfBirth}</li>
					  <li>House - ${character.house}</li>
					  <li>Patronus - ${character.patronus}</li>
					</ul>
					</div> 
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
	 * Méthode de tri selon le nom ou la date
	 * @param string { name-asc | name-desc | date-asc | date-desc }
	 */
	sortSelectedOption(selectedOption) {
		let tAllCharacters = this.characters.slice();
		let tSorted = [];
		switch (selectedOption) {
			case "name-asc":
				tSorted = tAllCharacters.sort((a, b) => {
					const nameA = a.name;
					const nameB = b.name;

					return nameA.localeCompare(nameB);
				});
				break;
			case "name-desc":
				tSorted = [];
				tSorted = tAllCharacters
					.sort((a, b) => {
						const nameA = a.name;
						const nameB = b.name;

						return nameA.localeCompare(nameB);
					})
					.reverse();
				break;
			case "date-asc":
				tSorted = tAllCharacters.sort((a, b) => {
					const dateA = new Date(a.dateOfBirth);
					const dateB = new Date(b.dateOfBirth);

					return dateA - dateB;
				});
				break;
			case "date-desc":
				tSorted = tAllCharacters
					.sort((a, b) => {
						const dateA = new Date(a.dateOfBirth);
						const dateB = new Date(b.dateOfBirth);
						if (isNaN(dateA)) return 1;
						if (isNaN(dateB)) return -1;

						return dateA - dateB;
					})
					.reverse();
				break;
		}
		this.displayCharacters(tSorted);
	}

	// ************************************ RECHERCHE ************************************

	/**
	 * Méthode qui recherche un personnage selon l'entrée de recherche de l'utilisateur
	 * @param {string} searchString - Chaine selon laquelle effectuer la recherche
	 */
	searchCharacters(searchString) {
		const searchStringLower = searchString.toLowerCase(); // Convertir la recherche en minuscules
		this.#selectedCharacters = [];
		this.characters.forEach((character) => {
			const nameLower = character.name.toLowerCase(); // Convertir le nom du personnage en minuscules
			const houseLower = character.house.toLowerCase(); // Convertir la maison en minuscules
			const ancestryLower = character.ancestry.toLowerCase(); // Convertir l'origine en minuscules
			if (
				nameLower.includes(searchStringLower) || // Comparer avec la recherche en minuscules
				houseLower.includes(searchStringLower) || // Comparer avec la recherche en minuscules
				ancestryLower.includes(searchStringLower) // Comparer avec la recherche en minuscules
			) {
				this.#selectedCharacters.push(character);
			}
		});
		this.displayCharacters(this.#selectedCharacters);
	}
}
