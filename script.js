let currentUser = "bee";
let currentPass = "buzz";
let quizIndex = 0;

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === currentUser && pass === currentPass) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("factsPage").style.display = "block";
    } else {
        document.getElementById("loginError").innerText = "Incorrect login!";
    }
}

function goToGarden() {
    document.getElementById("factsPage").style.display = "none";
    document.getElementById("gardenPage").style.display = "block";
}

function spawnBee(type) {
    const bee = document.createElement("div");
    bee.classList.add("bee");
    const timeout = setTimeout(() => {
        bee.classList.add("angry");
    }, 5000); // turn red in 5 seconds if not clicked
    bee.onclick = () => {
        clearTimeout(timeout);
        bee.remove();
    };
    document.getElementById("garden").appendChild(bee);
}

function nextQuestion() {
    const slides = document.querySelectorAll(".quiz-slide");
    slides[quizIndex].classList.remove("active");
    quizIndex = (quizIndex + 1) % slides.length;
    slides[quizIndex].classList.add("active");
}

function prevQuestion() {
    const slides = document.querySelectorAll(".quiz-slide");
    slides[quizIndex].classList.remove("active");
    quizIndex = (quizIndex - 1 + slides.length) % slides.length;
    slides[quizIndex].classList.add("active");
}