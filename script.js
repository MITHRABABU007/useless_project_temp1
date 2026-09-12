document.addEventListener('DOMContentLoaded', () => {
  const pageIntro = document.getElementById('page-intro');
  const pageInput = document.getElementById('page-input');
  const pageResult = document.getElementById('page-result');
  const calculationState = document.getElementById('calculation-state');
  const calculationStatus = document.getElementById('calculation-status');

  const userNameInput = document.getElementById('user-name');
  const userAgeInput = document.getElementById('user-age');
  const userMoodSelect = document.getElementById('user-mood');
  const validationMsg = document.getElementById('form-validation-msg');
  const validationText = document.getElementById('form-validation-text');
  const problemOptionsGrid = document.getElementById('problem-options-grid');
  const finalPredictionEl = document.getElementById('final-prediction');
  let selectedProblem = null;

  function showPage(targetPage) {
    [pageIntro, pageInput, pageResult, calculationState].forEach(page => {
      if (page) {
        page.classList.add('hidden');
      }
    });

    if (targetPage) {
      targetPage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function showValidationError(message) {
    if (validationText) validationText.textContent = message;
    if (validationMsg) validationMsg.classList.add('active');
  }

  function resetForm() {
    if (userNameInput) userNameInput.value = '';
    if (userAgeInput) userAgeInput.value = '';
    if (userMoodSelect) userMoodSelect.selectedIndex = 0;
    selectedProblem = null;
    if (problemOptionsGrid) {
      problemOptionsGrid.querySelectorAll('.problem-option').forEach((button) => {
        button.classList.remove('selected');
      });
    }
    if (validationMsg) validationMsg.classList.remove('active');
  }

  document.getElementById('start-journey-btn')?.addEventListener('click', () => {
    showPage(pageInput);
    setTimeout(() => userNameInput?.focus(), 180);
  });

  document.getElementById('back-to-intro-btn')?.addEventListener('click', () => {
    resetForm();
    showPage(pageIntro);
  });

  document.getElementById('predict-again-btn')?.addEventListener('click', () => {
    resetForm();
    showPage(pageInput);
  });

  document.getElementById('return-home-btn')?.addEventListener('click', () => {
    resetForm();
    showPage(pageIntro);
  });

  [userNameInput, userAgeInput, userMoodSelect].forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => {
      if (validationMsg && validationMsg.classList.contains('active')) {
        validationMsg.classList.remove('active');
      }
    });
    field.addEventListener('change', () => {
      if (validationMsg && validationMsg.classList.contains('active')) {
        validationMsg.classList.remove('active');
      }
    });
  });

  problemOptionsGrid?.addEventListener('click', (event) => {
    const option = event.target.closest('.problem-option');
    if (!option) return;

    selectedProblem = option.getAttribute('data-problem');
    problemOptionsGrid.querySelectorAll('.problem-option').forEach((button) => {
      button.classList.toggle('selected', button === option);
    });

    if (validationMsg && validationMsg.classList.contains('active')) {
      validationMsg.classList.remove('active');
    }
  });

  document.getElementById('predict-btn')?.addEventListener('click', () => {
    const name = userNameInput?.value.trim() || '';
    const age = userAgeInput?.value.trim() || '';
    const mood = userMoodSelect?.value || '';

    if (!name) {
      showValidationError('Please enter your name.');
      userNameInput?.focus();
      return;
    }

    if (!age || Number(age) < 1 || Number(age) > 130) {
      showValidationError('Please enter a valid age between 1 and 130.');
      userAgeInput?.focus();
      return;
    }

    if (!mood) {
      showValidationError('Please select your mood.');
      userMoodSelect?.focus();
      return;
    }

    if (!selectedProblem) {
      showValidationError('Please choose a tiny problem.');
      return;
    }

    if (validationMsg) validationMsg.classList.remove('active');

    showPage(calculationState);
    if (calculationStatus) {
      calculationStatus.textContent = 'Consulting the cosmic department...';
    }

    setTimeout(() => {
      const prediction = PROBLEM_PREDICTIONS[selectedProblem];
      if (finalPredictionEl) finalPredictionEl.textContent = prediction;
      showPage(pageResult);
    }, 550);
  });

  const PROBLEM_PREDICTIONS = {
    "I'm hungry.": "The cosmic kitchen predicts food is coming. Unfortunately, it will arrive after you have already eaten something else.",
    "I have an exam tomorrow.": "You will suddenly become extremely motivated at 11:47 PM. Your textbook will remain emotionally unavailable.",
    "My phone is at 5%.": "Your phone will survive bravely until you urgently need it. Then it will choose darkness.",
    "I lost my charger.": "Your charger is approximately 3 metres away. It has simply entered witness protection.",
    "I'm bored.": "Something exciting will happen soon. You will probably be asleep when it does.",
    "I need money.": "Money will approach you shortly. Unfortunately, it will belong to someone else.",
    "I can't sleep.": "Sleep will arrive at approximately 4:13 AM, just 17 minutes before you need to wake up.",
    "I keep procrastinating.": "Your productivity is approaching rapidly. Current estimated arrival: after the deadline.",
    "My friend isn't replying.": "Your friend has seen the message. The cosmic council confirms they are currently preparing an unnecessarily complicated reply.",
    "I don't want to study.": "Your academic energy will return suddenly. Unfortunately, it will arrive while you're scrolling.",
    "I'm getting late.": "You will reach your destination eventually. Your confidence will arrive approximately 22 minutes later.",
    "I have too much homework.": "The homework will eventually be completed. The definition of 'eventually' remains classified.",
    "My internet is slow.": "Your internet will become incredibly fast immediately after you stop needing it.",
    "I ordered food.": "Your food is travelling through a mysterious dimension. Estimated arrival: sometime after your patience expires.",
    "I have no motivation.": "Motivation will visit you soon. It will stay for approximately 6 minutes before disappearing without explanation.",
    "I spent all my money.": "Financial recovery is possible. Unfortunately, your next shopping notification has already detected your location.",
    "I have nothing to wear.": "Your wardrobe contains 37 outfits. You will reject all of them and wear the same outfit you wore last week.",
    "I have a fever.": "This is not just a fever… a mysterious new illness is already preparing your medical report. 😂",
    "I lost my pen.": "You will find your pen tomorrow. It will be in the most obvious place, where you already looked 6 times. 😂",
    "I’m wearing black today.": "Tomorrow someone will tell you black suits you. You will immediately decide to wear black for the next 14 days. 😂",
    "My phone is at 10%.": "Your charger will mysteriously disappear tonight. Your phone will reach 1% exactly when you finally find it. 😭",
    "I saw 11:11.": "Your wish will come true soon. Unfortunately, it will be something completely useless, like finding your missing sock. 😂",
    "I bought a new pen.": "You will use it once tomorrow. Then someone will borrow it and it will begin a new life. 😂",
    "I’m wearing new clothes.": "Someone will compliment you tomorrow. You will remember that compliment for approximately 6 months. 😂",
    "I cleaned my bag.": "Tomorrow you will find a paper inside it that you thought disappeared in 2024. You will have no idea why you kept it. 😂",
    "I have a new notebook.": "The first page will be written beautifully. By page 7, your handwriting will look like an emergency medical report. 😂",
    "I changed my wallpaper.": "You will love your new wallpaper for exactly three days. Then you will spend 40 minutes searching for another one. 😂",
    "I’m going outside tomorrow.": "You will make a perfect plan tonight. Tomorrow you will cancel half of it before leaving the house. 😂",
    "I bought a plant.": "Your plant will grow beautifully. It will soon become the most responsible member of your household. 😂",
    "I found an old photo.": "You will look at it for five minutes. Then you will investigate everyone in the background like a detective. 😂",
    "My battery is full.": "Today your phone will survive the entire day. This rare event will be remembered by historians. 😂",
    "I heard a strange noise.": "Tonight you will investigate it bravely. You will discover absolutely nothing and still blame a ghost. 👻😂",
    "I got a new hairstyle.": "Someone will notice it tomorrow. You will pretend you don’t care while secretly waiting for more compliments. 😂",
    "I saw a rainbow.": "Good luck is approaching. It will probably arrive as a ₹20 discount on something you don’t need. 😂",
    "I forgot my password.": "You will remember it at the exact moment you finish resetting it. Technology will celebrate your defeat. 😂",
    "I bought a water bottle.": "You will carry it everywhere for one week. After that, it will become a permanent decoration on your table. 😂",
    "I found ₹10.": "Wealth has officially entered your life. Tomorrow you will spend ₹30 celebrating it. 😂",
    "I heard my name somewhere.": "Someone is definitely talking about you. Whether they are saying something good is a problem for your future self. 😂",
    "I wore matching clothes today.": "Tomorrow you will accidentally wear two completely different socks. Nobody will notice, but you will spend the whole day thinking about it. 😂",
    "I opened an old chat.": "You will scroll further than you intended. By midnight, you will know exactly why you should have left that chat alone. 😂",
    "I got a random notification.": "That notification will lead you somewhere unexpected. Probably another notification. 😂",
    "I saw a butterfly.": "A beautiful transformation is coming into your life. Your hairstyle may be the first victim. 😂",
    "I bought something online.": "Your package will arrive soon. The product will look slightly different from what your imagination ordered. 😂",
    "I heard someone laughing.": "Tomorrow you will laugh at something completely inappropriate. You will then spend five minutes trying to look serious. 😂",
    "I made a new playlist.": "One song will become your entire personality. You will play it until everyone around you develops a personal dislike for it. 😂",
    "I changed my profile picture.": "Someone you haven't spoken to in months will suddenly appear in your notifications. Coincidence? The Universe says absolutely not. 😂",
    "I saw a shooting star.": "Your wish has been accepted by the Universe. Processing time: approximately 7–10 business years. 😂",
    "My hair is falling.": "Congratulations… you are going through depression. 😂",
    "My phone is getting slow.": "Your life is also loading. 😂",
    "I keep losing my keys.": "Your keys are planning to leave you permanently. 😂"
  };
});
