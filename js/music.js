/* 
* @Author: Marte
* @Date:   2016-07-17 10:04:53
* @Last Modified by:   Marte
* @Last Modified time: 2016-08-01 12:50:38
*/

define(function(require,exports,module){

    exports.music=function(top,top1){
        if(top==0&&top1!=0)
        {
           musicPlay();
           dbl(); //双击播放 
               
        } 
        if(top1==0||top>0)
        {
                          
        }
    };
    var arr=['./data/王菲 - 笑忘书.mp3','./data/Alan Walker - Fade - 纯音乐版.mp3','./data/OMFG - Hello.mp3'];
    //初始
    musicInit();


    var bFlag=true;
    var songIndex=null;
    var timer=null;
    var vol=0.1;
    $('audio').each(function(){
        $(this).get(0).volume=vol;
    })
    //播放开关
    $('.j-pause').click(function(){
        pause(songIndex);
    })
    //音量
    $('.j-vol>span').mousedown(function(event){
        var disX=event.clientX-$(this).offset().left;
        $(document).on('mousemove',volMove);
        $(document).on('mouseup',volUp);
        function volMove(event)
        {
            var left=event.clientX-$('.j-vol').offset().left-disX;
            var MaxLeft=$('.j-vol').outerWidth()-$('.j-vol>span').width();
            if(left<-5)
            {
                left=-5;
            }
            else if(left>MaxLeft)
            {
                left=MaxLeft;
            }
            $('.j-vol>span').css('left',left);
            vol=left/MaxLeft;
            (vol<0)&&(vol=0);
            $('audio').each(function(){
                $(this).get(0).volume=vol;
            })
        }
        function volUp()
        {
            $(document).off('mousemove',volMove);
            $(document).off('mouseup',volUp);
        }
        return false;
    });
    //上一首
    $('.j-music-prev').mousedown(function(){
        $(this).css('backgroundPosition','-5px -52px');
    }).mouseup(function(){
        $(this).css('backgroundPosition','-5px -2px');
        prev();
    });

    //下一首 
    $('.j-music-next').mousedown(function(){
        $(this).css('backgroundPosition','-82px -52px');
    }).mouseup(function(){
        $(this).css('backgroundPosition','-82px -2px');
        next();
    });
    
    //例表循环
    var bFlag1=true;
    $('.j-loop').click(function(){
        if(bFlag1) return;
        $(this).css('backgroundPosition','-152px -125px');
        $('.j-random').css('backgroundPosition','-112px -142px');
        bFlag1=!bFlag1;
        $('audio').attr('playType','order'); 
    });

    //随机循环
    $('.j-random').click(function(){
        if(bFlag1)
        {
            $(this).css('backgroundPosition','-112px -125px');
            $('.j-loop').css('backgroundPosition','-152px -142px');
            bFlag1=!bFlag1;
            $('audio').attr('playType','random');        
        }
        
    });
    //判断循环
    $('audio').on('ended',function(){
        clearInterval(timer);    
        $('.process').css('left',-5);
        $('.process-color').css('width',0);
        switch($('audio').attr('playType'))
        {
            case 'order':
                songIndex++;
                (songIndex==arr.length)&&(songIndex=0);
                clean();
                clearInterval(timer);
                timer=setInterval(processing,30);
                break;                
            case 'random':
                songIndex=rnd(0,arr.length);
                clean();
                clearInterval(timer);
                timer=setInterval(processing,30);
                break;                
        }
    });

    //播放进度
    $('.process').mousedown(function(event){
        var disX=event.clientX-$(this).offset().left;
        $(document).on('mousemove',proMove);
        $(document).on('mouseup',proUp);
        var left=0;
        function proMove(event)
        {
            left=event.clientX-disX-$('.music-head>p').offset().left;
            if(left<-5)
            {
                left=-5;
            }
            else if(left>$('.music-head>p').outerWidth()-$('.process').width())
            {
                left=$('.music-head>p').outerWidth()-$('.process').width();
            }
            $('.process').css('left',left);
            $('.process-color').css('width',left+16);
            clearInterval(timer);
        }
        function proUp()
        {
           $('audio').eq(songIndex).get(0).currentTime=$('.process-color').width()/$('.music-head>p').outerWidth()*$('audio').eq(songIndex).get(0).duration; 
           $(document).off('mousemove',proMove);
           $(document).off('mouseup',proUp);
           clearInterval(timer);
           timer=setInterval(processing,30); 
        }
        return false;
    })    
    //搜索歌曲
    $('.j-search').keyup(function(){
        var value=$(this).value;
        $.ajax({
            url:'http://mobilecdn.kugou.com/api/v3/search/song',
            data:{
                'format':'jsonp',
                'keyword':'想象之中',
                'page':1,
                'pagesize':5        
            },
            dataType:'jsonp',
            success:function(data){
                console.log(data.data.info);
                getSongInfo(data.data.info);

            },
            error:function(){}
        })
    });

    function getSongInfo(data)
    {
        $.each(data,function(index,elem){
            
            $('<li><span>'+this.filename+'</span></li>').attr('hash',this.hash).appendTo($('.search-list'));
        })
        $('.search-list').find('li').dblclick(function(){
            var hash=$(this).attr('hash');
            $.ajax({
                url:'http://m.kugou.com/app/i/getSongInfo.php',
                data:{

                    'cmd':'playInfo',
                    'hash':hash
                },
                dataType:'jsonp',
                success:function(data){
                    console.log(data);
                },
                error:function(){}
            })
            return false;
        });        
    }

    function processing()
    {
        var currentTime=$('audio').eq(songIndex).get(0).currentTime.toFixed(0);
        var totalTime=$('audio').eq(songIndex).get(0).duration.toFixed(0);
        var width=currentTime/totalTime*$('.music-head>p').outerWidth();
        $('.process').css('left',width-16);
        $('.process-color').css('width',width);    
    }
    function musicInit()
    {        
        $.each(arr,function(index,elem){
            $('<audio></audio>').attr('src',arr[index]).attr('playType','order').appendTo($('.j-music li').eq(index));
        })
    }    

    function musicPlay()
    {
        //列表hover和click事件        
        $('.j-music li').each(function(index,elem){
            $(this).mouseenter(function(){
                $(this).css({
                    background:'#7d759b',
                    color:'#fff'
                })
            }).mouseleave(function(){
                $(this).css({
                    background:'rgba(157,151,187,0.3)',
                    color:'#ccc'
                });
            }).click(function(){
                songIndex=index;
                
                $('.j-pause').css('backgroundPosition','-42px 0px');
                bFlag=true;
                var _src=$(this).find('audio').attr('src');
                $(this).find('audio').attr('src',_src);

                $('audio').each(function(){
                    $(this)[0].pause();
                });
                $('.j-music li').css({
                    background:'rgba(157,151,187,0.3)',
                    color:'#ccc'
                }).on('mouseenter',function(){
                    $(this).css({
                        background:'#7d759b',
                        color:'#fff'
                    })
                }).on('mouseleave',function(){
                    $(this).css({
                        background:'rgba(157,151,187,0.3)',
                        color:'#ccc'
                    });
                });
                $(this).css({
                    background:'#7d759b',
                    color:'#fff'
                }).off('mouseenter').off('mouseleave')
            })
        })
        songIndex=songIndex||0;       
    }    
    

    function pause(num)
    {                 
        if(bFlag)
        {
            $('.j-pause').css('backgroundPosition','-42px -47px');
            $('audio').each(function(){
                $(this)[0].pause();
            });
            $('audio').eq(num).get(0).play();
            clearInterval(timer);
            timer=setInterval(processing,30);
            bFlag=!bFlag;
        }
        else
        {
           clearInterval(timer);
           $('.j-pause').css('backgroundPosition','-42px 0px');
           $('audio').eq(num).get(0).pause();
           bFlag=!bFlag;  
        }        
    }                   

    function dbl()
    {
       $('.j-music li').each(function(index,elem){
            
            $(this).on('dblclick',function(){
                
                $('audio').each(function(){
                    $(this)[0].pause();
                });
                var _src=$(this).find('audio').attr('src');
                $(this).find('audio').attr('src',_src);
                $(this).find('audio')[0].play();
                $('.j-pause').css('backgroundPosition','-42px -47px');
                bFlag=false;
                songIndex=index;
                clearInterval(timer);
                timer=setInterval(processing,30);
            })
        }) 
    }

    function clean()
    {
        var _src=$('audio').eq(songIndex).attr('src');
        $('audio').each(function(){
            $(this)[0].pause();
        });
        $('audio').eq(songIndex).attr('src',_src).get(0).play();
        $('.j-pause').css('backgroundPosition','-42px -47px');
        $('.j-music li').each(function(){
            $(this).css({
                background:'rgba(157,151,187,0.3)',
                color:'#ccc' 
            })
        })
        $('.j-music li').eq(songIndex).css({
            background:'#7d759b',
            color:'#fff'
        })
        bFlag=false;        
    }

    function prev()
    {
        $('audio').each(function(index,elem){
            $(this)[0].pause();
        })
        switch($('audio').attr('playType'))
        {
            case 'order':
                songIndex--;
                (songIndex==-1)&&(songIndex=arr.length-1);
                break;                
            case 'random':
                songIndex=rnd(0,arr.length);
                break;                
        }               

        clean();
        clearInterval(timer);
        timer=setInterval(processing,30);
    }

    function next()
    {
        $('audio').each(function(index,elem){
            $(this)[0].pause();
        })
        switch($('audio').attr('playType'))
        {
            case 'order':
                songIndex++;
                (songIndex==arr.length)&&(songIndex=0);
                break;                
            case 'random':
                songIndex=rnd(0,arr.length);
                break;                
        }      
        clean();
        clearInterval(timer);
        timer=setInterval(processing,30);                
    }

    function rnd(n,m)
    {
        return parseInt(Math.random()*(m-n)+n);
    }
})

/*http://tieba.baidu.com/p/4146669449*/
