const fs = require('fs'); /*file system*/

/*bloque nodo*/

class Nodo {
    constructor(dato) {
        this.dato = dato;       
        this.siguiente = null;  
    }
}

/*Clase Lista enlazada*/

class ListaEnlazada {
    constructor() {
        this.cabeza = null; 
    }

agregarAlFinal(caracter) {
        const nuevoNodo = new Nodo(caracter);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

/*BORRAR */ /*no Arrays*/
borrarUltimos(n) {
        for (let i = 0; i < n; i++) {
            if (this.cabeza === null) break; 
            if (this.cabeza.siguiente === null) {
                this.cabeza = null;
            } else {
                let actual = this.cabeza;
                while (actual.siguiente.siguiente !== null) {
                    actual = actual.siguiente;
                }
                actual.siguiente = null; 
            }
        }
    }


/*fUNCIONes PUENTE*/

convertirAString() {
        let resultado = "";
        let actual = this.cabeza;
        while (actual !== null) {
            resultado += actual.dato; 
            actual = actual.siguiente;
        }
        return resultado;
    }

    reconstruirDesdeString(texto) {
        this.cabeza = null; 
        for (let i = 0; i < texto.length; i++) {
            this.agregarAlFinal(texto[i]);
        }
    }
}

/* Clase pila */

class Pila {
    constructor() {
        this.tope = null; 
    }


/* metodo push*/

    push(foto) {
        const nuevoNodo = new Nodo(foto);
        nuevoNodo.siguiente = this.tope;
        this.tope = nuevoNodo;
    }

    /*metodo pop*/
    pop() {
        if (this.estaVacia()) return null;
        const fotoObtenida = this.tope.dato;
        this.tope = this.tope.siguiente;
        return fotoObtenida;
    }

    /*metodos axiliares*/
    estaVacia() {
        return this.tope === null;
    }


    vaciar() {
        this.tope = null;
    }
}

/* MOTOR EDITOR */

/* Captura el nombre del archivo (Ej: test1.txt) desde la terminal*/
const archivoComandos = process.argv[2];

if (!archivoComandos) {
    console.log("Por favor, proporciona un archivo de comandos. Ejemplo: node main.js test1.txt");
    process.exit(1);
}

/*VARIABLES*/
let documento = new ListaEnlazada();
let historial = new Pila(); /*pasaod0*/
let rehacer = new Pila();  /*presente*/

try {
    /*Leemos el archivo y lo separamos por filas*/
    const contenido = fs.readFileSync(archivoComandos, 'utf-8');
    const lineas = contenido.split(/\r?\n/); 

    for (let i = 0; i < lineas.length; i++) {
        let linea = lineas[i].trim();
        if (linea === "") continue; /* Si la fila está vacía, no hace nada*/



/* SI DICE MOSTRAR */
        if (linea === "MOSTRAR") {
            let textoActual = documento.convertirAString();
            if (textoActual === "") {
                console.log("(vacio)");
            } else {
                console.log(textoActual);
            }
        }
        
/*SI DICE ESCRIBIR */
        else if (linea.startsWith("ESCRIBIR ")) {
            
            historial.push(documento.convertirAString());
            rehacer.vaciar(); /*regla critica*/

            /* Corta la palabra "ESCRIBIR " y se queda solo con el texto a agregar*/
            let textoAInserter = lineas[i].substring(9); 
            for (let j = 0; j < textoAInserter.length; j++) {
                documento.agregarAlFinal(textoAInserter[j]);
            }
        }

/*SI DICE BORRAR*/
        else if (linea.startsWith("BORRAR ")) {
            let n = parseInt(linea.substring(7));
            if (!isNaN(n)) {
                
                historial.push(documento.convertirAString());
                rehacer.vaciar();
                documento.borrarUltimos(n);
            }
        }


/*SI DICE BUSCAR*/
        else if (linea.startsWith("BUSCAR ")) {
            let palabraABuscar = linea.substring(7);
            let textoActual = documento.convertirAString();
            
            if (textoActual.includes(palabraABuscar)) {
                console.log(`encontrado: ${palabraABuscar}`);
            } else {
                console.log(`no encontrado: ${palabraABuscar}`);
            }
        }

/*SI DICE REEMPLAZAR*/
        else if (linea.startsWith("REEMPLAZAR ")) {
            historial.push(documento.convertirAString());
            rehacer.vaciar(); 

            let argumentos = linea.substring(11).split(" ");
            let palabraVieja = argumentos[0];
            let palabraNueva = argumentos[1];

            let textoActual = documento.convertirAString();
            let nuevoTexto = textoActual.replace(palabraVieja, palabraNueva);
            
            documento.reconstruirDesdeString(nuevoTexto);
        }

/*SI DICE DESHACER*/ /*remplazar*/
        else if (linea === "DESHACER") {
            if (!historial.estaVacia()) {
                /* Guarda lo que hay en la mesa dentro de REHACER*/
                rehacer.push(documento.convertirAString());
                
                let estadoAnterior = historial.pop();
                documento.reconstruirDesdeString(estadoAnterior);  /*remplazar*/
            }
        }

/*SI DICE REHACER*/
        else if (linea === "REHACER") {
            if (!rehacer.estaVacia()) {
                /* Guarda lo que hay en la mesa dentro de HISTORIAL*/
                historial.push(documento.convertirAString());
                
                let estadoRehecho = rehacer.pop();
                documento.reconstruirDesdeString(estadoRehecho);
            }
        }
    }

} catch (error) {
    console.error("Error al leer el archivo:", error.message);
}