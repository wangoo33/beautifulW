$.ajax({
	url:"data/person.php",
	type:"get"}).then(data=>{
		var html=`
			<h1>通行证信息</h1>
		<div class="box">
			<h4>通行证名称:</h4>
			<p>${data.mail}</p>
		</div>
		<div class="box">
			<h4>姓名:</h4>
			<p>${data.uname}</p>
		</div>
		<div class="box">
			<h4>密码:</h4>
			<p>${data.upwd}</p>
			<div class="box_m">
			<span>修改密码:</span><input class="ipt"></input><br>
			<p class="err" style="color:red"></p>
			<span>确认密码:</span><input class="ipt1"></input>
			</div>
			<a href="" class="modify">修改密码</a>
		</div>
		<div class="box">
			<h4>上次登录时间:</h4>
			<p>${data.time}</p>
		</div>
		<div class="box">
			<h4>上次登录IP地址:</h4>
			<p>${data.ip}</p>
		</div>`;
	$(".account").html(html);
var $modify=$(".modify"),$ipt=$(".ipt"),$ipt1=$(".ipt1"),$eye=$(".err");
	$modify.click((e)=>{
	e.preventDefault();
	$(".box_m").show();
	$modify.html("确认修改");
$ipt.blur((e)=>{
	$tar=$(e.target);
	if($tar.val()==""){
		err($ipt);
	}else{
		$.ajax({
			url:"data/register.php",
			type:"post",
			dataType:"json",
			data:{upwd:$ipt.val()}
		}).then(data=>{
			if (data.ok=="1") {
				$eye.hide();
				yy($ipt);
				pw=true;
			}else{
				err($ipt);
				$eye.html(data.msg);
				pw=false;
			}
		})
	}
});
$ipt1.blur((e)=>{
	if($ipt1.val()===$ipt.val()){
		$eye.hide();
		yy($ipt1);
		cpw=true;
	}else{
		err($ipt1);
		$eye.show();
		$eye.html("两次密码不一致");
		cpw=false;
	}
});
// 提交按钮
$modify.click((e)=>{
	e.preventDefault();
	console.log(cpw,pw);
	if(cpw==true&&pw==true){
		$.ajax({
			url:"data/details.php",
			type:"post",
			dataType:"json",
			data:{upwd:$ipt.val()}
		}).then(data=>{
			if (data.ok=="1") {
				alert("修改成功");
				location.href="login.html";
			}else{
				alert("修改失败");
			}
			
		});
	}else{
		$("input").blur();
	}
})
})
	function err(a){
	a.css("border","1px solid red");
};
function yy(a){
	a.css("border","1px solid green");
}
	});
