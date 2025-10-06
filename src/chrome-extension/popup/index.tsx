import { useEffect, useState } from "react";
import "../global.css";
import { Button } from "../../components/ui/button";
import { DataType } from "../../dtos/DataType";
import { Rows } from "../../dtos/Rows";
import { Operation } from "../../dtos/Operation";
import { useDownload } from "../hooks/useDownload";

export function Popup() {

  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const { handleDownload, setData } = useDownload();

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({}, (result) => {
        setTabs(result);
      });
    }
  }, []);

  useEffect(() => {
    setTabs(tabs);
  }, [tabs]);

  useEffect(() => {
    test()
  }, [tabs])


  async function test() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) return;

    chrome.scripting.executeScript({
      target: {
        tabId: tab.id!
      },
      func: () => {

        function validateBrazilianLicensePlate(plate: string) {
          const oldPattern = /^[A-Z]{3}-\d{4}$/;
          const mercosulPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/;
          return oldPattern.test(plate) || mercosulPattern.test(plate) ? plate : false;
        }

        // alert('Script Executed!');
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

        chrome.runtime.sendMessage({ action: 'extractedData', data: dataObject });
        // setData(dataObject);


        // chrome.storage.local.set({ extractedData: dataObject }, () => {
        //   console.log("Data saved!");
        // });

      }
    }).then(() => {
      console.log('Script executed successfully');
    }).catch(err => {
      console.error('Error executing script:', err);
    });
  }

  useEffect(() => {
    const listener = (message: any) => {
      if (message.action === 'extractedData') {
        const data = (message.data);
        console.log('Received data in popup:', data);
        setData(data);
        // downloadExcel(data);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);


  return (
    <div className="">
      <div className="flex flex-col gap-2 p-2">
        <Button onClick={() => test()}>
          Baixar a Planilha
        </Button>
        <Button
          onClick={() => handleDownload()}
        >
          Test 2
        </Button>
      </div>
    </div>
  );
};


