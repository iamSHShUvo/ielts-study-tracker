// const EXAM_DATE_OFFSET = 30;
// const DAILY_GOAL = 6;

// const SKILLS = ['Listening','Reading','Writing Task 1','Writing Task 2','Speaking','Vocabulary','Grammar','Full Mock Test'];
// const SKILL_COLORS = { 'Listening':'#378ADD','Reading':'#1D9E75','Writing Task 1':'#7F77DD','Writing Task 2':'#534AB7','Speaking':'#D85A30','Vocabulary':'#BA7517','Grammar':'#D4537E','Full Mock Test':'#888780' };

// const SKILL_TIPS = {
//   'Listening': 'Practice note-taking & predict answers. Band 8.5 = miss max 2–3 questions.',
//   'Reading': 'Skim for structure first. True/False/NG questions need extra care.',
//   'Writing Task 1': 'Describe trends objectively. Use overview paragraph. 150+ words.',
//   'Writing Task 2': 'Clear position + 2 developed body paragraphs. 250+ words in 40 min.',
//   'Speaking': 'Use filler strategies, paraphrase questions, extend answers naturally.',
//   'Vocabulary': 'Learn collocations, not just words. Aim for C1/C2 range.',
//   'Grammar': 'Master complex sentences, conditionals, passives — show range.',
//   'Full Mock Test': 'Simulate real conditions: timed, no breaks. Analyze errors after.'
// };

// let entries = [];
// let scores = { Listening: 6.0, Reading: 6.0, 'Writing Task 1': 6.0, 'Writing Task 2': 6.0, Speaking: 6.0 };
// let chartMode = 'daily';
// let chartInst = null;

// try {
//   const saved = localStorage.getItem('ieltsLog30');
//   if (saved) { const p = JSON.parse(saved); entries = p.entries || []; scores = p.scores || scores; }
// } catch(e) {}

// function save() {
//   try { localStorage.setItem('ieltsLog30', JSON.stringify({ entries, scores })); } catch(e) {}
// }

// function todayStr() { return new Date().toISOString().split('T')[0]; }

// function examDate() {
//   const d = new Date();
//   d.setDate(d.getDate() + EXAM_DATE_OFFSET);
//   return d.toISOString().split('T')[0];
// }

// function fmtH(h) {
//   const hrs = Math.floor(h);
//   const mins = Math.round((h - hrs) * 60);
//   if (hrs === 0) return `${mins}m`;
//   return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
// }

// window.addEventListener('load', () => {
//   document.getElementById('inDate').value = todayStr();

//   if (!entries.length) {
//     const today = new Date();
//     const sampleSkills = ['Listening','Reading','Writing Task 2','Speaking','Vocabulary','Grammar','Writing Task 1'];
//     for (let i = 4; i >= 0; i--) {
//       const d = new Date(today); d.setDate(today.getDate() - i);
//       const ds = d.toISOString().split('T')[0];
//       sampleSkills.slice(0, 2 + Math.floor(Math.random()*3)).forEach((sk, idx) => {
//         if (Math.random() > 0.3) {
//           entries.push({ date: ds, subject: sk, hours: +(0.75 + Math.random()*2).toFixed(2), quality: [1,2,3][Math.floor(Math.random()*3)] });
//         }
//       });
//     }
//     save();
//   }
//   render();
// });

// function addEntry() {
//   const date = document.getElementById('inDate').value;
//   const subject = document.getElementById('inSubject').value;
//   const hours = parseFloat(document.getElementById('inHours').value);
//   const quality = parseInt(document.getElementById('inQuality').value);
//   if (!date || isNaN(hours) || hours <= 0) { alert('Enter a valid date and hours.'); return; }
//   entries.push({ date, subject, hours: +hours.toFixed(2), quality });
//   save(); render();
//   document.getElementById('inHours').value = '';
// }

// function deleteEntry(i) { entries.splice(i, 1); save(); render(); }

// function setTab(mode, btn) {
//   chartMode = mode;
//   document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//   btn.classList.add('active');
//   drawChart();
// }

