class productCard extends HTMLElement {
    constructor(){
        super(); // Preservamos la construcción de la clase padre.
        this.attachShadow({ mode : 'open'}); // Permite que se pueda acceder desde el javascript externo. Nos otorga flexibilidad.
        this.wasCreated = false;
    }
    static get observedAttributes(){
        // Aqui definimos los atributos a observar.
        return ["img", "title", "price", "description", "collection"];
    }
    attributeChangedCallback(attr, oldVal, newVal){
        //Se llama cuando ocurren cambios, como inicializaciones, cambios y eliminación.

        // Para evitar que se llame infinitamente la función, cuando no es necesario.
        if (oldVal === newVal) return null;

        // Si cambia algun atributo le asigna el nuevo valor.
        // Principalmente cuando se quiere alguna asignación de valores iniciales.
        if (attr === "img") this.img = newVal;
        if (attr === "title") this.title = newVal;
        if (attr === "price") this.price = newVal;
        if (attr === "description") this.description = newVal;
        if (attr === "collection") this.collection = newVal;

        // Si ya fue creado el elemento lo actualiza.
        if (this.wasCreated) this.update();

    }
    getTemplate(){
        // Generamnos el template del componente y lo retornamos.
        const template = document.createElement("template");
        template.innerHTML = `
            <main class="container">
                <section class="imgBox">
                    <img src="${this.img}" alt="Zapatos deportivos para correr color azul"/>
                </section>
                <section class="details">
                    <div class="content">
                        <h2>${this.title} <span>${this.collection}</span></h2>
                        <p>${this.description}</p>
                        <h3>${this.price}</h3>
                        <button>Comprar</button
                    </dv>
                </section>
            </main>
            ${this.getStyles}
        `;
        return template;
    }
    getStyles() {
        // Retornamos los estilos internos.
        // :host maneja los estilos encapsulados, es como un :root personalizado.
        // Si en los estilos generales se modifica --primary-background en el componente
        // Estos modificaran a --primary-background establecido por defecto en :host.
        // Así podemos comunicar estilos encapsulados, con los estilos globales.
        return `
          <style>
          :host {
            --primary-background: #5a6cb2;
              width: 80%;
              max-width: 900px;
              min-width: 280px;
              margin: 0 auto;
          }
          .container {
              position: relative;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              width: 900px;
              height: 600px;
              margin: 20px;
              background-color: #fff;
          }
          .container .imgBox {
              position: relative;
              display: flex;
              justify-content: center;
              width: 50%;
              height: 100%;
              background-color: var(--primary-background)
          }
          .container .imgBox:before {
              position: absolute;
              top: 20px;
              left: 20px;
              font-size: 8em;
              font-weight: 800;
              color: #000;
              content: 'Nike';
              opacity: 0.1;
          }
          .container .imgBox img {
              position: relative;
              top: 100px;
              left: -50px;
              width: 720px;
              height: 480px;
              transform: rotate(-30deg);
          }
          .container .details {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50%;
              height: 100%;
              box-sizing: border-box;
              padding: 40px;
          }
          .container .details h2 {
              margin-bottom: 25px;
              font-size: 2.5em;
              line-height: 0.8em;
              color: #444;
          }
          .container .details h2 span {
              font-size: 0.4em;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #999;
          }
          .container .details p {
              max-width: 85%;
              margin-left: 15%;
              margin-bottom: 35px;
              color: #333;
              font-size: 15px;
          }
          .container .details h3 {
              float: left;
              font-size: 2.5em;
              color: #a2a2a2;
          }
          .container .details button {
              margin-top: 35px;
              float: right;
              padding: 15px 20px;
              font-size: 16px;
              color: #fff;
              letter-spacing: 1px;
              font-weight: 600;
              text-transform: uppercase;
              border-radius: 40px;
              background-color: #5a6cb2;
              cursor: pointer;
          }
          @media (max-width: 1080px) {
              .container {
                  height: auto;
                  width: auto;
              }
              .container .imgBox {
                  padding: 40px;
                  width: 100%;
                  box-sizing: border-box;
                  height: auto;
                  text-align: center;
              }
              .container .imgBox img {
                  left: initial;
                  width: 100%;
                  height: auto;
                  transform: rotate(0deg);
              }
              .container .details {
                  width: 100%;
                  height: auto;
                  padding: 20px;
              }
              .container .details p {
                  max-width: 100%;
                  margin-left: 0;
              }
          }
          </style>
        `;
    }
    clean() {
        // Eliminamos el template previo, si ya fue añadido.
        if (this.shadowRoot.hasChildNodes()) this.shadowRoot.replaceChildren();
    }
    render() {
        // Añadimos el template con sus variables.
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    update() {
        // Limpiamos el componente y lo volvemos a renderizar.
        // Para que renderice con las variables actualizadas.
        this.clean();
        this.render();
    }
    connectedCallback() {
        // Se activa al crearse el web-component.
        this.wasCreated=true;
    }
}

// Definimos el web-component para identificarlo con la etiquete <product-card></product>
customElements.define("product-card", productCard)

// Para modificar un atributo es necesario seleccionar el componente y usar setAttribute.
// Ejemplo: componente.setAttribute('price', '$400 USD')