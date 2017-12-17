var $button=$(":button"),
	$captcha=$("[name=captcha]"),
	$error=$(".alert-icon"),
	$err=$("#err"),
	$img=$("#captchapic")
	$email=$("[name=email]"),
	$upwd=$(":password"),
	$myDate=new Date(),
    $CNdate=$myDate.toLocaleString(),
    $uip=returnCitySN["cip"]+','+returnCitySN["cname"];
function reloadcaptcha(){
	$img.attr("src","data/03_code.php?id"+Math.random());
}
  //获取用户名和密码验证出错的次数
  var vcode_count_fail = sessionStorage.getItem("vcode_count_fail");
  if(vcode_count_fail == null){
    vcode_count_fail = 1;
  }

  //如果用户输入用户名或密码的错误超过4次，显示验证码
  function validatorVcode(){
  sessionStorage.setItem("vcode_count_fail",vcode_count_fail);
  if(vcode_count_fail>3){
      $("#vcode").show();
  }

}
 //防止用户输入错误超过4次刷新页面，“刷新页面立即验证”
 validatorVcode();

mailR=/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
upwdR=/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/;
$button.click(()=>{
	if (!$email.val()||!$upwd.val()) {
		$err.show();
		$error.html("邮箱和密码不能为空");
	}else if (!mailR.test($email.val())) {
		$err.show();
		$error.html("邮箱格式不正确");
	}else if(!upwdR.test($upwd.val())){
		$err.show();
		$error.html("密码格式不正确，密码必须由数字和字母组成！并且大于8位");
	}else{
		$.ajax({
			url:"data/login.php",
			type:"post",
			data:{email:$email.val(),upwd:$upwd.val(),captcha:$captcha.val(),v:vcode_count_fail,loginTime:$CNdate,uip:$uip}
		}).then(data=>{
			if (data.ok=='1') {
				$err.show();
				$err.html(data.msg);
				sessionStorage.setItem("vcode_count_fail","1");
				setTimeout(function(){location.href='wait.html?permission=user'},2000);
			}else{
				$err.show();
				$error.html(data.msg);
				reloadcaptcha();
				vcode_count_fail++;
				validatorVcode();
			}
		})
	}
})


$upwd.keydown(function(e){
	if (e.keyCode==13) {
		$button.trigger("click");
	}
})
$img.click(e=>{
	e.preventDefault();
	reloadcaptcha();
})