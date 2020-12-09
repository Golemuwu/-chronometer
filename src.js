codigoAux="T/Estudiar/600/AA0000/1+T/Descanso/300/5555FF/2+S/Ciclos/>>/1/3+Q/Ciclos/=/3/4/0+T/Comer/1200/55FF55/0";
//"T/Laburo/1200/FF5555/1+T/descanzo/300/5555FF/0+S/Ciclos/>>/1/3+Q/Ciclos/=/3/4/0+T/Comer/100/55FF55/0"


textoHistorial = document.getElementById("historial").innerHTML;

console.log("Vinculado");

uwu = "Hola+Como+Estas"

console.log(uwu.split("+")[0]);
console.log(uwu.split("+")[1]);
console.log(uwu.split("+")[2]);

canvas = document.getElementById("D-canvas");
context= canvas.getContext("2d");

pause      = false;
hasStarted = false;
tPause     = null;
// Time

subtop = document.getElementById("subtop").innerHTML;


function start(){

    document.getElementById("top").innerHTML = `<input type="button" value="Diagram" class="top-input" onclick="Meniu('diagram')"></input>`

    originalCanvas = document.getElementById("div-canvas").innerHTML;

    document.getElementById("subtop").innerHTML = `<input type="button" value="Pause" id="button-pause" onclick="pausar()">`;

    desSelect();
    console.log("Started");

    hasStarted = true;

    tIni = new Date();
    tIni = tIni.getTime();

    variables = [];
    posicion    = 0; //En que bloque estoy (-1 = pausa)
    posicionAux = 0; //A qye bloque regreso tras la pausa

    codigo = dEncript(codigoAux);


    intervalo = setInterval(function (){leer()},200);



    historialTime = new Date();
    historialTime = historialTime.getTime();
    document.getElementById("historial-S").innerHTML = `<h1>`+historialStatic +`  </h1>`;


}


function contador(name,time){
    //console.log("Contadorewe");

    var t= Math.floor((new Date() - tIni)/1000);

    t = (pause==false)? t : Math.floor((new Date()-tPause)/1000);

    var secs = ((time-t)%60) <10? "0"+((time-t)%60) : ((time-t)%60);

    document.getElementById("div-canvas").innerHTML = ' <h1 class="time">'+name+":<br>"+Math.floor((time-t)/60)+":"+ secs +'</h1>';

    if(pause==true){

        secs = ((t)%60) <10? "0"+((t)%60) : ((t)%60);
        //secs = "owo";

        document.getElementById("div-canvas").innerHTML = ' <h1 class="time">'+"Pause"+":<br>"+Math.floor((t)/60)+":"+ secs +'</h1>';

    }

    



};

function dEncript(string){

    var a = [];

    for( var i = 0; i < string.split("+").length; i++){
        a[i] = string.split("+")[i].toString().split("/");
    }

    return a;

}

function Encript(matriz){
    var aux = matriz;
    for(var i = 0; i<matriz.length;i++){
        aux[i] = aux[i].join("/");
    };
    return aux.join("+");
};

