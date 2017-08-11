<?php

require_once (dirname(__FILE__).'/db.php');

$name = "jianyu";

$sql = "INSERT INTO user (nikename, openid) VALUES ('$name','dasfkhakjaskdn')";

$con = new DbCon();

$conn = $con->conDb();

if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>