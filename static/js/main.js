$(document).ready( function() {
    $('.result').hide();
    $('.Fusarium').hide();
    $('.Curl').hide();
    $('.HPlant').hide();
    $('.HLeaf').hide();

    //image_preview 
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
        $('.result').text('');
        $('.result').show();
        $('.Fusarium').hide();
        $('.Curl').hide();
        $('.HPlant').hide();
        $('.HLeaf').hide();

    }); 	

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.result').fadeIn(600);
                $('.result').text(data);
                console.log(typeof(data))
                if(data == 'Fusarium Wilt'){
                    $('.Fusarium').show();
                    $('.Curl').hide();
                    $('.HPlant').hide();
                    $('.HLeaf').hide();}
                else if(data == 'Leaf Curl Disease'){
                    $('.Curl').show();
                    $('.Fusarium').hide();
                    $('.HPlant').hide();
                    $('.HLeaf').hide();}
                else if(data == 'Healthy Leaf'){
                    $('.HLeaf').show();
                    $('.Fusarium').hide();
                    $('.HPlant').hide();
                    $('.Curl').hide();}
                else if(data == 'Healthy Plant'){
                    $('.HPlant').show();
                    $('.Fusarium').hide();
                    $('.Curl').hide();
                    $('.HLeaf').hide();}
                
                console.log('Success!');
            },
        });
    });
});