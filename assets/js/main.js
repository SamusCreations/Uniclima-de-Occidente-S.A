/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function (e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function (e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Products carousel
   */
  new Swiper('#products-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Product Single carousel
   */
  new Swiper('#product-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

/**
 * Google API Location 
 */
function initMap() {
  const comercioLatLng = { lat: 10.0974258, lng: -84.3829785 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: comercioLatLng,
    zoom: 16,
    mapTypeId: "roadmap",
  });

  // Agregar el marcador para el comercio
  const marker = new google.maps.Marker({
    position: comercioLatLng,
    map: map,
    title: "Uniclima de Occidente S.A.",
  });

  // Obtener la ubicación actual del usuario al hacer clic en el botón 'Cómo llegar'
  document.getElementById("btn-map").addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Crear una instancia del servicio de direcciones de Google Maps
        const directionsService = new google.maps.DirectionsService();

        // Crear una instancia del mapa de direcciones de Google Maps
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        // Configurar la solicitud de ruta
        const request = {
          origin: userLatLng,
          destination: comercioLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        // Obtener la ruta y mostrarla en el mapa
        directionsService.route(request, function (result, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);

            // Mostrar los detalles de la ruta en el mapa
            const route = result.routes[0];
            const leg = route.legs[0];
            const distanciaKm = leg.distance.text;
            const tiempoEstimado = leg.duration.text;

            const infoWindow = new google.maps.InfoWindow({
              content: `<strong>Distancia:</strong> ${distanciaKm}<br><strong>Tiempo estimado:</strong> ${tiempoEstimado}`,
            });

            infoWindow.open(map, marker);
          } else {
            alert("No se pudo trazar la ruta. Error: " + status);
          }
        });
      });
    } else {
      alert("Geolocalización no soportada en este navegador.");
    }
  });
}

window.initMap = initMap;

/* ==== Services Dropdown Menu ==== */
$(document).ready(function () {
  const apiUrl = "https://uniclima-be-74r2-dev.fl0.io/api/service";

<<<<<<< HEAD
fechaNacimientoInput.addEventListener("change", function() {
  const fechaNacimiento = new Date(fechaNacimientoInput.value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  edadInput.value = edad;
  console.log(edadInput.value)
});






//Post del contacto

=======
  // Hacer la solicitud AJAX al API
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data) {
        const dropdownMenu = $("#servicesDropdownMenu");
        const serviceInstalacion = $(".service-instalacion");
        const serviceMantenimiento = $(".service-mantenimiento");
        const serviceReparacion = $(".service-reparacion");

        // Iterar sobre los datos de los servicios
        data.data.forEach(function (service) {
          const serviceId = service._id;
          const serviceName = service.name;

          // Crear una etiqueta <a> con el enlace y nombre del servicio
          const serviceLink = `<a class="dropdown-item" href="service-single.html?id=${serviceId}">${serviceName}</a>`;
          const serviceHref = `service-single.html?id=${serviceId}`
          
          // Agregar la etiqueta <a> al menú desplegable
          dropdownMenu.append(serviceLink);

          switch (serviceName) {
            case "Instalación":
                serviceInstalacion.attr("href", serviceHref)
              break;
            case "Mantenimiento":
                serviceMantenimiento.attr("href", serviceHref)
              break;
            case "Reparación":
                serviceReparacion.attr("href", serviceHref)
              break;
          
            default:
              break;
          }
        });
      }
    },
    error: function () {
      console.log("Error al obtener los datos de los servicios.");
    }
  });
});
>>>>>>> 96dd4e733af817da0918a13d630f78be3c867a5d
