<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/mNACTEC_Radio/archivosExternos/ti.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
        <?php startblock('titulo') ?>
        <?php endblock() ?>
    </title>

    <?php startblock('imports') ?>
    <?php endblock() ?>


    <link rel="stylesheet" href="css/tv.css">
    <link rel="stylesheet" href="js/avatar.js">
    <link rel="stylesheet" href="archivosExternos/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/unselectable.css" />


    <script src="archivosExternos/js/jquery-3.4.1.min.js"></script>
    <script src="archivosExternos/js/popper.min.js"></script>
    <script src="archivosExternos/js/bootstrap.min.js"></script>
    <!--
    <script src="https://www.amcharts.com/lib/4/core.js"></script>
    <script src="https://www.amcharts.com/lib/4/maps.js"></script>
    <script src="https://www.amcharts.com/lib/4/geodata/worldLow.js"></script>
    <script src="https://www.amcharts.com/lib/4/themes/dataviz.js"></script>
-->
</head>

<body>
    <div class="container-fluid">
        <img id="botonAtras" src="img/iconhome.png" alt="" onclick="goBack()">
        <div class="page-wrap">

            <?php startblock('main') ?>
            <?php endblock() ?>
        </div>
    </div>
</body>
<script>
    function goBack() {
        //alert
        window.history.back();
    }
</script>

</html>