document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded Successfully!");

    // Event Handling (Click, Hover, Keypress)
    document.addEventListener("click", () => console.log("Page Clicked!"));
    document.addEventListener("keypress", (event) => console.log(`Key Pressed: ${event.key}`));

    // Smooth Animations & Transitions
    document.querySelectorAll(".fade").forEach(el => {
        el.style.transition = "opacity 1s ease-in-out";
        el.style.opacity = "1";
    });

    // Form Validation
    document.getElementById("contact-form")?.addEventListener("submit", function (event) {
        let email = document.getElementById("email").value;
        if (!email.includes("@")) {
            alert("Please enter a valid email!");
            event.preventDefault();
        }
    });

    // Fetching API Data (Example)
    document.getElementById("fetch-data")?.addEventListener("click", function () {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(response => response.json())
            .then(data => alert(`Fetched Data: ${data.title}`))
            .catch(error => console.error("Error fetching data:", error));
    });

    // Local Storage Example
    document.getElementById("save-btn")?.addEventListener("click", function () {
        localStorage.setItem("userPreference", "DarkMode");
        alert("Preference Saved!");
    });

    // Interactive Sliders (Simple Example)
    let slider = document.getElementById("slider");
    if (slider) {
        slider.addEventListener("input", function () {
            document.getElementById("slider-value").textContent = `Value: ${slider.value}`;
        });
    }
});
