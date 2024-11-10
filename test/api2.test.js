const fetch = require('node-fetch') // Importa node-fetch si no tienes fetch en el entorno de prueba
const { performance } = require('perf_hooks')

// Define la función para obtener un personaje aleatorio de la API de Rick and Morty
async function obtenerPersonaje() {
    const id = Math.floor(Math.random() * 826) + 1
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await response.json()
    return data;
}

test('Prueba de rendimiento y uso de recursos para obtenerPersonaje', async () => {
    // Medición de recursos antes de ejecutar la función
    const memoriaInicial = process.memoryUsage().heapUsed
    const cpuInicial = process.cpuUsage()

    const start = performance.now() // Tiempo de inicio
    const personaje = await obtenerPersonaje()
    const end = performance.now() // Tiempo de finalización

    // Medición de recursos después de ejecutar la función
    const memoriaFinal = process.memoryUsage().heapUsed
    const cpuFinal = process.cpuUsage(cpuInicial); // Diferencia de CPU usada

    const tiempo = end - start
    const tiempoCpuUsado = (cpuFinal.user + cpuFinal.system) / 1000 // CPU usada en ms
    const porcentajeCpu = (tiempoCpuUsado / tiempo) * 100

    console.log(`Tiempo maximo de espera 1000ms\nTiempo de respuesta: ${tiempo} ms`)

    const memoriaUsada = Math.abs(memoriaFinal - memoriaInicial)
    console.log(`Memoria utilizada maxima esperada 1000 KB\nMemoria utilizada: ${memoriaUsada / 1024} KB`)  

    console.log(`Porcentaje de uso maximo esperado 15%\nPorcentaje de uso de CPU: ${porcentajeCpu.toFixed(2)}%`);

    // Verificaciones
    expect(personaje).toHaveProperty('name')
    expect(tiempo).toBeLessThanOrEqual(2000); // Tiempo límite en ms (ajustable)
    expect((memoriaUsada) / 1024).toBeLessThanOrEqual(1000) // Límite de memoria en KB (ajustable)
    expect(porcentajeCpu).toBeLessThanOrEqual(15)
});
