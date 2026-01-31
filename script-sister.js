// ================= DOM ELEMENTS =================
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4'),
    scene5: document.getElementById('scene5')
};

const buttons = {
    unlock: document.getElementById('unlockBtn'),
    next1: document.getElementById('nextBtn1'),
    next2: document.getElementById('nextBtn2'),
    love: document.getElementById('loveBtn'),
    hug: document.getElementById('hugBtn'),
    replay: document.getElementById('replayBtn')
};

const elements = {
    newMonthGreeting: document.getElementById('newMonthGreeting'),
    typewriter: document.getElementById('typewriter'),
    wishesContainer: document.querySelector('.wishes-container'),
    sisterMessage: document.getElementById('sisterMessage'),
    celebrationText: document.getElementById('celebrationText'),
    confettiContainer: document.getElementById('confettiContainer'),
    celebrationSound: document.getElementById('celebrationSound')
};

// ================= CONFIGURATION =================
const CONFIG = {
    sisterName: "My Amazing Sister 💝", // Change this to her name
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    typewriterMessages: [],
    wishes: [
        "Grace that covers every step you take",
        "Wisdom for every decision you make",
        "Protection from all worries and stress",
        "Unexpected blessings that make you smile",
        "Everything aligning perfectly for your good",
        "Favor in everything you set your heart to",
        "Strength on days you feel tired",
        "Peace that surpasses all understanding",
        "Joy that overflows in your heart",
        "Love that surrounds you always"
    ],
    celebrationMessage: ""
};

// ================= STATE VARIABLES =================
let currentScene = 'scene1';
let typewriterIndex = 0;
let charIndex = 0;
let isTyping = false;
let isSoundEnabled = true;

// ================= INITIALIZATION =================
function init() {
    CONFIG.typewriterMessages = [
        `Happy New Month, ${CONFIG.sisterName} ✨`,
        "May this February bring you endless blessings,",
        "peace that settles deep in your soul,",
        "and victories that make your heart dance.",
        "You deserve every beautiful moment coming your way 💫",

        "First of all...",
        "Happy Sunday, sis! 🌸",
        "I hope today wraps you in calm,",
        "gentle moments,",
        "and sweet peace.",
        "May your heart rest today,",
        "and may you feel God's presence closely.",

        "I pray this month covers you with grace.",
        "That every step you take is divinely guided.",
        "That doors meant for you open wide,",
        "and doors not for you close quietly.",

        "I pray for peace over your mind,",
        "strength in moments you feel weak,",
        "and joy that finds you unexpectedly.",

        "May God protect you in your going out",
        "and your coming in.",
        "May He uplift you when you're down,",
        "and surround you with His love...",
        "and mine too 💝",

        "I know life gets busy,",
        "and some days feel heavy.",
        "But please remember:",

        "You're stronger than you think.",
        "Braver than you believe.",
        "And more capable than you imagine.",

        "Even on tired days,",
        "or uncertain days,",
        "or quiet, overwhelming days...",
        "you are still wonderful.",

        "I hope this month reminds you",
        "of how valuable you are.",
        "That you don't have to prove yourself",
        "to be worthy of love.",

        "Your heart, your laughter,",
        "your dreams, your quiet moments...",
        "all of you is precious.",

        "If challenges come this month,",
        "I pray they bring growth.",
        "If tears come,",
        "I pray they bring healing.",
        "And if joy comes...",
        "I pray it stays and multiplies.",

        "Thank you for being you.",
        "For being my sister.",
        "For existing in this world.",

        "This month,",
        "and every month after...",
        "I hope you feel deeply loved.",
        "Truly seen.",
        "And never alone.",

        "Because you have me.",
        "Always.",
        "No matter what.",

        "I'm here.",
        "I see you.",
        "I'm proud of you.",
        "And I love you.",
        "More than words can say 💕"
    ];

    CONFIG.celebrationMessage = `You're an incredible woman, and I'm blessed to call you my sister. May this month bring you closer to your dreams, fill your days with joy, and remind you of how loved you are. I'm always here for you, no matter what. I love you forever 💝`;

    document.querySelector('.month-badge').textContent = CONFIG.currentMonth;
    elements.newMonthGreeting.textContent = `Happy New Month, ${CONFIG.sisterName}`;

    setupEventListeners();
    
    setTimeout(() => {
        if (currentScene === 'scene2') {
            typeNextMessage();
        }
    }, 1000);
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    buttons.unlock.addEventListener('click', () => switchScene('scene2'));
    buttons.next1.addEventListener('click', () => switchScene('scene3'));
    buttons.next2.addEventListener('click', () => switchScene('scene4'));
    buttons.love.addEventListener('click', handleLoveClick);
    buttons.hug.addEventListener('click', handleHugClick);
    buttons.replay.addEventListener('click', resetExperience);
}

// ================= RESET EXPERIENCE =================
function resetExperience() {
    currentScene = 'scene1';
    typewriterIndex = 0;
    charIndex = 0;
    isTyping = false;

    Object.values(scenes).forEach(scene => scene.classList.remove('active'));
    scenes.scene1.classList.add('active');

    elements.typewriter.innerHTML = '';
    elements.wishesContainer.innerHTML = '';
    elements.confettiContainer.innerHTML = '';

    elements.celebrationSound.pause();
    elements.celebrationSound.currentTime = 0;
}

