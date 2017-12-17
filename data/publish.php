<?php
require_once("00_init.php");
@$title=$_REQUEST["title"];
@$text=$_REQUEST["text"];
@$publication=$_REQUEST["time"];
@$author=$_REQUEST["user"];
$sql="INSERT INTO fs_txt VALUES(NULL,'$title','$author','','','$publication','$text','')";
$result=sql_execute($sql);
if ($result) {
	echo json_encode(
		["ok"=>1,"msg"=>"成功！"]
	);
}else{
	echo json_encode(
		["ok"=>0,"msg"=>"失败！出了点小问题！"]
	);
}
 ?>