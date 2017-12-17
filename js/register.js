var $mail=$("[name=email]"),$mailC=$("[name=email1]"),
	$upwd=$("[name=upwd]"),$upwdT=$("[name=upwd1]"),
	$uname=$("[name=uname]"),
	$card=$("[name=card]"),
	$rule=$("[name=rule]"),
	$form=$("#form1"),
	$btn=$(".button-text"),
	$btn_a=$(".btton-a"),
	$err=$("#err"),
	$err_li=$(".alert-icon li"),
	m=cm=cpw=pw=n=c=false;
// 身份证
$card.blur((e)=>{
	$tar=$(e.target);
	if($tar.val()==""){
		$err_li.html("用户名不能为空！");
		err($err,$card);
	}else{
		$.ajax({
			url:"data/register.php",
			type:"post",
			dataType:"json",
			data:{card:$card.val()}
		}).then(data=>{
			if (data.ok=="1") {
				correct($err,$card);
				c=true;
			}else if(data.ok=="0"){
				err($err,$card,data.msg);
				c=false;
			}else{
				err($err,$card,data.msg);
				c=false;
			}
		})
	}
});
// 姓名
$uname.blur((e)=>{
	$tar=$(e.target);
	if ($tar.val()=="") {
		$err_li.html("姓名不能为空！");
		err($err,$uname);
	}else{
		$.ajax({
			url:"data/register.php",
			type:"post",
			dataType:"json",
			data:{uname:$uname.val()}
		}).then(data=>{
			if (data.ok=="1") {
				correct($err,$uname);
				u=true;
			}else{
				err($err,$uname,data.msg);
				u=false;
			}
		})
	}
});
// 邮箱
$mail.blur((e)=>{
	$tar=$(e.target);
	if ($tar.val()=="") {
		$err_li.html("邮箱不能为空！");
		err($err,$mail);
	}else{
		$.ajax({
			url:"data/register.php",
			type:"post",
			dataType:"json",
			data:{mail:$mail.val()}
		}).then(data=>{
			if (data.ok=="1") {
				correct($err,$mail);
				m=true;
			}else if(data.ok=="0"){
				err($err,$mail,data.msg);
				m=false;
			}else{
				err($err,$mail,data.msg);
				m=false;
			}
		})
	}
});
// 确认邮箱
$mailC.blur((e)=>{
	$tar=$(e.target);
	if ($mail.val()===$mailC.val()) {
		correct($err,$mailC);
		cm=true;
	}else{
		$err_li.html("两次邮箱不一致！");
		err($err,$mailC);
		cm=false;
	}
});
// 密码
$upwd.blur((e)=>{
	$tar=$(e.target);
	if($tar.val()==""){
		$err_li.html("密码不能为空！");
		err($err,$upwd);
	}else{
		$.ajax({
			url:"data/register.php",
			type:"post",
			dataType:"json",
			data:{upwd:$upwd.val()}
		}).then(data=>{
			if (data.ok=="1") {
				correct($err,$upwd);
				pw=true;
			}else{
				err($err,$upwd,data.msg);
				pw=false;
			}
		})
	}
});
// 确认密码
$upwdT.blur((e)=>{
	$tar=$(e.target);
	if ($upwd.val()===$upwdT.val()) {
		correct($err,$upwdT);
		cpw=true;
	}else{
		$err_li.html("两次密码不一致！");
		err($err,$upwdT);
		cpw=false;
	}
});



// 提交按钮
$btn.click(()=>{
	console.log(m,cm,cpw,pw,c);
	if(m==true&&cm==true&&cpw==true&&pw==true&&c==true){
		$.ajax({
			url:"data/submit.php",
			type:"post",
			dataType:"json",
			data:$form.serialize()
		}).then(data=>{
			if (data.ok=="1") {
				alert("注册成功");
				setTimeout(function(){location.href="fs.html"},3000);
			}else{
				alert("注册失败");
			}
			
		});
	}else{
		$("input").blur();
	}
})

function err(tar,t,msg){
	tar.show();
	t.css("borderColor","red");
	$err_li.html(msg);
}
function correct(tar,t){
	tar.hide();
	t.css("borderColor","rgba(255,255,255,0.3)");
}