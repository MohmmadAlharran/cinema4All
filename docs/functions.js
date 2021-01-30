var xmlData;

// Get XML data and calling movieListHome(start)
function getMovieListForHome() {
	if (xmlData != undefined) return;
	fetch('https://mohmmadalharran.github.io/cinema4All/resources/movies.xml').then((response)=>{
		response.text().then((xml)=>{
            let xmlContent = xml;
			let parser = new DOMParser();
			xmlData = parser.parseFromString(xmlContent, 'application/xml');
			movieListHome(0);
        });
        
    });
}

// Get XML data and calling movieListMovie(filter)
function getMovieListForMovies(filter) {
	if (xmlData != undefined) return;
	fetch('https://mohmmadalharran.github.io/cinema4All/resources/movies.xml').then((response)=>{
		response.text().then((xml)=>{
            let xmlContent = xml;
			let parser = new DOMParser();
			xmlData = parser.parseFromString(xmlContent, 'application/xml');
			movieListMovie(filter);
        });
        
    });
}

//Displaying the first four movies for index.html starting by the given index
function movieListHome(start) {
	// Getting needed data
	let xmlNames = xmlData.getElementsByTagName("name");
	let xmlImages = xmlData.getElementsByTagName("image");
	
	// The variables containing the html
	let li = "";
	let a = "";
	let img = "";
	let p = "";
	// It will display four of the movies or less if there are not enough movies at start
	let amount = Math.min(xmlNames.length - start, 4)
	let i;
	
	document.getElementById("movies-main-list").textContent = '';
	
	for (i = start; i < start + amount; i++) {
		li = document.createElement('LI');
		
		a = document.createElement('A');
		a.setAttribute('href', '#');
		
		img = document.createElement('IMG');
		img.setAttribute('src', 'resources/movie_images/' + xmlImages[i].childNodes[0].nodeValue);
		img.setAttribute('width','200');
		img.setAttribute('height', '250');
		img.setAttribute('alt', 'Cover ' + xmlNames[i].childNodes[0].nodeValue);
		
		p = document.createElement('P');
		p.appendChild(document.createTextNode(xmlNames[i].childNodes[0].nodeValue));
		
		document.getElementById("movies-main-list").appendChild(li);
		li.appendChild(a);
		li.appendChild(p);
		a.appendChild(img);
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
	
	// Are we at he beginning of the list?
	if (start < 4) {
		// Left arrow button is not needed
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:none");
	} else {
		// Set the function call for left arrow so that they can be chosen next
		document.getElementById("movies-list-arrow-left").setAttribute("onclick", "movieListHome(" + (start - 4) + ");");
		document.getElementById("movies-list-arrow-left").setAttribute("style", "display:unset");
	}
}

//Displaying all movies and filter them depending on the parameter
function movieListMovie(filter) {
	let xmlNames = xmlData.getElementsByTagName("name");
	let xmlDescriptions = xmlData.getElementsByTagName("description");
	let xmlVideos = xmlData.getElementsByTagName("video");
	let xmlRelease = xmlData.getElementsByTagName("release");
	
	let li = "";
	let a = "";
	let h3 = "";
	let iframe = "";
	let div = "";
	
	var i ;
	
	document.getElementById("movies-movie-list").textContent="";
	
	for (i = 0; i < xmlNames.length; i++) {
		// 1 = only show top rated movies
		if (filter == 1 && xmlData.getElementsByTagName("movie")[i].getAttribute("info") != "top") {
			continue;
		// 2 = only show movies comming soon
		} else if (filter == 2 && xmlData.getElementsByTagName("movie")[i].getAttribute("info") != "soon") {
			continue;
		}
		
		li = document.createElement('LI');
		
		a = document.createElement('A');
		a.setAttribute('href', '#');
		
		h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode(xmlNames[i].childNodes[0].nodeValue + "(" + xmlRelease[i].childNodes[0].nodeValue +  ")"));
		
		iframe = document.createElement('IFRAME');
		iframe.setAttribute('width', '560');
		iframe.setAttribute('height', '315');
		iframe.setAttribute('src', xmlVideos[i].childNodes[0].nodeValue);
		iframe.setAttribute('frameborder', 0);
		iframe.setAttribute('allow', 'accelerometer');
		iframe.setAttribute('autoplay', 'true');
		iframe.setAttribute('clipboard-write', 'true');
		iframe.setAttribute('encrypted-media', 'true');
		iframe.setAttribute('gyroscope', 'true');
		iframe.setAttribute('picture-in-picture', 'true');
		iframe.setAttribute('allowfullscreen', 'true');
		
		div = document.createElement('DIV');
		div.appendChild(document.createTextNode(xmlDescriptions[i].childNodes[0].nodeValue));
		
		document.getElementById("movies-movie-list").appendChild(li);
		li.appendChild(a);
		a.appendChild(h3);
		a.appendChild(iframe);
		a.appendChild(div);
	}
}
