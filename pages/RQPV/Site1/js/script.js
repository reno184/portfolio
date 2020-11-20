var flag="open"	
var numCourant;
var stop;	
$(document).ready(function(){

	window.setInterval("click_pano()",3000);
	
	
	
	
	click_pano =  function(){	
	
	if($(".pano").html()=="Panoramique"){
			$(".pano").css("background","#efefef");		
			$(".pano").css("color","#dc1212");	
			$(".pano").html("Cliquez ici");								
		}else{
			$(".pano").css("background","#585858");		
			$(".pano").css("color","#fff");
			$(".pano").html("Panoramique");
		}
	};
	$(".close").click(function()
	{
		$("#bottom").fadeOut(500);	
	});
	
	
	$("#close_intro").click(function()
	{

		$("#intro").fadeOut(500);	
		$("#top, #bottom, #content").fadeIn(1000);
	});
	
	
	$("#top").css('opacity', 0.9);
	$(".vignette").css('opacity', 0.5);
	$(".button").click(function () {
			if(flag!="close"){	
				
				$(".top_text").animate({
				"height":350
				},2000,'easeOutElastic',function()
				{
					$(".button").css('background-position', "left bottom");
					$(".text").slideDown(1000);
					$(".titre").fadeOut(1000);
					flag="close";					
				});		
			}else{				
				
				$(".text").slideUp(1000, function() {
				
					$(".top_text").animate({
					"height":70
					},2000,'easeOutElastic',function()
					{							
						$(".button").css('background-position', "left top");	
						$(".titre").fadeIn(1000);	
						flag="open";					
					});		
					
				});				
			}
	});
	
		s = new slider();	
});



var slider = function(){
 	

	//Initialiation des variables
	var self = this;
	this.div=$("#content");
	this.suiv=this.div.find("#suiv");
	this.prec=this.div.find("#prev");
	this.current=this.div.find(".current");
	//initialisation des compteurs
	numCourant=1;	
	
	//initialisation des boutons
	this.prec.hide();
	
	this.current.empty();	
	this.current.html($(".image:eq("+(numCourant-1)+")").html()) ;
	
	$(".vignette:eq(0)").css('opacity', 0.9);
	// Avancer d'un cran
	this.next = function(){
		$(".pano").hide();		
		if(stop==true){return false;}
		
		numCourant++;
		if(numCourant==4){self.suiv.hide()};
		if(numCourant>0){ self.prec.show();};	
		
		//création d'une nouvelle div
		$(".current").after($("<div class='current'></div>"));
		$(".current:eq(1)").empty();	
		$(".current:eq(1)").html($(".image:eq("+(numCourant-1)+")").html()) ;
		
		$(".vignette").css('opacity', 0.5);
		
		stop=true;
		$(".current:eq(0)").fadeOut(2500);
		$("#slider").animate({
			"left":-700
		},1500,'easeInSine',function()
		{	
			$(".vignette:eq("+(numCourant-1)+")").css('opacity', 0.9);
			$(".current:eq(0)").remove();
			self.div.find("#slider").css("left",0);
			stop=false;
			$(".pano").show();
		});
		$(".pano").bind('click',self.pano);			
	}
	
	// Reculer d'un cran
	this.prev = function(){
		$(".pano").hide();
		//Bloque les boutons pendant la transitions.
		if(stop==true){return false;}
		
		numCourant--;
		$(".vignette").css('opacity', 0.5);
		if(numCourant<4){$("#suiv").show()};
		if(numCourant<2){$("#prev").hide()};	
		stop=true;
		
		//création d'un nouvelle div
		$(".current").before($("<div class='current'></div>"));
		$("#slider").css("left",-700);		
		$(".current:eq(0)").empty();	
		$(".current:eq(0)").html($(".image:eq("+(numCourant-1)+")").html()) ;
		
		//lancement des effets de transitions
		$(".current:eq(1)").fadeOut(2500);
		$("#slider").animate({
			"left":0
		},1500,'easeInSine',function()
		{	
			$(".vignette:eq("+(numCourant-1)+")").css('opacity', 0.9);
			$(".current:eq(1)").remove();
			stop=false;			
			$(".pano").show();
		});
		
		$(".pano").bind('click',self.pano);		
	}
	
	this.pano = function(){

	$(".current:eq(0)").fadeOut(500,function(){
	$(".current:eq(0)").empty();
	$(".current:eq(0)").html($(".flash:eq("+(numCourant-1)+")").html()) ;	
	$(".current:eq(0)").fadeIn(500);
	});
	
	}
	
	$(".pano").bind('click',self.pano);		
	this.prec.bind('click',this.prev);	
	this.suiv.bind('click',this.next);
	this.prec.hide();
}
