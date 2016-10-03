var imageType="";
var selected = null,
    x_pos = 0, y_pos = 0,
    x_elem = 0, y_elem = 0;
window.onload = function () {
	gallery() 
}
function changeImages(x){
	imageType=x.id;
	var deleteNodes = document.getElementById("galleryContainer");
	while (deleteNodes.hasChildNodes()) {
		deleteNodes.removeChild(deleteNodes.lastChild);
	}
	gallery();
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
if (imageType==""){
	imageType="images3D";
}
function imageGallery(xml) {
    var xmlDoc = xml.responseXML;
	var gallery= xmlDoc.getElementsByTagName(imageType);
	var x=gallery.length
	createGallery();
	function createGallery(){
		for(i=0;i<x;i++){
			var polaroidFrame=document.createElement('div');//create polaroid Frame
			var imagem = document.createElement('img');// create image
			var imageFrame=document.createElement('div');
			var parag=document.createElement('p');
			var img= xmlDoc.getElementsByTagName(imageType)[i];
			var source=img.getAttribute("src");// get image source
			var imgTitle=img.getAttribute("title");//get image title
			var imageTitle=document.createTextNode(imgTitle);
			var container = document.getElementById("galleryContainer");// create main gallery
			var randRot=Math.floor((Math.random() * 45-22));
			polaroidFrame.id="polaroidFrame";
			imageFrame.id="imageFrame";
			imagem.id="imagens";
			imagem.src = source;
			polaroidFrame.style.background="#EEE";
			polaroidFrame.style.left=Math.floor((Math.random() * 400+20))+"px";
			polaroidFrame.style.top=Math.floor((Math.random() * 200+20))+"px";
			polaroidFrame.style.transform="rotate("+randRot+"deg)";
			polaroidFrame.style.WebkitTransform="rotate("+randRot+"deg)";
			polaroidFrame.style.MozTransform="rotate("+randRot+"deg)";
			parag.id="imageTitle";
			parag.appendChild(imageTitle);
			polaroidFrame.appendChild(imageFrame);
			polaroidFrame.appendChild(parag);
			imageFrame.appendChild(imagem);
			var imgWidth= imagem.width;
			var imgHeight= imagem.height;
			if (imgWidth>imgHeight){
				imagem.style.position="relative";
				imagem.style.height="100%";
				imagem.style.right="30%";
			};
			if(imgWidth<imgHeight){
				imagem.style.position="relative";
				imagem.style.width="100%";
			};
			
			polaroidFrame.onmousedown = function () {
				_drag_init(this);
				return false;
			};
			document.getElementById("galleryContainer").appendChild(polaroidFrame);
			document.getElementById("instructions").style.visibility="visible";
			document.getElementById("loadedInfo").style.visibility="hidden";
		};
	}      
};
};
function sendBack(){

	var x=document.getElementById("galleryContainer").childElementCount;
	var seenImg=document.getElementById("galleryContainer").childNodes[x-1];
	var randRot=Math.floor((Math.random() * 45-22));
	seenImg.style.transform="rotate("+randRot+"deg)";
	seenImg.style.WebkitTransform="rotate("+randRot+"deg)";
	seenImg.style.MozTransform="rotate("+randRot+"deg)";
	seenImg.style.boxShadow="2px 4px 5px rgba(0, 0, 0, .5)";
}
function _drag_init(elem) {
	var x=document.getElementById("galleryContainer").childElementCount;
	var cont=document.getElementById("galleryContainer");
	var imgInfoContainer=document.getElementById("imgInfo");
	var transf=elem.style.transform;
	var scaled="scale(1.3, 1.3)";
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
	selected.style.transform="scale(1.3,1.3)";
	selected.style.WebkitTransform="scale(1.3,1.3)";
	selected.style.MozTransform="scale(1.3,1.3)";
	selected.style.boxShadow="8px 10px 5px rgba(0, 0, 0, .5)";
	
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
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}
function _destroy() {
    selected = null;
}
function fullScreen(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	var fscrImage=this;
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
	document.getElementById("instructions").style.visibility="hidden";
	document.getElementById("loadedInfo").innerHTML=txtDoc;
	}
function removeFullscreen(){
	var bs=document.getElementById("blackScreen");
	var contain= document.getElementById("galleryContainer");
	contain.style.width="60%";
	contain.removeChild(bs);
	
	}
document.onmousemove = _move_elem;
document.onmouseup = _destroy;
