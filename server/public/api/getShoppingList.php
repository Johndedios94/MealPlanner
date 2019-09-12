<?php
require_once('functions.php');
require_once('db_connection.php');
set_exception_handler('error_handler');

startUp();

//work on query
$query = "(
    SELECT shopping_list.id, shopping_list.is_completed, recipe_ingredients.ingredients_desc
    FROM `shopping_list`
    JOIN `recipe_ingredients` ON `shopping_list`.`ingredients_Id` = `recipe_ingredients`.`id`
)
UNION
(
	SELECT id, is_completed, ingredient_text AS ingredients_desc
    FROM `shopping_list`
    WHERE ingredients_id IS NULL
)
ORDER BY id ASC";


// $query= "SELECT * FROM `shopping_list` JOIN `recipe_ingredients` ON `shopping_list`.`ingredients_Id` = `recipe_ingredients`.`id`";
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

print(json_encode($output));


?>
