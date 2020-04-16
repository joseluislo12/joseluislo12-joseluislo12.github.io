var quizState;
var wordQuiz;
var resQuiz;
var trueAnsw;

(function ($) {
    'use strict';

    jQuery(document).ready(function () {
        // Init
        $('[lang="es"]').hide();
        var lang = 'en';
        $('#all').show();
        $('#btn-All').addClass("menu_active");
        $('#btn-Todo').addClass("menu_active");
        $('#examples').hide();
        $('#exerc').hide();$('#exQuest').hide();$('#finalScore').hide();

        // English text
        $("#btn-en").click(function(){
            $('[lang="es"]').hide();
            $('[lang="en"]').show(); 
            lang = 'en';    
        });
        // Spanish text
        $("#btn-es").click(function(){
            lang = 'es';
            $('[lang="en"]').hide();
            $('[lang="es"]').show();
        });

        // All words
        $("#btn-All").click(function(){ view(1) });
        $("#btn-Todo").click(function(){ view(1) });

        // Examples
        $("#btn-Exm").click(function(){ view(2) });
        $("#btn-Ejem").click(function(){ view(2) });

        // Exercises
        $("#btn-Exrc").click(function(){ view(3) });
        $("#btn-Ejerc").click(function(){ view(3) });

        // Smooth Scroll
        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
        // Scroll Naviagation Background Change with Sticky Navigation
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 100) {
                $('.header-top-area').addClass('navigation-background');
            } else {
                $('.header-top-area').removeClass('navigation-background');
            }
        });
        // Mobile Navigation Hide or Collapse on Click
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        
		});

        // Scroll To Top    
        $(window).scroll(function(){
        if ($(this).scrollTop() >= 100) {
            $('.scroll-to-top').css('display', 'inline');
         } else {
            $('.scroll-to-top').css('display', 'none');
         }
	    });
	    $('.scroll-to-top').click(function(){
		  $('html, body').animate({scrollTop : 0},800);
		  return false;
	    });

        /* Filter Words */
        $('#chbxGeneral').click(function(){
            if($(this).is(':checked')){
                $('#wordsGeneral').show();
            } else {
                $('#wordsGeneral').hide();
            }
        });
        $('#chbxExm1').click(function(){
            if($(this).is(':checked')){
                $('#wordsExm1').show();
            } else {
                $('#wordsExm1').hide();
            }
        });
        $('#chbxExm2').click(function(){
            if($(this).is(':checked')){
                $('#wordsExm2').show();
            } else {
                $('#wordsExm2').hide();
            }
        });
        $('#chbxExm34').click(function(){
            if($(this).is(':checked')){
                $('#wordsExm34').show();
            } else {
                $('#wordsExm34').hide();
            }
        });
        $('#chbxExm5').click(function(){
            if($(this).is(':checked')){
                $('#wordsExm5').show();
            } else {
                $('#wordsExm5').hide();
            }
        });
    });
})(jQuery);

