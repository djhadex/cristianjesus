document.addEventListener('DOMContentLoaded', function() {
  const empresaLocation = [40.4168, -3.7038]; // Coordenadas de Madrid (ejemplo)
  
  const map = L.map('map').setView(empresaLocation, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker(empresaLocation).addTo(map);

  marker.bindPopup("<h3>Nuestra Empresa</h3><p>Calle Ejemplo, 123, 28001 Madrid</p><p>Tel: +34 912 345 678</p>").openPopup();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        calcularRuta(userLocation, empresaLocation);
      },
      () => {
        console.log("Error: The Geolocation service failed.");
      }
    );
  } else {
    console.log("Error: Your browser doesn't support geolocation.");
  }

  function calcularRuta(start, end) {
    L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      routeWhileDragging: true
    }).addTo(map);
  }
});