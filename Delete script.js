let score = 0;
let autoClick = 0;
let lastTimestamp = Date.now();

const upgrades = [
  { name: "Heroin", cost: 200, bonus: 1, increaseFactor: 1.5 },
  { name: "Crystal Meth", cost: 200, bonus: 1, increaseFactor: 1.5 },
  { name: "Cocaine", cost: 200, bonus: 1, increaseFactor: 1.5 }
];

let scoreDisplay, head, resetBtn, notEnoughPoints;

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

  // Add Event Listener for Enter key on chat input
  const chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();  // Prevent the default action (like form submission)
      sendMessage();  // Call the sendMessage function when Enter is pressed
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

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    autoClick += upgrade.bonus;
    upgrade.cost = Math.floor(upgrade.cost * upgrade.increaseFactor);
    upgrade.bonus = Math.floor(upgrade.bonus * upgrade.increaseFactor);
    document.querySelectorAll(".upgrade button")[index].textContent =
      `Sell ${upgrade.name}, ${upgrade.cost} Yo Points`;
    updateScore();
  } else {
    notEnoughPoints.style.display = "block";
    setTimeout(() => {
      notEnoughPoints.style.display = "none";
    }, 2000);
  }

  if (score >= 9999) {
    resetBtn.style.display = "inline-block";
  }
}

function resetGame() {
  score = 0;
  autoClick = 0;
  lastTimestamp = Date.now();
  upgrades.forEach((u, i) => {
    u.cost = 200;
    u.bonus = 1;
    document.querySelectorAll(".upgrade button")[i].textContent =
      `Sell ${u.name}, ${u.cost} Yo Points`;
  });
  resetBtn.style.display = "none";
  updateScore();
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

// Chat Function
function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim().toLowerCase();
  if (msg === "") return;

  const chatBox = document.getElementById("chatMessages");
  const messageElem = document.createElement("div");
  messageElem.textContent = msg;
  chatBox.appendChild(messageElem);
  input.value = "";

  if (msg.includes("yo")) {
    const responseElem = document.createElement("div");
    responseElem.textContent = "Yo, what's up?!";
    chatBox.appendChild(responseElem);
  }
}