function init(){
    var file = './res/words.txt';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET",file,false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0){
                var allText = rawFile.responseText;
                var lines = allText.split("\n");
                var words;
                var wordPlace;

                for(var i = 0; i < lines.length; i++){
                    var div = document.createElement('div');
                    div.setAttribute('class', 'col-4 col-sm-3');
                    
                    var inpt = document.createElement('input');
                    inpt.setAttribute('type','checkbox');

                    var lbl = document.createElement('label');

                    var pEn = document.createElement('p');
                    pEn.setAttribute('lang','en');
                    var pEs = document.createElement('p');
                    pEs.setAttribute('lang','es');
                    pEs.setAttribute('style','display: none;');
                    
                    words = lines[i].split(".");

                    if(words[0] < 29){ wordPlace = "General"; }
                    else if(words[0] < 45){ wordPlace = "Exm1"; }
                    else if(words[0] < 67){ wordPlace = "Exm2"; }
                    else if(words[0] < 84){ wordPlace = "Exm34"; }
                    else if(words[0] < 106){ wordPlace = "Exm5"; }

                    inpt.setAttribute('id','chbx' + wordPlace);
                    inpt.setAttribute('name','chbx' + wordPlace);
                    div.appendChild(inpt);
                    var spaceBr = document.createElement('br');
                    div.appendChild(spaceBr);

                    lbl.setAttribute('for','chbx' + wordPlace);
                    var txtEn = document.createTextNode(words[1]);
                    pEn.appendChild(txtEn);
                    var txtEs = document.createTextNode(words[2]);
                    pEs.appendChild(txtEs);
                    lbl.appendChild(pEn);
                    lbl.appendChild(pEs);
                    div.appendChild(lbl);

                    var element = document.getElementById("words" + wordPlace);
                    element.appendChild(div);
                }
            }
        }
    }
    rawFile.send(null);

    quizState = 0;

    changeFavicon();

    document.getElementById("nameExm").innerHTML = "Word"; document.getElementById("name2Exm").innerHTML = "Word";
    document.getElementById("nameExmEs").innerHTML = "Palabra"; document.getElementById("name2ExmEs").innerHTML = "Palabra";
    document.getElementById("defExm").innerHTML = "Definition";
    document.getElementById("defExmEs").innerHTML = "Definición";
    var element = document.getElementById("exampleWord");
    element.innerHTML = '';
    var textH3 = document.createElement('h3');
    var pEn = document.createElement('p');
    pEn.setAttribute('lang','en');
    var pEs = document.createElement('p');
    pEs.setAttribute('lang','es');
    pEs.setAttribute('style','display: none;');
    var txtEn = document.createTextNode("Example");
    pEn.appendChild(txtEn);
    var txtEs = document.createTextNode("Ejemplo");
    pEs.appendChild(txtEs);
    textH3.appendChild(pEn);
    textH3.appendChild(pEs);
    element.appendChild(textH3);
}

function view(sec){
    $('#all').hide();
    $('#examples').hide();
    $('#exerc').hide();
    $('.menu a').removeClass("menu_active")
    $('#Footer').show();

    switch(sec){
        case 1:
            $('#all').show();
            $('#btn-All').addClass("menu_active");
            $('#btn-Todo').addClass("menu_active");
        break;
        case 2:
            $('#examples').show();
            $('#btn-Exm').addClass("menu_active");
            $('#btn-Ejem').addClass("menu_active");
        break;
        case 3:
            $('#exerc').show();
            $('#btn-Exrc').addClass("menu_active");
            $('#btn-Ejerc').addClass("menu_active");
            if(quizState > 10){ $('#Footer').hide(); }
        break;
    }
}

