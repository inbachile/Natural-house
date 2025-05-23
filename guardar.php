<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Obtener los datos enviados
$data = file_get_contents("php://input");

// Validar y decodificar
$butacas = json_decode($data, true);

if (is_array($butacas)) {
    // Guardar en el archivo
    $guardado = file_put_contents("butacas.json", json_encode($butacas, JSON_PRETTY_PRINT));

    if ($guardado !== false) {
        echo "✅ Butacas actualizadas correctamente.";
    } else {
        echo "❌ Error al guardar las butacas.";
    }
} else {
    echo "❌ Formato de datos inválido.";
}
?>
