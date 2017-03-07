/**
 * Created by hughes on 2017/3/4.
 */
$(function(){
    $('.listTop').css('left',$(window).width()*0.05);
    $('.listHolder').css('margin-top',$(window).height()*0.23);
    aLi = $('.list').find('li');
    console.log(aLi.eq(2).height());
    for(var i = 1 ; i < 51 ; i++){
        if (i%2){

            aLi.eq(i).css('background-color','#ffffff');
        }
    }
    $('.programerHolder').css('height',$(window).width()*0.6);
    $('.programerHolder').css('left',$(window).width()*0.19);
    $('.return').css('left',$(window).width()*0.35);
    $('.cardBack').css('left',$(window).width()*0.135);
    $('.bug').css('left',$(window).width()*0.2525);
});