var language = "english";
var urlname = {true: "CD" , false : "weblio"}
var flag = true;
var data = {};
var answers = 0;
const urls={
    "english":{
        "CD" : "https://dictionary.cambridge.org/dictionary/english/{}",
        "OLD" : "https://www.oxfordlearnersdictionaries.com/definition/english/{}",
        "MW" : "https://www.merriam-webster.com/dictionary/{}",
        "baidu" : "https://fanyi.baidu.com/#en/zh/{}",
    },
    "japanese":{
        "weblio" : "https://www.weblio.jp/content/{}",
        "goo" : "https://dictionary.goo.ne.jp/srch/jn/{}/m6u/",
        "HCW" : "https://sakura-paris.org/dict/%E5%BA%83%E8%BE%9E%E8%8B%91/prefix/{}/"
    }
};

function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getword(list)
{
    return list[random(0,list.length - 1)];
}
$('#language1').click(function() {
    $("#english_urls").show();
    $("#japanese_urls").hide();
    language = "english";
    flag = !flag;
});
$('#language2').click(function() {
    $("#english_urls").hide();
    $("#japanese_urls").show();
    language = "japanese";
    flag = !flag;
});
$('.language_button').click(function(e) {
    urlname[flag] = $(e.target).attr('id');
});

$.getJSON("https://cdn.statically.io/gh/lxl66566/wordsreciter/notebook/notebook.json",function(d){
    data = d;
})
$("#recite").click(function(){
    answers++;
    document.getElementById('answer').insertAdjacentHTML('beforeend','<div id=\"' + String(answers) + '\" class=\"wordsline\"></div>');
    var url = urls[language][urlname[flag]];
    for (var i=0;i < document.getElementById("wordsnum").value; i++)
    {
        var word = getword(data[language]["default"]);
        var tempurl = url.replace(/{}/,word);
        document.getElementById(String(answers)).insertAdjacentHTML('beforeend', 
            '<a href=\"' + tempurl + '\" target=\"_blank\">' + word + '</a>&nbsp;');
        // if(document.getElementById('opendirectly').value == "on"){
        //     window.open(tempurl,"_blank");
        // }
        if((i + 1) % 5 == 0){
            answers++;
            document.getElementById('answer').insertAdjacentHTML('beforeend','<div id=\"' + String(answers) + '\" class=\"wordsline\"></div>');
        }
    }
});