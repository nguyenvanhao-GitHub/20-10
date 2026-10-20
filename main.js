/**
 * 20/10 - CẢ MỘT VƯỜN THƯƠNG
 * Hiệu ứng hoa nở và thiệp đọc chúc mừng ngày Phụ nữ Việt Nam 20/10
 */

// =============================================================================
// 1. BẢNG MÀU HOA VÀ TÙY CHỌN (Khớp bảng màu trong video/ảnh)
// =============================================================================
const COLOR_PALETTES = [
  {
    type: 'pink',
    name: 'Hồng phấn',
    outer: '#fbcfe8',
    midOuter: '#f9a8d4',
    mid: '#f472b6',
    inner: '#ec4899',
    center: '#db2777',
    centerDark: '#9d174d',
    stroke: 'rgba(190, 24, 93, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  },
  {
    type: 'peach',
    name: 'Cam đào / Apricot',
    outer: '#fed7aa',
    midOuter: '#fdba74',
    mid: '#fb923c',
    inner: '#f97316',
    center: '#ea580c',
    centerDark: '#c2410c',
    stroke: 'rgba(234, 88, 12, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  },
  {
    type: 'mint',
    name: 'Xanh bạc hà / Matcha nhạt',
    outer: '#d1fae5',
    midOuter: '#a7f3d0',
    mid: '#6ee7b7',
    inner: '#34d399',
    center: '#10b981',
    centerDark: '#047857',
    stroke: 'rgba(16, 185, 129, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  },
  {
    type: 'blue',
    name: 'Xanh lam ngọc / Pastel Sky',
    outer: '#e0f2fe',
    midOuter: '#bae6fd',
    mid: '#7dd3fc',
    inner: '#38bdf8',
    center: '#0284c7',
    centerDark: '#0369a1',
    stroke: 'rgba(2, 132, 199, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  },
  {
    type: 'yellow',
    name: 'Vàng kem bơ / Buttercream',
    outer: '#fef08a',
    midOuter: '#fde047',
    mid: '#facc15',
    inner: '#eab308',
    center: '#ca8a04',
    centerDark: '#a16207',
    stroke: 'rgba(202, 138, 4, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  },
  {
    type: 'lavender',
    name: 'Tím oải hương nhạt',
    outer: '#ede9fe',
    midOuter: '#ddd6fe',
    mid: '#c4b5fd',
    inner: '#a78bfa',
    center: '#8b5cf6',
    centerDark: '#6d28d9',
    stroke: 'rgba(139, 92, 246, 0.35)',
    stem: '#558b2f',
    sepal: '#5c8f2b'
  }
];

// =============================================================================
// 2. TẠO HÌNH HOA GIẤY (SVG PROCEDURAL GENERATOR)
// =============================================================================

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(rad)),
    y: cy + (r * Math.sin(rad))
  };
}

// Cánh hoa uốn lượn có khía rãnh như cánh hoa hồng thật
function createScallopedPetalPath(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const span = endAngle - startAngle;
  const midAngle = startAngle + span / 2;
  
  const pBase1 = polarToCartesian(cx, cy, rInner, startAngle);
  const pBase2 = polarToCartesian(cx, cy, rInner, endAngle);
  
  const rShoulder = rOuter * 0.94;
  const pLeft = polarToCartesian(cx, cy, rShoulder, startAngle + span * 0.22);
  const pRight = polarToCartesian(cx, cy, rShoulder, endAngle - span * 0.22);
  
  const pTipL = polarToCartesian(cx, cy, rOuter, midAngle - span * 0.12);
  const pTipR = polarToCartesian(cx, cy, rOuter, midAngle + span * 0.12);
  const pIndent = polarToCartesian(cx, cy, rOuter * 0.95, midAngle);

  return `M ${pBase1.x.toFixed(1)} ${pBase1.y.toFixed(1)}
          C ${pLeft.x.toFixed(1)} ${pLeft.y.toFixed(1)}, ${pTipL.x.toFixed(1)} ${pTipL.y.toFixed(1)}, ${pTipL.x.toFixed(1)} ${pTipL.y.toFixed(1)}
          Q ${pIndent.x.toFixed(1)} ${pIndent.y.toFixed(1)} ${pTipR.x.toFixed(1)} ${pTipR.y.toFixed(1)}
          C ${pRight.x.toFixed(1)} ${pRight.y.toFixed(1)}, ${pRight.x.toFixed(1)} ${pRight.y.toFixed(1)}, ${pBase2.x.toFixed(1)} ${pBase2.y.toFixed(1)}
          Z`;
}

// Sinh mã SVG bông hoa: Full Rose, Half Rose hoặc Nụ hoa (Bud)
function createPaperRoseSVG(palette, uniqueId, variant = 'full') {
  const cx = 80, cy = 80;
  const filterId = `rose-filter-${uniqueId}`;
  const gradId = `core-grad-${uniqueId}`;

  // 1. Trường hợp: Nụ hoa nhỏ e ấp (Rosebud - như các nụ xanh lam/hồng trong ảnh 2)
  if (variant === 'bud') {
    return `
    <svg viewBox="0 0 100 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-color="rgba(40, 20, 25, 0.2)"/>
        </filter>
        <radialGradient id="${gradId}" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${palette.outer}"/>
          <stop offset="70%" stop-color="${palette.mid}"/>
          <stop offset="100%" stop-color="${palette.inner}"/>
        </radialGradient>
      </defs>
      <!-- Búp hoa hé nở -->
      <g filter="url(#${filterId})">
        <!-- Cánh trong nụ -->
        <ellipse cx="50" cy="55" rx="18" ry="26" fill="url(#${gradId})" stroke="${palette.stroke}" stroke-width="0.7"/>
        <path d="M 40 45 C 44 32, 56 32, 60 45 C 62 55, 52 65, 48 65" fill="${palette.inner}" opacity="0.6"/>
        <!-- Đài hoa xanh ôm lấy nụ -->
        <path d="M 50 85 C 40 85, 34 72, 36 50 C 38 68, 44 80, 50 85 Z" fill="#5c8f2b" stroke="#446e1c" stroke-width="0.8"/>
        <path d="M 50 85 C 60 85, 66 72, 64 50 C 62 68, 56 80, 50 85 Z" fill="#5c8f2b" stroke="#446e1c" stroke-width="0.8"/>
        <path d="M 50 88 C 47 78, 47 62, 50 52 C 53 62, 53 78, 50 88 Z" fill="#6ba336" stroke="#446e1c" stroke-width="0.8"/>
      </g>
    </svg>`;
  }

  // 2. Trường hợp: Bông hoa nở (Full hoặc Half)
  let svg = `
  <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${filterId}" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="1.6" stdDeviation="1.4" flood-color="rgba(70, 20, 30, 0.22)"/>
      </filter>
      <radialGradient id="${gradId}" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${palette.inner}"/>
        <stop offset="60%" stop-color="${palette.center}"/>
        <stop offset="100%" stop-color="${palette.centerDark}"/>
      </radialGradient>
    </defs>

    <!-- Đài hoa (Sepals) đằng sau -->
    <g filter="url(#${filterId})">
  `;

  for (let i = 0; i < 5; i++) {
    const ang = i * 72 + 18;
    const pTip = polarToCartesian(cx, cy, 64, ang);
    const pL = polarToCartesian(cx, cy, 28, ang - 24);
    const pR = polarToCartesian(cx, cy, 28, ang + 24);
    svg += `<path d="M ${cx} ${cy} L ${pL.x.toFixed(1)} ${pL.y.toFixed(1)} Q ${polarToCartesian(cx, cy, 45, ang - 6).x.toFixed(1)} ${polarToCartesian(cx, cy, 45, ang - 6).y.toFixed(1)} ${pTip.x.toFixed(1)} ${pTip.y.toFixed(1)} Q ${polarToCartesian(cx, cy, 45, ang + 6).x.toFixed(1)} ${polarToCartesian(cx, cy, 45, ang + 6).y.toFixed(1)} ${pR.x.toFixed(1)} ${pR.y.toFixed(1)} Z" fill="#5c8f2b" stroke="#446e1c" stroke-width="0.7"/>`;
  }
  svg += `</g>`;

  // Tầng ngoài cùng (chỉ vẽ khi full bloom)
  if (variant === 'full') {
    svg += `<g filter="url(#${filterId})">`;
    const countL4 = 7;
    const spanL4 = 66;
    for (let i = 0; i < countL4; i++) {
      const baseAng = i * (360 / countL4);
      const p = createScallopedPetalPath(cx, cy, 24, 58, baseAng - spanL4 / 2, baseAng + spanL4 / 2);
      svg += `<path d="${p}" fill="${palette.outer}" stroke="${palette.stroke}" stroke-width="0.6"/>`;
    }
    svg += `</g>`;
  }

  // Tầng 3: Lớp cánh giữa ngoài
  svg += `<g filter="url(#${filterId})">`;
  const countL3 = 6;
  const spanL3 = 70;
  for (let i = 0; i < countL3; i++) {
    const baseAng = i * (360 / countL3) + 25;
    const p = createScallopedPetalPath(cx, cy, 18, 48, baseAng - spanL3 / 2, baseAng + spanL3 / 2);
    svg += `<path d="${p}" fill="${palette.midOuter}" stroke="${palette.stroke}" stroke-width="0.6"/>`;
  }
  svg += `</g>`;

  // Tầng 2: Lớp cánh giữa trong
  svg += `<g filter="url(#${filterId})">`;
  const countL2 = 5;
  const spanL2 = 82;
  for (let i = 0; i < countL2; i++) {
    const baseAng = i * (360 / countL2) + 12;
    const p = createScallopedPetalPath(cx, cy, 14, 38, baseAng - spanL2 / 2, baseAng + spanL2 / 2);
    svg += `<path d="${p}" fill="${palette.mid}" stroke="${palette.stroke}" stroke-width="0.6"/>`;
  }
  svg += `</g>`;

  // Tầng 1: Lớp cánh bên trong
  svg += `<g filter="url(#${filterId})">`;
  const countL1 = 4;
  const spanL1 = 96;
  for (let i = 0; i < countL1; i++) {
    const baseAng = i * (360 / countL1) + 36;
    const p = createScallopedPetalPath(cx, cy, 10, 28, baseAng - spanL1 / 2, baseAng + spanL1 / 2);
    svg += `<path d="${p}" fill="${palette.inner}" stroke="${palette.stroke}" stroke-width="0.6"/>`;
  }
  svg += `</g>`;

  // Tâm nụ hoa cuộn xoắn (Rose spiral core)
  svg += `
    <g filter="url(#${filterId})">
      <circle cx="${cx}" cy="${cy}" r="15" fill="url(#${gradId})" stroke="${palette.stroke}" stroke-width="0.6"/>
      <path d="M ${cx - 7} ${cy + 4} C ${cx - 12} ${cy - 7}, ${cx + 2} ${cy - 12}, ${cx + 8} ${cy - 4} C ${cx + 10} ${cy + 4}, ${cx + 2} ${cy + 10}, ${cx - 4} ${cy + 6}" fill="${palette.inner}" stroke="${palette.stroke}" stroke-width="0.7"/>
      <path d="M ${cx + 3} ${cy - 6} C ${cx + 7} ${cy + 2}, ${cx - 1} ${cy + 7}, ${cx - 5} ${cy + 2} C ${cx - 6} ${cy - 3}, ${cx - 1} ${cy - 6}, ${cx + 3} ${cy - 4}" fill="${palette.center}" stroke="${palette.stroke}" stroke-width="0.7"/>
      <path d="M ${cx - 2} ${cy - 2} C ${cx + 2} ${cy - 2}, ${cx + 2} ${cy + 2}, ${cx} ${cy + 2} C ${cx - 2} ${cy + 1}, ${cx - 1} ${cy - 1}, ${cx + 1} ${cy - 1}" fill="none" stroke="${palette.stroke}" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`;

  return svg;
}

// Sinh mã SVG cành hoa và lá
function createStemSVG(heightPx, bendPx = 0, leaves = []) {
  const widthPx = 80;
  const cx = widthPx / 2;
  const topY = 15;
  const botY = heightPx;
  const midY = heightPx * 0.5;
  const ctrlX = cx + bendPx;

  let svg = `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <!-- Cành hoa -->
    <path d="M ${cx} ${topY} Q ${ctrlX} ${midY} ${cx} ${botY}" fill="none" stroke="#548a28" stroke-width="5" stroke-linecap="round"/>
  `;

  // Thêm các lá trên cành
  leaves.forEach(leaf => {
    const leafY = topY + (heightPx - topY) * leaf.pos;
    const isLeft = leaf.side === 'left';
    const angle = isLeft ? -leaf.angle : leaf.angle;
    const scale = leaf.scale || 1.0;
    
    // Tọa độ trên đường cong của cành tại vị trí leafY
    const t = leaf.pos;
    const stemX = (1 - t) * (1 - t) * cx + 2 * (1 - t) * t * ctrlX + t * t * cx;

    svg += `
      <g transform="translate(${stemX}, ${leafY}) rotate(${angle}) scale(${scale})">
        <!-- Cuống lá -->
        <path d="M 0 0 Q ${isLeft ? -8 : 8} -5 ${isLeft ? -16 : 16} -8" fill="none" stroke="#487820" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Phiến lá hoa hồng -->
        <path d="M ${isLeft ? -14 : 14} -7 
                 C ${isLeft ? -26 : 26} -20, ${isLeft ? -46 : 46} -16, ${isLeft ? -52 : 52} -5
                 C ${isLeft ? -44 : 44} 8, ${isLeft ? -24 : 24} 6, ${isLeft ? -14 : 14} -7 Z"
              fill="#629b2b" stroke="#487820" stroke-width="1.2"/>
        <!-- Gân lá -->
        <path d="M ${isLeft ? -14 : 14} -7 Q ${isLeft ? -34 : 34} -6 ${isLeft ? -50 : 50} -5" fill="none" stroke="#7ab83c" stroke-width="1.2"/>
      </g>
    `;
  });

  svg += `</svg>`;
  return svg;
}

// =============================================================================
// 3. KHỞI TẠO KHU VƯỜN (GARDEN POPULATOR - TẠO MẬT ĐỘ DÀY ĐẶC NHƯ ẢNH 2)
// =============================================================================
let gardenFlowersData = [];

function buildGarden() {
  const container = document.getElementById('garden-container');
  if (!container) return;
  container.innerHTML = '';
  gardenFlowersData = [];

  const isMobile = window.innerWidth <= 768;
  const flowerCount = isMobile ? 32 : 52;

  for (let i = 0; i < flowerCount; i++) {
    const pct = (i / (flowerCount - 1)); // 0.0 to 1.0
    const xPct = Math.max(1, Math.min(99, pct * 100 + (Math.random() * 4 - 2)));
    
    // Đường cong đồi hoa tự nhiên
    const distFromCenter = Math.abs(xPct - 50) / 50; 
    
    // Phân loại tầng lớp: 'back', 'mid', 'front'
    // Tầng trước thấp & hoa to xếp phủ phía dưới
    // Tầng sau cao & cành dài vươn lên bầu trời
    const rand = Math.random();
    let layer = 'mid';
    let variant = 'full';

    if (rand < 0.38) {
      layer = 'back';
      variant = Math.random() < 0.25 ? 'bud' : (Math.random() < 0.5 ? 'half' : 'full');
    } else if (rand < 0.72) {
      layer = 'mid';
      variant = Math.random() < 0.15 ? 'bud' : 'full';
    } else {
      layer = 'front';
      variant = 'full';
    }

    let sizePx, zIndex, flowerHeightVh;

    if (layer === 'back') {
      sizePx = variant === 'bud' ? 48 : Math.floor(62 + Math.random() * 18);
      zIndex = 11;
      flowerHeightVh = 46 + distFromCenter * 20 + (Math.random() * 14 - 7);
    } else if (layer === 'mid') {
      sizePx = variant === 'bud' ? 54 : Math.floor(82 + Math.random() * 20);
      zIndex = 15;
      flowerHeightVh = 32 + distFromCenter * 18 + (Math.random() * 12 - 6);
    } else {
      sizePx = Math.floor(98 + Math.random() * 26);
      zIndex = 19;
      flowerHeightVh = 18 + distFromCenter * 14 + (Math.random() * 10 - 5);
    }

    // Chọn bảng màu hoa
    const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    
    // Độ cong cành hoa
    const bend = (Math.random() - 0.5) * 36;
    
    // Cấu hình lá trên cành
    const leaves = [];
    if (Math.random() > 0.25) {
      leaves.push({ side: 'left', pos: 0.35 + Math.random() * 0.15, angle: 32 + Math.random() * 22, scale: 0.75 + Math.random() * 0.3 });
    }
    if (Math.random() > 0.3) {
      leaves.push({ side: 'right', pos: 0.6 + Math.random() * 0.15, angle: 32 + Math.random() * 22, scale: 0.75 + Math.random() * 0.3 });
    }

    // Thời gian nở hoa xếp tầng (cascade delay)
    const delay = (0.2 + distFromCenter * 1.4 + Math.random() * 0.8).toFixed(2);
    const swayDuration = (3.8 + Math.random() * 2.2).toFixed(1) + 's';
    const swayDelay = (-Math.random() * 4).toFixed(1) + 's';
    const baseRot = ((Math.random() - 0.5) * 6).toFixed(1) + 'deg';

    // Tạo phần tử hoa trong DOM
    const flowerEl = document.createElement('div');
    flowerEl.className = 'garden-flower';
    flowerEl.style.left = `${xPct}%`;
    flowerEl.style.zIndex = zIndex;
    flowerEl.style.setProperty('--sway-duration', swayDuration);
    flowerEl.style.setProperty('--sway-delay', swayDelay);
    flowerEl.style.setProperty('--base-rot', baseRot);

    // Tính pixel chiều cao thực tế theo viewport
    const containerHeight = container.clientHeight || (window.innerHeight * 0.72);
    const heightPx = Math.floor((flowerHeightVh / 100) * containerHeight);

    // Bông hoa và cành
    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';
    headWrap.style.width = `${sizePx}px`;
    headWrap.style.height = `${sizePx}px`;
    headWrap.style.bottom = `${heightPx - sizePx / 2}px`;
    headWrap.innerHTML = createPaperRoseSVG(palette, `g-${i}`, variant);

    const stemWrap = document.createElement('div');
    stemWrap.className = 'flower-stem-wrap';
    stemWrap.innerHTML = createStemSVG(heightPx, bend, leaves);

    flowerEl.appendChild(stemWrap);
    flowerEl.appendChild(headWrap);

    // Sự kiện tương tác: Chạm vào bông hoa sẽ rung rinh
    flowerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      playChimeNote(440 + Math.random() * 400);
      flowerEl.style.transform = 'scale(1.15) translateY(-10px)';
      setTimeout(() => {
        flowerEl.style.transform = '';
      }, 400);
    });

    container.appendChild(flowerEl);
    gardenFlowersData.push({ element: flowerEl, delay: parseFloat(delay) });
  }
}

