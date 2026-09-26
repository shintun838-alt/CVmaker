/* =====================================================
   COCO CV MAKER
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const formPage =
    document.getElementById("formPage");

const cvPage =
    document.getElementById("cvPage");

const dobInput =
    document.getElementById("dob");

const ageInput =
    document.getElementById("age");

const photoInput =
    document.getElementById("photo");

const photoPreview =
    document.getElementById("photoPreview");

const experienceContainer =
    document.getElementById("experienceContainer");

const addExperience =
    document.getElementById("addExperience");

const generateCV =
    document.getElementById("generateCV");

const backButton =
    document.getElementById("backButton");

const downloadPDF =
    document.getElementById("downloadPDF");

const pdfStatus =
    document.getElementById("pdfStatus");


/* =====================================================
   AGE CALCULATOR
===================================================== */

dobInput.addEventListener("change", function () {

    if (!this.value) {

        ageInput.value = "";

        return;
    }


    const dob =
        new Date(this.value);


    const today =
        new Date();


    let age =
        today.getFullYear() -
        dob.getFullYear();


    const monthDifference =
        today.getMonth() -
        dob.getMonth();


    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < dob.getDate()
        )
    ) {

        age--;

    }


    ageInput.value =
        age + " years old";

});


/* =====================================================
   PHOTO UPLOAD
===================================================== */

photoInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image file."
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                photoPreview.innerHTML = `

                    <img
                        src="${event.target.result}"
                        alt="Profile Photo">

                `;

            };


        reader.readAsDataURL(file);

    }
);


/* =====================================================
   WORK DESCRIPTION GENERATOR
===================================================== */

function generateWorkDescription(position) {

    const role =
        position
            .toLowerCase()
            .trim();


    /* OFFICE / ADMIN */

    if (
        role.includes("office") ||
        role.includes("admin") ||
        role.includes("administrative")
    ) {

        return `
• Managed daily office operations and maintained important documents and records.
• Prepared reports, organized schedules, and supported administrative activities.
• Communicated professionally with customers, employees, and other departments.
• Assisted the team with daily tasks and ensured smooth office operations.
        `.trim();

    }


    /* SALES */

    if (
        role.includes("sales") ||
        role.includes("sale")
    ) {

        return `
• Communicated with customers and identified their needs and requirements.
• Promoted company products and services to potential customers.
• Followed up with customers and maintained positive customer relationships.
• Supported sales activities and contributed to achieving team targets.
        `.trim();

    }


    /* CUSTOMER SERVICE */

    if (
        role.includes("customer") ||
        role.includes("service")
    ) {

        return `
• Provided professional customer service and responded to customer inquiries.
• Handled customer requests and supported customers with their needs.
• Communicated clearly with customers and provided accurate information.
• Maintained positive customer relationships and supported service quality.
        `.trim();

    }


    /* RECEPTIONIST */

    if (
        role.includes("reception") ||
        role.includes("front office")
    ) {

        return `
• Welcomed guests and provided professional front office services.
• Assisted with check-in, check-out, and guest inquiries.
• Handled customer requests and supported complaint resolution.
• Maintained accurate records and coordinated with other departments.
        `.trim();

    }


    /* MARKETING */

    if (
        role.includes("marketing") ||
        role.includes("digital")
    ) {

        return `
• Supported marketing activities and promotional campaigns.
• Created and organized content for digital communication channels.
• Conducted basic market research and supported customer engagement.
• Assisted the team in improving brand awareness and online presence.
        `.trim();

    }


    /* ACCOUNTING */

    if (
        role.includes("account") ||
        role.includes("finance")
    ) {

        return `
• Maintained financial records and organized accounting documents.
• Assisted with daily transactions and basic financial reporting.
• Checked documents and supported accurate record keeping.
• Worked with the team to complete accounting and administrative tasks.
        `.trim();

    }


    /* DEFAULT */

    return `
• Performed daily responsibilities related to the assigned position.
• Communicated professionally with customers, colleagues, and team members.
• Supported the team in completing daily tasks and company activities.
• Maintained a professional working environment and followed company procedures.
    `.trim();

}


/* =====================================================
   DESCRIPTION BUTTON SETUP
===================================================== */

