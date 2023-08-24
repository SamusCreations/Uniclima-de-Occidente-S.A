$(document).ready(function () {
  // URL del API que devuelve la información de los productos
  const apiUrl = "https://uniclima-be-74r2-dev.fl0.io/api/product";

  // Hacer la solicitud AJAX al API
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {

      if (data) {

        const productsIndex = $("#products-index");
        const products = $("#products");

        // Iterar sobre cada objeto en el array 'data'
        data.data.forEach(function (product) {

          const id = product._id;
          const name = product.name;

          // Se comprueba que capacity no este vacío y luego se convierte en objeto para luego convertirlo en un array de numeros y finalmente obtener el mayor numero
          const capacity = product.capacity[0] === null ? "-" : "Hasta " + Math.max(...product.capacity) + " BTU";
          const type = product.type === "" ? "-" : product.type;

          // Se comprueba que price no este vacío y luego se convierte a float para aplicarle el formato de moneda local
          const price = product.price === "" ? 0 : parseFloat(product.price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }); // Formato de moneda local
          const firstImage = product.images[0]; // Primera imagen

          /* ==== Index ===== */
          if (productsIndex.length !== 0) {

            // Realizar acciones con los valores obtenidos
            const productHtml = `
          <div class="carousel-item-b swiper-slide">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img src="data:image/png;base64,${firstImage}" alt="" class="img-a img-fluid">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <a href="product-single.html?id=${id}" data-id="${id}">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                            ${name}
                          </h2>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">Desde ${price}</span>
                  </div>
                  <a href="product-single.html?id=${id}#quote" class="link-a" data-id="${id}">Click aquí para cotizar
                            <span class="bi bi-chevron-right"></span>
                  </a>
                </div>
              </a>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li>
                      <h4 class="card-info-title">Capacidad</h4>
                      <span>${capacity}</span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Tipo</h4>
                      <span>${type}</span>
                    </li>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End carousel item -->`;

            productsIndex.append(productHtml);

            /* ==== Products Grid ===== */
          } else if (products.length !== 0) {
            const productHtml = `
            <div class="col-md-4">
            <div class="card-box-a card-shadow">
              <div class="img-box-a">
                <img src="data:image/png;base64,${firstImage}" alt="" class="img-a img-fluid">
              </div>
              <div class="card-overlay">
                <div class="card-overlay-a-content">
                  <a href="product-single.html?id=${id}" data-id="${id}">
                    <div class="card-header-a">
                      <h2 class="card-title-a">
                        ${name}
                      </h2>
                    </div>
                    <div class="card-body-a">
                      <div class="price-box d-flex">
                        <span class="price-a">Desde ${price}</span>
                      </div>
                      <a href="product-single.html?id=${id}#quote" class="link-a" data-id="${id}">Click aquí para cotizar
                        <span class="bi bi-chevron-right"></span>
                      </a>
                    </div>
                  </a>
                  <div class="card-footer-a">
                    <ul class="card-info d-flex justify-content-around">
                      <li>
                        <h4 class="card-info-title">Capacidad</h4>
                        <span>${capacity}</span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Tipo</h4>
                        <span>${type}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

            products.append(productHtml);
          }

        });
      } else {
        // Manejar el caso de que no haya propiedades disponibles
        $("#products").html("<p>No hay productos disponibles en este momento.</p>");
      }
    },
    error: function () {
      // Manejar errores en la solicitud AJAX
      alert("Error al obtener la información de los productos.\n" + error.message);
      console.log(error);
    }
  });
});

/* ==== Product Single ===== */
$(document).ready(function () {
  // Obtener el valor del parámetro "id" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Se comprueba que no sea null para que no salte error 500
  if (productId) {
    // URL del API para obtener la información del producto por ID
    const apiUrl = `https://uniclima-be-74r2-dev.fl0.io/api/product?_id=${productId}`;

    // Hacer la solicitud GET al API
    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (product) {

        if (product) {
          console.log(product);

          const intro = $("#intro-product")
          const carousel = $("#product-carousel");
          const productSingle = $("#product-single");

          const id = product.data[0]._id;
          const name = product.data[0].name;
          const description = product.data[0].description;

          // Se comprueba que capacity no este vacío y luego se convierte en objeto para luego convertirlo en un array de numeros
          const capacity = product.data[0].capacity[0] === null ? "-" : product.data[0].capacity;
          const type = product.data[0].type === "" ? "-" : product.data[0].type;

          // Se comprueba que price no este vacío y luego se convierte a float para aplicarle el formato de moneda local
          const price = product.data[0].price === "" ? 0 : parseFloat(product.data[0].price).toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }); // Formato de moneda local
          const images = product.data[0].images // Array de imagenes del producto

          // Convertir el array de capacidades en etiquetas <span>
          const capacitiesHtml = capacity !== "-" ? capacity.map(cap => `<span>${cap} BTU</span>`).join('') : capacity;

          const introHtml = `
                    <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                      <h1 class="title-single">${name}</h1>
                      <span class="color-text-a">${type}</span>
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a href="index.html">Inicio</a>
                        </li>
                        <li class="breadcrumb-item">
                          <a href="product-grid.html">Productos</a>
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
                <div class="carousel-item-b swiper-slide">
                      <div class="card-box-a">
                        <div class="img-box-a">
                        <img src="data:image/png;base64,${image}" alt="" class="img-a img-fluid" height="600px" width="600px">
                        </div>
                      </div>
                    </div>
                    <!-- End carousel item -->
                `;

            // Agregar el elemento al carrusel
            carousel.append(carouselItemHtml);
          });

          const productHtml = `
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
                      <li class="d-flex flex-column">
                        <strong>Capacidades:</strong>
                        ${capacitiesHtml}
                      </li>
                      <li class="d-flex flex-column">
                        <strong>Tipo:</strong>
                        <span>${type}</span>
                      </li>
                      <li class="d-flex flex-column text-justified">
                        <strong>Descripción:</strong>
                        <span>${description}</span>
                        <strong>--PRECIOS MÁS IMPUESTO DE VENTAS-- <br/>
                        Este documento no tiene valor comercial. Precios
                        sujetos a cambios sin previo aviso. La entrega se hará según existencia.</strong>
                      </li>
                    </ul>
                  </div>
                </div>
                `;

          // Insertar el contenido de 'productHtml' en 'productSingle'
          productSingle.html(productHtml);
        }
      },
      error: function () {
        alert("Error al obtener la información del producto.\n" + error.message);
        console.log(error);
      }
    });
  }
});