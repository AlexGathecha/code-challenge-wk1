function calculateNetSalary(basicSalary, benefits) {
    const taxRate = 0.30; // 30% tax for simplification
    const nhifDeduction = 500; // Placeholder
    const nssfDeduction = 200; // Placeholder

    const grossSalary = basicSalary + benefits;
    const payee = grossSalary * taxRate;
    const netSalary = grossSalary - (payee + nhifDeduction + nssfDeduction);

    return netSalary;
}


const basicSalary = parseFloat(prompt("Enter your basic salary: "));
const benefits = parseFloat(prompt("Enter your benefits: "));
alert(`Your net salary is: ${calculateNetSalary(basicSalary, benefits).toFixed(2)}`);
