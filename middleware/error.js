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
        
        let response = await fetch("/api/submit-form", {  // ✅ Ensures correct API call
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: { "Content-Type": "application/json" }
        });        

        let data = await response.json();

        if (!response.ok) {
            showToast(data.errors ? data.errors.join("<br>") : data.message || "Something went wrong.");
        } else {
            showToast("✅ Thank you! Your form has been submitted successfully.", true); // Show success toast
            setTimeout(() => form.reset(), 1500);
        }        
    } catch (_error) {
        console.error("Network error:", _error);
        showToast("Network error. Please try again later.");
    }    
});

function showToast(message, success = false) {
    let toastElement = document.getElementById("toastContainer");
    let toastMessage = document.getElementById("toastMessage");

    toastElement.classList.remove("bg-danger", "bg-success", "show");
    toastElement.classList.add(success ? "bg-success" : "bg-danger");

    toastMessage.innerHTML = message;
    
    let toast = new bootstrap.Toast(toastElement, { delay: 10000 });
    toastElement.style.display = "block";
    toast.show();

    setTimeout(() => {
        toast.hide();
        toastElement.style.display = "none";
    }, 10000);
}