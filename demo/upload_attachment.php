<?php

$uploadFolder = __DIR__ . '/../data/';
$onlinePath = 'http://localhost/inlineattachment/data/';

$response = array();

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $filename = uniqid() . '.' . (pathinfo($file['name'], PATHINFO_EXTENSION) ? : 'png');

    move_uploaded_file($file['tmp_name'], $uploadFolder . $filename);

    $response['filename'] = $onlinePath . $filename;
} else {
    $response['error'] = 'Error while uploading file';
}

echo json_encode($response);