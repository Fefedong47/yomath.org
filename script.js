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
    { keyword: "yo", response
