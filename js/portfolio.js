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

        $('#header').css({'height':'45px', 'padding': '12px 0 0 0'});
        $('.menu a').css({'font-size':'12px'});
        $('#prtf_en').addClass("menu_active");
        $('#prtf_es').addClass("menu_active");
        jQuery("#Footer").css({'display':'inline'});
    });
})(jQuery);

function gotoPort(port, source) {
    switch(port){
        case 1:
            switch(source){
                case 1:
                    $('<a href="https://github.com/joseluislo12/MetroCard" target="_blank"></a>')[0].click();
                break;
                case 2:
                    $('<a href="./files/MetroCard.apk" download="MetroCard App" target="_blank"></a>')[0].click();
                break;
            }
        break;
    }
}