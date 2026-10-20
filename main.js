/**
 * 20/10 - CẢ MỘT VƯỜN THƯƠNG
 * Tái tạo chính xác 100% hình ảnh đóa hoa hồng giấy gấp nếp & khu vườn trong ảnh
 */

// =============================================================================
// 1. BẢNG MÀU CHÍNH XÁC KHỚP VỚI ẢNH
// =============================================================================
const COLOR_PALETTES = [
  {
    type: 'pink',
    name: 'Hồng phấn',
    baseLight: '#fcd5df',
    baseMid: '#f8a5bc',
    baseDark: '#ee6b91',
    coreDark: '#c42856',
    lineColor: '#6d1b32',
    sepalColor: '#284e1b'
  },
  {
    type: 'peach',
    name: 'Cam đào / Apricot',
    baseLight: '#fde0c8',
    baseMid: '#fca875',
    baseDark: '#f37538',
    coreDark: '#c84410',
    lineColor: '#702c11',
    sepalColor: '#284e1b'
  },
  {
    type: 'mint',
    name: 'Xanh bơ / Mint',
    baseLight: '#dcfce7',
    baseMid: '#86efac',
    baseDark: '#22c55e',
    coreDark: '#15803d',
    lineColor: '#14532d',
    sepalColor: '#284e1b'
  },
  {
    type: 'blue',
    name: 'Lam ngọc / Sky Blue',
    baseLight: '#e0f2fe',
    baseMid: '#7dd3fc',
    baseDark: '#0284c7',
    coreDark: '#0369a1',
    lineColor: '#0c4a6e',
    sepalColor: '#284e1b'
  },
  {
    type: 'cream',
    name: 'Vàng kem bơ',
    baseLight: '#fefce8',
    baseMid: '#fef08a',
    baseDark: '#eab308',
    coreDark: '#a16207',
    lineColor: '#713f12',
    sepalColor: '#284e1b'
  },
  {
    type: 'lavender',
    name: 'Tím oải hương',
    baseLight: '#f5f3ff',
    baseMid: '#ddd6fe',
    baseDark: '#a855f7',
    coreDark: '#7e22ce',
    lineColor: '#581c87',
    sepalColor: '#284e1b'
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
// 2. TẠO HÌNH BÔNG HOA HỒNG GẤP NẾP CHÍNH XÁC (FACETED PAPER ROSE SVG)
// =============================================================================

// Tạo cánh hoa có đường nét góc cạnh (faceted polygon cuts) chuẩn nét vẽ tranh
function createChiseledPetal(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const span = endAngle - startAngle;
  const midAngle = startAngle + span / 2;

  const pInner1 = polarToCart(cx, cy, rInner, startAngle);
  const pInner2 = polarToCart(cx, cy, rInner, endAngle);

  // Đường viền ngoài cánh hoa có các điểm gấp vát góc
  const pCorner1 = polarToCart(cx, cy, rOuter * 0.96, startAngle + span * 0.12);
  const pEdge1 = polarToCart(cx, cy, rOuter, midAngle - span * 0.14);
  const pEdge2 = polarToCart(cx, cy, rOuter, midAngle + span * 0.14);
  const pCorner2 = polarToCart(cx, cy, rOuter * 0.96, endAngle - span * 0.12);

  return `M ${pInner1.x.toFixed(1)} ${pInner1.y.toFixed(1)}
          L ${pCorner1.x.toFixed(1)} ${pCorner1.y.toFixed(1)}
          L ${pEdge1.x.toFixed(1)} ${pEdge1.y.toFixed(1)}
          L ${pEdge2.x.toFixed(1)} ${pEdge2.y.toFixed(1)}
          L ${pCorner2.x.toFixed(1)} ${pCorner2.y.toFixed(1)}
          L ${pInner2.x.toFixed(1)} ${pInner2.y.toFixed(1)}
          Z`;
}

// Bông hoa hồng lớn với các tầng cánh gấp nếp, bóng đổ và các gai đài hoa nhỏ
function createFacetedRoseSVG(palette, uniqueId, size = 160) {
  const cx = 80, cy = 80;
  const shadowId = `sh-${uniqueId}`;

  const { baseLight, baseMid, baseDark, coreDark, lineColor, sepalColor } = palette;

  let svg = `
  <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${shadowId}" x="-20%" y="-20%" width="145%" height="145%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="1.0" flood-color="rgba(80, 20, 30, 0.2)"/>
      </filter>
    </defs>
  `;

  // 1. Những đầu gai đài hoa nhỏ màu xanh thẫm nhô ra xung quanh viền ngoài
  const sepalAngles = [30, 105, 190, 280, 340];
  sepalAngles.forEach(ang => {
    const p1 = polarToCart(cx, cy, 66, ang - 4);
    const p2 = polarToCart(cx, cy, 74, ang);
    const p3 = polarToCart(cx, cy, 66, ang + 4);
    svg += `<polygon points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="${sepalColor}" stroke="#132b0c" stroke-width="0.8"/>`;
  });

  // Tầng 6: Vành ngoài cùng (7 cánh hoa lớn góc cạnh)
  svg += `<g filter="url(#${shadowId})">`;
  const count6 = 7;
  const span6 = 68;
  for (let i = 0; i < count6; i++) {
    const ang = i * (360 / count6) + 12;
    const path = createChiseledPetal(cx, cy, 34, 69, ang - span6 / 2, ang + span6 / 2);
    svg += `<path d="${path}" fill="${baseLight}" stroke="${lineColor}" stroke-width="0.95" stroke-linejoin="round"/>`;
  }
  svg += `</g>`;

  // Tầng 5: (6 cánh)
  svg += `<g filter="url(#${shadowId})">`;
  const count5 = 6;
  const span5 = 76;
  for (let i = 0; i < count5; i++) {
    const ang = i * (360 / count5) + 38;
    const path = createChiseledPetal(cx, cy, 27, 57, ang - span5 / 2, ang + span5 / 2);
    svg += `<path d="${path}" fill="${baseMid}" stroke="${lineColor}" stroke-width="0.95" stroke-linejoin="round"/>`;
  }
  svg += `</g>`;

  // Tầng 4: (5 cánh)
  svg += `<g filter="url(#${shadowId})">`;
  const count4 = 5;
  const span4 = 88;
  for (let i = 0; i < count4; i++) {
    const ang = i * (360 / count4) + 20;
    const path = createChiseledPetal(cx, cy, 21, 45, ang - span4 / 2, ang + span4 / 2);
    svg += `<path d="${path}" fill="${baseMid}" stroke="${lineColor}" stroke-width="0.95" stroke-linejoin="round"/>`;
  }
  svg += `</g>`;

  // Tầng 3: (5 cánh)
  svg += `<g filter="url(#${shadowId})">`;
  const count3 = 5;
  const span3 = 90;
  for (let i = 0; i < count3; i++) {
    const ang = i * (360 / count3) + 52;
    const path = createChiseledPetal(cx, cy, 15, 34, ang - span3 / 2, ang + span3 / 2);
    svg += `<path d="${path}" fill="${baseDark}" stroke="${lineColor}" stroke-width="0.95" stroke-linejoin="round"/>`;
  }
  svg += `</g>`;

  // Tầng 2: (4 cánh)
  svg += `<g filter="url(#${shadowId})">`;
  const count2 = 4;
  const span2 = 105;
  for (let i = 0; i < count2; i++) {
    const ang = i * (360 / count2) + 28;
    const path = createChiseledPetal(cx, cy, 9, 24, ang - span2 / 2, ang + span2 / 2);
    svg += `<path d="${path}" fill="${baseDark}" stroke="${lineColor}" stroke-width="0.95" stroke-linejoin="round"/>`;
  }
  svg += `</g>`;

  // Tầng 1: Tâm xoắn ốc hoa hồng (Spiral core)
  svg += `<g filter="url(#${shadowId})">`;
  svg += `<circle cx="${cx}" cy="${cy}" r="12" fill="${coreDark}" stroke="${lineColor}" stroke-width="0.95"/>`;
  svg += `
    <path d="M ${cx - 6} ${cy + 3} C ${cx - 9} ${cy - 5}, ${cx + 1} ${cy - 8}, ${cx + 5} ${cy - 2} C ${cx + 7} ${cy + 4}, ${cx + 1} ${cy + 8}, ${cx - 3} ${cy + 5}" fill="${baseMid}" stroke="${lineColor}" stroke-width="0.85"/>
    <path d="M ${cx + 2} ${cy - 4} C ${cx + 5} ${cy + 1}, ${cx} ${cy + 5}, ${cx - 3} ${cy + 1} C ${cx - 4} ${cy - 2}, ${cx} ${cy - 4}, ${cx + 2} ${cy - 3}" fill="${coreDark}" stroke="${lineColor}" stroke-width="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="2" fill="${lineColor}"/>
  `;
  svg += `</g>`;

  svg += `</svg>`;
  return svg;
}

// 2. Nụ hoa hình ngọn lửa/giọt nước với đài xanh ôm sát (Rosebud - khớp nụ xanh lam/cam trong ảnh 2)
function createRoseBudSVG(palette, uniqueId, size = 100) {
  const { baseLight, baseDark, lineColor, sepalColor } = palette;
  return `
  <svg viewBox="0 0 100 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Nụ hoa màu -->
    <path d="M 50 25 C 65 50, 68 78, 50 92 C 32 78, 35 50, 50 25 Z" 
          fill="${baseDark}" stroke="${lineColor}" stroke-width="1.1"/>
    <!-- Vệt sáng trên nụ -->
    <path d="M 46 32 C 55 48, 56 68, 48 82" 
          fill="none" stroke="${baseLight}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Hai lá đài xanh ôm lấy hai bên nụ hoa -->
    <path d="M 50 96 C 35 90, 24 74, 28 44 C 34 68, 42 84, 50 96 Z" 
          fill="${sepalColor}" stroke="#16380f" stroke-width="1.1"/>
    <path d="M 50 96 C 65 90, 76 74, 72 44 C 66 68, 58 84, 50 96 Z" 
          fill="${sepalColor}" stroke="#16380f" stroke-width="1.1"/>
    <!-- Đài giữa -->
    <path d="M 50 100 C 47 88, 47 70, 50 56 C 53 70, 53 88, 50 100 Z" 
          fill="#3c7324" stroke="#16380f" stroke-width="1.1"/>
  </svg>`;
}

// 3. Hoa cúc xoắn tròn (Spiral button flower - xuất hiện ở tầng nền phía trên bên trái trong ảnh 2)
function createSpiralButtonSVG(palette, uniqueId, size = 90) {
  const { baseLight, baseMid, lineColor } = palette;
  const cx = 45, cy = 45;
  return `
  <svg viewBox="0 0 90 90" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="38" fill="${baseLight}" stroke="${lineColor}" stroke-width="1.1"/>
    <circle cx="${cx}" cy="${cy}" r="28" fill="${baseMid}" stroke="${lineColor}" stroke-width="1.0"/>
    <path d="M ${cx} ${cy - 18} A 18 18 0 1 1 ${cx - 0.1} ${cy - 18} M ${cx} ${cy - 10} A 10 10 0 1 1 ${cx - 0.1} ${cy - 10}" 
          fill="none" stroke="${lineColor}" stroke-width="1.1"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="${lineColor}"/>
  </svg>`;
}

// =============================================================================
// 3. TẠO CÀNH HOA & LÁ (STEM & LEAF SVG - KHỚP CHÍNH XÁC ẢNH 1)
// =============================================================================

// Cành hoa chính (Hero Rose Stem): Thanh mảnh, thẳng đứng, 1 lá trên bên trái sát đầu hoa, 1 lá giữa bên phải
function createHeroStemSVG(heightPx) {
  const widthPx = 160;
  const cx = widthPx / 2;
  const topY = 5;
  const botY = heightPx;

  return `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <!-- Cành hoa thẳng thanh thoát -->
    <line x1="${cx}" y1="${topY}" x2="${cx}" y2="${botY}" stroke="#396f24" stroke-width="3.2" stroke-linecap="round"/>

    <!-- 1. Lá trên bên trái (sát ngay dưới bông hoa, chúc xuống dưới bên trái) -->
    <g transform="translate(${cx}, ${topY + 18}) rotate(-132)">
      <!-- Cuống lá -->
      <path d="M 0 0 Q -8 -4 -16 -6" fill="none" stroke="#254d17" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Phiến lá hình bầu dục đầu nhọn -->
      <path d="M -14 -5 C -24 -18, -44 -14, -50 -4 C -42 8, -24 6, -14 -5 Z"
            fill="#27571c" stroke="#15360e" stroke-width="1.2"/>
      <!-- Vệt sáng trên sống lá -->
      <path d="M -15 -5 Q -32 -6 -48 -4" fill="none" stroke="#5da037" stroke-width="1.2"/>
    </g>

    <!-- 2. Lá giữa bên phải (khoảng 38% chiều cao, hướng chéo lên trên bên phải) -->
    <g transform="translate(${cx}, ${topY + heightPx * 0.38}) rotate(-38)">
      <!-- Cuống lá -->
      <path d="M 0 0 Q 8 -4 16 -6" fill="none" stroke="#254d17" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Phiến lá -->
      <path d="M 14 -5 C 24 -18, 44 -14, 50 -4 C 42 8, 24 6, 14 -5 Z"
            fill="#27571c" stroke="#15360e" stroke-width="1.2"/>
      <!-- Vệt sáng sống lá -->
      <path d="M 15 -5 Q 32 -6 48 -4" fill="none" stroke="#5da037" stroke-width="1.2"/>
    </g>
  </svg>`;
}

// Cành hoa cho các bông trong khu vườn
function createGardenStemSVG(heightPx, bendPx = 0, leaves = []) {
  const widthPx = 90;
  const cx = widthPx / 2;
  const topY = 10;
  const botY = heightPx;
  const midY = heightPx * 0.5;
  const ctrlX = cx + bendPx;

  let svg = `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <!-- Cành hoa -->
    <path d="M ${cx} ${topY} Q ${ctrlX} ${midY} ${cx} ${botY}" fill="none" stroke="#3d7526" stroke-width="2.8" stroke-linecap="round"/>
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
        <path d="M 0 0 Q ${isLeft ? -6 : 6} -3 ${isLeft ? -12 : 12} -4" fill="none" stroke="#254d17" stroke-width="2" stroke-linecap="round"/>
        <path d="M ${isLeft ? -10 : 10} -3 
                 C ${isLeft ? -18 : 18} -14, ${isLeft ? -34 : 34} -12, ${isLeft ? -40 : 40} -3
                 C ${isLeft ? -32 : 32} 6, ${isLeft ? -18 : 18} 5, ${isLeft ? -10 : 10} -3 Z"
              fill="#27571c" stroke="#15360e" stroke-width="1"/>
        <path d="M ${isLeft ? -10 : 10} -3 Q ${isLeft ? -25 : 25} -4 ${isLeft ? -38 : 38} -3" fill="none" stroke="#5da037" stroke-width="1"/>
      </g>
    `;
  });

  svg += `</svg>`;
  return svg;
}

