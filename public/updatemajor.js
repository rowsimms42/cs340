function updateMajor(major_id){
    $.ajax({
        url: '/majors/' + major_id,
        type: 'PUT',
        data: $('#update-major').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};