// Obtener personaje de la API de Rick and Morty
async function obtenerPersonaje() {
    const id = Math.floor(Math.random() * 826) + 1;
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const personaje = await respuesta.json();
    mostrarPersonaje(personaje);
}

// Muestra el personaje
function mostrarPersonaje(personaje) {
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = `
        <div class="character">
            <img src="${personaje.image}" alt="${personaje.name}">
            <h2>${personaje.name}</h2>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Origen:</strong> ${personaje.origin.name}</p>
            <p><strong>Estado:</strong> ${personaje.status}</p>
        </div>
    `;
}

// Asignar el evento al botón después de cargar el DOM
document.getElementById('obtener-personaje').addEventListener('click', obtenerPersonaje);

obtenerPersonaje();