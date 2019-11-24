<?php

$url = $_GET['url'];

if (substr($url, 0, 4) !== 'http') { 
    die();
}

header('Content-Encoding: UTF-8');
header('Content-Type: application/json');
echo(file_get_contents($url));