// =============================================================================
// 4. KỊCH BẢN HOA NỞ & TRẠNG THÁI (BLOOM SCENARIO)
// =============================================================================
let hasBloomed = false;
let isBlooming = false;

function triggerGardenBloom() {
  if (isBlooming || hasBloomed) return;
  isBlooming = true;

  // Bắt đầu phát nhạc
  startAudioEngine();

  // Hiệu ứng âm thanh cánh hoa bung nở
  playBloomArpeggio();

  // Bắt đầu hạt hoa bay
  startPetalRain();

  // Bông hoa chính rung rinh tỏa sáng
  const heroWrapper = document.getElementById('hero-flower');
  const heroIndicator = document.getElementById('hero-click-indicator');
  if (heroIndicator) heroIndicator.style.display = 'none';

  if (heroWrapper) {
    heroWrapper.style.transform = 'translateX(-50%) scale(1.12)';
    setTimeout(() => {
      heroWrapper.style.transform = 'translateX(-50%) scale(1.0)';
    }, 600);
  }

  // Chuyển sang trạng thái "Từ một bông hoa, cả khu vườn đang thức giấc..." (Ảnh 2)
  const introContainer = document.getElementById('intro-text-box');
  const introSubtitle = document.getElementById('intro-subtitle');
  if (introContainer && introSubtitle) {
    introContainer.classList.add('blooming-state');
    introSubtitle.textContent = 'Từ một bông hoa, cả khu vườn đang thức giấc...';
  }

  // Từng bông hoa trong vườn lần lượt nở rộ (staggered cascade)
  gardenFlowersData.forEach(item => {
    setTimeout(() => {
      item.element.classList.add('bloomed');
    }, item.delay * 1000);
  });

  // Sau khi vườn hoa nở xong (khoảng 3.2s)
  setTimeout(() => {
    hasBloomed = true;
    isBlooming = false;

    // Ẩn dòng chữ thức giấc để hiển thị 2 nút bấm trang trọng (Ảnh 3)
    if (introContainer) {
      introContainer.classList.add('bloomed-done');
    }

    // Hiển thị 2 nút điều khiển dưới đáy
    const bottomActions = document.getElementById('bottom-actions');
    if (bottomActions) {
      bottomActions.classList.add('visible');
    }

    // Tự động mở thiệp sau 1.4 giây để người nhận đọc trọn vẹn lời chúc (Ảnh 4)
    setTimeout(() => {
      openCardModal();
    }, 1400);

  }, 3200);
}

