<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Breaking Bad Clicker</title>
  <link rel="icon" href="https://plus.ordbogen.com/android-chrome-192x192.png" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Georgia', serif;
      background-color: #111;
      color: white;
      text-align: center;
    }
    .backdrop {
      background-image: url('https://static1.srcdn.com/wordpress/wp-content/uploads/2021/10/Breaking-Bad-RV.jpg');
      background-size: cover;
      background-position: center;
      filter: blur(6px);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    #head {
      width: 200px;
      cursor: pointer;
      border-radius: 12px;
      border: 4px solid crimson;
      box-shadow: 0 0 12px red;
      margin: 20px 0;
    }
    button {
      padding: 10px 20px;
      background: #333;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin: 10px;
    }
    button:hover {
      background-color: #555;
      box-shadow: 0 0 10px #ff4c4c;
    }
    .score, .upgrade, #notEnoughPoints {
      margin-top: 20px;
    }
    #notEnoughPoints {
      color: red;
      font-size: 24px;
      display: none;
    }
    #chatContainer {
      width: 90%;
      max-width: 600px;
      margin: 40px auto;
      background: rgba(0, 0, 0, 0.6);
      padding: 20px;
      border-radius: 12px;
      border: 2px solid #0ff;
    }
    #chatMessages {
      height: 200px;
      overflow-y: auto;
      text-align: left;
      padding: 10px;
      background: #222;
      margin-bottom: 10px;
      border-radius: 8px;
    }
    #chatInput {
      width: 70%;
      padding: 10px;
      border-radius: 5px;
      border: none;
    }
  </style>
</head>
<body>
  <div class="backdrop"></div>
  <h1>Jesse Clicker</h1>
  <img id="head" src="https://i.pinimg.com/736x/26/5d/fe/265dfe8eb04c534f990d78be571c085c.jpg" />
  <div class="score">Yo Points: <span id="score">0</span></div>

  <div class="upgrade">
    <button onclick="buyUpgrade(0)">Sell Heroin</button>
    <button onclick="buyUpgrade(1)">Sell Crystal Meth</button>
    <button onclick="buyUpgrade(2)">Sell Cocaine</button>
  </div>

  <div id="notEnoughPoints">Yo, ya don't got enough Yo Points!</div>

  <div id="chatContainer">
    <h2 id="chatHeader">Jesse Chat</h2>
    <div id="chatMessages"></div>
    <input id="chatInput" placeholder="Say something to Jesse..." />
    <button onclick="sendSmartMessage()">Send</button>
  </div>

  <script>
    let score = 0;
    let autoClick = 0;
    let lastTimestamp = Date.now();
    let unlockedWalter = false;

    const upgrades = [
      { name: "Heroin", cost: 200, bonus: 1, increaseFactor: 1.5, count: 0 },
      { name: "Crystal Meth", cost: 200, bonus: 1, increaseFactor: 1.5, count: 0 },
      { name: "Cocaine", cost: 200, bonus: 1, increaseFactor: 1.5, count: 0 }
    ];

    const scoreDisplay = document.getElementById("score");
    const notEnoughPoints = document.getElementById("notEnoughPoints");

    document.getElementById("head").onclick = () => {
      score += 1;
      updateScore();
    };

    function updateScore() {
      scoreDisplay.textContent = Math.floor(score);
    }

    function buyUpgrade(index) {
      const upgrade = upgrades[index];
      if (score >= upgrade.cost) {
        score -= upgrade.cost;
        autoClick += upgrade.bonus;
        upgrade.cost = Math.floor(upgrade.cost * upgrade.increaseFactor);
        upgrade.bonus = Math.floor(upgrade.bonus * upgrade.increaseFactor);
        upgrade.count++;
        updateScore();
        checkUnlockWalter();
      } else {
        notEnoughPoints.style.display = "block";
        setTimeout(() => notEnoughPoints.style.display = "none", 2000);
      }
    }

    function checkUnlockWalter() {
      if (unlockedWalter) return;
      const allSold = upgrades.every(upg => upg.count >= 20);
      if (allSold) {
        unlockedWalter = true;
        document.getElementById("chatHeader").textContent = "Walter White Chat";
        alert("You've earned it. Walter White will now talk to you.");
      }
    }

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

    gameLoop();

    async function sendSmartMessage() {
      const input = document.getElementById("chatInput");
      const msg = input.value.trim();
      if (!msg) return;

      const chatBox = document.getElementById("chatMessages");
      chatBox.innerHTML += `<div>You: ${msg}</div>`;
      chatBox.innerHTML += `<div style="color:#0ff;">${unlockedWalter ? "Walter" : "Jesse"}: ...thinking...</div>`;
      input.value = "";

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY_HERE" // Replace with your key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: unlockedWalter
                ? "You are Walter White from Breaking Bad. Speak with calm intensity, intelligence, and authority. You are Heisenberg."
                : "You are Jesse Pinkman from Breaking Bad. Be chaotic, emotional, and rough. Use slang. You call people 'yo' and 'bitch'."
            },
            {
              role: "user",
              content: msg
            }
          ],
          temperature: 0.9
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "Yo, I got nothing.";

      // Replace "thinking..." with real reply
      const lastMsg = chatBox.querySelector("div:last-child");
      lastMsg.textContent = `${unlockedWalter ? "Walter" : "Jesse"}: ${reply}`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  </script>
</body>
</html>
