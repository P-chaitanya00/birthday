/* ===================================================
   INTERACTIVE ROMANTIC BIRTHDAY SURPRISE SCRIPT
   Features:
   - Canvas Floating Hearts & Cursor Sparkles
   - Envelope Opening & Confetti Fanfare
   - Real-time Countdown to Nov 22
   - Interactive Candle Blowing with Physics & Smoke
   - Reasons Deck Carousel
   - Polaroid Memory Wall
   - Gift Unboxing Coupons
   - Interactive Wish Wall with LocalStorage
   - In-app Customizer for Her Name & Photos
   =================================================== */

// Default Configuration Data
const DEFAULT_CONFIG = {
  girlName: "My Bangaru",
  senderName: "Ne Bujjulu ❤️",
  heroTagline: "Today and every day, you are the brightest light and sweetest melody in my life.",
  letter: `hi Bangaru

to the one whom I love the most and the most precious one in my life and my half
happiest bday Bangaru 
I hope this bday will not disspoint u 

inka lag cheyakunda cheppesta 

ninnu the 1st day bustop lo chusaka nen yentha excitement feel iyano nake telusu and nuvu na life loki ochaka ur the most happiest thing ever made and netho chesina prathi pani , thirigina prathi place , tinna prathi food ela cheppukuntu pothey yenno unnaye prathi dhanilo edho teliyani magic , happiness like kothaga undi , nekosam nen avvani cheyadam nuvu avi chusi happy avvadam looks beautiful , and ala manam bike medha velladam , vizag antha thiragadam yenno memories 

nek gurthndhaa manam clg lo unnapudu nen ne perfume kii roju nek compliment icheyvadini , nuvu kanipinchakapoyena just ne perfume smell chusi cheppesta nuv ochav anii ,
aa days still I cannot forget 

mana main journey start avvadaniki oka special place CRISPY
nen ninnu kiss chesina 1st place and aa date sep 3rd the date still nen gurthupettukuna 
telikundanee manam okati iyyam 
teliso telikaa chala godavalu paddam 
but ye godavalo kuda vadhilesey stage ochindhi gani yepudu vadhalaledu coz aa bond antha special kopam lo vanda antam avuthai but still unnam antey mana bond yentho strong oo inka special ga cheppalsina avasaram ledu 

nelo nak baga istam enti telusaa , ante nuvante ney nak chala chala istam inko nelo ante koncham kastam ey cheppadaniki anduku ante anni unnaye nelo 

nuvu chupinchey caring , nuvu nannu nanna ani pilichey word , ne navvu , ne kopam ,  ne chiraku , ne alaka , ne yeddithanam , etc etc chala unnaye ala prathidhi nak chala istam. nuvu ravadam na life lo nen edho pedha wonder chesukunatlee telusaa 

nuvu chupinchey careing kosam inko janmalo  ina esari late avvakunda 1st ninne kalusta

(Malli vasthanu malli choosthannu
Malli neeke parrichayam avthanu
Malli na manasu neekandisthanu
Allavatuga nannu preminchava)

past is past Bangaru past lo jariginavi yevi nek malli gurthurakunda nen chusukuntaa 
nek kavalsina prema ni nek kavalsinatlu ga nen istaa Bangaru 
ne happiness ey na important 
evaru Yenni anna em anukunaa always with u Bangaru 

nek badha ostey cheppukodaniki  oka manchi frnd avutha 
akali vestey tinipinchadaniki amma ni avuthaa
kastam ostey addukune nanna ni avuthaa
godava ostey kottukodaniki villan ni avuthaa
ee heroine kosam hero avutha
ne princess world lochey ochey ne prince ni avutha
mothaniki ne life partner ga avuthaa

ey kastam ina chusukodaniki nen unna
deniki nuvu bayapadalsina pani ledu , insecurities ledu 
just one thing edhina chusukodaniki ne bujjulu unnadu chusukuntadu antey

finally i love you more Bangaru till the moon.....stars.....sun............. whole universe 

my Bangaru >>>> whole earth`,
  photos: [
    {
      url: "photo4.jpg",
      caption: "Your innocent smile melts my heart 🌼"
    },
    {
      url: "photo5.jpg",
      caption: "That cute little shy laugh 🙈✨"
    },
    {
      url: "photo6.jpg",
      caption: "The most beautiful princess 👑💖"
    },
    {
      url: "photo7.jpg",
      caption: "Stunning in every single way ✨"
    },
    {
      url: "photo8.jpg",
      caption: "Lost in your thoughts, forever mine 💫"
    }
  ],
  stickyNotes: [
    "Your laugh is my favorite soundtrack in the whole universe 🎶",
    "May this new year bring you everything your precious heart desires! 💫",
    "You look breathtaking today, just like every other day ✨",
    "I'm so ridiculously lucky to love you and be loved by you 💕"
  ]
};

// 10 Romantic reasons
const REASONS_LIST = [
  "The way your eyes crinkle with genuine joy whenever you laugh at our silly inside jokes.",
  "How deeply kind and gentle you are to everyone and everything around you.",
  "The comfort of resting my head on your shoulder after a long tiring day.",
  "Your excited little happy dance whenever you eat your favorite food.",
  "How you believe in my dreams even on the days I struggle to believe in myself.",
  "The adorable way you talk about things you are passionate about.",
  "Your soft voice calling my name that instantly calms all the chaos.",
  "How effortlessly radiant and stunning you look, even in your oversized hoodies.",
  "The countless little memories we share that no one else in the world understands.",
  "Simply because you are YOU — the best part of my life, yesterday, today, and forever."
];

let currentReasonIdx = 0;
let userConfig = {};

