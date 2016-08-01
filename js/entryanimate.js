/* 
* @Author: Marte
* @Date:   2016-07-05 13:31:19
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-16 12:24:32
*/

define(function(require,exports,module){
    
    module.exports={
        textAnimate:textAnimate(),
        buttonAnimate:buttonAnimate()
    };


    //音乐播放器
    function musiceAnimate()
    {
        var lrc=$('.lrc');
        var ctr=$('.music-ctr');
        lrc.stop().animate({top:0},1000,function(){
            ctr.stop().animate({opacity:1},2000);
        });

    }

    //文字动画
    
    function textAnimate()
    {
        var aText=$('.entry-text p');
        var aSpan=$('.entry-text span');
        var num=0;
        var timer=null;


        showText();
        timer=setInterval(showText,300);
        aText.hover(function(){
            var This=$(this);
            timer=setTimeout(function(){
                aSpan.eq(This.index()).css({
                    transition:'all 1s linear',
                    transform:'rotateX(360deg) scale(1.2)',
                    background:'rgba(23,10,2,0.5)',
                    color:'#fff'
                });
            },150);
            
        },function(){
            
            clearTimeout(timer);
            aSpan.eq($(this).index()).css({
                transition:'all 1s linear',
                transform:'rotateX(0deg) scale(1)',
                background:'',
                color:'#99FFFF'
            });
        });
        function showText()
        {
           aSpan.eq(num).stop().animate({opacity:1},600);
            num++;
            if(num==aText.length)
            {
                clearInterval(timer);

            } 
        }
    }
   
    //进入按钮动画
    
    function buttonAnimate()
    {
        var main=$('.main');
        var oBtn=$('.entry-button');
        var mH=main.height();
        oBtn.click(function(){
            $('.entry-text,.entry-button').css('display','none');
            $('.entry').stop().animate({height:0},1000);
            
            $('.body').stop().animate({top:0},1000);
        });
    }
    
})