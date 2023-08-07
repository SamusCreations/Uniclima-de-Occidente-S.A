/*--------------------------------------------------------------
# Animation on scroll
--------------------------------------------------------------*/

$(document).ready(function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('show');
            }
        });
    });

    const hiddenElements = $('.hidden');
    hiddenElements.each(function () {
        observer.observe(this);
    });
});