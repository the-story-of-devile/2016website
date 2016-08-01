/* 
* @Author: Marte
* @Date:   2016-07-28 11:37:11
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-28 11:49:22
*/

define(function(require,exports,module){
    exports.init=function(){
        $.ajax({
            url:'./data/王菲 - 笑忘书.mp3',
            success:function(data){
                console.log(data);
            },
            error:function(){

            }
        })
    };
})