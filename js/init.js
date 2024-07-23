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
        eMsg.style.animationDuration =
          Math.floor(Math.random() * 15 + 10) + "s";
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

  function randomMsg() {
    let i = 0;
    const msgs = [
      "看到这个画面，我仿佛看到了希望🌈",
      "程序员的日常：调bug到凌晨三点😴",
      "这代码写的，简直是艺术品🎨",
      "我觉得这里还能再优化一下，加个彩蛋怎么样？🥚",
      "听说按Alt+F4能加速，是真的吗？😏",
      "这操作，简直比剪刀手还快🖐️✂️",
      "我家猫咪看了都说好🐱",
      "这波操作，猝不及防😂",
      "代码里藏着一首诗，你发现了吗？📜",
      "这个bug，我给满分，不接受反驳🐛",
      "看到这里，我的眼泪掉下来了😭",
      "这速度，简直比光还快🚀",
      "我决定了，这就是我未来的样子🌟",
      "这不仅仅是代码，这是一种生活💻",
      "我觉得这里缺个彩虹屁生成器🌈",
      "这个功能，简直是开发者的福音🙏",
      "我已经看到了这个项目的未来🔮",
      "这里的每一行代码，都是我的泪😢",
      "这个算法，简直是小学生都能看懂👶",
      "这段代码，我给101分，多出的1分是因为太惊艳了💯",
      "这就是传说中的代码诗人吗？📖",
      "我觉得这个项目能改变世界🌍",
      "这个bug，我愿称之为特性🌟",
      "这段代码，简直是我的精神食粮🍔",
      "看完这个，我决定明天也不加班了🏠",
      "这个项目，简直是我的梦中情人💤",
      "这代码，跑起来肯定风一样的男子🏃",
      "这个功能，简直是为我量身定做📏",
      "这里的逻辑，简直比我的前任还复杂🌀",
      "这个界面，简直比我高中的成绩单还好看📈",
      "这段代码，简直是在对我说：你也可以成为大佬🌟",
      "这个项目，简直是程序员的浪漫💖",
      "这里的注释，简直比小说还精彩📚",
      "这个算法，简直是艺术🎭",
      "这段代码，让我想起了我的第一行Hello World🌍",
      "这个功能，简直是拯救世界的英雄🦸",
      "这里的优化，简直让人眼前一亮💡",
      "这个项目，简直是程序员的诗和远方🌅",
      "这段代码，简直是在跳舞💃",
      "这个界面，简直是视觉盛宴🎉",
      "这个bug，我决定收藏起来，当做纪念🏆",
      "这段代码，简直是我的灵魂伴侣👻",
      "这个功能，简直是开发者的小确幸🍀",
      "这里的算法，简直是数学的诗歌📚",
      "这段代码，简直是在和我对话🗣️",
      "这个项目，简直是技术的革命✊",
      "这里的逻辑，简直比我的生活还要有条理📐",
      "这个界面，简直是美到爆表🎆",
      "这段代码，简直是在告诉我：无限可能🌌",
      "这个功能，简直是我梦寐以求的🛌",
    ];

    setInterval(() => {
      const idx = i % msgs.length;
      handleSend(msgs[idx]);
      i = idx + 1;
    }, 1000);
  }

  randomMsg();

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