function example(){
    var exmGeneral = $('#chbxGeneralExamp').is(':checked');
    var exmExm1 = $('#chbxExm1Examp').is(':checked');
    var exmExm2 = $('#chbxExm2Examp').is(':checked');
    var exmExm34 = $('#chbxExm34Examp').is(':checked');
    var exmExm5 = $('#chbxExm5Examp').is(':checked');
    var exmpl = 0;
    if(exmGeneral){ exmpl += Math.pow(2, 4); }
    if(exmExm1){ exmpl += Math.pow(2, 3); }
    if(exmExm2){ exmpl += Math.pow(2, 2); }
    if(exmExm34){ exmpl += Math.pow(2, 1); }
    if(exmExm5){ exmpl += Math.pow(2, 0); }   

    if(exmpl > 0){ 
        var fWords = './res/words.txt';
        var fDefEn = './res/def_en.txt';
        var fDefEs = './res/def_es.txt';
        var fExEn = './res/ex_en.txt';
        var fExEs = './res/ex_es.txt';
        var allWords, allDefEn, allDefEs, allExEn, allExEs;
        var lnWords, lnDefEn, lnDefEs, lnExEn, lnExEs;
        var showExm = 0;

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET",fWords,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allWords = rawFile.responseText;
                    lnWords = allWords.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fDefEn,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allDefEn = rawFile.responseText;
                    lnDefEn = allDefEn.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fDefEs,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allDefEs = rawFile.responseText;
                    lnDefEs = allDefEs.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fExEn,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allExEn = rawFile.responseText;
                    lnExEn = allExEn.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fExEs,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allExEs = rawFile.responseText;
                    lnExEs = allExEs.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);

        if(showExm == 5){
            var end = false;
            var checkWordExmp = false;
            while(!end){
                var exm = Math.floor(Math.random() * (106 - 1)) + 1;

                var G = 0, E1 = 0, E2 = 0, E34 = 0, E5 = 0;
                var temp = 0;

                E5 = exmpl % 2; temp = Math.floor(exmpl / 2);
                if(exmpl > 1) { E34 = temp % 2; temp = Math.floor(temp / 2); }
                if(exmpl > 3) { E2 = temp % 2; temp = Math.floor(temp / 2); }
                if(exmpl > 7) { E1 = temp % 2; temp = Math.floor(temp / 2); }
                if(exmpl > 15) { G = temp % 2; }

                if((exm > 83) && (E5 == 1)){ checkWordExmp = true; }
                if(((exm > 66) && (exm < 84)) && (E34 == 1)){ checkWordExmp = true; }
                if(((exm > 44) && (exm < 67)) && (E2 == 1)){ checkWordExmp = true; }
                if(((exm > 28) && (exm < 45)) && (E1 == 1)){ checkWordExmp = true; }
                if((exm < 29) && (G == 1)){ checkWordExmp = true; }

                if(checkWordExmp){
                    var word = lnWords[exm - 1].split(".");
                    var defEn = lnDefEn[exm - 1].split("@");
                    var defEs = lnDefEs[exm - 1].split("@");
                    var exEn = lnExEn[exm - 1].split("@");
                    var exEs = lnExEs[exm - 1].split("@");

                    document.getElementById("nameExm").innerHTML = word[1]; document.getElementById("name2Exm").innerHTML = word[1];
                    document.getElementById("nameExmEs").innerHTML = word[2]; document.getElementById("name2ExmEs").innerHTML = word[2];

                    document.getElementById("defExm").innerHTML = defEn[1];
                    document.getElementById("defExmEs").innerHTML = defEs[1];

                    var element = document.getElementById("exampleWord");
                    element.innerHTML = '';
                    
                    if(defEn[1].length > 1){
                        if(exEn[1].length > 2){
                            var textH3 = document.createElement('h3');
                            var pEn = document.createElement('p');
                            pEn.setAttribute('lang','en');
                            var pEs = document.createElement('p');
                            pEs.setAttribute('lang','es');
                            pEs.setAttribute('style','display: none;');
                
                            var txtEn = document.createTextNode(exEn[1]);
                            pEn.appendChild(txtEn);
                            var txtEs = document.createTextNode(exEs[1]);
                            pEs.appendChild(txtEs);
                
                            textH3.appendChild(pEn);
                            textH3.appendChild(pEs);
                            element.appendChild(textH3);
            
                            end = true;
                        }
                        else{
                            var img = document.createElement('img');
                            var num = parseInt(exm, 10);
                            img.setAttribute('src','./img/exm/' + num + '.png');
                
                            element.appendChild(img);
            
                            end = true;
                        }
                    }
                }
            }
        }
        else{
            alert("Error");
        }
    }
    else { 
        $('#errorExm').show();
        setTimeout(function() { $('#errorExm').hide()}, 2500);
    }
}