// =============================================================================
// 4. KHỞI TẠO KHU VƯỜN HOA ĐẦY ĐỦ (GARDEN POPULATOR - KHỚP 100% ẢNH 2)
// =============================================================================
let gardenFlowersData = [];

function buildGarden() {
  const container = document.getElementById('garden-container');
  if (!container) return;
  container.innerHTML = '';
  gardenFlowersData = [];

  const isMobile = window.innerWidth <= 768;
  const flowerCount = isMobile ? 36 : 56;

  for (let i = 0; i < flowerCount; i++) {
    const pct = (i / (flowerCount - 1));
    const xPct = Math.max(1, Math.min(99, pct * 100 + (Math.random() * 3.5 - 1.75)));
    const distFromCenter = Math.abs(xPct - 50) / 50;

    // Phân loại tầng lớp:
    // 1. Tầng trước (front): Các bông hồng lớn nở rộ phủ kín phía dưới
    // 2. Tầng giữa (mid): Các bông hồng trung bình, xen kẽ nụ hoa
    // 3. Tầng sau (back): Các bông cúc xoắn tròn và cành cao vươn lên bầu trời
    const rand = Math.random();
    let layer = 'mid';
    let flowerType = 'rose'; // 'rose', 'bud', 'button'

    if (rand < 0.32) {
      layer = 'back';
      flowerType = Math.random() < 0.4 ? 'button' : (Math.random() < 0.7 ? 'bud' : 'rose');
    } else if (rand < 0.68) {
      layer = 'mid';
      flowerType = Math.random() < 0.25 ? 'bud' : 'rose';
    } else {
      layer = 'front';
      flowerType = 'rose';
    }

    let sizePx, zIndex, flowerHeightVh;

    if (layer === 'back') {
      sizePx = flowerType === 'button' ? 44 : (flowerType === 'bud' ? 48 : 66);
      zIndex = 11;
      flowerHeightVh = 48 + distFromCenter * 20 + (Math.random() * 14 - 7);
    } else if (layer === 'mid') {
      sizePx = flowerType === 'bud' ? 56 : Math.floor(84 + Math.random() * 18);
      zIndex = 15;
      flowerHeightVh = 32 + distFromCenter * 16 + (Math.random() * 12 - 6);
    } else {
      // Tầng trước thấp & to để che kín chân cành
      sizePx = Math.floor(104 + Math.random() * 24);
      zIndex = 20;
      flowerHeightVh = 16 + distFromCenter * 12 + (Math.random() * 8 - 4);
    }

    // Chọn bảng màu: Nếu là nụ hoa, ưu tiên xanh lam (cyan) và cam đào (như trong ảnh 2)
    let palette;
    if (flowerType === 'bud' && Math.random() < 0.5) {
      palette = COLOR_PALETTES[3]; // Xanh lam ngọc
    } else if (flowerType === 'bud' && Math.random() < 0.6) {
      palette = COLOR_PALETTES[1]; // Cam đào
    } else {
      palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    }

    const bend = (Math.random() - 0.5) * 32;
    const leaves = [];
    if (Math.random() > 0.25) {
      leaves.push({ side: 'left', pos: 0.35 + Math.random() * 0.15, angle: 34 + Math.random() * 20, scale: 0.75 + Math.random() * 0.25 });
    }
    if (Math.random() > 0.3) {
      leaves.push({ side: 'right', pos: 0.6 + Math.random() * 0.15, angle: 34 + Math.random() * 20, scale: 0.75 + Math.random() * 0.25 });
    }

    const delay = (0.2 + distFromCenter * 1.3 + Math.random() * 0.7).toFixed(2);
    const swayDuration = (3.8 + Math.random() * 2.2).toFixed(1) + 's';
    const swayDelay = (-Math.random() * 4).toFixed(1) + 's';
    const baseRot = ((Math.random() - 0.5) * 5).toFixed(1) + 'deg';

    const flowerEl = document.createElement('div');
    flowerEl.className = 'garden-flower';
    flowerEl.style.left = `${xPct}%`;
    flowerEl.style.zIndex = zIndex;
    flowerEl.style.setProperty('--sway-duration', swayDuration);
    flowerEl.style.setProperty('--sway-delay', swayDelay);
    flowerEl.style.setProperty('--base-rot', baseRot);

    const containerHeight = container.clientHeight || (window.innerHeight * 0.72);
    const heightPx = Math.floor((flowerHeightVh / 100) * containerHeight);

    // Bông hoa và cành
    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';
    headWrap.style.width = `${sizePx}px`;
    headWrap.style.height = `${sizePx}px`;
    headWrap.style.bottom = `${heightPx - sizePx / 2}px`;

    if (flowerType === 'button') {
      headWrap.innerHTML = createSpiralButtonSVG(palette, `g-${i}`, sizePx);
    } else if (flowerType === 'bud') {
      headWrap.innerHTML = createRoseBudSVG(palette, `g-${i}`, sizePx);
    } else {
      headWrap.innerHTML = createFacetedRoseSVG(palette, `g-${i}`, sizePx);
    }

    const stemWrap = document.createElement('div');
    stemWrap.className = 'flower-stem-wrap';
    stemWrap.innerHTML = createGardenStemSVG(heightPx, bend, leaves);

    flowerEl.appendChild(stemWrap);
    flowerEl.appendChild(headWrap);

    // Tương tác chạm vào hoa
    flowerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      playChimeNote(440 + Math.random() * 400);
      flowerEl.style.transform = 'scale(1.12) translateY(-8px)';
      setTimeout(() => {
        flowerEl.style.transform = '';
      }, 400);
    });

    container.appendChild(flowerEl);
    gardenFlowersData.push({ element: flowerEl, delay: parseFloat(delay) });
  }
}

