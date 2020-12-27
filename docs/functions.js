var xhttp = new XMLHttpRequest();
var xmlData;
var movieMainIndex;

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
	
	
	
	movieMainIndex = 0;
	document.getElementById("movies-main-list").innerHTML = htmlMovieList;
}