// Reset vườn hoa để nở lại từ đầu (Khớp nút "Cho hoa nở lại")
function resetGardenBloom() {
  hasBloomed = false;
  isBlooming = false;

  // Đóng thiệp nếu đang mở
  closeCardModal();

  // Ẩn 2 nút dưới đáy
  const bottomActions = document.getElementById('bottom-actions');
  if (bottomActions) {
    bottomActions.classList.remove('visible');
  }

  // Trả tiêu đề về ban đầu (Ảnh 1)
  const introContainer = document.getElementById('intro-text-box');
  const introSubtitle = document.getElementById('intro-subtitle');
  const heroIndicator = document.getElementById('hero-click-indicator');
  if (introContainer && introSubtitle) {
    introContainer.classList.remove('blooming-state');
    introContainer.classList.remove('bloomed-done');
    introSubtitle.textContent = 'Chạm vào hoa, một điều dịu dàng đang chờ bạn';
  }
  if (heroIndicator) heroIndicator.style.display = '';

  // Xóa class bloomed khỏi từng hoa
  gardenFlowersData.forEach(item => {
    item.element.classList.remove('bloomed');
  });

  // Dựng lại ngẫu nhiên vị trí các bông hoa mới để mỗi lần nở là một trải nghiệm mới
  setTimeout(() => {
    buildGarden();
  }, 400);
}

