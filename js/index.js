import {newNode} from "./library.js";

const container= document.getElementById("container");
const start= document.getElementById("start");
const stop= document.getElementById("stop");

start.addEventListener("click", play);
stop.addEventListener("click", fStop);

const numCeldas= 400;
var cont=1;

let col=1
let row=1;

let red= "rgb(255, 0, 0)";

while(numCeldas>=cont){

    let btn= newNode("button");
    btn.addEventListener("click", pulsado);
    let columna= col+"/"+(col+1);
    btn.style.gridColumn= columna;
    col++;
    
    let fila= row+"/"+(row+1);
    btn.style.gridRow= fila;

    if(col%21==0){
        row++;
        col=1;
    }

    btn.setAttribute("id", columna+"&"+fila);

    container.appendChild(btn);
    cont++;
}

var arrayBtn= container.getElementsByTagName("button"); //obtengo todos los botones


function pulsado(){    

    let color= this.style.backgroundColor;

    if(color==red)
        this.style.background="#c1d7ec";
    else
        this.style.background="#F00";

}


let playing;

let arrayVivos=[];
let arrayMuertos=[];

function play(){  

    playing= setInterval(()=>{

        for(let btn of arrayBtn){

            let background= btn.style.backgroundColor;

            let col1= parseInt(btn.style.gridColumn.split("/")[0].trim());
            let col2= parseInt(btn.style.gridColumn.split("/")[1].trim());

            let row1= parseInt(btn.style.gridRow.split("/")[0].trim());
            let row2= parseInt(btn.style.gridRow.split("/")[1].trim());
            
            let idUpLeft;
            let idUp;
            let idUpRight;
            
            let idLeft;
            let idRight;

            let idDownLeft;
            let idDown;
            let idDownRight;

            //Obtengo los posibles id's de las celdas colidantes
            idUpLeft= (col1-1)+"/"+(col2-1)+"&"+(row1-1)+"/"+(row2-1);
            idUp= col1+"/"+col2+"&"+(row1-1)+"/"+(row2-1);
            idUpRight= (col1+1)+"/"+(col2+1)+"&"+(row1-1)+"/"+(row2-1);

            idLeft= (col1-1)+"/"+(col2-1)+"&"+row1+"/"+row2;
            idRight= (col1+1)+"/"+(col2+1)+"&"+row1+"/"+row2;

            idDownLeft= (col1-1)+"/"+(col2-1)+"&"+(row1+1)+"/"+(row2+1);
            idDown= col1+"/"+col2+"&"+(row1+1)+"/"+(row2+1);
            idDownRight= (col1+1)+"/"+(col2+1)+"&"+(row1+1)+"/"+(row2+1);


            let cUpLeft= document.getElementById(idUpLeft);
            let cUp= document.getElementById(idUp);
            let cUpRight= document.getElementById(idUpRight);

            let cLeft= document.getElementById(idLeft);
            let cRigth= document.getElementById(idRight);

            let cDownLeft= document.getElementById(idDownLeft);
            let cDown= document.getElementById(idDown);
            let cDownRigth= document.getElementById(idDownRight);

            let vecinoVivo=0;
            let vecinoMuerto=0;
            
            if(background==red){ //el botón actual está en rojo. Debo comprobar si sobrevive o muere.
                /**
                 * Fila superior
                 */
                btn;
                if(cUpLeft!=null){
                    if(cUpLeft.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }
                if(cUp!=null){
                    if(cUp.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }
                if(cUpRight!=null){
                    if(cUpRight.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }

                /**
                 * Misma fila
                 */
                if(cLeft!=null){
                    if(cLeft.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;

                }
                if(cRigth!=null){
                    if(cRigth.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }


                /**
                 * Fila inferior
                 */
                if(cDownLeft!=null){
                    if(cDownLeft.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;

                }
                if(cDown!=null){
                    if(cDown.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }
                if(cDownRigth!=null){
                    if(cDownRigth.style.backgroundColor==red)
                        vecinoVivo++;
                    else
                        vecinoMuerto++;
                }


                if(vecinoMuerto>=7 || vecinoVivo>=4 || vecinoVivo<=1) //no tiene vecinos o tiene 4 o más
                    arrayMuertos.push(btn);


            }
            else{ //el botón actual NO está en rojo. Debo comprobar si revive.
                btn;
                if(cUpLeft!=null)
                    if(cUpLeft.style.backgroundColor==red)
                        vecinoVivo++;
                    
                
                if(cUp!=null)
                    if(cUp.style.backgroundColor==red)
                        vecinoVivo++;
                    
                if(cUpRight!=null)
                    if(cUpRight.style.backgroundColor==red)
                        vecinoVivo++;
                   

                /**
                 * Misma fila
                 */
                if(cLeft!=null)
                    if(cLeft.style.backgroundColor==red)
                        vecinoVivo++;
                
                if(cRigth!=null)
                    if(cRigth.style.backgroundColor==red)
                        vecinoVivo++;
                


                /**
                 * Fila inferior
                 */
                if(cDownLeft!=null)
                    if(cDownLeft.style.backgroundColor==red)
                        vecinoVivo++;
                    
                if(cDown!=null)
                    if(cDown.style.backgroundColor==red)
                        vecinoVivo++;
                    
                if(cDownRigth!=null)
                    if(cDownRigth.style.backgroundColor==red)
                        vecinoVivo++;
                
                if(vecinoVivo==3)
                    arrayVivos.push(btn);                
                
            }//end else NO es rojo
        }//end bucle for of       

        for(let i in arrayMuertos)
            arrayMuertos[i].style.backgroundColor="#c1d7ec";

        for(let i in arrayVivos)
            arrayVivos[i].style.backgroundColor=red;

        arrayMuertos=[];
        arrayVivos=[];
    }, 500);


    

}


function fStop(){

    for(let btn of arrayBtn)
        btn.style.backgroundColor="#c1d7ec";

    clearInterval(playing);
}