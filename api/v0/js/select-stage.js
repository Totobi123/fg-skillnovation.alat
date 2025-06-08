// Get rid of small loading animation
[...document.querySelectorAll(".input-location-dependant")].forEach((element) =>
  element.classList.toggle("d-none")
);

// Function to set multiple attributes at once
const setAttributesStages = (el, attrs) => {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

const toggleSTAGE = (target) => {
  let level = target.value, // Get value of level
    selectStageOption = ["--Select Stage--"], // Define this once so as not to repeat it multiple times
    stageList = {
      Development: [
       "Building Rapport",
"Business Model Plan",
"Business Valuation",
"Customer Experience Mgt",
"Design Thinking",
"Financial Modelling in Decision-Making &amp; Business Planning",
"Functional Accountability Chart",
"Pitch Deck Structuring",
"Product Development Cycle",
"SWOT/PESTLE",
"Understanding Product Management",
"Website &amp; Apps",
      ],
      Growth: [
        "Building Rapport",
"Business Model Plan",
"Business Valuation",
"Customer Experience Mgt",
"Design Thinking",
"Financial Modelling in Decision-Making &amp; Business Planning",
"Functional Accountability Chart",
"Pitch Deck Structuring",
"Product Development Cycle",
"SWOT/PESTLE",
"Understanding Product Management",
"Website &amp; Apps",
      ],
      Funding: [
        "Building Rapport",
"Business Model Plan",
"Business Valuation",
"Customer Experience Mgt",
"Design Thinking",
"Financial Modelling in Decision-Making &amp; Business Planning",
"Functional Accountability Chart",
"Pitch Deck Structuring",
"Product Development Cycle",
"SWOT/PESTLE",
"Understanding Product Management",
"Website &amp; Apps",
      ],
    }[level], // Ternary switch operator to show list of LGAs based on chosen level
    stages = [...selectStageOption, ...Object.values(stageList)], // Join select LGA option with list of LGAs
    form = target.parentElement.parentElement.parentElement.parentElement, // Get parent up to the forth generation just in case LGA select element is deeply nested
    stageSelect = form.querySelector(".select-stage"), // Get the LGA select element
    length = stageSelect.options.length; // Get number of options already existing in LGA select element

  // Clear LGS select element
  for (i = length - 1; i >= 0; i--) {
    stageSelect.options[i] = null;
  }

  // Populate LGA select element
  stages.forEach((stage) => {
    let opt = document.createElement("option"); // Create option element
    opt.appendChild(document.createTextNode(stage)); // Append LGA to it
    if(stage == '--Select Stage--'){
      opt.value = '';
    } else{
      opt.value = stage;
    } // Set the value to LGA

    // Make option asking you to select unclickable
    stage.includes("elect")
      ? setAttributesStages(opt, { disabled: "disabled", selected: "selected" })
      : "";

    // Add this option element to LGA select element
    stageSelect.appendChild(opt);
  });
};

const toggleSTAGE2 = (target) => {
  let level = target.value, // Get value of level
      
    selectStageOption = ["--Select Category--"], // Define this once so as not to repeat it multiple times
    stageList = {
     "Professional Services" : [
    "Legal Consulting",
    "Financial Planning",
    "Tax Preparation",
    "Accounting Services",
    "Business Consulting",
    "Human Resources Consulting",
    "Marketing Consulting",
    "Public Relations Services",
    "Risk Management Consulting",
    "Real Estate Consulting",
    "Recruitment Services",
    "Project Management",
    "Compliance Consulting",
    "Environmental Consulting",
    "Management Consulting",
    "Insurance Consulting",
    "Investment Advisory",
    "Intellectual Property Consulting",
    "Strategic Planning",
    "Organizational Development"
],
"Creative Services" : [
    "Graphic Design",
    "Logo Design",
    "Branding Services",
    "Web Design",
    "UX/UI Design",
    "Photography",
    "Videography",
    "Animation & Illustration",
    "SEO and Digital Marketing Consulting",
    "Copywriting",
    "Content Creation",
    "Social Media Management",
    "Advertising Design",
    "Interior Design",
    "Fashion Design",
    "Art Direction",
    "Print Design",
    "Music Production",
    "Voiceover Services",
    "Podcast Production"
],
"Trade Services" : [
    "Plumbing Services",
    "Electrical Services",
    "HVAC (Heating, Ventilation, and Air Conditioning) Services",
    "Carpentry Services",
    "Roofing Services",
    "Landscaping and Lawn Care",
    "Painting Services",
    "Masonry Services",
    "Flooring Installation and Repair",
    "Auto Repair and Maintenance",
    "Welding and Metal Fabrication",
    "Appliance Repair Services",
    "Locksmith & Home Security Services",
    "Pest Control Services",
    "Removal & Waste Management",
    "Moving Services",
    "Tile, Drywall, Plaster Services",
    "Glass and Window Repair Services",
    "Handyman Services",
    "Cleaning and Janitorial Services"
],
"Personal Care Services" : [
    "Hair Salon",
    "Barber Shop",
    "Nail Salon",
    "Spa and Wellness Center",
    "Massage Therapy",
    "Skincare Clinic",
    "Makeup Artist Services",
    "Personal Training and Fitness Coaching",
    "Yoga and Pilates Studio",
    "Weight Loss and Nutrition Counseling",
    "Chiropractic Services",
    "Mental Health Counseling",
    "Tattoo and Piercing Studio",
    "Aromatherapy Services",
    "Dental Hygiene Services",
    "Reflexology Services",
    "Life Coaching",
    "Eyelash Extension Services",
    "Cosmetic Dentistry",
    "Personal Stylist and Image Consulting"
],
"Educational Services" : [
    "Tutoring",
    "Test Preparation",
    "Language Lessons",
    "Music Lessons",
    "Art Lessons",
    "Dance Lessons",
    "Cooking Classes",
    "Coding Bootcamps",
    "Professional Development Workshops",
    "Corporate Training",
    "Public Speaking Coaching",
    "Writing Workshops",
    "STEM Education",
    "Early Childhood Education",
    "Special Education Services",
    "Study Skills Coaching",
    "College Admissions Counseling",
    "Career Coaching",
    "Online Courses",
    "Educational Consulting"
],
"Event Services" : [
    "Event Planning",
    "Wedding Planning",
    "Catering Services",
    "DJ Services",
    "Live Band Services",
    "Photography Services",
    "Videography Services",
    "Florist Services",
    "Event Rentals",
    "Lighting and Sound Services",
    "Event Coordination",
    "Bartending Services",
    "Security Services",
    "Decoration Services",
    "Venue Booking",
    "Invitation Design",
    "Event Staffing",
    "Childcare Services",
    "Transportation Services",
    "Entertainment Booking"
],
"Technology Services" : [
    "IT Support",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Network Setup and Maintenance",
    "Cybersecurity Services",
    "Cloud Computing Services",
    "Data Analytics and Business Intelligence",
    "Database Management",
    "IT Consulting",
    "Technical Writing",
    "Website Hosting and Domain Services",
    "Tech Support Call Centers",
    "Hardware Repair",
    "IT Staffing and Recruitment",
    "Tech Training and Certification",
    "IoT Solutions",
    "AI and Machine Learning Development",
    "Blockchain Development",
    "ERP Implementation"
],
  "Other Business": [],
    }[level], // Ternary switch operator to show list of LGAs based on chosen level
    stages = [...selectStageOption, ...Object.values(stageList)], // Join select LGA option with list of LGAs
    form = target.parentElement.parentElement.parentElement.parentElement, // Get parent up to the forth generation just in case LGA select element is deeply nested
    stageSelect = form.querySelector(".select-stage2"), // Get the LGA select element
    length = stageSelect.options.length; // Get number of options already existing in LGA select element

  // Clear LGS select element
  for (i = length - 1; i >= 0; i--) {
    stageSelect.options[i] = null;
  }

  // Populate LGA select element
  stages.forEach((stage) => {
    let opt = document.createElement("option"); // Create option element
    opt.appendChild(document.createTextNode(stage)); // Append LGA to it
    if(stage == '--Select Stage--'){
      opt.value = '';
    } else{
      opt.value = stage;
    } // Set the value to LGA

    // Make option asking you to select unclickable
    stage.includes("elect")
      ? setAttributesStages(opt, { disabled: "disabled", selected: "selected" })
      : "";

    // Add this option element to LGA select element
    stageSelect.appendChild(opt);
  });
var otherBusinessDiv = document.getElementById('otherBusinessDiv');
var growth_skill_type = document.getElementById('growth_skill_type');
      if (level === 'Other Business') {
        otherBusinessDiv.style.display = 'block';
       growth_skill_type.style.display = 'none';
      } else {
        otherBusinessDiv.style.display = 'none';
       growth_skill_type.style.display = 'block';
      }

};