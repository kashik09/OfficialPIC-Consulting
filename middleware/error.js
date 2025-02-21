document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let form = event.target;
    let formData = new FormData(form);
    let errors = [];

    // Extract form values
    let firstName = formData.get("floatingFirstName").trim();
    let lastName = formData.get("floatingLastName").trim();
    let phone = formData.get("floatingPhone").trim();
    let email = formData.get("floatingEmail").trim();

    // Frontend validation
    if (firstName.length < 2) {
        errors.push("First Name must be at least 2 characters.");
    }
    if (lastName.length < 2) {
        errors.push("Last Name must be at least 2 characters.");
    }
    if (!/^[0-9]{7,10}$/.test(phone)) {
        errors.push("Phone Number must be 7-10 digits.");
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.push("Invalid Email format.");
    }

    if (errors.length > 0) {
        showToast(errors.join("<br>"));
        return;
    }

    try {
        let jsonData = {};
        formData.forEach((value, key) => jsonData[key] = value);
        
        let response = await fetch(form.action, {
            method: form.method,
            body: JSON.stringify(jsonData),
            headers: { "Content-Type": "application/json" }
        });        

        let data = await response.json();

        if (!response.ok) {
            // ✅ Only show toasts for client errors (errorType: "client")
            if (data.errorType === "client") {
                showToast(data.errors ? data.errors.join("<br>") : "Invalid input.");
            } else {
                console.error("Server error:", data.message); // ✅ Log server errors, don't show them as toasts
            }
        } else {
            showToast(data.success, true); // Show success toast
            setTimeout(() => form.reset(), 1500);
        }        
    } catch (error) {
        showToast("Network error. Please try again later.");
    }
});

function showToast(message, success = false) {
    let toastElement = document.getElementById("toastContainer");
    let toastMessage = document.getElementById("toastMessage");

    toastElement.classList.remove("bg-danger", "bg-success");
    toastElement.classList.add(success ? "bg-success" : "bg-danger");

    toastMessage.innerHTML = message;
    let toast = new bootstrap.Toast(toastElement);
    toast.show();

    setTimeout(() => toast.hide(), 10000); // Auto-hide after 10 seconds
}