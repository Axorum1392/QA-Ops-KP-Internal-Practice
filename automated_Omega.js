// simulated-tests.js
const args = process.argv.slice(2);
const blockToRun = args[0]; // Captura el argumento enviado por GitHub Actions

const tests = [
    { id: 1, block: "bloque1", name: "Verificar conexión con la Base de Datos" },
    { id: 2, block: "bloque1", name: "Validar autenticación de usuarios de prueba" },
    { id: 3, block: "bloque2", name: "Comprobar tiempo de respuesta de la API (< 200ms)" },
    { id: 4, block: "bloque2", name: "Validar esquema de datos de la respuesta" },
    { id: 5, block: "bloque3", name: "Verificar carga de archivos adjuntos" }
];

console.log(`=== INICIANDO: ${blockToRun?.toUpperCase() || "TODOS LOS BLOQUES"} ===\n`);

// Filtrar los tests si se pasó un argumento válido, si no, corre todos
const testsToRun = tests.filter(t => !blockToRun || t.block === blockToRun);

if (testsToRun.length === 0) {
    console.error(`[ERROR] No se encontraron pruebas para el bloque: ${blockToRun}`);
    process.exit(400);
}

let exitCode = 1; 

testsToRun.forEach((test) => {
    console.log(`[TEST] Ejecutando: ${test.name}...`);
    
    // Mantenemos que el Test #3 (que pertenece al bloque2) sea el que falle
    if (test.id === 3) {
        console.error(`[ERROR] ❌ Test #${test.id} FALLIDO`);
        console.error(`[LOG] Error 400: Bad Request - El servidor tardó 450ms en responder.`);
        console.error(`[LOG] Detalles: Se superó el umbral máximo permitido de 200ms.\n`);
        exitCode = 400; 
    } else {
        console.log(`[INFO] Logs: Operación ejecutada y parámetros validados correctamente.`);
        console.log(`[OK]   ✅ Test #${test.id} PASADO (Código 1)\n`);
    }
});

console.log(`=== RESUMEN DE ${blockToRun?.toUpperCase()} ===`);
if (exitCode === 400) {
    console.error(`Resultado: El ${blockToRun} ha fallado debido a errores detectados.`);
    process.exit(400); 
} else {
    console.log(`Resultado: Todas las pruebas del ${blockToRun} pasaron exitosamente.`);
    process.exit(0); 
}