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
        $('#all').hide();
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

        /* Scroll To Top */
        $(window).scroll(function(){
            if ($(this).scrollTop() >= 500) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
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
                    div.setAttribute('class', 'col-2');
                    
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
}

function view(sec){
    $('#all').hide();
    $('#examples').hide();
    $('#exerc').hide();        


    switch(sec){
        case 1:
            $('#all').show();
        break;
        case 2:
            $('#examples').show();
        break;
        case 3:
            $('#exerc').show();
        break;
    }
}

function example(){
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
        while(!end){
            var exm = Math.floor(Math.random() * (106 - 1)) + 1;
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
    else{
        alert("Error");
    }
}

function startExc(){
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
    else { alert("ERROR"); }
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

            /*
            var G = 0, E1 = 0, E2 = 0, E34 = 0, E5 = 0;

            while(!end){
                exm = Math.floor(Math.random() * (106 - 1)) + 1;

                var temp = 0;
                E5 = wordQuiz % 2; temp = Math.floor(exm / 2);
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
            */

            var end = false;
            var exm;
            while(!end){
                exm = Math.floor(Math.random() * (106 - 1)) + 1;
                
                var word = lnWords[exm - 1].split(".");
                var defEn = lnDefEn[exm - 1].split("@");
                var defEs = lnDefEs[exm - 1].split("@");
                var exEn = lnExEn[exm - 1].split("@");
                var exEs = lnExEs[exm - 1].split("@");

                if(defEn[1].length > 1){ end = true; }
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
                        var txtlbl = document.createTextNode(opts[i]);
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
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
                        if(i == posTrueAns) { var txtlbl = document.createTextNode("True"); }
                        else { var txtlbl = document.createTextNode("False"); }
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
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
                        if(i == posTrueAns) { var txtlbl = document.createTextNode("True"); }
                        else { var txtlbl = document.createTextNode("False"); }
                        lblrdbtn.appendChild(txtlbl);

                        var lblrdbtnEs = document.createElement('label');
                        lblrdbtnEs.setAttribute("for", "opt" + i);
                        lblrdbtnEs.setAttribute("lang", "es");
                        lblrdbtnEs.setAttribute('style','display: none;');
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
        
        var element = document.getElementById("quizScore");
        element.innerHTML = '';
        element.innerHTML = resQuiz + "/10";
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
        alert("Error! Select one answer. | ¡Error! Selecciona una respuesta.")
        return false;
    }
}

function restartQuiz(){
    $('#exerc').hide();$('#exQuest').hide();$('#finalScore').hide();
    view(3);
    $('#exInit').show();
    $('#exQuest').hide();
}