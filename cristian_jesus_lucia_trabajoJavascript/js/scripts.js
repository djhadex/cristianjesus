document.addEventListener('DOMContentLoaded', () => {
    const noticiasSection = document.getElementById('noticias');
    const loader = document.getElementById('loader');

    // Cargar el archivo JSON
    fetch('json/noticias.json')
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none'; // Ocultar el mensaje de carga

            // Recorrer las noticias y crear el HTML correspondiente
            data.forEach(noticia => {
                const noticiaDiv = document.createElement('div');
                noticiaDiv.className = 'noticia';

                const titulo = document.createElement('h2');
                titulo.textContent = noticia.titulo;
                noticiaDiv.appendChild(titulo);

                const descripcion = document.createElement('p');
                descripcion.textContent = noticia.descripcion;
                noticiaDiv.appendChild(descripcion);

                const enlace = document.createElement('a');
                enlace.href = noticia.url;
                enlace.textContent = 'Leer más';
                enlace.target = '_blank'; // Abrir enlace en una nueva pestaña
                noticiaDiv.appendChild(enlace);

                noticiasSection.appendChild(noticiaDiv);
            });
        })
        .catch(error => {
            console.error('Error cargando el archivo JSON:', error);
            loader.textContent = 'Error al cargar las noticias.';
        });
});


// Validación de datos de contacto
document.getElementById('presupuestoForm').addEventListener('submit', function(event) {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!/^[a-zA-Z]+$/.test(nombre)) {
        alert('El nombre solo puede contener letras.');
        event.preventDefault();
    }

    if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
        alert('Los apellidos solo pueden contener letras.');
        event.preventDefault();
    }

    if (!/^\d{9}$/.test(telefono)) {
        alert('El teléfono debe tener 9 dígitos numéricos.');
        event.preventDefault();
    }

    if (!emailPattern.test(email)) {
        alert('El correo electrónico no es válido.');
        event.preventDefault();
    }
});

// Cálculo del presupuesto
function calcularPresupuesto() {
    let producto = parseInt(document.getElementById('producto').value);
    let plazo = parseInt(document.getElementById('plazo').value);
    let descuento = plazo > 12 ? 0.9 : 1; // 10% de descuento si el plazo es mayor a 12 meses

    // Aplica un descuento adicional del 10% si la fecha es flexible
    if (document.getElementById('fechaFlexible').checked) {
        descuento *= 0.9; // 10% de descuento adicional
    }

    let extras = 0;

    if (document.getElementById('extra1').checked) {
        extras += parseInt(document.getElementById('extra1').value);
    }
    if (document.getElementById('extra2').checked) {
        extras += parseInt(document.getElementById('extra2').value);
    }
    if (document.getElementById('extra3').checked) {
        extras += parseInt(document.getElementById('extra3').value);
    }

    let total = (producto + extras) * descuento;
    document.getElementById('total').innerText = total.toFixed(2);
}

document.getElementById('producto').addEventListener('change', calcularPresupuesto);
document.getElementById('plazo').addEventListener('input', calcularPresupuesto);
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', calcularPresupuesto);
});

// Inicializar el cálculo al cargar la página
calcularPresupuesto();

