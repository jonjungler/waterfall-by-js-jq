$(window).on("load",function(){
	waterfall("main","pin");
	var dataJson = {data:["images/0.jpg","images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg"]};
	$(window).scroll(function () {
		if (checkScrollState("pin")) {
			$.each(dataJson.data,function  (index,value) {
				var $pin = $("<div>").addClass("pin").appendTo($("#main"));
				var $box = $("<div>").addClass("box").appendTo($pin);
				var $img = $("<img>").attr("src",value).appendTo($box);
			})
			waterfall("main","pin");
		}
	});
})

function waterfall(parent,box){
	var $parent = $("#"+parent);
	var $box = $("."+box);
	var col = Math.floor($(window).width() / $box.eq(0).outerWidth());
	var topArr = new Array();
	$parent.css({
		"width":$box.eq(0).outerWidth()*col,
		"margin":"0 auto"
	});
	$box.each(function(index,value){
		$thisBox = $(value);
		if (index < col) {
			topArr[index] = $thisBox.outerHeight();
		} else {
			var minTop = Math.min.apply(null, topArr);
			var maxTop = Math.max.apply(null,topArr);
			var minIndex = $.inArray(minTop,topArr);
			var width = $(document).width()/2-$box.width()/2;
			$thisBox.css(
			{
				"position":"absolute",
				"left":$box.eq(minIndex).position().left,
				"top":minTop,
			});
			topArr[minIndex] += $thisBox.outerHeight();
		}
	})
}

function checkScrollState (box) {
	var $lastBox = $("."+box).last();
	var bottomTop = $(window).scrollTop() +$(window).height();
	var boxBottomTop = ($lastBox.offset().top + $lastBox.outerHeight()/2);
	return bottomTop > boxBottomTop;
}