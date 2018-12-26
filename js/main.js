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
	var jpPoems = values[0];
	var romajiPoems = values[1];
	var engPoems = values[2];

	var data = preparePoems(jpPoems, romajiPoems, engPoems);
	jpPoems = data[0];
	romajiPoems = data[1];
	engPoems = data[2];

	// createTiles(jpPoems, romajiPoems, engPoems);
	createTiles(values);

})

function preparePoems(jpPoems, romajiPoems, engPoems) {
	let jpData = jpPoems.map(row => {
		return [row['poet'],
						row['line1'] + '<br>'
						+ row['line2'] + '<br>'
						+ row['line3'] + '<br>'
						+ row['line4'] + '<br>'
						+ row['line5']]
	});

	let romajiData = romajiPoems.map(row => {
		return [row['poet'],
						row['line1'] + '<br>'
						+ row['line2'] + '<br>'
						+ row['line3'] + '<br>'
						+ row['line4'] + '<br>'
						+ row['line5']]
	});

	let engData = engPoems.map(row => {
		return [row['poet'],
						row['line1'] + '<br>'
						+ row['line2'] + '<br>'
						+ row['line3'] + '<br>'
						+ row['line4'] + '<br>'
						+ row['line5']]
	});

	let data = [jpData, romajiData, engData];
	return data;
}

// function createTiles(jpPoems, romajiPoems, engPoems) {
function createTiles(data) {
	let col1 = d3.select("#col1");
	let col2 = d3.select("#col2");
	let col3 = d3.select("#col3");

	let cards = col1.selectAll(".card")
	// .data(jpPoems)
		.data(data[0])
		.enter()
		.append("div")
			.attr("class", "card");
	
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

	

	// let card = col1.append("div")
	// 	.attr("class", "card");

	// let tabs = card.append("div")
	// 	.attr("class", "tabs is-fullwidth is-boxed")
	// 	.append("ul");

	// tabs.append("li")
	// 	.attr("class", "is-active")
	// 	.append("a")
	// 		.text("Japanese");
	
	// tabs.append("li")
	// 	.append("a")
	// 		.text("Romaji");
	
	// tabs.append("li")
	// 	.append("a")
	// 		.text("English");

	// let cardContent = card.append("div")
	// 	.attr("class", "card-content");
			
	// cardContent.append("h4")
	// 	.attr("class", "title is-4")
	// 	.text("Poet Name");
	
	// cardContent.append("div")
	// 	.attr("class", "content")
	// 	.text("Poem");

	console.log(jpPoems);
}



// col1.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text();

// col1.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text("test");

// col2.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text("test");

// col2.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text("test");

// col3.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text("test");

// col3.append("div")
// .attr("class", "card")
// .append("div")
// .attr("class", "card-content")
// .append("div")
// .attr("class", "content")
// .text("test");