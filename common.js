/* Shared helpers — 543-MP build */
function partyColor(mp){ return (PARTY_COLORS[mp.party] || "#64748b"); }
function crore(inr){ return (inr===null||inr===undefined)? null : inr/1e7; }
function fmtCrore(inr){
  const c=crore(inr); if(c===null) return "N/A";
  if(c>=1) return "₹"+c.toLocaleString("en-IN",{maximumFractionDigits:2})+" Cr";
  return "₹"+(inr/1e5).toLocaleString("en-IN",{maximumFractionDigits:1})+" L";
}
function fmtNum(n){ return (n===null||n===undefined)?"N/A":n.toLocaleString("en-IN"); }
function median(nums){ const a=nums.filter(n=>n!=null).slice().sort((x,y)=>x-y); if(!a.length) return null; const m=Math.floor(a.length/2); return a.length%2?a[m]:(a[m-1]+a[m])/2; }
function mean(nums){ const a=nums.filter(n=>n!=null); return a.length?a.reduce((s,n)=>s+n,0)/a.length:null; }
function initials(name){ const p=(name||"").trim().split(/\s+/); return ((p[0]?.[0]||"")+(p[p.length-1]?.[0]||"")).toUpperCase(); }

/* ---------- Photos: baked (prominent) + live Wikipedia resolution ---------- */
const PHOTO_CACHE = {};
/* persist resolved photo URLs across pages/visits so they load instantly next time */
try{ Object.assign(PHOTO_CACHE, JSON.parse(localStorage.getItem("loklens_photos")||"{}")); }catch(e){}
let _photoSaveT=null;
function _savePhotos(){ try{ clearTimeout(_photoSaveT); _photoSaveT=setTimeout(function(){ try{ localStorage.setItem("loklens_photos", JSON.stringify(PHOTO_CACHE)); }catch(e){} }, 500); }catch(e){} }
function photoOf(mp){
  if(PHOTO_CACHE[mp.id]) return PHOTO_CACHE[mp.id];
  if(typeof PHOTOS!=="undefined" && PHOTOS[mp.id]) return PHOTOS[mp.id];
  return mp.photo_url || null;
}
function avatarHTML(mp, px){
  const col=partyColor(mp), ini=initials(mp.name);
  const box=`width:${px}px;height:${px}px;font-size:${Math.round(px*0.36)}px;background:${col}`;
  const src=photoOf(mp);
  const inner = src
    ? `<img src="${src}" alt="${mp.name}" loading="lazy" onerror="this.parentNode.classList.add('noimg');this.remove();this.parentNode.textContent='${ini}';">`
    : ini;
  return `<span class="av" data-id="${mp.id}" style="${box}">${inner}</span>`;
}
const _normT=s=>(s||"").toLowerCase().replace(/_/g," ").trim();
function _setImg(id, src){
  document.querySelectorAll('.av[data-id="'+(window.CSS&&CSS.escape?CSS.escape(id):id)+'"]').forEach(function(sp){
    if(sp.querySelector('img')) return;
    const ini=initials(sp.textContent);
    sp.innerHTML='<img src="'+src+'" alt="" loading="lazy" decoding="async" onerror="this.parentNode.textContent=\''+ini+'\';">';
  });
}
async function hydratePhotos(list){
  const need=list.filter(m=>!photoOf(m) && m.wiki_title);
  if(!need.length) return;
  const t2id={}; need.forEach(m=>{ t2id[_normT(m.wiki_title)]=m.id; });
  const titles=[...new Set(need.map(m=>m.wiki_title))];
  const batches=[]; for(let i=0;i<titles.length;i+=50) batches.push(titles.slice(i,i+50));
  // fetch all batches in PARALLEL, smaller thumbnails, then persist
  await Promise.all(batches.map(async function(batch){
    const url="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=200&titles="+encodeURIComponent(batch.join("|"));
    try{
      const j=await fetch(url).then(r=>r.json());
      const nm={}; (j.query.normalized||[]).forEach(n=>nm[_normT(n.to)]=_normT(n.from));
      const rd={}; (j.query.redirects||[]).forEach(n=>rd[_normT(n.to)]=_normT(n.from));
      Object.values(j.query.pages||{}).forEach(function(p){
        if(!p.thumbnail) return;
        let k=_normT(p.title);
        if(rd[k]!==undefined) k=rd[k];
        if(nm[k]!==undefined) k=nm[k];
        const id=t2id[k]; if(!id) return;
        PHOTO_CACHE[id]=p.thumbnail.source;
        _setImg(id, p.thumbnail.source);
      });
    }catch(e){ /* offline / blocked → keep initials */ }
  }));
  _savePhotos();
}

