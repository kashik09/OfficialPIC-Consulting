document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            console.log("Form submitted!");
        });
    }

    const emailInput = document.getElementById("floatingEmail");
    const promoCheck = document.getElementById("promoCheck");
    const phoneInputField = document.querySelector("#floatingPhone");

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

    phoneInputField.value = localStorage.getItem("phone") || "";
    emailInput.value = localStorage.getItem("email") || "";
    promoCheck.checked = localStorage.getItem("promo") === "true";

    phoneInputField.addEventListener("input", () => {
        localStorage.setItem("phone", phoneInput.getNumber());
    });

    emailInput.addEventListener("input", () => {
        localStorage.setItem("email", emailInput.value);
    });

    promoCheck.addEventListener("change", () => {
        localStorage.setItem("promo", promoCheck.checked);
    });
});