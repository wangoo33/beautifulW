<?php
require_once("00_init.php");
header("Content-Type:application/json");
@$pno=$_REQUEST["pno"];
if(!$pno){
	$pno=1;
}
$pageSize=10;
$sql="SELECT COUNT(*) from fs_txt";
//总帖子数
$allnotes=(int)sql_execute($sql)[0]['COUNT(*)'];
// 总页数
$pages=ceil($allnotes/$pageSize);
$start=($pno-1)*10;
$sql="SELECT * from fs_txt where 1=1 order by uid desc LIMit $start,10";
$result=sql_execute($sql);
// var_dump($result);
$output=[
	'allnotes'=>$allnotes,
	'pages'=>$pages,
	'pno'=>$pno,
	'data'=>$result,
];
	echo json_encode($output);
 
 ?>