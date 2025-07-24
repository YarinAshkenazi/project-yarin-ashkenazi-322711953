 const form = document.getElementById("reportform");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      document.querySelectorAll(".error").forEach(el => el.style.display = "none");

      let isValid = true;

      const channel = document.getElementById("channel-number").value.trim();
      const targetTime = document.getElementById("target-time").value;
      const email = document.getElementById("email").value;

      if (!channel) {
        document.getElementById("channelError").style.display = "block";
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
        alert("הטופס נשלח בהצלחה!");
        form.reset();
      } else {
        alert("נא למלא את כל השדות הנדרשים כראוי.");
      }
    });


function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email.trim());
}
