/**
 * Created by hughes on 2017/3/4.
 */
$(document).on("pageshow","#backPage",function(){
        $('.beginImg').removeClass('pulse');
});
$(document).on("pageshow","#listPage",function(){
    $('.beginImg').removeClass('pulse');
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
            $('.num').html(data.data.days);
            $('.days').html(data.data.days);
            $('.groups').html(data.data.groups);
            $('.rankNow').html(data.data.rank);
            $('.avatar').attr('src',data.data.avatar);
        }else {
            alert(data.error);
        }
    });
    $.post(rank_link,_data,function(data){
        $.mobile.loading('hide');
        if(data.status == 200){
            console.log(data.data);
            var aList = $('.aName');
            var aRank = $('.aRank');
            var aAvatar = $('.avatarBox');
            for (var i = 0 ; i < 50 ; i++){
                if(data.data[i]){
                    aList.eq(i+1).html(data.data[i].nickname);
                    aAvatar.eq(i).attr('src',data.data[i].imgurl);
                    if(i){
                        aRank.eq(i).html(i+3);
                    }
                }else{
                    if(i){
                        aRank.eq(i).html(i+3);
                    }
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

