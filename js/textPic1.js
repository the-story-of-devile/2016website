/* 
* @Author: Marte
* @Date:   2016-07-17 10:04:53
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-27 15:18:44
*/

define(function(require,exports,module){
    var dragIcon=require('./drag');
    var timer=null;
    var timer1=null;
    var infinite=require('./infinite');
    exports.textPic1=function(top,top1){
       if(top==0&&top1!=0)
       {
          main1Start();
          hoverbg();
          dragIcon.drag($('.hudie5').eq(0));
          startDrag($('.hudie5').eq(0));         
       } 
       if(top1==0||top>0)
       {
          main1End();                 
       } 
    };

   function main1End()
   {
       
        $('.pic-left').css({
            transition:'',
            transform:'translateY(-700px)'
        });
        $('.pic-right').css({
           transition:'',
           transform:'translateY(700px)'
        });
       clearInterval(timer);
       clearInterval(timer1);
       textAngin(); 
   }
   
   function main1Start()
   {
       $('.pic-left').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.35, 1.75)',
            transform:'translateY(0px)'
       })
       $('.pic-right').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.35, 1.75)',
            transform:'translateY(0px)'
       })
       $('.pic-left').on('transitionend',function(){ 
            infinite.infinite($('.number em'));
            clearInterval(timer);
            timer=setInterval(function(){
               infinite.infinite($('.number em')); 
            },1500);
       })
       $('.pic-right').on('transitionend',function(){
            textMove();
       }) 
   }
   function startDrag(obj)
   {
        var speedX=10;
        var speedY=10;
        clearInterval(timer1);
        timer1=setInterval(function(){
            var top=obj.position().top+speedY;
            var left=obj.position().left+speedX;
            if(top>$('.pic-right').height()-obj.height())
            {
                top=$('.pic-right').height()-obj.height();
                speedY*=-0.6;
            }
            else if(top<0)
            {
                top=0;
                speedY*=-0.6;
            }
            if(left>$('.pic-right').width()-obj.width())
            {
                left=$('.pic-right').width()-obj.width();
                speedX*=-0.6;
            }
            else if(left<0)
            {
                left=0;
                speedX*=-0.6;
            }
            obj.css({top:top,left:left});
        },30)           
   }

   function textAngin()
   {
      var aText=$('.pic-rightcont p');
      aText.each(function(index,elem){
        $(this).css({
            transition:'',
            transform:'translateX(770px)' 
        })
      }) 
      $('.pic-right>p').css({
            transition:'' ,
            transform:'translateX(770px)'
      }) 
   }
   function textMove()
   {
      var aText=$('.pic-rightcont p');
      aText.each(function(index,elem){
        $(this).css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.51, 1.46) '+0.3*index+'s',
            transform:'translateX(0)' 
        })
      })
      
      aText.eq(aText.length-1).on('transitionend',function(){
        $('.pic-right>p').css({
            transition:'all 1s cubic-bezier(0.48, 0.1, 0.51, 1.46)' ,
            transform:'translateX(0)'
        })
      })

   }

   function hoverbg()
    {         
        $('.hoverbg').each(function(index,elem){
            $(this).hover(function(){
                $(this).find('img').stop().animate({'opacity':1},600);
                var src=$(this).find('img').attr('src');      
            },function(){
                $(this).find('img').stop().animate({'opacity':0},600);                   
            })
        })            
    } 
    
})

