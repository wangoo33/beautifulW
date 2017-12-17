// nav移动
window.addEventListener("scroll",function(){
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    document.querySelector("#navWrap").className=scrollTop>=300?"header-nav fixed-nav":"header-nav"
});
// gotop移动
window.addEventListener("scroll",function(){
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    document.querySelector("#gotop").className=scrollTop>=800?"dy bk":"dy"
});

function lunbo(){
var eye=document.getElementById("eye");
var outside=document.getElementById("click");
var imgs=document.querySelectorAll(".eye_small img");
var txts=document.querySelectorAll(".txtlist li");    
//点击切换
for (let i = 0; i < imgs.length; i++) {
    imgs[i].index=i;
    imgs[i].onmouseover=function(){
        outside.style.left=i*-640+"px";
        document.querySelector(".on").className="small_pic";
        this.className="small_pic on";
        document.querySelector(".show").className="";
        txts[this.index].className="show";
    }
}
function move(){
    for (var i = 0; i < txts.length; i++) {
        txts[i].index=i;
    };
    var show=document.querySelector(".show");
    document.querySelector(".show").className="";
    document.querySelector(".on").className="small_pic";
    if (show.nextElementSibling!=null) {
        show.nextElementSibling.className="show";
        outside.style.left=show.nextElementSibling.index*-640+"px";
        imgs[show.nextElementSibling.index].className="small_pic on";
    }else{
        show.parentNode.children[0].className="show";
        outside.style.left=0+"px";
        imgs[0].className="small_pic on";
    }
}
time=setInterval(move,2500);
eye.onmouseover=function(){
    clearInterval(time)
}
eye.onmouseout=function(){
    time=setInterval(move,2500);
}
};
lunbo();

function smalllu(){
var ul=document.querySelector(".eye_saiS");
var lis=document.querySelectorAll(".eye_saiS li");
var leftBtn=document.querySelector(".prev");
var rightBtn=document.querySelector(".next");
var esport=document.querySelector(".esport");
    leftBtn.onclick=function(){
        var left=parseInt(ul.style.left);
        if (left<0) {
            ul.style.left=left+244+'px';
        }else{
            ul.style.left=-488+'px';
        }
    };
    rightBtn.onclick=function(){
        var left=parseInt(ul.style.left);
        if (left>-488) {
            ul.style.left=left-244+'px';
        }else{
            ul.style.left=0+'px';
        }
    };
    function move(){
        var left=parseInt(ul.style.left);
        if (left>-488){
            ul.style.left=left-244+'px';
        }else{
            ul.style.left=0+'px';
        }
    };
    var timer =setInterval(move,5000);
    esport.onmouseover=function(){clearInterval(timer)};
    esport.onmouseout=function(){timer=setInterval(move,5000)};
};
smalllu();
// 3D旋转
function rote(){
function ft(){
    $("#app .aaa").addClass("front");
    $("#app img:not(.aaa)").addClass("back");
};
function bk(){
    $("#app .aaa").removeClass("front");
    $("#app img:not(.aaa)").removeClass("back");
};
var front=setInterval(ft,5000);
var back=setInterval(bk,10000);

$("#app").mouseover(()=>{
    clearInterval(front);
    clearInterval(back);
}).mouseout(()=>{
    front=setInterval(ft,5000);
    back=setInterval(bk,10000);
})};
rote();

// 选择类型下载单击事件
$(".lis1").click(()=>{
    $(".clientDown").toggleClass("down1");
    $(".lis1").children().first().toggle();
    
});
$(".lis2").click(()=>{
    $(".lis2").children().first().toggle();
    $(".clientDown").toggleClass("down2");
});
$(".lis3").click(()=>{
    $(".lis3").children().first().toggle();
    $(".clientDown").toggleClass("down3");
});

// 头部索引点击事件
var $a1=$("div.navbar-item a:first-child"),
    $a2=$("div.navbar-item a:last-child"),
    $a3=$("div.nav-profileitems a:last-child"),
    arr=[$a1,$a2,$a3],carr,
    $showpage=$("div.navbar-modals>div"),
    $bg=$(".navber-desktopOverlay");

    $.each(arr,function(i,l){
        var $this=$(this);
        $this.click((e)=>{
            if(i==carr){
                $bg.hide();
                $showpage.removeClass("is-open");
                carr=-1;
                return;
            }
            $bg.show();
            e.stopPropagation();
            e.preventDefault();
            $showpage.eq(i).addClass("is-open").siblings().removeClass("is-open");
            carr=i;
        })
    })
   $showpage.click((e)=>{
       e.stopPropagation();
       $bg.show();
       $(e.target).show();
   })
   $("body").click((e)=>{
       $bg.hide();
       $showpage.removeClass("is-open");
   })
// nav显示影藏
var $a=$("#nav>li:gt(0)>a"),$ul=$("#nav>li:gt(0)>ul"),$as=$("#nav>li:gt(0)>ul>li>a");
    $a.hover((e)=>{
        e.stopPropagation()
        $(e.target).next().show()
    },(e)=>{
        $(e.target).next().hide()
    })
    $as.hover((e)=>{
        e.stopPropagation();
        $(e.target).parent().parent().show();
    },(e)=>{
        $(e.target).parent().parent().hide();
    });

$.ajax({
    url:"data/is_login.php",
    type:"post"
}).then((data)=>{
    if(data.ok==1){
        $("#account").attr("href","details.html");
    }else{
        $("#account").attr("href","login.html");
    }
})