let editando=false;
let idEditar=null;

const contenedor2 = document.getElementById("contenedor-pelis");


if(contenedor2){
peliculas.forEach(pelicula => {
    contenedor2.innerHTML += `
    <div class="item-peli">
        <div class="item-body">
            <h5 class="card-title">${pelicula.titulo}</h5>
                <span class="genero">${pelicula.genero}</span>
                <span>${pelicula.duracion}</span>
                <span>${pelicula.edad}</span>
                <div>
            <button class="btn-editar" onclick="editarPelicula('${pelicula.titulo}')">&#9998;</button>
            <button class="btn-eliminar" onclick="eliminarPelicula('${pelicula.titulo}')" >&#128465;</button>
            </div>
        </div>
    </div>
    `;
});
}

function mostrarProducto(lista){
    let ul = document.getElementById("listaDinamica");
    ul.innerHTML = "";

    let final2 = document.getElementById("contenedor-pelis");
    final2.innerText = "";

    lista.forEach( p=>{
        final2.innerHTML +=      
    `
    <div class="item-peli">
        <div class="item-body">
            <h5 class="card-title">${p.titulo}</h5>
                <span class="genero">${p.genero}</span>
                <span>${p.duracion}</span>
                <span>${p.edad}</span>
                <div>
            <button class="btn-editar" onclick="editar('${p.titulo}')">&#9998;</button>
            <button class="btn-eliminar" onclick="eliminarPelicula('${p.titulo}')">&#128465;</button>
            </div>
        </div>
    </div>
      `
    });

        document.getElementById("msg-total").textContent =
        `Total: ${lista.length}`;
}

function filtrarLista(){
    let texto =  document.getElementById("busqueda2").value.toLowerCase();
    let filtrados = peliculas.filter(p=>
        p.titulo.toLowerCase().includes(texto)
    )
    mostrarProducto(filtrados);
}

function limpiarBusc() {
    document.getElementById("busqueda2").value = "";
    mostrarProducto(peliculas);
}

mostrarProducto(peliculas);

function mostrar(){
    const lista = document.getElementById("contenedor-pelis");
    lista.innerHTML = "";
    peliculas.forEach(p => {

        lista.innerHTML += `
        <div class="item-peli">
            <div class="item-body">
                <span>${p.titulo}</span>
                <span>${p.genero}</span>
                <span>${p.duracion}</span>
                <span>${p.edad}</span>

                <div class="acciones">
                    <button
                        class="btn-editar"
                        onclick="editar('${p.titulo}')">
                        &#9998;
                    </button>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarPelicula('${p.titulo}')">
                        &#128465;
                    </button>
                </div>
            </div>
        </div>
        `;

    });

    console.log("Cantidad:", peliculas.length);

        document.getElementById("msg-total").textContent =
        `Total: ${peliculas.length}`;

}

function registrarPelicula() {

const titulo = document.getElementById("nombre-peli").value;
const genero = document.getElementById("categoria").value;
const duracion = document.getElementById("time-duracion").value;
const edad = document.getElementById("clasificacion").value;
const descripcion = document.getElementById("caja-sinopsis").value;
const archivo = document.getElementById("imagen").files[0];

    if (
        titulo === "" ||
        genero === "" ||
        duracion === "" ||
        edad === "" ||
        descripcion === ""
    ) {
        alert("Completa todos los campos.");
        return;
    }
    if (!archivo && !editando) {
        alert("Seleccione una imagen.");
        return;
    }

    const guardarPelicula = (imagenBase64) => {
        if (editando) {
            peliculas = peliculas.map(p => {
                if (p.titulo === idEditar) {
                    return {
                        titulo,
                        imagen: imagenBase64 || p.imagen,
                        genero,
                        duracion,
                        edad,
                        descripcion
                    };
                }
                return p;
            });
            localStorage.setItem(
                "peliculas",
                JSON.stringify(peliculas)
            );
            editando = false;
            idEditar = null;
        } else {
            let existe = peliculas.some(
                p => p.titulo.toLowerCase() === titulo.toLowerCase()
            );

            if (existe) {
                alert("La película ya existe.");
                return;
            }
         const nueva = new Pelicula(
           imagenBase64,
          titulo,
          genero,
          duracion,
        edad,
       descripcion
          );
            peliculas.push(nueva);

            localStorage.setItem(
                "peliculas",
                JSON.stringify(peliculas)
            );
        }
        limpiar();
        mostrarProducto(peliculas);
        //mostrar();
        console.log(peliculas);
    };
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (e) {
            guardarPelicula(e.target.result);
        };
        lector.readAsDataURL(archivo);
    } else {
        guardarPelicula(null);
    }
}

function editar(titulo){

    const pelicula = peliculas.find(
        p => p.titulo === titulo
    );
    document.getElementById("nombre-peli").value = pelicula.titulo;
    document.getElementById("categoria").value = pelicula.genero;
    document.getElementById("time-duracion").value = pelicula.duracion;
    document.getElementById("clasificacion").value = pelicula.edad;
    document.getElementById("caja-sinopsis").value = pelicula.descripcion;
    document.getElementById("preview-imagen").src =
        pelicula.imagen;
    editando = true;
    idEditar = titulo;
}

function limpiar(){
  document.getElementById("nombre-peli").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("clasificacion").value = "";
  document.getElementById("time-duracion").value = "";
  document.getElementById("caja-sinopsis").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("preview-imagen").src = "";
    editando = false;
    idEditar = null;
}

function eliminarPelicula(titulo){

    peliculas = peliculas.filter(
        pelicula => pelicula.titulo !== titulo
    );
    localStorage.setItem(
        "peliculas",
        JSON.stringify(peliculas)
    );
    mostrarProducto(peliculas);
    //mostrar();
}

document.getElementById("imagen")
.addEventListener("change", function(){
    const archivo = this.files[0];
    if(!archivo) return;
    const lector = new FileReader();
    lector.onload = function(e){
        document.getElementById(
            "preview-imagen"
        ).src = e.target.result;
    };
    lector.readAsDataURL(archivo);
});