<?php
session_start();
header("Content-Type:application/json");
@$uid=$_SESSION["uid"];
if($uid){
  require_once("00_init.php");
  $sql=
    "select uname from fs_user where uid=$uid";
  @$uname=sql_execute($sql)[0]["uname"];
  echo json_encode(["ok"=>1,"uname"=>$uname]);
}else{
  echo json_encode(["ok"=>0,"uname"=>""]);
}