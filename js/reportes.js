function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "../cine_perú/index.html";
}

function getPeliculas() {
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    if (Array.isArray(peliculas) && peliculas.length > 0) {
        return peliculas;
    }
    return [
        { titulo: "Inception", genero: "Acción" },
        { titulo: "Interstellar", genero: "Drama" },
        { titulo: "The Dark Knight", genero: "Acción" },
        { titulo: "The Prestige", genero: "Suspenso" },
        { titulo: "The Batman", genero: "Acción" },
        { titulo: "Scream", genero: "Terror" },
        { titulo: "Barbie", genero: "Comedia" }
    ];
}

function renderBarChart(items) {
    const barChart = document.getElementById("bar-chart");
    const maxValue = Math.max(...items.map(item => item.visitas));
    barChart.innerHTML = items.map((item, index) => {
        return `
            <div class="bar-item">
                <div class="bar-column">
                    <strong>${item.visitas}k</strong>
                    <svg class="bar-graphic" viewBox="0 0 100 ${maxValue}" preserveAspectRatio="none" aria-hidden="true">
                        <rect class="bar-fill bar-color-${index}" x="0" y="${maxValue - item.visitas}" width="100" height="${item.visitas}"></rect>
                    </svg>
                </div>
                <span class="bar-title">${item.titulo}</span>
            </div>
        `;
    }).join("");
}

function renderDonutChart(data) {
    const donutChart = document.getElementById("donut-chart");
    const legend = document.getElementById("genre-legend");
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let current = 0;
    const segments = data.map((item, index) => {
        const percent = (item.count / total) * 100;
        const segment = `
            <circle class="donut-segment chart-color-${index}"
                cx="50" cy="50" r="38" pathLength="100"
                stroke-dasharray="${percent} ${100 - percent}"
                stroke-dashoffset="${-current}"></circle>
        `;
        current += percent;
        return segment;
    }).join("");
    donutChart.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${segments}</svg>`;
    legend.innerHTML = data.map((item, index) => {
        return `
            <div class="legend-item">
                <span class="legend-dot chart-bg-${index}"></span>
                <div>
                    <span>${item.genero}</span>
                    <small>${item.percent}%</small>
                </div>
            </div>
        `;
    }).join("");
}

function initReportes() {
    const peliculas = getPeliculas();
    const topPeliculasMensual = peliculas
        .map((p, index) => ({
            titulo: p.titulo,
            // Valor demostrativo estable mientras el proyecto no guarde reproducciones.
            visitas: 50 + ((p.titulo.length * 7 + index * 11) % 43)
        }))
        .sort((a, b) => b.visitas - a.visitas)
        .slice(0, 5);

    function cambiarPeriodo(periodo) {
        const configuracion = {
            semanal: { factor: 0.25, texto: "Semanal" },
            mensual: { factor: 1, texto: "Mensual" },
            anual: { factor: 12, texto: "Anual" }
        };
        const opcion = configuracion[periodo] || configuracion.mensual;
        const datosPeriodo = topPeliculasMensual.map(pelicula => ({
            ...pelicula,
            visitas: Math.round(pelicula.visitas * opcion.factor)
        }));

        renderBarChart(datosPeriodo);
        document.getElementById("periodo-texto").textContent = opcion.texto;
    }

    const genreCounts = peliculas.reduce((acc, pelicula) => {
        const genero = pelicula.genero || "Sin género";
        acc[genero] = (acc[genero] || 0) + 1;
        return acc;
    }, {});

    const generosOrdenados = Object.entries(genreCounts)
        .map(([genero, count]) => ({ genero, count }))
        .sort((a, b) => b.count - a.count);

    // Para que el reporte sea legible, se muestran los 3 géneros principales.
    // Las categorías restantes se conservan agrupadas como "Otros".
    const genreData = generosOrdenados.slice(0, 3);
    const cantidadOtros = generosOrdenados
        .slice(3)
        .reduce((total, genero) => total + genero.count, 0);

    if (cantidadOtros > 0) {
        genreData.push({ genero: "Otros", count: cantidadOtros });
    }

    genreData.forEach(genero => {
        genero.percent = Math.round((genero.count / peliculas.length) * 100);
    });

    cambiarPeriodo("mensual");
    renderDonutChart(genreData);

    document.getElementById("periodo").addEventListener("change", function () {
        cambiarPeriodo(this.value);
    });
}

window.addEventListener("DOMContentLoaded", initReportes);
