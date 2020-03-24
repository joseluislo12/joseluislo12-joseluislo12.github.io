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

        /// Portfolio
        $(".filter-button").click(function(){
            var value = $(this).attr('data-filter');
            
            if(value == "all"){
                $('.filter').show('1000');
            }
            else{
                $(".filter").not('.'+value).hide('3000');
                $('.filter').filter('.'+value).show('3000');
            }
        });
        $('.portfolio-popup').magnificPopup({
            type: 'image',
			
          gallery: { enabled: false },
			     zoom: { enabled: true,
			     duration: 500
					
          },
		  
         image:{
               markup: '<div class="mfp-figure portfolio-pop-up">'+
               '<div class="mfp-close"></div>'+
               '<div class="mfp-img"></div>'+
               '<div class="mfp-bottom-bar portfolio_title">'+
               '<div class="mfp-title"></div>'+
               '</div>'+
               '</div>',

               titleSrc:function(item){
                return item.el.attr('title');
              }
            }

          });
    });
})(jQuery);

function gotoPage(page) {
    switch(page){
        case 1:
            $('<a href="mailto:j.lobolara@gmail.com" target="_blank"></a>')[0].click();
        break;
        case 2:
            $('<a href="https://www.linkedin.com/in/joseluislobo" target="_blank"></a>')[0].click();
        break;
        case 3:
            $('<a href="https://github.com/joseluislo12" target="_blank"></a>')[0].click();
        break;
        case 4:
            $('<a href="./files/Resume Jose Lobo.pdf" download="Resume Jose Lobo" target="_blank"></a>')[0].click();
        break;
    }
}

function filter(item){
    $('#btn_all').removeClass("btn_filter_active");
    $('#btn_f1').removeClass("btn_filter_active");
    $('#btn_f2').removeClass("btn_filter_active");
    $('#btn_f3').removeClass("btn_filter_active");
    $('#btn_f4').removeClass("btn_filter_active");
    $('#btn_f5').removeClass("btn_filter_active");

    switch(item){
        case 0:
            $('#btn_all').addClass("btn_filter_active");
        break;
        case 1:
            $('#btn_f1').addClass("btn_filter_active");
        break;
        case 2:
            $('#btn_f2').addClass("btn_filter_active");
        break;
        case 3:
            $('#btn_f3').addClass("btn_filter_active");
        break;
        case 4:
            $('#btn_f4').addClass("btn_filter_active");
        break;
        case 5:
            $('#btn_f5').addClass("btn_filter_active");
        break;
    }
}