function leer(){
    //contador();

    switch(codigo[posicion][0]){

        case "T":
            contador(codigo[posicion][1],codigo[posicion][2]);

            document.getElementById("div-canvas").style.backgroundColor = "#" + codigo[posicion][3];
            document.getElementById("myBody").style.backgroundColor="#" + codigo[posicion][3];

            if((codigo[posicion][2]-Math.floor((new Date() - tIni)/1000))<=0 && pause==false){
                console.log("Owola");
                tIni= new Date();
                tIni= tIni.getTime();
                posicion= codigo[posicion][4];
                leer();
            };

            //Si lastNameHist es undefined definir como el presente

            lastNameHist = (lastNameHist==undefined)? codigo[posicion][1] : lastNameHist;
            
        break

        case "S":
            console.log("S");

            if(variables.indexOf(codigo[posicion][1]) == -1){
                variables[variables.length] = codigo[posicion][1];
                variables[variables.length] = 0;
            };

            var aux = variables[variables.indexOf(codigo[posicion][1])+1];

            variables[variables.indexOf(codigo[posicion][1])+1] = aux + (codigo[posicion][2] == ">>") * codigo[posicion][3] - (codigo[posicion][2] == "<<") * codigo[posicion][3] + (codigo[posicion][2] == "=") * (codigo[posicion][3] - aux);

            console.log(variables);

            posicion= codigo[posicion][4];
            leer();

        break

        case "Q":
            console.log("Q");

            if(variables.indexOf(codigo[posicion][1]) == -1){
                variables[variables.length] = codigo[posicion][1];
                variables[variables.length] = 0;
            };

            var aux1 = variables[variables.indexOf(codigo[posicion][1])+1]; // Valor de la variable

            var aux2 = codigo[posicion][3]; //Numero a comparar

            var aux3 = codigo[posicion][2]; //Signo

            var aux = (aux3 == "=" && aux1 == aux2) || (aux3 == ">" && aux1 > aux2) || (aux3 == "<" && aux1 < aux2);

            posicion = aux? codigo[posicion][4] : codigo[posicion][5];

            leer();

        break

        case "V":
            console.log("V");
        break

        default:
            console.log("Defauld");
    };


    //console.log("esto serviria para actualizar el historial");


    actualizarHistorial();



};

console.log(dEncript("T/Estudiar/30/FF5555/1+T/descanzo/5/5555FF/2+S/Ciclos/>>/1/3+Q/Ciclos/=/3/4/0+T/Comer/100/55FF55/0"));

//Diagram

referencePosition =0;

function diagram(code) {

    

    codigo = dEncript(code);

    canvas.height = 50 + codigo.length * 150;
    canvas.height = 50 + 5 * 150;

    var aux = canvas.height / 300  *  (window.innerWidth*0.58) / (window.innerHeight*0.78);

    //Alternativa 1

    /*canvas.width=300*aux
    context.scale(1,1);*/

    //Alternativa 2
    
    //context.scale(1/aux,1);

    //Alternativa 3

    //Cambiar el style de el ancho sin tocar el ancho posta

    //No hacer nada?

    


    //Si la posicion esta entre "referenceposition" y "reference position++4" todo tranki
    //Sino actualizar reference postiion

    referencePosition = (posicion2 >= referencePosition && posicion2 <= referencePosition+4)? referencePosition : ((referencePosition > posicion2)? (referencePosition-1) : (referencePosition+1));
    

    

    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,300,codigo.length * 150 + 50);

    context.fillRect(0,0,300,5 * 150 + 50);

    //console.log(canvas.width);
    

    //drawCuadrado(false,100,20);

    for(var i = 0; i < codigo.length; i++){

        //fillCuadrado(codigo[i][0],codigo[i][3], 100,50+i*150);


        context.beginPath();
        context.fillStyle = "#000";

        
        
        drawCuadrado(codigo[i][0],codigo[i][3], 100,50+(i-referencePosition)*150);
        drawUnion(i,100,50+i*150);

        context.beginPath();

        drawTexto(codigo[i][0],codigo[i][1],codigo[i][2],codigo[i][3],100,50+(i-referencePosition)*150);
        context.beginPath();

    };
    
}

/*function fillCuadrado(TypeBloq,ColorBloq,x,y){

    var ancho = 100;
    var alto  = 100;

    var CoR = (TypeBloq=="T") + (TypeBloq=="S");
    
    var aux = CoR? y : y+alto/2;

    context.moveTo(x, aux);

    

    context.lineTo((CoR? x+ancho : x+ancho/2), y);
    context.lineTo(x+ancho, (CoR? y+alto : y + alto/2));
    context.lineTo((CoR? x : x+ancho/2), y+alto);
    context.lineTo(x, aux);




    context.fillStyle =  (TypeBloq=="T")? ("#" + ColorBloq) :"#FFFFFF00";
    context.fill();
};*/

