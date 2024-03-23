<?php

foreach ($_POST as &$i) {
    $i = htmlspecialchars($i);
}

// print_r($_POST);
$from=$_POST['nom'].' '.$_POST['tel'].' '.$_POST['mail'];
$to='contact@physiovetoduleman.com';
$subject='Formulaire web : '.$_POST['nom'];
$headers='De :'.$from;
$message=$headers."\n".$_POST['text'];
mail($to, $subject, $message,$headers);

header('Location:./contact.html#mail-succes');
?>