// =============================================================================
// 5. THIỆP CHÚC MỪNG (CARD MODAL LOGIC - Khớp ảnh 4)
// =============================================================================
function openCardModal() {
  const modal = document.getElementById('card-modal');
  if (modal) {
    playChimeNote(587.33); // D5
    modal.classList.add('open');
  }
}

function closeCardModal() {
  const modal = document.getElementById('card-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// Cập nhật tên người nhận tùy chỉnh từ tham số URL (?name=... hoặc ?to=...)
function setupPersonalizedGreeting() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('name') || urlParams.get('to');
  
  if (recipientName && recipientName.trim() !== '') {
    const cleanName = recipientName.trim();
    // Cập nhật góc trên bên trái
    const topBrand = document.getElementById('top-brand');
    if (topBrand) {
      topBrand.textContent = `Dành ${cleanName}, cả một vườn thương.`;
    }
    // Cập nhật lời chào đầu thiệp
    const cardRecipient = document.getElementById('card-recipient');
    if (cardRecipient) {
      cardRecipient.textContent = `Gửi ${cleanName} thương mến,`;
    }
  }
}

// Sao chép toàn bộ lời chúc
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

// Tạo link theo tên người nhận
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

// Toast thông báo ngắn
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
// 6. ÂM THANH & NHẠC NỀN DU DƯƠNG (WEB AUDIO ENGINE)
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

// Chuông thanh khiết (Crystal chime)
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
  } catch (err) {
    // Trình duyệt có thể chặn âm thanh trước khi tương tác
  }
}

