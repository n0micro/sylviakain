const story = [
      {
        id: 0,
        text: "Привіт! Ти новенький у цьому світі?",
        speaker: "Кейн",
        characters: { cain: true, eliza: false },
        choices: [
          { text: "Так, я тут вперше.", next: 1 },
          { text: "Ні, просто давно не заходив.", next: 2 }
        ]
      },
      {
        id: 1,
        text: "О, чудово! Ласкаво просимо! Я Еліза, готова показати тобі цей світ.",
        speaker: "Еліза",
        characters: { cain: false, eliza: true },
        choices: [
          { text: "Звучить круто, пішли!", next: 3 },
          { text: "Розкажи більше про себе.", next: 4 }
        ]
      },
      {
        id: 2,
        text: "Ха, старий знайомий? Тоді ти знаєш, як тут усе влаштовано. Що нового?",
        speaker: "Кейн",
        characters: { cain: true, eliza: false },
        choices: [
          { text: "Просто гуляю, що порадиш?", next: 5 },
          { text: "Хочу пригод!", next: 3 }
        ]
      },
      {
        id: 3,
        text: "Гаразд, пригода чекає! Куди підемо: до космічного ринку чи в таємничі руїни?",
        speaker: "Еліза",
        characters: { cain: false, eliza: true },
        choices: [
          { text: "На ринок!", next: 6 },
          { text: "До руїн!", next: 7 }
        ]
      },
      {
        id: 4,
        text: "Я Еліза, мандрівниця між зірками. Люблю відкривати нове. А ти хто?",
        speaker: "Еліза",
        characters: { cain: false, eliza: true },
        choices: [
          { text: "Я новачок, шукаю сенс.", next: 1 },
          { text: "Мандрівник, як і ти!", next: 3 }
        ]
      },
      {
        id: 5,
        text: "Гуляти — це добре. Може, зазирнемо до старої таверни? Там завжди цікаво.",
        speaker: "Кейн",
        characters: { cain: true, eliza: false },
        choices: [
          { text: "Погнали в таверну!", next: 6 },
          { text: "Краще щось інше.", next: 0 }
        ]
      },
      {
        id: 6,
        text: "Твоя пригода лише починається... Продовження скоро!",
        speaker: "Еліза",
        characters: { cain: false, eliza: true },
        choices: [
          { text: "Почати заново", next: 0 }
        ]
      },
      {
        id: 7,
        text: "Руїни сповнені таємниць... Ти готовий до несподіванок?",
        speaker: "Еліза",
        characters: { cain: false, eliza: true },
        choices: [
          { text: "Так, я готовий!", next: 6 },
          { text: "Може, повернемося?", next: 3 }
        ]
      }
    ];

    const dialogueText = document.querySelector('.dialogue-text');
    const choicesContainer = document.querySelector('.choices');
    const cainChar = document.querySelector('#char-cain');
    const elizaChar = document.querySelector('#char-eliza');
    const cainName = cainChar.querySelector('.char-name');
    const elizaName = elizaChar.querySelector('.char-name');

    function displayScene(sceneId) {
      const scene = story.find(s => s.id === sceneId);
      if (!scene) return;

      // Оновлення тексту діалогу
      dialogueText.textContent = scene.text;
      dialogueText.parentElement.style.animation = 'none';
      dialogueText.parentElement.offsetHeight; // Тригер рефлоу
      dialogueText.parentElement.style.animation = 'fadeIn 0.5s ease';

      // Оновлення видимості персонажів
      cainChar.style.display = scene.characters.cain ? 'flex' : 'none';
      elizaChar.style.display = scene.characters.eliza ? 'flex' : 'none';

      // Оновлення імені спікера
      if (scene.speaker === "Кейн") {
        cainName.textContent = "Кейн";
      } else if (scene.speaker === "Еліза") {
        elizaName.textContent = "Еліза";
      }

      // Оновлення виборів
      choicesContainer.innerHTML = '';
      scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.setAttribute('data-next', choice.next);
        button.addEventListener('click', () => displayScene(choice.next));
        choicesContainer.appendChild(button);
      });
    }

    // Ініціалізація кнопок
    document.querySelectorAll('.choices button').forEach(button => {
      button.addEventListener('click', () => {
        const nextScene = parseInt(button.getAttribute('data-next'));
        displayScene(nextScene);
      });
    });

    // Початок гри
    displayScene(0);