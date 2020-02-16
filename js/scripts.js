(function ($) {
    'use strict';

    jQuery(document).ready(function () {

        //English automatic
        $('[lang="es"]').hide();
        var lang = 'en';
        $('Footer').hide();

        /// If English is selected
        $("#btn-en").click(function(){
            $('[lang="es"]').hide();
            $('[lang="en"]').show(); 
            lang = 'en';    
        });
        /// If Spanish is selected
        $("#btn-es").click(function(){
            lang = 'es';
            $('[lang="en"]').hide();
            $('[lang="es"]').show();
        });
    });
})(jQuery);

function gotoPage(page) {
    switch(page){
        case 1:
            $('<a href="mailto:j.lobolara@gmail.com" target="blank"></a>')[0].click();
        break;
        case 2:
            $('<a href="https://www.linkedin.com/in/joseluislobo" target="blank"></a>')[0].click();
        break;
        case 3:
            $('<a href="https://github.com/joseluislo12" target="blank"></a>')[0].click();
        break;
        case 4:
            $('<a href="./files/Resume Jose Lobo.pdf" download="Resume Jose Lobo" target="blank"></a>')[0].click();
        break;
    }
}