function startExc(){
    $('#errorInit').hide();
    
    var wGeneral = $('#chbxGeneralExc').is(':checked');
    var wExm1 = $('#chbxExm1Exc').is(':checked');
    var wExm2 = $('#chbxExm2Exc').is(':checked');
    var wExm34 = $('#chbxExm34Exc').is(':checked');
    var wExm5 = $('#chbxExm5Exc').is(':checked');
    var s = 0;
    if(wGeneral){ s += Math.pow(2, 4); }
    if(wExm1){ s += Math.pow(2, 3); }
    if(wExm2){ s += Math.pow(2, 2); }
    if(wExm34){ s += Math.pow(2, 1); }
    if(wExm5){ s += Math.pow(2, 0); }

    quizState = 0;
    wordQuiz = 0;
    resQuiz = 0;    

    if(s > 0){ wordQuiz = s; startQuiz(); }
    else { 
        $('#errorInit').show();
        setTimeout(function() { $('#errorInit').hide()}, 2500);
    }
}

function startQuiz(){
    $('#exInit').hide();
    $('#exQuest').show();

    var exType = Math.floor(Math.random() * (4 - 1)) + 1;
    nextQues(exType);
}

function nextQues(typeQues){  
    quizState++;
    var checkedAns = false;

    if(quizState > 1){ checkedAns = checkAnsw(); }
    else{ checkedAns = true; }

    if(quizState < 11 && checkedAns){
        var fWords = './res/words.txt';
        var fDefEn = './res/def_en.txt';
        var fDefEs = './res/def_es.txt';
        var fExEn = './res/ex_en.txt';
        var fExEs = './res/ex_es.txt';
        var allWords, allDefEn, allDefEs, allExEn, allExEs;
        var lnWords, lnDefEn, lnDefEs, lnExEn, lnExEs;
        var showExm = 0;

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET",fWords,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allWords = rawFile.responseText;
                    lnWords = allWords.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fDefEn,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allDefEn = rawFile.responseText;
                    lnDefEn = allDefEn.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fDefEs,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allDefEs = rawFile.responseText;
                    lnDefEs = allDefEs.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fExEn,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allExEn = rawFile.responseText;
                    lnExEn = allExEn.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);
        rawFile.open("GET",fExEs,false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status === 0){ 
                    allExEs = rawFile.responseText;
                    lnExEs = allExEs.split("\n");
                    showExm++;
                }
            }
        }
        rawFile.send(null);

        if(showExm == 5){
            var element = document.getElementById("numQuest");
            element.innerHTML = '';
            element.innerHTML = quizState + "/10";

            var end = false;
            var exm;
            var G = 0, E1 = 0, E2 = 0, E34 = 0, E5 = 0;

            while(!end){
                exm = Math.floor(Math.random() * (106 - 1)) + 1;

                var temp = 0;
                E5 = wordQuiz % 2; temp = Math.floor(wordQuiz / 2);
                if(wordQuiz > 1) { E34 = temp % 2; temp = Math.floor(temp / 2); }
                if(wordQuiz > 3) { E2 = temp % 2; temp = Math.floor(temp / 2); }
                if(wordQuiz > 7) { E1 = temp % 2; temp = Math.floor(temp / 2); }
                if(wordQuiz > 15) { G = temp % 2; }

                if((exm > 83) && (E5 == 1)){ checkWord = true; }
                if(((exm > 66) && (exm < 84)) && (E34 == 1)){ checkWord = true; }
                if(((exm > 44) && (exm < 67)) && (E2 == 1)){ checkWord = true; }
                if(((exm > 28) && (exm < 45)) && (E1 == 1)){ checkWord = true; }
                if((exm < 29) && (G == 1)){ checkWord = true; }

                if(checkWord){
                    var word = lnWords[exm - 1].split(".");
                    var defEn = lnDefEn[exm - 1].split("@");
                    var defEs = lnDefEs[exm - 1].split("@");
                    var exEn = lnExEn[exm - 1].split("@");
                    var exEs = lnExEs[exm - 1].split("@");

                    if(defEn[1].length > 1){ end = true; }
                }
            }
            
            document.getElementById("nameQuest").innerHTML = '';
            document.getElementById("nameQuestEs").innerHTML = '';

            var defWord = document.getElementById("defQuest");
            defWord.innerHTML = '';
            var defWordEs = document.getElementById("defQuestEs");
            defWordEs.innerHTML = '';

            var options = document.getElementById("exOpt");
            options.innerHTML = '';

            switch(typeQues){
                case 1:
                    var pEn = document.createElement('p');
                    pEn.setAttribute('lang','en');
                    var pEs = document.createElement('p');
                    pEs.setAttribute('lang','es');
                    pEs.setAttribute('style','display: none;');
        
                    var txtEn = document.createTextNode(defEn[1]);
                    pEn.appendChild(txtEn);
                    var txtEs = document.createTextNode(defEs[1]);
                    pEs.appendChild(txtEs);
        
                    defWord.appendChild(pEn);
                    defWordEs.appendChild(pEs);
                    
                    var pQEn = document.createElement('p');
                    pQEn.setAttribute('lang','en');
                    var pQEs = document.createElement('p');
                    pQEs.setAttribute('lang','es');
                    pQEs.setAttribute('style','display: none;');
        
                    var txtQuest = document.createTextNode("Select the word that corresponds to this definition:");
                    pQEn.appendChild(txtQuest);
                    var txtQuestEs = document.createTextNode("Selecciona la palabra que corresponde a esta definición:");
                    pQEs.appendChild(txtQuestEs);;
        
                    options.appendChild(pQEn);
                    options.appendChild(pQEs);

                    var opts = [], optsEs = [];
                    trueAnsw = Math.floor(Math.random() * (5 - 0)) + 0;
                    for(var i = 0; i < 5; i++){
                        if(i == trueAnsw){ opts.push(word[1]); optsEs.push(word[2]); }
                        else{
                            var fExm = Math.floor(Math.random() * (106 - 1)) + 1;

                            while(opts.includes(fExm));

                            var fWord = lnWords[fExm - 1].split(".");
                            opts.push(fWord[1]);
                            optsEs.push(fWord[2]);
                        }
                    }

                    for(var i = 0; i < opts.length; i++){
                        var rdbtn = document.createElement('input');
                        rdbtn.setAttribute("id", "opt" + i);
                        rdbtn.setAttribute("type", "radio");
                        rdbtn.setAttribute("name", "radio");

                        var lblrdbtn = document.createElement('label');
                        lblrdbtn.setAttribute("for", "opt" + i);
                        lblrdbtn.setAttribute("lang", "en");
                        lblrdbtn.setAttribute("class", "lblAnsw");
                        var txtlbl = document.createTextNode(opts[i]);
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
                        lblrdbtnEs.setAttribute("class", "lblAnsw");
                        var txtlblEs = document.createTextNode(optsEs[i]);
                        lblrdbtnEs.appendChild(txtlblEs);

                        var space = document.createElement('br');

                        options.appendChild(rdbtn);
                        options.appendChild(lblrdbtn);
                        options.appendChild(lblrdbtnEs);
                        options.appendChild(space);
                    }
                break;
                case 2:
                    trueAnsw = Math.floor(Math.random() * (2 - 0)) + 0;

                    document.getElementById("nameQuest").innerHTML = word[1];
                    document.getElementById("nameQuestEs").innerHTML = word[2];

                    if(trueAnsw == 0){
                        var otherWord = exm;

                        while(otherWord == exm){ exm = Math.floor(Math.random() * (106 - 1)) + 1; }
                        defEn = lnDefEn[exm - 1].split("@");
                        defEs = lnDefEs[exm - 1].split("@");
                    }

                    var pEn = document.createElement('p');
                    pEn.setAttribute('lang','en');
                    var pEs = document.createElement('p');
                    pEs.setAttribute('lang','es');
                    pEs.setAttribute('style','display: none;');
        
                    var txtEn = document.createTextNode(defEn[1]);
                    pEn.appendChild(txtEn);
                    var txtEs = document.createTextNode(defEs[1]);
                    pEs.appendChild(txtEs);
        
                    defWord.appendChild(pEn);
                    defWordEs.appendChild(pEs);
                    
                    var pQEn = document.createElement('p');
                    pQEn.setAttribute('lang','en');
                    var pQEs = document.createElement('p');
                    pQEs.setAttribute('lang','es');
                    pQEs.setAttribute('style','display: none;');
        
                    var txtQuest = document.createTextNode("Select if the word corresponds to this definition:");
                    pQEn.appendChild(txtQuest);
                    var txtQuestEs = document.createTextNode("Selecciona si palabra corresponde a esta definición:");
                    pQEs.appendChild(txtQuestEs);;
        
                    options.appendChild(pQEn);
                    options.appendChild(pQEs);
                    
                    var posTrueAns = Math.floor(Math.random() * (2 - 0)) + 0;
                    for(var i = 0; i < 2; i++){
                        var rdbtn = document.createElement('input');
                        rdbtn.setAttribute("id", "opt" + i);
                        rdbtn.setAttribute("type", "radio");
                        rdbtn.setAttribute("name", "radio");

                        var lblrdbtn = document.createElement('label');
                        lblrdbtn.setAttribute("for", "opt" + i);
                        lblrdbtn.setAttribute("lang", "en");
                        lblrdbtn.setAttribute("class", "lblAnsw");
                        if(i == posTrueAns) { var txtlbl = document.createTextNode("True"); }
                        else { var txtlbl = document.createTextNode("False"); }
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
                        lblrdbtnEs.setAttribute("class", "lblAnsw");
                        if(i == posTrueAns) { var txtlblEs = document.createTextNode("Verdadero"); }
                        else { var txtlblEs = document.createTextNode("Falso"); }
                        lblrdbtnEs.appendChild(txtlblEs);

                        var space = document.createElement('br');

                        options.appendChild(rdbtn);
                        options.appendChild(lblrdbtn);
                        options.appendChild(lblrdbtnEs);
                        options.appendChild(space);
                    }
                break;
                case 3:
                    trueAnsw = Math.floor(Math.random() * (2 - 0)) + 0;

                    document.getElementById("nameQuest").innerHTML = word[1];
                    document.getElementById("nameQuestEs").innerHTML = word[2];
                    
                    if(trueAnsw == 0){
                        var otherWord = exm;

                        var end2 = false;
                        while(!end2){
                            while(otherWord == exm){ exm = Math.floor(Math.random() * (106 - 1)) + 1; }
                            defEn = lnDefEn[exm - 1].split("@");
                            exEn = lnExEn[exm - 1].split("@");
                            exEs = lnExEs[exm - 1].split("@");

                            if(defEn[1].length > 1){ end2 = true; }
                        }

                        
                        
                    }
                    
                    if(exEn[1].length > 2){
                        var pEn = document.createElement('p');
                        pEn.setAttribute('lang','en');
                        var pEs = document.createElement('p');
                        pEs.setAttribute('lang','es');
                        pEs.setAttribute('style','display: none;');
            
                        var txtEn = document.createTextNode(exEn[1]);
                        pEn.appendChild(txtEn);
                        var txtEs = document.createTextNode(exEs[1]);
                        pEs.appendChild(txtEs);
            
                        defWord.appendChild(pEn);
                        defWordEs.appendChild(pEs);
                    }
                    else{
                        var img = document.createElement('img');
                        var imgEs = document.createElement('img');
                        var num = parseInt(exm, 10);
                        img.setAttribute('src','./img/exm/' + num + '.png');
                        imgEs.setAttribute('src','./img/exm/' + num + '.png');
            
                        defWord.appendChild(img);
                        defWordEs.appendChild(imgEs);
                    }
                    
                    var pQEn = document.createElement('p');
                    pQEn.setAttribute('lang','en');
                    var pQEs = document.createElement('p');
                    pQEs.setAttribute('lang','es');
                    pQEs.setAttribute('style','display: none;');
        
                    var txtQuest = document.createTextNode("Select if the word corresponds to this example:");
                    pQEn.appendChild(txtQuest);
                    var txtQuestEs = document.createTextNode("Selecciona si la palabra corresponde a este ejemplo:");
                    pQEs.appendChild(txtQuestEs);;
        
                    options.appendChild(pQEn);
                    options.appendChild(pQEs);
                    
                    var posTrueAns = Math.floor(Math.random() * (2 - 0)) + 0;
                    for(var i = 0; i < 2; i++){
                        var rdbtn = document.createElement('input');
                        rdbtn.setAttribute("id", "opt" + i);
                        rdbtn.setAttribute("type", "radio");
                        rdbtn.setAttribute("name", "radio");

                        var lblrdbtn = document.createElement('label');
                        lblrdbtn.setAttribute("for", "opt" + i);
                        lblrdbtn.setAttribute("lang", "en");
                        lblrdbtn.setAttribute("class", "lblAnsw");
                        if(i == posTrueAns) { var txtlbl = document.createTextNode("True"); }
                        else { var txtlbl = document.createTextNode("False"); }
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
                        lblrdbtnEs.setAttribute("class", "lblAnsw");
                        if(i == posTrueAns) { var txtlblEs = document.createTextNode("Verdadero"); }
                        else { var txtlblEs = document.createTextNode("Falso"); }
                        lblrdbtnEs.appendChild(txtlblEs);

                        var space = document.createElement('br');

                        options.appendChild(rdbtn);
                        options.appendChild(lblrdbtn);
                        options.appendChild(lblrdbtnEs);
                        options.appendChild(space);
                    }
                break;
            }

            var exType = Math.floor(Math.random() * (4 - 1)) + 1;
            var nextBtn = document.getElementById("nextBtn");
            nextBtn.setAttribute('onclick','nextQues(' + exType + ')')
        }
        else{
            alert("Error");
        }
    }
    else if(quizState > 10){
        $('#exQuest').hide();
        $('#finalScore').show();
        $('#Footer').hide();
        
        var element = document.getElementById("quizScore");
        element.innerHTML = '';
        element.innerHTML = resQuiz + "/10";

        if(resQuiz < 3){
            $('#quest1').show(); setTimeout(function() { $('#quest1').hide()}, 2500);
        }
        else if(resQuiz < 6){
            $('#quest2').show(); setTimeout(function() { $('#quest2').hide()}, 2500);
        }
        else if(resQuiz < 10){
            $('#quest3').show(); setTimeout(function() { $('#quest3').hide()}, 2500);
        }
        else if(resQuiz == 10){
            $('#quest4').show(); setTimeout(function() { $('#quest4').hide()}, 2500);
        }
    }
}

function checkAnsw(){
    var count = 0;
    var answs = document.getElementsByName("radio");
    for(var i = 0; i < answs.length; i++) {
        if(answs[i].checked){ count++; }
    }

    if(count > 0){        
        var ansSelec = document.getElementById("opt" + trueAnsw);
        if(ansSelec.checked){ resQuiz++; }
        return true;
    }
    else{
        $('#errorAnsw').show();
        setTimeout(function() { $('#errorAnsw').hide()}, 2500);
        quizState--;
        return false;
    }
}

function restartQuiz(){
    $('#exerc').hide();$('#exQuest').hide();$('#finalScore').hide();
    view(3);
    $('#exInit').show();
    $('#exQuest').hide();
    $('#Footer').show();
}

/* Fav Icon */
document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon() {
    var link = document.createElement('link'), oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    
    var favIcon = Math.floor(Math.random() * (2 - 0)) + 0;
    if(favIcon < 1){ link.href = "./img/pi.ico"; }
    else{ link.href = "./img/sigma.ico"; }
    
    if (oldLink) { document.head.removeChild(oldLink); }
    document.head.appendChild(link);
}