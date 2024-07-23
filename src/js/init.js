function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function init() {
  const eCanvas = document.getElementById("canvas");
  const eInput = document.getElementById("input");
  const eSend = document.getElementById("send");
  const eClear = document.getElementById("clear");

  const topMax = eCanvas.clientHeight;

  const msgStore = [];

  const msgDomCacheMap = new Map();

  function createMsg(msg) {
    return {
      id: `${Date.now()}`,
      content: msg,
    };
  }

  function handleSend(msg) {
    msgStore.push(createMsg(msg));
  }

  function randomHSLColor() {
    const hue = Math.floor(Math.random() * 360); // 色相值在0到360之间
    const saturation = Math.floor(Math.random() * 100); // 饱和度值在0%到100%之间
    const lightness = Math.floor(Math.random() * 100); // 亮度值在0%到100%之间

    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return hslColor;
  }

  function render() {
    msgStore.forEach((itm) => {
      if (!msgDomCacheMap.has(itm.id)) {
        const eMsg = document.createElement("div");
        eMsg.style.top = Math.floor(Math.random() * (topMax - 24)) + "px";
        eMsg.style.color = randomHSLColor();
        eMsg.style.fontSize = Math.floor(Math.random() * 24 + 12) + "px";
        eMsg.style.animationDuration = Math.floor(Math.random() * 10 + 5) + "s";
        eMsg.classList.add("msg", "run");
        eMsg.textContent = itm.content;

        eMsg.addEventListener("animationend", () => {
          const idx = msgStore.findIndex((mg) => mg.id === itm.id);
          if (idx !== -1) {
            msgStore.splice(idx, 1);
          }
        });

        eMsg.addEventListener("mouseover", function () {
          this.style.zIndex = 1000;
          this.style.animationPlayState = "paused";
        });

        eMsg.addEventListener("mouseout", function () {
          this.style.zIndex = "auto";
          this.style.animationPlayState = "running";
        });
        eCanvas.appendChild(eMsg);
        msgDomCacheMap.set(itm.id, eMsg);
      }
    });

    Array.from(msgDomCacheMap.keys()).forEach((key) => {
      if (!msgStore.some((itm) => itm.id === key)) {
        const eMsg = msgDomCacheMap.get(key);
        eCanvas.removeChild(eMsg);
        msgDomCacheMap.delete(key);
      }
    });
    requestAnimationFrame(render);
  }

  render();

  eInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && eInput.value.trim() !== "") {
      handleSend(eInput.value);
      eInput.value = "";
    }
  });

  eSend.addEventListener("click", () => {
    if (eInput.value.trim() !== "") {
      handleSend(eInput.value);
      eInput.value = "";
    }
  });

  eClear.addEventListener("click", () => {
    msgStore.splice(0, msgStore.length);
  });
}

ready(init);
