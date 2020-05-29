function updateStudent(student_id){
    $.ajax({
        url: '/students/' + student_id,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};