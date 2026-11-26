const LEAD_ENDPOINT = 'https://lead-relay.leestygpt.workers.dev/lead/8VDT8AYNML';
// Ссылка на бота-игру (гайд). После переноса бота на аккаунт клиента поменять только здесь.
const BOT_LINK = 'https://t.me/trip_wire_super_bot?start=43d35fbed8d2';

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, p) => {
    const e = document.createElementNS(NS, n);
    for (const k in a) e.setAttribute(k, a[k]);
    if (p) p.appendChild(e);
    return e;
  };
  document.documentElement.classList.add('js');
  $$('[data-bot]').forEach(a => { a.href = BOT_LINK; });
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== HERO: лестница из пяти объектов ===== */
  const stairs = $('#stairs');
  if (stairs) {
    el('line', { class: 'ground', x1: 0, y1: 300, x2: 460, y2: 300 }, stairs);
    const H = [64, 104, 148, 200, 254];
    const blocks = H.map((h, i) => {
      const x = 14 + i * 88, y = 300 - h;
      const g = el('g', { class: 'blk' + (reduce ? '' : ' rise'), style: '--i:' + i }, stairs);
      el('rect', { class: 'body', x, y, width: 72, height: h, rx: 2 }, g);
      const rows = Math.max(1, Math.floor((h - 44) / 34)), cols = 2;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        el('rect', { class: 'win' + ((r * 3 + c * 2 + i) % 4 === 0 ? ' lit' : ''), x: x + 12 + c * 28, y: y + 38 + r * 34, width: 20, height: 22, rx: 2 }, g);
      }
      el('circle', { class: 'num', cx: x + 36, cy: y + 18, r: 13 }, g);
      el('text', { class: 'numt', x: x + 36, y: y + 23.5 }, g).textContent = i + 1;
      return g;
    });
    const lis = $$('#legend li');
    lis.forEach((li, i) => {
      li.addEventListener('mouseenter', () => blocks[i].classList.add('hot'));
      li.addEventListener('mouseleave', () => blocks[i].classList.remove('hot'));
    });
    blocks.forEach((b, i) => {
      b.addEventListener('mouseenter', () => lis[i].classList.add('hot'));
      b.addEventListener('mouseleave', () => lis[i].classList.remove('hot'));
    });
  }

  /* ===== СЦЕНА: от первого взноса к семейному капиталу ===== */
  const scene = $('#scene'), svg = $('#sceneSvg');
  if (scene && svg) {
    const root = el('g', { class: 'sc' }, svg);
    for (let x = 0; x <= 520; x += 40) el('line', { class: 'grid', x1: x, y1: 0, x2: x, y2: 440 }, root);
    for (let y = 0; y <= 440; y += 40) el('line', { class: 'grid', x1: 0, y1: y, x2: 520, y2: y }, root);
    el('line', { class: 'ground', x1: 0, y1: 380, x2: 520, y2: 380 }, root);
    el('rect', { class: 'dash', x: 330, y: 80, width: 130, height: 300, rx: 3 }, root);
    const S = (step, cls, d) => el('g', { class: 'sc-el ' + (cls || ''), 'data-step': step, style: '--d:' + (d || 0) + 's' }, root);

    // 1: старт
    const seed = S(1);
    el('rect', { class: 'seed', x: 262, y: 340, width: 40, height: 40, rx: 3 }, seed);
    el('text', { class: 'lab', x: 282, y: 330 }, seed).textContent = 'старт';
    // 2: варианты
    const park = S(2, 'opt chosen', 0);
    el('rect', { class: 'shape', x: 24, y: 324, width: 76, height: 56, rx: 3 }, park);
    el('text', { class: 'lab', x: 62, y: 361, style: 'font-size:26px' }, park).textContent = 'P';
    const store = S(2, 'opt', .12);
    el('rect', { class: 'shape', x: 112, y: 340, width: 52, height: 40, rx: 3 }, store);
    el('line', { class: 'hatch', x1: 138, y1: 340, x2: 138, y2: 380 }, store);
    el('line', { class: 'hatch', x1: 112, y1: 360, x2: 164, y2: 360 }, store);
    const land = S(2, 'opt', .24);
    el('polygon', { class: 'shape', points: '172,380 192,350 236,350 216,380' }, land);
    for (let i = 0; i < 4; i++) el('line', { class: 'hatch', x1: 186 + i * 12, y1: 366, x2: 196 + i * 12, y2: 352 }, land);
    // 3: выбор
    const ck = S(3);
    el('circle', { class: 'check', cx: 100, cy: 324, r: 14 }, ck);
    el('path', { d: 'M93 324 98 329 107 319', fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ck);
    // 4-5: этажи
    for (let f = 0; f < 5; f++) {
      const g = S(f < 3 ? 4 : 5, 'fl', f < 3 ? f * .15 : (f - 3) * .15);
      const y = 320 - f * 60;
      el('rect', { class: 'floor' + (f === 4 ? ' top' : ''), x: 340, y, width: 110, height: 60, rx: 2 }, g);
      for (let c = 0; c < 3; c++) el('rect', { x: 352 + c * 32, y: y + 16, width: 20, height: 26, rx: 2, fill: (f + c) % 2 ? '#E3A72F' : '#D5DCE5' }, g);
    }
    // 5: флаг и дом
    const flag = S(5, '', .3);
    el('line', { x1: 395, y1: 80, x2: 395, y2: 44, stroke: '#14233A', 'stroke-width': 3 }, flag);
    el('polygon', { class: 'roof', points: '395,44 425,54 395,64' }, flag);
    const house = S(5, '', .45);
    el('rect', { class: 'shape', x: 470, y: 344, width: 36, height: 36 }, house);
    el('polygon', { class: 'roof', points: '464,344 488,322 512,344' }, house);
    // таймлайн
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const t = S(i < 6 ? 4 : 5, 'tk', i * .05);
      el('line', { class: 'tick on', x1: 24 + i * 40, y1: 408, x2: 48 + i * 40, y2: 408 }, t);
      ticks.push(t);
    }
    $$('.sc-el.tk .tick').forEach(t => t.classList.add('on'));

    const els = $$('.sc-el', svg);
    const steps = $$('.step', scene), N = 5;
    const stick = $('.scene__stick', scene);
    const names = ['Разбор', 'Варианты', 'Выбор', 'Шаг за шагом', 'Семейный капитал'];
    const tk = $('#ticks'), cap = $('#cap');
    const btns = names.map((n, k) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = k + 1; b.setAttribute('aria-label', 'Шаг ' + (k + 1) + ': ' + n);
      li.appendChild(b); tk.appendChild(li);
      b.addEventListener('click', () => {
        const total = scene.offsetHeight - stick.offsetHeight;
        const top = scene.getBoundingClientRect().top + scrollY - 60 + total * ((k + .5) / N);
        scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      });
      return b;
    });
    let last = -1;
    const update = () => {
      const r = scene.getBoundingClientRect();
      const total = r.height - stick.offsetHeight;
      const p = clamp((60 - r.top) / total);
      const lit = Math.min(N, Math.floor(p * N) + 1);
      if (lit === last) return;
      last = lit;
      els.forEach(e => e.classList.toggle('on', +e.dataset.step <= lit));
      root.classList.toggle('s3', lit >= 3);
      root.classList.toggle('s5', lit >= 5);
      steps.forEach((s, k) => s.classList.toggle('on', k === lit - 1));
      btns.forEach((b, k) => {
        b.classList.toggle('done', k < lit - 1);
        b.classList.toggle('cur', k === lit - 1);
        if (k === lit - 1) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      cap.textContent = 'Шаг ' + lit + ' из ' + N + ': ' + names[lit - 1];
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', () => { last = -1; update(); });
  }

  /* ===== Три разбора ===== */
  const picks = [
    { tag: 'Гайд, разбор 1', h: 'Куда можно смотреть при старте от 100 000 ₽', p: 'Три предложения, с которых можно начинать от 100 000 ₽. Разбираю, чем они отличаются и на что обратить внимание. Это не гарантия дохода, а разбор вариантов.' },
    { tag: 'Гайд, разбор 2', h: 'Новостройки Москвы до 12 млн с ремонтом', p: 'Три новостройки в Москве до 12 млн рублей с ремонтом для тех, у кого есть московская прописка. Показываю, как сравнивать условия.' },
    { tag: 'Гайд, разбор 3', h: 'Черноморское побережье без первоначального взноса', p: 'Три предложения новостроек на Черноморском побережье без первоначального взноса. Разбираем условия и платёж, решение остаётся за вами.' }
  ];
  const tabs = $$('#pickTabs [data-pill-item]');
  const box = $('#pick');
  if (tabs.length && box) {
    const show = i => {
      $('#pickTag').textContent = picks[i].tag;
      $('#pickH').textContent = picks[i].h;
      $('#pickP').textContent = picks[i].p;
      box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
    };
    tabs.forEach(t => t.addEventListener('click', () => show(+t.dataset.i)));
    show(0);
  }

  /* ===== плавный переход по якорям ===== */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = href === '#top' ? document.body : $(href);
      if (!target) return;
      e.preventDefault();
      const top = href === '#top' ? 0 : target.getBoundingClientRect().top + scrollY - 60;
      scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ===== FORM -> CLOUDFLARE WORKER -> TELEGRAM ===== */
  const form = $('#leadForm');
  const msg = $('#formMsg');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    const fd = new FormData(form);
    const payload = {};
    fd.forEach((v, k) => { payload[k] = v; });
    if (payload._gotcha) return;
    msg.classList.remove('err');
    if (!String(payload.name || '').trim() || !String(payload.contact || '').trim()) { msg.textContent = 'Заполните имя и контакт'; msg.classList.add('err'); return; }
    if (!payload.consent) { msg.textContent = 'Нужно согласие на обработку персональных данных'; msg.classList.add('err'); return; }
    delete payload.consent;
    payload.source = 'Юлия Белослудцева, инвест-брокер - лендинг';
    btn.disabled = true;
    btn.textContent = 'Отправляем...';
    try {
      const resp = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      btn.textContent = 'Отправлено';
      msg.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
      form.reset();
    } catch (err) {
      console.error(err);
      btn.textContent = 'Ошибка, попробуйте ещё раз';
      msg.textContent = 'Не удалось отправить. Попробуйте ещё раз или напишите в Telegram @julia_broker08.';
      msg.classList.add('err');
    } finally {
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    }
  });
})();
