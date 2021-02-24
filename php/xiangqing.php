<?php
// 响应头
header("Content-type:text/html;charset=utf-8");
// 获取数据
$xq = $_REQUEST["xiangqing"];
// 连接数据库
$link = mysqli_connect("localhost","root","","hh");
// 设置编码
mysqli_set_charset($link,"utf8");
// 执行sql语句，返回结果集
$sql = "select * from webpage where goods_id>=$xq limit 0,10";
$result = mysqli_query($link,$sql);
$arr = array();
while($row = mysqli_fetch_assoc($result)){
    array_push($arr,$row);
}
echo json_encode($arr);
// 关闭数据库连接
mysqli_close($link);
?>