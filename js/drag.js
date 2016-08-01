/* 
* @Author: Marte
* @Date:   2016-07-27 14:18:38
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-27 14:20:07
*/

define(function(require,exports,module){
    exports.drag=function(obj){
        var disX=0;
       var disY=0;
       obj.mousedown(function(event){
          disX=event.clientX-$('.pic-right').offset().left-obj.position().left;
          disY=event.clientY-$('.pic-right').offset().top-obj.position().top;

          $(document).on('mousemove',move)
          $(document).on('mouseup',up);
          return false;  
       })

       function move(event)
       {
            
          var top=event.clientY-disY-$('.pic-right').offset().top;
          var left=event.clientX-disX-$('.pic-right').offset().left;
          obj.css({top:top,left:left});  
       }
       function up()
       {
          $(document).off('mousemove',move);
          $(document).off('mouseup',up);  
       }
    };
})