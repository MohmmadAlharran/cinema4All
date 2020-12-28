var xhttp = new XMLHttpRequest();
var xmlData;

function getMovieListForHome() {
	if (xmlData == undefined) {	
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				xmlData = this.responseXML;	
				movieListHome(0);
			}	
		};
	} else {
		movieListHome(0);
	}
}

function getMovieListForMovies() {
	if (xmlData == undefined) {	
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				xmlData = this.responseXML;
				movieListMovie();
			}	
		};
	} else {
		movieListMovie();
	}
}

xhttp.open("GET", "https://mohmmadalharran.github.io/cinema4All/resources/movies.xml", true);
xhttp.send();

function movieListHome(start) {
	var xmlNames = xmlData.getElementsByTagName("name");
	var xmlImages = xmlData.getElementsByTagName("image");
	let htmlMovieList = "";
	let amount = Math.min(xmlNames.length - start, 4)
	for (var i = start; i < start + amount; i++) {
		htmlMovieList += "<li>"
							+ "<a>"				
								+ "<img src='resources/movie_images/" + xmlImages[i].childNodes[0].nodeValue +  "' width='200' height='250'></img>"
							+ "</a>"
							+ "<p>" + xmlNames[i].childNodes[0].nodeValue + "</p>"
						+ "</li>";
	}
	
	if ((start + 4) < xmlNames.length) {
		document.getElementById("movies-list-arrow-right").setAttribute("onclick", "movieListHome(" + (start + 4) + ");");
		document.getElementById("movies-list-arrow-right").setAttribute("style", "display:unset");
	} else {
		document.getElementById("movies-list-arrow-right").setAttribute("onclick", "");
		document.getElementById("movies-list-arrow-right").setAttribute("style", "display:none");
	}
	
	if (start < 4) {
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:none");
	} else {
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "movieListHome(" + (start - 4) + ");");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:unset");
	}

	document.getElementById("movies-main-list").innerHTML = htmlMovieList;
}

function movieListMovie() {
	var xmlNames = xmlData.getElementsByTagName("name");
	var xmlDescriptions = xmlData.getElementsByTagName("description");
	var xmlVideos = xmlData.getElementsByTagName("video");
	var xmlRelease = xmlData.getElementsByTagName("release");
	
	let htmlMovieList = "";
	for (var i = 0; i < xmlNames.length; i++) {
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
