// nav显示影藏
(() => {
    var $a = $("#nav>li:gt(0)>a"), $ul = $("#nav>li:gt(0)>ul"), $as = $("#nav>li:gt(0)>ul>li>a");
    $a.hover((e) => {
        e.stopPropagation()
        $(e.target).next().show()
    }, (e) => {
        $(e.target).next().hide()
    })
    $as.hover((e) => {
        e.stopPropagation();
        $(e.target).parent().parent().show();
    }, (e) => {
        $(e.target).parent().parent().hide();
    });
    // nav移动
    window.addEventListener("scroll", function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        document.querySelector("#navWrap").className = scrollTop >= 300 ? "header-nav fixed-nav" : "header-nav"
    });
})();
// 获取帖子
function receive(pno) {
    $.ajax({
        url: "data/forum.php",
        type: "get",
        data: { pno: pno }
    }).then((data) => {
        var html = `<table cellpadding="0" cellspacing="0">`
        $.each(data.data, (i, l) => {
            html += `<tbody>
                        <tr>
                            <td class="icn"><img src="img/forum/folder_common.gif"></td>
                            <td class="lock">${l.title}</td>
                            <td class="frm">${l.author}</td>
                            <td class="num">${l.reply}</td>
                            <td class="num">${l.amount}</td>
                            <td class="by">${l.publication}</td>
                        </tr>
                        </tbody>
                    `;
        })
        html += `</table>`
        $(".bm_c").html(html);

        var html = "";
        html += `<div class="pg">`
        for (let i = 0; i < data.pages; i++) {
            html += `<a href="#" class=${i + 1 == data.pno ? 'curr' : ''}>${i + 1}</a>`
        }
        html += `
                            <label>
                                <input type="text" name="custopmpage" class="px" value="${data.pno}">
                                <span title="共${data.pages}页"> / 共${data.pages}页</span>
                            </label>
                            <a href="" class="nxt">下一页</a>`
        $(".page_top").html(html).data("index", data.pages);

    })
};
receive(1);

$(".page_top").on('click', '.pg a', (e) => {
    e.preventDefault();
    $tar = $(e.currentTarget);
    $nowPage = $(".pg>a.curr");
    if (!$tar.hasClass("curr") && !$tar.hasClass("nxt")) {
        pno = $tar.html();
    } else if ($tar.hasClass("nxt") && $nowPage.html() != $(".page_top").data("index")) {
        pno = parseInt($nowPage.html()) + 1;
    }
    receive(pno)
});
$(".page_top").on('blur focus', 'input', (e) => {
    $tar = $(e.target), index = $(".page_top").data("index");
    if (e.type == 'focusout') {
        $tar.val() > index ? receive(index) : receive($tar.val());
    } else {
        $tar.val("")
    }
});
// 获取用户是否登录
(() => {
    $.ajax({
        url: "data/is_login.php",
        type: "get"
    }).then(data => {
        if (data.ok) {
            $(".is_show").attr('id',data.uname).html("欢迎，" + (data.uname) + " | <a class='Cancellation'>注销</a>");
            $(".log_res").hide();
            $(".is_show").show();
            console.log('已登录')
        } else {
            $(".log_res").show();
            $(".is_show").hide();
        };

        $(".Cancellation").click((e) => {
            e.preventDefault();
            $.ajax({
                url: "data/logout.php",
                type: "post"
            }).then(() => location.href='wait.html?permission=visitor');
        })
    });
})();
// 发新帖
    $("#newspecial").on('click', (e)=>{
        e.preventDefault();
        $.ajax({
            url:"data/is_login.php",
            type: "get"
    }).then(data => {
        if (data.ok) {
            $(".mn").hide();
            $("#node_bg").show();
        }else{
            location.href='wait.html?permission=unlisted';
        }
      })   
    });