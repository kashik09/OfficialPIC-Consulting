document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");
    const emailInput = document.getElementById("floatingEmail");
    const promoCheck = document.getElementById("promoCheck");
    const phoneInputField = document.querySelector("#floatingPhone");

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