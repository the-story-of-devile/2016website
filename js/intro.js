/* 
* @Author: Marte
* @Date:   2016-07-17 10:04:53
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-25 15:43:22
*/

define(function(require,exports,module){
    var timer=null;
    timer=setInterval(tt,400);
    

    function tt()
    {
        var top=$('.main5').position().top;
    var top1=$('.main3').position().top;
        if(top==0)
        {
            module.exports={
                textAnimate:textAnimate()
            };
            clearInterval(timer);
        }
        else
        {
            clearInterval(timer);
            timer=setInterval(tt,400);
        } 
    }

    function textAnimate()
    {
        console.log(4);
    }
})

