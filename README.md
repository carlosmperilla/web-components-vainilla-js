# web-components-vainilla-js
Implementando los Web Components nativos.
## Ventajas
- Son componentes nativos, por lo tanto, pueden integrarse con cualquier otra tecnología web, ya sea librería o framework. Sin incompatibilidad.
- Encapsulan estructuras, estilos y comportamientos por componentes, dando una reusabilidad importante.
- Alta personalización mediante atributos.
## Desventajas
- Problemas con el SEO: La mayoría de robots leen el codigo html, crudo. Algunos interpretan javascript, pero no todos. Así que algunos Web Components son "invisibles" para los robots.
- Mayor popularidad de framework y librerías (a la fecha 2022): Actualmente es más popular usar frameworks y librerías, Angular, React, Vue, etc. Porque además de integrar componentes, poseen características en el performance e implementación más potentes.
## Estrategias para suplir las desventajas
- Para lidiar con el SEO:
  - Se puede hacer SSR (Server Side Rendering), para construir el esqueleto base, con el contenido legible en html, y luego hacer un cambio entre este elemento y su web-component de forma asíncrona.
  - Solo usar web-components para elementos con información no tan relevante para navegadores, por ejemplo, un botón de modo-oscuro/modo-claro no requiere ser SEO Friendly.
  - Recomendación: Integrar con otros framework y encargarse de la renderización intermedia. Tomando en cuenta los anteriores consejos.
## Componentes de terceros
https://www.webcomponents.org/
