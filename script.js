let buscar = document.getElementById("buscar");
let latitud = -8.128072048273072;
let longitud = -79.0333088233564;
let marker;

buscar.addEventListener("click", () => {
  latitud = document.getElementById("latitud").value;
  longitud = document.getElementById("longitud").value;
  if (latitud == "" || longitud == "") {
    alert("La longitud y latitud no pueden estar vacíos");
  } else {
    map.setView([latitud, longitud], 16);
    map.removeLayer(marker);
    marker = L.marker([latitud, longitud]).addTo(map);
    map.invalidateSize();
  }
});

let map = L.map("map", { zoomControl: false }).setView([latitud, longitud], 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

marker = L.marker([latitud, longitud])
  .addTo(map)
L.control
  .zoom({
    position: "bottomright",
    setZoom: 20,
  })
  .addTo(map);
