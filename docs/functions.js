// Request for the XML data via HTTP
var xhttp = new XMLHttpRequest();

// Stores the requested XML data
var xmlData;

// Get XML data and calling movieListHome(start)
function getMovieListForHome() {
	if (xmlData == undefined) {	
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				xmlData = this.responseXML;	
				movieListHome(0);
			}	
		};
	}
}

// Get XML data and calling movieListMovie(filter)
function getMovieListForMovies(filter) {
	if (xmlData == undefined) {	
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				xmlData = this.responseXML;
				movieListMovie(filter);
			}	
		};
	}
}

xhttp.open("GET", "https://mohmmadalharran.github.io/cinema4All/resources/movies.xml", true);
xhttp.send();

//Displaying the first four movies for index.html starting by the given index
function movieListHome(start) {
	// Getting needed data
	let xmlNames = xmlData.getElementsByTagName("name");
	let xmlImages = xmlData.getElementsByTagName("image");
	
	// The variable containing the html
	let htmlMovieList = "";
	
	// It will display four of the movies or less if there are not enough movies at start
	let amount = Math.min(xmlNames.length - start, 4)
	let i
	for (i = start; i < start + amount; i++) {
		htmlMovieList += "<li>"
							+ "<a href='#'>"				
								+ "<img src='resources/movie_images/" + xmlImages[i].childNodes[0].nodeValue +  "' width='200' height='250'></img>"
							+ "</a>"
							+ "<p>" + xmlNames[i].childNodes[0].nodeValue + "</p>"
						+ "</li>";
	}
	
	// Are there movies at index start + 4?
	if ((start + 4) < xmlNames.length) {
		// Set the function call for right arrow so that they can be chosen next
		document.getElementById("movies-list-arrow-right").setAttribute("onclick", "movieListHome(" + (start + 4) + ");");
		document.getElementById("movies-list-arrow-right").setAttribute("style", "display:unset");
	} else {
		// Right arrow button is not needed
		document.getElementById("movies-list-arrow-right").setAttribute("onclick", "");
		document.getElementById("movies-list-arrow-right").setAttribute("style", "display:none");
	}
	
	// Are at he beginning of the list?
	if (start < 4) {
		// Left arrow button is not needed
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:none");
	} else {
		// Set the function call for left arrow so that they can be chosen next
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "movieListHome(" + (start - 4) + ");");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:unset");
	}

	document.getElementById("movies-main-list").innerHTML = htmlMovieList;
}

//Displaying all movies and filter them depending on the parameter
function movieListMovie(filter) {
	let xmlNames = xmlData.getElementsByTagName("name");
	let xmlDescriptions = xmlData.getElementsByTagName("description");
	let xmlVideos = xmlData.getElementsByTagName("video");
	let xmlRelease = xmlData.getElementsByTagName("release");
	let htmlMovieList = "";
	var i ;
	for (i = 0; i < xmlNames.length; i++) {
		// 1 = only show top rated movies
		if (filter == 1 && xmlData.getElementsByTagName("movie")[i].getAttribute("info") != "top") {
			continue;
		// 2 = only show movies comming soon
		} else if (filter == 2 && xmlData.getElementsByTagName("movie")[i].getAttribute("info") != "soon") {
			continue;
		}
		
		htmlMovieList += "<li>"
							+ "<a href='#'>"
								+ "<h2>" + xmlNames[i].childNodes[0].nodeValue + "(" + xmlRelease[i].childNodes[0].nodeValue +  ")</h2>"
								+ "<iframe width='560' height='315' src='" + xmlVideos[i].childNodes[0].nodeValue + "' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
								+ "<div>" + xmlDescriptions[i].childNodes[0].nodeValue + "</div>"
							 + "</a>"
						+ "</li>";
	}
	
	document.getElementById("movies-movie-list").innerHTML = htmlMovieList;
}
