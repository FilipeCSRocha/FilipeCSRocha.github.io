var imageType="image";
var selected = null,
    x_pos = 0, y_pos = 0,
    x_elem = 0, y_elem = 0;
window.onload = function () {
	gallery() 
}
function gallery(){
var xhttp = new XMLHttpRequest();
var galleryXml="../gallery/xml/gallery.xml";
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  imageGallery(this);
	}
};
xhttp.open("GET", galleryXml, true);
xhttp.send();
function imageGallery(xml) {
    var xmlDoc = xml.responseXML;
	var gallery= xmlDoc.getElementsByTagName(imageType);
	var x=gallery.length
	setTimeout(createGallery,350);
	function createGallery(){
		var placementH=40;
		var placementV=40;
		for(i=0;i<x;i++){
			var polaroidFrame=document.createElement('div');//create polaroid Frame
			var imagem = document.createElement('img');// create image
			var imageFrame=document.createElement('div');
			var img= xmlDoc.getElementsByTagName(imageType)[i];
			var source=img.getAttribute("src");// get image source
			var imgTitle=img.getAttribute("title");//get image title
			var imageTitle=document.createTextNode(imgTitle);
			var container = document.getElementById("galleryContainer");// create main gallery
			
			polaroidFrame.id="polaroidFrame";
			imageFrame.id="imageFrame";
			imagem.id="imagens";
			imagem.src = source;
			polaroidFrame.appendChild(imageFrame);
			imageFrame.appendChild(imagem);
			var imgWidth= imagem.width;
			var imgHeight= imagem.height;
			var containerWidth= window.innerWidth;
			
			polaroidFrame.style.left=placementH+"px";
			polaroidFrame.style.top=placementV+"px";
			placementH+=220;
			
			if (placementH>containerWidth/1.1){
				placementH=40;
				placementV+=120;
			}
			
			
			polaroidFrame.onmouseover = function () {
				_drag_init(this);
				return false;
				
			};
			document.getElementById("galleryContainer").appendChild(polaroidFrame);
			document.getElementById("loadedInfo").style.visibility="hidden";
			
		};
	}      
};
};
function sendBack(){

	var x=document.getElementById("galleryContainer").childElementCount;
	var seenImg=document.getElementById("galleryContainer").childNodes[x-1];
	seenImg.style.boxShadow="2px 4px 5px rgba(0, 0, 0, .5)";
	seenImg.style.transform="scale(1,1)";
	seenImg.style.WebkitTransform="scale(1,1)";
	seenImg.style.MozTransform="scale(1,1)";
	seenImg.childNodes[0].childNodes[0].style.WebkitFilter="grayscale(100%)";
}
function _drag_init(elem) {
	var x=document.getElementById("galleryContainer").childElementCount;
	var cont=document.getElementById("galleryContainer");
	var imgInfoContainer=document.getElementById("imgInfo");
	var transf=elem.style.transform;
	var scaled="scale(1.2, 1.2)";
	selected = elem;
	if(transf!=scaled){
		
		sendBack();
	}
	var clickFrame=selected.childNodes[0].childNodes[0];
	var imgPath=clickFrame.src;
	var decriptionPath=clickFrame.src.replace("_thumb.jpg",".txt")
	cont.appendChild(elem);
	clickFrame.onclick=fullScreen;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
	selected.style.transform="scale(1.2,1.2)";
	selected.style.WebkitTransform="scale(1.2,1.2)";
	selected.style.MozTransform="scale(1.2,1.2)";
	selected.style.boxShadow="8px 10px 5px rgba(0, 0, 0, .5)";
	clickFrame.style.WebkitFilter="grayscale(85%)";
	var xhttp = new XMLHttpRequest();
	var descriptionTXT=decriptionPath;
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	  loadDescription(this);
	}
	document.getElementById("loadedInfo").style.visibility="visible";
};
xhttp.responseType = 'text';
xhttp.open("GET", descriptionTXT, true);
xhttp.send();
	
}


function fullScreen(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var fscrImage=this.cloneNode(true);
	var tempSRC=fscrImage.src.replace("_thumb","");
	var blackScreen=document.createElement('div');
	var imgPos=document.createElement('div');
	var contain= document.getElementById("galleryContainer");
	contain.style.width="100%";
	imgPos.id="imgPos";
	imgPos.style.background="url('"+tempSRC+"')";
	imgPos.style.backgroundRepeat="no-repeat";
	imgPos.style.backgroundPosition="center";
	imgPos.style.backgroundSize="contain";
	document.getElementById("galleryContainer").appendChild(blackScreen);
	blackScreen.id="blackScreen";
	blackScreen.style.width=w+"px";
	blackScreen.style.height=h+"px";
	fscrImage.id="fullScreenImg";
	blackScreen.onclick=removeFullscreen;
	blackScreen.appendChild(imgPos);
	
}
function loadDescription(txt){
	var txtDoc = txt.responseText;
	
	document.getElementById("loadedInfo").innerHTML=txtDoc;
	}
function removeFullscreen(){
	var bs=document.getElementById("blackScreen");
	var contain= document.getElementById("galleryContainer");
	contain.removeChild(bs);
	
	}

