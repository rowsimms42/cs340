function searchStudentSchedule() {
    //get the first name 
    var student_id_search_string  = document.getElementById('reg_student_id_search').value
    //construct the URL and redirect to it
    window.location = '/students/search/' + encodeURI(student_id_search_string)
}