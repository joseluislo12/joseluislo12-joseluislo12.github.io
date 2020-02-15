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