<?php
     require_once (dirname(__FILE__).'/../db.php');
	 
	 $con = new DbCon();
	 $conn = $con->conDb();
	 
	 $username = addslashes($_POST['username']);
	 $password = md5(addslashes($_POST['password']));
	 session_start();
	 $lifeTime = 24*3600;
	 $first = true;
	 setcookie(session_name(), session_id(), time() + $lifeTime, "/"); 
	 if(isset($_SESSION['$username'])){
	 	$result = array(
		    "error_code" => 200,
		    "message" => "登陆成功",
		    "data" => array(
			     "username" => $_SESSION['$username']
			)
		);
	 }else{
	 	 if(!isset($username) || !isset($password)){
	 		$result = array(
			    "error_code" => 7001,
			    "message" => "请输入完整信息！",
			);
	 	}else if($_POST['code']){
	 		if(strcasecmp($_SESSION["VerifyCode"],$_POST['code'])){
	 			$result = array(
				    "error_code" => 7003,
				    "message" => "验证码错误！"
				);
	 		}else{
	 			$sql = "SELECT * FROM userinfo WHERE username='$username' AND password = '$password' ";
				$result = $conn->query($sql);
				if($result->num_rows > 0){
					while($row=$result->fetch_assoc()){
				 		$data = $row['username'];
				 	};
					$_SESSION['$username'] = $username;
					$result = array(
					    "error_code" => 200,
					    "message" => "登陆成功",
					    "data" => array (
						     "username" => $data
						)
					);
				}else{
					$result = array(
					    "error_code" => 7002,
					    "message" => "用户名或密码错误！",
					);
				}
	 		}
		 }else{
	 		$sql = "SELECT * FROM userinfo WHERE username='$username' AND password = '$password' ";
			$result = $conn->query($sql);
			if($result->num_rows > 0){
				while($row=$result->fetch_assoc()){
			 		$data = $row['username'];
			 	};
				$_SESSION['$username'] = $username;
				$result = array(
				    "error_code" => 200,
				    "message" => "登陆成功",
				    "data" => array (
					     "username" => $data
					)
				);
			}else{
				$result = array(
				    "error_code" => 7002,
				    "message" => "用户名或密码错误！",
				);
			}
	 	}
	 }
	  echo json_encode($result);
?>