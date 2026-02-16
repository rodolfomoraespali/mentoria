const LINKS = {
  compra: "https://hotmart.com/pt-br/marketplace/produtos/palimed/S97455634U",
  whatsapp: "https://wa.me/5516981902048",
  instagram: "https://instagram.com/rodolfomoraespali"
};
const slides = document.querySelectorAll(".testimonial-slide");
const indicators = document.querySelectorAll(".indicator");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
let currentSlide = 0;
let startX = 0;
let endX = 0;

function $(q){ return document.querySelector(q); }

function showToast(msg){
  const toast = $("#toast");
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function scrollToTarget(selector){
  const el = document.querySelector(selector);
  if(!el) return;

  const topbar = document.querySelector(".topbar");
  const offset = (topbar?.offsetHeight || 0) + 10;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

function wireLinks(){
  ["#btnComprarTop", "#btnComprarHero", "#btnComprarMid", "#btnComprarBottom"].forEach((id) => {
    const el = $(id);
    if(!el) return;

    el.setAttribute("href", LINKS.compra);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");

    el.addEventListener("click", (e) => {
      if(!LINKS.compra){
        e.preventDefault();
        showToast("Configure o link de compra no script.js 🙂");
      }
    });
  });

  const wpp = $("#btnWhatsapp");
  const ig = $("#btnInstagram");

  if(wpp){
    wpp.setAttribute("href", LINKS.whatsapp);
    wpp.setAttribute("target", "_blank");
    wpp.setAttribute("rel", "noopener");
  }
  if(ig){
    ig.setAttribute("href", LINKS.instagram);
    ig.setAttribute("target", "_blank");
    ig.setAttribute("rel", "noopener");
  }

  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => scrollToTarget(btn.getAttribute("data-scroll")));
  });
}

function wireForm(){
  const form = $("#formContato");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const contato = form.contato.value.trim();
    const mensagem = form.mensagem.value.trim();

    if(!nome || !contato || !mensagem){
      showToast("Preencha todos os campos 🙂");
      return;
    }

    const txt =
      `Olá! Me chamo ${nome}.%0A` +
      `Meu contato: ${contato}%0A%0A` +
      `Mensagem:%0A${encodeURIComponent(mensagem)}`;

    const url = `${LINKS.whatsapp}?text=${txt}`;

    window.open(url, "_blank", "noopener");
    showToast("Abrindo WhatsApp...");
    form.reset();
  });
}

function showSlide(index){
  slides.forEach(slide => slide.classList.remove("active"));
  indicators.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  indicators[index].classList.add("active");
}
function nextSlide(){
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide(){
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
if(nextBtn) nextBtn.addEventListener("click", nextSlide);
if(prevBtn) prevBtn.addEventListener("click", prevSlide);
indicators.forEach(indicator => {
  indicator.addEventListener("click", (e) => {
    currentSlide = parseInt(e.target.dataset.slide);
    showSlide(currentSlide);
  });
});
const carousel = document.querySelector(".carousel-track");
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
carousel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  if(startX - endX > 50){
    nextSlide();
  }
  if(endX - startX > 50){
    prevSlide();
  }
});

document.addEventListener("DOMContentLoaded", init);
