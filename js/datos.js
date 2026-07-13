class Pelicula {
    constructor(imagen, titulo, genero, duracion, edad, descripcion, precio = 15) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.genero = genero;
        this.duracion = duracion;
        this.edad = edad;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

let peliculas = JSON.parse(localStorage.getItem("peliculas"));

if (!peliculas) {

    let pelicula1 = new Pelicula(
        "../img/imagenes de productos cartelera/alien.jpg",
        "Alien: Romulus",
        "Terror",
        "1h 59min",
        "+14",
        "Mientras exploran una estación espacial abandonada, un grupo de colonos se enfrenta a lo desconocido."
    );

    let pelicula2 = new Pelicula(
        "../img/imagenes de productos cartelera/guardianes de la galaxia.webp",
        "Guardianes de la Galaxia",
        "Acción",
        "2h 30min",
        "ATP",
        "El equipo más disparatado de héroes del universo se enfrenta a su mayor reto con emoción y humor."
    );

    let pelicula3 = new Pelicula(
        "../img/imagenes de productos cartelera/scream.jpg",
        "Scream",
        "Terror",
        "1h 54min",
        "+16",
        "Ghostface regresa para aterrorizar a un nuevo grupo de jóvenes en Woodsboro."
    );

    let pelicula4 = new Pelicula(
        "../img/imagenes de productos cartelera/tenet.webp",
        "Tenet",
        "Acción",
        "2h 30min",
        "+14",
        "Un agente secreto recorre el mundo en una misión que trasciende el tiempo."
    );

    let pelicula5 = new Pelicula(
        "../img/imagenes de productos cartelera/minecraft.jpg",
        "Minecraft: La Película",
        "Animación",
        "1h 41min",
        "ATP",
        "Cuatro inadaptados son arrastrados al Overworld."
    );

    let pelicula6 = new Pelicula(
        "../img/imagenes de productos cartelera/thunderbolts.jpg",
        "Thunderbolts*",
        "Acción",
        "2h 07min",
        "+14",
        "Un equipo de antihéroes es reclutado para salvar al mundo."
    ); 

    let pelicula7 = new Pelicula(
        "../img/imagenes de productos cartelera/mision-imposible-8.jpg",
        "Misión: Imposible 8",
        "Acción",
        "2h 49min",
        "+14",
        "Ethan Hunt enfrenta su misión más peligrosa."
    );

    let pelicula8 = new Pelicula(
        "../img/imagenes de productos cartelera/sinners.jpg",
        "Sinners",
        "Terror",
        "2h 17min",
        "+16",
        "Dos hermanos intentan escapar de un oscuro pasado."
    );

    let pelicula9 = new Pelicula(
        "../img/imagenes de productos cartelera/hasta-los-huesos.jpg",
        "Hasta los Huesos",
        "Drama",
        "2h 10min",
        "+16",
        "Una intensa historia de amor y supervivencia."
    );

    let pelicula10 = new Pelicula(
        "../img/imagenes de productos cartelera/el-bufon-2.webp",
        "El Bufón 2",
        "Terror",
        "1h 39min",
        "+16",
        "Una historia llena de misterio y caos."
    );

    let pelicula11 = new Pelicula(
        "../img/imagenes de productos cartelera/barbie.jpg",
        "Barbie",
        "Comedia",
        "1h 54min",
        "ATP",
        "Barbie descubre el mundo real."
    );

    let pelicula12 = new Pelicula(
        "../img/imagenes de productos cartelera/deadpool3.jpg",
        "Deadpool & Wolverine",
        "Comedia",
        "2h 07min",
        "+16",
        "Dos antihéroes unen fuerzas en una aventura absurda."
    );    
    
    let pelicula13 = new Pelicula(
        "../img/imagenes de productos cartelera/mario.jpg",
        "Super Mario Bros",
        "Comedia",
        "1h 32min",
        "ATP",
        "Mario y Luigi viajan al Reino Champiñón."
    );

    let pelicula14 = new Pelicula(
        "../img/imagenes de productos cartelera/sonic3.jpg",
        "Sonic 3",
        "Comedia",
        "1h 49min",
        "ATP",
        "Sonic enfrenta una nueva amenaza."
    );

    let pelicula15 = new Pelicula(
        "../img/imagenes de productos cartelera/frozen2.jpg",
        "Frozen 2",
        "Comedia",
        "1h 43min",
        "ATP",
        "Elsa y Anna descubren el origen de sus poderes."
    );

    let pelicula16 = new Pelicula(
        "../img/imagenes de productos cartelera/intensamente2.jpg",
        "Intensamente 2",
        "Comedia",
        "1h 40min",
        "ATP",
        "Riley enfrenta nuevas emociones."
    );

    let pelicula17 = new Pelicula(
        "../img/imagenes de productos cartelera/elementos.jpg",
        "Elementos",
        "Comedia",
        "1h 42min",
        "ATP",
        "Una joven de fuego y un chico de agua descubren su conexión."
    );

    let pelicula18 = new Pelicula(
        "../img/imagenes de productos cartelera/ted.jpg",
        "Ted",
        "Comedia",
        "1h 46min",
        "+16",
        "Un oso parlante complica la vida de su amigo."
    );    
    
    let pelicula19 = new Pelicula(
        "../img/imagenes de productos cartelera/it.jpg",
        "IT",
        "Terror",
        "2h 15min",
        "+16",
        "Un grupo de niños enfrenta a Pennywise."
    );

    let pelicula20 = new Pelicula(
        "../img/imagenes de productos cartelera/annabelle.jpg",
        "Annabelle",
        "Terror",
        "1h 39min",
        "+16",
        "Una muñeca poseída desata el terror."
    );

    let pelicula21 = new Pelicula(
        "../img/imagenes de productos cartelera/conjuro.jpg",
        "El Conjuro",
        "Terror",
        "1h 52min",
        "+16",
        "Los Warren investigan una presencia demoníaca."
    );

    let pelicula22 = new Pelicula(
        "../img/imagenes de productos cartelera/monja.jpg",
        "La Monja",
        "Terror",
        "1h 36min",
        "+16",
        "Una entidad demoníaca acecha un convento."
    );

    let pelicula23 = new Pelicula(
        "../img/imagenes de productos cartelera/johnwick4.jpg",
        "John Wick 4",
        "Acción",
        "2h 49min",
        "+18",
        "John Wick lucha contra la Alta Mesa."
    );

    let pelicula24 = new Pelicula(
        "../img/imagenes de productos cartelera/batman.jpg",
        "The Batman",
        "Acción",
        "2h 56min",
        "+14",
        "Batman investiga misteriosos asesinatos."
    );    
    
    let pelicula25 = new Pelicula(
        "../img/imagenes de productos cartelera/avatar.jpg",
        "Avatar: El Camino del Agua",
        "Fantasia",
        "3h 12min",
        "+14",
        "Jake Sully enfrenta nuevas amenazas en Pandora."
    );

    let pelicula26 = new Pelicula(
        "../img/imagenes de productos cartelera/duna2.jpg",
        "Duna: Parte 2",
        "Fantasia",
        "2h 46min",
        "+14",
        "Paul Atreides lidera una revolución."
    );

    let pelicula27 = new Pelicula(
        "../img/imagenes de productos cartelera/interstellar.jpg",
        "Interstellar",
        "Suspenso",
        "2h 49min",
        "+14",
        "Astronautas buscan salvar a la humanidad."
    );

    let pelicula28 = new Pelicula(
        "../img/imagenes de productos cartelera/quepasoayer.jpg",
        "¿Qué Pasó Ayer?",
        "Comedia",
        "1h 40min",
        "+16",
        "Tres amigos despiertan sin recordar nada."
    );

    let pelicula29 = new Pelicula(
        "../img/imagenes de productos cartelera/harrypotter.webp",
        "Harry Potter y el Cáliz de Fuego",
        "Fantasia",
        "2h 37min",
        "+14",
        "Harry participa en el Torneo de los Tres Magos."
    );

    let pelicula30 = new Pelicula(
        "../img/imagenes de productos cartelera/titanic.jpg",
        "Titanic",
        "Romantica",
        "3h 14min",
        "+14",
        "Una historia de amor a bordo del Titanic."
    );    
    
        let pelicula31 = new Pelicula(
        "../img/imagenes de productos cartelera/shutterisland.jpg",
        "Shutter Island",
        "Suspenso",
        "2h 18min",
        "+16",
        "Dos agentes investigan una desaparición misteriosa."
    );     


    peliculas = [
        pelicula1,
        pelicula2,
        pelicula3,
        pelicula4,
        pelicula5,
        pelicula6,
        pelicula7,
        pelicula8,
        pelicula9,
        pelicula10,
        pelicula11,
        pelicula12,
        pelicula13,
        pelicula14,
        pelicula15,
        pelicula16,
        pelicula17,
        pelicula18,
        pelicula19,
        pelicula20,
        pelicula21,
        pelicula22,
        pelicula23,
        pelicula24,
        pelicula25,
        pelicula26,
        pelicula27,
        pelicula28,
        pelicula29,
        pelicula30,
        pelicula31
    ];

    localStorage.setItem(
        "peliculas",
        JSON.stringify(peliculas)
    );
}
