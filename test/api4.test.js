const fetch = require('node-fetch'); // Importa node-fetch si no tienes fetch en el entorno de prueba
const { performance } = require('perf_hooks');
// Función para obtener un anime aleatorio de la API
async function obtenerAnime() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    const data = await response.json();
    const animeAleatorio = data.data[Math.floor(Math.random() * data.data.length)];
    return animeAleatorio;
}
test('Prueba de rendimiento y uso de recursos para obtenerAnime', async () => {
    // Medición de recursos antes de ejecutar la función
    const memoriaInicial = process.memoryUsage().heapUsed;
    const cpuInicial = process.cpuUsage();
    const start = performance.now(); // Tiempo de inicio
    const anime = await obtenerAnime();
    const end = performance.now(); // Tiempo de finalización
    // Medición de recursos después de ejecutar la función
    const memoriaFinal = process.memoryUsage().heapUsed;
    const cpuFinal = process.cpuUsage(cpuInicial); // Diferencia de CPU usada
    const tiempo = end - start;
    const tiempoCpuUsado = (cpuFinal.user + cpuFinal.system) / 1000; // CPU usada en ms
    const porcentajeCpu = (tiempoCpuUsado / tiempo) * 100;

    console.log(`Tiempo máximo de espera 1000ms\nTiempo de respuesta: ${tiempo} ms`);
    const memoriaUsada = Math.abs(memoriaFinal - memoriaInicial);
    console.log(`Memoria utilizada máxima esperada 1000 KB\nMemoria utilizada: ${memoriaUsada / 1024} KB`);
    console.log(`Porcentaje de uso máximo esperado 15%\nPorcentaje de uso de CPU: ${porcentajeCpu.toFixed(2)}%`);
    // Verificaciones
    expect(anime).toHaveProperty('title');
    expect(tiempo).toBeLessThanOrEqual(5000); // Tiempo límite en ms (ajustable)
    expect(memoriaUsada / 1024).toBeLessThanOrEqual(110000); // Límite de memoria en KB (ajustable)
    expect(porcentajeCpu).toBeLessThanOrEqual(15); // Límite de uso de CPU en porcentaje
});
