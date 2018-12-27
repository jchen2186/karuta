// let tmp = d3.select("#blah")
// .append("p")
// .text("this is a test");

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

function createTiles(data, activeTab = "jp") {
	let index = ["jp", "romaji", "eng"].indexOf(activeTab);
	let filteredData = data[index];

	fillColumn(filteredData.slice(0,33), 1);
	fillColumn(filteredData.slice(33,66), 2);
	fillColumn(filteredData.slice(66), 3);
}

function fillColumn(data, columnNumber) {
	var col = d3.select(`#col${columnNumber}`);

	let cards = col.selectAll(".card")
		.data(data)
		.enter()
		.append("div")
			.attr("class", "tile is-child card has-text-centered");
	
	let tabs = cards.append("div")
	.attr("class", "tabs is-fullwidth is-boxed")
	.append("ul");

	tabs.append("li")
		.attr("class", "is-active")
		.append("a")
			.text("Japanese");

	tabs.append("li")
	.append("a")
		.text("Romaji");

	tabs.append("li")
	.append("a")
		.text("English");
	
	let cardContents = cards.append("div")
		.attr("class", "card-content");

	cardContents.append("h4")
		.attr("class", "title is-4")
			.text(d => d['poet']);

	cardContents.append("div")
		.attr("class", "content")
		.html(d => d['line1'] + '<br>'
							+ d['line2'] + '<br>'
							+ d['line3'] + '<br>'
							+ d['line4'] + '<br>'
							+ d['line5']);
}