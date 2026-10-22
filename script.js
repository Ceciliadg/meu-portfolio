// ===== Alternar tema claro/escuro =====
const botaoTema = document.getElementById("tema");

// Aplica o tema salvo (padrão: paleta original clara do Pixelution)
function aplicarTema(tema) {
  if (tema === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (botaoTema) botaoTema.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (botaoTema) botaoTema.textContent = "🌙";
  }
}

// Limpa o tema antigo para garantir que a paleta original do Pixelution apareça
localStorage.removeItem("tema");
const temaSalvo = localStorage.getItem("tema_pixelution");
aplicarTema(temaSalvo || "light");

if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    const escuroAgora =
      document.documentElement.getAttribute("data-theme") === "dark";
    const novo = escuroAgora ? "light" : "dark";
    aplicarTema(novo);
    localStorage.setItem("tema_pixelution", novo);
  });
}

// ===== Rolagem suave ao clicar nos links internos =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Aparecer suavemente ao rolar =====
const aparecer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.style.opacity = "1";
        entrada.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".secao").forEach((secao) => {
  secao.style.opacity = "0";
  secao.style.transform = "translateY(20px)";
  secao.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  aparecer.observe(secao);
});
