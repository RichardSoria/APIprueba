const {performance} = require('perf_hooks') // API de medicion de tiempo y rendimiento, exportada con CommonJS

describe('Prueba de rendimiento - Validacion de Login', ()=>{
    test('Validacion de credenciales', () =>{
        const email = 'user1@gmail.com'
        const password = '123456'

        const memoriaInicial = process.memoryUsage().heapUsed
        const cpuInicial = process.cpuUsage()

        const start = performance.now() // Mide el tiempo en ms durante la ejecucion del codigo

        const autentico = (email === 'user1@gmail.com' && password === '123456')
        const end = performance.now()
        
        const memoriaFinal = process.memoryUsage().heapUsed
        const cpuFinal = process.cpuUsage(cpuInicial)

        const tiempo = end - start
        const tiempoCpuUsado = (cpuFinal.user = cpuFinal.system) / 1000
        const porcentajeCpu = (tiempoCpuUsado / tiempo ) * 100

        console.log(`Tiempo maximo de espera 1000ms\nTiempo de respuesta: ${tiempo} ms`)

        const memoriaUsada = Math.abs(memoriaFinal - memoriaInicial)
        console.log(`Memoria utilizada maxima esperada 1000 KB\nMemoria utilizada: ${memoriaUsada / 1024} KB`)  
    
        console.log(`Porcentaje de uso maximo esperado 15%\nPorcentaje de uso de CPU: ${porcentajeCpu.toFixed(2)}%`);
        
        

        expect(tiempo).toBeLessThan(100) // Define el tiempo maximo esperado de ejecucion del codigo
        expect(autentico).toBe(true) // Expecta que el resultado de la prueba sea verdadero
        expect((memoriaUsada) / 1024).toBeLessThanOrEqual(1000)
        expect(porcentajeCpu).toBeLessThanOrEqual(15)
    })
})