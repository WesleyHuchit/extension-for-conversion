import { useEffect, useState } from "react";
import "../global.css";

export const Popup = () => {

  // const trElements = document.querySelectorAll('tr.type-impact:not(.type-resume)');

  // console.log(trElements);

  // useEffect(() => {
  //   const executeScript = async () => {
  //     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //     if (!chrome?.tabs?.query) {
  //       console.error("A API do Chrome não está disponível. Execute isso dentro de uma extensão.");
  //       return;
  //     }

  //     if (tab) {
  //       chrome.scripting.executeScript({
  //         target: { tabId: tab.id! },
  //         func: () => {
  //           console.log("Hello from the popup!");
  //         },
  //       });
  //     } else {
  //       console.error("No active tab found!");
  //     }
  //   };

  //   executeScript();
  // }, [])

  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({}, (result) => {
        setTabs(result);
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({})
      // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // chrome.scripting.executeScript({
      //   target: {
      //       tabId: tab.id
      //   },
      //   function: () => {},
      // });

      console.log(tab);
    })()
  }, [tabs]);


  return (
    <div className="text-5xl p-10 font-extrabold">
      <div>This is your popup.</div>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>{tab.title}</li>
        ))}
      </ul>
    </div>
  );
};