function setupDescriptionButtons() {

    const buttons =
        document.querySelectorAll(
            ".generate-description"
        );


    buttons.forEach(button => {

        button.onclick =
            function () {

                const card =
                    button.closest(
                        ".experience-card"
                    );


                const position =
                    card.querySelector(
                        ".job-position"
                    ).value;


                const description =
                    card.querySelector(
                        ".work-description"
                    );


                if (!position.trim()) {

                    alert(
                        "Please enter the Job Position first."
                    );

                    return;
                }


                description.value =
                    generateWorkDescription(
                        position
                    );

            };

    });

}


setupDescriptionButtons();


/* =====================================================
   ADD WORK EXPERIENCE
===================================================== */

let experienceCount = 1;


addExperience.addEventListener(
    "click",
    function () {

        experienceCount++;


        const card =
            document.createElement("div");


        card.className =
            "experience-card";


        card.innerHTML = `

            <div class="experience-number">

                ${String(experienceCount).padStart(2, "0")}

            </div>


            <div class="experience-content">

                <div class="form-grid">


                    <div class="input-box">

                        <label>
                            Job Position
                        </label>

                        <input
                            type="text"
                            class="job-position"
                            placeholder="Example: Sales Staff">

                    </div>


                    <div class="input-box">

                        <label>
                            Company Name
                        </label>

                        <input
                            type="text"
                            class="company-name"
                            placeholder="Company Name">

                    </div>


                    <div class="input-box">

                        <label>
                            Start Date
                        </label>

                        <input
                            type="month"
                            class="start-date">

                    </div>


                    <div class="input-box">

                        <label>
                            End Date
                        </label>

                        <input
                            type="month"
                            class="end-date">

                    </div>


                    <div class="input-box full">

                        <label>
                            Work Description
                        </label>

                        <textarea
                            class="work-description"
                            placeholder="Click Auto Generate">
                        </textarea>


                        <button
                            type="button"
                            class="generate-description">

                            <i class="fa-solid fa-wand-magic-sparkles"></i>

                            Auto Generate

                        </button>

                    </div>

                </div>

            </div>

        `;


        experienceContainer.appendChild(card);


        setupDescriptionButtons();

    }
);


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(value) {

    if (!value) {

        return "Present";

    }


    const date =
        new Date(value + "-01");


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   PROFILE GENERATOR
===================================================== */

function createProfile(experiences) {

    if (experiences.length === 0) {

        return `
        Motivated and responsible professional with a strong
        willingness to learn and develop new skills. Able to work
        effectively with others, communicate professionally, and
        contribute positively to a working environment.
        `;

    }


    const firstPosition =
        experiences[0].position;


    return `
    Motivated ${firstPosition} with practical working experience
    and a strong interest in professional development. Experienced
    in handling daily responsibilities, communicating with
    customers and supporting team activities. A responsible and
    adaptable professional who is willing to learn new skills
    and contribute positively to the organization.
    `;

}


/* =====================================================
   GET EDUCATION DATA
===================================================== */

function getEducationData() {

    const education = [];


    /* BACHELOR */

    const bachelorUniversity =
        document.getElementById(
            "bachelorUniversity"
        ).value.trim();


    const bachelorYear =
        document.getElementById(
            "bachelorYear"
        ).value.trim();


    if (
        bachelorUniversity ||
        bachelorYear
    ) {

        education.push({

            degree: "Bachelor",

            university:
                bachelorUniversity ||
                "University",

            year:
                bachelorYear ||
                "—"

        });

    }


    /* MASTER */

    const masterUniversity =
        document.getElementById(
            "masterUniversity"
        ).value.trim();


    const masterYear =
        document.getElementById(
            "masterYear"
        ).value.trim();


    if (
        masterUniversity ||
        masterYear
    ) {

        education.push({

            degree: "Master",

            university:
                masterUniversity ||
                "University",

            year:
                masterYear ||
                "—"

        });

    }


    /* PHD */

    const phdUniversity =
        document.getElementById(
            "phdUniversity"
        ).value.trim();


    const phdYear =
        document.getElementById(
            "phdYear"
        ).value.trim();


    if (
        phdUniversity ||
        phdYear
    ) {

        education.push({

            degree: "PhD",

            university:
                phdUniversity ||
                "University",

            year:
                phdYear ||
                "—"

        });

    }


    /* DIPLOMA */

    const diplomaUniversity =
        document.getElementById(
            "diplomaUniversity"
        ).value.trim();


    const diplomaYear =
        document.getElementById(
            "diplomaYear"
        ).value.trim();


    const diplomaName =
        document.getElementById(
            "diplomaName"
        ).value.trim();


    if (
        diplomaUniversity ||
        diplomaYear ||
        diplomaName
    ) {

        education.push({

            degree:
                diplomaName ||
                "Diploma / Certificate",

            university:
                diplomaUniversity ||
                "Institution",

            year:
                diplomaYear ||
                "—"

        });

    }


    return education;

}


/* =====================================================
   GENERATE EDUCATION HTML
===================================================== */

function generateEducationHTML(
    education
) {

    if (education.length === 0) {

        return `
            <p class="no-education">
                Education information not provided.
            </p>
        `;

    }


    let html = "";


    education.forEach(item => {

        html += `

            <div class="cv-education-item">

                <div class="cv-education-left">

                    <span class="cv-degree">

                        ${item.degree}

                    </span>


                    <span class="cv-university">

                        ${item.university}

                    </span>

                </div>


                <span class="cv-education-year">

                    ${item.year}

                </span>

            </div>

        `;

    });


    return html;

}


/* =====================================================
   GENERATE CV
===================================================== */

generateCV.addEventListener(
    "click",
    function () {


        /* ---------------------------------------------
           PERSONAL DATA
        --------------------------------------------- */

        const name =
            document.getElementById(
                "name"
            ).value.trim() ||
            "YOUR NAME";


        const email =
            document.getElementById(
                "email"
            ).value.trim() ||
            "your@email.com";


        const phone =
            document.getElementById(
                "phone"
            ).value.trim() ||
            "Your Phone";


        const address =
            document.getElementById(
                "address"
            ).value.trim() ||
            "Your Address";


        const dob =
            document.getElementById(
                "dob"
            ).value;


        const age =
            document.getElementById(
                "age"
            ).value ||
            "—";


        /* ---------------------------------------------
           EXPERIENCES
        --------------------------------------------- */

        const cards =
            document.querySelectorAll(
                ".experience-card"
            );


        const experiences = [];


        cards.forEach(card => {

            const position =
                card.querySelector(
                    ".job-position"
                ).value.trim();


            const company =
                card.querySelector(
                    ".company-name"
                ).value.trim();


            const start =
                card.querySelector(
                    ".start-date"
                ).value;


            const end =
                card.querySelector(
                    ".end-date"
                ).value;


            const description =
                card.querySelector(
                    ".work-description"
                ).value.trim();


            if (
                position ||
                company ||
                description
            ) {

                experiences.push({

                    position:
                        position ||
                        "Position",

                    company:
                        company ||
                        "Company",

                    start,

                    end,

                    description

                });

            }

        });


        /* ---------------------------------------------
           EDUCATION
        --------------------------------------------- */

        const education =
            getEducationData();


        /* ---------------------------------------------
           BASIC CV INFORMATION
        --------------------------------------------- */

        document.getElementById(
            "cvName"
        ).textContent =
            name.toUpperCase();


        document.getElementById(
            "cvPhone"
        ).textContent =
            phone;


        document.getElementById(
            "cvEmail"
        ).textContent =
            email;


        document.getElementById(
            "cvAddress"
        ).textContent =
            address;


        document.getElementById(
            "cvDOB"
        ).textContent =
            dob ||
            "Not provided";


        document.getElementById(
            "cvAge"
        ).textContent =
            age;


        /* ---------------------------------------------
           HEADLINE
        --------------------------------------------- */

        document.getElementById(
            "cvHeadline"
        ).textContent =

            experiences.length > 0

                ? experiences[0].position.toUpperCase()

                : "PROFESSIONAL";


        /* ---------------------------------------------
           PROFILE
        --------------------------------------------- */

        document.getElementById(
            "cvProfile"
        ).textContent =
            createProfile(
                experiences
            );


        /* ---------------------------------------------
           EDUCATION
        --------------------------------------------- */

        document.getElementById(
            "cvEducation"
        ).innerHTML =
            generateEducationHTML(
                education
            );


        /* ---------------------------------------------
           WORK EXPERIENCE
        --------------------------------------------- */

        const experienceHTML =
            document.getElementById(
                "cvExperience"
            );


        experienceHTML.innerHTML = "";


        experiences.forEach(
            exp => {


                let bullets =
                    exp.description
                        .split("\n")
                        .map(
                            line =>
                                line.trim()
                        )
                        .filter(
                            line =>
                                line.length > 0
                        );


                let bulletHTML = "";


                bullets.forEach(
                    line => {

                        const clean =
                            line.replace(
                                /^•\s*/,
                                ""
                            );


                        bulletHTML += `

                            <li>
                                ${clean}
                            </li>

                        `;

                    }
                );


                experienceHTML.innerHTML += `

                    <div
                        class="cv-experience-item">

                        <div
                            class="cv-job-header">


                            <div>

                                <div
                                    class="cv-job-title">

                                    ${exp.position}

                                </div>


                                <div
                                    class="cv-company">

                                    ${exp.company}

                                </div>

                            </div>


                            <div
                                class="cv-date">

                                ${formatDate(exp.start)}

                                -

                                ${formatDate(exp.end)}

                            </div>

                        </div>


                        <ul
                            class="cv-description">

                            ${bulletHTML}

                        </ul>

                    </div>

                `;

            }
        );


        /* ---------------------------------------------
           PHOTO
        --------------------------------------------- */

        const uploadedPhoto =
            photoPreview.querySelector(
                "img"
            );


        const cvPhoto =
            document.getElementById(
                "cvPhoto"
            );


        if (uploadedPhoto) {

            cvPhoto.src =
                uploadedPhoto.src;

            cvPhoto.style.display =
                "block";

        } else {

            cvPhoto.style.display =
                "none";

        }


        /* ---------------------------------------------
           SHOW CV PAGE
        --------------------------------------------- */

        formPage.classList.add(
            "hidden"
        );


        cvPage.classList.remove(
            "hidden"
        );


        window.scrollTo(
            0,
            0
        );

    }
);


/* =====================================================
   BACK TO EDIT
===================================================== */

backButton.addEventListener(
    "click",
    function () {

        cvPage.classList.add(
            "hidden"
        );


        formPage.classList.remove(
            "hidden"
        );


        window.scrollTo(
            0,
            0
        );

    }
);


/* =====================================================
   PDF GENERATOR
===================================================== */

downloadPDF.addEventListener(
    "click",
    async function () {


        /* CHECK LIBRARY */

        if (
            typeof html2pdf ===
            "undefined"
        ) {

            alert(
                "PDF library could not load. Please check your internet connection and reload the page."
            );

            return;

        }


        const element =
            document.getElementById(
                "cvDocument"
            );


        if (!element) {

            alert(
                "CV document was not found."
            );

            return;

        }


        /* NAME */

        const name =
            document.getElementById(
                "name"
            ).value.trim() ||
            "COCO_CV";


        const safeName =
            name
                .replace(
                    /[^a-z0-9\s-_]/gi,
                    ""
                )
                .replace(
                    /\s+/g,
                    "_"
                );


        /* BUTTON */

        const originalText =
            downloadPDF.innerHTML;


        downloadPDF.disabled =
            true;


        downloadPDF.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            Creating PDF...

        `;


        pdfStatus.textContent =
            "Please wait...";


        try {


            /* -----------------------------------------
               PDF OPTIONS
            ----------------------------------------- */

            const options = {

                margin: 0,

                filename:
                    safeName +
                    "_CV.pdf",

                image: {

                    type: "jpeg",

                    quality: 0.98

                },


                html2canvas: {

                    scale: 2,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        "#ffffff",


                    scrollX: 0,

                    scrollY: 0

                },


                jsPDF: {

                    unit: "mm",

                    format: "a4",

                    orientation:
                        "portrait"

                },


                pagebreak: {

                    mode: [
                        "avoid-all",
                        "css",
                        "legacy"
                    ]

                }

            };


            /* -----------------------------------------
               GENERATE PDF
            ----------------------------------------- */

            await html2pdf()

                .set(options)

                .from(element)

                .save();


            pdfStatus.textContent =
                "✓ PDF created successfully!";


        }

        catch (error) {

            console.error(
                "PDF Error:",
                error
            );


            pdfStatus.textContent =
                "PDF creation failed.";


            alert(
                "PDF creation failed. Please try again."
            );

        }


        finally {

            downloadPDF.disabled =
                false;


            downloadPDF.innerHTML =
                originalText;

        }

    }
);

