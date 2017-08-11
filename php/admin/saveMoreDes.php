<?php

	$allowedExts = array('gif','jpeg','jpg','png');
	$temp = explode(".", $_FILES["upfile"]["name"]);
	$extension = end($temp);
	$pic = sha1(strtotime('now')).".png";
	if ((($_FILES["upfile"]["type"] == "image/gif")
		|| ($_FILES["upfile"]["type"] == "image/jpeg")
		|| ($_FILES["upfile"]["type"] == "image/jpg")
		|| ($_FILES["upfile"]["type"] == "image/pjpeg")
		|| ($_FILES["upfile"]["type"] == "image/x-png")
		|| ($_FILES["upfile"]["type"] == "image/png"))
		&& ($_FILES["upfile"]["size"] < 2097152)   // 小于 200 kb
		&& in_array($extension, $allowedExts))
	{
		if ($_FILES["upfile"]["error"] > 0)
		{
			echo "错误：: " . $_FILES["upfile"]["error"] . "<br>";
		}
		else
		{
			// 判断当期目录下的 upload 目录是否存在该文件
			// 如果没有 upload 目录，你需要创建它，upload 目录权限为 777
			
			$dir = iconv('UTF-8', "GBK", "../../img/upload/".date("Y-m-d"));
			if(!file_exists($dir)){
				mkdir($dir,0777,true);
			};
			
			if (file_exists("../../img/upload/".date("Y-m-d")."/". $pic))
			{
			    $result = array(
				    "error_code" => 3000,
				    "message" => "文件已经存在"
				);
				echo json_encode($result);
			}
			else
			{
				// 如果 upload 目录不存在该文件则将文件上传到 upload 目录下
				move_uploaded_file($_FILES["upfile"]["tmp_name"], "../../img/upload/".date("Y-m-d")."/".$pic);
				$result = array(
				    "error_code" => 200,
				    "message" => "上传成功",
				    "src" => "../../img/upload/".date("Y-m-d")."/".$pic
				);
				echo json_encode($result);
			}
		}
	}
	else
	{
		echo "非法的文件格式";
	}
			
?>