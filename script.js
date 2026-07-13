import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    increment,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
        yearSemesterInput: document.getElementById('year-semester'),
        sectionInput: document.getElementById('section'),
        reportNoInput: document.getElementById('report-no'),
        reportNameInput: document.getElementById('report-name'),
        
        // Shared Submitted To inputs
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

        // Report Mode Outputs
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
        watermarkContainer: document.querySelector('.watermark-container'),

        // Manage Courses Modal
        manageCoursesBtn: document.getElementById('manage-courses-btn'),
        modalOverlay: document.getElementById('course-modal-overlay'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        courseListContainer: document.getElementById('course-list'),
        courseForm: document.getElementById('course-form'),
        courseFormTitle: document.getElementById('course-form-title'),
        editCourseIdInput: document.getElementById('edit-course-id'),
        cancelEditBtn: document.getElementById('cancel-edit-btn'),
        modalCourseCode: document.getElementById('modal-course-code'),
        modalCourseTitle: document.getElementById('modal-course-title'),
        modalT1Name: document.getElementById('modal-t1-name'),
        modalT1Designation: document.getElementById('modal-t1-designation'),
        modalT1Dept: document.getElementById('modal-t1-dept'),
        modalT1Campus: document.getElementById('modal-t1-campus'),
        modalT2Name: document.getElementById('modal-t2-name'),
        modalT2Designation: document.getElementById('modal-t2-designation'),
        modalT2Dept: document.getElementById('modal-t2-dept'),
        modalT2Campus: document.getElementById('modal-t2-campus'),

        // Mode selector + declaration toggle
        modeRadios: document.querySelectorAll('input[name="cover-mode"]'),
        declarationToggle: document.getElementById('declaration-toggle'),
        fieldsReport: document.getElementById('fields-report'),
        fieldsGroup: document.getElementById('fields-group'),

        // Project mode inputs
        docTitleInput: document.getElementById('doc-title'),
        projectTitleInput: document.getElementById('project-title'),
        groupNoInput: document.getElementById('group-no'),
        groupMember1NameInput: document.getElementById('group-member-1-name'),
        groupMember1IdInput: document.getElementById('group-member-1-id'),
        groupMember2NameInput: document.getElementById('group-member-2-name'),
        groupMember2IdInput: document.getElementById('group-member-2-id'),
        groupMember3NameInput: document.getElementById('group-member-3-name'),
        groupMember3IdInput: document.getElementById('group-member-3-id'),
        groupMember3Fields: document.getElementById('group-member-3-fields'),
        toggleMember3Btn: document.getElementById('toggle-member-3-btn'),

        // Project mode outputs
        docTitleOutput: document.getElementById('output-doc-title'),
        projectTitleOutput: document.getElementById('output-project-title'),
        
        groupCourseCodeOutput: document.getElementById('output-group-course-code'),
        groupCourseTitleOutput: document.getElementById('output-group-course-title'),
        groupDateOfAllocationOutput: document.getElementById('output-group-date-of-allocation'),
        groupDateOfSubmissionOutput: document.getElementById('output-group-date-of-submission'),
        groupYearSemesterOutput: document.getElementById('output-group-year-semester'),
        groupSectionOutput: document.getElementById('output-group-section'),
        
        // Group Mode "Submitted To" outputs
        groupSubmittedToName1Output: document.getElementById('output-group-submitted-to-name-1'),
        groupSubmittedToDesignation1Output: document.getElementById('output-group-submitted-to-designation-1'),
        groupSubmittedToDept1Output: document.getElementById('output-group-submitted-to-dept-1'),
        groupSubmittedToCampus1Output: document.getElementById('output-group-submitted-to-campus-1'),
        groupSubmittedToName2Output: document.getElementById('output-group-submitted-to-name-2'),
        groupSubmittedToDesignation2Output: document.getElementById('output-group-submitted-to-designation-2'),
        groupSubmittedToDept2Output: document.getElementById('output-group-submitted-to-dept-2'),
        groupSubmittedToCampus2Output: document.getElementById('output-group-submitted-to-campus-2'),

        groupNoOutput: document.getElementById('output-group-no'),
        groupMember1NameOutput: document.getElementById('output-group-member-1-name'),
        groupMember1IdOutput: document.getElementById('output-group-member-1-id-label'),
        groupMember2NameOutput: document.getElementById('output-group-member-2-name'),
        groupMember2IdOutput: document.getElementById('output-group-member-2-id-label'),
        groupMember3NameOutput: document.getElementById('output-group-member-3-name'),
        groupMember3IdOutput: document.getElementById('output-group-member-3-id-label'),
        groupMember3Row: document.getElementById('output-group-member-3-row'),

        // Shared preview elements
        declarationBox: document.querySelector('.declaration-box'),
        signatureLabelOutput: document.getElementById('output-signature-label')
    };

    // --- Course Data State ---
    let courseData = [];

    const loadCourses = async () => {
        try {
            const snapshot = await getDocs(collection(db, "courses"));
            courseData = [];
            snapshot.forEach(docSnap => {
                courseData.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
            });
            populateCourseDropdown();
            renderCourseList();
        } catch (error) {
            console.error("Error loading courses from Firebase:", error);
        }
    };

    const increaseDownloadCount = async () => {
        const ref = doc(db, "stats", "downloads");
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            await setDoc(ref, { count: 1 });
        } else {
            await updateDoc(ref, { count: increment(1) });
        }
    };

    const loadDownloadCount = async () => {
        const ref = doc(db, "stats", "downloads");
        const snap = await getDoc(ref);
        if (snap.exists()) {
            document.getElementById("downloadCount").textContent = snap.data().count.toLocaleString();
        }
    };

    // --- Default Data ---
    const defaultData = {
        courseCode: "",
        courseTitle: "",
        dateOfAllocation: "",
        dateOfSubmission: "",
        reportNo: "",
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
        yearSemester: "4th Year 2nd Semester", 
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
        // --- Shared Course Info for Report ---
        elements.courseCodeOutput.textContent = elements.courseCodeInput.value;
        elements.courseTitleOutput.textContent = elements.courseTitleInput.value;
        elements.dateOfAllocationOutput.textContent = formatDate(elements.dateOfAllocationInput.value);
        elements.dateOfSubmissionOutput.textContent = formatDate(elements.dateOfSubmissionInput.value);
        elements.yearSemesterOutput.textContent = elements.yearSemesterInput.value;
        elements.sectionOutput.textContent = elements.sectionInput.value;

        // --- Report Only Fields ---
        elements.reportNoOutput.textContent = elements.reportNoInput.value;
        elements.reportNameOutput.textContent = elements.reportNameInput.value;
        elements.studentNameOutput.textContent = elements.studentNameInput.value;
        elements.studentIdOutput.textContent = elements.studentIdInput.value;

        // --- Shared Submitted To Mapping ---
        elements.submittedToName1Output.textContent = elements.submittedToName1Input.value;
        elements.submittedToDesignation1Output.textContent = elements.submittedToDesignation1Input.value;
        elements.submittedToDept1Output.textContent = elements.submittedToDept1Input.value;
        elements.submittedToCampus1Output.textContent = elements.submittedToCampus1Input.value;

        elements.submittedToName2Output.textContent = elements.submittedToName2Input.value;
        elements.submittedToDesignation2Output.textContent = elements.submittedToDesignation2Input.value;
        elements.submittedToDept2Output.textContent = elements.submittedToDept2Input.value;
        elements.submittedToCampus2Output.textContent = elements.submittedToCampus2Input.value;

        // For Project Preview
        elements.groupSubmittedToName1Output.textContent = elements.submittedToName1Input.value;
        elements.groupSubmittedToDesignation1Output.textContent = elements.submittedToDesignation1Input.value;
        elements.groupSubmittedToDept1Output.textContent = elements.submittedToDept1Input.value;
        elements.groupSubmittedToCampus1Output.textContent = elements.submittedToCampus1Input.value;

        elements.groupSubmittedToName2Output.textContent = elements.submittedToName2Input.value;
        elements.groupSubmittedToDesignation2Output.textContent = elements.submittedToDesignation2Input.value;
        elements.groupSubmittedToDept2Output.textContent = elements.submittedToDept2Input.value;
        elements.groupSubmittedToCampus2Output.textContent = elements.submittedToCampus2Input.value;

        // --- Project Mode specific Fields ---
        elements.docTitleOutput.textContent = elements.docTitleInput.value;
        elements.projectTitleOutput.textContent = elements.projectTitleInput.value;

        elements.groupCourseCodeOutput.textContent = elements.courseCodeInput.value;
        elements.groupCourseTitleOutput.textContent = elements.courseTitleInput.value;
        elements.groupDateOfAllocationOutput.textContent = formatDate(elements.dateOfAllocationInput.value);
        elements.groupDateOfSubmissionOutput.textContent = formatDate(elements.dateOfSubmissionInput.value);
        elements.groupYearSemesterOutput.textContent = elements.yearSemesterInput.value;
        elements.groupSectionOutput.textContent = elements.sectionInput.value;

        elements.groupNoOutput.textContent = elements.groupNoInput.value;
        elements.groupMember1NameOutput.textContent = elements.groupMember1NameInput.value;
        elements.groupMember1IdOutput.textContent = elements.groupMember1IdInput.value;

        elements.groupMember2NameOutput.textContent = elements.groupMember2NameInput.value;
        elements.groupMember2IdOutput.textContent = elements.groupMember2IdInput.value;

        elements.groupMember3NameOutput.textContent = elements.groupMember3NameInput.value;
        elements.groupMember3IdOutput.textContent = elements.groupMember3IdInput.value;

        const member3Active = !elements.groupMember3Fields.classList.contains('hidden');
        elements.groupMember3Row.classList.toggle('hidden', !member3Active);
    };

    const loadData = () => {
        const data = defaultData;

        elements.courseCodeInput.value = data.courseCode || "";
        elements.courseTitleInput.value = data.courseTitle || "";
        elements.dateOfAllocationInput.value = data.dateOfAllocation || "";
        elements.dateOfSubmissionInput.value = data.dateOfSubmission || "";
        elements.yearSemesterInput.value = data.yearSemester || "";
        elements.sectionInput.value = data.section || "";

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

        updatePreview();
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
            await increaseDownloadCount();
            await loadDownloadCount();
            const pdf = await createPdfObject();
            const fileName = `Cover - ${elements.courseCodeInput.value || 'Report'}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error(error);
            elements.generatePdfBtn.textContent = "Error!";
        } finally {
            setTimeout(() => { elements.generatePdfBtn.innerHTML = originalText; }, 1000);
        }
    };

    const handlePrintPdf = async () => {
        const originalText = elements.printPdfBtn.innerHTML;
        elements.printPdfBtn.textContent = "Preparing Print...";

        try {
            await increaseDownloadCount();
            await loadDownloadCount();
            const pdf = await createPdfObject();
            pdf.autoPrint();
            pdf.output('dataurlnewwindow');
        } catch (error) {
            console.error(error);
            elements.printPdfBtn.textContent = "Error!";
        } finally {
            setTimeout(() => { elements.printPdfBtn.innerHTML = originalText; }, 1000);
        }
    };

    const handleJpgDownload = async () => {
        updatePreview();
        const coverPage = elements.coverPage;
        coverPage.classList.add('capture-mode'); 

        try {
            await increaseDownloadCount();
            await loadDownloadCount();
            
            const canvas = await html2canvas(coverPage, {
                scale: 3, 
                useCORS: true, 
                onclone: (clonedDoc) => {
                    clonedDoc.getElementById('cover-page').classList.add('capture-mode');
                }
            });
            
            coverPage.classList.remove('capture-mode'); 
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            const fileName = `Cover - ${elements.courseCodeInput.value || 'Report'}.jpg`;
            link.download = fileName;
            link.click();
        } catch (err) {
            console.error("Error during JPG generation:", err);
            coverPage.classList.remove('capture-mode');
        }
    };

    // --- Initialization & Event Listeners ---
    const populateCourseDropdown = () => {
        const previouslySelected = elements.courseSelect.value;
        elements.courseSelect.innerHTML = '<option value="">-- Select a Course (Auto-fill) --</option>';
        
        courseData.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = `${course.code} - ${course.title}`;
            elements.courseSelect.appendChild(option);
        });

        if (courseData.some(c => c.id === previouslySelected)) {
            elements.courseSelect.value = previouslySelected;
        }
    };

    elements.courseSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        const selectedCourse = courseData.find(c => c.id === selectedId);

        if (selectedCourse) {
            elements.courseCodeInput.value = selectedCourse.code;
            elements.courseTitleInput.value = selectedCourse.title;

            if (selectedCourse.teacher1) {
                elements.submittedToName1Input.value = selectedCourse.teacher1.name;
                elements.submittedToDesignation1Input.value = selectedCourse.teacher1.designation;
                elements.submittedToDept1Input.value = selectedCourse.teacher1.dept;
                elements.submittedToCampus1Input.value = selectedCourse.teacher1.campus;
            }

            if (selectedCourse.teacher2) {
                elements.submittedToName2Input.value = selectedCourse.teacher2.name;
                elements.submittedToDesignation2Input.value = selectedCourse.teacher2.designation;
                elements.submittedToDept2Input.value = selectedCourse.teacher2.dept;
                elements.submittedToCampus2Input.value = selectedCourse.teacher2.campus;
            }
            updatePreview();
        }
    });

    const inputs = document.querySelectorAll('.form-body input, .form-body textarea');
    inputs.forEach(input => {
        input.addEventListener('keyup', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    elements.generatePdfBtn.addEventListener('click', handlePdfDownload);
    elements.generateJpgBtn.addEventListener('click', handleJpgDownload);
    elements.printPdfBtn.addEventListener('click', handlePrintPdf);

    const setMode = (mode) => {
        const isReport = mode === "report";
        elements.coverPage.dataset.mode = mode;
        elements.fieldsReport.classList.toggle("hidden", !isReport);
        elements.fieldsGroup.classList.toggle("hidden", isReport);

        if (!isReport && !elements.docTitleInput.value.trim()) {
            elements.docTitleInput.value = "PROJECT REPORT";
        }

        elements.declarationToggle.checked = isReport;
        elements.declarationBox.classList.toggle("hidden", !isReport);
        updatePreview();
    };

    elements.modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => setMode(e.target.value));
    });

    elements.declarationToggle.addEventListener("change", () => {
        elements.declarationBox.classList.toggle("hidden", !elements.declarationToggle.checked);
    });

    elements.toggleMember3Btn.addEventListener('click', () => {
        const isShowing = !elements.groupMember3Fields.classList.contains('hidden');

        if (isShowing) {
            elements.groupMember3Fields.classList.add('hidden');
            elements.groupMember3NameInput.value = '';
            elements.groupMember3IdInput.value = '';
            elements.toggleMember3Btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Add 3rd Member';
        } else {
            elements.groupMember3Fields.classList.remove('hidden');
            elements.toggleMember3Btn.innerHTML = '<i class="fa-solid fa-user-minus"></i> Remove 3rd Member';
        }
        updatePreview();
    });

    // --- Manage Courses Modal Logic ---
    const renderCourseList = () => {
        elements.courseListContainer.innerHTML = '';

        if (courseData.length === 0) {
            elements.courseListContainer.innerHTML = '<p class="course-list-empty">No courses yet. Add one below.</p>';
            return;
        }

        courseData.forEach(course => {
            const item = document.createElement('div');
            item.className = 'course-list-item';
            const teacherNames = [course.teacher1 && course.teacher1.name, course.teacher2 && course.teacher2.name]
                .filter(Boolean)
                .join(' & ');

            item.innerHTML = `
                <div class="course-info">
                    <div class="course-code-title">${course.code} — ${course.title}</div>
                    <div class="course-teachers">${teacherNames || 'No teachers added'}</div>
                </div>
                <div class="course-actions">
                    <button type="button" class="edit-course-btn" data-id="${course.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="delete-course-btn" data-id="${course.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            elements.courseListContainer.appendChild(item);
        });
    };

    const resetCourseForm = () => {
        elements.courseForm.reset();
        elements.editCourseIdInput.value = '';
        elements.courseFormTitle.textContent = 'Add New Course';
        elements.cancelEditBtn.classList.add('hidden');
    };

    const openCourseModal = () => {
        renderCourseList();
        elements.modalOverlay.classList.remove('hidden');
    };

    const closeCourseModal = () => {
        elements.modalOverlay.classList.add('hidden');
        resetCourseForm();
    };

    const fillCourseFormForEdit = (course) => {
        elements.editCourseIdInput.value = course.id;
        elements.modalCourseCode.value = course.code || '';
        elements.modalCourseTitle.value = course.title || '';

        const t1 = course.teacher1 || {};
        elements.modalT1Name.value = t1.name || '';
        elements.modalT1Designation.value = t1.designation || '';
        elements.modalT1Dept.value = t1.dept || '';
        elements.modalT1Campus.value = t1.campus || '';

        const t2 = course.teacher2 || {};
        elements.modalT2Name.value = t2.name || '';
        elements.modalT2Designation.value = t2.designation || '';
        elements.modalT2Dept.value = t2.dept || '';
        elements.modalT2Campus.value = t2.campus || '';

        elements.courseFormTitle.textContent = 'Edit Course';
        elements.cancelEditBtn.classList.remove('hidden');
        elements.modalCourseCode.focus();
    };

    elements.manageCoursesBtn.addEventListener('click', openCourseModal);
    elements.closeModalBtn.addEventListener('click', closeCourseModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) closeCourseModal();
    });
    elements.cancelEditBtn.addEventListener('click', resetCourseForm);

    elements.courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const code = elements.modalCourseCode.value.trim();
        const title = elements.modalCourseTitle.value.trim();
        if (!code || !title) return;

        const coursePayload = {
            code,
            title,
            teacher1: {
                name: elements.modalT1Name.value.trim(),
                designation: elements.modalT1Designation.value.trim(),
                dept: elements.modalT1Dept.value.trim(),
                campus: elements.modalT1Campus.value.trim()
            },
            teacher2: {
                name: elements.modalT2Name.value.trim(),
                designation: elements.modalT2Designation.value.trim(),
                dept: elements.modalT2Dept.value.trim(),
                campus: elements.modalT2Campus.value.trim()
            }
        };

        const existingId = elements.editCourseIdInput.value;

        try {
            if (existingId) {
                const docRef = doc(db, "courses", existingId);
                await updateDoc(docRef, coursePayload);
            } else {
                await addDoc(collection(db, "courses"), coursePayload);
            }
            
            await loadCourses();
            resetCourseForm();
        } catch (error) {
            console.error("Error saving course to Firestore:", error);
            alert("Failed to save changes to Firestore.");
        }
    });

    elements.courseListContainer.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit-course-btn');
        const deleteBtn = e.target.closest('.delete-course-btn');

        if (editBtn) {
            const course = courseData.find(c => c.id === editBtn.dataset.id);
            if (course) fillCourseFormForEdit(course);
        }

        if (deleteBtn) {
            const courseId = deleteBtn.dataset.id;
            const course = courseData.find(c => c.id === courseId);
            if (course && confirm(`Delete "${course.code} - ${course.title}"? This cannot be undone.`)) {
                try {
                    await deleteDoc(doc(db, "courses", courseId));
                    await loadCourses();
                } catch (error) {
                    console.error("Error removing doc from Firestore:", error);
                    alert("Failed to delete course from Firestore.");
                }
            }
        }
    });

    // --- Initial Load Phase ---
    addWatermark();
    loadDownloadCount();   
    loadData();
    loadCourses(); 
    setMode('report');
});
