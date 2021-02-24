$(".icon-erweima").hover(function(){
    // $(this).find("img").css("display","block")
    // $(this).find("i").css("display","block")
    $(this).find("img").stop().show(1000, 'linear')
    $(this).find("i").stop().fadeToggle(1000, 'linear')
},function(){
    // $(this).find("img").css("display","none")
    // $(this).find("i").css("display","none")
    $(this).find("img").stop().hide(1000, 'linear')
    $(this).find("i").stop().fadeToggle(1000, 'linear')
})