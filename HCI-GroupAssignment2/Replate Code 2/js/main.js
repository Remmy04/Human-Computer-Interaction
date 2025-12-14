// ==================== BASE CONFIGURATION ====================
const BASE_PRICE = 4.5;

// DOM Elements
const sushiCard = document.getElementById("card-sushi");
const itemOverlay = document.getElementById("item-overlay");
const backButton = document.getElementById("btn-back");
const qtyDisplay = document.getElementById("qty-display");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const priceValue = document.getElementById("price-value");
const btnAddToCart = document.getElementById("btn-add-to-cart");
const notification = document.getElementById("success-notification");
const btnViewCart = document.getElementById("btn-view-cart");
const particleContainer = document.getElementById("particle-container");
const canvas = document.getElementById("visual-canvas");

// Audio Elements
const soundClick = document.getElementById("sound-click");
const soundMinus = document.getElementById("sound-minus");
const soundNotification = document.getElementById("sound-notification");

let quantity = 1;

// ==================== WEB AUDIO API INITIALIZATION ====================

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Generate a musical tone using Web Audio API
 */
function playTone(frequency, duration, type = 'sine') {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + duration * 0.7);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log("Audio context error:", e);
  }
}

function playSuccessTone() {
  try {
    playTone(587.33, 0.2, 'sine');
    setTimeout(() => playTone(783.99, 0.3, 'sine'), 150);
    setTimeout(() => playTone(987.77, 0.35, 'sine'), 350);
  } catch (e) {
    console.log("Could not play success tone");
  }
}

function playClickTone() {
  try {
    playTone(440, 0.1, 'square');
  } catch (e) {
    console.log("Could not play click tone");
  }
}

function playDeclineTone() {
  try {
    playTone(329.63, 0.15, 'sine');
  } catch (e) {
    console.log("Could not play decline tone");
  }
}

// ==================== ADVANCED PARTICLE EFFECTS ====================

/**
 * Create burst particle effect - particles expand outward
 */
function createBurstEffect(x, y, color = '#298f6f', count = 16) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle burst';
    
    const angle = (i / count) * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 12 + 6 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = color;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 800);
  }
}

/**
 * Create ripple effect - expanding rings
 */
function createRippleEffect(x, y, color = '#298f6f', count = 3) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle ripple';
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '30px';
    particle.style.height = '30px';
    particle.style.borderColor = color;
    particle.style.animation = `rippleEffect 0.8s ease-out forwards ${i * 0.15}s`;
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000 + i * 150);
  }
}

/**
 * Create glow particles - particles that pulse and fade
 */
function createGlowEffect(x, y, color = '#95dc71', count = 8) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle glow';
    
    const size = Math.random() * 14 + 6;
    particle.style.left = x - size / 2 + 'px';
    particle.style.top = y - size / 2 + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.animationDelay = i * 0.08 + 's';
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 600 + i * 80);
  }
}

/**
 * Create floating particles that drift upward
 */
function createFloatingEffect(x, y, color = '#bdeaa2', count = 6) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = color;
    particle.style.opacity = '0.8';
    
    const velocityX = (Math.random() - 0.5) * 4;
    const velocityY = -Math.random() * 3 - 2;
    let life = 1;

    particleContainer.appendChild(particle);

    const animate = () => {
      life -= 0.015;
      x += velocityX;
      y += velocityY;

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.opacity = life.toString();

      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    animate();
  }
}

/**
 * Create confetti effect - multiple types of particles
 */
function createConfettiEffect(x, y) {
  const colors = ['#298f6f', '#95dc71', '#bdeaa2', '#114233', '#f3ffb0'];
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle burst';
    
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distance = 100 + Math.random() * 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    const size = Math.random() * 10 + 5;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animation = 'burstParticle 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
}

// ==================== CANVAS 2D API - ADVANCED VISUALIZATIONS =====================

/**
 * Enhanced canvas animation with animated background
 */
