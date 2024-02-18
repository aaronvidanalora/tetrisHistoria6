import { models } from "./models";
import { ModeloPieza } from "../funciones/clases";
import { juego } from "../vistas/juego";
import { vistaGuardar } from "../vistas/vistaGuardar";
import { ranking } from "../vistas/ranking";

export const panel = {
  matriz: [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],


  
  pintaPanel: () => {
    const panelElement = document.querySelector('#panel');
    panelElement.innerHTML = '';

    for (let fila = 0; fila < panel.matriz.length - 1; fila++) {
        let divFilas = '<div class="fila" style="display: flex; justify-content: center;">';

        for (let columna = 1; columna < panel.matriz[fila].length - 1; columna++) {
            let divCeldas = '';
            if (panel.matriz[fila][columna] === 0) {
                divCeldas += '<div class="celda" style="background-color: #343a40; border: 1px solid black"></div>';
            } else {
                divCeldas += '<div class="celda" style="background-color: #007bff; border: 1px solid black"></div>';
            }
            divFilas += divCeldas;
        }
        divFilas += '</div>';
        panelElement.innerHTML += divFilas;
    }

     // Actualizar el valor de puntos en el elemento span
     const puntosElement = document.querySelector('#puntos');
     puntosElement.textContent = panel.puntos;
},

  



  borrarPieza: () => {

    if (panel.nuevaPieza) {
      for (let i = 0; i < panel.nuevaPieza.altura; i++) {
        for (let x = 0; x < panel.nuevaPieza.longitud; x++) {
          const elemento = panel.nuevaPieza.matriz[i][x];
          if (elemento) {
            panel.matriz[i + panel.nuevaPieza.y][x + panel.nuevaPieza.x] = 0;
          }
        }
      }
      panel.pintaPanel();
    }
  },
  
  
  crearNuevaPieza: () => {
    const aleatorioModelo = Math.floor(Math.random() * 7);
    
    // Obtener el ancho de la pieza directamente
    const ancho = models[aleatorioModelo].matriz[0].length;
    
    let aleatorioX;
    switch (ancho) {
      case 1:
        aleatorioX = Math.floor(Math.random() * 10);
        break;
      case 2:
        aleatorioX = Math.floor(Math.random() * 9);
        break;
      case 3:
        aleatorioX = Math.floor(Math.random() * 8);
        break;
      case 4:
        aleatorioX = Math.floor(Math.random() * 7);
        break;
    }
    
    const pieza = new ModeloPieza(aleatorioModelo, aleatorioX, 1, 0);
    panel.nuevaPieza = pieza; 
    return pieza;
   
  },
  
  insertarPieza: () => {
    for(let i=0; i<panel.nuevaPieza.altura; i++){
      for(let x=0; x<panel.nuevaPieza.longitud; x++){
        const elemento = panel.nuevaPieza.matriz[i][x];
        if(elemento){
          panel.matriz[i + panel.nuevaPieza.y][x + panel.nuevaPieza.x] = elemento;
        }
      }
    }
    
    panel.pintaPanel();
  },
  
  
  puntos: 0, // Variable puntos inicializada en 0
  


  moverIzq() {
    for (let y = 0; y < panel.nuevaPieza.altura; y++) {
      if (panel.matriz[panel.nuevaPieza.y + y][panel.nuevaPieza.x - 1] == 1) {
        return;
      }
    }
    panel.borrarPieza();
    panel.nuevaPieza.x -= 1;
    panel.puntos += 10; // Incrementa puntos en 10
    console.log('Puntos:', panel.puntos); // Muestra los puntos en la consola
    panel.insertarPieza();
    panel.pintaPanel();
  },

  moverDra() {
    for (let y = 0; y < panel.nuevaPieza.altura; y++) {
      if (panel.matriz[panel.nuevaPieza.y + y][panel.nuevaPieza.x + panel.nuevaPieza.longitud] == 1) {
        return;
      }
    }
    panel.borrarPieza();
    panel.nuevaPieza.x += 1;
    panel.puntos += 10; // Incrementa puntos en 10
    console.log('Puntos:', panel.puntos); // Muestra los puntos en la consola
    panel.insertarPieza();
    panel.pintaPanel();
  },

  bajar() {
    let llegoAbajo = false; // Variable para verificar si la pieza llega abajo
    for (let x = 0; x < panel.nuevaPieza.longitud; x++) {
        if (panel.matriz[panel.nuevaPieza.y + panel.nuevaPieza.altura][panel.nuevaPieza.x + x] == 1) {
            llegoAbajo = true; // La pieza llegó abajo
            panel.insertarPieza();
            panel.nuevaPieza = panel.crearNuevaPieza();
            break;
        }
    }

    if (llegoAbajo) { 
      panel.puntos += 50;
      console.log('Puntos', this.puntos);
      const mostrarGuardar = document.querySelector('#juego');
      mostrarGuardar.innerHTML = vistaGuardar.template

      const btnGuardar = document.querySelector('#btnGuardar');
      const btnCancelar = document.querySelector('#btnCancelar');
     
      btnGuardar.addEventListener('click', () => {
        const inputNick = document.querySelector('#nick').value;
        panel.nick = inputNick


        const vistaRanking = document.querySelector('main');
        vistaRanking.innerHTML = ranking.template;
        ranking.script()
    });
    

      btnCancelar.addEventListener('click',()=>{
        mostrarGuardar.innerHTML = juego.template
      })  
      
    } else { // Si no llegó abajo, sigue bajando la pieza
        panel.borrarPieza();
        panel.nuevaPieza.y += 1;
        panel.puntos += 10; // Incrementa puntos en 10
    }

    console.log('Puntos:', panel.puntos); // Muestra los puntos en la consola
    panel.insertarPieza();
    panel.pintaPanel();
},

  iniciarMovimiento: () => {
    panel.movimientoInterval = setInterval(() => {
      panel.bajar();
    }, 2000);
  },
  
  

  controlTeclas: () => {
    document.addEventListener("keydown", (event) => {
        // Prevenir el comportamiento predeterminado del navegador
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
        
        switch (event.key) {
            case "ArrowLeft":
                panel.moverIzq();
                console.log('izquierda');
                break;
            case "ArrowRight":
                panel.moverDra();
                console.log('derecha');
                break;
            case "ArrowDown":
                panel.bajar();
                console.log('abajo');
                break;
            case "ArrowUp":
                panel.borrarPieza();
                panel.nuevaPieza.girar();
                panel.puntos += 20;
                console.log('Puntos:', panel.puntos);
                panel.insertarPieza();
                console.log('arriba');
                break;
            default:
                break;
        }
    });
},


  
};