// function getDayTotals(days) {
//   const map = {};
//   const today = new Date();
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date(today); d.setDate(today.getDate() - i);
//     map[d.toISOString().split('T')[0]] = 0;
//   }
//   entries.forEach(e => { if (e.date in map) map[e.date] += e.hours; });
//   return map;
// }

// function render() {
//   const today = todayStr();

//   const daysLeft = Math.max(0, Math.ceil((new Date(examDate()) - new Date(today)) / 86400000));
//   document.getElementById('daysLeft').textContent = daysLeft;
//   document.getElementById('heroSub').textContent = daysLeft > 0 ? `${daysLeft} days to push 1.5 bands. Every session counts.` : 'Exam day — good luck!';

//   const todayH = entries.filter(e => e.date === today).reduce((a,e)=>a+e.hours,0);
//   const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-6);
//   const weekH = entries.filter(e => e.date >= weekAgo.toISOString().split('T')[0]).reduce((a,e)=>a+e.hours,0);
//   const totalH = entries.reduce((a,e)=>a+e.hours,0);

//   let streak = 0;
//   const d = new Date();
//   for (let i = 0; i < 60; i++) {
//     const ds = d.toISOString().split('T')[0];
//     if (entries.filter(e=>e.date===ds).reduce((a,e)=>a+e.hours,0) > 0) streak++;
//     else if (i > 0) break;
//     d.setDate(d.getDate()-1);
//   }

//   document.getElementById('stToday').textContent = fmtH(todayH);
//   document.getElementById('stWeek').textContent = fmtH(weekH);
//   document.getElementById('stTotal').textContent = fmtH(totalH);
//   document.getElementById('stStreak').textContent = streak;

//   const pct = Math.min(Math.round((totalH / 180) * 100), 100);
//   const msg = todayH >= DAILY_GOAL
//     ? `<div class="motivation good"><i class="ti ti-circle-check" aria-hidden="true" style="margin-right:6px"></i><strong>Daily goal hit!</strong> ${fmtH(todayH)} studied today. Excellent consistency — band 8.5 is built session by session.</div>`
//     : todayH > 0
//     ? `<div class="motivation warn"><i class="ti ti-clock" aria-hidden="true" style="margin-right:6px"></i><strong>${fmtH(DAILY_GOAL - todayH)} more</strong> to hit today's 6h goal. Focus on your weakest IELTS skill next.</div>`
//     : `<div class="motivation start"><i class="ti ti-bolt" aria-hidden="true" style="margin-right:6px"></i><strong>Day ${31-daysLeft} of 30.</strong> Start with 90 min of your weakest skill. Momentum builds from the first session.</div>`;
//   document.getElementById('motivationBanner').innerHTML = msg;

//   drawSkillBars();
//   drawChart();
//   drawCalendar();
//   drawLog();
// }

// function drawSkillBars() {
//   const coreSkills = ['Listening','Reading','Writing Task 1','Writing Task 2','Speaking'];
//   const target = 8.5;
//   const scaleMin = 4, scaleMax = 9;

//   let barsHtml = '';
//   coreSkills.forEach(sk => {
//     const cur = scores[sk] || 6.0;
//     const fillPct = ((cur - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
//     const targetPct = ((target - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
//     const color = SKILL_COLORS[sk];
//     barsHtml += `<div class="skill-row">
//       <div class="skill-header">
//         <span class="skill-name" style="color:${color}"><i class="ti ti-chevron-right" aria-hidden="true" style="font-size:12px"></i>${sk}</span>
//         <span class="skill-score">${cur.toFixed(1)} <span style="color:var(--color-text-secondary);font-weight:400;font-size:11px">→ 8.5</span></span>
//       </div>
//       <div class="skill-track">
//         <div class="skill-fill" style="width:${fillPct}%;background:${color}">
//           <div class="skill-target-mark" style="left:${((target-cur)/(scaleMax-scaleMin)*100 / (fillPct/100)).toFixed(1)}%;display:none"></div>
//         </div>
//         <div style="position:absolute;top:0;left:${targetPct}%;width:2px;height:100%;background:rgba(214,90,48,0.6);pointer-events:none" title="Target 8.5"></div>
//       </div>
//     </div>`;
//   });
//   document.getElementById('skillBars').innerHTML = barsHtml;