function drawCuadrado(TypeBloq,ColorBloq,x,y){

    var ancho = 100;
    var alto  = 100;

    var CoR = (TypeBloq=="T") + (TypeBloq=="S");

    // CoR es cuadrado o Rombo, true es cuadrado, false es rombo

    /*var dimensiones = {
        ancho: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        alto: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
    
    var alto = ancho *  (document.getElementById("D-canvas").width/document.getElementById("D-canvas").hidden);

    var num1 = 0.58;
    var num2 = 0.78

    alto = alto * (dimensiones.ancho * num1) / (dimensiones.alto * num2);*/

    //YA

    
    

    var aux = CoR? y : y+alto/2;

    context.moveTo(x, aux);

    

    context.lineTo((CoR? x+ancho : x+ancho/2), y);
    context.lineTo(x+ancho, (CoR? y+alto : y + alto/2));
    context.lineTo((CoR? x : x+ancho/2), y+alto);
    context.lineTo(x, aux);

    context.fillStyle =  (TypeBloq=="T")? ("#" + ColorBloq) :"#E4E062";
    context.fill();
    context.fillStyle = "#000";
    context.stroke();
    //context.fill();

    
    
};

function drawUnion(Bloq,x,y){
    //y+=100;
    y+=100;
    x+=50;

    var ref = -referencePosition*150

    context.fillStyle = "#000000";

    context.moveTo(x,y+ref);
    context.lineTo(x,y+25+ref);

    if(codigo[Bloq][0] =="Q"){
        //Que hace si es una pregunta

        //Modificador
        for(var j=0; j<2;j++){

            // 0 sería si
            var y2 = (j==0)? -10 : 10;

            context.moveTo(x,y+25+ref);
            context.lineTo(x,y+y2+25+ref);

            //Hay que hacer de que los valores se alteres si se habla de 0 1 siendo estos
            // Afirmativo o negativo

            if(codigo[Bloq][codigo[Bloq].length-2+j] > Bloq){
                //Voy para la derecha y bajo
                console.log("Hola");
        
                context.lineTo(x+65+7* codigo[Bloq][codigo[Bloq].length-2+j],y+y2+25+ref);
                context.lineTo(x+65+7* codigo[Bloq][codigo[Bloq].length-2+j],   100 + 150*codigo[Bloq][codigo[Bloq].length-2+j]+ref);
        
                context.lineTo(x+50,    100+ 150*codigo[Bloq][codigo[Bloq].length-2+j]+ref);
        
            } else {
                //Voy para la izquierda y subo
                console.log("Adios");
        
                context.lineTo(x-65-7* codigo[Bloq][codigo[Bloq].length-2+j],y+y2+25+ref);
                context.lineTo(x-65-7* codigo[Bloq][codigo[Bloq].length-2+j],   100+ 150*codigo[Bloq][codigo[Bloq].length-2+j]+ref);
        
                context.lineTo(x-50,    100+ 150*codigo[Bloq][codigo[Bloq].length-2+j]+ref);
            };
            context.stroke();
        };








    }else if(codigo[Bloq][codigo[Bloq].length-1] == Bloq+1){
        //Sigo un poco
        context.lineTo(x,y+50+ref);



    } else if(codigo[Bloq][codigo[Bloq].length-1] > Bloq){
        //Voy para la derecha y bajo
        console.log("Hola");

        context.lineTo(x+65+7* codigo[Bloq][codigo[Bloq].length-1],y+25+ref);
        context.lineTo(x+65+7* codigo[Bloq][codigo[Bloq].length-1],   100+ 150*codigo[Bloq][codigo[Bloq].length-1]+ref);

        context.lineTo(x+50,    100+ 150*codigo[Bloq][codigo[Bloq].length-1]+ref);

    } else {
        //Voy para la izquierda y subo
        console.log("Adios");

        context.lineTo(x-65-7* codigo[Bloq][codigo[Bloq].length-1],y+25+ref);
        context.lineTo(x-65-7* codigo[Bloq][codigo[Bloq].length-1],   100+ 150*codigo[Bloq][codigo[Bloq].length-1]+ref);

        context.lineTo(x-50,    100+ 150*codigo[Bloq][codigo[Bloq].length-1]+ref);
    };




    context.stroke();
};

