<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Jesse Leveling</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: 'Georgia', serif;
      text-align: center;
      color: white;
      position: relative;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://static1.srcdn.com/wordpress/wp-content/uploads/2021/10/Breaking-Bad-RV.jpg');
      background-size: cover;
      background-position: center;
      z-index: -1;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
    }

    #head {
      width: 200px;
      cursor: pointer;
      transition: transform 0.1s ease;
      border-radius: 12px;
      border: 4px solid crimson;
      box-shadow: 0 0 12px red;
    }

    .score {
      font-size: 22px;
      margin-top: 20px;
    }

    .upgrade {
      margin-top: 20px;
    }

    button {
      margin: 10px;
      padding: 12px 24px;
      font-size: 16px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #555;
      box-shadow: 0 0 10px #ff4c4c;
    }

    .upgrade-info {
      display: inline-block;
      margin-right: 15px;
    }

    #resetBtn {
      display: none;
      margin-top: 20px;
      padding: 12px 24px;
      font-size: 16px;
      background-color: #ff4747;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #resetBtn:hover {
      background-color: #ff1a1a;
    }

    #notEnoughPoints {
      display: none;
      font-size: 30px;
      color: #ff4747;
      margin-top: 20px;
      font-weight: bold;
      text-shadow: 2px 2px 5px #000;
    }

    iframe {
      display: none;
    }
  </style>
</head>
<body>

  <div class="backdrop"></div>

  <h1>⚔️ Jesse Leveling ⚔️</h1>

  <img id="head" src="https://static.wikia.nocookie.net/breakingbad/images/0/05/Season_2_-_Jesse.jpg" alt="Jesse Pinkman"/>

  <div class="score">Yo Points: <span id="score">0</span></div>

  <div class="upgrade">
    <div class="upgrade-info">
      <button onclick="buyUpgrade(0)">Sell Heroin, 200 Yo Points</button>
    </div>
    <div class="upgrade-info">
      <button onclick="buyUpgrade(1)">Sell Crystal Meth, 200 Yo Points</button>
    </div>
    <div class="upgrade-info">
      <button onclick="buyUpgrade(2)">Sell Cocaine, 200 Yo Points</button>
    </div>
  </div>

  <button id="resetBtn" onclick="resetGame()">Reset Game</button>

  <div id="notEnoughPoints">Yo, ya don't got enough Yo Points!</div>

  <audio id="backgroundAudio" autoplay loop>
    <source src="https://www.soundjay.com/button/beep-08b.mp3" type="audio/mp3">
  </audio>

  <iframe id="soundcloudPlayer" width="0" height="0" scrolling="no" frameborder="no" allow="autoplay"
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/261048665&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false">
  </iframe>

  <script>
    let score = 0;
    let autoClick = 0;

    const upgrades = [
      { name: "Heroin", cost: 200, bonus: 1, increaseFactor: 1.5 },
      { name: "Crystal Meth", cost: 200, bonus: 1, increaseFactor: 1.5 },
      { name: "Cocaine", cost: 200, bonus: 1, increaseFactor: 1.5 }
    ];

    let scoreDisplay, head, resetBtn, notEnoughPoints, backgroundAudio, soundcloudPlayer;

    window.onload = () => {
      scoreDisplay = document.getElementById("score");
      head = document.getElementById("head");
      resetBtn = document.getElementById("resetBtn");
      notEnoughPoints = document.getElementById("notEnoughPoints");
      backgroundAudio = document.getElementById("backgroundAudio");
      soundcloudPlayer = document.getElementById("soundcloudPlayer");

      backgroundAudio.volume = 0.5;

      head.onclick = () => {
        score += 1;
        updateScore();
      };

      setInterval(() => {
        score += autoClick;
        updateScore();
      }, 1000);

      document.querySelectorAll(".upgrade button").forEach((btn, index) => {
        btn.addEventListener("click", () => buyUpgrade(index));
      });

      backgroundAudio.play().catch(() => {
        document.body.addEventListener("click", () => backgroundAudio.play(), { once: true });
      });

      updateUpgradeButtonStates();
    };

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

      if (score >= 1000) {
        resetBtn.style.display = "inline-block";
        soundcloudPlayer.style.display = "inline-block";
      }
    }

    function resetGame() {
      score = 0;
      autoClick = 0;
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
          button.style.color = "white";
        } else {
          button.style.backgroundColor = "#333";
          button.style.color = "white";
        }
      });
    }
  </script>

</body>
</html>
