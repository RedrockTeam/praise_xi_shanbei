/**
 * Created by hughes on 2017/3/4.
 */
$(function(){
    $('.listTop').css('left',$(window).width()*0.05);
    $('.listHolder').css('left',$(window).width()*0.1);
    aLi = $('.list').find('li');
    console.log(aLi.eq(2).height());
    for(var i = 1 ; i < 11 ; i++){
        if (i%2){

            aLi.eq(i).css('background-color','#ffffff');
        }
    }
});