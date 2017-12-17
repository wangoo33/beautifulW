<?php
session_start();
	require_once("00_init.php");
	header("Content-Type:application/json");
	@$uid=$_SESSION["uid"];
	@$upwd=$_REQUEST["upwd"];
$sql="UPDATE fs_user SET upwd='$upwd' WHERE uid='$uid'";
$result=sql_execute($sql);
if ($result) {
	echo json_encode(
		["ok"=>1,"msg"=>"修改成功！自动跳转至登录页面！"]
	);
}else{
	echo json_encode(
		["ok"=>0,"msg"=>"修改失败！出了点小问题！"]
	);
}
 ?>