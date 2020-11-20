var flag="open"	
var numCourant;
var stop;	
$(document).ready(function(){

	window.setInterval("click_pano()",3000);
	
	click_pano =  function(){	
	
	if($(".pano").html()=="Panoramique"){
			
			$(".pano").html("Photo");								
		}else{
		;
			$(".pano").html("Panoramique");
		}
	};

	$(".image").css('opacity', 0.85);

	$(".image").hover(function(){
		$(this).css('opacity', 0.9);
	},function(){
		$(this).css('opacity', 0.85);
	});
	
	
	
});

