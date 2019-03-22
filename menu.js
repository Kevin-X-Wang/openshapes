
var menu = document.getElementById("draw").querySelector("#vertical-menu");
	//console.log(header.length)
var btns = menu.getElementsByTagName('a');
	//console.log(btns.length)
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var current = document.getElementsByClassName("active");
		if (current.length > 0) { 
			current[0].className = current[0].className.replace(" active", "");
		}
		this.className += " active";
	});
}