/* ---------- Analytics ---------- */
const CASE_CATEGORIES=[
  {key:"Defamation",re:/\b499\b|\b500\b|defamation/i},
  {key:"Promoting enmity / hate speech",re:/153a|295a|\b505\b|enmity|religious feeling/i},
  {key:"Sedition",re:/124a|sedition/i},
  {key:"Corruption / money laundering",re:/pmla|money[- ]laundering|prevention of corruption|\bcorruption\b|enforcement directorate|\b409\b/i},
  {key:"Cheating / fraud",re:/\b420\b|cheating/i},
  {key:"Forgery",re:/\b467\b|\b468\b|\b471\b|\b469\b|\b465\b|477a|forgery/i},
  {key:"Criminal intimidation",re:/\b506\b|intimidation/i},
  {key:"Criminal conspiracy",re:/120b|conspiracy/i},
  {key:"Public order / rioting",re:/\b143\b|\b147\b|\b148\b|\b149\b|\b188\b|\b283\b|\b353\b|\b332\b|\b333\b|\b427\b|\b436\b|rioting|unlawful assembly|public property/i},
];
function caseCategories(mp){ const t=mp.criminal_summary||""; if(!(mp.criminal_cases>0))return []; return CASE_CATEGORIES.filter(c=>c.re.test(t)).map(c=>c.key); }

const FOREIGN_EDU=/harvard|stanford|oxford|cambridge|tufts|fletcher|new york university|\bnyu\b|university of texas|texas at austin|berkeley|mount holyoke|sunderland|johnson & wales|lincoln'?s inn|inner temple|warwick|rollins|london|\busa\b|united states|united kingdom/i;
function hasDetailedEdu(mp){ return (mp.education||"").length>22 || mp.rich; }
function studiedAbroad(mp){ return hasDetailedEdu(mp) && FOREIGN_EDU.test(mp.education||""); }

const OCC_LABEL={actor:"Actor",film:"Film industry",lawyer:"Lawyer",doctor:"Doctor",physician:"Physician",engineer:"Engineer",businessperson:"Businessperson",farmer:"Farmer / agriculturist",teacher:"Teacher",professor:"Professor",journalist:"Journalist",author:"Author",sportsperson:"Sportsperson",activist:"Activist",civilservant:"Civil servant","civil-servant":"Civil servant",royalty:"Royalty / erstwhile royal",economist:"Economist"};
function occTags(mp){ return (mp.occupation_tags||[]).filter(t=>t&&t!=="politician"); }
function occLabel(t){ return OCC_LABEL[t]||t.charAt(0).toUpperCase()+t.slice(1); }

function hasSpouse(mp){ return (mp.family||[]).some(f=>/spouse/i.test(f.relation||"")); }
function hasChildren(mp){ return (mp.family||[]).some(f=>/\b(son|daughter|child|children)/i.test((f.relation||""))); }
const DYNASTY_RE=/chief minister|prime minister|union minister|\bminister\b|member of parliament|\bmp\b|founder|president of|governor|\bmla\b|maharaj|royal family|patriarch|rajmata/i;
function isDynasty(mp){ return (mp.family||[]).some(f=>DYNASTY_RE.test(f.detail||"")); }
const REL_EDU_RE=/college|university|graduate|harvard|oxford|cambridge|\biit\b|\biim\b|professor|studied|alumni|mbbs|degree|school of|air hostess/i;
function relativeEduKnown(mp){ return (mp.family||[]).some(f=>REL_EDU_RE.test(f.detail||"")); }

/* Children / grandchildren education, India vs abroad (only where reported) */
function childEduRecords(){
  const recs=[];
  MPS.forEach(m=>{
    (m.family||[]).forEach(f=>{
      const rel=(f.relation||"").toLowerCase();
      if(!/son|daughter|child|grandchild|grand/.test(rel)) return;
      const d=f.detail||"";
      const eduRe=/college|university|graduate|harvard|oxford|cambridge|\biit\b|\biim\b|professor|studied|alumni|mbbs|degree|school of|\bschool\b|\bclass\s?1?\d|b\.?tech|engineer|academy|army|air force|navy|\bimf\b|evercore/i;
      if(!eduRe.test(d)) return;
      const place = FOREIGN_EDU.test(d) || /\bimf\b|evercore|abroad|\bus\b|\buk\b|foreign/i.test(d) ? "Abroad" : "India";
      recs.push({mp:m, relation:f.relation, name:f.name, detail:d, place});
    });
  });
  return recs;
}
