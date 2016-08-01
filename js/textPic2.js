/* 
* @Author: Marte
* @Date:   2016-07-17 10:04:53
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-27 15:15:10
*/

define(function(require,exports,module){
    var dragIcon=require('./drag');
    var infinite=require('./infinite');
    var timer=null;
    exports.textPic2=function(top,top1){
        if(top==0&&top1!=0)
        {
            main2Start();
            hoverbg();
            dragIcon.drag($('.hudie5').eq(1));
            startDrag($('.hudie5').eq(1));         
        } 
        if(top1==0||top>0)
        {
           main2End();                 
        }
    };

    function startDrag(obj)
    {
        var speedY=10;
        timer1=setInterval(function(){
            var top=obj.position().top+speedY;
            if(top>$('.pic-right1').height()-obj.height())
            {
                top=$('.pic-right1').height()-obj.height();
                speedY*=-0.75;
            }
            else if(top<0)
            {
                top=0;
                speedY*=-0.75;
            }
            obj.css({top:top});
        },30);
    }
    function hoverbg()
    {
        $('.hoverbg1').each(function(index,elem){
            $(this).hover(function(){
                $(this).find('img').stop().animate({'opacity':1},600);
                var src=$(this).find('img').attr('src');      
            },function(){
                $(this).find('img').stop().animate({'opacity':0},600);                   
            })
        }) 
    }

    function main2End()
    {
        $('.pic-left1').css({
            transition:'',
            transform:'translateX(450px)'
        });
        $('.pic-right1').css({
           transition:'',
           transform:'translateX(-800px)'
        });
        clearInterval(timer);
        textAngin();
    }
    function main2Start()
    {
       
       
       $('.pic-left1').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.35, 1.75)',
            transform:'translateX(0px)'
       })
       $('.pic-right1').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.35, 1.75)',
            transform:'translateX(0px)'
       })
       
       $('.pic-left1').on('transitionend',function(){ 
            infinite.infinite($('.number1 em'));
            clearInterval(timer);
            timer=setInterval(function(){
                infinite.infinite($('.number1 em'));
            },1500);
       })
       $('.pic-right1').on('transitionend',function(){
            textMove();
       }) 
    }
    function textMove()
    {
        var aText=$('.pic-rightcont1 p');
      aText.each(function(index,elem){
        $(this).css({
            transition:'all 1.5s cubic-bezier(0.48, 0.1, 0.51, 1.46) '+0.3*index+'s',
            transform:'rotateX(0deg)' 
        })
      })
      
      aText.eq(aText.length-1).on('transitionend',function(){
        $('.pic-right1>p').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.51, 1.46)' ,
            transform:'rotateX(0deg)'
        })
      })
    }
    function textAngin()
    {
        var aText=$('.pic-rightcont1 p');
      aText.each(function(index,elem){
        $(this).css({
            transition:'',
            transform:'rotateX(90deg)' 
        })
      }) 
      $('.pic-right1>p').css({
            transition:'' ,
            transform:'rotateX(90deg)'
      })
    }
    
})

