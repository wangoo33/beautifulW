<?php
	session_start();
	header("Content-Type:application/json");
	require_once("00_init.php");
	@$mail=$_REQUEST["email"];
	@$upwd=$_REQUEST["upwd"];
	@$code=$_REQUEST["captcha"];
	@$v=$_REQUEST["v"];
  @$loginTime=$_REQUEST["loginTime"];
	@$sessionFailCount = $_SESSION["failCount"];
  @$uip=$_REQUEST["uip"];
if($v>3){
  if($code!=$sessionFailCount){
  	echo json_encode(
      ["ok"=>-1,"msg"=>"验证码错误！"]
    );
  	exit;
  }
}
$mailPattern='/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
if(!preg_match($mailPattern,$mail)){
	echo json_encode(
    ["ok"=>-2,"msg"=>"邮箱格式错误！"]
  );
	exit;
};
$sql="select uid from fs_user where mail='$mail' and upwd='$upwd'";
$result=sql_execute($sql);
$sql="UPDATE fs_user SET time='$loginTime',ip='$uip' WHERE mail='$mail'";
if(count($result)){
  $_SESSION["uid"]=$result[0]["uid"];
  sql_execute($sql);
  echo json_encode(
    ["ok"=>1,"msg"=>"登录成功，自动跳转到首页"]
  );
}else
  echo json_encode(
    ["ok"=>0,"msg"=>"用户名或密码错误!"]
  );
?>