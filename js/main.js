var JP_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/jp.csv?token=AFK5w58C0eHVUKv9Ui4zyR6XkuU324dxks5cLE9wwA%3D%3D";
var ROMAJI_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/romaji.csv?token=AFK5w_8nr0B10x39CB9a1-87hw3MKteGks5cLE-BwA%3D%3D";
var ENG_URL = "https://raw.githubusercontent.com/jchen2186/karuta/master/cleaned_poems/eng.csv?token=AFK5w7Cg3e14lIP1tp2uq9UNmNF3Hxr4ks5cLE-TwA%3D%3D";

var files = [JP_URL, ROMAJI_URL, ENG_URL];
var promises = [];

files.forEach(function(url) {
	promises.push(d3.csv(url))
});

Promise.all(promises).then(function(values) {
	createTiles(values);
})

function createTiles(data, activeTab = "日本語") {
	let index = ["日本語", "Romaji", "English"].indexOf(activeTab);
	let filteredData = data[index];

	fillColumn(filteredData.slice(0, 25), 0);
	fillColumn(filteredData.slice(25, 50), 1);
	fillColumn(filteredData.slice(50, 75), 2);
	fillColumn(filteredData.slice(75), 3);

	// Update a card when a tab is clicked on
	d3.selectAll(".poem-type")
		// .on("click", switchPoemType);
		.on("click", function() {
			switchPoemType(data, this)
		})
}

function fillColumn(data, columnNumber) {
	var col = d3.select(`#col${columnNumber}`);

	let cards = col.selectAll(".card")
		.data(data)
		.enter()
		.append("div")
			.attr("class", "tile is-child card has-text-centered")
			.attr("id", (d, i) => i + 25 * columnNumber);
	
	let tabs = cards.append("div")
	.attr("class", "tabs is-toggle is-fullwidth")
	.append("ul");

	tabs.append("li")
		.attr("class", "is-active")
		.append("a")
			.attr("class", "poem-type")
			.text("日本語");

	tabs.append("li")
		.append("a")
			.attr("class", "poem-type")
			.text("Romaji");

	tabs.append("li")
		.append("a")
			.attr("class", "poem-type")
			.text("English");
	
	let cardContents = cards.append("div")
		.attr("class", "card-content");

	cardContents.append("h5")
		.attr("class", "title is-5")
			.text(d => d['poet']);

	cardContents.append("div")
		.attr("class", "content")
		.html(d => `${d['line1']}<br>${d['line2']}<br>${d['line3']}<br><br>${d['line4']}<br>${d['line5']}`);
}

function switchPoemType(data, anchor) {
	let poemType = anchor.text;
	let index = ["日本語", "Romaji", "English"].indexOf(poemType);
	let tilePressed = anchor.parentElement.parentElement.parentElement.parentElement;
	let poemNumber = tilePressed.id;
	let cardContent = tilePressed.children[1];
	let ul = anchor.parentElement.parentElement;
	let poemObject = data[index][poemNumber];
	let poet = poemObject["poet"];
	let poem = `${poemObject['line1']}<br>${poemObject['line2']}<br>${poemObject['line3']}<br><br>${poemObject['line4']}<br>${poemObject['line5']}`;
	
	// Deselect the previous tab that was active
	for (let li of ul.children) {
		d3.select(li)
			.attr("class", null);
	}

	// Set tab that was clicked on to active
	d3.select(anchor.parentElement)
		.attr("class", "is-active");

	// console.log(cardContent);
	cardContent = d3.select(cardContent);
	
	
	cardContent.text(null);
	cardContent.append("h5")
		.attr("class", "title is-5")
		.text(poet);
	
	cardContent.append("div")
		.attr("class", "content")
		.html(poem);
	// // Fill card-content with different version of poem
	// console.log(cardContent);
	

	// // d3.select(cardContent)
	// // 	.text(null);
	
	// let currentCard = d3.select(cardContent);
	
	// console.log(currentCard);
}
