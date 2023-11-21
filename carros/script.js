$(document).ready(function () {
    // Datos de ejemplo (puedes cargarlos desde una API)
    var carros = [
        { marca: "Toyota", modelo: "Camry", año: 2022, precio: 25000, imagen: "media/camry.png", detalles: "Automóvil sedán de alto rendimiento." },
        { marca: "Honda", modelo: "Civic", año: 2021, precio: 22000, imagen: "media/civic.png", detalles: "Compacto y eficiente en combustible." },
        { marca: "Ford", modelo: "Escape", año: 2023, precio: 28000, imagen: "media/scape.png", detalles: "SUV versátil con tecnología avanzada." },
        { marca: "Chevrolet", modelo: "Malibu", año: 2022, precio: 26000, imagen: "media/malibu.png", detalles: "Elegante sedán con comodidades modernas." },
        { marca: "Nissan", modelo: "Rogue", año: 2022, precio: 27000, imagen: "media/rogue.png", detalles: "SUV espacioso y seguro para la familia." },
        { marca: "Hyundai", modelo: "Elantra", año: 2021, precio: 23000, imagen: "media/elantra.png", detalles: "Estilo y rendimiento en un automóvil compacto." },
        { marca: "Volkswagen", modelo: "Jetta", año: 2022, precio: 24000, imagen: "media/jetta.png", detalles: "Diseño elegante y eficiencia en combustible." },
        { marca: "Mazda", modelo: "CX-5", año: 2023, precio: 30000, imagen: "media/cx-5.png", detalles: "SUV deportivo con características de lujo." },
        { marca: "Kia", modelo: "Optima", año: 2022, precio: 25500, imagen: "media/optima.png", detalles: "Elegancia y tecnología en un sedán." },
        { marca: "Subaru", modelo: "Forester", año: 2023, precio: 29000, imagen: "media/forester.png", detalles: "SUV compacto con tracción en las cuatro ruedas." },
        { marca: "Tesla", modelo: "Model 3", año: 2022, precio: 45000, imagen: "media/model3.png", detalles: "Automóvil eléctrico con autonomía avanzada." },
    ];

    // Variable para controlar si se debe mostrar la ventana emergente al cargar la página
    var mostrarAlCargar = false;

    // Función para mostrar detalles de un carro
    function mostrarDetalles(carro) {
        // Utiliza SweetAlert2 para mostrar detalles en una ventana emergente
        Swal.fire({
            title: `${carro.marca} ${carro.modelo}`,
            html: `
                <p><strong>Año:</strong> ${carro.año}</p>
                <p><strong>Precio:</strong> $${carro.precio}</p>
                <p><strong>Detalles:</strong> ${carro.detalles}</p>
            `,
            imageUrl: carro.imagen,
            imageAlt: `${carro.marca} ${carro.modelo}`,
            showCloseButton: true,
            showConfirmButton: false,
        });
    }

    // Función para ocultar detalles
    function ocultarDetalles() {
        var carDetails = $('#car-details');
        carDetails.slideUp();
        // Elimina la clase 'bounce' del botón al cerrar la ventana emergente
        $('.carro button').removeClass('bounce');
    }


    // Función para mostrar carros en la página
    function mostrarCarros(filtro) {
        var carList = $('#car-list');
        carList.empty();

        $.each(carros, function (index, carro) {
            // Aplica el filtro si no es "Todas las Marcas" o si coincide con la marca del carro
            if (filtro === 'todas' || carro.marca === filtro) {
                var carHtml = `
                <div class="carro">
                    <img src="${carro.imagen}" alt="${carro.marca} ${carro.modelo}" data-lightbox="carros">
                    <h3>${carro.marca} ${carro.modelo}</h3>
                    <button class="ver-detalles">Ver Detalles</button>
                </div>
            `;
                carList.append(carHtml);
            }
        });

     // Agrega el evento de clic utilizando delegación de eventos
     carList.on('click', '.ver-detalles', function () {
        var index = $(this).closest('.carro').index();
        mostrarDetalles(carros[index]);

        // Agrega la clase 'bounce' al botón para la animación
        $(this).addClass('bounce');

        // Inicializa lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });

        // Verifica si se debe mostrar la ventana emergente al cargar la página
        if (mostrarAlCargar) {
            // Supongamos que mostramos el primer carro como ejemplo
            mostrarDetalles(carros[0]);
            mostrarAlCargar = false; // Desactiva la flag después de mostrar la ventana emergente
        }
    });
}

    // Escucha el cambio en el menú desplegable de marca
    $('#marcaFiltro').on('change', function () {
        var marcaSeleccionada = $(this).val();
        mostrarCarros(marcaSeleccionada);
    });

    // Llama a la función para mostrar carros al cargar la página
    mostrarCarros('todas');

    Swal.fire({
        didClose: function () {
            ocultarDetalles();
        }
    });
});