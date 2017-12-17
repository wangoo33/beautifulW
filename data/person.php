<?php
session_start();
header("Content-Type:application/json");
@$uid=$_SESSION["uid"];
if($uid){
  require_once("00_init.php");
  $sql=
    "select * from fs_user where uid=$uid";
  @$rows=sql_execute($sql)[0];
  echo json_encode($rows);
}else{
  echo json_encode(["ok"=>0,"msg"=>"未登录 检查E-mail"]);
}