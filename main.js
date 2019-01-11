let url = "https://swapi.co/api/people";

document.body.appendChild(createLoadingAnimation());

getJson(url)
	.then(data => {
		let main = document.getElementById("main");
		let promiseArr = [];
		data.results.forEach(
			value => promiseArr.push(
				createPersonDiv(value)
			)
		);
		return Promise.all(promiseArr)
			.then(result => result.forEach(value => main.appendChild(value)));
	})
	.then(() => document.body.removeChild(document.getElementById("loading")))
	.catch(err => {
		console.log("Error: " + err.message)
		document.body.replaceChild(createAlertError(), document.getElementById("loading"));
	})

async function createPersonDiv(input) {
	let div = document.createElement("div");
	let title = document.createElement("h2");
	let gender = document.createElement("h3");
	let homePlanet = document.createElement("h3");
	let films = document.createElement("h3");

	div.className = "content";

	div.appendChild(title);
	div.appendChild(gender);
	div.appendChild(homePlanet);
	div.appendChild(films);

	title.innerHTML = input.name;
	gender.innerHTML = "Gender: " + input.gender;
	homePlanet.innerHTML = "Home Planet: ";
	films.innerHTML = "Films: ";

	async function getFilms() {
		let promiseArr = [];

		input.films.forEach(value => promiseArr.push(getJson(value));

		return Promise.all(promiseArr)
			.then(result => result.forEach(value => films.innerHTML += "<p>" + value.title + "</p>"));
	}

	let getHomeWorld = getJson(input.homeworld)
			.then(result => homePlanet.innerHTML += result.name)

	await Promise.all([getFilms(), getHomeWorld]);

	return div;
}

function getJson(url) {
	return fetch(url)
		.then(response => {
			if (response.ok)
				return response.json();
		})
		.catch(err => {
			console.log("Error: " + err.message);
		})
}

function createAlertError() {
	let div = document.createElement("div");
	let h1 = document.createElement("h1");
	let h2 = document.createElement("h2");

	div.id = "alert";

	h1.innerHTML = "Oh, something was wrong";
	h2.innerHTML = "Please,refhesh this page";

	div.appendChild(h1);
	div.appendChild(h2);

	return div;
}
