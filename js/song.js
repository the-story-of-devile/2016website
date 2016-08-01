/* 
* @Author: Marte
* @Date:   2016-07-06 10:34:08
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-06 20:52:52
*/

define(function(require,exports,module){
    module.exports={
        show:musicShow(),
        fn:musicFunction()
    };

    function musicFunction()
    {

    }

    function musicShow()
    {
        $.ajax({
            url:'./data/梦一场.lrc',
            success:function(data){
                var arr=getLrc(data);
                createLrc(arr);
            },
            error:function(){
                alert(2);
            }
        });
    }

    function createLrc(arr)
    {
        var lrc=$('.lrc');
        $.each(arr,function(index,elem){
            $('<span>'+elem.lrc+'</span>').appendTo(lrc);
        })
        var aSpan=$('.lrc').find('span');
        aSpan.eq(0).addClass('active');
    }
    function getLrc(data)
    {
        var arr=data.split(/\n/);
        var Infro=[];
        $.each(arr,function(index,elem){
            if(index<=2)
            {
              Infro.push(arr.shift());  
            }
            
        })
        arr.shift();
        arr.pop();
        //歌词提取
        var arr2=[];
        $.each(arr,function(index,elem){
            var json={};
            var time=elem.match(/\[.*?\]/g);
            var lrc=elem.replace(/\[.*?\]/g,'');
            json['time']=transtime(time);
            json['lrc']=lrc;
            arr2.push(json);

        })
        return arr2;
    }



    function transtime(time)
    {
        var curTime=[];
        $.each(time,function(index,elem){
           curTime.push((Number(elem.charAt(1))*10+Number(elem.charAt(2)))*60+Number(elem.charAt(4))*10+Number(elem.charAt(5)));
        });
        //
        return curTime;
    }


})