//   let editHtml = '<div style="font-size:11px;color:var(--color-text-secondary);width:100%;margin-bottom:4px;">Update your estimated band scores as you improve:</div>';
//   coreSkills.forEach(sk => {
//     editHtml += `<div class="score-edit-item">
//       <label>${sk.replace('Writing Task ','W.T.')}</label>
//       <input type="number" min="1" max="9" step="0.5" value="${scores[sk]}" onchange="updateScore('${sk}',this.value)">
//     </div>`;
//   });
//   document.getElementById('scoreEdits').innerHTML = editHtml;
// }

// function updateScore(sk, val) {
//   scores[sk] = Math.min(9, Math.max(1, parseFloat(val) || 6));
//   save(); drawSkillBars();
// }

// function drawChart() {
//   if (chartInst) { chartInst.destroy(); chartInst = null; }
//   const ctx = document.getElementById('mainChart').getContext('2d');
//   const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
//   const tc = isDark ? '#888780' : '#5F5E5A';
//   const gc = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
//   document.getElementById('legendBox').innerHTML = '';

//   if (chartMode === 'daily') {
//     const dt = getDayTotals(14);
//     const labels = Object.keys(dt).map(d => { const [,m,day]=d.split('-'); return `${parseInt(m)}/${parseInt(day)}`; });
//     const data = Object.values(dt);
//     chartInst = new Chart(ctx, {
//       type: 'bar',
//       data: { labels, datasets: [
//         { label: 'Hours', data, backgroundColor: data.map(v => v >= DAILY_GOAL ? '#1D9E75' : '#7F77DD'), borderRadius: 4, barPercentage: 0.6 },
//         { label: 'Goal 6h', data: data.map(()=>DAILY_GOAL), type: 'line', borderColor: '#D85A30', borderDash:[5,3], borderWidth:1.5, pointRadius:0, fill:false }
//       ]},
//       options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
//         scales:{ x:{grid:{color:gc},ticks:{color:tc,font:{size:11},autoSkip:false,maxRotation:0}}, y:{grid:{color:gc},ticks:{color:tc,font:{size:11},callback:v=>v+'h'},beginAtZero:true,max:10} }
//       }
//     });
//     document.getElementById('legendBox').innerHTML = `<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#1D9E75;border-radius:2px"></span>Goal hit</span><span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#7F77DD;border-radius:2px"></span>Below goal</span><span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:16px;height:2px;background:#D85A30;margin-right:2px;border-top:2px dashed #D85A30;"></span>6h target</span>`;

//   } else if (chartMode === 'skill') {
//     const skillTotals = {};
//     SKILLS.forEach(s => skillTotals[s] = 0);
//     entries.forEach(e => { if (skillTotals[e.subject]!==undefined) skillTotals[e.subject] += e.hours; });
//     const labels = SKILLS.filter(s => skillTotals[s] > 0);
//     const data = labels.map(s => +skillTotals[s].toFixed(2));
//     const colors = labels.map(s => SKILL_COLORS[s]);
//     chartInst = new Chart(ctx, {
//       type: 'doughnut',
//       data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: isDark ? '#1a1a1a':'#fff' }] },
//       options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
//     });
//     const total = data.reduce((a,b)=>a+b,0);
//     document.getElementById('legendBox').innerHTML = labels.map((l,i)=>`<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:${colors[i]};border-radius:2px"></span>${l} ${total>0?(data[i]/total*100).toFixed(0)+'%':''}</span>`).join('');

