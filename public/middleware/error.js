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
        showToast(data.errors?.join("<br>") || "Something went wrong.");
        // Show validation errors in a toast
        return;
    }

    try {
        let response = await fetch(form.action, {
            method: form.method,
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { "Content-Type": "application/json" }
        });

        let data = await response.json();

        if (!response.ok) {
            showToast(data.errors.join("<br>")); // Show server-side validation errors
        } else {
            showToast(data.success, true); // Show success toast
            form.reset(); // Clear form on success
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
}