// Particle Background Effect
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(); // Recreate particles when window is resized
});

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.alpha = Math.random() * 0.5 + 0.5; // Variable opacity
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check with bounce effect
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        // Make particles pulse (change size slightly)
        this.size += this.pulseDirection * this.pulseSpeed;
        if (this.size < 0.5 || this.size > 4) {
            this.pulseDirection *= -1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 255, 204, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    // Adjust number of particles based on screen size
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    // Clear any existing particles
    while (particles.length > 0) {
        particles.pop();
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    if (!ctx) return; // Safety check

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    // Connect particles with lines if they're close enough
    connectParticles();

    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    const maxDistance = 150;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // Draw a line with opacity based on distance
                const opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(0, 255, 204, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Rain effect
function createRain() {
    // Check if rain container already exists
    if (document.querySelector('.rain')) return;

    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain';
    document.body.appendChild(rainContainer);

    const dropCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';

        // Random positioning
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.opacity = Math.random() * 0.3 + 0.1;
        drop.style.height = `${Math.random() * 15 + 10}px`;

        // Random animation duration
        const duration = Math.random() * 1 + 0.5;
        drop.style.animationDuration = `${duration}s`;

        // Random delay
        drop.style.animationDelay = `${Math.random() * 2}s`;

        rainContainer.appendChild(drop);
    }
}

// Ensure Audio Plays Only After User Interaction
let typingAudio = new Audio("typewriter.mp3");
typingAudio.volume = 0.5; // Lower volume for better user experience
typingAudio.loop = true; // Make sure audio loops if typing takes longer

let userInteracted = false;
let typingCompleted = false;
let rabbitTypingCompleted = false;

// Function to Start Typing Effect
function startTypingEffect() {
    if (typingCompleted) return;
    typingCompleted = true;

    const cursor = document.querySelector(".cursorText");
    const typedText = document.getElementById("typed-text");

    // Safety check for required elements
    if (!cursor || !typedText) return;

    const text = "Coming Soon...";
    let index = 0;
    const speed = 400; // Set typing speed to 400ms as requested

    function typeText() {
        if (index < text.length) {
            typedText.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(typeText, speed);
        } else {
            cursor.style.display = "none";

            // Wait 1 second, then show the second cursor and start rabbit typing
            setTimeout(() => {
                const cursorLink = document.querySelector(".cursorLink");
                if (cursorLink) {
                    cursorLink.style.display = "inline-block";
                    startRabbitTyping();
                }
            }, 1000);
        }
    }

    typeText();
}

function startRabbitTyping() {
    if (rabbitTypingCompleted) return;
    rabbitTypingCompleted = true;

    const cursorLink = document.querySelector(".cursorLink");
    const rabbitText = document.getElementById("rabbitText");
    const rabbitLink = document.getElementById("rabbitLink");

    // Safety check for required elements
    if (!cursorLink || !rabbitText || !rabbitLink) return;

    rabbitText.style.visibility = "visible";

    let text = "Follow the White Rabbit...";
    let index = 0;
    const speed = 400; // Set typing speed to 400ms as requested

    function typeRabbitText() {
        if (index < text.length) {
            rabbitText.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(typeRabbitText, speed);
        } else {
            // Add glitch effect and show rabbit
            setTimeout(() => {
                cursorLink.style.display = "none";
                rabbitText.className = "glitch";
                rabbitText.setAttribute("data-text", rabbitText.textContent);

                // Stop the music when rabbit appears
                typingAudio.pause();
                typingAudio.currentTime = 0;

                // Show rabbit with a small delay for dramatic effect
                setTimeout(() => {
                    rabbitLink.style.visibility = "visible";

                    // Add a little "glitch" sound effect when rabbit appears
                    try {
                        const glitchSound = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCgUFBQUFBQ8PDw8PDxQPDw8PDw8Y2NjY2NjfGNjY2NjY4+Pj4+Pj6CPj4+Pj4+5ubm5ubm5ybm5ubm5ud7e3t7e3u/e3t7e3t7///////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAX/++RAwAr8ApsxAhEAX8A5jR57E0EIJhEreWS/hEw/h/w/h+H//hfw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/D+EA93wY9Z//+H/EP4fygAfggH4fPBAP//xAP//if/Ifg/BAMfB/D+H8Pw/h/D8H8Pw/+CAf/5cDEH/lw//+XD//5cP//5cPwQD/+XD8EAvwfh+D+H4/+H//gh/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8P4fw/h/D+H8Pwfg/B///Qzwfwfh/D+H8P4fw+CD//5QPwQDH5cP//k4f//Jw//+Th///Jw/BAMD4P4fw/g/B8Hw///EP/8IB//giH//5OIB//5OE");
                        glitchSound.volume = 0.2;
                        glitchSound.play().catch(err => console.warn("Could not play glitch sound", err));
                    } catch (error) {
                        console.warn("Could not create or play glitch sound", error);
                    }
                }, 500);
            }, 400);
        }
    }

    typeRabbitText();
}

// Function to Start Music and Then Typing (AFTER User Interaction)
function startMusicAndTyping() {
    if (userInteracted) return;
    userInteracted = true;

    // Add "accessing..." text with matrix effect before starting
    const content = document.querySelector('.content');
    const accessingDiv = document.createElement('div');
    accessingDiv.style.position = 'absolute';
    accessingDiv.style.top = '20px';
    accessingDiv.style.left = '20px';
    accessingDiv.style.color = '#00ffcc';
    accessingDiv.style.fontFamily = 'VT323, monospace';
    accessingDiv.style.fontSize = '16px';
    accessingDiv.style.textAlign = 'left';
    accessingDiv.innerHTML = '> Accessing mainframe...';
    document.body.appendChild(accessingDiv);

    setTimeout(() => {
        accessingDiv.innerHTML += '<br>> Establishing secure connection...';
    }, 600);

    setTimeout(() => {
        accessingDiv.innerHTML += '<br>> Connection established.';

        // Try to play audio - handle both success and failure
        typingAudio.play().then(() => {
            console.log("🎵 Music started! Now typing...");
            setTimeout(startTypingEffect, 1000);
        }).catch(err => {
            console.warn("Audio failed to play:", err);
            // Continue with typing effect even if audio fails
            setTimeout(startTypingEffect, 1000);
        });

        // Remove the accessing text after a bit
        setTimeout(() => {
            accessingDiv.style.opacity = 0;
            setTimeout(() => accessingDiv.remove(), 1000);
        }, 2000);
    }, 1200);
}

// Variables for circuit path generation
const container = document.getElementById("circuit-container");
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute("width", "100%");
svgElement.setAttribute("height", "100%");
svgElement.setAttribute("viewBox", "0 0 1000 600");
svgElement.style.position = "absolute";
svgElement.style.top = "0";
svgElement.style.left = "0";
svgElement.style.zIndex = "-1";
svgElement.style.opacity = "0.2";

// Generate random circuit path
function generateCircuitPath() {
    let path = "M 50,50";
    let x = 50;
    let y = 50;

    for (let i = 0; i < 20; i++) {
        // Decide whether to move horizontally or vertically
        const isHorizontal = Math.random() > 0.5;

        if (isHorizontal) {
            x += Math.random() * 100 + 50;
            x = Math.min(x, 950); // Keep within bounds
        } else {
            y += Math.random() * 100 + 50;
            y = Math.min(y, 550); // Keep within bounds
        }

        path += ` L ${x},${y}`;
    }

    return path;
}

// Create circuit path
const pathData = generateCircuitPath();
const circuitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
circuitPath.setAttribute("d", pathData);
circuitPath.setAttribute("stroke", "#0070f3");
circuitPath.setAttribute("stroke-width", "2");
circuitPath.setAttribute("fill", "none");
circuitPath.setAttribute("class", "circuit-path");
svgElement.appendChild(circuitPath);

// Add circuit node at corners
const points = pathData.split(" L ");
const firstPoint = points[0].replace("M ", "").split(",");
const circuitNodes = [];

// Convert all points to numbers and add to circuitNodes array
circuitNodes.push({
    x: parseFloat(firstPoint[0]),
    y: parseFloat(firstPoint[1])
});

for (let i = 1; i < points.length; i++) {
    const coordinates = points[i].split(",");
    circuitNodes.push({
        x: parseFloat(coordinates[0]),
        y: parseFloat(coordinates[1])
    });
}

// Create SVG circles for each node
circuitNodes.forEach(node => {
    const nodeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    nodeCircle.setAttribute("cx", node.x);
    nodeCircle.setAttribute("cy", node.y);
    nodeCircle.setAttribute("r", 4);
    nodeCircle.setAttribute("fill", "#333");
    nodeCircle.setAttribute("class", "circuit-node");
    svgElement.appendChild(nodeCircle);
});

// Add animation effect to simulate electrical current
function animateCircuit() {
    const circuitPath = document.querySelector(".circuit-path");
    if (!circuitPath) return; // Safety check

    const pathLength = circuitPath.getTotalLength();

    // Set up the initial state
    circuitPath.style.strokeDasharray = pathLength;
    circuitPath.style.strokeDashoffset = pathLength;

    // Create animation
    try {
        const animation = circuitPath.animate(
            [
                { strokeDashoffset: pathLength },
                { strokeDashoffset: 0 }
            ],
            {
                duration: 2000,
                iterations: Infinity,
                easing: "linear"
            }
        );

        // Animate nodes with a slight delay
        const nodes = document.querySelectorAll(".circuit-node");
        nodes.forEach((node, index) => {
            const delay = (index * 200) % 2000;
            node.animate(
                [
                    { opacity: 0.5, r: 3 },
                    { opacity: 1, r: 5 },
                    { opacity: 0.5, r: 3 }
                ],
                {
                    duration: 1000,
                    iterations: Infinity,
                    delay: delay,
                    easing: "ease-in-out"
                }
            );
        });
    } catch (error) {
        console.warn("Circuit animation failed:", error);
        // Fallback for browsers that don't support Web Animations API
        circuitPath.style.animation = "circuitFlow 2s linear infinite";
    }
}

// Initialize the circuit animation when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize particles
    if (canvas && ctx) {
        createParticles();
        animateParticles();
    }

    // Initialize rain effect
    //createRain();

    // Initialize circuit animation
    if (container) {
        container.appendChild(svgElement);
        animateCircuit();
    } else {
        console.warn("Circuit container element not found");
    }

    // Add click event listener to document to handle user interaction
    document.addEventListener("click", startMusicAndTyping, { once: true });
    document.addEventListener("keydown", startMusicAndTyping, { once: true });
});