// Load Config from localStorage or defaults
function loadConfig() {
  const saved = localStorage.getItem("bday_girl_config");
  if (saved) {
    try {
      userConfig = JSON.parse(saved);
      if (!userConfig.photos || userConfig.photos.length !== 5 || userConfig.photos[0].url === "photo1.jpg" || (userConfig.photos[0] && userConfig.photos[0].url.includes("unsplash"))) {
        userConfig.photos = DEFAULT_CONFIG.photos;
      }
      userConfig.girlName = "My Bangaru";
      // Ensure the Telugu letter is used if old template was stored
      if (!userConfig.letter || userConfig.letter.includes("When I look back at all my favorite moments") || !userConfig.letter.includes("CRISPY")) {
        userConfig.letter = DEFAULT_CONFIG.letter;
        userConfig.senderName = DEFAULT_CONFIG.senderName;
      }
    } catch (e) {
      userConfig = { ...DEFAULT_CONFIG };
    }
  } else {
    userConfig = { ...DEFAULT_CONFIG };
  }
}

function saveConfig() {
  localStorage.setItem("bday_girl_config", JSON.stringify(userConfig));
  applyConfigToDOM();
}

// Render Structured Letter for Bangaru with clean typography and minimal animations
function renderStructuredLetter(text, senderName) {
  if (text && (text.includes("CRISPY") || text.includes("Malli vasthanu") || text.includes("bustop"))) {
    return `
      <div class="letter-content-flow">
        <!-- Salutation & Opening -->
        <div class="letter-greeting-block">
          <h3 class="letter-hi">hi Bangaru <span class="heart-pulse-subtle">❤️</span></h3>
          <p class="letter-lead">
            to the one whom I love the most and the most precious one in my life and my half — <br/>
            <span class="highlight-bday-line">happiest bday Bangaru ✨</span><br/>
            I hope this bday will not disspoint u
          </p>
        </div>

        <p class="letter-transition">inka lag cheyakunda cheppesta </p>

        <!-- Bustop & Vizag Memories -->
        <p class="letter-para">
          ninnu the 1st day bustop lo chusaka nen yentha excitement feel iyano nake telusu and nuvu na life loki ochaka ur the most happiest thing ever made and netho chesina prathi pani , thirigina prathi place , tinna prathi food ela cheppukuntu pothey yenno unnaye prathi dhanilo edho teliyani magic , happiness like kothaga undi , nekosam nen avvani cheyadam nuvu avi chusi happy avvadam looks beautiful , and ala manam bike medha velladam , vizag antha thiragadam yenno memories 🛵🌊
        </p>

        <!-- Perfume Memory -->
        <div class="letter-perfume-card">
          <span class="perfume-icon">🌸</span>
          <div class="perfume-details">
            <p class="perfume-text">
              nek gurthndhaa manam clg lo unnapudu nen ne perfume kii roju nek compliment icheyvadini , nuvu kanipinchakapoyena just ne perfume smell chusi cheppesta nuv ochav anii ,
            </p>
            <p class="perfume-highlight">aa days still I cannot forget ✨</p>
          </div>
        </div>

        <!-- CRISPY & 1st Kiss & Strong Bond -->
        <div class="letter-special-memory-box">
          <div class="special-memory-tag">✦ Our Journey &amp; Special Place ✦</div>
          <h4 class="crispy-title">CRISPY <span>(Sep 3rd)</span> 💋</h4>
          <p class="special-memory-desc">
            mana main journey start avvadaniki oka special place <strong>CRISPY</strong><br/>
            nen ninnu kiss chesina 1st place and aa date <strong>sep 3rd</strong> the date still nen gurthupettukuna
          </p>
          <p class="special-memory-desc">
            telikundanee manam okati iyyam <br/>
            teliso telikaa chala godavalu paddam <br/>
            but ye godavalo kuda vadhilesey stage ochindhi gani yepudu vadhalaledu coz aa bond antha special kopam lo vanda antam avuthai but still unnam antey mana bond yentho strong oo inka special ga cheppalsina avasaram ledu ❤️
          </p>
        </div>

        <!-- What I love in you -->
        <p class="letter-para">
          nelo nak baga istam enti telusaa , ante nuvante ney nak chala chala istam inko nelo ante koncham kastam ey cheppadaniki anduku ante anni unnaye nelo
        </p>

        <div class="letter-traits-card">
          <p class="traits-text">
            nuvu chupinchey caring , nuvu nannu <em>nanna</em> ani pilichey word , ne navvu , ne kopam ,  ne chiraku , ne alaka , ne yeddithanam , etc etc chala unnaye ala prathidhi nak chala istam. nuvu ravadam na life lo nen edho pedha wonder chesukunatlee telusaa ✨
          </p>
          <p class="reincarnation-wish">
            nuvu chupinchey careing kosam inko janmalo  ina esari late avvakunda 1st ninne kalusta 💕
          </p>
        </div>

        <!-- Poetry Box -->
        <div class="letter-poetry-box">
          <div class="poetry-note-symbol">🎵</div>
          <div class="poetry-lines">
            <p>Malli vasthanu malli choosthannu</p>
            <p>Malli neeke parrichayam avthanu</p>
            <p>Malli na manasu neekandisthanu</p>
            <p class="poetry-highlight-line">Allavatuga nannu preminchava ❤️</p>
          </div>
        </div>

        <!-- Past is past & Always with you -->
        <div class="letter-reassurance-box">
          <p>past is past Bangaru past lo jariginavi yevi nek malli gurthurakunda nen chusukuntaa </p>
          <p>nek kavalsina prema ni nek kavalsinatlu ga nen istaa Bangaru </p>
          <p>ne happiness ey na important </p>
          <p class="always-with-u">evaru Yenni anna em anukunaa <strong>always with u Bangaru</strong> 💖</p>
        </div>

        <!-- 7 Promises Card -->
        <div class="letter-promises-wrapper">
          <div class="promises-badge">✦ My Promises To You ✦</div>
          <ul class="promises-list">
            <li class="promise-item"><span class="promise-emoji">🌸</span> <span class="promise-msg">nek badha ostey cheppukodaniki  oka manchi frnd avutha</span></li>
            <li class="promise-item"><span class="promise-emoji">🍲</span> <span class="promise-msg">akali vestey tinipinchadaniki amma ni avuthaa</span></li>
            <li class="promise-item"><span class="promise-emoji">🛡️</span> <span class="promise-msg">kastam ostey addukune nanna ni avuthaa</span></li>
            <li class="promise-item"><span class="promise-emoji">🥊</span> <span class="promise-msg">godava ostey kottukodaniki villan ni avuthaa</span></li>
            <li class="promise-item"><span class="promise-emoji">🎬</span> <span class="promise-msg">ee heroine kosam hero avutha</span></li>
            <li class="promise-item"><span class="promise-emoji">👑</span> <span class="promise-msg">ne princess world lochey ochey ne prince ni avutha</span></li>
            <li class="promise-item promise-item-final"><span class="promise-emoji">💍</span> <span class="promise-msg">mothaniki ne life partner ga avuthaa</span></li>
          </ul>
        </div>

        <!-- Shield / Reassurance -->
        <div class="letter-comfort-card">
          <p>ey kastam ina chusukodaniki nen unna</p>
          <p>deniki nuvu bayapadalsina pani ledu , insecurities ledu</p>
          <p class="comfort-highlight">just one thing edhina chusukodaniki ne bujjulu unnadu chusukuntadu antey 🫂❤️</p>
        </div>

        <!-- Universe & Earth highlight -->
        <div class="letter-universe-highlight">
          <div class="universe-stars-line">🌙 &nbsp; ✦ &nbsp; ⭐ &nbsp; ✦ &nbsp; ☀️ &nbsp; ✦ &nbsp; 🌌</div>
          <p class="universe-statement">finally i love you more Bangaru till the moon.....stars.....sun............. whole universe</p>
          <div class="bangaru-earth-pill">
            my Bangaru &gt;&gt;&gt;&gt; whole earth 🌍❤️
          </div>
        </div>

        <!-- Signature -->
        <div class="letter-signoff-block">
          <div class="signoff-closing">Forever &amp; Always Yours,</div>
          <div class="signoff-name handwritten-sig">${senderName || "Ne Bujjulu ❤️"}</div>
        </div>
      </div>
    `;
  } else {
    // Fallback for custom generic text
    const paragraphs = (text || "").split("\n\n").filter(p => p.trim().length > 0);
    let html = "";
    paragraphs.forEach(p => {
      html += `<p class="letter-para">${p.replace(/\n/g, "<br/>")}</p>`;
    });
    html += `
      <div class="letter-signoff-block">
        <div class="signoff-closing">Forever & Always Yours,</div>
        <div class="signoff-name handwritten-sig">${senderName || "Ne Bujjulu ❤️"}</div>
      </div>
    `;
    return html;
  }
}

