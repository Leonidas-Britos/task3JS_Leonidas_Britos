let eventos = data.events;


// const homeFiltrado = data.events;

// let fragmento = document.createDocumentFragment();

// const crearObjeto = (homeFiltrado) => {
//     homeFiltrado.forEach(element => {
//         let tarjeta = document.createElement("div");
//         tarjeta.classList.add('tarjeta');
//         let tarjetaImagen = document.createElement("img");
//         tarjetaImagen.classList.add('tarjeta-imagen');
//         tarjetaImagen.src = `${element.image}`;
//         tarjetaImagen.alt = "imagen de la card";
//         let tarjetaCuerpo = document.createElement("div");
//         tarjetaCuerpo.classList.add('tarjeta-cuerpo');
//         let tarjetaTitulo = document.createElement("h5");
//         tarjetaTitulo.classList.add('tarjeta-titulo');
//         tarjetaTitulo.innerText = `${element.name}`;
//         let tarjetaTexto = document.createElement("p");
//         tarjetaTexto.classList.add('tarjeta-texto');
//         tarjetaTexto.innerText = `${element.description}`;
//         let tarjetaElementos = document.createElement("div");
//         tarjetaElementos.classList.add('tarjeta-elementos');
//         let tarjetaPrecio = document.createElement("p");
//         tarjetaPrecio.classList.add('tarjeta-precio');
//         tarjetaPrecio.innerText = `Price: $${element.price}`;
//         let tarjetaBoton = document.createElement("a");
//         tarjetaBoton.classList.add('tarjeta-boton');
//         tarjetaBoton.innerText = "View more";
//         tarjetaBoton.href = "./details.html"
//         tarjeta.appendChild(tarjetaImagen);
//         tarjeta.appendChild(tarjetaCuerpo);
//         tarjeta.appendChild(tarjetaElementos);
//         tarjetaCuerpo.appendChild(tarjetaTitulo);
//         tarjetaCuerpo.appendChild(tarjetaTexto);
//         tarjetaElementos.appendChild(tarjetaPrecio);
//         tarjetaElementos.appendChild(tarjetaBoton);

//         fragmento.appendChild(tarjeta)

//         document.querySelector("div.cards_home").appendChild(fragmento);
//     });
// }
// crearObjeto(homeFiltrado);


function extraerCategorias(eventos) {
    categorias = [];
    eventos.forEach(element => {
    if (!categorias.includes(element.category)) {
        categorias.push(element.category);
    }
});
    return categorias;
}
const listaCategorias = extraerCategorias(eventos);
console.log(listaCategorias);


/*/////////////////////////////*/
let div = document.querySelector("form.form_check");
let HTMLchecks = "";
for (let category of listaCategorias) {
    HTMLchecks += `<label for="${(category.toLowerCase()).replace(/\s+/g, '')}">${category}</label>
    <input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" name="${(category.toLowerCase()).replace(/\s+/g, '')}" value="mus">`
}
div.innerHTML = HTMLchecks;



