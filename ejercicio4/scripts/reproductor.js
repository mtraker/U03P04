function accionReiniciar()
{
	medio.currentTime = 0;
}

function accionRetrasar()
{
	medio.currentTime += -5;
}

function accionAdelantar()
{
	medio.currentTime += +5;
}

function accionSilenciar()
{
	if(medio.volume == 1){
		medio.volume = 0;
		document.querySelector("#silenciar"). value = "escuchar";
	}
	else{
		medio.volume = 1;
		document.querySelector("#silenciar"). value = "silenciar";
	}

}

function accionMenosVolumen()
{
	if(medio.volume > 0) {
		medio.volume += -0.1;
	}
}
function accionMasVolumen()
{
	if(medio.volume < 1){
		medio.volume += +0.1;
	}
}

function redimensionaBarra()
{
	if(!medio.ended)
	{
		var total=parseInt(medio.currentTime*maximo / medio.duration);
		progreso.style.width=total+'px';
	}
	else
	{
		progreso.style.width='0px';
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio()
{
	if(!medio.paused && !medio.ended)
	{
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;
		medio.currentTime=nuevoTiempo;
		progreso.style.width=ratonX+'px';
	}
}

function accionPlay()
{
	if(!medio.paused && !medio.ended) 
	{
		medio.pause();
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
	else
	{
		medio.play();
		play.value='||';
		bucle=setInterval(redimensionaBarra, 1000);
	}
}

function iniciar() 
{
	maximo=700;
	
	medio=document.getElementById('medio');
	barra=document.getElementById('barra');
	progreso=document.getElementById('progreso');
	play=document.getElementById('play');
   	reiniciar=document.getElementById('reiniciar');
	retrasar=document.getElementById('retrasar');
	adelantar=document.getElementById('adelantar');
	silenciar=document.getElementById('silenciar');
	menosVolumen=document.getElementById('menosVolumen');
	masVolumen=document.getElementById('masVolumen');
	/* obtener los objetos del resto de elementos necesarios */
	play.addEventListener('click', accionPlay, false);
	/* crear los manejadores de eventos para el resto de botones */
	reiniciar.addEventListener('click', accionReiniciar, false);
	retrasar.addEventListener('click', accionRetrasar, false);
	adelantar.addEventListener('click', accionAdelantar, false);
	silenciar.addEventListener('click', accionSilenciar, false);
	menosVolumen.addEventListener('click', accionMenosVolumen, false);
	masVolumen.addEventListener('click', accionMasVolumen, false);
	barra.addEventListener('click', desplazarMedio, false);
}
function reiniciar()
{

	video.pause();
	video.currentTime=0;
	video.load();
}
window.addEventListener('load', iniciar, false);