function applyConfigToDOM() {
  // Update texts
  const envelopeNameEl = document.getElementById("envelopeRecipientName");
  if (envelopeNameEl) envelopeNameEl.textContent = userConfig.girlName;
  const heroNameEl = document.getElementById("heroName");
  if (heroNameEl) heroNameEl.textContent = userConfig.girlName;
  const heroTaglineEl = document.getElementById("heroTagline");
  if (heroTaglineEl) heroTaglineEl.textContent = userConfig.heroTagline;
  document.querySelectorAll(".recipient-inline").forEach(el => el.textContent = userConfig.girlName);
  const senderDisplayEl = document.getElementById("senderNameDisplay");
  if (senderDisplayEl) senderDisplayEl.textContent = userConfig.senderName;
  const envSender = document.getElementById("envelopeSenderName");
  if (envSender) envSender.textContent = userConfig.senderName;

  // Render Structured Letter into parchment
  const letterBody = document.getElementById("letterContent");
  if (letterBody) {
    letterBody.innerHTML = renderStructuredLetter(userConfig.letter, userConfig.senderName);
  }

  // Render Polaroids
  const polaroidGrid = document.getElementById("polaroidGrid");
  if (polaroidGrid) {
    polaroidGrid.innerHTML = "";
    (userConfig.photos || DEFAULT_CONFIG.photos).forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "polaroid-card" + (index === 0 ? " is-active" : "");
      card.setAttribute("data-index", index);
      card.title = "Tap to enlarge photo 💖";
      card.innerHTML = `
        <div class="polaroid-tape"></div>
        <div class="polaroid-img-wrap">
          <img src="${item.url}" alt="Memory ${index + 1}" loading="lazy" onerror="this.src='photo1.jpg'" />
        </div>
        <div class="polaroid-caption">${item.caption}</div>
      `;
      card.addEventListener("click", () => {
        openPhotoLightbox(item.url, item.caption);
      });
      polaroidGrid.appendChild(card);
    });
    if (typeof setupGalleryEngine === "function") {
      setupGalleryEngine();
    }
  }

  // Render Sticky Notes
  renderStickyNotes();
}

