$(document).ready(function(){
    
     $('.scrollbar-macosx').scrollbar();
    
    $('#section-chat').animate({"scrollTop": $('#section-chat')[0].scrollHeight}, "slow");
    console.log("hello");
    $("#ItemUser").click(function(){
        $("#logo").text("PROFILE");
        $("#ItemUser").addClass("active");
        $("#ItemMessage").removeClass("active");
        $("#ItemContact").removeClass("active");
        $("#ItemNotification").removeClass("active");
        $("#User").show();
        $("#Message").hide();
        $("#Contact").hide();
        $("#Notification").hide();
        console.log("hello");
   }) ;
    $("#ItemMessage").click(function(){
        $("#logo").text("MESSAGE");
        $("#ItemMessage").addClass("active");
        $("#ItemUser").removeClass("active");
        $("#ItemContact").removeClass("active");
        $("#ItemNotification").removeClass("active");
        $("#Message").show();
        $("#User").hide();
        $("#Contact").hide();
        $("#Notification").hide();
        console.log("hello");
   }) ;
    $("#ItemContact").click(function(){
        $("#logo").text("CONTACT");
        $("#ItemContact").addClass("active");
        $("#ItemUser").removeClass("active");
        $("#ItemMessage").removeClass("active");
        $("#ItemNotification").removeClass("active");
        $("#Contact").show();
        $("#Message").hide();
        $("#User").hide();
        $("#Notification").hide();
        $('.scrollbar-macosx').scrollbar();
        $('#Contact .scrollbar-macosx').css("height","calc(100% - 90px)");
        console.log("hello");
   }) ;
    
    $("#ItemNotification").click(function(){
        $("#logo").text("Notification");
        $("#ItemNotification").addClass("active");
        $("#ItemUser").removeClass("active");
        $("#ItemMessage").removeClass("active");
        $("#ItemContact").removeClass("active");
        $("#Notification").show();
        $("#Message").hide();
        $("#User").hide();
        $("#Contact").hide();
        $('.scrollbar-macosx').scrollbar();
        $('#Notification .scrollbar-macosx').css("height","calc(100% - 90px)");
        console.log("hello");
   }) ;
    
    $("#menu-toggle").click(function(e){
        e.preventDefault();
        //$('html').toggleClass('menu-active');
        $('#sidebar').toggleClass('toggled');
    });
    
   $('#button-check').hide();
        function changePicture(){
            $('#upload').click();
        }
        
        function readURL(input)
        {
            if (input.files && input.files[0])
            {
                var reader = new FileReader();
                reader.onload = function (e)
                {
                    $('#image')
                    .attr('src',e.target.result);

                };
                reader.readAsDataURL(input.files[0]);
            }
            $('#button-check').show();
        }

        $(document).ready(function() {

             $('#uploadForm').submit(function() {
                 $("#status").empty().text("File is uploading...");
            

                $(this).ajaxSubmit({

                    error: function(xhr) {
                            status('Error: ' + xhr.status);
                    },

                    success: function(response) {
                            console.log(response);
                        
                            $("#status").empty().text(response);
                    }
            });
                 $('#button-check').hide();
            return false;
    });   
    
});
});