function updateDorm(dorm_id){
    $.ajax({
        url: '/dorms/' + dorm_id,
        type: 'PUT',
        data: $('#update-dorm').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};