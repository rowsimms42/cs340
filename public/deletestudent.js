function deleteStudent(student_id){
    $.ajax({
        url: '/students/' + student_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};