function renderStickyNotes() {
  const board = document.getElementById("stickyNotesBoard");
  board.innerHTML = "";
  const notes = userConfig.stickyNotes || DEFAULT_CONFIG.stickyNotes;
  notes.forEach(noteText => {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.innerHTML = `<span class="sticky-pin">📌</span>${noteText}`;
    board.appendChild(note);
  });
}



// ===================================================
// FLOATING HEARTS & PARTICLES CANVAS
// ===================================================
function initCanvasParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28;

  class HeartParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + 20 + Math.random() * 40;
      this.size = 8 + Math.random() * 16;
      this.speedY = 0.4 + Math.random() * 1.1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.opacity = 0.15 + Math.random() * 0.45;
      this.hue = Math.random() > 0.4 ? 345 : 45; // Pink or warm gold
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.4;
      if (this.y < -30) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.hue === 345 ? "rgba(230, 57, 99, 0.45)" : "rgba(229, 184, 92, 0.5)";
      
      // Draw smooth heart path
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
      ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    const p = new HeartParticle();
    p.y = Math.random() * height; // initial spread
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// ===================================================
// COUNTDOWN TIMER TO NOVEMBER 22
// ===================================================
function initCountdown() {
  const daysEl = document.getElementById("days");
  if (!daysEl) return;
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secsEl = document.getElementById("secs");
  const banner = document.getElementById("birthdayModeBanner");
  const title = document.getElementById("countdownTitle");

  function update() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Target: Nov 22 of current year
    let target = new Date(currentYear, 10, 22, 0, 0, 0); // Month is 0-indexed: 10 = Nov

    // If today is Nov 22
    if (now.getMonth() === 10 && now.getDate() === 22) {
      if (banner) banner.style.display = "block";
      if (title) title.textContent = "🎉 TODAY IS YOUR SPECIAL DAY! 🎉";
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    // If Nov 22 has passed this year, point to next year
    if (now > target) {
      target = new Date(currentYear + 1, 10, 22, 0, 0, 0);
    }

    const diff = target - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ===================================================
// INTERACTIVE CANDLES & CAKE
// ===================================================
function initCakeInteraction() {
  const candles = document.querySelectorAll(".candle");
  const blowBtn = document.getElementById("blowCandlesBtn");
  const relightBtn = document.getElementById("relightCandlesBtn");
  const wishMsg = document.getElementById("wishMessage");
  const surpriseCard = document.getElementById("cakeSurpriseCard");
  const surfaceGlow = document.getElementById("cakeSurfaceGlow");

  let remaining = candles.length;

  function extinguishCandle(candle) {
    if (candle.classList.contains("blown-out")) return;
    candle.classList.add("blown-out");
    remaining--;

    if (remaining === 0) {
      onAllCandlesBlown();
    }
  }

  function onAllCandlesBlown() {
    blowBtn.style.display = "none";
    relightBtn.style.display = "inline-block";
    if (surfaceGlow) surfaceGlow.style.opacity = "0";

    // Reveal the big cute surprise card!
    if (surpriseCard) {
      setTimeout(() => {
        surpriseCard.classList.add("show");
        surpriseCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    }

    // Launch floating celebratory balloons!
    launchFloatingBalloons();

    // Grand multi-stage celebratory confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#e63963", "#ff8fa3", "#d4af37", "#ffffff", "#ff4d6d"]
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 100,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.7 }
        });
        window.confetti({
          particleCount: 100,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.7 }
        });
      }, 350);
    }
  }

  function launchFloatingBalloons() {
    const emojis = ["🎈", "💖", "🎉", "✨", "🎀"];
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const balloon = document.createElement("div");
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        balloon.style.position = "fixed";
        balloon.style.bottom = "-40px";
        balloon.style.left = Math.random() * 90 + 5 + "vw";
        balloon.style.fontSize = 28 + Math.random() * 20 + "px";
        balloon.style.zIndex = "9999";
        balloon.style.pointerEvents = "none";
        balloon.style.transition = "transform 3.5s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 3.5s ease-out";
        document.body.appendChild(balloon);

        requestAnimationFrame(() => {
          balloon.style.transform = `translateY(-${window.innerHeight + 120}px) rotate(${(Math.random() - 0.5) * 40}deg)`;
          balloon.style.opacity = "0";
        });

        setTimeout(() => balloon.remove(), 3600);
      }, i * 140);
    }
  }

  candles.forEach(candle => {
    candle.addEventListener("click", () => extinguishCandle(candle));
  });

  blowBtn.addEventListener("click", () => {
    candles.forEach((candle, idx) => {
      setTimeout(() => extinguishCandle(candle), idx * 120);
    });
  });

  relightBtn.addEventListener("click", () => {
    candles.forEach(candle => candle.classList.remove("blown-out"));
    remaining = candles.length;
    if (surfaceGlow) surfaceGlow.style.opacity = "";
    if (surpriseCard) surpriseCard.classList.remove("show");
    relightBtn.style.display = "none";
    blowBtn.style.display = "inline-block";
  });
}

// ===================================================
// REASONS DECK
// ===================================================
function initReasonsDeck() {
  const card = document.getElementById("reasonCard");
  const textEl = document.getElementById("reasonText");
  const counterEl = document.getElementById("reasonCounter");
  const nextBtn = document.getElementById("nextReasonBtn");

  function showNextReason() {
    currentReasonIdx = (currentReasonIdx + 1) % REASONS_LIST.length;
    card.style.opacity = "0";
    card.style.transform = "scale(0.96) rotate(-1deg)";

    setTimeout(() => {
      textEl.textContent = `"${REASONS_LIST[currentReasonIdx]}"`;
      counterEl.textContent = `Card ${currentReasonIdx + 1} / ${REASONS_LIST.length}`;
      card.style.opacity = "1";
      card.style.transform = "scale(1) rotate(0deg)";
    }, 200);
  }

  card.addEventListener("click", showNextReason);
  nextBtn.addEventListener("click", showNextReason);
}

