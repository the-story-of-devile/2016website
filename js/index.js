/* 
* @Author: Marte
* @Date:   2016-07-04 10:24:14
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-28 13:32:04
*/
define(function(require,exports,module){
    
    $(function(){
        
        require('./entryanimate');
        
        module.exports={
            init:init(),
            headerTab:headerTab(),
            mainScroll:mainScroll()
        };

    }) 

    function init()
    {
        var windowWid=$(window).width();
        var windowHeg=$(window).height();
        $('.body').css({
            width:windowWid,
            height:windowHeg,
            top:windowHeg
        });
        $('.entry').css({
            width:windowWid,
            height:windowHeg
        });
        $('.main').css('top',windowHeg);  //布完句保留
        $(document).scrollTop(0);
        $(document).on('scroll',pageScroll);
        hoverNav();
        $('.body').on('mousewheel',function(event){
            event.preventDefault();
        });
    }
    function hoverNav()
    {
        var  aLi=$('.nav-rg li');
        aLi.hover(function(){
            $(this).find('span').stop().animate({height:68},300);
            
        },function(){
            $(this).find('span').stop().animate({height:0},300);
        });
    }
    function pageScroll()
    {
        $(document).scrollTop(0);
    }
    function mainScroll()
    {
        var timer=null;
        var num=0;
        var maxNum=$('.main').length;
        var scrollDis=0;
        
        $('.body').one('mousewheel',mousewheelFn);
        
        //页面滚动
        function mousewheelFn(event)
        {
            $(document).off('scroll',pageScroll);
            
            if(event.deltaY<0)
            {
                //xia
                if(num!=maxNum)
                {
                   $('.main').eq(num).stop().animate({top:0},500,
                    function()
                    {
                        
                        main();
                        
                        num++;
                        (num==maxNum+1)&&(num=maxNum);
                        main2Top();
                        
                    }); 
                  
                   headerNav(num+1);

                } 
            }
            else
            {
                //shang   
                if(num!=0)
                {
                   $('.main').eq(num-1).stop().animate({top:$(window).height()},500,function(){
                        main();
                        num--;
                        (num==-1)&&(num=0);

                        main2Top();
                        
                    }); 
                   
                   headerNav(num-1);  
                }  
            }

            clearTimeout(timer);
            timer=setTimeout(function(){
                $('.body').one('mousewheel',mousewheelFn);
            },800);
        }
    }

    function main()
    {
       var top=$('.main2').position().top;
       var top1=$('.main3').position().top;       
       var top2=$('.main4').position().top;
       var top3=$('.main5').position().top;
       require('./textPic1').textPic1(top,top1);
       require('./textPic2').textPic2(top1,top2);
       require('./music').music(top2,top3);
       //require('./intro').intro(top3); 
    }
    

    
    
    




    function main2Top()
    {
        return $('.main2').position().top;
    }

    //导航滚动
    function headerNav(num)
    {
        
        var arr=['#CC6699','#99CC00','#FF9966','#999900','#FF0066','#FF6666'];
        $('.nav-bot').css({
            background:arr[num]
        });
        //changeNav(num);
        $('.head').css({

            'transform':'rotateX(90deg)',
            'transition':'all .3s linear',
            'transformOrigin':'center top',
            
        })
        $('.head').on('transitionend',function(){
            $(this).css({
                'transform':'rotateX(0deg)',
                'transition':'none'
            });
            $('.nav').css('background',arr[num]);
            $('.nav-bot').css('background',arr[num+1]);
        })   
    }

    function headerTab()
    {

        var arr=['1.jpg','2.jpg','3.jpg','4.jpg'];
        var oBox=$('.tab-box');
        oBox.css('background-image','url(./img/'+arr[1]+')');
        var r=5;
        var c=7;
        var oSpanWid=oBox.width()/c;
        var oSpanHeg=oBox.height()/r;
        //创建span
        for(var i=0;i<r;i++)
        {
            for(var j=0;j<c;j++)
            {
                $('<span>').css({
                    'width':oSpanWid,
                    'height':oSpanHeg,
                    'top':oSpanHeg*i,
                    'left':oSpanWid*j,
                    'background-image':"url(./img/"+arr[0]+")",
                    'background-position':'-'+oSpanWid*j+'px -'+oSpanHeg*i+'px'
                }).appendTo(oBox);
            }
        }
        //图片切换
        var num=0;
        var aSpan=$('.tab-box span');
        var bFlag=false;
        var oLeft=$('.tab-box .left');
        var oRight=$('.tab-box .right');
        oLeft.click(function(){
            if(bFlag) return;
            bFlag=true;
            num++;
            (num==arr.length)&&(num=0);
            oBox.css('background-image','url(./img/'+arr[num]+')');
            show();
           
        });
        oRight.click(function(){
            if(bFlag) return;
            bFlag=true;
            num--;
            show();
            (num==-1)&&(num=arr.length-1);
            oBox.css('background-image','url(./img/'+arr[num]+')');
        });
       
       //定时开关
        
        var timer=null;
        var oBoxTop=oBox.offset().top;
        var clientHeg=$(window).height();
        var oBoxHeg=oBox.height();
        clearInterval(timer);
        controllShow();
        timer=setInterval(controllShow,3000);
        $('.body').on('mousewheel',closeFn);
        //停止轮播
        function closeFn()
        {
            setTimeout(function(){
                var top=main2Top();
                //console.log(top);
                if(top>=$(window).height())
                {
                    clearInterval(timer);
                    timer=setInterval(controllShow,3000);
                }
                else
                {
                    clearInterval(timer);
                }
            },1000);
            
        }

        oBox.hover(function(){
            clearInterval(timer);
        },function(){
            clearInterval(timer);
            timer=setInterval(controllShow,3000); 
        });


        function controllShow()
        {
             num++;
            (num==arr.length)&&(num=0);
            oBox.css('background-image','url(./img/'+arr[num]+')');
            show();
        }

        function show()
        {
            
            aSpan.each(function(index,elem){
                var x=$(this).width()/2+$(this).position().left-oBox.width()/2;
                var y=$(this).height()/2+$(this).position().top-oBox.height()/2;      
                $(this).css({
                    'transition':'all 1s linear',
                    'prespective':800,
                    'transform':'translate('+x+'px,'+y+'px) scale(1.3) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg)',
                    'opacity':0
                });
            });
            aSpan.eq(0).on('transitionend',function(){
               aSpan.css({
                'transition':'none',
                'transform':'translate(0,0) scale(1) rotateX(0deg) rotateY(0deg)',
                'opacity':1,
                'background-image':"url(./img/"+arr[num%arr.length]+")"
               });
              
              bFlag=false; 
            });
        }
        function rnd(n,m)
        {
            return Math.random()*(m-n)+n;
        }
    }
   
})
