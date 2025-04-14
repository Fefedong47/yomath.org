function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (msg === "") return;

  const chatBox = document.getElementById("chatMessages");
  const messageElem = document.createElement("div");
  messageElem.textContent = `You: ${msg}`;
  chatBox.appendChild(messageElem);

  // Jesse-style responses
  const jesseResponses = [
    "Yo, science, bitch!",
    "Yeah Mr. White! Yeah, science!",
    "You ever try makin' meth in an RV, bitch?",
    "Seriously? That's whack, man.",
    "Whatever, yo.",
    "You think you're the danger? Nah, that's Mr. White.",
    "This is my own private domicile and I will not be harassed, bitch!",
    "Like... what even is that, yo?",
    "Ain’t no one gonna knock me down.",
    "I'm not a criminal, I'm a blowfish!",
    "What up, dawg?",
    "Yo, you talk too much, man.",
    "Say my name... Wait, no, wrong guy."
  ];

  const randomIndex = Math.floor(Math.random() * jesseResponses.length);
  const jesseReply = jesseResponses[randomIndex];

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

