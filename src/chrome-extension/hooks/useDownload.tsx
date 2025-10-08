import { useState } from "react";
import { DataType } from "../../dtos/DataType";
import axios from "axios";


export function useDownload() {

    const [data, setData] = useState<DataType | null>(null);

  async function handleDownload() {

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/extension/service-order`, data, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "ordem_servico.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    }
  };

    return {
        handleDownload,
        data,
        setData,
    }

}