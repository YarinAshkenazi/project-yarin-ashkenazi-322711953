const form = document.getElementById("reportform");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  document.querySelectorAll(".error").forEach(el => el.style.display = "none");
  formMessage.style.display = "none";
  formMessage.textContent = "";
  formMessage.className = "form-message";

  let isValid = true;

  const channel = document.getElementById("channel-number").value.trim();
  const targetTime = document.getElementById("target-time").value;
  const email = document.getElementById("email").value;

if (!channel || channel <= 0) {
  const errorEl = document.getElementById("channelError");
  errorEl.textContent = "מספר התעלה חייב להיות מספר חיובי גדול מ-0";
  errorEl.style.display = "block";
  isValid = false;
}

  if (!targetTime) {
    document.getElementById("targetTimeError").style.display = "block";
    isValid = false;
  }

  if (!validateEmail(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    formMessage.textContent = "הטופס נשלח בהצלחה!";
    formMessage.classList.add("success");
    formMessage.style.display = "block";
    form.reset();
  } else {
    formMessage.textContent = "נא למלא את כל השדות הנדרשים כראוי.";
    formMessage.classList.add("error-message");
    formMessage.style.display = "block";
  }
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email.trim());
}

