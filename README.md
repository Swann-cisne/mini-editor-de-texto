Mi Editor de Texto
¿De qué sirve este proyecto?
Es un programa súper básico que simula ser un bloc de notas pero desde la terminal. Le pasas un archivo de texto con comandos (como test1.txt) y el código va leyendo línea por línea para ver qué tiene que hacer (si escribir, borrar, buscar cosas, o ir para atrás y para adelante con el deshacer y rehacer).

Lo interesante de este proyecto es que no usar Arrays (arreglos). Así que para guardar las letras y el historial de cambios, arme la lógica desde cero usando Nodos conectados entre sí. Use Listas Enlazadas para lo que se ve en la pantalla y Pilas para controlar los botones de ir al pasado y al futuro.

Cómo hacerlo funcionar paso a paso
Ten tu código listo en el archivo main.js.

En la misma carpeta, crea un bloc de notas llamado test1.txt y ponle comandos adentro (uno por renglón). Por ejemplo:

Plaintext
ESCRIBIR hola profe
MOSTRAR
BORRAR 5
MOSTRAR
Abre la terminal de tu compu justo en esa carpeta.

Escribe esto y dale Enter:
Bash
node main.js test1.txt
TABLA BIG O

[Tabla_Complejidad_Big_O.xlsx](https://github.com/user-attachments/files/29170988/Tabla_Complejidad_Big_O.xlsx)

Video: https://drive.google.com/file/d/1CynsZm-k1Q4shkpUTZ5Mb9ZQjL1cVZLF/view?usp=sharing
