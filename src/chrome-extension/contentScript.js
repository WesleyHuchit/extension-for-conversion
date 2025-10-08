function injectButton() {
  const nav = document.querySelector("nav");
  if (!nav) return; // nav ainda não existe

  const btn = document.createElement("button");
  
  btn.textContent = "Gerar Ordem de Serviço";
  btn.style.cssText = `
    padding: 8px 14px;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
  `;

  btn.addEventListener("click", () => {
    console.log("Botão clicado!");
    alert("Função executada!");
  });

  nav.appendChild(btn);
}

// Para lidar com sites dinâmicos (React/Vue), use MutationObserver
const observer = new MutationObserver(() => {
  if (document.querySelector("nav")) {
    injectButton();
    observer.disconnect(); // para de observar quando encontrou
  }
});

observer.observe(document.body, { childList: true, subtree: true });
