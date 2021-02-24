<?php
    // 设置响应头
    header("Content-type:text/html;charset=utf-8");
    // 获取数据
    $ss = $_REQUEST["sousuo"];
    // 链接数据库
    $link = mysqli_connect("localhost","root","","hh");
    // 设置编码
    mysqli_set_charset($link,"utf8");
    // 执行sql语句
    $sql = "select * from webpage where goods_name like '%$ss%'";
    $result = mysqli_query($link,$sql);
    // 创建数组
    $arr = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($arr,$row);
    }
    echo json_encode($arr);
    // 关闭链接
    mysqli_close($link);
?>