//   } else {
//     const dt = getDayTotals(14);
//     const labels = Object.keys(dt).map(d => { const [,m,day]=d.split('-'); return `${parseInt(m)}/${parseInt(day)}`; });
//     const qMap = {1:[], 2:[], 3:[]};
//     Object.keys(dt).forEach(date => {
//       const dayEntries = entries.filter(e=>e.date===date);
//       [1,2,3].forEach(q => {
//         const hrs = dayEntries.filter(e=>e.quality===q).reduce((a,e)=>a+e.hours,0);
//         qMap[q].push(+hrs.toFixed(2));
//       });
//     });
//     chartInst = new Chart(ctx, {
//       type: 'bar',
//       data: { labels, datasets: [
//         { label: 'Struggled', data: qMap[1], backgroundColor: '#D85A30', borderRadius:2, stack:'q' },
//         { label: 'Good', data: qMap[2], backgroundColor: '#7F77DD', borderRadius:2, stack:'q' },
//         { label: 'Excellent', data: qMap[3], backgroundColor: '#1D9E75', borderRadius:2, stack:'q' }
//       ]},
//       options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
//         scales:{ x:{grid:{color:gc},ticks:{color:tc,font:{size:11},autoSkip:false,maxRotation:0},stacked:true}, y:{grid:{color:gc},ticks:{color:tc,font:{size:11},callback:v=>v+'h'},beginAtZero:true,stacked:true} }
//       }
//     });
//     document.getElementById('legendBox').innerHTML = `<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#1D9E75;border-radius:2px"></span>Excellent</span><span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#7F77DD;border-radius:2px"></span>Good</span><span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:#D85A30;border-radius:2px"></span>Struggled</span>`;
//   }
// }

// function drawCalendar() {
//   const container = document.getElementById('calGrid');
//   container.innerHTML = '';
//   const today = todayStr();
//   const examDs = examDate();
//   const dayTotals = {};
//   entries.forEach(e => { dayTotals[e.date] = (dayTotals[e.date]||0) + e.hours; });
//   const startDay = new Date(today); startDay.setDate(startDay.getDate() - 0);

//   for (let i = 0; i < 30; i++) {
//     const d = new Date(); d.setDate(d.getDate() + i);
//     const ds = d.toISOString().split('T')[0];
//     const hrs = dayTotals[ds] || 0;
//     const div = document.createElement('div');
//     div.className = 'cal-day';
//     div.title = ds === examDs ? `EXAM DAY` : `${ds}: ${fmtH(hrs)}`;
//     div.textContent = d.getDate();
//     if (ds === examDs) { div.style.background = '#BA7517'; div.style.color = '#FAC775'; div.style.borderColor = '#BA7517'; div.style.fontWeight = '500'; }
//     else if (ds === today) { div.classList.add('today-day'); }
//     else if (ds < today) {
//       if (hrs >= DAILY_GOAL) { div.style.background = '#1D9E75'; div.style.color = '#E1F5EE'; div.style.borderColor = '#0F6E56'; }
//       else if (hrs > 0) { const a = Math.min(0.25 + (hrs/DAILY_GOAL)*0.7,1); div.style.background = `rgba(127,119,221,${a.toFixed(2)})`; div.style.color = a>0.5?'#EEEDFE':'#534AB7'; div.style.borderColor='#7F77DD'; }
//       else { div.style.opacity = '0.5'; }
//     }
//     container.appendChild(div);
//   }
// }

// function drawLog() {
//   const area = document.getElementById('logArea');
//   const sorted = [...entries].sort((a,b)=>b.date.localeCompare(a.date));
//   if (!sorted.length) { area.innerHTML = '<div style="text-align:center;color:var(--color-text-secondary);font-size:13px;padding:1.5rem">No sessions yet — log your first one above!</div>'; return; }
//   const qLabel = {1:'Struggled',2:'Good',3:'Excellent'};
//   const qColor = {1:'#D85A30',2:'#7F77DD',3:'#1D9E75'};
//   let html = '<table class="log-table"><thead><tr><th>Date</th><th>Skill</th><th>Duration</th><th>Quality</th><th>Tip</th><th></th></tr></thead><tbody>';
//   sorted.slice(0,15).forEach((e,i) => {
//     const orig = entries.indexOf(e);
//     const c = SKILL_COLORS[e.subject] || '#888780';
//     const q = e.quality || 2;
//     html += `<tr>
//       <td style="font-size:12px;color:var(--color-text-secondary)">${e.date}</td>
//       <td><span class="badge" style="background:${c}22;color:${c};border:0.5px solid ${c}44">${e.subject}</span></td>
//       <td style="font-weight:500">${fmtH(e.hours)}</td>
//       <td><span class="badge" style="background:${qColor[q]}22;color:${qColor[q]};border:0.5px solid ${qColor[q]}44">${qLabel[q]}</span></td>
//       <td style="font-size:11px;color:var(--color-text-secondary);max-width:160px">${SKILL_TIPS[e.subject]||''}</td>
//       <td><button class="del-btn" onclick="deleteEntry(${orig})" aria-label="Delete"><i class="ti ti-trash" aria-hidden="true"></i></button></td>
//     </tr>`;
//   });
//   html += '</tbody></table>';
//   area.innerHTML = html;
// }
// ── Config ────────────────────────────────────────────────────────────
const DAILY_GOAL = 6;
const EXAM_DAYS_FROM_TODAY = 30;

