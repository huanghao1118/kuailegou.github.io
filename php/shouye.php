<?php
    //设置响应头
    header("Content-type:text/html;charset=utf-8");
    //连接数据库
    $link = mysqli_connect('localhost','root','','hh');
    //设置编码
    mysqli_set_charset($link,"utf8");
    //执行SQL语句
    $sql = "select * from webpage";
    $result = mysqli_query($link,$sql);
    $arr = array();
    while($row=mysqli_fetch_assoc($result)){
        array_push($arr,$row);
    }
    echo json_encode($arr);

    mysqli_close($link);
?>