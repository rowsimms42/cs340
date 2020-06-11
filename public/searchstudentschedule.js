function searchStudentSchedule() {
    var student_id_search_string  = document.getElementById('reg_student_id_search').value;
    window.location = '/students/search/' + encodeURI(student_id_search_string);
}