const SKILLS = [
  'Listening', 'Reading', 'Writing Task 1',
  'Writing Task 2', 'Speaking', 'Vocabulary',
  'Grammar', 'Full Mock Test'
];

const SKILL_COLORS = {
  'Listening':      '#378ADD',
  'Reading':        '#1D9E75',
  'Writing Task 1': '#7F77DD',
  'Writing Task 2': '#534AB7',
  'Speaking':       '#D85A30',
  'Vocabulary':     '#BA7517',
  'Grammar':        '#D4537E',
  'Full Mock Test': '#888780'
};

const SKILL_TIPS = {
  'Listening':      'Predict answers before audio plays. Write while listening.',
  'Reading':        'True/False/NG — "Not Given" = info absent, not contradicted.',
  'Writing Task 1': 'Always include an overview. Describe trends, not every data point.',
  'Writing Task 2': 'Clear thesis + 2 developed body paragraphs + real conclusion.',
  'Speaking':       'Never one-word answers. Extend: "What I mean is…", "For instance…"',
  'Vocabulary':     'Learn collocations, not just words. Aim for C1/C2 range.',
  'Grammar':        'Show range: complex sentences, conditionals, passives.',
  'Full Mock Test': 'Simulate real conditions: timed, no breaks. Analyse errors after.'
};

// ── State ─────────────────────────────────────────────────────────────
let entries = [];
let scores  = {
  'Listening': 6.0, 'Reading': 6.0,
  'Writing Task 1': 6.0, 'Writing Task 2': 6.0, 'Speaking': 6.0
};
let chartMode    = 'daily';
let chartInstance = null;

// ── Persistence ───────────────────────────────────────────────────────
function saveData() {
  try {
    localStorage.setItem('ieltsTracker', JSON.stringify({ entries, scores }));
  } catch (e) {}
}

function loadData() {
  try {
    const raw = localStorage.getItem('ieltsTracker');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    entries = parsed.entries || [];
    scores  = parsed.scores  || scores;
  } catch (e) {}
}

// ── Helpers ───────────────────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function examDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + EXAM_DAYS_FROM_TODAY);
  return d.toISOString().split('T')[0];
}

function fmtH(h) {
  const hrs  = Math.floor(h);
  const mins = Math.round((h - hrs) * 60);
  if (hrs === 0) return `${mins}m`;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

function getDayTotals(days) {
  const map   = {};
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d  = new Date(today);
    d.setDate(today.getDate() - i);
    map[d.toISOString().split('T')[0]] = 0;
  }
  entries.forEach(e => {
    if (e.date in map) map[e.date] += e.hours;
  });
  return map;
}

// ── Init ──────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  loadData();
  document.getElementById('inDate').value = todayStr();
  render();
});

// ── Add entry ─────────────────────────────────────────────────────────
function addEntry() {
  const date    = document.getElementById('inDate').value;
  const subject = document.getElementById('inSubject').value;
  const hours   = parseFloat(document.getElementById('inHours').value);
  const quality = parseInt(document.getElementById('inQuality').value);

  if (!date) {
    alert('Please select a date.'); return;
  }
  if (isNaN(hours) || hours <= 0) {
    alert('Please enter valid hours greater than 0.'); return;
  }

  entries.push({ date, subject, hours: +hours.toFixed(2), quality });
  saveData();
  render();

  document.getElementById('inHours').value   = '';
  document.getElementById('inSubject').selectedIndex = 0;
  document.getElementById('inQuality').value = '2';
}

