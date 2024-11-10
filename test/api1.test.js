const fetch = require('node-fetch') // Importa node-fetch si no tienes fetch en el entorno de prueba
const {performance} = require('perf_hooks')
// Importa la función fetchData o copia el código aquí para ejecutarlo en Jest
async function fetchData() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    return data
}

test('fetchData performance test', async () => {
    const memoriaInicial = process.memoryUsage().heapUsed
    const cpuInicial = process.cpuUsage()

    const start = performance.now() // Tiempo de inicio
    const data = await fetchData()
    const end = performance.now() // Tiempo de finalización

    const memoriaFinal = process.memoryUsage().heapUsed
    const cpuFinal = process.cpuUsage(cpuInicial)

    const tiempo = end - start
    const tiempoCpuUsado = (cpuFinal.user + cpuFinal.system) / 1000 // CPU usada en ms
    const porcentajeCpu = (tiempoCpuUsado / tiempo) * 100

    console.log(`Tiempo maximo de espera 1000ms\nTiempo de respuesta: ${tiempo} ms`)

    const memoriaUsada = Math.abs(memoriaFinal - memoriaInicial)
    console.log(`Memoria utilizada maxima esperada 1000 KB\nMemoria utilizada: ${memoriaUsada / 1024} KB`)  

    console.log(`Porcentaje de uso maximo esperado 15%\nPorcentaje de uso de CPU: ${porcentajeCpu.toFixed(2)}%`);
    

    // Verificar que la solicitud fue exitosa
    expect(data.status).toBe('success')
    // Establecer un umbral para el tiempo de respuesta (por ejemplo, 500 ms)
    expect(tiempo).toBeLessThanOrEqual(1000)
    expect((memoriaUsada) / 1024).toBeLessThanOrEqual(1000)
    expect(porcentajeCpu).toBeLessThanOrEqual(15)
});
