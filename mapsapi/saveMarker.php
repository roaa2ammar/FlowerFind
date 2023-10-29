<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lat = $_POST["lat"];
    $lng = $_POST["lng"];

    $file = fopen("mapsapi/markers.txt", "a");
    fwrite($file, "Latitude: $lat, Longitude: $lng\n");
    fclose($file);
}
?>