function drawTexto(TypeBloq,Name,Content,ContentAux,x,y){
    console.log("Hola");

    x+=30;
    y+=80; //30

    switch(TypeBloq){
        case "T":
        
            context.font = "20px Arial";

            context.fillText(Name,x-20,y-40);

            var secs = (Content%60 < 10)? "0" + Content%60 : Content%60 ;

            Content = Math.floor(Content/60) + ":" + secs;

            context.fillText(Content,x,y);

        break;

        case "S":

            context.font = "20px Arial";

            Content = (Content=="=")? Content= "=" : ( (Content==">>")? Content="+=" : Content="-=");

            context.fillText(Content+" "+ContentAux,x-5,y-40);
    
    
            Content = Math.floor(Content/60) + ":" + "owo";
    
            context.fillText(Name,x-20,y);

        break;
    
        case "Q":

            context.font = "20px Arial";

            Content = (Content=="=")? Content= "=" : ( (Content==">")? Content=">" : Content="<");

            context.fillText(Content+" "+ContentAux,x,y-40);
    
            context.fillText(Name,x-15,y-15);

        break;
    
    };
};

function drawBorder(TypeBloq,ColorLine,x,y){
    console.log("Bordewe");

    y=y-referencePosition*150;

    var ancho = 100;
    var alto  = 100;

    var CoR = (TypeBloq=="T") + (TypeBloq=="S");

    var aux = CoR? y : y+alto/2;

    context.moveTo(x, aux);

    

    context.lineTo((CoR? x+ancho : x+ancho/2), y);
    context.lineTo(x+ancho, (CoR? y+alto : y + alto/2));
    context.lineTo((CoR? x : x+ancho/2), y+alto);
    context.lineTo(x, aux);

    context.strokeStyle =  ColorLine;
    context.lineWidth = 5;
    context.stroke();
    //context.fill();
}

function getCode(){
    //Clipboard.writeText("Owo?");

    //var temp= document.createElement("input");

    var temp= document.createElement("input");



    document.getElementsByTagName("body")[0].appendChild(temp);

    temp.value=codigoAux;
    temp.select();

    document.execCommand("copy");

    document.getElementsByTagName("body")[0].removeChild(temp);
};

function desSelect(){
    //Clipboard.writeText("Owo?");

    //var temp= document.createElement("input");

    var temp2= document.createElement("input");



    document.getElementsByTagName("body")[0].appendChild(temp2);

    temp2.value=codigoAux;
    temp2.select();

    document.getElementsByTagName("body")[0].removeChild(temp2);
};

posicion2 = 0;
TimeOrDiagram=1; // 0 es diagrama
isInsideBlock=0;

function MeniuDiagram(){
    var html = document.getElementById("div-buttons").innerHTML;

    desSelect();

    TimeOrDiagram=0;
    isInsideBlock=0;

    document.getElementById("div-buttons").innerHTML = `<input type="button" name="Up"  value="Up" id="" onclick="Meniu('up')"> <input type="button" name="Down" value="Down" id="" onclick="Meniu('down')"> <input type="button" name="Plus" value="Plus" id=""  onclick="Meniu('plus')"> <input type="button" name="Delete" value="Delete" id=""  onclick="Meniu('delete')"> <input type="button" name="Entrar"  value="Entrar" id="" onclick="Meniu('entrar')">`;
};

