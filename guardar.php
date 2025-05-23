<?php
$data = file_get_contents("php://input");
file_put_contents("butacas.json", $data);
echo "Butacas actualizadas correctamente.";
?>