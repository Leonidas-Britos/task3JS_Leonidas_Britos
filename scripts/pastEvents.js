let eventos = data.events;
let currentDate = data.currentDate

//fitlo eventos pasados 
function filtrarFecha(eventos) {
  const eventPast = []
  for (evento of eventos) {
    if (currentDate > evento.date) {
      eventPast.push(evento)
    }
  }
  return eventPast;
}

const pastFiltrado = filtrarFecha(data.events);
let fragmento = document.createDocumentFragment();

//generar array con categorias sin repetir
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

//generar el html con los checks por cada categoria
const generarChecksPorCategoria = () => {
  let div = document.querySelector("form.form_check");
  let HTMLchecks = "";
  for (let category of listaCategorias) {
    HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category)}">${category}</label><br>`
  }
  div.innerHTML = HTMLchecks;
}
generarChecksPorCategoria();

//Escucha los cambios en los elementos inputs(checkbox), filtra y muestra ├║nicamente a los checkbox seleccionados.
const escucharyFiltrarCheckBoxes = () => {
  let divChecks = document.querySelectorAll("input[type=checkbox]");
  divChecks.forEach(inputCheck => {
    inputCheck.addEventListener("change", function tarjetaSeleccionada() {
      let ArrInputsChecked = [];
      divChecks.forEach(inputCheck => {
        if (inputCheck.checked) {
          ArrInputsChecked.push(inputCheck.value);
        }
      });
      if (ArrInputsChecked.length === 0) {
        imprimirCards(pastFiltrado, '.cards_pastEvents')
      }else {
        let categoriasSeleccionadas = pastFiltrado.filter(evento => ArrInputsChecked.includes(evento.category));
        imprimirCards(categoriasSeleccionadas, '.cards_pastEvents');
      }
    });
  });
}

//Imprime las cards, hay que pasarle por parametro el array que se quiere filtrar y el contenedor donde se lo quiere colocar en el html
function imprimirCards(arrayAfiltrar, contenedorHtml) {
  let contenedorCards = document.querySelector(contenedorHtml);
  contenedorCards.innerHTML = "";
  arrayAfiltrar.forEach(elementObject => {
    contenedorCards.innerHTML += `
      <div class="tarjeta">
      <img class="tarjeta-imagen" src="${elementObject.image}" alt="imagen de la card">
        <div class="tarjeta-cuerpo">
          <h5 class="tarjeta-titulo">${elementObject.name}</h5>
          <p class="tarjeta-texto">${elementObject.description}</p>
        </div>
        <div class="tarjeta-elementos">
          <p class="tarjeta-precio">Price: $${elementObject.price}</p>
          <a class="tarjeta-boton" href="./details.html?id=${elementObject._id}">View more</a>
        </div>
    </div>`;
  });
}
escucharyFiltrarCheckBoxes();
imprimirCards(pastFiltrado, '.cards_pastEvents');

//Busqueda por nombre y coincidencia titulo y descripcion
const busquedaPorNombreyCoincidencia = () => {
  let form = document.getElementById('form_searchId');
  let input = document.getElementById('inputBusqueda');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const busqueda = input.value.toLowerCase().trim();
    const coincidencias = pastFiltrado.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda)
    );
    imprimirCards(coincidencias, '.cards_pastEvents');
    if (coincidencias == false) {
      pastFiltrado.filter(evento => !evento.name.toLowerCase().includes(busqueda) || !evento.description.toLowerCase().includes(busqueda)
    );
    imprimirCards(coincidencias, '.cards_pastEvents');
    let mensajeErrorFiltros = document.querySelector('.cards_pastEvents');
    mensajeErrorFiltros.innerHTML = "";
    mensajeErrorFiltros.innerHTML += `
      <div class="mensaje_error_filtros">
          <h5>┬íATENCI├ôN!</h5>
          <p>┬íNo se han encontrado resultados, intente probando con otra combinaci├│n de filtros!</p>
      </div>
      `
    }
  });
};

busquedaPorNombreyCoincidencia();