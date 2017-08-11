function adtion(sw) {
	const w = document.documentElement.clientWidth;
	const f = w / sw * 100;
	document.getElementsByTagName("html")[0].style.fontSize = f + "px";
}

adtion(750);
window.onresize = function() {
	adtion(750);
}

window.alert = function(name) {
	var iframe = document.createElement("IFRAME");
	iframe.style.display = "none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
}