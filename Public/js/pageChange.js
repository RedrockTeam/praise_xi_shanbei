/**
 * Created by hughes on 2017/3/4.
 */
timer = null;
timeNum = 3;
nextFlag = 0;
current = 1;
$(function () {
    $('.programerList').on('click',function(){
        $('.mask').css('display','block');
        $('.programerHolder').css('display','block');
    });
    $('.x').on('click',function(){
        $('.mask').css('display','none');
        $('.programerHolder').css('display','none');
    });
   $('.startBtn').on('click',function(){
        $.mobile.changePage('#backPage',{
            transition:'flow'
        });
    });
    $('.listBtn').on('click',function(){
        $.mobile.changePage('#listPage',{
            transition:'flow'
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
                console.log(data.data.question.bigtitle);
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
        console.log(nextFlag);
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
                    shareTitle = '我正在参加“学讲话 赞习大大”打卡特训，打卡第'+data.data.days+'天，排第'+data.data.rank+'名，明天继续'
                    initShare(shareTitle, shareURL, shareImg);
                }else {
                    alert(data.error);
                }
            });
            return false;
        }
        clearInterval(timer);
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">3</span>s');
        $('.nextBtn').css('padding','3% 0');
        timeNum = 3;
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
            console.log(data.data.question.bigtitle);
            if(data.data.question.bigtitle){
                $('.Qtitle').html(data.data.question.bigtitle);
                $('.littleTitle').css('display',"inline-block");
                $('.littleTitle').html(data.data.question.title);
            }
            else {
                $('.littleTitle').css('display',"none");
                $('.Qtitle').html(data.data.question.title);
            }
            if(data.status == 200){
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
                alert(data.info);
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
        timeNum = 3;
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">3</span>s');
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
        timeNum = 3;
        $('.nextBtn').css("background-image","url(/praise_xi_shanbei/Public/images/blankBtn.png)");
        $('.nextBtn').html('<span class="time">3</span>s');
        $('.nextBtn').css('padding','3% 0');
    });
});