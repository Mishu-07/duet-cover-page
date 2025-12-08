document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const elements = {
        // Dropdown
        courseSelect: document.getElementById('course-select'),
        
        // Inputs
        courseCodeInput: document.getElementById('course-code'),
        courseTitleInput: document.getElementById('course-title'),
        dateOfAllocationInput: document.getElementById('date-of-allocation'),
        dateOfSubmissionInput: document.getElementById('date-of-submission'),
        reportNoInput: document.getElementById('report-no'),
        reportNameInput: document.getElementById('report-name'),
        submittedToName1Input: document.getElementById('submitted-to-name-1'),
        submittedToDesignation1Input: document.getElementById('submitted-to-designation-1'),
        submittedToDept1Input: document.getElementById('submitted-to-dept-1'),
        submittedToCampus1Input: document.getElementById('submitted-to-campus-1'),
        submittedToName2Input: document.getElementById('submitted-to-name-2'),
        submittedToDesignation2Input: document.getElementById('submitted-to-designation-2'),
        submittedToDept2Input: document.getElementById('submitted-to-dept-2'),
        submittedToCampus2Input: document.getElementById('submitted-to-campus-2'),
        studentNameInput: document.getElementById('student-name'),
        studentIdInput: document.getElementById('student-id'),
        yearSemesterInput: document.getElementById('year-semester'),
        sectionInput: document.getElementById('section'),

        // Outputs
        courseCodeOutput: document.getElementById('output-course-code'),
        courseTitleOutput: document.getElementById('output-course-title'),
        dateOfAllocationOutput: document.getElementById('output-date-of-allocation'),
        dateOfSubmissionOutput: document.getElementById('output-date-of-submission'),
        reportNoOutput: document.getElementById('output-report-no'),
        reportNameOutput: document.getElementById('output-report-name'),
        submittedToName1Output: document.getElementById('output-submitted-to-name-1'),
        submittedToDesignation1Output: document.getElementById('output-submitted-to-designation-1'),
        submittedToDept1Output: document.getElementById('output-submitted-to-dept-1'),
        submittedToCampus1Output: document.getElementById('output-submitted-to-campus-1'),
        submittedToName2Output: document.getElementById('output-submitted-to-name-2'),
        submittedToDesignation2Output: document.getElementById('output-submitted-to-designation-2'),
        submittedToDept2Output: document.getElementById('output-submitted-to-dept-2'),
        submittedToCampus2Output: document.getElementById('output-submitted-to-campus-2'),
        studentNameOutput: document.getElementById('output-student-name'),
        studentIdOutput: document.getElementById('output-student-id'),
        yearSemesterOutput: document.getElementById('output-year-semester'),
        sectionOutput: document.getElementById('output-section'),

        // Buttons & Page
        generatePdfBtn: document.getElementById('generate-pdf'),
        generateJpgBtn: document.getElementById('generate-jpg'),
        printPdfBtn: document.getElementById('print-pdf'),
        coverPage: document.getElementById('cover-page'),
        watermarkContainer: document.querySelector('.watermark-container')
    };

    // --- Course Data (2 Teachers Support) ---
    const courseData = [
        {
            id: "cse3222",
            code: "CSE 3222",
            title: "Operating System Sessional",
            teacher1: {
                name: "Dr. Md. Nasim Akter",
                designation: "Professor",
                dept: "Dept. of CSE",
                campus: "DUET, Gazipur"
            },
            teacher2: {
                name: "Dr. Momotaz Begum",
                designation: "Professor",
                dept: "Dept. of CSE",
                campus: "DUET, Gazipur"
            }
        },
        {
            id: "cse3214",
            code: "CSE 3214",
            title: "Computer Networks Sessional",
            teacher1: {
                name: "Dr. Momotaz Begum",
                designation: "Professor",
                dept: "Dept. of CSE",
                campus: "DUET, Gazipur"
            },
            teacher2: {
                name: "Dr. Md. Obaidur Rahman",
                designation: "Professor",
                dept: "Dept. of CSE",
                campus: "DUET, Gazipur"
            }
        },
        {
            id: "hum3216",
            code: "HUM 3216",
            title: "Industrial Management and Law",
            teacher1: {
                name: "Mr. Abul Kalam",
                designation: "Associate Professor",
                dept: "Dept. of Humanities",
                campus: "DUET, Gazipur"
            },
            teacher2: {
                name: "Ms. Fatema Tuj Zohra",
                designation: "Lecturer",
                dept: "Dept. of Humanities",
                campus: "DUET, Gazipur"
            }
        }
    ];

    // --- Default Data ---
    const defaultData = {
        courseCode: "",
        courseTitle: "",
        dateOfAllocation: "",
        dateOfSubmission: "",
        reportNo: "                         ",
        reportName: "",
        submittedToName1: "",
        submittedToDesignation1: "",
        submittedToDept1: "",
        submittedToCampus1: "",
        submittedToName2: "",
        submittedToDesignation2: "",
        submittedToDept2: "",
        submittedToCampus2: "",
        studentName: "",
        studentId: "",
        yearSemester: "4th Year and 1st Semester",
        section: "B"
    };

    // --- Utility Functions ---

    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
            const correctedDate = new Date(date.getTime() + userTimezoneOffset);
            
            return correctedDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '-');
        } catch (e) {
            console.error("Invalid date:", dateString, e);
            return ""; 
        }
    };

    const updatePreview = () => {
        elements.courseCodeOutput.textContent = elements.courseCodeInput.value;
        elements.courseTitleOutput.textContent = elements.courseTitleInput.value;
        elements.reportNoOutput.textContent = elements.reportNoInput.value;
        elements.reportNameOutput.textContent = elements.reportNameInput.value;

        // --- NEW: Handle Alignment for Report Name ---
        const reportNameParent = elements.reportNameOutput.parentElement;
        if (!elements.reportNameInput.value) {
            // If empty, move to left to leave space for writing
            reportNameParent.style.textAlign = 'left';
            reportNameParent.style.paddingLeft = '1cm'; // Optional indent
        } else {
            // If text exists, center it
            reportNameParent.style.textAlign = 'center';
            reportNameParent.style.paddingLeft = '0';
        }
        // ---------------------------------------------

        // Submitted To - Teacher 1
        elements.submittedToName1Output.textContent = elements.submittedToName1Input.value;
        elements.submittedToDesignation1Output.textContent = elements.submittedToDesignation1Input.value;
        elements.submittedToDept1Output.textContent = elements.submittedToDept1Input.value;
        elements.submittedToCampus1Output.textContent = elements.submittedToCampus1Input.value;

        // Submitted To - Teacher 2
        elements.submittedToName2Output.textContent = elements.submittedToName2Input.value;
        elements.submittedToDesignation2Output.textContent = elements.submittedToDesignation2Input.value;
        elements.submittedToDept2Output.textContent = elements.submittedToDept2Input.value;
        elements.submittedToCampus2Output.textContent = elements.submittedToCampus2Input.value;

        // Submitted By
        elements.studentNameOutput.textContent = elements.studentNameInput.value;
        elements.studentIdOutput.textContent = elements.studentIdInput.value;
        elements.yearSemesterOutput.textContent = elements.yearSemesterInput.value;
        elements.sectionOutput.textContent = elements.sectionInput.value;

        // Dates
        elements.dateOfAllocationOutput.textContent = formatDate(elements.dateOfAllocationInput.value);
        elements.dateOfSubmissionOutput.textContent = formatDate(elements.dateOfSubmissionInput.value);
    };

    const loadData = () => {
        const savedData = localStorage.getItem('duetCoverPageData');
        const data = savedData ? JSON.parse(savedData) : defaultData;

        elements.courseCodeInput.value = data.courseCode || "";
        elements.courseTitleInput.value = data.courseTitle || "";
        elements.dateOfAllocationInput.value = data.dateOfAllocation || "";
        elements.dateOfSubmissionInput.value = data.dateOfSubmission || "";
        elements.reportNoInput.value = data.reportNo || "";
        elements.reportNameInput.value = data.reportName || "";
        
        elements.submittedToName1Input.value = data.submittedToName1 || "";
        elements.submittedToDesignation1Input.value = data.submittedToDesignation1 || "";
        elements.submittedToDept1Input.value = data.submittedToDept1 || "";
        elements.submittedToCampus1Input.value = data.submittedToCampus1 || "";
        
        elements.submittedToName2Input.value = data.submittedToName2 || "";
        elements.submittedToDesignation2Input.value = data.submittedToDesignation2 || "";
        elements.submittedToDept2Input.value = data.submittedToDept2 || "";
        elements.submittedToCampus2Input.value = data.submittedToCampus2 || "";
        
        elements.studentNameInput.value = data.studentName || "";
        elements.studentIdInput.value = data.studentId || "";
        elements.yearSemesterInput.value = data.yearSemester || "";
        elements.sectionInput.value = data.section || "";

        updatePreview();
    };

    const saveData = () => {
        const currentData = {
            courseCode: elements.courseCodeInput.value,
            courseTitle: elements.courseTitleInput.value,
            dateOfAllocation: elements.dateOfAllocationInput.value,
            dateOfSubmission: elements.dateOfSubmissionInput.value,
            reportNo: elements.reportNoInput.value,
            reportName: elements.reportNameInput.value,
            
            submittedToName1: elements.submittedToName1Input.value,
            submittedToDesignation1: elements.submittedToDesignation1Input.value,
            submittedToDept1: elements.submittedToDept1Input.value,
            submittedToCampus1: elements.submittedToCampus1Input.value,
            
            submittedToName2: elements.submittedToName2Input.value,
            submittedToDesignation2: elements.submittedToDesignation2Input.value,
            submittedToDept2: elements.submittedToDept2Input.value,
            submittedToCampus2: elements.submittedToCampus2Input.value,
            
            studentName: elements.studentNameInput.value,
            studentId: elements.studentIdInput.value,
            yearSemester: elements.yearSemesterInput.value,
            section: elements.sectionInput.value,
        };
        localStorage.setItem('duetCoverPageData', JSON.stringify(currentData));
    };

    const addWatermark = () => {
        const watermarkImg = new Image();
        watermarkImg.src = 'duet_logo_watermark.png'; 
        watermarkImg.className = 'watermark';
        watermarkImg.onerror = () => {
            console.warn("Could not load 'duet_logo_watermark.png'. Using main logo as fallback.");
            watermarkImg.src = 'duet_logo.png';
            watermarkImg.onerror = null; 
        };
        elements.watermarkContainer.appendChild(watermarkImg);
    };

    const createPdfObject = async () => {
        updatePreview();
        saveData();

        if (typeof window.jspdf === 'undefined') {
            alert("jsPDF library not loaded!");
            throw new Error("jsPDF missing");
        }

        const coverPage = elements.coverPage;
        coverPage.classList.add('capture-mode');

        try {
            const canvas = await html2canvas(coverPage, {
                scale: 3, 
                useCORS: true,
                onclone: (clonedDoc) => {
                    clonedDoc.getElementById('cover-page').classList.add('capture-mode');
                }
            });

            coverPage.classList.remove('capture-mode');
            const imgData = canvas.toDataURL('image/jpeg', 0.98); 

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4'); 
            
            const pdfWidth = 210;
            const pdfHeight = 297;
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            
            return pdf;

        } catch (error) {
            coverPage.classList.remove('capture-mode');
            console.error("Error generating PDF:", error);
            throw error;
        }
    };

    // --- Button Handlers ---

    const handlePdfDownload = async () => {
        const originalText = elements.generatePdfBtn.innerHTML;
        elements.generatePdfBtn.textContent = "Generating PDF...";
        
        try {
            const pdf = await createPdfObject();
            const fileName = `Cover - ${elements.courseCodeInput.value || 'Report'}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error(error);
            elements.generatePdfBtn.textContent = "Error!";
        } finally {
            setTimeout(() => { elements.generate
