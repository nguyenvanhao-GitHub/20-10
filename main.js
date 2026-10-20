/**
 * 20/10 - CẢ MỘT VƯỜN THƯƠNG
 * Khu vườn hoa lấy cảm hứng từ ảnh mẫu, dùng ảnh hoa hồng cắt nền để giữ chi tiết cánh.
 */

// =============================================================================
// 1. BẢNG MÀU PASTEL CHUẨN NGHỆ THUẬT (KHỚP 100% ẢNH 2)
// =============================================================================
const COLOR_PALETTES = [
  {
    type: 'pink',
    name: 'Hồng phấn',
    baseLight: '#f8cbd5',
    baseMid: '#eda5b7',
    baseDark: '#d97b98',
    coreColor: '#bb6482',
    lineColor: '#a76079',
    sepalColor: '#2e7d32'
  },
  {
    type: 'peach',
    name: 'Cam đào / Apricot',
    baseLight: '#f9dfca',
    baseMid: '#efbda0',
    baseDark: '#dc957f',
    coreColor: '#bc786c',
    lineColor: '#b37d71',
    sepalColor: '#2e7d32'
  },
  {
    type: 'mint',
    name: 'Xanh bơ / Mint',
    baseLight: '#e0efd2',
    baseMid: '#bddca9',
    baseDark: '#90be83',
    coreColor: '#75a673',
    lineColor: '#77966f',
    sepalColor: '#2e7d32'
  },
  {
    type: 'blue',
    name: 'Lam ngọc / Sky Blue',
    baseLight: '#e1f1f7',
    baseMid: '#b4ddf0',
    baseDark: '#7fbee0',
    coreColor: '#579ac4',
    lineColor: '#6293b1',
    sepalColor: '#2e7d32'
  },
  {
    type: 'cream',
    name: 'Vàng kem bơ',
    baseLight: '#fff5df',
    baseMid: '#f4e4b9',
    baseDark: '#e7cd9b',
    coreColor: '#c9aa79',
    lineColor: '#b9a17f',
    sepalColor: '#2e7d32'
  },
  {
    type: 'lavender',
    name: 'Tím oải hương',
    baseLight: '#f2e4f0',
    baseMid: '#dec6df',
    baseDark: '#bf9dc6',
    coreColor: '#a583ad',
    lineColor: '#9a789e',
    sepalColor: '#2e7d32'
  }
];

function polarToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}

// =============================================================================
// 2. HOA HỒNG ẢNH CẮT NỀN, GIỮ KẾT CẤU CÁNH HOA THẬT
// =============================================================================
const ROSE_IMAGE_SRC = 'assets/rose-pink.png';
const ROSE_COLOR_FILTERS = {
  pink: 'none',
  peach: 'hue-rotate(36deg) saturate(.86)',
  mint: 'hue-rotate(128deg) saturate(.74)',
  blue: 'hue-rotate(215deg) saturate(.8)',
  cream: 'hue-rotate(72deg) saturate(.66)',
  lavender: 'hue-rotate(298deg) saturate(.75)'
};

