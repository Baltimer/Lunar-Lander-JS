var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var bandera = true;

//al cargar por completo la página...
window.onload = function(){
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
    bandera = true;
}

function stop(){
	clearInterval(timer);
    bandera = false;
}

function reset(){
    stop();
    y = 10;
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    timer=null;
    timerFuel=null;
    fuel=100;
    bandera = true;
    motorOff();
    document.getElementById("end").style.display="none";
    document.getElementById("endgame").innerHTML="FIN DEL JUEGO";
    document.getElementById("infogame").innerHTML="Has perdido! Inténtalo de nuevo o mira la página de instrucciones para aprender más del juego.";
    document.getElementById("showm").style.display="block";
    start();	
    document.getElementById("fuel").innerHTML=fuel.toFixed(2);
}
function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
        if(v<5){
            document.getElementById("showm").style.display="none";
            document.getElementById("endgame").innerHTML="Muy bien campeón!";
            document.getElementById("infogame").innerHTML="Has ganado! Inténtalo de nuevo con una dificultad más elevada.";
        } else{
            document.getElementById("showm").style.display="none";
            document.getElementById("cohete").src="img/Explosion.png";
        }
		stop();
        end();
	}
}
function motorOn(){
    if (bandera){    
        a=-g;
        if (timerFuel==null)
        timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
        document.getElementById("cohete").src="img/CoheteFuego.png";
    }
}
function motorOff(){
	if(bandera){
    a=g;
	clearInterval(timerFuel);
	timerFuel=null;
    document.getElementById("cohete").src="img/Cohete.png";
    }
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
    if (bandera) {    
        if(y<=70){
            fuel -= 0.2;
            if (fuel<=0){
                fuel = 0;
                motorOff();
            }
        }
    }
	document.getElementById("fuel").innerHTML=fuel.toFixed(3);	
}
function pausar(){
    stop();
    document.getElementById("c").style.display="inline-block";
}
function reanudar(){
    document.getElementById("c").style.display="none";
    start();
}
function end(){
    document.getElementById("end").style.display="block";
    bandera = false;
}