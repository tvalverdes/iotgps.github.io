//let buscar = document.getElementById("buscar");
let latitud //= -8.119526113659344;
let longitud //= -79.0404438275922;
let marker;
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
let map;
let inputLatitud = document.getElementById("latitud");
let inputLongitud = document.getElementById("longitud");

const firebaseConfig = {
  apiKey: "AIzaSyD5XfmpeLm_e9EfxbsmfGDmWIiPKybojrs",
  authDomain: "gps-iot-96f30.firebaseapp.com",
  databaseURL: "https://gps-iot-96f30-default-rtdb.firebaseio.com",
  projectId: "gps-iot-96f30",
  storageBucket: "gps-iot-96f30.appspot.com",
  messagingSenderId: "1079419474982",
  appId: "1:1079419474982:web:1ec1fec93113bd8ca042e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, child, onValue, get }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
const db = getDatabase();

function getData() {
  const dbRef = ref(db);
  get(child(dbRef, "gps")).then((snapshot) => {
    

    let coordenadas = JSON.parse(JSON.stringify(snapshot));
    const nuevaLatitud = coordenadas.latitude;
    const nuevaLongitud = coordenadas.longitude;

    if (nuevaLatitud === latitud && nuevaLongitud === longitud) {
      console.log("Las coordenadas no han cambiado");
      return;
    }
    if (map != undefined) {
      map.remove();
    }

    latitud = nuevaLatitud;
    longitud = nuevaLongitud;
    inputLatitud.placeholder = latitud;
    inputLongitud.placeholder = longitud;
    console.log(latitud);
    console.log(longitud);

    map = L.map("map", { zoomControl: false }).setView([latitud, longitud], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    marker = L.marker([latitud, longitud]).addTo(map);

    L.control
      .zoom({
        position: "bottomright",
        setZoom: 20,
      })
      .addTo(map);

    map.setView([latitud, longitud], 16);

    map.removeLayer(marker);
    marker = L.marker([latitud, longitud]).addTo(map);
    map.invalidateSize();
  });
}

window.onload = getData;
setInterval(getData, 8000);

   
;

/* buscar.addEventListener("click", () => {
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
}); */