function createRoseImageHTML(palette) {
  const colorFilter = ROSE_COLOR_FILTERS[palette.type] || 'none';
  return `<img class="rose-bloom-image" src="${ROSE_IMAGE_SRC}" alt="" draggable="false" style="filter: ${colorFilter}">`;
}
// =============================================================================
// 3. NỤ HOA (ROSEBUD - KHỚP CÁC NỤ XANH LAM, CAM TRÊN ẢNH 2)
// =============================================================================
function createOrganicRoseBudSVG(palette, uniqueId, size = 100) {
  const { baseDark, lineColor, sepalColor } = palette;
  return `
  <svg viewBox="0 0 100 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Nụ hoa giọt nước mượt mà -->
    <path d="M 50 25 C 65 48, 68 76, 50 90 C 32 76, 35 48, 50 25 Z" 
          fill="${baseDark}" stroke="${lineColor}" stroke-width="1.0"/>
    <!-- Vệt sáng uốn lượn trên thân nụ -->
    <path d="M 44 32 C 54 48, 55 68, 48 82" 
          fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>
    <!-- Hai lá đài xanh rêu ôm lấy hai bên nụ -->
    <path d="M 50 94 C 36 88, 26 72, 30 46 C 36 68, 43 82, 50 94 Z" 
          fill="${sepalColor}" stroke="#1b5e20" stroke-width="1.0"/>
    <path d="M 33 80 Q 28 66 30 52" fill="none" stroke="#a5d6a7" stroke-width="1.4" stroke-linecap="round"/>
    
    <path d="M 50 94 C 64 88, 74 72, 70 46 C 64 68, 57 82, 50 94 Z" 
          fill="${sepalColor}" stroke="#1b5e20" stroke-width="1.0"/>
    <path d="M 67 80 Q 72 66 70 52" fill="none" stroke="#a5d6a7" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;
}

// =============================================================================
// 4. HOA CÚC XOẮN TRÒN (BUTTON FLOWER - TRÊN CÀNH CAO TẦNG BẦU TRỜI ẢNH 2)
// =============================================================================
function createOrganicButtonSVG(palette, uniqueId, size = 90) {
  const { baseLight, baseMid, coreColor, lineColor } = palette;
  const cx = 45, cy = 45;
  return `
  <svg viewBox="0 0 90 90" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="38" fill="${baseLight}" stroke="${lineColor}" stroke-width="0.9"/>
    <circle cx="${cx}" cy="${cy}" r="28" fill="${baseMid}" stroke="${lineColor}" stroke-width="0.8"/>
    <!-- Đường vân xoắn ốc mềm mại -->
    <path d="M ${cx} ${cy - 18} A 18 18 0 1 1 ${cx - 0.1} ${cy - 18} M ${cx} ${cy - 10} A 10 10 0 1 1 ${cx - 0.1} ${cy - 10}" 
          fill="none" stroke="${lineColor}" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M ${cx} ${cy - 18} A 18 18 0 1 1 ${cx - 0.1} ${cy - 18}" 
          fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="${coreColor}"/>
  </svg>`;
}

// =============================================================================
// 5. CÀNH HOA VÀ LÁ TỰ NHIÊN (HERO STEM & GARDEN STEMS)
// =============================================================================

function createHeroStemSVG(heightPx) {
  const widthPx = 160;
  const cx = widthPx / 2;
  return `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <path d="M ${cx} 3 Q ${cx - 2} ${heightPx * .43} ${cx} ${heightPx}" fill="none" stroke="#235c35" stroke-width="2.3" stroke-linecap="round"/>
    <!-- Lá trên nằm bên trái, hướng xuống như ảnh mẫu. -->
    <path d="M ${cx} 24 Q ${cx - 12} 25 ${cx - 19} 17" fill="none" stroke="#235c35" stroke-width="1.4"/>
    <path d="M ${cx - 2} 25 C ${cx - 10} 25 ${cx - 24} 21 ${cx - 31} 10 C ${cx - 32} 22 ${cx - 26} 34 ${cx - 15} 37 C ${cx - 8} 39 ${cx - 3} 33 ${cx - 2} 25 Z" fill="#247846" stroke="#185939" stroke-width="1"/>
    <path d="M ${cx - 3} 26 Q ${cx - 17} 29 ${cx - 29} 12" fill="none" stroke="#78ad79" stroke-width=".9"/>
    <!-- Lá giữa hướng lên về bên phải. -->
    <path d="M ${cx} ${heightPx * .39} Q ${cx + 11} ${heightPx * .36} ${cx + 18} ${heightPx * .32}" fill="none" stroke="#235c35" stroke-width="1.4"/>
    <path d="M ${cx + 1} ${heightPx * .39} C ${cx + 7} ${heightPx * .27} ${cx + 23} ${heightPx * .24} ${cx + 39} ${heightPx * .25} C ${cx + 35} ${heightPx * .34} ${cx + 23} ${heightPx * .40} ${cx + 1} ${heightPx * .39} Z" fill="#21804b" stroke="#185939" stroke-width="1"/>
    <path d="M ${cx + 2} ${heightPx * .38} Q ${cx + 21} ${heightPx * .32} ${cx + 38} ${heightPx * .26}" fill="none" stroke="#89b47e" stroke-width=".9"/>
  </svg>`;
}

function createGardenStemSVG(heightPx, bendPx = 0, leaves = []) {
  const widthPx = 80;
  const cx = widthPx / 2;
  const topY = 10;
  const botY = heightPx;
  const midY = heightPx * 0.5;
  const ctrlX = cx + bendPx;

  let svg = `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <path d="M ${cx} ${topY} Q ${ctrlX} ${midY} ${cx} ${botY}" fill="none" stroke="#38761d" stroke-width="2.6" stroke-linecap="round"/>
  `;

  leaves.forEach(leaf => {
    const leafY = topY + (heightPx - topY) * leaf.pos;
    const isLeft = leaf.side === 'left';
    const angle = isLeft ? -leaf.angle : leaf.angle;
    const scale = leaf.scale || 1.0;
    const t = leaf.pos;
    const stemX = (1 - t) * (1 - t) * cx + 2 * (1 - t) * t * ctrlX + t * t * cx;

    svg += `
      <g transform="translate(${stemX}, ${leafY}) rotate(${angle}) scale(${scale})">
        <path d="M 0 0 Q ${isLeft ? -6 : 6} -3 ${isLeft ? -12 : 12} -4" fill="none" stroke="#275014" stroke-width="2" stroke-linecap="round"/>
        <path d="M ${isLeft ? -10 : 10} -3 
                 C ${isLeft ? -18 : 18} -14, ${isLeft ? -34 : 34} -12, ${isLeft ? -40 : 40} -3
                 C ${isLeft ? -32 : 32} 6, ${isLeft ? -18 : 18} 5, ${isLeft ? -10 : 10} -3 Z"
              fill="#2e631e" stroke="#1b3d11" stroke-width="1"/>
        <path d="M ${isLeft ? -10 : 10} -3 Q ${isLeft ? -25 : 25} -4 ${isLeft ? -38 : 38} -3" fill="none" stroke="#84cc16" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    `;
  });

  svg += `</svg>`;
  return svg;
}

// =============================================================================
// 6. KHỞI TẠO BỨC TƯỜNG HOA DÀY ĐẶC (TIERED GARDEN LAYOUT - KHỚP 100% ẢNH 2)
// =============================================================================
let gardenFlowersData = [];

function buildGarden() {
  const container = document.getElementById('garden-container');
  if (!container) return;
  container.innerHTML = '';
  gardenFlowersData = [];

  // Cố định bố cục để khu vườn giữ nguyên vị trí như một bức tranh mỗi lần mở.
  let seed = 20261020;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const isMobile = window.innerWidth <= 768;
  const containerHeight = container.clientHeight || window.innerHeight;
  const sizeScale = isMobile ? 0.64 : 1;
  const gardenColors = [0, 1, 2, 0, 3, 1, 2, 0, 4, 5];
  const gardenPalette = index => COLOR_PALETTES[gardenColors[index % gardenColors.length]];

  // Danh sách các loài hoa được xếp theo 4 tầng lớp để tạo thảm hoa dày đặc không còn kẽ hở
  const flowerItems = [];

  // TẦNG 1: DƯỚI ĐÁY CÙNG (0% - 14% chiều cao) - 10 đóa hoa lớn xếp sát nhau gối lên nhau phủ kín đáy
  const countT1 = isMobile ? 12 : 23;
  for (let i = 0; i < countT1; i++) {
    const xPct = (i / (countT1 - 1)) * 96 + 2 + (rand() * 4 - 2);
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: Math.floor((100 + rand() * 33) * sizeScale),
      heightPx: Math.floor(containerHeight * (0.05 + rand() * 0.16)),
      type: 'rose',
      layer: 28, // Trên cùng trong khu vườn
      palette: gardenPalette(i),
      bend: (rand() - 0.5) * 15,
      hasStem: false // Đáy sát đất không lộ cành
    });
  }

  // TẦNG 2: TẦNG TRUNG TRƯỚC (12% - 28% chiều cao) - 12 đóa hoa lấp đầy các khe hở của tầng 1
  const countT2 = isMobile ? 15 : 26;
  for (let i = 0; i < countT2; i++) {
    const xPct = ((i + 0.5) / countT2) * 94 + 3 + (rand() * 4 - 2);
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: Math.floor((82 + rand() * 28) * sizeScale),
      heightPx: Math.floor(containerHeight * (0.22 + rand() * 0.17)),
      type: 'rose',
      layer: 22,
      palette: gardenPalette(i + 2),
      bend: (rand() - 0.5) * 20,
      hasStem: true
    });
  }

  // TẦNG 3: TẦNG TRUNG SAU (26% - 42% chiều cao) - 11 đóa hoa hồng & búp nụ xen kẽ
  const countT3 = isMobile ? 13 : 24;
  for (let i = 0; i < countT3; i++) {
    const xPct = (i / (countT3 - 1)) * 92 + 4 + (rand() * 5 - 2.5);
    const isBud = rand() < 0.22;
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: Math.floor((isBud ? 49 : 66 + rand() * 22) * sizeScale),
      heightPx: Math.floor(containerHeight * (0.39 + rand() * 0.2)),
      type: isBud ? 'bud' : 'rose',
      layer: 16,
      palette: isBud ? (rand() < 0.5 ? COLOR_PALETTES[3] : COLOR_PALETTES[1]) : gardenPalette(i + 4),
      bend: (rand() - 0.5) * 25,
      hasStem: true
    });
  }

  // TẦNG 4: TẦNG CÀNH CAO VƯƠN LÊN BẦU TRỜI (42% - 66% chiều cao) - Hoa cúc xoắn tròn & nụ hoa vươn cao như ảnh 2
  const countT4 = isMobile ? 10 : 21;
  for (let i = 0; i < countT4; i++) {
    const xPct = (i / (countT4 - 1)) * 92 + 4 + (rand() * 6 - 3);
    // Tránh vị trí giữa để không che bông hoa hồng Hero
    if (Math.abs(xPct - 50) < 9) continue;

    const r = rand();
    const type = r < 0.35 ? 'button' : (r < 0.58 ? 'bud' : 'rose');
    const sizePx = Math.floor((type === 'button' ? 44 : (type === 'bud' ? 49 : 57)) * sizeScale);

    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: sizePx,
      heightPx: Math.floor(containerHeight * (0.6 + rand() * 0.23)),
      type: type,
      layer: 11,
      palette: gardenPalette(i),
      bend: (rand() - 0.5) * 28,
      hasStem: true
    });
  }

  // Tạo phần tử DOM cho toàn bộ khu vườn
  flowerItems.forEach((item, idx) => {
    const distFromCenter = Math.abs(item.xPct - 50) / 50;
    const delay = (0.2 + distFromCenter * 1.3 + rand() * 0.7).toFixed(2);
    const swayDuration = (3.8 + rand() * 2.2).toFixed(1) + 's';
    const swayDelay = (-rand() * 4).toFixed(1) + 's';
    const baseRot = ((rand() - 0.5) * 4).toFixed(1) + 'deg';

    const flowerEl = document.createElement('div');
    flowerEl.className = 'garden-flower';
    flowerEl.style.left = `${item.xPct}%`;
    flowerEl.style.zIndex = item.layer;
    flowerEl.style.setProperty('--sway-duration', swayDuration);
    flowerEl.style.setProperty('--sway-delay', swayDelay);
    flowerEl.style.setProperty('--base-rot', baseRot);

    // Bông hoa
    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';
    headWrap.style.width = `${item.sizePx}px`;
    headWrap.style.height = `${item.sizePx}px`;
    headWrap.style.bottom = `${item.heightPx - item.sizePx / 2}px`;

    if (item.type === 'button') {
      headWrap.innerHTML = createOrganicButtonSVG(item.palette, `g-${idx}`, item.sizePx);
    } else if (item.type === 'bud') {
      headWrap.innerHTML = createOrganicRoseBudSVG(item.palette, `g-${idx}`, item.sizePx);
    } else {
      headWrap.innerHTML = createRoseImageHTML(item.palette);
    }

    // Cành hoa
    if (item.hasStem) {
      const leaves = [];
      if (rand() > 0.3) {
        leaves.push({ side: 'left', pos: 0.38 + rand() * 0.15, angle: 32 + rand() * 18, scale: 0.75 + rand() * 0.25 });
      }
      if (rand() > 0.35) {
        leaves.push({ side: 'right', pos: 0.62 + rand() * 0.15, angle: 32 + rand() * 18, scale: 0.75 + rand() * 0.25 });
      }
      const stemWrap = document.createElement('div');
      stemWrap.className = 'flower-stem-wrap';
      stemWrap.innerHTML = createGardenStemSVG(item.heightPx, item.bend, leaves);
      flowerEl.appendChild(stemWrap);
    }

    flowerEl.appendChild(headWrap);

    flowerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      playChimeNote(440 + Math.random() * 400);
      flowerEl.style.transform = 'scale(1.1) translateY(-6px)';
      setTimeout(() => {
        flowerEl.style.transform = '';
      }, 400);
    });

    container.appendChild(flowerEl);
    gardenFlowersData.push({ element: flowerEl, delay: parseFloat(delay) });
  });
}

// =============================================================================
// 7. KỊCH BẢN NỞ HOA & ĐIỀU KHIỂN
// =============================================================================
let hasBloomed = false;
let isBlooming = false;

function triggerGardenBloom() {
  if (isBlooming || hasBloomed) return;
  isBlooming = true;

  startAudioEngine();
  playBloomArpeggio();
  startPetalRain();

  const heroWrapper = document.getElementById('hero-flower');
  const heroIndicator = document.getElementById('hero-click-indicator');
  if (heroIndicator) heroIndicator.style.display = 'none';

  if (heroWrapper) {
    heroWrapper.style.transform = 'translateX(-50%) scale(1.08)';
    setTimeout(() => {
      heroWrapper.style.transform = 'translateX(-50%) scale(1.0)';
    }, 600);
  }

  const introContainer = document.getElementById('intro-text-box');
  const introSubtitle = document.getElementById('intro-subtitle');
  if (introContainer && introSubtitle) {
    introContainer.classList.add('blooming-state');
    introSubtitle.textContent = 'Từ một bông hoa, cả khu vườn đang thức giấc...';
  }

  gardenFlowersData.forEach(item => {
    setTimeout(() => {
      item.element.classList.add('bloomed');
    }, item.delay * 1000);
  });

  setTimeout(() => {
    hasBloomed = true;
    isBlooming = false;

    if (introContainer) {
      introContainer.classList.add('bloomed-done');
    }

    const bottomActions = document.getElementById('bottom-actions');
    if (bottomActions) {
      bottomActions.classList.add('visible');
    }

    setTimeout(() => {
      openCardModal();
    }, 1400);

  }, 3200);
}

function resetGardenBloom() {
  hasBloomed = false;
  isBlooming = false;

  closeCardModal();

  const bottomActions = document.getElementById('bottom-actions');
  if (bottomActions) {
    bottomActions.classList.remove('visible');
  }

  const introContainer = document.getElementById('intro-text-box');
  const introSubtitle = document.getElementById('intro-subtitle');
  const heroIndicator = document.getElementById('hero-click-indicator');
  if (introContainer && introSubtitle) {
    introContainer.classList.remove('blooming-state');
    introContainer.classList.remove('bloomed-done');
    introSubtitle.textContent = 'Chạm vào hoa, một điều dịu dàng đang chờ bạn';
  }
  if (heroIndicator) heroIndicator.style.display = '';

  gardenFlowersData.forEach(item => {
    item.element.classList.remove('bloomed');
  });

  setTimeout(() => {
    buildGarden();
  }, 400);
}

// =============================================================================
// 8. THIỆP CHÚC MỪNG & TIỆN ÍCH
// =============================================================================
function openCardModal() {
  const modal = document.getElementById('card-modal');
  if (modal) {
    playChimeNote(587.33);
    modal.classList.add('open');
  }
}

function closeCardModal() {
  const modal = document.getElementById('card-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function setupPersonalizedGreeting() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('name') || urlParams.get('to');
  
  if (recipientName && recipientName.trim() !== '') {
    const cleanName = recipientName.trim();
    const topBrand = document.getElementById('top-brand');
    if (topBrand) {
      topBrand.textContent = `Dành ${cleanName}, cả một vườn thương.`;
    }
    const cardRecipient = document.getElementById('card-recipient');
    if (cardRecipient) {
      cardRecipient.textContent = `Gửi ${cleanName} thương mến,`;
    }
  }
}

function copyWishToClipboard() {
  const wishText = `Gửi bạn thương mến,
Mong những điều đẹp đẽ luôn nở bên bạn.

Một bông hoa có thể làm một ngày thêm đẹp.
Còn bạn làm thế giới này dịu dàng hơn.

Nhân ngày 20/10 chúc bạn luôn được yêu thương, trân trọng và có thật nhiều niềm vui. Mong bạn đủ bình yên để tận hưởng những điều nhỏ bé, đủ tự tin để theo đuổi những điều mình yêu.

Hôm nay và cả những ngày sau, hãy cứ rạng rỡ theo cách của riêng mình nhé.

Gửi bạn thật nhiều thương mến ♡`;

  navigator.clipboard.writeText(wishText).then(() => {
    showToast('Đã sao chép lời chúc vào khay nhớ tạm! ✨');
  }).catch(() => {
    showToast('Không thể sao chép tự động, bạn hãy bôi đen văn bản nhé!');
  });
}

function createPersonalizedLink() {
  const name = prompt('Nhập tên người bạn muốn gửi tặng (Ví dụ: Mai, Lan, Chị Ngọc...):');
  if (name && name.trim()) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('name', name.trim());
    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      showToast(`Đã tạo và sao chép liên kết chúc mừng dành cho ${name.trim()}! 🌸`);
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// =============================================================================
// 9. ÂM THANH & CANVAS FX
// =============================================================================
let audioCtx = null;
let isAudioPlaying = false;
let audioMelodyTimer = null;
let customAudioEl = null;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playChimeNote(freq, delay = 0, duration = 1.2) {
  try {
    initAudioContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.14, audioCtx.currentTime + delay + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration + 0.1);
  } catch (err) {}
}

function playBloomArpeggio() {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, idx) => {
    playChimeNote(freq, idx * 0.12, 1.8);
  });
}

function startGenerativeMusic() {
  if (audioMelodyTimer) clearInterval(audioMelodyTimer);
  const chordProgressions = [
    [261.63, 329.63, 392.00, 493.88],
    [220.00, 261.63, 329.63, 392.00],
    [174.61, 220.00, 261.63, 329.63],
    [196.00, 246.94, 293.66, 392.00]
  ];
  let chordIndex = 0;
  function playNextChord() {
    if (!isAudioPlaying) return;
    const chord = chordProgressions[chordIndex];
    chord.forEach((freq, i) => {
      playChimeNote(freq * 1.5, i * 0.25, 2.5);
    });
    chordIndex = (chordIndex + 1) % chordProgressions.length;
  }
  playNextChord();
  audioMelodyTimer = setInterval(playNextChord, 3800);
}

function startAudioEngine() {
  initAudioContext();
  isAudioPlaying = true;
  updateMusicBtnUI(true);

  if (!customAudioEl) {
    customAudioEl = new Audio('music.mp3');
    customAudioEl.loop = true;
    customAudioEl.volume = 0.5;
  }

  customAudioEl.play().catch(() => {
    startGenerativeMusic();
  });
}

function toggleAudio() {
  if (isAudioPlaying) {
    isAudioPlaying = false;
    if (customAudioEl) customAudioEl.pause();
    if (audioMelodyTimer) clearInterval(audioMelodyTimer);
    updateMusicBtnUI(false);
  } else {
    startAudioEngine();
  }
}

function updateMusicBtnUI(playing) {
  const btn = document.getElementById('music-toggle-btn');
  if (btn) {
    btn.innerHTML = playing ? '<span class="control-icon">🎵</span> Bật nhạc' : '<span class="control-icon">🔇</span> Tắt nhạc';
  }
}

// Canvas FX
let canvas, ctx;
let particles = [];
let isRainingPetals = false;

function initCanvasFX() {
  canvas = document.getElementById('fx-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(loopFX);
}

function startPetalRain() {
  isRainingPetals = true;
  for (let i = 0; i < 35; i++) {
    particles.push(createParticle(true));
  }
}

function createParticle(randomY = false) {
  const isSparkle = Math.random() < 0.35;
  return {
    isSparkle,
    x: Math.random() * (canvas ? canvas.width : window.innerWidth),
    y: randomY ? Math.random() * (canvas ? canvas.height : window.innerHeight) : -20,
    size: isSparkle ? (Math.random() * 2.5 + 1.5) : (Math.random() * 8 + 6),
    speedX: Math.random() * 1.5 - 0.5,
    speedY: isSparkle ? (Math.random() * 0.8 + 0.3) : (Math.random() * 1.6 + 1.0),
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3,
    color: isSparkle 
      ? `rgba(255, 235, 180, ${Math.random() * 0.6 + 0.3})`
      : ['rgba(255, 182, 193, 0.75)', 'rgba(255, 192, 203, 0.75)', 'rgba(254, 215, 226, 0.75)'][Math.floor(Math.random() * 3)],
    opacity: 1
  };
}

function loopFX() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isRainingPetals && particles.length < 50 && Math.random() < 0.15) {
      particles.push(createParticle(false));
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      if (p.isSparkle) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.6, p.size * 0.6);
        ctx.quadraticCurveTo(0, p.size, -p.size * 0.6, p.size * 0.6);
        ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.4, 0, -p.size);
        ctx.fill();
      }
      ctx.restore();
      if (p.y > canvas.height + 25 || p.x > canvas.width + 25) {
        particles.splice(i, 1);
      }
    }
  }
  requestAnimationFrame(loopFX);
}

// =============================================================================
// 10. KHỞI TẠO TOÀN DIỆN TRANG WEB KHI TẢI XONG
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // 1. Dựng bông hoa chính (Hero Rose) tự nhiên chuẩn ảnh 1 & 2
  const heroHead = document.getElementById('hero-rose-head');
  if (heroHead) {
    const heroPalette = COLOR_PALETTES[0]; // Hồng phấn
    heroHead.innerHTML = createRoseImageHTML(heroPalette);
  }

  const heroStem = document.getElementById('hero-stem-svg');
  if (heroStem) {
    heroStem.innerHTML = createHeroStemSVG(heroStem.clientHeight || 280);
  }

  // 2. Dựng icon hoa trên thiệp
  const cardIcon = document.getElementById('card-rose-icon');
  if (cardIcon) {
    cardIcon.innerHTML = createRoseImageHTML(COLOR_PALETTES[0]);
  }

  // 3. Chuẩn bị vườn hoa
  buildGarden();

  // 4. Khởi tạo canvas hiệu ứng
  initCanvasFX();

  // 5. Kiểm tra thông tin tùy chỉnh URL
  setupPersonalizedGreeting();

  // 6. Gán các sự kiện tương tác
  const heroFlower = document.getElementById('hero-flower');
  if (heroFlower) {
    heroFlower.addEventListener('click', triggerGardenBloom);
  }

  const btnReplay = document.getElementById('btn-replay-bloom');
  if (btnReplay) {
    btnReplay.addEventListener('click', resetGardenBloom);
  }

  const btnReadCard = document.getElementById('btn-read-card');
  if (btnReadCard) {
    btnReadCard.addEventListener('click', openCardModal);
  }

  const btnCloseCard = document.getElementById('btn-close-card');
  if (btnCloseCard) {
    btnCloseCard.addEventListener('click', closeCardModal);
  }

  const btnViewGarden = document.getElementById('btn-view-garden');
  if (btnViewGarden) {
    btnViewGarden.addEventListener('click', closeCardModal);
  }

  const cardBackdrop = document.getElementById('card-modal');
  if (cardBackdrop) {
    cardBackdrop.addEventListener('click', (e) => {
      if (e.target === cardBackdrop) {
        closeCardModal();
      }
    });
  }

  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleAudio);
  }

  const btnCopyWish = document.getElementById('btn-copy-wish');
  if (btnCopyWish) {
    btnCopyWish.addEventListener('click', copyWishToClipboard);
  }

  const btnCustomLink = document.getElementById('btn-custom-link');
  if (btnCustomLink) {
    btnCustomLink.addEventListener('click', createPersonalizedLink);
  }

  window.addEventListener('resize', () => {
    if (!hasBloomed && !isBlooming) {
      if (heroStem) {
        heroStem.innerHTML = createHeroStemSVG(heroStem.clientHeight || 280);
      }
      buildGarden();
    }
  });
});
