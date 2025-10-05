import { DataType } from "../../dtos/DataType";
// import * as XLSX from "xlsx";

export function useDownload() {

    // const [data, setData] = useState<DataType | null>(null);

    function downloadExcel(data: DataType) {

        console.log('Downloading Excel with data:', data);

        // const formattedRows = data.rows.map(row => {
        //     const operationsObj: Record<string, string> = {};

        //     row.operations.forEach((op, index) => {
        //         operationsObj[`Operation ${index + 1} Name`] = op.name;
        //         operationsObj[`Operation ${index + 1} Time`] = op.time;
        //     });

        //     const priceFormatted = parseFloat(row.price.replace(/[^0-9,]/g, ""))
        //     const finalPriceFormatted = parseFloat(row.finalPrice.replace(/[^0-9,]/g, ""));

        //     // var notCalc = false
        //     var priceDifference = 0

        //     if (isNaN(priceFormatted) || isNaN(finalPriceFormatted)) {
        //         // notCalc = true
        //     } else {
        //         priceDifference = priceFormatted - finalPriceFormatted
        //     }

        //     return {
        //         ...operationsObj,
        //         quantity: row.quantity,
        //         code: row.code,
        //         description: row.description,
        //         workshop: row.workshop,
        //         price: row.price,
        //         discount: row.discount,
        //         finalPrice: row.finalPrice,
        //         priceDifference: priceDifference,
        //     };

        // });

        // const ws = XLSX.utils.json_to_sheet(formattedRows);
        // const wb = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // XLSX.writeFile(wb, 'data.xlsx');

        // console.log('Downloading Excel with data:', data);

    }

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
        downloadExcel
    }

}