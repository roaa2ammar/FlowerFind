

//Home page title effect (not working yet)
document.addEventListener("DOMContentLoaded", function(){
    const heading = document.querySelector('.welcome');
    heading.style.color= "black";
    heading.style.transform= "scale(1)";
});

//Drop effect or uploading flowers
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

//Menu open and close
function openNav() {
    document.getElementById("homeSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("homeSidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }