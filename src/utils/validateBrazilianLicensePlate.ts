export function validateBrazilianLicensePlate(plate: string) {
    const oldPattern = /^[A-Z]{3}-\d{4}$/;
    const mercosulPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    return oldPattern.test(plate) || mercosulPattern.test(plate) ? plate : false;
}