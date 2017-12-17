<?php
	require_once("00_init.php");
	header("Content-Type:application/json");
	@$uid=$_REQUEST["uid"];
	@$upwd=$_REQUEST["upwd"];
	@$mail=$_REQUEST["mail"];
	@$card=$_REQUEST["card"];
	@$uname=$_REQUEST["uname"];
	$mailT='/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/';
	$cardT='/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/';
	$upwdT='/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/';
	$unameT='/^([\xe4-\xe9][\x80-\xbf]{2}){2,4}$/';
	if($card){
		$sql="SELECT * FROM fs_user WHERE card='$card'";
		$result=sql_execute($sql);
		if(!preg_match($cardT,$card)){
			echo json_encode(
				["ok"=>-1,"msg"=>"请输入正确的身份证号码！"]
			);
			exit;
		}else if(count($result)) {
			echo json_encode(
				["ok"=>0,"msg"=>"身份证号已存在！"]
			);
			exit;
		}else{
			echo json_encode(
				["ok"=>1,"msg"=>"恭喜!用户名注册成功！"]
			);
		}
	}else if($uname){
		$sql="SELECT * FROM fs_user WHERE uname='$uname'";
		$result=sql_execute($sql);
		if(!preg_match($unameT,$uname)){
			echo json_encode(
				["ok"=>-1,"msg"=>"姓名中不能包含特殊符号"]
			);
			exit;
		}else{
			echo json_encode(
				["ok"=>1,"msg"=>"恭喜!姓名可以使用！"]
			);
		}
	}else if($mail){
		$sql="SELECT * FROM fs_user WHERE mail='$mail'";
		$result=sql_execute($sql);
		if(!preg_match($mailT,$mail)){
			echo json_encode(
				["ok"=>-1,"msg"=>"使用正确的邮箱格式！"]
			);
			exit;
		}else if(count($result)) {
			echo json_encode(
				["ok"=>0,"msg"=>"邮箱号码已存在！"]
			);
			exit;
		}else{
			echo json_encode(
				["ok"=>1,"msg"=>"恭喜!邮箱号码可以使用！"]
			);
		}
	}else if($upwd){
		$sql="SELECT * FROM fs_user WHERE upwd='$upwd'";
		$result=sql_execute($sql);
		if(!preg_match($upwdT, $upwd)){
			echo json_encode(
				["ok"=>-1,"msg"=>"密码必须含有小写字母、大写字母、数字,且密码长度为6-12位"]
			);
		}else{
			echo json_encode(
				["ok"=>1,"msg"=>"密码格式正确！"]
			);
		}
	}
			
?>