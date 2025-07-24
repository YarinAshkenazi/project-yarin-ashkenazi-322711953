


//-------------חלק א ----------------

const form = document.getElementById("reportform");
const formMessage = document.getElementById("formMessage");

form?.addEventListener("submit", function (e) {
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
    const report = {
      id: Date.now(),
      channel: channel,
      targetTime: targetTime,
      landingTime: document.getElementById("landing-time").value,
      description: document.getElementById("description").value,
      group: document.getElementById("group").value,
      security: document.getElementById("security").value,
      email: email,
      status: "פתוח"
    };

    saveItem(report);

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

// ------------------------ חלק ב ------------------------

function saveItem(report) {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));
}

window.addEventListener("DOMContentLoaded", renderItems);

function renderItems() {
  const container = document.getElementById("reportsContainer");
  if (!container) return;

  container.innerHTML = "";
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  if (reports.length === 0) {
    container.innerHTML = "<p>לא נמצאו דיווחים.</p>";
    return;
  }

  reports.forEach(report => {
    const card = document.createElement("div");
    card.className = "report-card";

    card.innerHTML = `
      <p><strong>תעלה:</strong> ${report.channel}</p>
      <p><strong>זמן יעד:</strong> ${formatDateTime(report.targetTime)}</p>
      <p><strong>זמן נחיתה:</strong> ${formatDateTime(report.landingTime)}</p>
      <p><strong>תיאור:</strong> ${report.description}</p>
      <p><strong>קבוצה:</strong> ${report.group}</p>
      <p><strong>אבטחה:</strong> ${report.security}</p>
      <p><strong>אימייל:</strong> ${report.email}</p>
      <p><strong>סטטוס:</strong> 
        <select onchange="updateItem(${report.id}, this.value)">
          <option value="פתוח" ${report.status === "פתוח" ? "selected" : ""}>פתוח</option>
          <option value="טופלה" ${report.status === "טופלה" ? "selected" : ""}>טופלה</option>
        </select>
      </p>
      <button onclick="deleteItem(${report.id})">מחק</button>
    `;

    container.appendChild(card);
  });
}


function formatDateTime(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) return "—";
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


function deleteItem(id) {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports = reports.filter(r => r.id !== id);
  localStorage.setItem("reports", JSON.stringify(reports));
  renderItems();
}

function updateItem(id, status) {
  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index].status = status;
    localStorage.setItem("reports", JSON.stringify(reports));
    renderItems();
  }
}






