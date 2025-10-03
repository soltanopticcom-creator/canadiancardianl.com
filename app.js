
// ====== CONFIG ======
const CONFIG = {
  brandName: "Canadian Cardinal",
  brandTagline: "Timeless design. Reliable quality.",
  email: "info@canadiancardinal.com",              // change to your real email
  whatsapp: "",                                     // e.g., "14165551234" in international format without '+'
  instagram: "",                                    // optional
  linkedin: "",                                     // optional
  catalogUrl: "catalogs/CanadianCardinal_LineSheet.pdf", // replace with your real PDF when ready
  locale: "en",
};

// ====== PRODUCTS (sample data, edit freely) ======
const PRODUCTS = [
  {
    id: "CC-001",
    name: "Aviator Classic 58",
    category: "Sunglasses",
    shape: "Aviator",
    material: "Stainless Steel",
    lens: "Polarized, UV400",
    color: "Gunmetal / Smoke",
    sku: "CC-S-AV-58-GM",
    images: ["assets/images/placeholder.svg"],
    notes: "Lightweight frame, adjustable nose pads."
  },
  {
    id: "CC-002",
    name: "Round Acetate 47",
    category: "Optical",
    shape: "Round",
    material: "Acetate",
    lens: "Demo Lens",
    color: "Black / Tortoise",
    sku: "CC-O-RD-47-BK",
    images: ["assets/images/placeholder.svg"],
    notes: "Keyhole bridge; spring hinges."
  },
  {
    id: "CC-003",
    name: "Square Workday 52",
    category: "Sunglasses",
    shape: "Square",
    material: "Acetate",
    lens: "UV400",
    color: "Matte Navy",
    sku: "CC-S-SQ-52-NV",
    images: ["assets/images/placeholder.svg"],
    notes: "Everyday silhouette with dependable fit."
  }
];

// ====== RENDERING & FILTERS ======
const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

const state = {
  category: "All",
  shape: "All",
  material: "All",
  query: ""
};

function uniqueValues(key) {
  return ["All", ...Array.from(new Set(PRODUCTS.map(p => p[key]))).sort()];
}

function setupFilters() {
  const catSel = $("#filter-category");
  const shapeSel = $("#filter-shape");
  const matSel = $("#filter-material");

  uniqueValues("category").forEach(v => catSel.append(new Option(v, v)));
  uniqueValues("shape").forEach(v => shapeSel.append(new Option(v, v)));
  uniqueValues("material").forEach(v => matSel.append(new Option(v, v)));

  catSel.addEventListener("change", e => { state.category = e.target.value; renderProducts(); });
  shapeSel.addEventListener("change", e => { state.shape = e.target.value; renderProducts(); });
  matSel.addEventListener("change", e => { state.material = e.target.value; renderProducts(); });

  $("#search").addEventListener("input", e => { state.query = e.target.value.trim().toLowerCase(); renderProducts(); });
}

function matchesFilters(p) {
  if (state.category !== "All" && p.category !== state.category) return false;
  if (state.shape !== "All" && p.shape !== state.shape) return false;
  if (state.material !== "All" && p.material !== state.material) return false;

  const q = state.query;
  if (!q) return true;
  const hay = [p.name, p.id, p.shape, p.material, p.color, p.lens, p.sku, p.notes].join(" ").toLowerCase();
  return hay.includes(q);
}

function renderProducts() {
  const grid = $("#product-grid");
  grid.innerHTML = "";
  const filtered = PRODUCTS.filter(matchesFilters);
  if (!filtered.length) {
    grid.innerHTML = `<div class="text-center text-slate-500 col-span-full py-10">No products found. Try clearing filters.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card bg-white rounded-2xl shadow p-4 flex flex-col";
    card.innerHTML = `
      <div class="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden mb-3">
        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover cursor-pointer" data-imgs='${JSON.stringify(p.images)}'>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold">${p.name}</h3>
        <p class="text-sm text-slate-600 mt-1">${p.category} • ${p.shape} • ${p.material}</p>
        <p class="text-sm text-slate-500 mt-1">${p.color || ""}</p>
        <p class="text-xs text-slate-400 mt-1">SKU: ${p.sku}</p>
      </div>
      <div class="mt-4 flex gap-2">
        <a class="flex-1 text-center rounded-full px-4 py-2 bg-black text-white hover:opacity-90" href="${buildWhatsAppURL(p)}" target="_blank" rel="noopener">Request Quote</a>
        <button class="rounded-full px-4 py-2 border border-slate-200" onclick="openModal(${JSON.stringify(p.images)})">View</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function buildWhatsAppURL(product) {
  if (!CONFIG.whatsapp) {
    const subject = encodeURIComponent(`Product inquiry: ${product.name} (${product.id})`);
    const body = encodeURIComponent(`Hello Canadian Cardinal team,\nI'm interested in: ${product.name} (${product.id}).\nPlease send pricing, MOQ, and lead times.\n\nThank you.`);
    return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }
  const msg = `Hello Canadian Cardinal team,%0AI'm interested in: ${product.name} (${product.id}).%0APlease send pricing, MOQ, and lead times.`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
}

// ====== MODAL (lightbox) ======
function openModal(imgs) {
  const backdrop = $("#modal");
  const img = $("#modal-image");
  let idx = 0;
  function show(i) { img.src = imgs[i]; }
  show(idx);
  backdrop.classList.add("active");

  $("#modal-prev").onclick = () => { idx = (idx - 1 + imgs.length) % imgs.length; show(idx); };
  $("#modal-next").onclick = () => { idx = (idx + 1) % imgs.length; show(idx); };
  $("#modal-close").onclick = () => backdrop.classList.remove("active");
  backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.classList.remove("active"); };
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  // Header brand
  const brandEls = $$(".js-brand-name");
  brandEls.forEach(el => el.textContent = CONFIG.brandName);

  // Socials
  if (CONFIG.instagram) {
    $("#insta").href = CONFIG.instagram;
    $("#insta").classList.remove("hidden");
  }
  if (CONFIG.linkedin) {
    $("#li").href = CONFIG.linkedin;
    $("#li").classList.remove("hidden");
  }

  // Catalog link
  $("#catalog-link").href = CONFIG.catalogUrl;

  setupFilters();
  renderProducts();
});
