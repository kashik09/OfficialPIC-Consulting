document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.flip-card').forEach(card => {
        let cardInner = card.querySelector('.flip-card-inner');
        let front = card.querySelector('.flip-card-front');
        let back = card.querySelector('.flip-card-back');

        // Set initial height based on front content
        cardInner.style.height = front.scrollHeight + "px";

        card.addEventListener('click', function () {
            this.classList.toggle('flipped');

            if (this.classList.contains('flipped')) {
                // Expand to fit back content
                cardInner.style.height = back.scrollHeight + "px";
            } else {
                // Shrink back to fit front content
                cardInner.style.height = front.scrollHeight + "px";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            console.log("Form submitted!");
        });
    }

    const phoneInputField = document.querySelector("#floatingPhone");
    const emailInput = document.getElementById("floatingEmail");
    const messageInput = document.getElementById("floatingMessage");
    // const promoCheck = document.getElementById("promoCheck");

    const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: [
            "ke", // Kenya 🇰🇪
            "us", // United States 🇺🇸
            "gb", // United Kingdom 🇬🇧
            "au", // Australia 🇦🇺
            "ug", // Uganda 🇺🇬
            "tz", // Tanzania 🇹🇿
            "rw", // Rwanda 🇷🇼
            "et", // Ethiopia 🇪🇹
        ],
        separateDialCode: true, 
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });    

    firstNameInput.value = localStorage.getItem("firstName") || "";
    lastNameInput.value = localStorage.getItem("lastName") || "";
    phoneInputField.value = localStorage.getItem("phone") || "";
    emailInput.value = localStorage.getItem("email") || "";
    messageInput.value = localStorage.getItem("message") || "";
    // promoCheck.checked = localStorage.getItem("promo") === "true";

    firstNameInput.addEventListener("input", () => {
        localStorage.setItem("firstName", firstNameInput.value);
    });
    
    lastNameInput.addEventListener("input", () => {
        localStorage.setItem("lastName", lastNameInput.value);
    });

    phoneInputField.addEventListener("input", () => {
        localStorage.setItem("phone", phoneInput.getNumber(intlTelInputUtils.numberFormat.E164));
    });


    emailInput.addEventListener("input", () => {
        localStorage.setItem("email", emailInput.value);
    });

    messageInput.addEventListener("input", () => {
        localStorage.setItem("message", messageInput.value);
    });

    // promoCheck.addEventListener("change", () => {
    //     localStorage.setItem("promo", promoCheck.checked);
    // });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formattedPhone = phoneInput.getNumber(intlTelInputUtils.numberFormat.E164);
    const formData = new FormData(form);
    formData.set("floatingPhone", formattedPhone);

    fetch(form.action, {
        method: form.method,
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              showToast("Thank you! Your form has been submitted successfully.", true);
              form.reset();
              localStorage.clear();
          } else {
              showToast(data.errors ? data.errors.join("<br>") : "Something went wrong.");
          }
      })
      .catch(() => showToast("Network error. Please try again."));
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const formattedPhone = phoneInput.getNumber(intlTelInputUtils.numberFormat.E164);
    const formData = new FormData(form);
    formData.set("floatingPhone", formattedPhone);

    fetch(form.action, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast("✅ Thank you! Your form has been submitted successfully.", true);
            form.reset();
            localStorage.clear(); // ✅ Clears saved form values upon successful submission
        } else {
            showToast(data.errors ? data.errors.join("<br>") : "Something went wrong.");
        }
    })
    .catch(() => showToast("❌ Network error. Please try again."));
});