document.addEventListener("DOMContentLoaded", function(){
    const heading = document.querySelector('.welcome');
    heading.style.color= "black";
    heading.style.transform= "scale(1)";
});

document.addEventListener("DOMContentLoaded", function() {
    const dropContainer = document.getElementById("dropContainer");
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");

    dropContainer.addEventListener("dragover", function(e) {
        e.preventDefault();
        dropZone.classList.add('highlight');
    });

    dropContainer.addEventListener("dragleave", function() {
        dropZone.classList.remove('highlight');
    });

    dropContainer.addEventListener("drop", function(e) {
        e.preventDefault();
        dropZone.classList.remove('highlight');

        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        // Handle the dropped or selected files here
        console.log(files);
        // You can add further processing for the files, such as uploading to a server or displaying them on the page.
    }
});

function openNav() {
    document.getElementById("homeSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("homeSidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  //map features:
  var map;
        var markers = [];
        var infowindow;

        function initAutocomplete() {
            map = new google.maps.Map(document.getElementById("googleMap"), {
                center: { lat: -33.8688, lng: 151.2195 },
                zoom: 13,
                mapTypeId: "roadmap",
            });

            infowindow = new google.maps.InfoWindow();

            const input = document.getElementById("pac-input");
            const searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];

                const bounds = new google.maps.LatLngBounds();

                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    markers.push(
                        new google.maps.Marker({
                            map,
                            title: place.name,
                            position: place.geometry.location,
                        })
                    );

                    google.maps.event.addListener(markers[markers.length - 1], "click", function () {
                        infowindow.setContent(place.name);
                        infowindow.open(map, markers[markers.length - 1]);
                    });

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        }

        function myMap() {
            initAutocomplete();

            google.maps.event.addListener(map, "click", function (event) {
                placeMarker(event.latLng);
            });

            
            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                });
                markers.push(marker);
                

                var infowindow = new google.maps.InfoWindow({
                  content: "daisy" +"<br>img"
                });
                    infowindow.open(map, marker);
                
            }
        }

        