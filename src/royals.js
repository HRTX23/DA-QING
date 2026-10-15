// Visual designs for the established royal roster. Biography remains in world.js.
export const ROYAL_ART = {
  'หงจิ้น': {file:'hongjin', color:'#dfbd65', note:'ฉลองพระองค์สีทอง · จักรพรรดิวัยเยาว์'},
  'หลิงอัน': {file:'lingan', color:'#657589', note:'ฉลองพระองค์กรมท่า · ผู้สำเร็จราชการ'},
  'เย่วหลาน': {file:'yue-lan', color:'#d5a391', note:'ฉลองพระองค์สีพีช · พระมารดา'},
  'เฉิงอู่': {file:'chengwu', color:'#b99c66', note:'ฉลองพระองค์ทองหม่น · ไท่ซ่างหวง'},
  'ฟู่ฉาจิ้งหรง': {file:'jingrong', color:'#9e666a', note:'ฉลองพระองค์แดงเข้ม · ฮองเฮา'},
  'หลิงเซวียน': {file:'lingxuan', color:'#7d967e', note:'ฉลองพระองค์เขียวเข้ม · พระราชโอรส'},
  'หลิงเยี่ยน': {file:'lingyan-v4', color:'#9a839e', note:'ฉลองพระองค์ม่วงพลัมขลิบเงินลายไผ่ · พระราชโอรส'},
  'หลิงฮวา': {file:'linghua', color:'#c798a2', note:'ฉลองพระองค์ชมพูกุหลาบ · พระราชธิดา'},
  'หลิงอวี้': {file:'lingyu', color:'#a79ab9', note:'ฉลองพระองค์ม่วงอ่อน · พระราชธิดา'}
};

export function royalGallery(people, esc) {
  const royals = people.filter(p=>ROYAL_ART[p.name]);
  const staff = people.filter(p=>!ROYAL_ART[p.name]);
  return `<div class="royal-intro"><div><span class="royal-kicker">THE IMPERIAL FAMILY</span><h2>ทะเบียนพระราชวงศ์</h2><p>ครอบครัวแห่งราชวงศ์ชิง · 21 ตุลาคม ค.ศ. 1948</p></div><span class="royal-count">${royals.length} พระองค์</span></div>
  <div class="royal-grid">${royals.map(p=>{
    const art=ROYAL_ART[p.name];
    return `<article class="royal-card" style="--royal-accent:${art.color}"><button class="royal-picture" data-portrait="${esc(p.name)}" aria-label="ดูภาพเต็มตัว ${esc(p.name)}"><img src="./assets/${art.file}.png" alt="ภาพตัวละคร ${esc(p.name)} ${esc(art.note)}" loading="lazy"><span>ดูภาพเต็มตัว ↗</span></button><div class="royal-bio"><div class="tag">${esc(p.role)}</div><h3>${esc(p.name)}</h3><p>${esc(p.detail)}</p></div></article>`;
  }).join('')}</div>
  <p class="hint">ภาพออกแบบตัวละครสำหรับเกมประวัติศาสตร์ทางเลือก · แตะภาพเพื่อดูรายละเอียดและภาพเต็มตัว</p>
  <h2 class="staff-title">บุคลากรราชสำนัก</h2><div class="cards">${staff.map(p=>`<article class="card"><div class="tag">${esc(p.role)}</div><h3>${esc(p.name)}</h3><p>${esc(p.detail)}</p></article>`).join('')}</div>
  <p class="hint">ข้อมูลวันประสูติที่ยังไม่กำหนดจะไม่ถูกแต่งขึ้นเอง · พระสนมทั้งสี่และรายละเอียดฐานันดรที่ยังไม่กำหนดอยู่ระหว่างจัดทำทะเบียน</p>
  <dialog class="royal-dialog" id="royal-dialog" aria-label="รายละเอียดตัวละครราชวงศ์"><button class="royal-close" aria-label="ปิดภาพตัวละคร">ปิด ×</button><div id="royal-detail"></div></dialog>`;
}

export function bindRoyalGallery(people, esc) {
  const modal=document.getElementById('royal-dialog');
  if(!modal)return;
  document.querySelectorAll('[data-portrait]').forEach(button=>button.addEventListener('click',()=>{
    const person=people.find(p=>p.name===button.dataset.portrait);
    const art=ROYAL_ART[person?.name];
    if(!art)return;
    document.getElementById('royal-detail').innerHTML=`<div class="royal-full-art" style="--royal-accent:${art.color}"><img src="./assets/${art.file}.png" alt="ภาพเต็มตัว ${esc(person.name)}"></div><div class="royal-full-bio"><div class="royal-kicker">DA QING · CHARACTER DESIGN</div><h2>${esc(person.name)}</h2><div class="tag">${esc(person.role)}</div><p>${esc(person.detail)}</p><small>${esc(art.note)}</small></div>`;
    modal.showModal();
  }));
  modal.querySelector('.royal-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
}