// ── Delete ────────────────────────────────────────────────────────────
function deleteEntry(index) {
  if (!confirm('Remove this session?')) return;
  entries.splice(index, 1);
  saveData();
  render();
}

// ── Tab switch ────────────────────────────────────────────────────────
function setTab(mode, btn) {
  chartMode = mode;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  drawChart();
}

// ── Score edit ────────────────────────────────────────────────────────
function updateScore(skill, val) {
  scores[skill] = Math.min(9, Math.max(1, parseFloat(val) || 6));
  saveData();
  drawSkillBars();
}

// ── Main render ───────────────────────────────────────────────────────
function render() {
  const today = todayStr();

  // Days left
  const daysLeft = Math.max(0,
    Math.ceil((new Date(examDateStr()) - new Date(today)) / 86400000)
  );
  document.getElementById('daysLeft').textContent = daysLeft;
  document.getElementById('heroSub').textContent  = daysLeft > 0
    ? `${daysLeft} days to push 1.5 bands. Every session counts.`
    : 'Exam day — good luck!';

  // Stats
  const todayH = entries
    .filter(e => e.date === today)
    .reduce((a, e) => a + e.hours, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekStr = weekAgo.toISOString().split('T')[0];
  const weekH   = entries
    .filter(e => e.date >= weekStr)
    .reduce((a, e) => a + e.hours, 0);

  const totalH = entries.reduce((a, e) => a + e.hours, 0);

  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 60; i++) {
    const ds  = d.toISOString().split('T')[0];
    const hrs = entries
      .filter(e => e.date === ds)
      .reduce((a, e) => a + e.hours, 0);
    if (hrs > 0) streak++;
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }

  document.getElementById('stToday').textContent  = fmtH(todayH);
  document.getElementById('stWeek').textContent   = fmtH(weekH);
  document.getElementById('stTotal').textContent  = fmtH(totalH);
  document.getElementById('stStreak').textContent = streak;

  // Motivation banner
  let msg = '', cls = '';
  if (todayH >= DAILY_GOAL) {
    msg = `<strong>Daily goal hit!</strong> ${fmtH(todayH)} studied today. Excellent consistency — band 8.5 is built session by session.`;
    cls = 'good';
  } else if (todayH > 0) {
    msg = `<strong>${fmtH(DAILY_GOAL - todayH)} more</strong> to hit today's 6h goal. Focus on your weakest IELTS skill next.`;
    cls = 'warn';
  } else {
    msg = `<strong>Day ${31 - daysLeft} of 30.</strong> Start with 90 min of your weakest skill. Momentum builds from the first session.`;
    cls = 'start';
  }
  document.getElementById('motivationBanner').innerHTML =
    `<div class="motivation ${cls}">${msg}</div>`;

  drawSkillBars();
  drawChart();
  drawCalendar();
  drawLog();
}

