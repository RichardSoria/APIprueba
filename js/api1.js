const resultadoDiv = document.getElementById('resultado');

const fetchData = async () => {
    // Limpiar el contenido anterior
    resultadoDiv.textContent = '';
    
    // Mostrar mensaje de carga
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Cargando imagen de un perro...';
    resultadoDiv.appendChild(loadingMessage);

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (data.status === 'success') {
            // Crear y agregar la imagen
            const img = document.createElement('img');
            img.src = data.message;
            img.alt = 'Imagen de un perro';
            img.style.maxWidth = '100%'; // Ajuste opcional para el tamaño de la imagen
            resultadoDiv.appendChild(img);
        } else {
            // Mensaje de error si la API responde con un fallo
            console.error('Error:', data.message);
            resultadoDiv.textContent = 'No se pudo cargar la imagen del perro.';
        }
    } catch (error) {
        // Manejo de errores de red o de solicitud
        console.error('Error:', error);
        resultadoDiv.textContent = 'Error al obtener la imagen del perro.';
    } finally {
        // Remover mensaje de carga
        loadingMessage.remove();
    }
};

// Llamada a la función fetchData
fetchData();