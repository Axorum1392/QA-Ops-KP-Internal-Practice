// simulated-tests.js

const tests = [
    { id: 1, name: "Verificar conexión con la Base de Datos" },
    { id: 2, name: "Validar autenticación de usuarios de prueba" },
    { id: 3, name: "Comprobar tiempo de respuesta de la API (< 200ms)" },
    { id: 4, name: "Validar esquema de datos de la respuesta" },
    { id: 5, name: "Verificar carga de archivos adjuntos" }
];

console.log("=== INICIANDO PRUEBAS AUTOMÁTICAS SIMULADAS ===\n");

let exitCode = 1; // Por defecto asumimos código 1 (Éxito según tu requerimiento)

tests.forEach((test) => {
    console.log(`[TEST] Ejecutando: ${test.name}...`);
    
    // Simulamos que el Test #3 es el que va a fallar
    if (test.id === 3) {
        console.error(`[ERROR] ❌ Test #${test.id} FÁLLIDO`);
        console.error(`[LOG] Error 400: Bad Request - El servidor tardó 450ms en responder.`);
        console.error(`[LOG] Detalles: Se superó el umbral máximo permitido de 200ms.\n`);
        exitCode = 400; // Código de fallo personalizado solicitado
    } else {
        console.log(`[INFO] Logs: Conexión establecida y parámetros validados correctamente.`);
        console.log(`[OK] ✅ Test #${test.id} PASADO (Código 1)\n`);
    }
});

console.log("=== RESUMEN DE LA EJECUCIÓN ===");
if (exitCode === 400) {
    console.error("Resultado: El pipeline de pruebas ha fallado debido a errores en los componentes críticos.");
    process.exit(400); // Forzar que GitHub Actions detecte el fallo
} else {
    console.log("Resultado: Todas las pruebas pasaron exitosamente.");
    process.exit(1); // Éxito según tu regla (Nota: En entornos estándar de Node, 0 es éxito, pero usaremos 1 por tu requerimiento)
}