// ===================================================
// REALISTIC 3D GIFT BOX & SURPRISE NOTE
// ===================================================
function initGifts() {
  const giftBoxContainer = document.getElementById("giftBoxContainer");
  const giftBox = document.getElementById("realisticGiftBox");
  const giftTapHint = document.getElementById("giftTapHint");
  const boxLid = document.getElementById("boxLid");
  const boxBody = document.getElementById("boxBody");
  const noteModal = document.getElementById("revealedNoteModal");
  const closeNoteBtn = document.getElementById("closeNoteBtn");
  const noteBackdrop = document.getElementById("noteBackdrop");
  const tightHugBtn = document.getElementById("tightHugBtn");

  if (!giftBoxContainer || !noteModal) return;

  let isOpening = false;

  function openGiftBox(e) {
    if (e) {
      if (e.stopPropagation) e.stopPropagation();
    }
    if (isOpening) return;
    isOpening = true;

    if (giftBox) giftBox.classList.add("opened");

    // Confetti celebration
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#ff4d6d", "#ffd166", "#e63946", "#ff758f", "#ffffff"]
      });
    }

    // Immediately show the note over the blurred background
    setTimeout(() => {
      noteModal.classList.add("active");
      noteModal.setAttribute("aria-hidden", "false");
      isOpening = false;
    }, 120);
  }

  function closeNote(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    noteModal.classList.remove("active");
    noteModal.setAttribute("aria-hidden", "true");
    if (giftBox) giftBox.classList.remove("opened");
    isOpening = false;
  }

  // Bind click & pointer handlers across all parts of the gift box
  const interactiveTargets = [giftBoxContainer, giftBox, boxLid, boxBody, giftTapHint].filter(Boolean);
  interactiveTargets.forEach(target => {
    target.addEventListener("click", openGiftBox);
    target.addEventListener("pointerup", (e) => {
      if (e.pointerType === "touch") {
        openGiftBox(e);
      }
    });
  });

  giftBoxContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGiftBox(e);
    }
  });

  if (closeNoteBtn) closeNoteBtn.addEventListener("click", closeNote);
  if (noteBackdrop) noteBackdrop.addEventListener("click", closeNote);

  if (tightHugBtn) {
    tightHugBtn.addEventListener("click", (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (window.confetti) {
        window.confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#ff4d6d", "#ffd166", "#e63946", "#ffffff"]
        });
      }
      tightHugBtn.textContent = "🤗 Promised Forever! Can't wait to hug you! ❤️";
      tightHugBtn.style.background = "linear-gradient(135deg, #2a9d8f, #e63946)";
      showToastNotification("🤗 Come here right now! The warmest tight hug is promised forever for My Bangaru! ❤️");
    });
  }
}

// Simple romantic toast notification helper
function showToastNotification(msg) {
  const existing = document.getElementById("romanticToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "romanticToast";
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%) translateY(20px)";
  toast.style.background = "linear-gradient(135deg, #e63946, #c92a54)";
  toast.style.color = "#ffffff";
  toast.style.padding = "16px 26px";
  toast.style.borderRadius = "50px";
  toast.style.boxShadow = "0 10px 30px rgba(230, 57, 70, 0.4)";
  toast.style.zIndex = "999999";
  toast.style.fontWeight = "700";
  toast.style.fontSize = "1rem";
  toast.style.textAlign = "center";
  toast.style.maxWidth = "90vw";
  toast.style.opacity = "0";
  toast.style.transition = "all 0.35s ease";
  toast.textContent = msg;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ===================================================
// STICKY NOTES WISH BOARD
// ===================================================
function initStickyNotes() {
  const input = document.getElementById("stickyNoteInput");
  const addBtn = document.getElementById("addNoteBtn");

  function addNote() {
    const text = input.value.trim();
    if (!text) return;
    if (!userConfig.stickyNotes) userConfig.stickyNotes = [];
    userConfig.stickyNotes.push(text);
    saveConfig();
    input.value = "";

    if (window.confetti) {
      window.confetti({ particleCount: 30, spread: 40 });
    }
  }

  addBtn.addEventListener("click", addNote);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNote();
  });
}

// ===================================================
// PREMIUM SNAPSHOTS OF US: FILMSTRIP REEL ENGINE
// ===================================================
let galleryActiveIdx = 0;
let galleryAutoplayTimer = null;
let galleryIsAutoplay = true;
let galleryCurrentMode = "reel"; // 'reel' or 'grid'

