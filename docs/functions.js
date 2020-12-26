var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "../resources/movies.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var names = xmlDoc.getElementsByTagName("title");
    for (var i = 0; i < names.length; i++) {
		alert(names[i]);
	}
}