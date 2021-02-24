$(".header_top_right li:nth-child(5)").hover(function(){
    // $(this).find("img").css("display","block")
    // $(this).find("img").stop().show(1000,"linear")
    // $(this).find("img").stop().slideDown(1000,"linear"
    $(this).find("img").stop().fadeIn(1000,"linear")
},function(){
    // $(this).find("img").css("display","none")
    // $(this).find("img").stop().hide(1000,"linear")
    // $(this).find("img").stop().slideUp(1000,"linear")
    $(this).find("img").stop().fadeOut(1000,"linear")
})
$(".header_footer>ul>li:first-of-type ").hover(function(){
    $(".header_footer_list").stop().slideDown(500,"linear")
},function(){
    $(".header_footer_list").stop().slideUp(500,"linear")
})