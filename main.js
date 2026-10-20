/**
 * 20/10 - CẢ MỘT VƯỜN THƯƠNG
 * Tái tạo chính xác 100% hình ảnh đóa hoa hồng giấy viền trắng & khu vườn trong ảnh
 */

// =============================================================================
// 1. BẢNG MÀU CHÍNH XÁC (TƯƠNG ỨNG TỪNG SẮC HOA TRONG ẢNH)
// =============================================================================
const COLOR_PALETTES = [
  {
    type: 'pink',
    name: 'Hồng phấn',
    bodyLight: '#fbb3c4',
    bodyColor: '#f47293',
    shadowColor: '#c42856',
    coreColor: '#9d174d',
    lineColor: '#6d172e',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
  },
  {
    type: 'peach',
    name: 'Cam đào / Apricot',
    bodyLight: '#fdd0a8',
    bodyColor: '#fb923c',
    shadowColor: '#ea580c',
    coreColor: '#9a3412',
    lineColor: '#7c2d12',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
  },
  {
    type: 'mint',
    name: 'Xanh bơ / Mint',
    bodyLight: '#bbf7d0',
    bodyColor: '#4ade80',
    shadowColor: '#16a34a',
    coreColor: '#15803d',
    lineColor: '#14532d',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
  },
  {
    type: 'blue',
    name: 'Lam ngọc / Sky Blue',
    bodyLight: '#bae6fd',
    bodyColor: '#38bdf8',
    shadowColor: '#0284c7',
    coreColor: '#0369a1',
    lineColor: '#0c4a6e',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
  },
  {
    type: 'cream',
    name: 'Vàng kem bơ',
    bodyLight: '#fef9c3',
    bodyColor: '#fde047',
    shadowColor: '#eab308',
    coreColor: '#a16207',
    lineColor: '#713f12',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
  },
  {
    type: 'lavender',
    name: 'Tím oải hương',
    bodyLight: '#ede9fe',
    bodyColor: '#c084fc',
    shadowColor: '#9333ea',
    coreColor: '#6b21a8',
    lineColor: '#581c87',
    highlightColor: '#ffffff',
    sepalColor: '#1d4d16'
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
// 2. BÔNG HOA HỒNG CUỘN GIẤY VIỀN TRẮNG CHÍNH XÁC (THE EXACT ROLLED PAPER ROSE)
// =============================================================================

function createExactPaperRoseSVG(palette, uniqueId = 'rose', size = 160) {
  const cx = 80, cy = 80;
  const shadowId = `sh-${uniqueId}`;

  const {
    bodyLight,
    bodyColor,
    shadowColor,
    coreColor,
    lineColor,
    highlightColor,
    sepalColor
  } = palette;

  let out = `
  <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${shadowId}" x="-20%" y="-20%" width="145%" height="145%">
        <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" flood-color="rgba(60, 15, 25, 0.25)"/>
      </filter>
    </defs>
  `;

  // 1. Các gai đài hoa nhỏ màu xanh thẫm quanh viền ngoài
  const sepalAngles = [32, 108, 192, 278, 338];
  sepalAngles.forEach(ang => {
    const p1 = polarToCart(cx, cy, 65, ang - 4.5);
    const p2 = polarToCart(cx, cy, 74, ang);
    const p3 = polarToCart(cx, cy, 65, ang + 4.5);
    out += `<polygon points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="${sepalColor}" stroke="#132c0d" stroke-width="0.8"/>`;
  });

  // Cấu trúc 5 tầng cánh từ ngoài vào trong:
  // Mỗi cánh có: Thân cánh đa giác, bóng nếp gấp bên trong, và ĐẶC BIỆT LÀ ĐƯỜNG VIỀN TRẮNG NỔI BẬT TRÊN MÉP CÁNH
  const layers = [
    { count: 7, rIn: 38, rOut: 68, rot: 14, span: 68, fill: bodyLight, dark: shadowColor },
    { count: 6, rIn: 30, rOut: 56, rot: 42, span: 78, fill: bodyColor, dark: shadowColor },
    { count: 5, rIn: 22, rOut: 44, rot: 18, span: 88, fill: bodyColor, dark: shadowColor },
    { count: 5, rIn: 14, rOut: 34, rot: 54, span: 90, fill: shadowColor, dark: coreColor },
    { count: 4, rIn: 8,  rOut: 24, rot: 26, span: 105, fill: shadowColor, dark: coreColor }
  ];

  layers.forEach((layer) => {
    out += `<g filter="url(#${shadowId})">`;
    for (let i = 0; i < layer.count; i++) {
      const ang = i * (360 / layer.count) + layer.rot;
      const startAngle = ang - layer.span / 2;
      const endAngle = ang + layer.span / 2;
      const midAngle = ang;
      const span = layer.span;

      const pIn1 = polarToCart(cx, cy, layer.rIn, startAngle);
      const pIn2 = polarToCart(cx, cy, layer.rIn, endAngle);

      // Điểm góc vát đa giác chiseled
      const pC1 = polarToCart(cx, cy, layer.rOut * 0.96, startAngle + span * 0.12);
      const pE1 = polarToCart(cx, cy, layer.rOut, midAngle - span * 0.14);
      const pE2 = polarToCart(cx, cy, layer.rOut, midAngle + span * 0.14);
      const pC2 = polarToCart(cx, cy, layer.rOut * 0.96, endAngle - span * 0.12);

      const bodyD = `M ${pIn1.x.toFixed(1)} ${pIn1.y.toFixed(1)}
                     L ${pC1.x.toFixed(1)} ${pC1.y.toFixed(1)}
                     L ${pE1.x.toFixed(1)} ${pE1.y.toFixed(1)}
                     L ${pE2.x.toFixed(1)} ${pE2.y.toFixed(1)}
                     L ${pC2.x.toFixed(1)} ${pC2.y.toFixed(1)}
                     L ${pIn2.x.toFixed(1)} ${pIn2.y.toFixed(1)}
                     Z`;

      // ĐƯỜNG VIỀN TRẮNG SẮC NÉT TRÊN MÉP CÁNH HOA (ĐẶC TRƯNG TRONG ẢNH)
      const rimD = `M ${pC1.x.toFixed(1)} ${pC1.y.toFixed(1)}
                    L ${pE1.x.toFixed(1)} ${pE1.y.toFixed(1)}
                    L ${pE2.x.toFixed(1)} ${pE2.y.toFixed(1)}
                    L ${pC2.x.toFixed(1)} ${pC2.y.toFixed(1)}`;

      // Khe bóng tối nếp gấp ở đáy cánh
      const creaseD = `M ${pIn1.x.toFixed(1)} ${pIn1.y.toFixed(1)} Q ${polarToCart(cx, cy, layer.rIn * 0.9, midAngle).x.toFixed(1)} ${polarToCart(cx, cy, layer.rIn * 0.9, midAngle).y.toFixed(1)} ${pIn2.x.toFixed(1)} ${pIn2.y.toFixed(1)}`;

      out += `<path d="${bodyD}" fill="${layer.fill}" stroke="${lineColor}" stroke-width="0.9" stroke-linejoin="round"/>`;
      out += `<path d="${creaseD}" fill="none" stroke="${layer.dark}" stroke-width="1.8" opacity="0.65"/>`;
      out += `<path d="${rimD}" fill="none" stroke="${highlightColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>`;
    }
    out += `</g>`;
  });

  // Tầng 0: Tâm hoa cuộn xoắn tròn có viền trắng
  out += `<g filter="url(#${shadowId})">`;
  out += `<circle cx="${cx}" cy="${cy}" r="12" fill="${coreColor}" stroke="${lineColor}" stroke-width="1"/>`;
  out += `
    <path d="M ${cx - 7} ${cy + 3} C ${cx - 10} ${cy - 5}, ${cx + 2} ${cy - 8}, ${cx + 6} ${cy - 2} C ${cx + 8} ${cy + 3}, ${cx + 1} ${cy + 8}, ${cx - 3} ${cy + 5}" fill="${bodyColor}" stroke="${lineColor}" stroke-width="0.8"/>
    <path d="M ${cx - 7} ${cy + 3} C ${cx - 10} ${cy - 5}, ${cx + 2} ${cy - 8}, ${cx + 6} ${cy - 2}" fill="none" stroke="${highlightColor}" stroke-width="1.8" stroke-linecap="round"/>
    
    <path d="M ${cx + 2} ${cy - 4} C ${cx + 5} ${cy + 1}, ${cx} ${cy + 5}, ${cx - 3} ${cy + 1} C ${cx - 4} ${cy - 2}, ${cx} ${cy - 4}, ${cx + 2} ${cy - 3}" fill="${coreColor}" stroke="${lineColor}" stroke-width="0.8"/>
    <path d="M ${cx + 2} ${cy - 4} C ${cx + 5} ${cy + 1}, ${cx} ${cy + 5}, ${cx - 3} ${cy + 1}" fill="none" stroke="${highlightColor}" stroke-width="1.5" stroke-linecap="round"/>
    
    <circle cx="${cx}" cy="${cy}" r="2.2" fill="${lineColor}"/>
  `;
  out += `</g>`;

  out += `</svg>`;
  return out;
}

// =============================================================================
// 3. NỤ HOA (ROSEBUD) CÓ VIỀN TRẮNG & ĐÀI XANH GÂN TRẮNG
// =============================================================================
function createExactRoseBudSVG(palette, uniqueId, size = 100) {
  const { shadowColor, lineColor, highlightColor } = palette;
  return `
  <svg viewBox="0 0 100 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Nụ hoa màu -->
    <path d="M 50 25 C 65 50, 68 78, 50 92 C 32 78, 35 50, 50 25 Z" 
          fill="${shadowColor}" stroke="${lineColor}" stroke-width="1.1"/>
    <!-- VỆT SÁNG TRẮNG ĐẶC TRƯNG TRÊN THÂN NỤ HOA -->
    <path d="M 44 32 C 55 48, 56 70, 48 84" 
          fill="none" stroke="${highlightColor}" stroke-width="2.6" stroke-linecap="round"/>
    <!-- Hai lá đài xanh ôm chặt hai bên, có gân lá trắng -->
    <path d="M 50 96 C 35 90, 24 74, 28 44 C 34 68, 42 84, 50 96 Z" 
          fill="#1d4d16" stroke="#0e2b0a" stroke-width="1.1"/>
    <path d="M 33 82 Q 28 66 30 52" fill="none" stroke="${highlightColor}" stroke-width="1.6" stroke-linecap="round"/>
    
    <path d="M 50 96 C 65 90, 76 74, 72 44 C 66 68, 58 84, 50 96 Z" 
          fill="#1d4d16" stroke="#0e2b0a" stroke-width="1.1"/>
    <path d="M 67 82 Q 72 66 70 52" fill="none" stroke="${highlightColor}" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;
}

// =============================================================================
// 4. HOA CÚC XOẮN TRÒN CÓ VIỀN TRẮNG (BUTTON FLOWER - TRÊN NỀN BẦU TRỜI)
// =============================================================================
function createExactSpiralButtonSVG(palette, uniqueId, size = 90) {
  const { bodyLight, bodyColor, coreColor, lineColor, highlightColor } = palette;
  const cx = 45, cy = 45;
  return `
  <svg viewBox="0 0 90 90" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="38" fill="${bodyLight}" stroke="${lineColor}" stroke-width="1.1"/>
    <circle cx="${cx}" cy="${cy}" r="28" fill="${bodyColor}" stroke="${lineColor}" stroke-width="1.0"/>
    <!-- Vòng xoắn ốc viền trắng -->
    <path d="M ${cx} ${cy - 18} A 18 18 0 1 1 ${cx - 0.1} ${cy - 18} M ${cx} ${cy - 10} A 10 10 0 1 1 ${cx - 0.1} ${cy - 10}" 
          fill="none" stroke="${highlightColor}" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="${coreColor}"/>
  </svg>`;
}

// =============================================================================
// 5. CÀNH HOA & LÁ CÓ GÂN TRẮNG CHUẨN XÁC (LEAVES WITH WHITE PINNATE VEINS)
// =============================================================================

function createHeroStemSVG(heightPx) {
  const widthPx = 160;
  const cx = widthPx / 2;
  const topY = 5;
  const botY = heightPx;

  return `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <!-- Cành hoa thẳng đứng -->
    <line x1="${cx}" y1="${topY}" x2="${cx}" y2="${botY}" stroke="#2e641e" stroke-width="3.2" stroke-linecap="round"/>

    <!-- 1. Lá trên bên trái (sát ngay dưới bông hoa, chúc xuống góc trái - KHỚP ẢNH 1) -->
    <g transform="translate(${cx}, ${topY + 16}) rotate(-132)">
      <!-- Cuống lá -->
      <path d="M 0 0 Q -8 -4 -16 -6" fill="none" stroke="#1d4212" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Phiến lá xanh thẫm -->
      <path d="M -14 -5 C -24 -18, -44 -14, -50 -4 C -42 8, -24 6, -14 -5 Z"
            fill="#1e4d17" stroke="#0e2b0a" stroke-width="1.2"/>
      <!-- GÂN LÁ CHÍNH MÀU TRẮNG SÁNG -->
      <path d="M -15 -5 Q -32 -6 -48 -4" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <!-- CÁC NHÁNH GÂN LÁ PHỤ MÀU TRẮNG -->
      <path d="M -24 -5 Q -28 -10 -36 -12" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95"/>
      <path d="M -24 -5 Q -28 -1 -34 3" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95"/>
      <path d="M -34 -5 Q -38 -8 -43 -9" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.95"/>
      <path d="M -34 -5 Q -38 -2 -42 1" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.95"/>
    </g>

    <!-- 2. Lá giữa bên phải (khoảng 38% thân cành, vểnh lên trên bên phải) -->
    <g transform="translate(${cx}, ${topY + heightPx * 0.38}) rotate(-38)">
      <!-- Cuống lá -->
      <path d="M 0 0 Q 8 -4 16 -6" fill="none" stroke="#1d4212" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Phiến lá -->
      <path d="M 14 -5 C 24 -18, 44 -14, 50 -4 C 42 8, 24 6, 14 -5 Z"
            fill="#1e4d17" stroke="#0e2b0a" stroke-width="1.2"/>
      <!-- Gân lá chính màu trắng -->
      <path d="M 15 -5 Q 32 -6 48 -4" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Gân lá phụ màu trắng -->
      <path d="M 24 -5 Q 28 -10 36 -12" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95"/>
      <path d="M 24 -5 Q 28 -1 34 3" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95"/>
      <path d="M 34 -5 Q 38 -8 43 -9" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.95"/>
      <path d="M 34 -5 Q 38 -2 42 1" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.95"/>
    </g>
  </svg>`;
}

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
    <path d="M ${cx} ${topY} Q ${ctrlX} ${midY} ${cx} ${botY}" fill="none" stroke="#2e641e" stroke-width="2.8" stroke-linecap="round"/>
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
        <path d="M 0 0 Q ${isLeft ? -6 : 6} -3 ${isLeft ? -12 : 12} -4" fill="none" stroke="#1d4212" stroke-width="2" stroke-linecap="round"/>
        <path d="M ${isLeft ? -10 : 10} -3 
                 C ${isLeft ? -18 : 18} -14, ${isLeft ? -34 : 34} -12, ${isLeft ? -40 : 40} -3
                 C ${isLeft ? -32 : 32} 6, ${isLeft ? -18 : 18} 5, ${isLeft ? -10 : 10} -3 Z"
              fill="#1e4d17" stroke="#0e2b0a" stroke-width="1"/>
        <!-- Gân lá trắng -->
        <path d="M ${isLeft ? -10 : 10} -3 Q ${isLeft ? -25 : 25} -4 ${isLeft ? -38 : 38} -3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M ${isLeft ? -18 : 18} -3 Q ${isLeft ? -22 : 22} -8 ${isLeft ? -28 : 28} -9" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.9"/>
        <path d="M ${isLeft ? -18 : 18} -3 Q ${isLeft ? -22 : 22} 1 ${isLeft ? -28 : 28} 3" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.9"/>
      </g>
    `;
  });

  svg += `</svg>`;
  return svg;
}

