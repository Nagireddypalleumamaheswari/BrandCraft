const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");

input.addEventListener("change", function() {
    const file = this.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});

async function analyze() {
    const file = input.files[0];
    const gender = document.getElementById("gender").value;

    if(!file) {
        alert("Upload an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("gender", gender);

    try {
        const res = await fetch("/analyze", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        document.getElementById("tone").innerText = data.skin_tone;
        document.getElementById("recommendation").innerText = data.recommendations;

        document.getElementById("results").classList.remove("hidden");

    } catch(err) {
        alert("Error analyzing image.");
