<?php
$markersData = file("mapsapi/markers.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$markers = [];

foreach ($markersData as $marker) {
    list($lat, $lng) = explode(", ", $marker);
    $markers[] = ["lat" => trim(substr($lat, strpos($lat, ":") + 1)), "lng" => trim(substr($lng, strpos($lng, ":") + 1))];
}

header("Content-Type: application/json");
echo json_encode($markers);
?>
