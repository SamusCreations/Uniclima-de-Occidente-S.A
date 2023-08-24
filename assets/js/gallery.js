$(document).ready(function () {
    // URL del API que devuelve la información de los servicios
    const apiUrl = "https://uniclima-be-74r2-dev.fl0.io/api/gallery";
  
    // Hacer la solicitud AJAX al API
    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (data) {
  
        if (data) {
  
          const galleryGrid = $("#gallery");
  
          // Iterar sobre cada objeto en el array 'data'
          data.data.forEach(function (gallery) {
  
            const id = gallery._id;
            const name = gallery.name;
            const image = gallery.image;
  
  
            // Realizar acciones con los valores obtenidos
            const galleryHtml = `
                      <div class="col-md-4">
                      <div class="card-box-a">
                        <div class="img-box-a">
                          <img src="data:image/png;base64,${image}" alt="" class="img-a img-fluid">
                        </div>
                        <div class="card-overlay">
                          <div class="card-overlay-a-content">
                            <a href="" data-id="${id}">
                              <div class="card-header-a">
                                <h2 class="card-title-a">
                                  
                                </h2>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>`;
  
            galleryGrid.append(galleryHtml);
  
          });
        } else {
          // Manejar el caso de que no haya propiedades disponibles
          $("#gallery").html("<p>No hay servicios disponibles en este momento.</p>");
        }
      },
      error: function () {
        // Manejar errores en la solicitud AJAX
        alert("Error al obtener la información de la galería.\n" + error.message);
        console.log(error);
      }
    });
  });