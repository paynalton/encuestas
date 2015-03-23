$(document).ready(function(){
	$("input[type=radio]").change(opcionCambiada);
	$("input[name=cancelar]").click(cancelar);
	$("input[name=guardar]").click(guardar);
});

function guardar(){
	$("input[name=guardar]").attr("disabled","disabled");
	var data=$(".encuesta").serialize();
	var url=$(".encuesta").attr("action");
	var s=document.createElement("script");
	s.src=url+"?"+data+"&callback=recibirEstadistica";
	$("head").append(s);
}
var colores=["#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360"];
var coloresH=["#FF5A5E","#5AD3D1","#FFC870","#A8B3C5","#616774"];
function recibirEstadistica(estadistica){
	console.log(estadistica);
	$(".charts>.graphs").empty();
	var graficas={};
	var col=0;
	for(var i in estadistica){
		if(!graficas[estadistica[i].pregunta]){
			var pregunta=$(".encuesta").find("input[name='pregunta["+estadistica[i].pregunta+"]']").parents(".pregunta").eq(0).find(".preg").text();
			var html=$.parseHTML('<div style="width:400px;height:500px; float:left;">'+
					'<div class="pregunta"></div>'+
					'<canvas id="pregunta_'+estadistica[i].pregunta+'" style="width:380px;height:380px"></canvas>'+
				'</div>');
			$(html).find(".pregunta").text(pregunta);
			graficas[estadistica[i].pregunta]={
					html:html,
					labels:[],
					datasets:[{
						fillColor : colores[col],
						strokeColor : coloresH[col],
						highlightFill: coloresH[col],
						highlightStroke: colores[col],
						data:[]
					}]
					};
			
		}
		var respuesta=$(".encuesta").find("input[name='pregunta["+estadistica[i].pregunta+"]'][value='"+estadistica[i].respuesta+"']").parents(".opcion").eq(0).find("label").text();

		graficas[estadistica[i].pregunta].labels.push(respuesta);
		graficas[estadistica[i].pregunta].datasets[0].data.push(estadistica[i].total);
		col=col<(colores.length-1)?col+1:0;
	}

	for(var i in graficas){
		$(".charts>.graphs").append(graficas[i].html);
	}
	$.colorbox({
		inline:true,
		href:".charts",
		width:900,
		onComplete:function(){
			console.log(graficas);
			for(var i in graficas){
				var ctx = document.getElementById("pregunta_"+i).getContext("2d");
				window.myBar = new Chart(ctx).Bar(graficas[i],{responsive:false});
			}
			$.colorbox.resize();
		}
	});
}

function cancelar(){
	$.colorbox.close();
}

function opcionCambiada(){
	var padre=$(this).parents(".pregunta").eq(0);
	if(!padre.hasClass("activo")){
		$(".activo").removeClass("activo");
		padre.addClass("activo");
	}else{
		padre.removeClass("activo").next().addClass("activo");
	}
	if(!$(this).parents(".opcion").eq(0).hasClass("SELECTED")){
		padre.find(".SELECTED").removeClass("SELECTED");
		$(this).parents(".opcion").addClass("SELECTED");
	}
	if(padre.next().length<1){
		$(".resp").empty();
		$(".pregunta").each(function(){
			var pregunta=$(this).find(".preg").text();
			var respuesta=$(this).find("input:checked").parents(".opcion").find("label").text();
			var html=$.parseHTML("<div class='respuesta'><span class='resp_preg'></span>  <span class='resp_resp'></span></div>");
			$(html).find(".resp_preg").text(pregunta);
			$(html).find(".resp_resp").text(respuesta);
			$(".resp").append(html);
		});
		$.colorbox({
			inline:true,
			href:".respuestas"
		});
	}else{
		$(window).scrollTop(padre.next().offset().top-70);
		console.log(padre.next().offset().top);
	}
}