// =============================================================================
// 6. KHỞI TẠO KHU VƯỜN HOA ĐẦY ĐỦ (GARDEN POPULATOR)
// =============================================================================
let gardenFlowersData = [];

function buildGarden() {
  const container = document.getElementById('garden-container');
  if (!container) return;
  container.innerHTML = '';
  gardenFlowersData = [];

  const isMobile = window.innerWidth <= 768;
  const flowerCount = isMobile ? 38 : 58;

  for (let i = 0; i < flowerCount; i++) {
    const pct = (i / (flowerCount - 1));
    const xPct = Math.max(1, Math.min(99, pct * 100 + (Math.random() * 3.5 - 1.75)));
    const distFromCenter = Math.abs(xPct - 50) / 50;

    const rand = Math.random();
    let layer = 'mid';
    let flowerType = 'rose';

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
      // Tầng trước to và xếp san sát nhau như một bức tường hoa
      sizePx = Math.floor(104 + Math.random() * 26);
      zIndex = 20;
      flowerHeightVh = 16 + distFromCenter * 12 + (Math.random() * 8 - 4);
    }

    // Chọn bảng màu phù hợp
    let palette;
    if (flowerType === 'bud' && Math.random() < 0.5) {
      palette = COLOR_PALETTES[3]; // Lam ngọc
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

    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';
    headWrap.style.width = `${sizePx}px`;
    headWrap.style.height = `${sizePx}px`;
    headWrap.style.bottom = `${heightPx - sizePx / 2}px`;

    if (flowerType === 'button') {
      headWrap.innerHTML = createExactSpiralButtonSVG(palette, `g-${i}`, sizePx);
    } else if (flowerType === 'bud') {
      headWrap.innerHTML = createExactRoseBudSVG(palette, `g-${i}`, sizePx);
    } else {
      headWrap.innerHTML = createExactPaperRoseSVG(palette, `g-${i}`, sizePx);
    }

    const stemWrap = document.createElement('div');
    stemWrap.className = 'flower-stem-wrap';
    stemWrap.innerHTML = createGardenStemSVG(heightPx, bend, leaves);

    flowerEl.appendChild(stemWrap);
    flowerEl.appendChild(headWrap);

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
    heroWrapper.style.transform = 'translateX(-50%) scale(1.1)';
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
  // 1. Dựng bông hoa chính (Hero Rose) chuẩn 100% theo ảnh
  const heroHead = document.getElementById('hero-rose-head');
  if (heroHead) {
    const heroPalette = COLOR_PALETTES[0]; // Hồng phấn
    heroHead.innerHTML = createExactPaperRoseSVG(heroPalette, 'hero', 140);
  }

  const heroStem = document.getElementById('hero-stem-svg');
  if (heroStem) {
    heroStem.innerHTML = createHeroStemSVG(heroStem.clientHeight || 280);
  }

  // 2. Dựng icon hoa trên thiệp
  const cardIcon = document.getElementById('card-rose-icon');
  if (cardIcon) {
    cardIcon.innerHTML = createExactPaperRoseSVG(COLOR_PALETTES[0], 'card-icon', 52);
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
