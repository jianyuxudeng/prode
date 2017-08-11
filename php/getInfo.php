<?php
	require_once (dirname(__FILE__).'/db.php');
	
	$sql = "SELECT * FROM user WHERE id = 9";
	
	$con = new DbCon();
	
	$conn = $con->conDb();
	
	$result = $conn->query($sql);
	
	if ($result->num_rows>0) {
	    while($row = $result->fetch_assoc()) {
	    	    $data[] = $row;
		};
       $end = array(
           "data" => $data
	   );
	    echo json_encode($end);
	} else {
	    echo "no Data";
	}
	
	$conn->close();

?>