function Meniu(button){

    //Colocar botones

    posicion2= (posicion2<0)? 0 : posicion2;
    posicion2= (posicion2>codigo.length-1)? codigo.length-1 : posicion2;


    var TypeBloq = codigo[posicion2][0];
    console.log(TypeBloq);

    switch(button){

    case "diagram":

    if(hasStarted){

        document.getElementById("top").innerHTML = `<input type="button" value="Start" class="top-input" onclick="start()"></input>`;


        clearInterval(intervalo);
        document.getElementById("div-canvas").innerHTML = originalCanvas;

        canvas = document.getElementById("D-canvas");
        context= canvas.getContext("2d");

        document.getElementById("historial").innerHTML = textoHistorial;


        document.getElementById("div-canvas").style.backgroundColor = "#53771D";
        document.getElementById("myBody").style.backgroundColor="#FFFFFF";
    };
    

    document.getElementById("subtop").innerHTML = subtop;
    hasStarted = false;
    variables=[];

    MeniuDiagram();

    context.beginPath();
    diagram(codigoAux);
    context.beginPath();
    drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
    context.beginPath();

    break;

    case "entrar":
        isInsideBlock=1;

        var b = [];

        b[0] = `<label for="">Data:</label>`;
        b[1] = `<select name="" id="dataSelect" onchange="actualizarValueOptions()">`;
        b[2] = `<option value="0">Type</option>`;
        b[3] = (TypeBloq=="T")?`<option value="1">Name</option>` : `<option value="1">ID</option>`;
        b[4] = (TypeBloq=="T")?`<option value="2">Time</option>` : ((TypeBloq=="S")? `<option value="2">Asig</option>`: `<option value="2">Question</option>`);
        b[5] = `<option value="3">`+ ((TypeBloq=="T")?`Color`:`Valor`)+`</option>`;
        b[6] = `<option value="4">`+ ((TypeBloq=="Q")?`Salida1`:`Salida`)+`</option>`;
        b[7] = (TypeBloq=="Q")?`<option value="5">Salida2</option>`:"";
        b[8] = `</select>`;

        var c =[];
        
        //Ojo que aca estas entrando, no es necesario volarsae la bocha pensando en os casos posiubles porque al entrasr siempre va a estar en 0

       

        var c_ = `<label for="">Type:</label>`;
        var c_0 = `<select name="valueSelect" id="valueSelect"  onchange="actualizarMatriz()">`;

        //Me fijo que opcion estaba seleccionada

        var select = 1 * (codigo[posicion2][0] == "S") + 2* (codigo[posicion2][0] == "Q");

        c[0] = `<option value="T">Timer</option>`;
        c[1] = `<option value="S">Set</option>`;
        c[2] = `<option value="Q">Question</option>`;
        c[3] = `</select>`;
            
        //poner el contenido de la que quiero en el 0 y borrar donde estaba
        c.unshift(c[select]);
        c.splice(select+1,1);
        //Le pongo lo previo
        c.unshift(c_,c_0);

        //<input type="button" name="Onload"  value="Onload" id="">

        document.getElementById("div-buttons").innerHTML = `<input type="button" name="Salir"  value="Salir" id="" onclick="Meniu('diagram')"> `+b.join("")+`<div id="OptionC" style="display: inline-block">`+c.join("")+`</div>`;

    break;

    case "up":
        posicion2 = (posicion2<=0)? posicion2 : posicion2-1;
        console.log(posicion2);

        context.beginPath();
        diagram(codigoAux);
        context.beginPath();
        drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
        context.beginPath();
        

    break

    case "plus":

        

        //Mira lo que tengo que hacer aca es agarrar el codigo encriptado y sumarle un bloque, onda al texto le sumo el bloque y lo vuelvo a encriptar
        //"T/Timer/300/00AAAA/0"
        codigoAux = Encript(codigo);
        codigoAux = codigoAux + "+T/Timer/300/00AAAA/0"
        codigo    = dEncript(codigoAux);


        context.beginPath();
        diagram(codigoAux);
        context.beginPath();
        drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
        context.beginPath();

    break

    case "delete":


        //Lo que tengo que hacer es remover un solo elemento en concreto
        //Como consecuencia qeuizá tenga elementos asociados a uno inexistente
        //Asi que tengo que hacer que todos que tengan una salido = length -1
        //"T/Timer/300/00AAAA/0"
        codigo    = dEncript(codigoAux);
        codigo.splice(posicion2,1);

        //Fijarme que todas las salidas sean menores al  length actual

        for(var i =0; i< codigo.length;i++){
            //Pregunta si el ultimo numero o si el penultimo numero en caso de ser Q son iguales al lengtgh

            if(codigo[i].length ==6){
                codigo[i][5] = (codigo[i][5]==codigo.length)? codigo.length-1 : codigo[i][5]; 
            };

            codigo[i][4] = (codigo[i][4]==codigo.length)? codigo.length-1 : codigo[i][4]; 
        };
        codigoAux =Encript(codigo);



        
        


        context.beginPath();
        diagram(codigoAux);
        context.beginPath();
        drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
        context.beginPath();

        

        

        



        

    break

    case "down":
        posicion2 = (posicion2>=codigo.length-1)? posicion2 : posicion2+1;
        console.log(posicion2);

        context.beginPath();
        diagram(codigoAux);
        context.beginPath();
        drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
        context.beginPath();

    
    };

};

