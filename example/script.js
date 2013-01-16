$(document).ready(function() {
	/* MENU */
	/*$(".menu-item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});*/
	
	$("#btn-demo").click(function(){
		goToByScroll('demo');
	});
	
	$("#btn-download").click(function(){
		goToByScroll('download');
	});
	
	$("#btn-support").click(function(){
		goToByScroll('support');
	});
	
	$("#btn-author").click(function(){
		window.open("http://promatik.no.sapo.pt");
	});
	
	/* DEMO */ 
	$("button").attr("disabled", true);
	$("button").first().attr("disabled", false);
	
	$("#action-push").click(function(){
		$.pushPath(2, "newlevel", "This is the data element, its a String, but could be anything, any kind of object");
		
		$("button").attr("disabled", true);
		$("#action-pop").attr("disabled", false);
	});

	$("#action-pop").click(function(){
		$.popPath(1);
		
		$("button").attr("disabled", true);
		$("#action-popstate").attr("disabled", false);
	});
	
	$("#action-popstate").click(function(){
		$.onPopState(function(e) {
			alert(e.state);
		}); 
		
		$("button").attr("disabled", true);
		$("#action-pushVar").attr("disabled", false);
	});

	$("#action-pushVar").click(function(){
		$.pushVar("grass", "green", "", false);
		$.pushVar("sky", "blue", "", false);
		$.pushVar("sun", "red", "You can also add some data here", true);
		
		$("button").attr("disabled", true);
		$("#action-popVar").attr("disabled", false);
	});
	
	$("#action-popVar").click(function(){
		$.popVar("sun"); 
		
		$("button").attr("disabled", true);
		$("#action-getURL").attr("disabled", false);
	});

	$("#action-getURL").click(function(){
		alert( $.getURL() ); 
		
		$("button").attr("disabled", true);
	});
	
	function goToByScroll(id){
		$('html,body').animate({scrollTop: $("#"+id).offset().top-80},'slow');
	}
});