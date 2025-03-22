document.addEventListener("DOMContentLoaded", function () {
    const flipCards = document.querySelectorAll(".flip-card");
    let activeCard = null; // Keeps track of the currently flipped card
    let timeoutId = null; // Stores the timeout for auto-flipping

    function flipCard(card) {
        // If another card is already flipped, flip it back first
        if (activeCard && activeCard !== card) {
            activeCard.classList.remove("flipped");
            clearTimeout(timeoutId); // Cancel the previous timeout
        }

        card.classList.toggle("flipped");

        if (card.classList.contains("flipped")) {
            activeCard = card;

            // Auto flip back after 30 seconds
            timeoutId = setTimeout(() => {
                card.classList.remove("flipped");
                activeCard = null;
            }, 20000);
        } else {
            activeCard = null;
        }
    }

    flipCards.forEach(card => {
        card.style.cursor = "pointer"; // Make card clickable
        card.addEventListener("click", function () {
            flipCard(card);
        });
    });

    // Adjust height on window resize
    window.addEventListener("resize", () => {
        flipCards.forEach(card => {
            if (card.classList.contains("flipped")) {
                flipCard(card);
            }
        });
    });
});

if ('ontouchstart' in window || navigator.maxTouchPoints) {
    let styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            let rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = rules.length - 1; j >= 0; j--) {
                if (rules[j].selectorText && rules[j].selectorText.includes(':hover')) {
                    styleSheets[i].deleteRule(j);
                }
            }
        } catch (e) {
            console.warn("Could not access stylesheet: ", e);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
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