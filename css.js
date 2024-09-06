const registrationInfo = document.getElementById('registrationForm');
const studentName = document.getElementById('name');
const studentId = document.getElementById('studentID');
const emailId = document.getElementById('emailID');
const contact = document.getElementById('contact');

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addStudent();
});

let students = [];

function addStudent() {
    const studentName = document.getElementById('name').value;
    const studentId = document.getElementById('studentID').value;
    const emailId = document.getElementById('emailID').value;
    const contact = document.getElementById('contact').value;

    const student = { studentName, studentId, emailId, contact };
    students.push(student);
    displayStudents();
    clearForm();

        // Saving details to local storage

    localStorage.setItem('registrationForm', JSON.stringify(student));

    alert('Form submitted successfully!');

    // Retrieve data on page load
    window.onload = function() {
        const savedData = JSON.parse(localStorage.getItem('registrationForm'));
        if (savedData) {
            document.getElementById('name').value = savedData.name;
            document.getElementById('studentID').value = savedData.studentId;
            document.getElementById('emailID').value = savedData.email
            document.getElementById('contact').value = savedData.contact;
        }
    };
}

function displayStudents() {
    const tbody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    students.forEach((student, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = student.studentName;
        row.insertCell(1).innerText = student.studentId;
        row.insertCell(2).innerText = student.emailId;
        row.insertCell(3).innerText = student.contact;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editStudent(${index})">Edit</button>
                                 <button onclick="deleteStudent(${index})">Delete</button>`;
    });
}

function clearForm() {
    document.getElementById('registrationForm').reset();
}

// Edit section
function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.studentName;
    document.getElementById('studentID').value = student.studentId;
    document.getElementById('emailID').value = student.email
    document.getElementById('contact').value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}
