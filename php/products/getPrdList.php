<?php

     require_once (dirname(__FILE__).'/../db.php');
	 
	 $con = new DbCon();
	 $conn = $con->conDb();
	 
	 $sql = "SELECT * FROM product";
	 $result = $conn->query($sql);
	 if($result->num_rows > 0){
	 	while($row=$result->fetch_assoc()){
	 		$data[] = $row;
	 	}
		$result = array(
		    "error_code" => 200,
		    "message" => "获取成功",
		    "data" => $data
		);
		echo json_encode($result);
	 }else{
	 	$result = array(
		    "error_code" => 5001,
		    "message" => "获取失败",
		);
		echo json_encode($result);
	 }
?>