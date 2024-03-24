
const KRA_TAX_RATES = {
    0: [0, 12298, 0.1],
    12299: [1229.80, 23885, 0.15],
    23886: [2457.75, 35473, 0.2],
    35474: [5477.30, 47061, 0.25],
    47062: [8445.25, Infinity, 0.3]
};

const NHIF_RATES = {
    0: 150,
    6000: 300,
    8000: 400,
    12000: 500,
    15000: 600,
    20000: 750,
    25000: 850,
    30000: 900,
    35000: 950,
    40000: 1000,
    45000: 1100,
    50000: 1200,
    60000: 1300,
    70000: 1400,
    80000: 1500,
    90000: 1600,
    100000: 1700
};

const NSSF_EMPLOYEE_RATE = 0.06;
const NSSF_EMPLOYER_RATE = 0.06;

function calculateTaxableIncome(basicSalary) {
    let taxableIncome = basicSalary;
    let nhifDeduction = 0;
    
    for (const bracket in NHIF_RATES) {
        if (basicSalary <= bracket) {
            nhifDeduction = NHIF_RATES[bracket];
            break;
        }
    }
    
    taxableIncome -= nhifDeduction;
    
    return { taxableIncome, nhifDeduction };
}

function calculateTax(taxableIncome) {
    let tax = 0;
    for (const bracket in KRA_TAX_RATES) {
        if (taxableIncome > bracket) {
            const values = KRA_TAX_RATES[bracket];
            tax += values[0] + (taxableIncome - bracket) * values[2];
            break;
        }
    }
    return tax;
}

function calculateNssDeductions(basicSalary) {
    const employeeNssf = basicSalary * NSSF_EMPLOYEE_RATE;
    const employerNssf = basicSalary * NSSF_EMPLOYER_RATE;
    return { employeeNssf, employerNssf };
}

function calculateNetSalary(basicSalary, benefits) {
    const { taxableIncome, nhifDeduction } = calculateTaxableIncome(basicSalary);
    const tax = calculateTax(taxableIncome);
    const { employeeNssf, employerNssf } = calculateNssDeductions(basicSalary);
    
    const grossSalary = basicSalary + benefits;
    const totalDeductions = tax + nhifDeduction + employeeNssf;
    const netSalary = grossSalary - totalDeductions;
    
    return {
        "Gross Salary": grossSalary,
        "PAYE (Tax)": tax,
        "NHIF Deduction": nhifDeduction,
        "NSSF Deduction (Employee)": employeeNssf,
        "NSSF Deduction (Employer)": employerNssf,
        "Net Salary": netSalary
    };
}


const basicSalary = parseFloat(prompt("Enter basic salary: "));
const benefits = parseFloat(prompt("Enter benefits: "));

const salaryDetails = calculateNetSalary(basicSalary, benefits);
for (const key in salaryDetails) {
    console.log(`${key}: ${salaryDetails[key]}`);
}
