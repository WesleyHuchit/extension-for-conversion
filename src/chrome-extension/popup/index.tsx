import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../global.css";

interface DataType {
  plate: string
  rows: Rows[]
}

interface Rows {
  code: string
  description: string
  discount: string
  finalPrice: string
  operations: Operation[]
  price: string
  quantity: string
  workshop: string
}

// interface Operation {
//   operations: Operation2[]
// }

interface Operation {
  name: string
  time: string
}

export const Popup = () => {

  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({}, (result) => {
        setTabs(result);
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id! },
          func: () => {


            function validateBrazilianLicensePlate(plate: string) {
              const oldPattern = /^[A-Z]{3}-\d{4}$/;
              const mercosulPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/;
              return oldPattern.test(plate) || mercosulPattern.test(plate) ? plate : false;
            }


            const rows: Rows[] = [];

            const trElements = document.querySelectorAll('tr.type-impact:not(.type-resume)');

            trElements.forEach(tr => {
              const tdElements = tr.querySelectorAll('td');

              const row: Rows = {
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


                  const operationsT: Operation[] = []

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

            // console.log('rows', rows)

            const elements = document.querySelectorAll("*:not(script):not(style)");

            let foundPlates: string[] = [];

            elements.forEach(element => {
              if (element.childNodes.length) {
                element.childNodes.forEach(node => {
                  if (node.nodeType === Node.TEXT_NODE) {
                    const plate = validateBrazilianLicensePlate(node.textContent || '');
                    if (plate) {
                      foundPlates.push(plate);
                      return
                    }
                    return
                  }
                  return
                });
              }
            });

            const dataObject: DataType = {
              plate: foundPlates[0],
              rows: rows
            }

            console.log(dataObject)

            chrome.storage.local.set({ extractedData: dataObject }, () => {
              console.log("Data saved!");
            });

          },
        });
      }
    })()
  }, [tabs]);

  function downloadExcel() {
    chrome.storage.local.get(['extractedData'], (result) => {
      const data = result.extractedData as DataType;
      setData(data);
  
      const formattedRows = data.rows.map(row => {
        const operationsObj: Record<string, string> = {};
  
        row.operations.forEach((op, index) => {
          operationsObj[`Operation ${index + 1} Name`] = op.name;
          operationsObj[`Operation ${index + 1} Time`] = op.time;
        });
  
        const priceFormatted = parseFloat(row.price.replace(/[^0-9,]/g, ""))
        const finalPriceFormatted = parseFloat(row.finalPrice.replace(/[^0-9,]/g, ""));

        // var notCalc = false
        var priceDifference = 0

        if (isNaN(priceFormatted) || isNaN(finalPriceFormatted)) {
          // notCalc = true
        } else {
          priceDifference = priceFormatted - finalPriceFormatted
        }

        return {
          ...operationsObj,
          quantity: row.quantity,
          code: row.code,
          description: row.description,
          workshop: row.workshop,
          price: row.price,
          discount: row.discount,
          finalPrice: row.finalPrice,
          priceDifference: priceDifference,
        };

      });
  
      const ws = XLSX.utils.json_to_sheet(formattedRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');
    });
  }
   
  console.log(data)
  

  return (
    <div className="">
      <div className="flex wrap gap-4">
        <button onClick={() => downloadExcel()} >Excel 5</button>
      </div>
    </div>
  );
};