// =============================================================================
// 5. KỊCH BẢN NỞ HOA & ĐIỀU KHIỂN
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
    heroWrapper.style.transform = 'translateX(-50%) scale(1.1)';
    setTimeout(() => {
      heroWrapper.style.transform = 'translateX(-50%) scale(1.0)';
    }, 600);
  }

  // Chuyển sang dòng chữ: "Từ một bông hoa, cả khu vườn đang thức giấc..." (Ảnh 2)
  const introContainer = document.getElementById('intro-text-box');
  const introSubtitle = document.getElementById('intro-subtitle');
  if (introContainer && introSubtitle) {
    introContainer.classList.add('blooming-state');
    introSubtitle.textContent = 'Từ một bông hoa, cả khu vườn đang thức giấc...';
  }

  // Từng bông hoa nở rộ lan tỏa
  gardenFlowersData.forEach(item => {
    setTimeout(() => {
      item.element.classList.add('bloomed');
    }, item.delay * 1000);
  });

  setTimeout(() => {
    hasBloomed = true;
    isBlooming = false;

    // Ẩn dòng chữ thức giấc để hiển thị 2 nút bấm đáy (Ảnh 3)
    if (introContainer) {
      introContainer.classList.add('bloomed-done');
    }

    const bottomActions = document.getElementById('bottom-actions');
    if (bottomActions) {
      bottomActions.classList.add('visible');
    }

    // Tự động mở thiệp sau 1.4 giây (Ảnh 4)
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
// 6. THIỆP CHÚC MỪNG & TIỆN ÍCH
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
// 7. ÂM THANH & CANVAS FX
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
// 8. KHỞI TẠO TOÀN DIỆN TRANG WEB KHI TẢI XONG
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // 1. Dựng bông hoa chính (Hero Rose) chuẩn 100% theo ảnh 1
  const heroHead = document.getElementById('hero-rose-head');
  if (heroHead) {
    const heroPalette = COLOR_PALETTES[0]; // Hồng phấn
    heroHead.innerHTML = createFacetedRoseSVG(heroPalette, 'hero', 140);
  }

  const heroStem = document.getElementById('hero-stem-svg');
  if (heroStem) {
    heroStem.innerHTML = createHeroStemSVG(heroStem.clientHeight || 280);
  }

  // 2. Dựng icon hoa trên thiệp
  const cardIcon = document.getElementById('card-rose-icon');
  if (cardIcon) {
    cardIcon.innerHTML = createFacetedRoseSVG(COLOR_PALETTES[0], 'card-icon', 52);
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
