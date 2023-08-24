$(document).ready(function () {
  // URL del API que devuelve la información de los servicios
  const apiUrl = "https://uniclima-be-74r2-dev.fl0.io/api/service";

  // Hacer la solicitud AJAX al API
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {

      if (data) {

        const services = $("#services");

        // Iterar sobre cada objeto en el array 'data'
        data.data.forEach(function (service) {

          const id = service._id;
          const name = service.name;

          // Se comprueba que price no este vacío y luego se convierte a float para aplicarle el formato de moneda local
          const price = service.price === "" ? 0 : parseFloat(service.price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }); // Formato de moneda local
          const image = service.images[0];
          const videoUrl = service.video;


          // Realizar acciones con los valores obtenidos
          const serviceHtml = `
                    <div class="col-md-4">
                    <div class="card-box-a card-shadow">
                      <div class="img-box-a">
                        <img src="data:image/png;base64,${image}" alt="" class="img-a img-fluid">
                      </div>
                      <div class="card-overlay">
                        <div class="card-overlay-a-content">
                          <a href="service-single.html?id=${id}" data-id="${id}">
                            <div class="card-header-a">
                              <h2 class="card-title-a">
                                ${name}
                              </h2>
                            </div>
                            <div class="card-body-a">
                              <div class="price-box d-flex">
                                <span class="price-a">Desde ${price}</span>
                              </div>
                              <a href="service-single.html?id=${id}#quote" class="link-a" data-id="${id}">Click aquí para cotizar
                                <span class="bi bi-chevron-right"></span>
                              </a>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>`;

          services.append(serviceHtml);

        });
      } else {
        // Manejar el caso de que no haya propiedades disponibles
        $("#services").html("<p>No hay servicios disponibles en este momento.</p>");
      }
    },
    error: function () {
      // Manejar errores en la solicitud AJAX
      alert("Error al obtener la información de los servicios.\n" + error.message);
      console.log(error);
    }
  });
});

/* ==== Service Single ===== */
$(document).ready(function () {
  // Obtener el valor del parámetro "id" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  // Se comprueba que no sea null para que no salte error 500
  if (serviceId) {
    // URL del API para obtener la información del producto por ID
    const apiUrl = `https://uniclima-be-74r2-dev.fl0.io/api/service?_id=${serviceId}`;

    // Hacer la solicitud GET al API
    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (service) {

        if (service) {
          console.log(service);

          const intro = $("#intro-service")
          const carousel = $("#service-carousel");
          const serviceSingle = $("#service-single");
          const serviceVideo = $("#service-video");

          const id = service.data[0]._id;
          const name = service.data[0].name;
          const description = service.data[0].description;

          // Se comprueba que price no este vacío y luego se convierte a float para aplicarle el formato de moneda local
          const price = service.data[0].price === "" ? 0 : parseFloat(service.data[0].price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }); // Formato de moneda local
          const images = service.data[0].images;
          const videoUrl = service.data[0].video;

          serviceVideo.attr('src', videoUrl);

          const introHtml = `
                      <div class="col-md-12 col-lg-8">
                      <div class="title-single-box">
                        <h1 class="title-single">${name}</h1>
                        <span class="color-text-a">Servicio</span>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-4">
                      <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <a href="index.html">Inicio</a>
                          </li>
                          <li class="breadcrumb-item">
                            <a href="service-grid.html">Servicios</a>
                          </li>
                          <li class="breadcrumb-item active" aria-current="page">
                          ${name}
                          </li>
                        </ol>
                      </nav>
                    </div>
                      `;

          // Insertar el contenido de 'introHtml' en 'intro'
          intro.html(introHtml);


          images.forEach(function (image) {
            const carouselItemHtml = `
            <div class="carousel-item-b swiper-slide d-flex justify-content-center align-items-center text-center">
            <div class="card-box-a">
              <div class="img-box-a d-flex justify-content-center align-items-center text-center">
                <img src="data:image/png;base64,${image}" alt="" class="img-a img-fluid" height="700px" width="700px">
              </div>
            </div>
          </div>
          <!-- End carousel item -->
`;

            // Agregar el elemento al carrusel
            carousel.append(carouselItemHtml);

          });

          const serviceHtml = `
                      <div class="property-price d-flex justify-content-center foo">
                    <div class="card-header-c d-flex">
                      <div class="card-box-ico">
                        <span class="bi bi-cash"></span>
                      </div>
                      <div class="card-title-c align-self-center">
                        <h5 class="title-c">Desde ${price}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="property-summary">
                    <div class="summary-list">
                      <ul class="list">
                        <li class="d-flex flex-column text-justified">
                          <strong>Descripción:</strong>
                          <span>${description}</span>
                          <strong>--PRECIOS MÁS IMPUESTO DE VENTAS-- <br/>
                          Este documento no tiene valor comercial. Precios
                          sujetos a cambios sin previo aviso.</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                  `;

          // Insertar el contenido de 'productHtml' en 'productSingle'
          serviceSingle.html(serviceHtml);

        }
      },
      error: function () {
        alert("Error al obtener la información del producto.\n" + error.message);
        console.log(error);
      }
    });
  }
});