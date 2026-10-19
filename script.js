// 1. Background Music & Welcome Gate Control
const welcomeScreen = document.getElementById('welcome-screen');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicStatus = document.getElementById('music-status');

startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hide');
    bgMusic.volume = 1.0;
    bgMusic.play().then(() => {
        musicStatus.textContent = 'Playing';
    }).catch((err) => {
        console.log('Audio play issue:', err);
        musicStatus.textContent = 'Tap to Play';
    });
});

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicStatus.textContent = 'Playing';
    } else {
        bgMusic.pause();
        musicStatus.textContent = 'Paused';
    }
});

// 2. Live Relationship Counter (Since 20 October 2022, 00:00:00)
const startDate = new Date('2022-10-20T00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// 3. Open Love Letter Card
const openLetterBtn = document.getElementById('open-letter-btn');
const letterCard = document.getElementById('letter-card');

openLetterBtn.addEventListener('click', () => {
    letterCard.classList.toggle('open');
    if (letterCard.classList.contains('open')) {
        openLetterBtn.textContent = 'Close Letter 💌';
    } else {
        openLetterBtn.textContent = 'Tap to Read My Heart, Sona 🌹';
    }
});

// 4. Lightbox for Fullscreen Gallery View
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// 5. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// 6. Falling Red Rose Petals Animation (Canvas)
const canvas = document.getElementById('rose-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const petals = [];
const petalCount = 28;

for (let i = 0; i < petalCount; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.4 + 0.6,
        speedX: Math.random() * 1 - 0.5,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        color: Math.random() > 0.3 ? '#e60039' : '#ff4d79'
    });
}

function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ff0044';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size, -p.size, p.size * 1.5, p.size, 0, p.size * 1.5);
        ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size, 0, 0);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.4;
        p.angle += p.spin;

        if (p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawPetals);
}
drawPetals();

// 7. Touch / Click Heart Burst Effect on Mobile
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.className = 'touch-heart';
    const symbols = ['❤️', '🌹', '💙', '🖤', '✨'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});