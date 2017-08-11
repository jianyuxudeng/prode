<?php
//    header('Content-type:text/json;charset=utf-8'); 
      require_once (dirname(__FILE__).'/../db.php');
	 
	 $con = new DbCon();
	 $conn = $con->conDb();
	 $id = $_POST['id'];
	 $sql = "SELECT * FROM product WHERE id = '$id' ";
	  $result = $conn->query($sql);
	 if($result==TRUE){
	 	$result = array(
		    "error_code" => 200,
		    "message" => "查询成功",
		    "data" => $result->fetch_assoc()
		);
		echo json_encode($result);
	 }else{
	 	$result = array(
		    "error_code" => 5001,
		    "message" => "获取失败"
		);
		echo json_encode($result);
	 }

?>