function drawCanvasEffect() {
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() / 1000;

  // Draw main gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#298f6f');
  gradient.addColorStop(0.5, '#95dc71');
  gradient.addColorStop(1, '#bdeaa2');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw animated geometric shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 5; i++) {
    const x = (Math.sin(time + i) * 60 + 70) + i * 50;
    const y = (Math.cos(time * 0.8 + i) * 40 + 50);
    const radius = 20 + Math.sin(time + i * 1.5) * 8;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw animated lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const offset = Math.sin(time + i) * 30;
    ctx.beginPath();
    ctx.moveTo(0, 50 + offset + i * 15);
    ctx.lineTo(canvas.width, 30 + offset + i * 15);
    ctx.stroke();
  }

  // Draw pulsing center element
  const pulseSize = 10 + Math.sin(time * 2) * 5;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, pulseSize, 0, Math.PI * 2);
  ctx.fill();
}

// ==================== UTILITY FUNCTIONS ====================

function updatePrice() {
  const total = BASE_PRICE * quantity;
  priceValue.textContent = total.toFixed(2);
}

function playSafe(sound, toneFunc) {
  if (sound && sound.play) {
    sound.currentTime = 0;
    sound.play().catch(() => {
      if (toneFunc) {
        toneFunc();
      }
    });
  } else if (toneFunc) {
    toneFunc();
  }
}

// ==================== EVENT LISTENERS ====================

if (sushiCard) {
  sushiCard.addEventListener("click", (event) => {
    itemOverlay.classList.remove("hidden");
    itemOverlay.setAttribute("aria-hidden", "false");
    
    const rect = sushiCard.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createBurstEffect(x, y, '#298f6f', 16);
    createRippleEffect(x, y, '#95dc71', 2);
    playSafe(soundClick, playClickTone);
  });
}

if (backButton) {
  backButton.addEventListener("click", () => {
    itemOverlay.classList.add("hidden");
    itemOverlay.setAttribute("aria-hidden", "true");
    playSafe(soundClick, playClickTone);
  });
}

if (btnPlus) {
  btnPlus.addEventListener("click", (event) => {
    quantity += 1;
    qtyDisplay.textContent = quantity;
    updatePrice();

    const rect = btnPlus.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createGlowEffect(x, y, '#95dc71', 8);
    createFloatingEffect(x, y, '#bdeaa2', 5);
    playSafe(soundClick, playClickTone);
  });
}

if (btnMinus) {
  btnMinus.addEventListener("click", (event) => {
    if (quantity > 1) {
      quantity -= 1;
      qtyDisplay.textContent = quantity;
      updatePrice();

      const rect = btnMinus.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      createGlowEffect(x, y, '#bdeaa2', 6);
      createFloatingEffect(x, y, '#95dc71', 4);
      playSafe(soundMinus, playDeclineTone);
    }
  });
}

if (btnAddToCart) {
  btnAddToCart.addEventListener("click", (event) => {
    notification.classList.remove("hidden");
    notification.setAttribute("aria-hidden", "false");

    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createConfettiEffect(x, y);
    createBurstEffect(x, y, '#114233', 20);
    createRippleEffect(x, y, '#298f6f', 3);
    
    playSuccessTone();
    playSafe(soundNotification);
  });
}

if (btnViewCart) {
  btnViewCart.addEventListener("click", () => {
    notification.classList.add("hidden");
    notification.setAttribute("aria-hidden", "true");
    playSafe(soundClick, playClickTone);
  });
}

if (notification) {
  notification.addEventListener("click", (event) => {
    if (event.target === notification) {
      notification.classList.add("hidden");
      notification.setAttribute("aria-hidden", "true");
    }
  });
}

// ==================== INITIALIZATION ====================

updatePrice();

if (canvas) {
  setInterval(drawCanvasEffect, 50);
}

console.log("Replate Enhanced UI - Advanced Visual Effects Active");
console.log("✓ Multiple particle effect types (burst, ripple, glow, floating, confetti)");
console.log("✓ Canvas 2D API animations with geometric shapes");
console.log("✓ Web Audio API dynamic sound generation");
console.log("✓ Smooth interactions and transitions");