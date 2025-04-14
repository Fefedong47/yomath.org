let salesCount = 0; // Tracks how many times the drug has been sold
let isWalterWhite = false; // Tracks if Walter White should respond

window.onload = () => {
  scoreDisplay = document.getElementById("score");
  head = document.getElementById("head");
  resetBtn = document.getElementById("resetBtn");
  notEnoughPoints = document.getElementById("notEnoughPoints");

  head.onclick = () => {
    score += 1;
    updateScore();
  };

  gameLoop();
  updateUpgradeButtonStates();

  // Add event listener to handle Enter key press
  const chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
};

function gameLoop() {
  const now = Date.now();
  const elapsedSeconds = (now - lastTimestamp) / 1000;
  if (elapsedSeconds >= 1) {
    score += autoClick * elapsedSeconds;
    lastTimestamp = now;
    updateScore();
  }
  requestAnimationFrame(gameLoop);
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim().toLowerCase();
  if (msg === "") return;

  const chatBox = document.getElementById("chatMessages");
  const messageElem = document.createElement("div");
  messageElem.textContent = `You: ${input.value}`;
  chatBox.appendChild(messageElem);

  // Increase sales count for each drug-related message
  if (msg.includes("sell") || msg.includes("drugs")) {
    salesCount++;
  }

  // Check if 20 sales have been reached
  if (salesCount >= 20 && !isWalterWhite) {
    switchToWalterWhite();
  }

  const responses = [
    { keyword: "cook", response: "Yeah science, bitch!" },
    { keyword: "mr. white", response: "He’s the danger, yo!" },
    { keyword: "meth", response: "Tight tight tight!" },
    { keyword: "drugs", response: "This ain’t a game, man!" },
    { keyword: "yo", response: "Yo yo yo! 1-4-8, 3-to-the-3-to-the-6-to-the-9!" },
    { keyword: "hi", response: "What up, dawg?" },
    { keyword: "hello", response: "Yo, sup?" },
    { keyword: "bitch", response: "BITCH!" },
    { keyword: "how are you", response: "Alive, yo. What else matters?" },
    { keyword: "jesse", response: "That’s me, bitch!" }
  ];

  // Default fallback responses
  const defaultResponses = [
    "Yo, you trippin'?",
    "I'm not the guy, yo. Mr. White is.",
    "For real?",
    "This ain't it, man.",
    "You ever seen a guy overdose on his own BS?",
    "Wanna cook or what?",
    "Say it louder, I dare you.",
    "Why you always askin' stuff, huh?",
    "I got somethin' better to do, yo."
  ];

  let jesseReply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

  for (const pair of responses) {
    if (msg.includes(pair.keyword)) {
      jesseReply = pair.response;
      break;
    }
  }

  setTimeout(() => {
    const reply = document.createElement("div");
    reply.textContent = `Jesse: ${jesseReply}`;
    reply.style.color = "#0ff";
    chatBox.appendChild(reply);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function switchToWalterWhite() {
  // Change to Walter White's responses
  isWalterWhite = true;
  const chatHeader = document.getElementById("chatHeader");
  chatHeader.textContent = "Chat with Walter White";

  const responses = [
    { keyword: "cook", response: "Say my name!" },
    { keyword: "mr. white", response: "I am the danger." },
    { keyword: "meth", response: "I’m not in the meth business. I’m in the empire business." },
    { keyword: "drugs", response: "We’re in the business of making money." },
    { keyword: "yo", response: "I am not your friend, Jesse!" },
    { keyword: "hi", response: "Hello, Jesse." },
    { keyword: "hello", response: "Get to the point, Jesse." },
    { keyword: "bitch", response: "Don’t ever call me that again." },
    { keyword: "how are you", response: "I’m fine. Just... busy." },
    { keyword: "jesse", response: "He’s a liability, but a necessary one." }
  ];
}

function updateScore() {
  scoreDisplay.textContent = Math.floor(score);
  updateUpgradeButtonStates();
}

function updateUpgradeButtonStates() {
  const buttons = document.querySelectorAll(".upgrade button");
  upgrades.forEach((upgrade, index) => {
    const button = buttons[index];
    if (score >= upgrade.cost) {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "#333";
    }
  });
}

