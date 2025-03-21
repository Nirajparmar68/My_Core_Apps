//const matrixEffect = () => {
//    const canvas = document.getElementById("matrixCanvas");
//    const ctx = canvas.getContext("2d");

//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;

//    const letters = "01 10 101 0101 10101 01010101 101010101".split("");
//    const fontSize = 16;
//    const columns = canvas.width / fontSize;
//    const drops = Array(Math.floor(columns)).fill(1);

//    function drawMatrix() {
//        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
//        ctx.fillRect(0, 0, canvas.width, canvas.height);

//        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 1})`;
//        ctx.font = fontSize + "px VT323";

//        for (let i = 0; i < drops.length; i++) {
//            const text = letters[Math.floor(Math.random() * letters.length)];
//            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

//            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//                drops[i] = 0;
//            }
//            drops[i]++;
//        }
//    }

//    setInterval(drawMatrix, 50);
//};

// Particle Background Effect
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#00ffcc";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}



// Ensure Audio Plays Only After User Activity
let typingAudio = new Audio("typewriter.mp3");
typingAudio.volume = 0.8;
let userInteracted = false;
let typingCompleted = false;
let rabbitTypingCompleted = false;

// Function to Start Typing Effect
function startTypingEffect() {
    if (typingCompleted) return; // Prevent multiple executions
    typingCompleted = true;

    const cursor = document.querySelector(".cursorText");
    const typedText = document.getElementById("typed-text");
    const text = "Coming Soon...";
    let index = 0;
    const speed = 400; // Adjusted speed for better effect

    function typeText() {
        if (index < text.length) {
            typedText.innerHTML = text.substring(0, index + 1) // Cursor moves with text
            index++;
            setTimeout(typeText, speed);
        } else {
            cursor.style.display = "none"; // Hide cursor after typing

            // Stop music for 1 second, then restart & type Rabbit text
            typingAudio.pause();
            setTimeout(() => {
                typingAudio.play(); // Restart music
                startRabbitTyping(); // Start typing 'Follow the White Rabbit..'
            }, 1000);
        }
    }

    typeText();
}

function startRabbitTyping() {
    if (rabbitTypingCompleted) return; // Prevent multiple executions
    rabbitTypingCompleted = true;

    const cursorLink = document.querySelector(".cursorLink");
    const rabbitText = document.getElementById("rabbitText");
    const rabbitLink = document.getElementById("rabbitLink");
    rabbitText.style.visibility = "visible"; // Make it visible

    let text = "Follow the White Rabbit...";
    let index = 0;
    const speed = 400;

    function typeRabbitText() {
        if (index < text.length) {
            rabbitText.innerHTML = text.substring(0, index + 1) + "<span class='cursorLink'>|</span>"; // Cursor moves with text
            index++;
            setTimeout(typeRabbitText, speed);
        } else {
            // Stop playing music once rabbit symbol appears
            typingAudio.pause();
            cursorLink.style.display = "none"; // Hide cursor after typing
            rabbitLink.style.visibility = "visible"; // Make it visible
        }
    }

    typeRabbitText();
}


// Function to Start Music and Then Typing
function startMusicAndTyping() {
    if (userInteracted) return; // Prevent multiple triggers
    userInteracted = true;

    typingAudio.play().catch(() => { }); // Try playing audio

    // Wait for the audio to confirm it has started playing
    typingAudio.play().then(() => {
        console.log("🎵 Music started! Now typing...");
        setTimeout(startTypingEffect, 1000);
    }).catch(err => console.error("Audio failed to play:", err));

}

// Listen for Any User Activity (Click, Keypress, or Touch)
document.addEventListener("click", startMusicAndTyping);
document.addEventListener("keydown", startMusicAndTyping);
document.addEventListener("touchstart", startMusicAndTyping);

// Start Matrix Effect on Page Load
window.onload = () => {
    //matrixEffect();
    createParticles();
    animateParticles();

    // White Rabbit Easter Egg
    document.getElementById("rabbitLink").addEventListener("click", (event) => {
        event.preventDefault(); // Prevents the # from appearing in the URL
        console.log("Rabbit clicked!"); // Add your desired action here
        alert("Wake up, Neo... The Matrix has you.");
    });
};