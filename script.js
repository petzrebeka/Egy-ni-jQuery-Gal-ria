$(document).ready(function() {
    // Képek tömbje
    const images = $('.gallery-image');
    let currentIndex = 0;
    
    // Lightbox megnyitása
    $('.gallery-image').click(function() {
        currentIndex = $(this).index('.gallery-image');
        updateLightboxImage();
        $('#lightbox').fadeIn();
    });
    
    // Lightbox bezárása
    $('.close-btn').click(function() {
        $('#lightbox').fadeOut();
    });
    
    // Kilépés, ha a lightboxon kívülre kattintanak
    $(document).click(function(event) {
        if ($(event.target).is('#lightbox')) {
            $('#lightbox').fadeOut();
        }
    });
    
    // Billentyűzet események
    $(document).keydown(function(e) {
        if ($('#lightbox').is(':visible')) {
            switch(e.which) {
                case 27: // ESC
                    $('#lightbox').fadeOut();
                    break;
                case 37: // Bal nyíl
                    navigate(-1);
                    break;
                case 39: // Jobb nyíl
                    navigate(1);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
    });
    
    // Navigációs gombok
    $('.prev-btn').click(function() {
        navigate(-1);
    });
    
    $('.next-btn').click(function() {
        navigate(1);
    });
    
    // Képváltás funkció
    function navigate(direction) {
        currentIndex += direction;
        
        // Ciklikus navigáció
        if (currentIndex >= images.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        
        updateLightboxImage();
    }
    
    // Lightbox kép frissítése
    function updateLightboxImage() {
        const imgSrc = $(images[currentIndex]).attr('src');
        const imgAlt = $(images[currentIndex]).attr('alt');
        $('#lightbox-img').attr('src', imgSrc).attr('alt', imgAlt);
    }
    
    // Képek előtöltése
    function preloadImages() {
        images.each(function() {
            const img = new Image();
            img.src = $(this).attr('src');
        });
    }
    
    // Képek előtöltésének indítása
    preloadImages();
});