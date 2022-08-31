var language = "english";
var urlname = "CD";
var urlname_ano = "weblio";
var data = {};
const urls={
    "english":{
        "CD" : "https://dictionary.cambridge.org/dictionary/english/{}",
        "OLD" : "https://www.oxfordlearnersdictionaries.com/definition/english/{}",
        "MW" : "https://www.merriam-webster.com/dictionary/{}",
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
function swap(a,b){var t = a;a = b;b = t;}
$('#language1').click(function() {
    $("#english_urls").show();
    $("#japanese_urls").hide();
    language = "english";
    swap(urlname,urlname_ano);
});
$('#language2').click(function() {
    $("#english_urls").hide();
    $("#japanese_urls").show();
    language = "japanese";
    swap(urlname,urlname_ano);
});
$('.language_button').click(function(e) {
    urlname=$(e.target).attr('id');
});

$.getJSON("https://cdn.statically.io/gh/lxl66566/wordsreciter/notebook/notebook.json",function(d){
    data = d;
})
$("#recite").click(function(){
    var url = urls[language][urlname];
    for (var i=0;i < document.getElementById("wordsnum").value; i++)
    {
        var word = getword(data[language]["default"]);
        document.getElementById('answer').insertAdjacentHTML('beforeend', 
            '<a href=\"' + url.replace(/{}/,word) + '\" target=\"_blank\">' + word + '</a>&nbsp;');
    }
});