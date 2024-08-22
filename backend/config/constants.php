<?php

$constants = [
];

$path = base_path() . '/constants/' . env('APP_ENV') . '_constants.php';

if (file_exists($path)) {
    require(base_path() . '/constants/' . env('APP_ENV') . '_constants.php');

    $environment_constants = ${env('APP_ENV') . '_constants'};

    return array_merge($environment_constants, $constants);
}

return $constants;
