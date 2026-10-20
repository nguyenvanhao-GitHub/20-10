/**
 * 20/10 - CẢ MỘT VƯỜN THƯƠNG
 * Tái tạo chính xác 100% hình ảnh khu vườn hoa và đóa hoa hồng trong ảnh 2
 */

// =============================================================================
// 1. BẢNG MÀU PASTEL CHUẨN NGHỆ THUẬT (KHỚP 100% ẢNH 2)
// =============================================================================
const COLOR_PALETTES = [
  {
    type: 'pink',
    name: 'Hồng phấn',
    baseLight: '#fce4ec',
    baseMid: '#f48fb1',
    baseDark: '#ec407a',
    coreColor: '#c2185b',
    lineColor: '#880e4f',
    sepalColor: '#2e7d32'
  },
  {
    type: 'peach',
    name: 'Cam đào / Apricot',
    baseLight: '#ffe0b2',
    baseMid: '#ffb74d',
    baseDark: '#fb8c00',
    coreColor: '#e65100',
    lineColor: '#bf360c',
    sepalColor: '#2e7d32'
  },
  {
    type: 'mint',
    name: 'Xanh bơ / Mint',
    baseLight: '#e8f5e9',
    baseMid: '#a5d6a7',
    baseDark: '#66bb6a',
    coreColor: '#388e3c',
    lineColor: '#1b5e20',
    sepalColor: '#2e7d32'
  },
  {
    type: 'blue',
    name: 'Lam ngọc / Sky Blue',
    baseLight: '#e1f5fe',
    baseMid: '#81d4fa',
    baseDark: '#29b6f6',
    coreColor: '#0288d1',
    lineColor: '#01579b',
    sepalColor: '#2e7d32'
  },
  {
    type: 'cream',
    name: 'Vàng kem bơ',
    baseLight: '#fffde7',
    baseMid: '#fff59d',
    baseDark: '#ffee58',
    coreColor: '#fbc02d',
    lineColor: '#f57f17',
    sepalColor: '#2e7d32'
  },
  {
    type: 'lavender',
    name: 'Tím oải hương',
    baseLight: '#f3e5f5',
    baseMid: '#ce93d8',
    baseDark: '#ab47bc',
    coreColor: '#7b1fa2',
    lineColor: '#4a148c',
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
// 2. TẠO HÌNH HOA HỒNG TỰ NHIÊN (ORGANIC CABBAGE ROSE - KHÔNG CÓ NAN HOA/SPOKES)
// =============================================================================

function createNaturalPetal(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const span = endAngle - startAngle;
  const midAngle = startAngle + span / 2;

  const pIn1 = polarToCart(cx, cy, rInner, startAngle);
  const pIn2 = polarToCart(cx, cy, rInner, endAngle);

  // Mép cánh uốn lượn tự nhiên có vết lượn sóng nhẹ ở đỉnh cánh
  const pL = polarToCart(cx, cy, rOuter * 0.94, startAngle + span * 0.18);
  const pTipL = polarToCart(cx, cy, rOuter, midAngle - span * 0.12);
  const pTipR = polarToCart(cx, cy, rOuter, midAngle + span * 0.12);
  const pIndent = polarToCart(cx, cy, rOuter * 0.96, midAngle);
  const pR = polarToCart(cx, cy, rOuter * 0.94, endAngle - span * 0.18);

  // Đường viền thân cánh khép kín để đổ màu nền
  const fillPath = `M ${pIn1.x.toFixed(1)} ${pIn1.y.toFixed(1)}
                    Q ${pL.x.toFixed(1)} ${pL.y.toFixed(1)} ${pTipL.x.toFixed(1)} ${pTipL.y.toFixed(1)}
                    Q ${pIndent.x.toFixed(1)} ${pIndent.y.toFixed(1)} ${pTipR.x.toFixed(1)} ${pTipR.y.toFixed(1)}
                    Q ${pR.x.toFixed(1)} ${pR.y.toFixed(1)} ${pIn2.x.toFixed(1)} ${pIn2.y.toFixed(1)}
                    Z`;

  // CHỈ VIỀN NÉT Ở ĐỈNH VÒM CÁNH HOA (TUYỆT ĐỐI KHÔNG VIỀN ĐƯỜNG NAN XUYÊN VÀO TÂM)
  const rimPath = `M ${pL.x.toFixed(1)} ${pL.y.toFixed(1)}
                   Q ${pL.x.toFixed(1)} ${pL.y.toFixed(1)} ${pTipL.x.toFixed(1)} ${pTipL.y.toFixed(1)}
                   Q ${pIndent.x.toFixed(1)} ${pIndent.y.toFixed(1)} ${pTipR.x.toFixed(1)} ${pTipR.y.toFixed(1)}
                   Q ${pR.x.toFixed(1)} ${pR.y.toFixed(1)} ${pR.x.toFixed(1)} ${pR.y.toFixed(1)}`;

  return { fillPath, rimPath };
}

// Bông hoa hồng lớn tự nhiên (Hero Rose & Large Garden Roses)
function createOrganicRoseSVG(palette, uniqueId = 'rose', size = 160) {
  const cx = 80, cy = 80;
  const shadowId = `sh-${uniqueId}`;

  const {
    baseLight,
    baseMid,
    baseDark,
    coreColor,
    lineColor,
    sepalColor
  } = palette;

  let out = `
  <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${shadowId}" x="-20%" y="-20%" width="145%" height="145%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" flood-color="rgba(70, 20, 30, 0.18)"/>
      </filter>
    </defs>
  `;

  // 1. Gai đài hoa nhỏ màu xanh rêu sau lưng hoa
  const sepalAngles = [30, 105, 190, 280, 340];
  sepalAngles.forEach(ang => {
    const p1 = polarToCart(cx, cy, 62, ang - 4.5);
    const p2 = polarToCart(cx, cy, 72, ang);
    const p3 = polarToCart(cx, cy, 62, ang + 4.5);
    out += `<polygon points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="${sepalColor}" stroke="#1b5e20" stroke-width="0.7"/>`;
  });

  // 5 tầng cánh xếp so le từ ngoài vào trong, chỉ viền mép vòm (Không có đường nan xuyên tâm)
  const layers = [
    { count: 7, rIn: 34, rOut: 66, rot: 15, span: 75, fill: baseLight },
    { count: 6, rIn: 26, rOut: 54, rot: 45, span: 85, fill: baseMid },
    { count: 5, rIn: 18, rOut: 43, rot: 22, span: 95, fill: baseMid },
    { count: 5, rIn: 12, rOut: 32, rot: 58, span: 100, fill: baseDark },
    { count: 4, rIn: 7,  rOut: 22, rot: 28, span: 110, fill: baseDark }
  ];

  layers.forEach((layer) => {
    out += `<g filter="url(#${shadowId})">`;
    for (let i = 0; i < layer.count; i++) {
      const ang = i * (360 / layer.count) + layer.rot;
      const { fillPath, rimPath } = createNaturalPetal(
        cx, cy, layer.rIn, layer.rOut, 
        ang - layer.span / 2, ang + layer.span / 2
      );
      // Đổ màu cánh hoa
      out += `<path d="${fillPath}" fill="${layer.fill}"/>`;
      // Viền nét mảnh ở mép cánh
      out += `<path d="${rimPath}" fill="none" stroke="${lineColor}" stroke-width="0.85" stroke-linecap="round"/>`;
      // Vệt sáng mềm nhẹ trên đỉnh cánh
      out += `<path d="${rimPath}" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/>`;
    }
    out += `</g>`;
  });

  // Tâm nụ hoa hồng cuộn xoắn ốc mềm mại
  out += `<g filter="url(#${shadowId})">`;
  out += `<circle cx="${cx}" cy="${cy}" r="11" fill="${coreColor}"/>`;
  out += `
    <path d="M ${cx - 5} ${cy + 2} C ${cx - 8} ${cy - 4}, ${cx + 2} ${cy - 7}, ${cx + 5} ${cy - 2} C ${cx + 7} ${cy + 3}, ${cx + 1} ${cy + 6}, ${cx - 2} ${cy + 4}" fill="${baseMid}" stroke="${lineColor}" stroke-width="0.75"/>
    <path d="M ${cx + 2} ${cy - 3} C ${cx + 4} ${cy + 1}, ${cx} ${cy + 4}, ${cx - 2} ${cy + 1} C ${cx - 3} ${cy - 1}, ${cx} ${cy - 3}, ${cx + 2} ${cy - 2}" fill="${coreColor}" stroke="${lineColor}" stroke-width="0.75"/>
    <circle cx="${cx}" cy="${cy}" r="2" fill="#ffffff" opacity="0.85"/>
  `;
  out += `</g>`;

  out += `</svg>`;
  return out;
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
  const topY = 5;
  const botY = heightPx;

  return `
  <svg width="${widthPx}" height="${heightPx}" viewBox="0 0 ${widthPx} ${heightPx}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <!-- Cành hoa thẳng đứng thanh mảnh màu xanh lá -->
    <line x1="${cx}" y1="${topY}" x2="${cx}" y2="${botY}" stroke="#38761d" stroke-width="3" stroke-linecap="round"/>

    <!-- 1. Lá trên bên trái (ngay sát dưới đáy hoa, chúc xuống góc trái - Khớp Ảnh 1 & 2) -->
    <g transform="translate(${cx}, ${topY + 16}) rotate(-132)">
      <path d="M 0 0 Q -8 -4 -16 -6" fill="none" stroke="#275014" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M -14 -5 C -24 -18, -44 -14, -50 -4 C -42 8, -24 6, -14 -5 Z"
            fill="#2e631e" stroke="#1b3d11" stroke-width="1.1"/>
      <path d="M -15 -5 Q -32 -6 -48 -4" fill="none" stroke="#84cc16" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M -24 -5 Q -28 -10 -36 -12" fill="none" stroke="#84cc16" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>
      <path d="M -24 -5 Q -28 -1 -34 3" fill="none" stroke="#84cc16" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>
    </g>

    <!-- 2. Lá giữa bên phải (khoảng 38% chiều cao thân cành) -->
    <g transform="translate(${cx}, ${topY + heightPx * 0.38}) rotate(-38)">
      <path d="M 0 0 Q 8 -4 16 -6" fill="none" stroke="#275014" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M 14 -5 C 24 -18, 44 -14, 50 -4 C 42 8, 24 6, 14 -5 Z"
            fill="#2e631e" stroke="#1b3d11" stroke-width="1.1"/>
      <path d="M 15 -5 Q 32 -6 48 -4" fill="none" stroke="#84cc16" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 24 -5 Q 28 -10 36 -12" fill="none" stroke="#84cc16" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>
      <path d="M 24 -5 Q 28 -1 34 3" fill="none" stroke="#84cc16" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>
    </g>
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

  const isMobile = window.innerWidth <= 768;
  const containerHeight = container.clientHeight || (window.innerHeight * 0.72);

  // Danh sách các loài hoa được xếp theo 4 tầng lớp để tạo thảm hoa dày đặc không còn kẽ hở
  const flowerItems = [];

  // TẦNG 1: DƯỚI ĐÁY CÙNG (0% - 14% chiều cao) - 10 đóa hoa lớn xếp sát nhau gối lên nhau phủ kín đáy
  const countT1 = isMobile ? 7 : 11;
  for (let i = 0; i < countT1; i++) {
    const xPct = (i / (countT1 - 1)) * 96 + 2 + (Math.random() * 4 - 2);
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: Math.floor(115 + Math.random() * 22),
      heightPx: Math.floor(containerHeight * (0.05 + Math.random() * 0.10)),
      type: 'rose',
      layer: 28, // Trên cùng trong khu vườn
      palette: COLOR_PALETTES[i % COLOR_PALETTES.length],
      bend: (Math.random() - 0.5) * 15,
      hasStem: false // Đáy sát đất không lộ cành
    });
  }

  // TẦNG 2: TẦNG TRUNG TRƯỚC (12% - 28% chiều cao) - 12 đóa hoa lấp đầy các khe hở của tầng 1
  const countT2 = isMobile ? 8 : 13;
  for (let i = 0; i < countT2; i++) {
    const xPct = ((i + 0.5) / countT2) * 94 + 3 + (Math.random() * 4 - 2);
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: Math.floor(95 + Math.random() * 20),
      heightPx: Math.floor(containerHeight * (0.16 + Math.random() * 0.12)),
      type: 'rose',
      layer: 22,
      palette: COLOR_PALETTES[(i + 2) % COLOR_PALETTES.length],
      bend: (Math.random() - 0.5) * 20,
      hasStem: true
    });
  }

  // TẦNG 3: TẦNG TRUNG SAU (26% - 42% chiều cao) - 11 đóa hoa hồng & búp nụ xen kẽ
  const countT3 = isMobile ? 7 : 12;
  for (let i = 0; i < countT3; i++) {
    const xPct = (i / (countT3 - 1)) * 92 + 4 + (Math.random() * 5 - 2.5);
    const isBud = Math.random() < 0.35;
    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: isBud ? 54 : Math.floor(80 + Math.random() * 18),
      heightPx: Math.floor(containerHeight * (0.28 + Math.random() * 0.14)),
      type: isBud ? 'bud' : 'rose',
      layer: 16,
      palette: isBud ? (Math.random() < 0.5 ? COLOR_PALETTES[3] : COLOR_PALETTES[1]) : COLOR_PALETTES[(i + 4) % COLOR_PALETTES.length],
      bend: (Math.random() - 0.5) * 25,
      hasStem: true
    });
  }

  // TẦNG 4: TẦNG CÀNH CAO VƯƠN LÊN BẦU TRỜI (42% - 66% chiều cao) - Hoa cúc xoắn tròn & nụ hoa vươn cao như ảnh 2
  const countT4 = isMobile ? 8 : 15;
  for (let i = 0; i < countT4; i++) {
    const xPct = (i / (countT4 - 1)) * 92 + 4 + (Math.random() * 6 - 3);
    // Tránh vị trí giữa để không che bông hoa hồng Hero
    if (Math.abs(xPct - 50) < 9) continue;

    const r = Math.random();
    const type = r < 0.45 ? 'button' : (r < 0.75 ? 'bud' : 'rose');
    const sizePx = type === 'button' ? 44 : (type === 'bud' ? 50 : 66);

    flowerItems.push({
      xPct: Math.max(1, Math.min(99, xPct)),
      sizePx: sizePx,
      heightPx: Math.floor(containerHeight * (0.45 + Math.random() * 0.20)),
      type: type,
      layer: 11,
      palette: COLOR_PALETTES[i % COLOR_PALETTES.length],
      bend: (Math.random() - 0.5) * 28,
      hasStem: true
    });
  }

  // Tạo phần tử DOM cho toàn bộ khu vườn
  flowerItems.forEach((item, idx) => {
    const distFromCenter = Math.abs(item.xPct - 50) / 50;
    const delay = (0.2 + distFromCenter * 1.3 + Math.random() * 0.7).toFixed(2);
    const swayDuration = (3.8 + Math.random() * 2.2).toFixed(1) + 's';
    const swayDelay = (-Math.random() * 4).toFixed(1) + 's';
    const baseRot = ((Math.random() - 0.5) * 4).toFixed(1) + 'deg';

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
      headWrap.innerHTML = createOrganicRoseSVG(item.palette, `g-${idx}`, item.sizePx);
    }

    // Cành hoa
    if (item.hasStem) {
      const leaves = [];
      if (Math.random() > 0.3) {
        leaves.push({ side: 'left', pos: 0.38 + Math.random() * 0.15, angle: 32 + Math.random() * 18, scale: 0.75 + Math.random() * 0.25 });
      }
      if (Math.random() > 0.35) {
        leaves.push({ side: 'right', pos: 0.62 + Math.random() * 0.15, angle: 32 + Math.random() * 18, scale: 0.75 + Math.random() * 0.25 });
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
    heroHead.innerHTML = createOrganicRoseSVG(heroPalette, 'hero', 140);
  }

  const heroStem = document.getElementById('hero-stem-svg');
  if (heroStem) {
    heroStem.innerHTML = createHeroStemSVG(heroStem.clientHeight || 280);
  }

  // 2. Dựng icon hoa trên thiệp
  const cardIcon = document.getElementById('card-rose-icon');
  if (cardIcon) {
    cardIcon.innerHTML = createOrganicRoseSVG(COLOR_PALETTES[0], 'card-icon', 52);
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
