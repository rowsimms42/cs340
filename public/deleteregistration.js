function deleteRegistration(registration_id){
    $.ajax({
        url: '/registrations/' + registration_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};