// ── Skill bars ────────────────────────────────────────────────────────
function drawSkillBars() {
  const coreSkills = ['Listening', 'Reading', 'Writing Task 1', 'Writing Task 2', 'Speaking'];
  const scaleMin   = 4;
  const scaleMax   = 9;
  const target     = 8.5;

  let barsHtml = '';
  coreSkills.forEach(sk => {
    const cur        = scores[sk] || 6.0;
    const fillPct    = ((cur - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
    const targetPct  = ((target - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
    const color      = SKILL_COLORS[sk];

    barsHtml += `
      <div class="skill-row">
        <div class="skill-header">
          <span class="skill-name" style="color:${color}">
            <i class="ti ti-chevron-right" style="font-size:12px"></i>${sk}
          </span>
          <span class="skill-score">
            ${cur.toFixed(1)} <span>→ 8.5</span>
          </span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" style="width:${fillPct}%;background:${color}"></div>
          <div style="position:absolute;top:0;left:${targetPct}%;width:2px;height:100%;
               background:rgba(214,90,48,0.7)" title="Target 8.5"></div>
        </div>
      </div>`;
  });
  document.getElementById('skillBars').innerHTML = barsHtml;

  let editHtml = `<div style="font-size:11px;color:#888;width:100%;margin-bottom:6px">
    Update your estimated band score as you improve:
  </div>`;
  coreSkills.forEach(sk => {
    editHtml += `
      <div class="score-edit-item">
        <label>${sk.replace('Writing Task ', 'W.T.')}</label>
        <input type="number" min="1" max="9" step="0.5"
               value="${scores[sk]}"
               onchange="updateScore('${sk}', this.value)" />
      </div>`;
  });
  document.getElementById('scoreEdits').innerHTML = editHtml;
}

// ── Chart ─────────────────────────────────────────────────────────────
function drawChart() {
  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  const ctx  = document.getElementById('mainChart').getContext('2d');
  const tc   = '#888';
  const gc   = 'rgba(0,0,0,0.05)';
  document.getElementById('legendBox').innerHTML = '';

  if (chartMode === 'daily') {
    const dt     = getDayTotals(14);
    const labels = Object.keys(dt).map(d => {
      const [, m, day] = d.split('-');
      return `${parseInt(m)}/${parseInt(day)}`;
    });
    const data   = Object.values(dt);

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Hours',
            data,
            backgroundColor: data.map(v => v >= DAILY_GOAL ? '#1D9E75' : '#7F77DD'),
            borderRadius: 4,
            barPercentage: 0.6
          },
          {
            label: 'Goal 6h',
            data: data.map(() => DAILY_GOAL),
            type: 'line',
            borderColor: '#D85A30',
            borderDash: [5, 3],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, autoSkip: false, maxRotation: 0 } },
          y: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, callback: v => v + 'h' }, beginAtZero: true, max: 10 }
        }
      }
    });

    document.getElementById('legendBox').innerHTML = `
      <span><span class="dot" style="background:#1D9E75;border-radius:3px"></span>Goal hit</span>
      <span><span class="dot" style="background:#7F77DD;border-radius:3px"></span>Below goal</span>
      <span><span class="legend-line"></span>6h target</span>`;

  } else if (chartMode === 'skill') {
    const skillTotals = {};
    SKILLS.forEach(s => (skillTotals[s] = 0));
    entries.forEach(e => {
      if (skillTotals[e.subject] !== undefined) skillTotals[e.subject] += e.hours;
    });
    const labels = SKILLS.filter(s => skillTotals[s] > 0);
    const data   = labels.map(s => +skillTotals[s].toFixed(2));
    const colors = labels.map(s => SKILL_COLORS[s]);

    if (!data.length) {
      document.getElementById('mainChart').style.display = 'none';
      document.getElementById('legendBox').innerHTML = '<span style="color:#aaa;font-size:13px">No sessions logged yet — add your first session above.</span>';
      return;
    }
    document.getElementById('mainChart').style.display = '';

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    const total = data.reduce((a, b) => a + b, 0);
    document.getElementById('legendBox').innerHTML = labels.map((l, i) =>
      `<span>
         <span class="dot" style="background:${colors[i]};border-radius:3px"></span>
         ${l} — ${fmtH(data[i])} (${total > 0 ? (data[i] / total * 100).toFixed(0) : 0}%)
       </span>`
    ).join('');

  } else {
    // quality stacked bar
    const dt     = getDayTotals(14);
    const labels = Object.keys(dt).map(d => {
      const [, m, day] = d.split('-');
      return `${parseInt(m)}/${parseInt(day)}`;
    });
    const qMap   = { 1: [], 2: [], 3: [] };

    Object.keys(dt).forEach(date => {
      const dayE = entries.filter(e => e.date === date);
      [1, 2, 3].forEach(q => {
        qMap[q].push(
          +dayE.filter(e => e.quality === q).reduce((a, e) => a + e.hours, 0).toFixed(2)
        );
      });
    });

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Struggled', data: qMap[1], backgroundColor: '#D85A30', borderRadius: 2, stack: 'q' },
          { label: 'Good',      data: qMap[2], backgroundColor: '#7F77DD', borderRadius: 2, stack: 'q' },
          { label: 'Excellent', data: qMap[3], backgroundColor: '#1D9E75', borderRadius: 2, stack: 'q' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, autoSkip: false, maxRotation: 0 }, stacked: true },
          y: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 }, callback: v => v + 'h' }, beginAtZero: true, stacked: true }
        }
      }
    });

    document.getElementById('legendBox').innerHTML = `
      <span><span class="dot" style="background:#1D9E75;border-radius:3px"></span>Excellent</span>
      <span><span class="dot" style="background:#7F77DD;border-radius:3px"></span>Good</span>
      <span><span class="dot" style="background:#D85A30;border-radius:3px"></span>Struggled</span>`;
  }
}

