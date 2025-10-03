
const CONFIG = {
  brandName: "Canadian Cardinal",
  brandTagline: "Timeless design. Reliable quality.",
  email: "info@canadiancardinal.com",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  catalogUrl: "catalogs/CanadianCardinal_LineSheet.pdf",
  locale: "en",
};

const PRODUCTS = [
  { id:"CC-001", name:"Aviator Classic 58", category:"Sunglasses", shape:"Aviator", material:"Stainless Steel", lens:"Polarized, UV400", color:"Gunmetal / Smoke", sku:"CC-S-AV-58-GM", images:["assets/images/placeholder.svg"], notes:"Lightweight frame, adjustable nose pads."},
  { id:"CC-002", name:"Round Acetate 47", category:"Optical", shape:"Round", material:"Acetate", lens:"Demo Lens", color:"Black / Tortoise", sku:"CC-O-RD-47-BK", images:["assets/images/placeholder.svg"], notes:"Keyhole bridge; spring hinges."},
  { id:"CC-003", name:"Square Workday 52", category:"Sunglasses", shape:"Square", material:"Acetate", lens:"UV400", color:"Matte Navy", sku:"CC-S-SQ-52-NV", images:["assets/images/placeholder.svg"], notes:"Balanced fit and dependable build."}
];

const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));
const state = { category:"All", shape:"All", material:"All", query:"" };

function uniqueValues(key){ return ["All", ...Array.from(new Set(PRODUCTS.map(p=>p[key]))).sort()]; }
function setupFilters(){
  const cat=$("#filter-category"), sh=$("#filter-shape"), mt=$("#filter-material");
  uniqueValues("category").forEach(v=>cat.append(new Option(v,v)));
  uniqueValues("shape").forEach(v=>sh.append(new Option(v,v)));
  uniqueValues("material").forEach(v=>mt.append(new Option(v,v)));
  cat.onchange=e=>{state.category=e.target.value; renderProducts();};
  sh.onchange=e=>{state.shape=e.target.value; renderProducts();};
  mt.onchange=e=>{state.material=e.target.value; renderProducts();};
  $("#search").oninput=e=>{state.query=e.target.value.trim().toLowerCase(); renderProducts();};
}
function matchesFilters(p){
  if(state.category!=="All" && p.category!==state.category) return false;
  if(state.shape!=="All" && p.shape!==state.shape) return false;
  if(state.material!=="All" && p.material!==state.material) return false;
  const q=state.query; if(!q) return true;
  const hay=[p.name,p.id,p.shape,p.material,p.color,p.lens,p.sku,p.notes].join(" ").toLowerCase();
  return hay.includes(q);
}
function buildWhatsAppURL(p){
  if(!CONFIG.whatsapp){
    const subject=encodeURIComponent(`Product inquiry: ${p.name} (${p.id})`);
    const body=encodeURIComponent(`Hello Canadian Cardinal team,\nI'm interested in: ${p.name} (${p.id}).\nPlease send pricing, MOQ, and lead times.\n\nThank you.`);
    return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }
  const msg=`Hello Canadian Cardinal team,%0AI'm interested in: ${p.name} (${p.id}).%0APlease send pricing, MOQ, and lead times.`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
}
function openModal(imgs){
  const backdrop=$("#modal"); const img=$("#modal-image"); let idx=0;
  function show(i){ img.src=imgs[i]; }
  show(idx); backdrop.classList.add("active");
  $("#modal-prev").onclick=()=>{ idx=(idx-1+imgs.length)%imgs.length; show(idx); };
  $("#modal-next").onclick=()=>{ idx=(idx+1)%imgs.length; show(idx); };
  $("#modal-close").onclick=()=>backdrop.classList.remove("active");
  backdrop.onclick=e=>{ if(e.target===backdrop) backdrop.classList.remove("active"); };
}
function renderProducts(){
  const grid=$("#product-grid"); grid.innerHTML="";
  const filtered=PRODUCTS.filter(matchesFilters);
  if(!filtered.length){ grid.innerHTML=`<div class="text-center text-slate-500 col-span-full py-10">No products found. Try clearing filters.</div>`; return; }
  filtered.forEach(p=>{
    const card=document.createElement("div"); card.className="product-card bg-white rounded-2xl shadow p-4 flex flex-col";
    card.innerHTML=`
      <div class="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden mb-3">
        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover cursor-pointer" data-imgs='${JSON.stringify(p.images)}'>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold">${p.name}</h3>
        <p class="text-sm text-slate-600 mt-1">${p.category} • ${p.shape} • ${p.material}</p>
        <p class="text-sm text-slate-500 mt-1">${p.color||""}</p>
        <p class="text-xs text-slate-400 mt-1">SKU: ${p.sku}</p>
      </div>
      <div class="mt-4 flex gap-2">
        <a class="flex-1 text-center rounded-full px-4 py-2 btn-brand" href="${buildWhatsAppURL(p)}" target="_blank" rel="noopener">Request Quote</a>
        <button class="rounded-full px-4 py-2 btn-outline-brand border" onclick='openModal(${JSON.stringify(p.images)})'>View</button>
      </div>`;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  $$(".js-brand-name").forEach(el=> el.textContent = CONFIG.brandName);
  if(CONFIG.instagram){ $("#insta").href=CONFIG.instagram; $("#insta").classList.remove("hidden"); }
  if(CONFIG.linkedin){ $("#li").href=CONFIG.linkedin; $("#li").classList.remove("hidden"); }
  $("#catalog-link").href = CONFIG.catalogUrl;
  setupFilters(); renderProducts();
});
