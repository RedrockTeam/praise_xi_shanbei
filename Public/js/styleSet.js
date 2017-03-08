/**
 * Created by hughes on 2017/3/4.
 */
$(function(){
    $('.listTop').css('left',$(window).width()*0.05);
    $('.listHolder').css('margin-top',$(window).height()*0.23);
    aLi = $('.list').find('li');
    for(var i = 1 ; i < 51 ; i++){
        if (i%2){

            aLi.eq(i).css('background-color','#ffffff');
        }
    }
    $('.programerHolder').css({'height':$(window).width()*0.6,'left':$(window).width()*0.19});
    $('.return').css('left',$(window).width()*0.35);
    $('.cardBack').css({'left':$(window).width()*0.135,'height':$(window).width()*0.81});
    $('.ok').css('margin-top',$(window).width()*0.89);
    $('.btnC').css('top',$(window).width()*1.1);
    $('.ui-page').css('min-height',$(window).height()+' !important');
    $('.nextBtn').on('click',function(){
        $('#gamePage').css('min-height',$(window).height()+' !important');
    });
    $('.warning').css({'left':$(window).width()*0.25,'height':$(window).width()*0.5});
    $('.avatar').css('height',$(window).width()*0.208);
});