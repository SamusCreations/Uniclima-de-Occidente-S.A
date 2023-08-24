$(document).ready(function () {
    var form = $('#formulario');

    $('#enviarBoton').click(function () {
        var isValid = true;

        form.find('[required]').each(function () {
            var input = $(this);
            var value = input.val();

            if (typeof value !== 'string') {
                value = String(value); // Convierte el valor en una cadena
            }

            if (value.trim() === '') {
                isValid = false;
                showError(input, 'Este campo es obligatorio.');
            } else {
                clearError(input);
            }
        });

        if (!isValid) {
            return; // Detener el proceso si hay campos vacíos
        }

        if (isValid) {

            var formData = {
                name: form.find('[name="name"]').val(),
                email: form.find('[name="email"]').val(),
                description: form.find('[name="description"]').val()
            };

            console.log(formData);
            $.ajax({
                type: 'POST',
                url: 'https://uniclima-be-74r2-dev.fl0.io/api/estimate', // URL de la ruta del post
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function (response) {
                    form.find('.sent-message').fadeIn().delay(3000).fadeOut();
                    form[0].reset();
                },
                error: function (error) {
                    showError(form.find('[name="email"]'), 'Error al enviar el formulario.');
                }
            });
        } else {
            form.find('.field-error-message').fadeIn().delay(2).fadeOut();
        }

    });

    function showError(input, message) {
        var errorMessage = input.closest('.form-group').find('.error-message');
        errorMessage.text(message);
    }

    function clearError(input) {
        var errorMessage = input.closest('.form-group').find('.error-message');
        errorMessage.text('');
    }
});
