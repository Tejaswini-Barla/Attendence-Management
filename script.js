document.addEventListener("DOMContentLoaded", () => {
    const studentList = document.getElementById("student-list");
    const addStudentBtn = document.getElementById("add-student");
    const studentNameInput = document.getElementById("student-name");
    let attendanceRecords = JSON.parse(localStorage.getItem("attendance")) || [];

    function renderStudents() {
        studentList.innerHTML = "";
        attendanceRecords.forEach((student, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${student.name}</span>
                <button onclick="markAttendance(${index}, 'Present')">✅ Present</button>
                <button onclick="markAttendance(${index}, 'Absent')">❌ Absent</button>
                <span>${student.status || "Not Marked"}</span>
            `;
            studentList.appendChild(li);
        });
    }

    addStudentBtn.addEventListener("click", () => {
        const name = studentNameInput.value.trim();
        if (name) {
            attendanceRecords.push({ name, status: "Not Marked" });
            localStorage.setItem("attendance", JSON.stringify(attendanceRecords));
            studentNameInput.value = "";
            renderStudents();
        }
    });

    window.markAttendance = (index, status) => {
        attendanceRecords[index].status = status;
        localStorage.setItem("attendance", JSON.stringify(attendanceRecords));
        renderStudents();
    };

    renderStudents();
});
