const submitBtn = document.getElementById("submit");
const nameInput = document.getElementById("name");
const student_id = document.getElementById("student_id");
const Email_ID = document.getElementById("Email_ID");
const contact = document.getElementById("contact");
const table = document.querySelector("table"); 

let studentList = JSON.parse(localStorage.getItem("students")) || [];
let idx = null;
renderTable();
let isValid=true;
    // Validation Logic
function validation() {
    

    const name = nameInput.value.trim();
    const studentId = student_id.value.trim();
    const email = Email_ID.value.trim();
    const contactvalue = contact.value.trim();
    const errorSpan = document.getElementById("error");
    const contactRegex = /^\d{10}$/;
    const studentIdRegex=/^\d+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !studentId || !email || !contact) {
        errorSpan.innerHTML="All fields are required!";
        isValid=false;
    }
    else if (!nameRegex.test(name)) {
        errorSpan.innerHTML="Please enter a valid name (letters only).";
        isValid=false;
    }
    else if (!studentIdRegex.test(studentId)) {
        errorSpan.innerHTML="Please enter a valid id (numbers only).";
        isValid=false;
    }
    else if (!emailRegex.test(email)) {
        errorSpan.innerHTML="Please enter a valid email address.";
        isValid=false;
    }
    else if (!contactRegex.test(contactvalue)) {
        errorSpan.innerHTML="Contact number must be exactly 10 digits.";
        isValid=false;
    }
    else{
        errorSpan.innerHTML="";
        isValid=true;
    }
}
submitBtn.addEventListener('click', function addtoarray() {
    validation()
    if(isValid){
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
    clearForm();
    idx=null;
    }
    
    
    saveToLocalStorage();
    renderTable();
    
    
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