// ── Calendar ──────────────────────────────────────────────────────────
function drawCalendar() {
  const container = document.getElementById('calGrid');
  container.innerHTML = '';

  const today   = todayStr();
  const examDs  = examDateStr();
  const totals  = {};
  entries.forEach(e => {
    totals[e.date] = (totals[e.date] || 0) + e.hours;
  });

  for (let i = 0; i < 30; i++) {
    const d  = new Date();
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().split('T')[0];
    const hrs = totals[ds] || 0;

    const div = document.createElement('div');
    div.className = 'cal-day';
    div.title     = ds === examDs ? 'EXAM DAY' : `${ds}: ${fmtH(hrs)}`;
    div.textContent = d.getDate();

    if (ds === examDs) {
      div.style.background   = '#BA7517';
      div.style.color        = '#FAC775';
      div.style.borderColor  = '#BA7517';
      div.style.fontWeight   = '700';
    } else if (ds === today) {
      div.classList.add('today-marker');
    } else if (ds < today) {
      if (hrs >= DAILY_GOAL) {
        div.style.background  = '#1D9E75';
        div.style.color       = '#E1F5EE';
        div.style.borderColor = '#0F6E56';
      } else if (hrs > 0) {
        const alpha = Math.min(0.25 + (hrs / DAILY_GOAL) * 0.7, 1);
        div.style.background  = `rgba(127,119,221,${alpha.toFixed(2)})`;
        div.style.color       = alpha > 0.5 ? '#EEEDFE' : '#534AB7';
        div.style.borderColor = '#7F77DD';
      } else {
        // past day, nothing logged
        div.style.opacity = '0.45';
      }
    }

    container.appendChild(div);
  }
}

// ── Session log ───────────────────────────────────────────────────────
function drawLog() {
  const area = document.getElementById('logArea');

  if (!entries.length) {
    area.innerHTML = `
      <div class="empty-state">
        <i class="ti ti-notebook"></i>
        No sessions logged yet.<br>Use the form above to add your first study session.
      </div>`;
    return;
  }

  const sorted  = [...entries].map((e, i) => ({ ...e, origIndex: i }))
                               .sort((a, b) => b.date.localeCompare(a.date));

  const qLabel  = { 1: 'Struggled', 2: 'Good', 3: 'Excellent' };
  const qColor  = { 1: '#D85A30',   2: '#7F77DD', 3: '#1D9E75' };

  let html = `
    <table class="log-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Skill</th>
          <th>Duration</th>
          <th>Quality</th>
          <th>Tip</th>
          <th></th>
        </tr>
      </thead>
      <tbody>`;

  sorted.slice(0, 20).forEach(e => {
    const c = SKILL_COLORS[e.subject] || '#888';
    const q = e.quality || 2;
    html += `
      <tr>
        <td style="font-size:12px;color:#888">${e.date}</td>
        <td>
          <span class="badge"
            style="background:${c}22;color:${c};border:1px solid ${c}44">
            ${e.subject}
          </span>
        </td>
        <td style="font-weight:600">${fmtH(e.hours)}</td>
        <td>
          <span class="badge"
            style="background:${qColor[q]}22;color:${qColor[q]};border:1px solid ${qColor[q]}44">
            ${qLabel[q]}
          </span>
        </td>
        <td style="font-size:11px;color:#888;max-width:180px">
          ${SKILL_TIPS[e.subject] || ''}
        </td>
        <td>
          <button class="del-btn" onclick="deleteEntry(${e.origIndex})"
                  title="Remove session">
            <i class="ti ti-trash"></i>
          </button>
        </td>
      </tr>`;
  });

  html += `</tbody></table>`;
  area.innerHTML = html;
}