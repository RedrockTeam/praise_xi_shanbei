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
    $('.mask').on('click',function(){
        $(this).css('display','none');
        $('.programerHolder').css('display','none');
    });
    $('.programerHolder').on('click',function(){
        $(this).css('display','none');
        $('.mask').css('display','none');
    });
   $('.startBtn').on('click',function(){
        $.mobile.changePage('#backPage',{
            transition:'flow'
        });
    });
    $('.listBtn').on('click',function(){
        $.mobile.changePage('#listPage',{
            transition:'turn'
        });
    });
    $('.returnBtn').on('click',function(){
        $.mobile.changePage('#beginPage',{
            transition:'flow'
        });
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
            $.mobile.loading('hide');
            if(data.status == 200){
                $('.Qtitle').html(data.data.question.title);
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
                $.mobile.changePage('#gamePage',{
                    transition:'flow'
                });
            }else{
                alert(data.info);
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
            $.post(rank_link,1,function(data){
                $.mobile.loading('hide');
                if(data.status == 200){
                    $('.days').html(data.data.days);
                    $('.groups').html(data.data.groups);
                    $('.rankNow').html(data.data.rank);
                    $.mobile.changePage('#overPage',{
                        transition:'flow'
                    });
                }else {
                    alert(data.info);
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
            $('.Qtitle').html(data.data.question.title);
            if(data.status == 200){
                console.log(data.data);
                if(data.data.question.type == 'gushidiangu'){
                    console.log(1);
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
                    console.log(2);
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
    $('.ok').on('click',function(){
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
    $('.return').on('click',function(){
        $.mobile.changePage('#beginPage',{
            transition:'flow'
        });
    });
});