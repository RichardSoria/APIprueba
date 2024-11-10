// Obtiene un anime aleatorio de la API y lo muestra
async function obtenerAnime() {
    try {
        const respuesta = await fetch('https://api.jikan.moe/v4/top/anime'); // Solicita datos a la API
        const datos = await respuesta.json(); // Convierte la respuesta a JSON
        const animeAleatorio = datos.data[Math.floor(Math.random() * datos.data.length)]; // Selecciona un anime aleatorio

        mostrarAnime(animeAleatorio); // Muestra el anime
    } catch (error) {
        console.error("Error al obtener datos de Jikan API:", error); // Manejo de errores
    }
}

// Inserta la información del anime en el HTML
function mostrarAnime(anime) {
    const contenedor = document.getElementById('resultado');
    const imagen = anime.images.jpg.image_url || 'https://via.placeholder.com/300x300.png?text=No+Image'; // Verifica la imagen

    contenedor.innerHTML = `
        <div class="anime">
            <img src="${imagen}" alt="${anime.title}">
            <h2>${anime.title}</h2>
            <p><strong>Tipo:</strong> ${anime.type}</p>
            <p><strong>Género:</strong> ${anime.genres.map(g => g.name).join(', ')}</p>
            <p><strong>Ranking:</strong> ${anime.rank}</p>
        </div>
    `;
}

// Evento para mostrar un nuevo anime al hacer clic
document.getElementById('obtener-anime').addEventListener('click', obtenerAnime);

// Muestra un anime inicial al cargar la página
obtenerAnime();
