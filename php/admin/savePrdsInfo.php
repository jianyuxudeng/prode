<?php
    
    require_once (dirname(__FILE__).'/../db.php');
	
	$con = new DbCon();
	$conn = $con->conDb();
	$prdName = $_POST['prdName'];
	$price = $_POST['price'];
	$macprice = $_POST['macprice'];
	$des = $_POST['des'];
	$mordes = $_POST['mordes'];
	$serice = $_POST['serice'];
	$code = $_POST['code'];
	$pic = $_POST['pic'];
	$sql = "INSERT INTO product (prdName, price, macprice, des, mordes, serice,code,pic) VALUES ('$prdName', '$price', '$macprice', '$des', '$mordes', '$serice','$code','$pic')";
	if(!isset($prdName) || !isset($price) || !isset($macprice) || !isset($des) || !isset($mordes) || !isset($serice) || !isset($code) || !isset($pic)){
		$result = array(
		    "error_code" => 4001,
		    "message" => "产品信息不全"
   		);
		echo json_encode($result);
	}else{
		$sql2 = "SELECT code FROM product WHERE code='$code'";
		if($conn->query($sql2)==TRUE){
			$result=$conn->query($sql2);
			$row=mysqli_fetch_array($result,MYSQLI_NUM);
			if(!$row){
				if ($conn->query($sql) === TRUE) {
					$result = array(
					    "error_code" => 200,
					    "message" => "添加成功"
			   		);
			         echo json_encode($result);
				} else {
					$result = array(
					    "error_code" => 4000,
					    "message" => "添加失败"
			   		);
				     echo json_encode($result);
				}
			}else{
				$result = array(
				    "error_code" => 4002,
				    "message" => "产品存在"
		   		);
			     echo json_encode($result);
			}
		}
	}
		
?>