// ================= SCENE MANAGEMENT =================
function switchScene(targetScene) {
    scenes[currentScene].classList.remove('active');
    scenes[targetScene].classList.add('active');
    currentScene = targetScene;

    switch (targetScene) {
        case 'scene2':
            setTimeout(() => {
                typewriterIndex = 0;
                charIndex = 0;
                elements.typewriter.innerHTML = '';
                typeNextMessage();
            }, 500);
            break;
        case 'scene3':
            setTimeout(() => createWishCards(), 500);
            break;
        case 'scene4':
            setTimeout(() => {
                displaySisterMessage();
            }, 500);
            break;
    }
}

// ================= TYPEWRITER EFFECT =================
function typeNextMessage() {
    if (typewriterIndex >= CONFIG.typewriterMessages.length) return;

    isTyping = true;
    const message = CONFIG.typewriterMessages[typewriterIndex];
    elements.typewriter.innerHTML = '';
    charIndex = 0;

    const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
            elements.typewriter.innerHTML += message.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            typewriterIndex++;

            setTimeout(() => {
                if (typewriterIndex < CONFIG.typewriterMessages.length) {
                    elements.typewriter.innerHTML += '<br><br>';
                    typeNextMessage();
                }
            }, 1500);
        }
    }, 50);
}

// ================= WISH CARDS =================
function createWishCards() {
    elements.wishesContainer.innerHTML = '';

    CONFIG.wishes.forEach((wish, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<p class="wish-text">${wish}</p>`;
            elements.wishesContainer.appendChild(card);
            setTimeout(() => card.classList.add('visible'), 10);
        }, index * 300);
    });
}

// ================= SISTER MESSAGE =================
function displaySisterMessage() {
    const sisterMessages = [
        "I want you to know how much I see you.",
        "I see your strength, even when you feel weak.",
        "I see your kindness, even when others don't appreciate it.",
        "I see your hard work, even when no one notices.",
        "I see your beautiful heart, even when you doubt yourself.",

        "I'm so proud of you.",
        "Proud of the woman you're becoming.",
        "Proud of how you handle challenges.",
        "Proud of your big dreams and beautiful heart.",

        "You are enough.",
        "More than enough.",
        "Exactly as you are.",

        "This month, remember:",
        "Your journey is unique.",
        "Your pace is perfect.",
        "Your story is still being written.",

        "And through every chapter,",
        "I'll always be here.",
        "Cheering for you.",
        "Believing in you.",
        "Loving you.",

        "Because you're not just my sister.",
        "You're my friend.",
        "My blessing.",
        "My answered prayer.",

        "I love you so much 💕"
    ];

    elements.sisterMessage.innerHTML = '';
    let messageIndex = 0;
    let charIdx = 0;

    function typeSisterMessage() {
        if (messageIndex >= sisterMessages.length) return;

        isTyping = true;
        const message = sisterMessages[messageIndex];
        elements.sisterMessage.innerHTML = '';
        charIdx = 0;

        const typeInterval = setInterval(() => {
            if (charIdx < message.length) {
                elements.sisterMessage.innerHTML += message.charAt(charIdx);
                charIdx++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                messageIndex++;

                setTimeout(() => {
                    if (messageIndex < sisterMessages.length) {
                        elements.sisterMessage.innerHTML += '<br><br>';
                        typeSisterMessage();
                    }
                }, 1500);
            }
        }, 50);
    }

    typeSisterMessage();
}

// ================= BUTTON HANDLERS =================
function handleLoveClick() {
    buttons.love.disabled = true;
    buttons.hug.disabled = true;

    if (isSoundEnabled) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Audio play failed"));
    }

    createConfetti(100);
    createHeartBurst();

    setTimeout(() => {
        elements.celebrationText.textContent = CONFIG.celebrationMessage;
        switchScene('scene5');
        
        // Re-enable buttons after animation
        setTimeout(() => {
            buttons.love.disabled = false;
            buttons.hug.disabled = false;
        }, 3000);
    }, 2000);
}

function handleHugClick() {
    buttons.hug.innerHTML = 'Sending Hug... 🤗💕';
    buttons.hug.disabled = true;
    
    createHeartBurst();
    
    setTimeout(() => {
        buttons.hug.innerHTML = 'Hug Sent! 💝';
        setTimeout(() => {
            buttons.hug.innerHTML = 'Virtual Hug 🤗';
            buttons.hug.disabled = false;
        }, 1500);
    }, 1000);
}

// ================= ANIMATIONS =================
function createConfetti(count) {
    elements.confettiContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            const colors = ['#4299e1', '#9f7aea', '#68d391', '#ed8936', '#f56565', '#38b2ac'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 1;
            confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
            elements.confettiContainer.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 15);
    }
}

function createHeartBurst() {
    const heart = document.createElement('div');
    heart.innerHTML = '💝';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'heartBurst 1s forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// ================= START THE APP =================
document.addEventListener('DOMContentLoaded', init);