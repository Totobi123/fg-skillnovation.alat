var root_path = window.location.origin+'/';
// console.log(baseUrl);
// let root_api_url = main_url+"api/v0/php/";

// console.log(root_path);

var next_click = document.querySelectorAll(".next_button");
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
let formnumber = 0;

next_click.forEach(function (next_click_form) {
  next_click_form.addEventListener("click", function () {
    if (!validateform()) {
      return false;
    }
    formnumber++;
    updateform();
    progress_forward();
    contentchange();
  });
});

var back_click = document.querySelectorAll(".back_button");
back_click.forEach(function (back_click_form) {
  back_click_form.addEventListener("click", function () {
    formnumber--;
    updateform();
    progress_backward();
    contentchange();
  });
});

// var username=document.querySelector("#user_name");
// var shownname=document.querySelector(".shown_name");

// var submit_click=document.querySelectorAll(".submit_button");
// submit_click.forEach(function(submit_click_form){
//     submit_click_form.addEventListener('click',function(){
//        shownname.innerHTML= username.value;
//        formnumber++;
//        updateform();
//     });
// });

// var heart=document.querySelector(".fa-heart");
// heart.addEventListener('click',function(){
//    heart.classList.toggle('heart');
// });

// var share=document.querySelector(".fa-share-alt");
// share.addEventListener('click',function(){
//    share.classList.toggle('share');
// });

function updateform() {
  main_form.forEach(function (mainform_number) {
    mainform_number.classList.remove("active");
  });
  main_form[formnumber].classList.add("active");
}

function progress_forward() {
  // step_list.forEach(list => {

  //     list.classList.remove('active');

  // });

  num.innerHTML = formnumber + 1;
  step_list[formnumber].classList.add("active");
}

function progress_backward() {
  var form_num = formnumber + 1;
  step_list[form_num].classList.remove("active");
  num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
  step_num_content.forEach(function (content) {
    content.classList.remove("active");
    content.classList.add("d-none");
  });
  step_num_content[formnumber].classList.add("active");
}

function validateform() {
  validate = true;
  var validate_inputs = document.querySelectorAll(".main.active input, .main.active select, .main.active input[type=checkbox]");
  validate_inputs.forEach(function (validate_input) { // Fix variable name here
    validate_input.classList.remove("warning");
    if (validate_input.hasAttribute("required")) {
      if (validate_input.value.length == 0) {
        validate = false;
        validate_input.classList.add("warning");
      } else if (validate_input.type === 'checkbox' && !validate_input.checked) {
        validate = false;
        validate_input.classList.add("warning");
      }
    }
  });
  //console.log('validate');
  return validate;
}

const baseURL = root_path+"register/api/v0/php/";

function submitJobSeekerForm() {
  if(!validateform()){
    return false;
  }
  const formData = new FormData(document.getElementById("jobSeekerForm"));
  const assistWemaCheckbox = document.getElementById("assist-wema");
  const assistWemaValue = assistWemaCheckbox.checked ? "yes" : "no";
  formData.set("assist_wema", assistWemaValue);
  //console.log(Array.from(formData));
  submitForm(formData, "jobseeker.php");
}

function submitWorkingClassForm() {
    if(!validateform()){
      return false;
    }
    const formData = new FormData(document.getElementById("workingClassForm"));
	  const assistWemaCheckbox = document.getElementById("assist-wema");
	  const assistWemaValue = assistWemaCheckbox.checked ? "yes" : "no";
	  formData.set("assist_wema", assistWemaValue);
    //console.log(Array.from(formData));
    submitForm(formData, "working-class.php");
  }

function submitBusinessOwnerForm() {
  if(!validateform()){
    return false;
  }
  const formData = new FormData(document.getElementById("businessOwnerForm"));
  const assistWemaCheckbox = document.getElementById("assist-wema");
  const assistWemaValue = assistWemaCheckbox.checked ? "yes" : "no";
  formData.set("assist_wema", assistWemaValue);
  //console.log(Array.from(formData));
  submitForm(formData, "business-owner.php");
}
function submitAspiringBusinessOwnerForm() {
    const formData = new FormData(document.getElementById("aspBusinessOwnerForm"));
    submitForm(formData, "asp-business-owner.php");
  }

function submitForm(formData, endpoint) {
  const token = "7986267gyu76etw6e7gew6w73h22h2hb0efc8bb76";
  let submit_button = document.getElementById('submit_button');
  submit_button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
  submit_button.disabled = true;
  

  fetch(baseURL + endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
  
  	if(data.status !== '200'){
    	Swal.fire({
  			icon: "error",
  			title: "Oops...",
  			text: "Something went wrong!",
		});
      submit_button.innerHTML = 'Submit';
      submit_button.disabled = false;
    	return false;
    }

    const checkUserEndpoint = baseURL+"sara-request.php";
    makePostRequest(checkUserEndpoint, formData);

    submit_button.innerHTML = 'Submit';
    submit_button.disabled = false;
    Swal.fire({
    title: "Registration successful",
    text: "You have successfully submitted your details for the Digital Skillnovation Program For MSMEs. Kindly check your email for information on how to access your account.",
    icon: "success",
    confirmButtonColor: "#8d092f",
    }).then((result) => {
      // Check if the user clicked "Okay"
      if (result.isConfirmed) {
      // Redirect only when the user clicks "Okay"
      window.location.href = root_path+'register';window.location.origin+'/'+'ticket.php'
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    // Handle error here
  });
}

async function makePostRequest(url, data) {
  let bearerToken = "7986267gyu76etw6e7gew6w73h22h2hb0efc8bb76";
  
  try {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${bearerToken}`,
      },
      body: data,
    });

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


document.getElementById("checkUser").addEventListener("click", async () => {
  if(!validateform()){
    return false;
  }

  let baseURL = root_path+"register/api/v0/php/"

  const email = document.getElementById("email").value;
  const checkUserEndpoint = baseURL+"check-user.php";

  const formData = new FormData();
  formData.append('email', email);

  document.getElementById('errorUser').style.display = 'none';
  document.getElementById('checkUser').innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';

  makePostRequest(checkUserEndpoint, formData)
    .then((response) => {
      if(response.status !== '200'){
        document.getElementById('errorUser').innerHTML =  `This email address (${email}) has already been used to register for the program.`;
        document.getElementById('errorUser').style.display = 'block';

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        document.getElementById('checkUser').innerHTML = 'Next Step';
        return false;

      } else {

        document.getElementById('checkUser').innerHTML = 'Next Step';

        const button = document.getElementById("user_next");

        button.click();

      }

      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