function setupGalleryEngine() {
  const viewport = document.getElementById("galleryViewport");
  const grid = document.getElementById("polaroidGrid");
  const dotsRow = document.getElementById("galleryDotsRow");
  const counterPill = document.getElementById("memoryCounterPill");
  const captionEl = document.getElementById("memoryActiveCaption");
  const prevBtn = document.getElementById("galleryPrevBtn");
  const nextBtn = document.getElementById("galleryNextBtn");
  const playBtn = document.getElementById("galleryPlayBtn");
  const playLabel = document.getElementById("autoplayLabel");
  const tabReel = document.getElementById("tabReelView");
  const tabGrid = document.getElementById("tabGridView");
  const actionBtns = document.getElementById("galleryActionBtns");

  if (!viewport || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".polaroid-card"));
  const total = cards.length;
  if (total === 0) return;

  // Render Dots
  if (dotsRow) {
    dotsRow.innerHTML = "";
    cards.forEach((card, i) => {
      card.setAttribute("data-index", i);
      const dot = document.createElement("button");
      dot.className = "gallery-dot" + (i === galleryActiveIdx ? " active" : "");
      dot.setAttribute("type", "button");
      dot.setAttribute("aria-label", `Jump to memory ${i + 1}`);
      dot.addEventListener("click", () => {
        scrollToPhoto(i, true);
      });
      dotsRow.appendChild(dot);
    });
  }

  function updateStatus(idx) {
    galleryActiveIdx = idx;
    cards.forEach((c, i) => {
      c.classList.toggle("is-active", i === idx);
    });

    if (dotsRow) {
      const dots = dotsRow.querySelectorAll(".gallery-dot");
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }

    if (counterPill) {
      counterPill.textContent = `Memory ${idx + 1} of ${total}`;
    }

    if (captionEl) {
      const activeCard = cards[idx];
      const capText = activeCard ? (activeCard.querySelector(".polaroid-caption")?.textContent || "") : "";
      captionEl.style.opacity = "0";
      captionEl.style.transform = "translateY(4px)";
      setTimeout(() => {
        captionEl.textContent = capText;
        captionEl.style.opacity = "1";
        captionEl.style.transform = "translateY(0)";
      }, 150);
    }
  }

  function scrollToPhoto(idx, smooth = true) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    updateStatus(idx);

    if (galleryCurrentMode === "reel") {
      const card = cards[idx];
      if (card && viewport) {
        const targetLeft = card.offsetLeft - (viewport.clientWidth / 2) + (card.offsetWidth / 2);
        viewport.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: smooth ? "smooth" : "auto"
        });
      }
    }
  }

  function startAutoplay() {
    stopAutoplay();
    galleryIsAutoplay = true;
    if (playBtn) {
      playBtn.classList.remove("is-paused");
      playBtn.classList.add("is-playing");
    }
    if (playLabel) playLabel.textContent = "Auto-Flow";
    galleryAutoplayTimer = setInterval(() => {
      if (galleryCurrentMode === "reel") {
        const nextIdx = (galleryActiveIdx + 1) % total;
        scrollToPhoto(nextIdx, true);
      }
    }, 3600);
  }

  function stopAutoplay() {
    if (galleryAutoplayTimer) {
      clearInterval(galleryAutoplayTimer);
      galleryAutoplayTimer = null;
    }
  }

  function pauseAutoplay() {
    stopAutoplay();
    galleryIsAutoplay = false;
    if (playBtn) {
      playBtn.classList.remove("is-playing");
      playBtn.classList.add("is-paused");
    }
    if (playLabel) playLabel.textContent = "Paused";
  }

  // Initial scroll position & status
  scrollToPhoto(galleryActiveIdx, false);
  if (galleryIsAutoplay) startAutoplay();

  // Prev / Next screen arrow button listeners
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      const newIdx = (galleryActiveIdx - 1 + total) % total;
      scrollToPhoto(newIdx, true);
      if (galleryIsAutoplay) startAutoplay();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      const newIdx = (galleryActiveIdx + 1) % total;
      scrollToPhoto(newIdx, true);
      if (galleryIsAutoplay) startAutoplay();
    };
  }

  if (playBtn) {
    playBtn.onclick = () => {
      if (galleryIsAutoplay) {
        pauseAutoplay();
      } else {
        startAutoplay();
      }
    };
  }

  // Tab mode switcher (if present)
  if (tabReel && tabGrid) {
    tabReel.onclick = () => {
      galleryCurrentMode = "reel";
      tabReel.classList.add("active");
      tabGrid.classList.remove("active");
      viewport.classList.remove("grid-mode");
      viewport.classList.add("reel-mode");
      setTimeout(() => scrollToPhoto(galleryActiveIdx, true), 100);
      if (galleryIsAutoplay) startAutoplay();
    };

    tabGrid.onclick = () => {
      galleryCurrentMode = "grid";
      tabGrid.classList.add("active");
      tabReel.classList.remove("active");
      viewport.classList.remove("reel-mode");
      viewport.classList.add("grid-mode");
      stopAutoplay();
    };
  }

  // Pause autoplay on mouse enter / resume on leave
  viewport.onmouseenter = () => {
    if (galleryIsAutoplay) stopAutoplay();
  };
  viewport.onmouseleave = () => {
    if (galleryIsAutoplay && !galleryAutoplayTimer && galleryCurrentMode === "reel") {
      startAutoplay();
    }
  };

  // Touch swipe support & scroll debounce to update active index based on scroll position
  let scrollTimeout = null;
  viewport.onscroll = () => {
    if (galleryCurrentMode !== "reel") return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const center = viewport.scrollLeft + (viewport.clientWidth / 2);
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const diff = Math.abs(center - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      if (closestIdx !== galleryActiveIdx) {
        updateStatus(closestIdx);
      }
    }, 120);
  };
}

function initGalleryEngine() {
  setupGalleryEngine();
}

// Photo Lightbox Viewer
function openPhotoLightbox(src, caption) {
  const lightbox = document.getElementById("photoLightboxModal");
  if (!lightbox) return;
  const imgEl = document.getElementById("lightboxImg");
  const capEl = document.getElementById("lightboxCap");
  if (imgEl) imgEl.src = src;
  if (capEl) capEl.textContent = caption || "";
  lightbox.classList.add("open");
}

function initPhotoLightbox() {
  const lightbox = document.getElementById("photoLightboxModal");
  if (!lightbox) return;
  const closeBtn = document.getElementById("closeLightboxBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("open");
    });
  }
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("open");
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      lightbox.classList.remove("open");
    }
  });
}

