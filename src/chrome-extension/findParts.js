function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log("Texto copiado para a área de transferência!");
    })
    .catch(err => {
      console.error("Falha ao copiar texto: ", err);
    });
}

const rows = [];

const trElements = document.querySelectorAll('tr.type-impact:not(.type-resume)');

trElements.forEach(tr => {
  const tdElements = tr.querySelectorAll('td');

  const row = {
    operations: [],
    quantity: tdElements[1].innerText,
    code: tdElements[2].innerText,
    description: tdElements[3].innerText,
    workshop: tdElements[4].innerText,
    price: tdElements[5].innerText,
    discount: tdElements[6].innerText,
    finalPrice: tdElements[7].innerText
  };

  tdElements.forEach((td, index) => {

    if (index === 0) {
      const operations = td.querySelectorAll('span.button_circle_op_report')
      const operationsArray = Array.from(operations).map(operation => operation instanceof HTMLElement ? operation.innerText : '');

      const opTimeReport = td.querySelectorAll('span.op_time_report');
      const opTimeReportArray = Array.from(opTimeReport).map(opTime => opTime instanceof HTMLElement ? opTime.innerText : '');


      const operationsT = []

      operationsArray.forEach((operation, index) => {
        operationsT.push({
          name: operation,
          time: opTimeReportArray[index]
        })
      })

      row.operations.push(
        ...operationsT
      )
    }
  })

  rows.push(row);
})

const supplyAtTheWorkshopsExpense = rows.filter(row => row.workshop.toLowerCase() == "oficina")

const filterByOperation = supplyAtTheWorkshopsExpense.filter(row => {
  return row.operations.some(op => op.name.toLowerCase().includes("t"))
})

const filterInformation = filterByOperation.map(row => {
  return {
    code: row.code,
    description: row.description,
  }
})

const text = filterInformation.map(item => `${item.code.replace(/\n/g, "")} - ${item.description.replace(/\n/g, "")}`).join('\n');


const container = document.getElementById("group-format");

if (container) {

  const innerDiv = container.getElementsByClassName("btn-group")[0];

  if (innerDiv) {

    const btn = document.createElement("button");
    btn.textContent = "Fornecimento pela Oficina";

    btn.style.padding = "6px 10px";
    btn.style.background = "#D64237";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.marginLeft = "10px";

    btn.addEventListener("click", () => {
      copyText(text);
      alert("Informações copiadas para a área de transferência!");
    });

    innerDiv.appendChild(btn);

  }

}