// Mobile navigation toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        }
    });
});

// Form validation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        let isValid = true;

        // Safety check for required elements
        if (!nameInput || !emailInput || !messageInput) {
            console.error("Form elements missing");
            return;
        }

        // Simple validation
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, "Name is required");
        } else {
            clearError(nameInput);
        }

        if (!emailInput.value.trim()) {
            isValid = false;
            showError(emailInput, "Email is required");
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Please enter a valid email");
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, "Message is required");
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            // Show success message
            const successMessage = document.createElement("div");
            successMessage.className = "mt-4 p-3 bg-green-100 text-green-700 rounded";
            successMessage.textContent = "Thank you for your message! We'll get back to you shortly.";
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

function showError(input, message) {
    // Clear any existing error
    clearError(input);

    // Create error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "text-red-500 text-sm mt-1 error-message";
    errorDiv.textContent = message;

    // Insert after input
    input.parentNode.insertBefore(errorDiv, input.nextSibling);

    // Add red border to input
    input.classList.add("border-red-500");
}

function clearError(input) {
    // Remove existing error message
    const parent = input.parentNode;
    const errorMessage = parent.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove();
    }

    // Remove red border
    input.classList.remove("border-red-500");
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate sections on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add("animate-active");
        }
    });
}

// Add animation for circuit path (fallback for browsers that don't support Web Animations API)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes circuitFlow {
    0% {
        stroke-dashoffset: 1000;
    }
    100% {
        stroke-dashoffset: 0;
    }
}`;
document.head.appendChild(styleSheet);

window.addEventListener("scroll", animateOnScroll);
document.addEventListener("DOMContentLoaded", animateOnScroll);

// White Rabbit Easter Egg
document.getElementById("rabbitLink").addEventListener("click", (event) => {
    event.preventDefault(); // Prevents the # from appearing in the URL
    console.log("Rabbit clicked!"); // Add your desired action here

    // Show Matrix-themed alert
    alert("Wake up, Neo... The Matrix has you.");

    // Redirect to CV after the user clicks OK on the alert
    window.location.href = "https://cv.neocorporation.in";
});