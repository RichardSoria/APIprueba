// Obtiene una película aleatoria de la API y la muestra
async function obtenerPelicula() {
    try {
        const respuesta = await fetch("https://moviesapi.ir/api/v1/movies"); // Solicita datos a la API
        const datos = await respuesta.json(); // Convierte la respuesta a JSON
        const peliculas = datos.data;
        const peliculaAleatoria = peliculas[Math.floor(Math.random() * peliculas.length)];
        
        mostrarPelicula(peliculaAleatoria); // Muestra una película aleatoria
    } catch (error) {
        console.error("Error al obtener datos de la API de Películas:", error); // Manejo de errores
    }
}

// Inserta la información de la película en el HTML
function mostrarPelicula(pelicula) {
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = `
        <div class="movie">
            <img src="${pelicula.poster}" alt="${pelicula.title}">
            <h2>${pelicula.title}</h2>
            <p><strong>Calificación:</strong> ${pelicula.imdb_rating || "N/A"}</p>
            <p><strong>Año:</strong> ${pelicula.year}</p>
            <p><strong>Género:</strong> ${pelicula.genres.join(", ") || "No disponible"}</p>
        </div>
    `;
}

// Evento para mostrar una nueva película al hacer clic
document.getElementById('obtener-pelicula').addEventListener('click', obtenerPelicula);

// Muestra una película inicial al cargar la página
obtenerPelicula();
