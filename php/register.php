<?php
//设置响应头
header("Content-type:text/html;charset=utf-8");

//连接数据库
$link = mysqli_connect("localhost","root","","hh");
//设置编码
mysqli_set_charset($link,"utf8");
//获取数据
$u = $_REQUEST["uname"];
$p = $_REQUEST["pwd"];
if($u && $p){
    //执行SQL语句
    $sql = "select * from user where zhanghao='$u'";
    $result = mysqli_query($link,$sql);
    $row = mysqli_fetch_assoc($result);

    if($row == true){
        echo "账号已被注册";
    }else{
        //添加数据
        $sql2 = "insert into user values('$u','$p')";
        if(mysqli_query($link,$sql2)){
            echo "账号注册成功";
        }else{
            echo "错误";
        }
    }
}
//关闭连接
mysqli_close($link);
?>