// Hợp âm bung nở kì diệu (Arpeggio)
function playBloomArpeggio() {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    playChimeNote(freq, idx * 0.12, 1.8);
  });
}

// Nhạc nền piano/chuông tự tạo nhẹ nhàng (Generative soothing melody)
function startGenerativeMusic() {
  if (audioMelodyTimer) clearInterval(audioMelodyTimer);

  // Tiến trình hợp âm ngọt ngào: C - Am - F - G
  const chordProgressions = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // G7
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

// =============================================================================
// 7. CÁNH HOA & BỤI PHẤN BAY (CANVAS FX)
// =============================================================================
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
        // Cánh hoa rơi
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
// 8. KHỞI TẠO TOÀN DIỆN TRANG WEB KHI TẢI XONG
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // 1. Dựng bông hoa chính (Hero Rose)
  const heroHead = document.getElementById('hero-rose-head');
  if (heroHead) {
    const heroPalette = COLOR_PALETTES[0]; // Hồng phấn
    heroHead.innerHTML = createPaperRoseSVG(heroPalette, 'hero', 'full');
  }

  const heroStem = document.getElementById('hero-stem-svg');
  if (heroStem) {
    const stemLeaves = [
      { side: 'left', pos: 0.38, angle: 36, scale: 1.1 },
      { side: 'right', pos: 0.62, angle: 34, scale: 1.15 }
    ];
    heroStem.innerHTML = createStemSVG(heroStem.clientHeight || 280, 0, stemLeaves);
  }

  // 2. Dựng icon hoa trên thiệp
  const cardIcon = document.getElementById('card-rose-icon');
  if (cardIcon) {
    cardIcon.innerHTML = createPaperRoseSVG(COLOR_PALETTES[0], 'card-icon', 'half');
  }

  // 3. Chuẩn bị vườn hoa
  buildGarden();

  // 4. Khởi tạo canvas hiệu ứng
  initCanvasFX();

  // 5. Kiểm tra thông tin tùy chỉnh URL
  setupPersonalizedGreeting();

  // 6. Gán các sự kiện
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

  // Tự động điều chỉnh kích thước khi xoay màn hình điện thoại
  window.addEventListener('resize', () => {
    if (!hasBloomed && !isBlooming) {
      buildGarden();
    }
  });
});
