# encuestas
Plantilla para usar el webservice de encuestas

Esta plantilla permite utilizar el webservice de encuestas.

Para crear una encuesta se crea un documento HTML tal como en index.html.

Se pueden agregar tantas preguntas y respuestas como se desee, al finalizar la
encuesta los datos serán enviados al webservice quien los almacenará y devolve-
rá como respuesta el total de las votaciones en formato json.

En este ejemplo estamos usando jquery para el envío de datos y controlar las 
animaciones, y Chart.js para desplegar gráficos.

El campo oculto "encuesta" define el namespace de las votaciones para separar 
una encuesta de otra, este valor debe ser único para cada encuesta.
