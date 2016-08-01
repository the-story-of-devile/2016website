/* 
* @Author: Marte
* @Date:   2016-07-27 14:44:39
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-27 14:46:26
*/

define(function(require,exports,module){
    var oldWidth=$('.number span').width();
    exports.infinite=function(obj){
        obj.each(function(index,elem){
            $(this).stop().animate({width:0},1000,function(){
                obj.css('width',oldWidth);                
            })
        }) 
    };
})