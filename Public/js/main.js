/**
 * Created by hughes on 2017/3/4.
 */
$(document).on("pageshow","#beginPage",function(){
    $('.beginImg').addClass('gogogo');
    $(document).off("pageshow","#beginPage");
    setTimeout(function(){
        $('.beginImg').removeClass('gogogo');
        $('.beginImg').removeClass('pulse');
    },3000);
});
var question_link = "https://redrock.cqupt.edu.cn/praise_xi_shanbei/Home/Index/questions";
var rank_link = "https://redrock.cqupt.edu.cn/praise_xi_shanbei/Home/Index/moreRank";
var link_rank = "https://redrock.cqupt.edu.cn/praise_xi_shanbei/Home/Index/rank";
function loadImgs(b, g) {
    var f = {};
    var d = 0;
    for (var e = 0; e < b.length; e++) {
        var h = new Image();
        h.src = "/praise_xi_shanbei/Public/images/" + b[e] +".png";
        var c = b[e].split(".")[0];
        h.onload = function () {
            d++;
            if (d == b.length) {
                if (g) {
                    g()
                }
            }
        };
        f[c] = h
    }
    return f
}
function showPage(obj){
    $.mobile.loading('hide');
    $.mobile.changePage('#beginPage',{
            transition:'slide'
    });
}
$(function(){
    $.mobile.loading('show');
    var _data = {};
    _data.from = 1;
    _data.to = 50;
    $.post(link_rank,1,function(data){
        if(data.status == 200){
            $('.usrName').html(data.data.nickname);
            $('.rankNum').html(data.data.rank);
            $('.days').html(data.data.days);
            $('.groups').html(data.data.groups);
            $('.rankNow').html(data.data.rank);
        }else {
            alert(data.error);
        }
    });
    $.post(rank_link,_data,function(data){
        $.mobile.loading('hide');
        if(data.status == 200){
            var aList = $('.aName');
            var aRank = $('.aRank');
            for (var i = 0 ; i < 50 ; i++){
                if(data.data[i]){
                    aList.eq(i+1).html(data.data[i].nickname);
                    aRank.eq(i+1).html(i+1);
                }else{
                    aRank.eq(i+1).html(i+1);
                    aList.eq(i+1).html("无");
                }
            }
        }else {
            alert(data.status);
        }
    });
    var Imgs = ['au','back','backintro','beginXi','blankBtn','cardBack','Cu','flag','good','goOver','listBack','listBtn','listTop','myCardtitle','next','ok','questionBack','replay','return','shadow','si','startBtn','startGame'];
    loadImgs(Imgs,showPage);
});

