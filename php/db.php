<?php

     class DbCon{
     	private $host = 'hdm184708359.my3w.com';
		private $user = 'hdm184708359';
		private $password = '19880811';
	    private $database = 'hdm184708359_db';
		function conDb(){
			$conn = new mysqli($this->host, $this->user, $this->password, $this->database);
			$conn->query("set names utf8");
			if ($conn->connect_error) {
			    die("连接失败: " . $conn->connect_error);
				return "connect error";
			}else{
				return $conn;
			}
			
		}
     }

?>