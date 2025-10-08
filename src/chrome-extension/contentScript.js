const container = document.getElementById("group-format");

if (container) {

  const innerDiv = container.getElementsByClassName("btn-group")[0];

  if (innerDiv) {

    const btn = document.createElement("button");
    btn.textContent = "Gerar Ordem de Serviço";

    btn.style.padding = "6px 10px";
    btn.style.background = "#D64237";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.marginLeft = "10px";

    btn.addEventListener("click", () => {
      // Aqui vai o que você quiser executar ao clicar
      alert("Gerando ordem de serviço...");

      // Exemplo: chamar uma função
      // gerarOrdemDeServico();
    });


    innerDiv.appendChild(btn);

  }


}


