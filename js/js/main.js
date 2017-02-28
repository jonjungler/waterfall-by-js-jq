var dataObj = new Object();
loadImgs();
window.onload=function(){
	var mainDiv = document.getElementById("main");
	dataObj = waterFall(mainDiv,"box");
	window.onscroll = function(){
		if(checkLoadMore(mainDiv,"box")){
			loadMoreBox(mainDiv,"box",dataObj,getTestJson(12).data);
		}
	}

}

function loadImgs(){
	var boxs = getByClass(document.getElementById("main"),"box");
	for (var i = 0; i < boxs.length; i++) {
		var pic = boxs[i].getElementsByTagName('img')[0];
		pic.src = "images/"+i+".jpg";
	}
}

function getTestJson(imgNum){
	var result = new Object();
	var imgList = new Array(imgNum);
	for (var i = 0; i < imgNum; i++) {
		imgList[i] = "images/"+i+".jpg";
	}
	result.data = imgList;
	return result;
}

function waterFall(parent,box){
	var main = parent;
	var boxList = getByClass(parent,"box");
	var boxWidth = boxList[0].offsetWidth;
	var col = Math.floor(document.documentElement.clientWidth / boxWidth);
	main.style.cssText = "width:"+(boxWidth*col)+"px";
	var topArr = new Array(col);
	var leftList = new Array(col);
	for (var i = 0; i < boxList.length; i++) {
		if (i < col) {
			topArr[i] = boxList[i].offsetHeight;
			leftList[i] = boxList[i].offsetLeft;
		}else{
			var box = boxList[i];
			var minTop = Math.min.apply(null,topArr);
			var minIndex = getMinIndex(topArr,minTop);
			box.style.position="absolute";
			box.style.top = minTop + "px";
			box.style.left = boxList[minIndex].offsetLeft+"px";
			topArr[minIndex] += box.offsetHeight;
		}
	}
	var dataObj = new Object();
	dataObj.topArr = topArr;
	dataObj.leftList = leftList;
	return dataObj;
}

function loadMoreBox(parent,box,dataObj,imgList){
	var main = parent;
	var topArr = dataObj.topArr;
	for (var i = 0; i < imgList.length; i++) {
		var box = document.createElement("div");
		box.className = "box";
		var pic = document.createElement("div");
		pic.className ="pic";
		var img = document.createElement("img");
		img.src = imgList[i];
		pic.appendChild(img)
		box.appendChild(pic);
		parent.appendChild(box);
		box.style.position = "absolute";
		var minTop = Math.min.apply(null,topArr);
		var minIndex = getMinIndex(topArr,minTop);
		box.style.top = minTop + "px";
		topArr[minIndex] += box.offsetHeight;
		box.style.left = dataObj.leftList[minIndex]+"px";
	}
}

function checkLoadMore(parent,box) {
	var top = document.documentElement.scrollTop || document.body.scrollTop;
	var boxList = parent.getElementsByClassName(box)
	var lastBox = boxList[boxList.length-1];
	return top+(document.documentElement.clientHeight + document.body.clientHeight) > (lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2))
}	

function getMinIndex(arr,min){
	for (var i = arr.length - 1; i >= 0; i--) {
		if( arr[i] == min){
			return i
		}
	}
}

function getByClass(parent,cls){
	var reg = new RegExp("(\\s|^)"+cls+"(\\s|$)");
	var childList = parent.getElementsByTagName("*");
	var result = new Array();
	for (var i = 0; i < childList.length; i++) {
		 if(childList[i].className.match(reg)){
		 	result.push(childList[i]);
		 }
	}
	return result;
}