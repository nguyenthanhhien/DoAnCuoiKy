$(document).ready(function(){
    
     $('.scrollbar-macosx').scrollbar();
    
    $('#section-chat').animate({"scrollTop": $('#section-chat')[0].scrollHeight}, "slow");
    console.log("hello");
    $("#ItemUser").click(function(){
        $("#logo").text("PROFILE");
        $("#ItemUser").addClass("active");
        $("#ItemMessage").removeClass("active");
        $("#ItemContact").removeClass("active");
        $("#User").show();
        $("#Message").hide();
        $("#Contact").hide();
        console.log("hello");
   }) ;
    $("#ItemMessage").click(function(){
        $("#logo").text("MESSAGE");
        $("#ItemMessage").addClass("active");
        $("#ItemUser").removeClass("active");
        $("#ItemContact").removeClass("active");
        $("#Message").show();
        $("#User").hide();
        $("#Contact").hide();
        console.log("hello");
   }) ;
    $("#ItemContact").click(function(){
        $("#logo").text("CONTACT");
        $("#ItemContact").addClass("active");
        $("#ItemUser").removeClass("active");
        $("#ItemMessage").removeClass("active");
        $("#Contact").show();
        $("#Message").hide();
        $("#User").hide();
        $('.scrollbar-macosx').scrollbar();
        $('#Contact .scrollbar-macosx').css("height","calc(100% - 90px)");
        console.log("hello");
   }) ;
    
    $("#menu-toggle").click(function(e){
        e.preventDefault();
        //$('html').toggleClass('menu-active');
        $('#sidebar').toggleClass('toggled');
    });
    
    
   
});