// JavaScript Document


function changeContent(content){
	var source=document.getElementById("Main_Contents").src;
	var btsPressed=document.getElementsByTagName("p");
	switch(content){
		case "home":
			document.getElementById("Main_Contents").src="";
			document.getElementById("Main_Contents").style.width="31%";
			document.getElementById("Main_Contents").style.position="absolute";
		   document.getElementById("Main_Contents").style.right="30px";
		   document.getElementById("Main_Contents").style.left="auto";
		   document.getElementById("Main_Contents").style.marginTop="80px";
		   setTimeout(function() {document.getElementById("Main_Contents").src="html/home.html";},200); 
		   btsPressed[1].style.textDecoration="underline";
		   btsPressed[2].style.textDecoration="none";
		   btsPressed[3].style.textDecoration="none";
		   btsPressed[4].style.textDecoration="none";
		   
			break;
		case "about":
		   document.getElementById("Main_Contents").src="";
		   document.getElementById("Main_Contents").style.width="95%";
		   document.getElementById("Main_Contents").style.position="absolute";
		  document.getElementById("Main_Contents").style.right="30px";
		   document.getElementById("Main_Contents").style.left="auto";
		   document.getElementById("Main_Contents").style.marginTop="80px";
		   setTimeout(function() {document.getElementById("Main_Contents").src="html/about.html";},200); 
		   btsPressed[1].style.textDecoration="none";
		   btsPressed[2].style.textDecoration="underline";
		   btsPressed[3].style.textDecoration="none";
		   btsPressed[4].style.textDecoration="none";
		   
			break;
		case "gallery":
			document.getElementById("Main_Contents").src="html/gallery.html";
			document.getElementById("Main_Contents").style.position="absolute";
		  document.getElementById("Main_Contents").style.right="30px";
		   document.getElementById("Main_Contents").style.left="auto";
			document.getElementById("Main_Contents").style.width="95%";
		   document.getElementById("Main_Contents").style.marginTop="80px";
			btsPressed[1].style.textDecoration="none";
		   btsPressed[2].style.textDecoration="none";
		   btsPressed[3].style.textDecoration="underline";
		   btsPressed[4].style.textDecoration="none";
			break;
		case "contact":
		   document.getElementById("Main_Contents").src="html/contact.html";
		   document.getElementById("Main_Contents").style.width="31%";
		   document.getElementById("Main_Contents").style.position="absolute";
		   document.getElementById("Main_Contents").style.right="30px";
		   document.getElementById("Main_Contents").style.left="auto";
		   document.getElementById("Main_Contents").style.marginTop="80px";
		   btsPressed[1].style.textDecoration="none";
		   btsPressed[2].style.textDecoration="none";
		   btsPressed[3].style.textDecoration="none";
		   btsPressed[4].style.textDecoration="none";
			break;
		default:
			document.getElementById("Main_Contents").src="html/home.html";
			document.getElementById("Main_Contents").style.width="31%";
			document.getElementById("Main_Contents").style.position="absolute";
		   document.getElementById("Main_Contents").style.right="30px";
		   document.getElementById("Main_Contents").style.left="auto";
		   document.getElementById("Main_Contents").style.marginTop="80px";
		    btsPressed[1].style.textDecoration="underline";
		   btsPressed[2].style.textDecoration="none";
		   btsPressed[3].style.textDecoration="none";
		   btsPressed[4].style.textDecoration="none";
	}
}
function videoControls(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var video=document.getElementById("chronoMovie").cloneNode(true);
	var tempDiv=document.createElement('div');
	var exitDiv=document.createElement('div');
	exitDiv.id="exitDiv";
	exitDiv.style.position="absolute";
	exitDiv.style.width=w+"px";
	exitDiv.style.height=h-50+"px";
	exitDiv.style.top="0";
	exitDiv.style.zIndex="20";
	document.body.appendChild(tempDiv);
	tempDiv.id="tempDiv";
	var blackScreen=document.createElement('div');
	video.controls=true;
	blackScreen.id="blackScreen";
	blackScreen.style.width=w+"px";
	blackScreen.style.height=h+"px";
	blackScreen.style.overflow="hidden";
	blackScreen.appendChild(video);
	
	tempDiv.appendChild(blackScreen);
	tempDiv.appendChild(exitDiv);
	exitDiv.onclick=removeFullscreen;
	

function removeFullscreen(){
	document.getElementById("tempDiv").remove();
	}
	
}