function saludo(){
    console.log("esto mira:"+ document.getElementById("dataSelect").value);
};

function actualizarMatriz(){
    //console.log(document.getElementById("valueSelect").value);


    //Tomo en cuenta que si estoy en tiempo necesito 2 datos combinados
    

    var DataChange = (document.getElementById("dataSelect").value=="2" && codigo[posicion2][0]=="T")? parseInt(parseInt(document.getElementById("valueSelect").value)*60+parseInt(document.getElementById("valueSelect2").value)) : (document.getElementById("valueSelect").value);
    console.log(DataChange);

    //Si el primer digito de un DataChange es # lo quitamos

    DataChange = ((""+DataChange).split("")[0]=="#" && codigo[posicion2][0]=="T" && document.getElementById("dataSelect").value=="3")? (DataChange.split("").splice(1,DataChange.length-1).join("")) : DataChange;

    console.log(DataChange);

    //Si necesito una variable y empieza por un numero añadir var_

    var firstDig = (""+DataChange).split("")[0];
    var isNumber = (firstDig =="0" || firstDig=="1" || firstDig=="2" || firstDig=="3" || firstDig=="4" || firstDig=="5" || firstDig=="6" || firstDig=="7" || firstDig=="8" || firstDig=="9")
    DataChange   = (isNumber && codigo[posicion2][0]!="T" && document.getElementById("dataSelect").value =="1")? ("var_"+DataChange) : DataChange
    //----------------------------------------

    //Si estoy anunciando una salida debo restar uno al dato

    DataChange = (document.getElementById("dataSelect").value>=4)? (DataChange-1) : DataChange;

    //Si cambio el typo reiniciar la seleccion (Meniu("entrar")) y establecer un bloque por defecto
    //--------------------

    









    var matrix = codigo;
    matrix[posicion2][document.getElementById("dataSelect").value]=DataChange;
    var Value = document.getElementById("valueSelect").value;

    var changeType = (document.getElementById("dataSelect").value=="0")?   ("1") : ("0");

    if (changeType=="1"){
        var T="T/Timer/300/00AAAA/0";
        var S="S/Set/>>/1/0";
        var Q="Q/Question/>/1/0/0";

        matrix[posicion2]=[];

        if(Value=="T"){
            matrix[posicion2][0]=T;
        }else if (Value=="S"){
            matrix[posicion2][0]=S;
        } else{
            matrix[posicion2][0]=Q;
        };

        
    };

    codigoAux = Encript(matrix);
    codigo    = dEncript(codigoAux);

    //Si cambio el typo reiniciar la seleccion (Meniu("entrar")) y establecer un bloque por defecto
    //--------------------

    if(document.getElementById("dataSelect").value=="0"){Meniu("entrar")};
    

    context.beginPath();
    diagram(codigoAux);
    context.beginPath();
    drawBorder(codigo[posicion2][0],"#F55", 100,50+posicion2*150);
    context.beginPath();
};

