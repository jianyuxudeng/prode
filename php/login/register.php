<?php
      require_once (dirname(__FILE__).'/../db.php');
	  
	  $con = new DbCon();
	  $conn = $con->conDb();
	  session_start(); 
	  $lifeTime = 24*3600;
	  setcookie(session_name(), session_id(), time() + $lifeTime, "/"); 
	 if(strcasecmp($_SESSION["VerifyCode"],$_POST['code'])){
	 	$result = array(
		    "error_code" => 6001,
		    "message" => "验证码错误！"
		);
	 }else{
	 	$username = addslashes($_POST['username']);
		$password = md5(addslashes($_POST['password']));
		$rePassword = md5(addslashes($_POST['rePassword']));
		if(!isset($username) || !isset($password)){
			$result = array(
		        "error_code" => 6002,
			    "message" => "请填写完整信息！"
			);
		}else if($password!==$rePassword){
			$result = array(
		        "error_code" => 6003,
			    "message" => "两次密码不一致！"
			);
		}else{
			$sql = "SELECT * FROM userinfo WHERE username = '$username'";
			$res = $conn->query($sql);
			if($res->num_rows > 0){
				$result = array(
				    "error_code" => 6004,
				    "message" => "用户已经存在！"
				);
			}else{
				$sql = "INSERT INTO userinfo (username, password) VALUES ('$username', '$password')";
				$_SESSION['$username'] = $username;
				$res = $conn->query($sql);
				if($res==TRUE){
					$result = array(
					    "error_code" => 200,
					    "message" => "注册成功！",  
					    "data" => array(
						     "username" => $username
						) 
					);
				}
			}		
		}		
	 }
	 echo json_encode($result);
?>