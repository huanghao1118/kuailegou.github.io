<?php
// 设置响应头，防止乱码
header("Content-type:text/html;charset=utf-8");
// 连接数据库
$link = mysqli_connect('localhost','root','','hh');
// 设置编码
mysqli_set_charset($link,"utf8");
// 判断登入方式是  快捷登录/普通账号密码登录
if(isset($_REQUEST["phone"])){
    $u = $_REQUEST["phone"];
    # 执行sql语句，并返回结果集
    $sql = "select * from phone where haoma='$u'";
    $result = mysqli_query($link,$sql);
    //判断当前结果集中是否存在数据
    if(mysqli_fetch_assoc($result)){
        echo '存在';
    }else{
        echo '不存在';
    }
    //关闭连接
    mysqli_close($link);
}else{
    $u = $_REQUEST["uname"];
    $p = $_REQUEST["pwd"];
      # 执行sql语句，并返回结果集
      $sql = "select * from user where zhanghao='$u' and password='$p'";
      $result = mysqli_query($link,$sql);
      //判断当前结果集中是否存在数据
    if(mysqli_fetch_assoc($result)){
        echo '存在';
    }else{
        echo '不存在';
    }
    //关闭连接
    mysqli_close($link);
}

?>