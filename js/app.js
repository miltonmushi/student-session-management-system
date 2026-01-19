let students = [];
let sessions = [];

let editingStudentId = null;

// save data to LocalStorage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function saveSessions() {
    localStorage.setItem("sessions", JSON.stringify(sessions));
}

// load data from LocalStorage
function loadStudents() {
    const data = localStorage.getItem("students");
    if (data) {
        students = JSON.parse(data);
    }
}

function loadSessions() {
    const data = localStorage.getItem("sessions");
    if (data) {
        sessions = JSON.parse(data);
    }
}

const studentForm = document.getElementById("student-form");
const sessionForm = document.getElementById("session-form");

const studentTableBody = document.getElementById("student-table-body");
const sessionTableBody = document.getElementById("session-table-body");

const sessionStudentSelect = document.getElementById("session-student");

// name validation function: letters only and min 2 characters
function isValidName(value) {
    return /^[A-Za-z]{2,}$/.test(value.trim());
}

// handle student form submission
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("student-first-name").value.trim();
    const lastName = document.getElementById("student-last-name").value.trim();
    const course = document.getElementById("student-course").value;
    const year = document.getElementById("student-year").value;
    const error = document.getElementById("student-error");

    error.textContent = "";

    // name validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
        error.textContent = "Name must contain only letters and be at least 2 characters.";
        return;
    }

    // check for  duplicate student
    const duplicate = students.find(student =>
        student.firstName.toLowerCase() === firstName.toLowerCase() &&
        student.lastName.toLowerCase() === lastName.toLowerCase() &&
        student.course === course
    );

    if (duplicate) {
        error.textContent = "This student already exists.";
        return;
    }

    // create student
    const student = {
        id: Date.now(),
        firstName,
        lastName,
        course,
        year
    };

    students.push(student);
    saveStudents();
    renderStudents();
    studentForm.reset();
});

document.getElementById("clear-student").addEventListener("click", () => {
    studentForm.reset();
    document.getElementById("student-error").textContent = "";
});

// edit student details
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    editingStudentId = id;

    document.getElementById("edit-first-name").value = student.firstName;
    document.getElementById("edit-last-name").value = student.lastName;
    document.getElementById("edit-error").textContent = "";

    document.getElementById("edit-modal").classList.remove("hidden");
}

document.getElementById("cancel-edit").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
});

document.getElementById("save-edit").addEventListener("click", () => {
    const firstName = document.getElementById("edit-first-name").value.trim();
    const lastName = document.getElementById("edit-last-name").value.trim();
    const errorEl = document.getElementById("edit-error");

    if (!isValidName(firstName) || !isValidName(lastName)) {
        errorEl.textContent = "Names must contain only letters and be at least 2 characters.";
        return;
    }

    const student = students.find(s => s.id === editingStudentId);
    if (!student) return;
        
    student.firstName = firstName;
    student.lastName = lastName;

    saveStudents();
    renderStudents();

    document.getElementById("edit-modal").classList.add("hidden");
});

// delete student and related sessions
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    sessions = sessions.filter(session => session.studentId !== id);

    saveStudents();
    saveSessions();
    renderStudents();
    renderSessions();
}

// render students table and dropdown
function renderStudents() {
    studentTableBody.innerHTML = "";

    students.forEach(function (student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

    populateStudentDropdown();
}

sessionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentId = Number(sessionStudentSelect.value);
    const date = document.getElementById("session-date").value;
    const duration = Number(document.getElementById("session-duration").value);

    const module = document.getElementById("session-module").value.trim();
    const error = document.getElementById("session-error");

    error.textContent = "";

    if (!studentId) {
        error.textContent = "Please select a student.";
        return;
    }

    // Business rule: no duplicate session on the same date
    const duplicate = sessions.find(
        s => s.studentId === studentId && s.date === date
    );

    if (duplicate) {
        error.textContent ="This student already has a session on this date.";
        return;
    }

    const session = {
        id: Date.now(),
        studentId,
        date,
        duration,
        module
    };

    sessions.push(session);
    saveSessions();
    renderSessions();
    sessionForm.reset();
});

document.getElementById("clear-session").addEventListener("click", () => {
    sessionForm.reset();
    document.getElementById("session-error").textContent = "";
    sessionStudentSelect.selectedIndex = 0;
})

// delete session
function deleteSession(id) {
    sessions = sessions.filter(session => session.id !== id);
    saveSessions();
    renderSessions();
}

// render sessions table
function renderSessions() {
    sessionTableBody.innerHTML = "";

    sessions.forEach(session => {
        const student = students.find(s => s.id === session.studentId);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student ? student.firstName + " " + student.lastName : "Unknown"}</td>
            <td>${session.date}</td>
            <td>${session.duration}</td>
            <td>${session.module}</td>
            <td>
                <button onclick="deleteSession(${session.id})">Delete</button>
            </td>
        `;

        sessionTableBody.appendChild(row);
    });
}

// populate student dropdown for sessions
function populateStudentDropdown() {
    sessionStudentSelect.innerHTML = `<option value="">Select Student</option>`;

    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.firstName} ${student.lastName}`;
        sessionStudentSelect.appendChild(option);
    });
}

// prevent selecting past dates for sessions
function setMinSessionDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("session-date").min = today;
}

// initial app load
document.addEventListener("DOMContentLoaded", function() {
    setMinSessionDate();
    loadStudents();
    loadSessions();
    renderStudents();
    renderSessions();
});