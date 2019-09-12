<?php
require_once('functions.php');
require_once('db_connection.php');
set_exception_handler('error_handler');

startUp();

$json_input = file_get_contents('php://input');
$obj = json_decode($json_input, true);

$ingredient = $obj['ingredient_desc'];
// $ingredient = $_POST['ingredient_desc'];
// print($ingredident);
;

$query = "INSERT INTO `shopping_list`(ingredient_text,is_completed) VALUES ('$ingredient', 0)";
// $query = "INSERT INTO `recipe_ingredients`(ingredients_desc, recipe_id) VALUES ('$ingredient', null)"
// $query = "SELECT * FROM `shopping_list` JOIN `recipe_ingredients` ON `shopping_list`.`ingredients_Id` = `recipe_ingredients`.`id`";
// $query = "SELECT * FROM `shopping_list`";

$result = mysqli_query($conn, $query);


if (!$result) {
  throw new Exception(mysqli_connect_error());
} else if (!mysqli_num_rows($result) && !empty($_GET['id'])) {
  throw new Exception('Invalid ID: ' . $_GET['id']);
}

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
};

print(json_encode($output))
?>
