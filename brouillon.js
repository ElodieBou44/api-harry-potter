			// // Listener de clic sur le formulaire de vue
			// viewForm.addEventListener("click", (evt) => {
			// 	const selectedInput = viewForm.querySelector(
			// 		'input[name="view"]:checked'
			// 	);
			// 	const selectedValue = selectedInput.value;
			// 	if (
			// 		selectedValue == "liste" ||
			// 		selectedValue == null ||
			// 		selectedValue == ""
			// 	) {
			// 		articleEl.innerHTML = `
			// 		<img src="${character.image}" alt="Image for ${character.name}">
			// 		<h2>${character.name}</h2>
			// 		<h3>${character.alternate_names}</h3>
			// 		<ul>
			// 		  <li>DoB - ${character.dateOfBirth}</li>
			// 		  <li>House - ${character.house}</li>
			// 		  <li>Patronus - ${character.patronus}</li>
			// 		</ul>
			// 		`;
			// 		console.log("liste");
			// 	} else if (selectedValue == "grille") {
			// 		articleEl.innerHTML = `
			// 		<img src="${character.image}" alt="Image for ${character.name}">
			// 		<h2>${character.name}</h2>
			// 		`;
			// 		console.log("grille");
			// 	}
			// });

			// const selectedInput = viewForm.querySelector(
			// 	'input[name="view"]:checked'
			// );
			// const selectedValue = selectedInput.value;
			// if (selectedValue == "liste" || selectedValue == null) {
			// 	articleEl.innerHTML = `
			// 	<img src="${character.image}" alt="Image for ${character.name}">
			// 	<h2>${character.name}</h2>
			// 	<h3>${character.alternate_names}</h3>
			// 	<ul>
			// 	  <li>DoB - ${character.dateOfBirth}</li>
			// 	  <li>House - ${character.house}</li>
			// 	  <li>Patronus - ${character.patronus}</li>
			// 	</ul>
			// 	`;
			// 	console.log("liste");
			// } else if (selectedValue == "grille") {
			// 	articleEl.innerHTML = `
			// 	<img src="${character.image}" alt="Image for ${character.name}">
			// 	<h2>${character.name}</h2>
			// 	`;
			// 	console.log("grille");
			// }

				/**
	 * Méthode d'affichage des caractères en vue Grille
	 */
	#displayCharactersGrid() {
		const mainEl = document.querySelector("main");
		const ulEl = document.createElement("ul");

		this.#characters.forEach((character) => {
			const liEl = document.createElement("li");
			const articleEl = document.createElement("article");

			articleEl.innerHTML = `
		   <img src="${character.image}" alt="Image for ${character.name}">
		   <h2>${character.name}</h2>
		   `;

			liEl.appendChild(articleEl);
			ulEl.appendChild(liEl);
		});

		mainEl.appendChild(ulEl);
	}