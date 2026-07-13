document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        let encontrados = 0;
        document.querySelectorAll(".card2").forEach(card => {
            const titulo = card.querySelector(".card-title")
                .textContent
                .toLowerCase();

            const busqueda = e.target.value.toLowerCase();

            if (titulo.includes(busqueda)) {
                card.classList.remove("filtro");
                encontrados++;
            } else {
                card.classList.add("filtro");
            }
        });
        const mensaje = document.getElementById("mensaje");
        
        if (encontrados === 0) {
            mensaje.classList.remove("mensajeFiltro")    
            mensaje.textContent = "No se encontraron resultados.";
        } else {
            mensaje.classList.add("mensajeFiltro")
            mensaje.textContent = "";
        }
    }
});

const contenedor = document.getElementById("peliculas-grid");


if(contenedor){
peliculas.forEach(pelicula => {
    contenedor.innerHTML += `
    <div class="card2">
        <button class="boton-invisible" onclick="agregarCarrito('${pelicula.titulo}')"> 
        Comprar 
        </button>

        <img src="${pelicula.imagen}" 
             class="card-img-top"
             alt="${pelicula.titulo}">

        <div class="card-body">

            <h5 class="card-title">${pelicula.titulo}</h5>

            <div class="pelicula-meta">
                <span class="genero">${pelicula.genero}</span>
                <span>•</span>
                <span>${pelicula.duracion}</span>
                <span>•</span>
                <span class="edad">${pelicula.edad}</span>
            </div>

            <p class="card-text">${pelicula.descripcion}</p>

        </div>
    </div>
    `;
});
}


const categorias = document.querySelectorAll(".option input");

categorias.forEach(categoria => {

    categoria.addEventListener("change", () => {

        const categoriaSeleccionada = categoria.value.toLowerCase();

        document.querySelectorAll(".card2").forEach(card => {

            const genero = card.querySelector(".genero")
                .textContent
                .toLowerCase();

            if (categoriaSeleccionada === "todos") {

                card.classList.remove("filtro");

            } else if (genero.includes(categoriaSeleccionada)) {

                card.classList.remove("filtro");

            } else {

                card.classList.add("filtro");

            }

        });

    });

});
const checkboxes = document.querySelectorAll(".filtro-categoria");

checkboxes.forEach(check => {
    check.addEventListener("change", () => {

        const categoriasSeleccionadas = [];

        checkboxes.forEach(categoria => {
            if (categoria.checked) {
                categoriasSeleccionadas.push(
                    categoria.value.toLowerCase()
                );
            }
        });

        document.querySelectorAll(".card2").forEach(card => {

            const genero = card.querySelector(".genero")
                                .textContent
                                .toLowerCase();

            if (categoriasSeleccionadas.length === 0) {
                card.classList.remove("filtro");
            }

            else if (
                categoriasSeleccionadas.some(cat =>
                    genero.includes(cat)
                )
            ) {
                card.classList.remove("filtro");
            }

            else {
                card.classList.add("filtro");
            }

        });

    });
});