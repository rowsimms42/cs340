function updateClass(class_id){
    $.ajax({
        url: '/classes/' + class_id,
        type: 'PUT',
        data: $('#update-class').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};