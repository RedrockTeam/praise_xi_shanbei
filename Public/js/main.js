/**
 * Created by hughes on 2017/3/4.
 */
var question_link = "https://redrock.cqupt.edu.cn/praise_xi_shanbei/Home/Index/questions";
var rank_link = "https://redrock.cqupt.edu.cn/praise_xi_shanbei/Home/Index/rank";
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
    $.post(rank_link,1,function(data){
        if(data.status == 200){
            var aList = $('.aName');
            $('.usrName').html(data.data.nickname);
            $('.rankNum').html(data.data.rank);
            console.log(data.data);
            for (var i = 0 ; i < 10 ; i++){
                aList.eq(i+1).html(data.data.list[i].nickname);
            }
        }else {
            alert(data.info);
        }
    });
    var Imgs = ['au','back','backintro','beginXi','blankBtn','cardBack','Cu','flag','good','goOver','listBack','listBtn','listTop','myCardtitle','next','ok','questionBack','replay','return','shadow','si','startBtn','startGame'];
    loadImgs(Imgs,showPage);
});

