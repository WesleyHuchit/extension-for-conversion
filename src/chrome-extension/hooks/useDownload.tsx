import { useState } from "react";
import { DataType } from "../../dtos/DataType";
import axios from "axios";
// import * as XLSX from "xlsx";

export function useDownload() {

    const [data, setData] = useState<DataType | null>(null);

  async function handleDownload() {
    console.log('data before downloadExcel', data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/extension/service-order`, data, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "ordem_servico.pdf"; // nome do arquivo
      a.click();

      // Limpa o objeto após o download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    }
  };

    // useEffect(() => {
    //     chrome.storage.local.get(['extractedData'], (result) => {
    //         const data = result.extractedData as DataType;
    //         setData(data);

    //         const formattedRows = data.rows.map(row => {
    //             const operationsObj: Record<string, string> = {};

    //             row.operations.forEach((op, index) => {
    //                 operationsObj[`Operation ${index + 1} Name`] = op.name;
    //                 operationsObj[`Operation ${index + 1} Time`] = op.time;
    //             });

    //             const priceFormatted = parseFloat(row.price.replace(/[^0-9,]/g, ""))
    //             const finalPriceFormatted = parseFloat(row.finalPrice.replace(/[^0-9,]/g, ""));

    //             // var notCalc = false
    //             var priceDifference = 0

    //             if (isNaN(priceFormatted) || isNaN(finalPriceFormatted)) {
    //                 // notCalc = true
    //             } else {
    //                 priceDifference = priceFormatted - finalPriceFormatted
    //             }

    //             return {
    //                 ...operationsObj,
    //                 quantity: row.quantity,
    //                 code: row.code,
    //                 description: row.description,
    //                 workshop: row.workshop,
    //                 price: row.price,
    //                 discount: row.discount,
    //                 finalPrice: row.finalPrice,
    //                 priceDifference: priceDifference,
    //             };

    //         });

    //         const ws = XLSX.utils.json_to_sheet(formattedRows);
    //         const wb = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //         XLSX.writeFile(wb, 'data.xlsx');
    //     });
    // }, [data])

    return {
        handleDownload,
        data,
        setData,
    }

}