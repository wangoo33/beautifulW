<?php
	require_once("00_init.php");
	header("Content-Type:application/json");
	@$uid=$_REQUEST["uid"];
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$mail=$_REQUEST["email"];
	@$card=$_REQUEST["card"];
$sql="INSERT INTO fs_user VALUES(NULL,'$uname','$upwd','$mail','$card','','')";
$result=sql_execute($sql);
if ($result) {
	echo json_encode(
		["ok"=>1,"msg"=>"注册成功！自动跳转至登录页面！"]
	);
}else{
	echo json_encode(
		["ok"=>0,"msg"=>"注册失败！出了点小问题！"]
	);
}
 ?>