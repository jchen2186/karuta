// Constants to store URLs where data is located
const JP_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/jp.csv?token=AFK5w58C0eHVUKv9Ui4zyR6XkuU324dxks5cLE9wwA%3D%3D";
const ROMAJI_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/romaji.csv?token=AFK5w_8nr0B10x39CB9a1-87hw3MKteGks5cLE-BwA%3D%3D";
const ENG_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/eng.csv?token=AFK5w7Cg3e14lIP1tp2uq9UNmNF3Hxr4ks5cLE-TwA%3D%3D";

// Other constants
const poemLanguages = ["日本語", "Romaji", "English"];

// Load data
var files = [JP_URL, ROMAJI_URL, ENG_URL];
var promises = [];

files.forEach(function(url) {
	promises.push(d3.csv(url))
});

// Call function to display data
Promise.all(promises).then(function(values) {
	let data = rearrangeData(values);
	fillPage(data);
})

// Rearranges original data from promise so that it zips the 3 arrays into 1
function rearrangeData(data) {
	let japanese = data[0];
	let romaji = data[1];
	let english = data[2];

	let rearranged = japanese.map(function(e, index) {
		return [japanese[index], romaji[index], english[index]];
	});

	return rearranged;
}

// Displays all of the poems on the page, updating the page when changes are made
function fillPage(data) {
	fillColumns(data);
	updateCards(data);

	// Update all of the cards when the language option changes
	d3.selectAll(".poem-language-option")
	.on("change", function() {
		updateCards(data);
	});

	// Update a card when a tab is clicked on
	d3.selectAll(".poem-type")
	.on("click", function() {
		switchPoemType(data, this);
	});
}

// Fill in each column with cards, empty at first
function fillColumns(data) {
	fillColumn(data.slice(0, 25), 0);
	fillColumn(data.slice(25, 50), 1);
	fillColumn(data.slice(50, 75), 2);
	fillColumn(data.slice(75), 3);
}

// Fills a selected column with tiles and cards attached to a poem
function fillColumn(data, columnNumber) {
	var col = d3.select(`#col${columnNumber}`);
	let t = d3.transition().duration(300);

	let cards = col.selectAll(".card")
		.data(data)
		.enter()
		.append("div")
			.attr("class", "tile is-child card")
			.attr("id", (d, i) => i + 25 * columnNumber);

	let tabs = cards.append("div")
	.attr("class", "tabs is-boxed is-fullwidth")
	.append("ul");

	for (let language of poemLanguages) {
		tabs.append("li")
			.attr("class", language)
			.append("a")
				.attr("class", "poem-type")
				.text(language);
	}

	let cardContents = cards.append("div")
		.attr("class", "card-content");

	cardContents.append("h5")
		.attr("class", "title is-5");

	cardContents.append("div")
		.attr("class", "content");
}

// Activates the tab of the chosen language
// Fills in each card with content based on the chosen language
function updateCards(data) {
	d3.selectAll(".tabs>ul>li")
		.classed("is-active", false);

	d3.selectAll(`.${getChosenLanguage()["poem-type"]}`)
		.classed("is-active", true);
	
	let index = getPoemsByLanguageIndex();
	let poets = d3.selectAll(".card-content>h5");
	let poems = d3.selectAll(".card-content>div");

	poets.text(d => d[index]['poet']);
	poems.html(d => `${d[index]['line1']}<br>${d[index]['line2']}<br>${d[index]['line3']}<br><br>${d[index]['line4']}<br>${d[index]['line5']}`);
}

// Updates the active status of the tabs for the selected poem
// Updates text and html of title and poem content
function switchPoemType(data, anchor) {
	let ul = anchor.parentElement.parentElement;
	
	for (let li of ul.children) {
		d3.select(li)
			.classed("is-active", false);
	}

	d3.select(anchor.parentElement)
		.classed("is-active", true);

	let language = anchor.text;
	let index = poemLanguages.indexOf(language);
	let cardContent = anchor.parentElement.parentElement.parentElement.parentElement.children[1];
	let title = cardContent.children[0];
	let content = cardContent.children[1];

	d3.select(title)
		.text(d => d[index]["poet"]);
	
	d3.select(content)
		.html(d => `${d[index]['line1']}<br>${d[index]['line2']}<br>${d[index]['line3']}<br><br>${d[index]['line4']}<br>${d[index]['line5']}`);
}

// Helper function to get language option from poem-language-option radio buttons
// Returns a dictionary of options
function getChosenLanguage() {
	let languageOptions = d3.selectAll(".poem-language-option")._groups[0];
	let options = {};

	for (let i = 0; i < languageOptions.length; i++) {
		let el = languageOptions[i];
		if (el.checked) {
			options[el.name] = el.value;
		}
	}

	return options;
}

// Helper function to get correct type of poem based on the language option chosen
// Returns the index of poemLanguages that corresponds to the chosen language
function getPoemsByLanguageIndex() {
	let activeTab = getChosenLanguage()["poem-type"];
	return poemLanguages.indexOf(activeTab);
}