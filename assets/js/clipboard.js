
function copy(){
	var text = document.getElementById("pastetext");
	var range = document.createRange();
	
	range.selectNode(text);
	window.getSelection().addRange(range);
	document.execCommand("copy");

}
