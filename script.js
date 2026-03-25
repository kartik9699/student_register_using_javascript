const submitBtn = document.getElementById("submit");
const nameInput = document.getElementById("name");
const student_id = document.getElementById("student_id");
const Email_ID = document.getElementById("Email_ID");
const contact = document.getElementById("contact");
const table = document.querySelector("table"); 

let studentList = JSON.parse(localStorage.getItem("students")) || [];
let idx = null;
renderTable();
submitBtn.addEventListener('click', function addtoarray() {
    if(idx==null){
    const obj = {
        name: nameInput.value,
        student_id: student_id.value,
        Email_ID: Email_ID.value,
        contact: contact.value
    };

    studentList.push(obj);
    }else{
        studentList[idx]['name']=nameInput.value;
        studentList[idx]['student_id']=student_id.value;
        studentList[idx]['Email_ID']=Email_ID.value;
        studentList[idx]['contact']=contact.value;
    }
    
    saveToLocalStorage();
    renderTable();
    idx=null;
    clearForm();
});

function renderTable() {
    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    studentList.forEach((student, index) => {
        const row = table.insertRow(); 
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.student_id}</td>
            <td>${student.Email_ID}</td>
            <td>${student.contact}</td>
            <td>
                <button class="btn-edit" onclick="editForm(${index})"><i class="fa-solid fa-pen-to-square"></i></button><button class="btn-delete" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
    });
}
function deleteStudent(index){
    studentList.splice(index,1)
    saveToLocalStorage();
    renderTable()
}
function clearForm() {
    nameInput.value = "";
    student_id.value = "";
    Email_ID.value = "";
    contact.value = "";
}
function editForm(index){
    nameInput.value=studentList[index]['name'];
    student_id.value = studentList[index]['student_id'];
    Email_ID.value = studentList[index]['Email_ID'];
    contact.value = studentList[index]['contact'];
    idx=index;
}
function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(studentList));
}