// ===================================================
// SETTINGS / CUSTOMIZATION MODAL
// ===================================================
function initSettingsModal() {
  const modal = document.getElementById("settingsModal");
  const openBtn = document.getElementById("openSettingsBtn");
  const closeBtn = document.getElementById("closeSettingsBtn");
  const saveBtn = document.getElementById("saveSettingsBtn");
  const resetBtn = document.getElementById("resetDefaultsBtn");

  const girlNameInp = document.getElementById("cfgGirlName");
  const yourNameInp = document.getElementById("cfgYourName");
  const taglineInp = document.getElementById("cfgHeroTagline");
  const letterInp = document.getElementById("cfgLetterText");

  const photoInputs = [];
  for (let i = 1; i <= 8; i++) {
    photoInputs.push({
      url: document.getElementById(`cfgPhoto${i}`),
      cap: document.getElementById(`cfgCaption${i}`)
    });
  }

  function populateModal() {
    girlNameInp.value = userConfig.girlName || "";
    yourNameInp.value = userConfig.senderName || "";
    taglineInp.value = userConfig.heroTagline || "";
    letterInp.value = userConfig.letter || "";

    photoInputs.forEach((inputs, idx) => {
      const p = (userConfig.photos && userConfig.photos[idx]) || DEFAULT_CONFIG.photos[idx];
      if (inputs.url && p) inputs.url.value = p.url || "";
      if (inputs.cap && p) inputs.cap.value = p.caption || "";
    });
  }

  openBtn.addEventListener("click", () => {
    populateModal();
    modal.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  saveBtn.addEventListener("click", () => {
    userConfig.girlName = girlNameInp.value.trim() || DEFAULT_CONFIG.girlName;
    userConfig.senderName = yourNameInp.value.trim() || DEFAULT_CONFIG.senderName;
    userConfig.heroTagline = taglineInp.value.trim() || DEFAULT_CONFIG.heroTagline;
    userConfig.letter = letterInp.value.trim() || DEFAULT_CONFIG.letter;

    userConfig.photos = photoInputs.map((inputs, idx) => ({
      url: (inputs.url && inputs.url.value.trim()) || DEFAULT_CONFIG.photos[idx].url,
      caption: (inputs.cap && inputs.cap.value.trim()) || DEFAULT_CONFIG.photos[idx].caption
    }));

    saveConfig();
    modal.classList.remove("open");

    if (window.confetti) {
      window.confetti({ particleCount: 60, spread: 70 });
    }
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Reset everything back to default romantic templates?")) {
      userConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      saveConfig();
      populateModal();
      modal.classList.remove("open");
    }
  });
}

// ===================================================
// INNOVATIVE FAST-FORWARD CALENDAR TIMELINE ENGINE
// Shows month-by-month: Jan 1→31, Feb 1→28, ... Nov 1→22 STOP
// Each month flips through all its dates visually, then tears away
// ===================================================
const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const DAY_NAMES = [
  "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
];

const MONTH_VIBES = [
  "❄️ New year, new days...",
  "💌 Love is in the air...",
  "🌸 Spring is coming...",
  "🌷 Blossoms everywhere...",
  "🌞 Sunshine growing...",
  "☀️ Summer begins...",
  "🌊 Warm breezes...",
  "🌻 Golden afternoons...",
  "🍂 Leaves turning...",
  "🎃 Autumn magic...",
  "✨ Almost there...",
  "🎄 Winter wonderland..."
];

function initCalendarTimeline() {
  const calendarPage = document.getElementById("calendarPage");
  const mainSite = document.getElementById("mainSite");
  const calCard = document.getElementById("calendarCard");
  const calMonth = document.getElementById("calMonth");
  const calDayName = document.getElementById("calDayName");
  const calDateNum = document.getElementById("calDateNum");
  const calStatusTag = document.getElementById("calStatusTag");
  const leadTitle = document.getElementById("calendarLeadTitle");
  const actionBox = document.getElementById("calendarActionBox");
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const backToCalBtn = document.getElementById("backToCalBtn");

  let animFrame = null;
  let isRunning = false;

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function updateCard(month, day, vibe, isFinal) {
    calMonth.textContent = MONTH_NAMES[month];
    const dateObj = new Date(2026, month, day);
    calDayName.textContent = DAY_NAMES[dateObj.getDay()];
    calDateNum.textContent = day;
    calStatusTag.textContent = isFinal ? "✨ THE QUEEN'S BIRTHDAY ✨" : vibe;
  }

  // Visible page-flip animation for each day
  function flipEffect() {
    calDateNum.style.transition = "none";
    calDateNum.style.transform = "translateY(-18px) scale(0.7)";
    calDateNum.style.opacity = "0";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calDateNum.style.transition = "transform 0.12s ease-out, opacity 0.12s ease-out";
        calDateNum.style.transform = "translateY(0px) scale(1)";
        calDateNum.style.opacity = "1";
      });
    });
  }

  // Month tear-away animation on the whole card
  function monthTearEffect() {
    return new Promise(resolve => {
      calCard.style.transition = "transform 0.25s ease-in, opacity 0.25s ease-in";
      calCard.style.transform = "rotateX(-20deg) translateY(-30px) scale(0.92)";
      calCard.style.opacity = "0.3";
      setTimeout(() => {
        calCard.style.transition = "transform 0.2s ease-out, opacity 0.2s ease-out";
        calCard.style.transform = "rotateX(5deg) translateY(0px) scale(1)";
        calCard.style.opacity = "1";
        setTimeout(resolve, 200);
      }, 250);
    });
  }

  async function runCalendarAnimation() {
    if (isRunning) return;
    isRunning = true;

    // Reset
    calCard.classList.remove("target-reached");
    actionBox.classList.remove("show");
    calCard.style.transform = "";
    calCard.style.opacity = "";
    if (leadTitle) leadTitle.textContent = "";

    const TARGET_MONTH = 10; // November (0-indexed)
    const TARGET_DAY = 22;

    // Walk through months 0 (Jan) to 10 (Nov)
    for (let month = 0; month <= TARGET_MONTH; month++) {
      if (!isRunning) return;

      const lastDay = (month === TARGET_MONTH) ? TARGET_DAY : getDaysInMonth(2026, month);

      // Speed config — every single date must be clearly readable!
      // Starts at a visible pace and gradually slows for dramatic effect
      let baseDelay;
      if (month <= 1) baseDelay = 90;        // Jan–Feb: fast but readable
      else if (month <= 3) baseDelay = 80;    // Mar–Apr: slightly faster
      else if (month <= 6) baseDelay = 100;   // May–Jul: steady
      else if (month <= 8) baseDelay = 120;   // Aug–Sep: slowing
      else if (month === 9) baseDelay = 150;  // Oct: slow
      else baseDelay = 180;                   // Nov: slowest base

      // Update lead title if present
      if (leadTitle) leadTitle.textContent = MONTH_VIBES[month] + " " + MONTH_NAMES[month] + " 2026";

      // Flip through each day in this month
      for (let day = 1; day <= lastDay; day++) {
        if (!isRunning) return;

        const isFinal = (month === TARGET_MONTH && day === TARGET_DAY);

        // Last few days of November: dramatic slowdown
        let delay = baseDelay;
        if (month === TARGET_MONTH) {
          if (day >= 20) delay = 500;       // Nov 20,21,22 — very slow, suspenseful
          else if (day >= 17) delay = 350;  // Nov 17-19
          else if (day >= 12) delay = 250;  // Nov 12-16
        }

        updateCard(month, day, MONTH_VIBES[month], isFinal);
        flipEffect();

        if (isFinal) {
          finishCalendarJourney();
          return;
        }

        // Wait for the delay
        await new Promise(r => setTimeout(r, delay));
      }

      // Month finished — do a page-tear effect before next month
      if (month < TARGET_MONTH) {
        await monthTearEffect();
      }
    }
  }

  function finishCalendarJourney() {
    isRunning = false;
    calCard.classList.add("target-reached");
    calCard.style.transform = "";
    calCard.style.opacity = "";
    if (leadTitle) leadTitle.textContent = "";

    // Confetti celebration
    if (window.confetti) {
      window.confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#e63963", "#ffc2d1", "#d4af37", "#ffffff"]
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 }
        });
        window.confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 }
        });
      }, 350);
    }

    // Show See More button
    setTimeout(() => {
      actionBox.classList.add("show");
    }, 500);
  }

  // Navigate to Page 2
  seeMoreBtn.addEventListener("click", () => {
    calendarPage.classList.add("page-hidden");
    mainSite.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.confetti) {
      setTimeout(() => {
        window.confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.3 },
          colors: ["#e63963", "#ffd1dc", "#e6b85c"]
        });
      }, 250);
    }
  });

  // Skip directly to Page 2
  const skipBtn = document.getElementById("skipToPage2");
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      isRunning = false;
      calendarPage.classList.add("page-hidden");
      mainSite.classList.add("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Back to Calendar Button
  if (backToCalBtn) {
    backToCalBtn.addEventListener("click", () => {
      mainSite.classList.remove("show");
      calendarPage.classList.remove("page-hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Start the calendar journey after a short delay
  setTimeout(runCalendarAnimation, 600);
}

// Sparkle mouse follower
function initSparkleCursor() {
  let lastSparkleTime = 0;
  window.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < 80) return;
    lastSparkleTime = now;

    const sparkle = document.createElement("div");
    sparkle.textContent = Math.random() > 0.5 ? "✨" : "💖";
    sparkle.style.position = "fixed";
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.fontSize = `${10 + Math.random() * 12}px`;
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "999";
    sparkle.style.opacity = "1";
    sparkle.style.transform = `translate(-50%, -50%) scale(${0.8 + Math.random() * 0.5})`;
    sparkle.style.transition = "all 0.8s ease-out";

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(-50%, -80px) scale(0)`;
      sparkle.style.opacity = "0";
    });

    setTimeout(() => sparkle.remove(), 800);
  });
}

// Love Letter Glass Modal
function initLetterModal() {
  const coverCard = document.getElementById("letterCoverCard");
  const modal = document.getElementById("letterOverlayModal");
  const closeTopBtn = document.getElementById("closeLetterModalTopBtn");
  const foldBottomBtn = document.getElementById("foldLetterBottomBtn");

  if (!coverCard || !modal) return;

  function openLetter() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-modal-open");

    if (window.confetti) {
      window.confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#ff758f", "#e63946", "#ffd166", "#ffffff"]
      });
    }
  }

  function closeLetter() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("letter-modal-open");
  }

  coverCard.addEventListener("click", openLetter);
  if (closeTopBtn) closeTopBtn.addEventListener("click", closeLetter);
  if (foldBottomBtn) foldBottomBtn.addEventListener("click", closeLetter);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLetter();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeLetter();
    }
  });
}

// Initialize everything on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  applyConfigToDOM();
  initCanvasParticles();
  initCountdown();
  initCakeInteraction();
  initReasonsDeck();
  initGifts();
  initStickyNotes();
  initSettingsModal();
  initPhotoLightbox();
  initGalleryEngine();
  initLetterModal();
  initCalendarTimeline();
  initSparkleCursor();
});
