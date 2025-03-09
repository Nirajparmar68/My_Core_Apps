const matrixEffect = () => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01 10 101 0101 10101 01010101 101010101".split("");
    const fontSize = 16; // Increased font size for better readability
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Improved contrast
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Neon green
        ctx.font = fontSize + "px VT323"; //px Orbitron"; // Clearer font

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
};

window.onload = () => {
    matrixEffect();

    // White Rabbit Easter Egg
    document.getElementById("rabbitLink").addEventListener("click", () => {
        alert("Wake up, Neo... The Matrix has you.");
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const text = "Coming Soon...";
    let index = 0;
    const speed = 400; // Typing speed (ms)
    const typedText = document.getElementById("typed-text");
    const cursor = document.querySelector(".cursor");

    function typeText() {
        if (index < text.length) {
            typedText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, speed);
        } else {
            cursor.style.display = "none"; // Hide cursor after typing is done
        }
    }

    typeText(); // Start typing effect
});