function actualizarValueOptions(){
    var Value = document.getElementById("dataSelect").value;
    console.log("Actualizando"+ Value);

    var c=[];

    switch(Value.toString()){
        case "0":// TIpo del bloque
            console.log("HolaEstoAnda");


            

            var c_ = `<label for="">Type:</label>`;
            var c_0 = `<select name="valueSelect" id="valueSelect"  onchange="actualizarMatriz()">`;

            //Me fijo que opcion estaba seleccionada

            var select = 1 * (codigo[posicion2][0] == "S") + 2* (codigo[posicion2][0] == "Q");

            c[0] = `<option value="T">Timer</option>`;
            c[1] = `<option value="S">Set</option>`;
            c[2] = `<option value="Q">Question</option>`;
            c[3] = `</select>`;

            //poner el contenido de la que quiero en el 0 y borrar donde estaba
            c.unshift(c[select]);
            c.splice(select+1,1);
            //Le pongo lo previo
            c.unshift(c_,c_0);

            document.getElementById("OptionC").innerHTML = c.join("");

        break;

        case "1": //NJombre o ID
            console.log("Hola");

            c[0] = `<label for="">`+((codigo[posicion2][0]=="T")?("Name"):("ID"))+`:</label>`;
            c[1] = `<input type="text" placeholder="" value="`+codigo[posicion2][1]+`"  id="valueSelect" onchange="actualizarMatriz()"></input>`;
            

            document.getElementById("OptionC").innerHTML = c.join("");



            
        break;

        case "2": //Asig Preg o Tiempo

            var TypeBloq = codigo[posicion2][0];
            console.log("Hola");

            var c_ = `<label for="">`+((TypeBloq=="T")?(`Time`):((TypeBloq=="S")?("Operacion"):("Comparacion")))+`:</label>`;

            
            

            if(TypeBloq=="T"){

                c[0] = `<input type="number" min="0" placeholder="mn" value="`+ Math.floor(codigo[posicion2][2]/60)+`" id="valueSelect"  onchange="actualizarMatriz()" style="width:40px">`;
                c[1] = `<label for=""> : </label>`;
                c[2] = `<input type="number" placeholder="sc" min="0" max="60" value="`+ parseInt(codigo[posicion2][2]%60)+`" id="valueSelect2"  onchange="actualizarMatriz()" style="width:40px">`;
                c.unshift(c_);

            }else{

                var c_0 = `<select name="valueSelect" id="valueSelect"  onchange="actualizarMatriz()">`;
                //Me fijo que opcion estaba seleccionada

                var select = 1 * (codigo[posicion2][2] == ">>" || codigo[posicion2][2]==">") + 2* (codigo[posicion2][2] == "<<" || codigo[posicion2][2]=="<");



                c[0] = `<option value="`+((TypeBloq=="S")?(`=">Igualar`):(`=">Iguala`))   +`</option>`;
                c[1] = `<option value="`+((TypeBloq=="S")?(`>>">Sumar`):(`>">Supera`))     +`</option>`;
                c[2] = `<option value="`+((TypeBloq=="S")?(`<<">Restar`):(`<">Precede`))+`</option>`;
                c[3] = `</select>`;

                //poner el contenido de la que quiero en el 0 y borrar donde estaba
                c.unshift(c[select]);
                c.splice(select+1,1);
                //Le pongo lo previo
                c.unshift(c_,c_0);

            };
            

            document.getElementById("OptionC").innerHTML = c.join("");



        break;

        case "3": //Color o Valor

        
            var TypeBloq = codigo[posicion2][0];
            console.log("Hola");

            c[0] = `<label for="">`+((TypeBloq=="T")?(`Color`):((TypeBloq=="S")?("Cantidad"):("Comparador")))+`:</label>`;

            
            

            if(TypeBloq=="T"){

                c[1] = `<input type="color" value="#`+ codigo[posicion2][3]+`" id="valueSelect" onchange="actualizarMatriz()">`;
                

            }else{

                c[1] = `<input type="number" value="`+codigo[posicion2][3]+`"  id="valueSelect" onchange="actualizarMatriz()" style="width:40px">`;
                
            };
            

            document.getElementById("OptionC").innerHTML = c.join("");
        break;

        case "4":
            console.log("Hola");
            var TypeBloq = codigo[posicion2][0];

            c[0] = `<label for="">`+((TypeBloq=="Q")?("TrueOutput"):("Salida"))+`:</label>`;
            c[1] = `<input type="number" min="1" max="`+codigo.length+`" value="`+(parseInt(codigo[posicion2][4])+1)+`" id="valueSelect"  onchange="actualizarMatriz()">`;
            

            document.getElementById("OptionC").innerHTML = c.join("");
        break;

        case "5":
            console.log("Hola");
            var TypeBloq = codigo[posicion2][0];

            c[0] = `<label for="">`+((TypeBloq=="Q")?("FalseOutput"):("Salida"))+`:</label>`;
            c[1] = `<input type="number" min="1" max="`+codigo.length+`" value="`+(parseInt(codigo[posicion2][5])+1)+`" id="valueSelect"  onchange="actualizarMatriz()">`;
            

            document.getElementById("OptionC").innerHTML = c.join("");
        break;
    }
};


