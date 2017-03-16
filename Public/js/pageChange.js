/**
 * Created by hughes on 2017/3/4.
 */
timer = null;
timeNum = 15;
nextFlag = 0;
current = 1;
$(function () {
    $('.programerList').on('click',function(){
        $('.mask').css('display','block');
        $('.programerHolder').css('display','block');
    });
    $('.closeP').on('click',function(){
        $('.mask').css('display','none');
        $('.programerHolder').css('display','none');
    });
   $('.startBtn').on('click',function(){
        $.mobile.changePage('#backPage',{
            transition:'flow'
        });
    });
    $('.listBtn').on('click',function(){
        $.mobile.loading('show');
        var _data = {};
        _data.from = 1;
        _data.to = 50;
        $.post(rank_link,_data,function(data){
            $.mobile.loading('hide');
            if(data.status == 200){
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
                $.mobile.changePage('#listPage',{
                    transition:'flow'
                });
            }else {
                alert(data.status);
            }
        });
    });
    $('.returnBtn').on('click',function(){
        $.mobile.changePage('#beginPage',{
            transition:'flow'
        });
    });
    $('.return').on('click',function(){
        $.mobile.changePage('#beginPage',{
            transition:'flow'
        });
    });
    $('.close').on('tap',function(){
        $('.warning').css('display','none');
        $('.mask').css('display','none');
    });
    $('.playBtn').on('click',function(){
        clearInterval(timer);
        timer = setInterval(function(){
            timeNum--;
            $('.time').html(timeNum);
            if (timeNum == 0){
                nextFlag = 1;
                clearInterval(timer);
                $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/next.png)");
                $('.nextBtn').html(" ");
                $('.nextBtn').css('padding','6% 0');
            }
        },1000);
        $.mobile.loading('show');
        $.post(question_link,1,function(data){
            if(data.status == 200){
                $('.questionContainer').css('min-height',$(window).height()*0.55);
                if(data.data.question.bigtitle){
                    $('.Qtitle').html(data.data.question.bigtitle);
                    $('.littleTitle').css('display',"inline-block");
                    $('.littleTitle').html(data.data.question.title);
                }
                else {
                    $('.littleTitle').css('display',"none");
                    $('.Qtitle').html(data.data.question.title);
                }
                if(data.data.question.type == 'gushidiangu'){
                    $('.allusion').css('display','block');
                    $('.conversation').css('display','none');
                    if(data.data.question.extra0){
                        $('.refrence').html(data.data.question.content);
                        $('.via').html(data.data.question.extra0);
                        $('.explain').html(data.data.question.extra1);
                    }else {
                        $('.refrence').html(data.data.question.content);
                        $('.box').css('display','none');
                        $('.box').eq(0).css('display','block');
                    }
                }else{
                    $('.conversation').css('display','block');
                    $('.allusion').css('display','none');
                    $('.sentences').html(data.data.question.content);
                    $('.provenance').html(data.data.question.extra0);
                }
                current = data.data.current;
                setTimeout(function(){
                    $.mobile.loading('hide');
                    $.mobile.changePage('#gamePage',{
                        transition:'flow'
                    });
                },200);
            }else if (data.status == 403){
                $.mobile.loading('hide');
                $('.warning').css('display','block');
                $('.mask').css('display','block');
            }else{

                alert(data.error);
            }
        });
    });

    $('.nextBtn').on('click',function(){
        if (nextFlag == 0){
            return false;
        }
        nextFlag = 0;
        if(current == 5){
            $.mobile.loading('show');
            $.post(link_rank,1,function(data){
                $.mobile.loading('hide');
                if(data.status == 200){
                    $('.secondState').css('display','none');
                    $('.firstState').css('display','block');
                    $('.days').html(data.data.days);
                    $('.num').html(data.data.days);
                    $('.groups').html(data.data.groups);
                    $('.rankNow').html(data.data.rank);
                    $.mobile.changePage('#overPage',{
                        transition:'flow'
                    });
                    shareDesc = '我正在参加 “团团打卡 学讲话” 特训，打卡第'+data.data.days+'天，排第'+data.data.rank+'名，明天继续！你也加入吧'
                    initShare(shareTitle, shareDesc, shareURL, shareImg);
                }else {
                    alert(data.error);
                }
            });
            return false;
        }
        clearInterval(timer);
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">15</span>s');
        $('.nextBtn').css('padding','3% 0');
        timeNum = 15;
        timer = setInterval(function(){
            timeNum--;
            $('.time').html(timeNum);
            if (timeNum == 0){
                nextFlag = 1;
                clearInterval(timer);
                $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/next.png)");
                $('.nextBtn').html(" ");
                $('.nextBtn').css('padding','6% 0');
            }
        },1000);
        var _data = {};
        _data.new = "true";
        $.mobile.loading('show');
        $.post(question_link,_data,function(data){
            $.mobile.loading('hide');
            if(data.status == 200){
                $('#gamePage').attr('style'," ");
                $('#gamePage').css('min-height',$(window).height());
                if(data.data.question.bigtitle){
                    $('.Qtitle').html(data.data.question.bigtitle);
                    $('.littleTitle').css('display',"inline-block");
                    $('.littleTitle').html(data.data.question.title);
                }
                else {
                    $('.littleTitle').css('display',"none");
                    $('.Qtitle').html(data.data.question.title);
                }
                if(data.data.question.type == 'gushidiangu'){
                    $('.allusion').css('display','block');
                    $('.conversation').css('display','none');
                    if(data.data.question.extra0){
                        $('.refrence').html(data.data.question.content);
                        $('.via').html(data.data.question.extra0);
                        $('.explain').html(data.data.question.extra1);
                    }else {
                        $('.refrence').html(data.data.question.content);
                        $('.box').css('display','none');
                        $('.box').eq(0).css('display','block');
                    }
                }else{
                    $('.conversation').css('display','block');
                    $('.allusion').css('display','none');
                    $('.sentences').html(data.data.question.content);
                    $('.provenance').html(data.data.question.extra0);
                }
                current = data.data.current;
            }else{
                console.log(data.info);
            }
        });
    });
    $('.goOver').on('click',function(){
       $('.firstState').css('display','none');
        $('.secondState').css('display','block');
    });
    $('.goCardPage').on('click',function(){
        $('.firstState').css('display','none');
        $('.secondState').css('display','block');
        $.mobile.changePage('#overPage',{
            transition:'flow'
        });
    });
    $('.ok').on('click',function(){
        $('.secondState').css('display','none');
        $('.firstState').css('display','block');
        timeNum = 15;
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">15</span>s');
        $('.nextBtn').css('padding','3% 0');
        $.mobile.changePage('#beginPage',{
            transition:'flow'
        });
    });
    $('.replay').on('click',function(){
        $('.secondState').css('display','none');
        $('.firstState').css('display','block');
        $.mobile.changePage('#backPage',{
            transition:'flow'
        });
        timeNum = 15;
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">15</span>s');
        $('.nextBtn').css('padding','3% 0');
    });
});