//window.setInterval(function() {diagram(("T/Laburo/30/FF5555/1+T/descanzo/5/5555FF/2+S/Ciclos/>>/1/3+Q/Ciclos/=/3/4/0+T/Comer/100/55FF55/0")); console.log( document.getElementById("dataSelect").value); },200);
diagram(codigoAux);


var historialStatic ="";  //Este va a ser un string que contenga lo que iria en el html excepto por el historialDinamic
var historialDinamic;     //Esta variable indica el ultimo valor en el historial
var lastNameHist;         //Esta variable indica cual fue el ultimo tiempo en el que se estuve, asi podemos diferenciar si agregarle más tiempo a este o crear uno nuevo (debe sobreescribirse al darle a start)
var historialTime;        //Esta variable va a ser la fecha desde que empieza en donde estamos en el hist
var wasPaused= false;


function actualizarHistorial(){
    //console.log("actualizando historial");
    console.log("lastName: "+lastNameHist)
    

    var timehist = Math.floor((parseInt(((new Date).getTime())) - parseInt(historialTime))/1000);

    timehist = ilustrarTime(timehist);

    historialDinamic = ""+ lastNameHist + "<br>"+ timehist +"<br>";

    //lastNameHist = (pause)? "Pause" : lastNameHist;

    


    

    //Si no concuerda tomo el tiempo anterior y lo meto a historialStatic, y reinicio dinamic

    if((lastNameHist !== codigo[posicion][1] && pause==false) || (lastNameHist!== "Pause" && pause==true)){
        //Si no concuerda lo meto en static
        historialStatic = "" + historialStatic + historialDinamic;
        lastNameHist = (lastNameHist!=="Pause" && pause==true)? "Pause" : codigo[posicion][1];

        historialTime = new Date();
        historialTime = historialTime.getTime();
        document.getElementById("historial-S").innerHTML = `<h1>`+historialStatic +`  </h1>`;
        actualizarHistorial();
    };


    


    document.getElementById("historial-D").innerHTML = `<h1>`+historialDinamic+`  </h1>`;
};


function ilustrarTime(tiempo){

    var secs = ((tiempo)%60) <10? "0"+((tiempo)%60) : ((tiempo)%60);

    return Math.floor((tiempo)/60)+":"+ secs;
};

var teclado={
    teclas: new Array,
    iniciar: function(){
        document.onkeydown=teclado.guardarTecla;
    },
    guardarTecla: function(e){
        teclado.teclas.push(e.keyCode);
        console.log(e.keyCode);

        if(TimeOrDiagram=="0"  && isInsideBlock=="0"){
            if(e.keyCode=="38"){
                Meniu("up");
            }else if(e.keyCode=="40"){
                Meniu("down");
            }else if(e.keyCode=="13"){
                Meniu("entrar");
            };
        };

        if(hasStarted==true){
            if(e.keyCode=="80"){
                pausar();
            };
        };










        teclado.reiniciar();
    },
    teclaPulsada: function(codigoTecla){
        return (teclado.teclas.indexOf(codigoTecla) !== -1) ? true : false;
    },
    reiniciar: function(){
        teclado.teclas = new Array;
    }
}

teclado.iniciar();

function pausar(){
    desSelect();
    if(pause==false){
        tPause= new Date();
        pause=true;
        }else{
            console.log(tIni);
            tIni = tIni + (new Date()-tPause);
            console.log("vs "+tIni);
            pause=false;
            tPause=null;
        }
}

function escribirCodigo(){
    codigoAux = document.getElementById("Codigo").value;
    codigo = dEncript(codigoAux);
    console.log("Cambiando");
    Meniu("diagram");
};

function guardar(){
    console.log("Guardando en cookie");
    var d = new Date();
    d.setTime(d.getTime+7*24*60*60*1000);
    var expiracion = "expires="+d.toUTCString();
    document.cookie = "galletita="+"owo"+"; "+expiracion+";";


    var awa = document.cookie.split(";");
    alert(awa[0]);
};



Meniu("diagram");