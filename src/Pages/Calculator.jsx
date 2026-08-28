import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Calculator.css";


function Calculator() {

    const navigate = useNavigate();


    // =========================================
    // CALCULATOR TYPE
    // =========================================

    const [calculatorType, setCalculatorType] =
        useState("emi");


    // =========================================
    // EMI INPUTS
    // =========================================

    const [loanAmount, setLoanAmount] =
        useState("");

    const [interestRate, setInterestRate] =
        useState("");

    const [loanTenure, setLoanTenure] =
        useState("");


    const [emiResult, setEmiResult] =
        useState(null);


    // =========================================
    // RENT INPUTS
    // =========================================

    const [monthlyIncome, setMonthlyIncome] =
        useState("");

    const [monthlyRent, setMonthlyRent] =
        useState("");


    const [rentResult, setRentResult] =
        useState(null);


    // =========================================
    // FORMAT CURRENCY
    // =========================================

    const formatCurrency = (value) => {

        return Number(value || 0).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        );

    };


    // =========================================
    // CALCULATE EMI
    // =========================================

    const calculateEMI = () => {

        const principal =
            Number(loanAmount);

        const annualInterest =
            Number(interestRate);

        const years =
            Number(loanTenure);


        if (
            principal <= 0 ||
            annualInterest <= 0 ||
            years <= 0
        ) {

            alert(
                "Please enter valid loan amount, interest rate and tenure."
            );

            return;

        }


        const monthlyRate =
            annualInterest / 12 / 100;


        const months =
            years * 12;


        const monthlyEMI =
            principal *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );


        const totalPayment =
            monthlyEMI * months;


        const totalInterest =
            totalPayment - principal;


        setEmiResult({

            emi: monthlyEMI,

            totalInterest:
                totalInterest,

            totalPayment:
                totalPayment

        });

    };


    // =========================================
    // CALCULATE RENT
    // =========================================

    const calculateRent = () => {

        const income =
            Number(monthlyIncome);

        const rent =
            Number(monthlyRent);


        if (
            income <= 0 ||
            rent <= 0
        ) {

            alert(
                "Please enter valid income and rent."
            );

            return;

        }


        const annualRent =
            rent * 12;


        const rentPercentage =
            (rent / income) * 100;


        const remainingIncome =
            income - rent;


        setRentResult({

            annualRent:
                annualRent,

            rentPercentage:
                rentPercentage,

            remainingIncome:
                remainingIncome

        });

    };


    // =========================================
    // CHANGE CALCULATOR
    // =========================================

    const changeCalculator = (type) => {

        setCalculatorType(type);

        setEmiResult(null);

        setRentResult(null);

    };


    return (

        <div className="calculator-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="calculator-header">


                <button
                    className="calculator-back-btn"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    ← Back
                </button>


                <p className="calculator-eyebrow">
                    DOMLEA FINANCIAL TOOLS
                </p>


                <h1>
                    Property Calculator
                </h1>


                <p>
                    Calculate your home loan EMI
                    or understand your monthly
                    rental affordability.
                </p>

            </div>


            {/* =================================
                CALCULATOR SWITCH
            ================================= */}

            <div className="calculator-switch">


                <button
                    className={
                        calculatorType === "emi"
                            ? "calculator-tab active"
                            : "calculator-tab"
                    }
                    onClick={() =>
                        changeCalculator("emi")
                    }
                >
                    🏠 Home Loan EMI
                </button>


                <button
                    className={
                        calculatorType === "rent"
                            ? "calculator-tab active"
                            : "calculator-tab"
                    }
                    onClick={() =>
                        changeCalculator("rent")
                    }
                >
                    🏢 Rent Calculator
                </button>

            </div>


            {/* =================================
                MAIN CARD
            ================================= */}

            <div className="calculator-card">


                {/* =================================
                    EMI CALCULATOR
                ================================= */}

                {calculatorType === "emi" && (

                    <div className="calculator-content">


                        <div className="calculator-title">

                            <h2>
                                Home Loan EMI Calculator
                            </h2>

                            <p>
                                Enter the amount you want
                                to borrow.
                            </p>

                        </div>


                        {/* LOAN AMOUNT */}

                        <div className="calculator-field">

                            <label>
                                Loan Amount
                            </label>


                            <div className="calculator-input">

                                <span>
                                    ₹
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Example: 7000000"
                                    value={loanAmount}
                                    onChange={(e) =>
                                        setLoanAmount(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* INTEREST */}

                        <div className="calculator-field">

                            <label>
                                Annual Interest Rate
                            </label>


                            <div className="calculator-input">

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Example: 8.5"
                                    value={interestRate}
                                    onChange={(e) =>
                                        setInterestRate(
                                            e.target.value
                                        )
                                    }
                                />


                                <span>
                                    %
                                </span>

                            </div>

                        </div>


                        {/* TENURE */}

                        <div className="calculator-field">

                            <label>
                                Loan Tenure
                            </label>


                            <div className="calculator-input">

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Example: 20"
                                    value={loanTenure}
                                    onChange={(e) =>
                                        setLoanTenure(
                                            e.target.value
                                        )
                                    }
                                />


                                <span>
                                    Years
                                </span>

                            </div>

                        </div>


                        {/* BUTTON */}

                        <button
                            className="calculate-btn"
                            onClick={calculateEMI}
                        >
                            Calculate EMI
                        </button>


                        {/* RESULT */}

                        {emiResult && (

                            <div className="calculator-result">


                                <div className="main-result">

                                    <span>
                                        Monthly EMI
                                    </span>


                                    <strong>
                                        ₹
                                        {formatCurrency(
                                            emiResult.emi
                                        )}
                                    </strong>

                                </div>


                                <div className="result-grid">


                                    <div>

                                        <span>
                                            Loan Amount
                                        </span>

                                        <strong>
                                            ₹
                                            {formatCurrency(
                                                loanAmount
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Total Interest
                                        </span>

                                        <strong>
                                            ₹
                                            {formatCurrency(
                                                emiResult.totalInterest
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Total Payment
                                        </span>

                                        <strong>
                                            ₹
                                            {formatCurrency(
                                                emiResult.totalPayment
                                            )}
                                        </strong>

                                    </div>


                                </div>

                            </div>

                        )}

                    </div>

                )}


                {/* =================================
                    RENT CALCULATOR
                ================================= */}

                {calculatorType === "rent" && (

                    <div className="calculator-content">


                        <div className="calculator-title">

                            <h2>
                                Rent Calculator
                            </h2>

                            <p>
                                Enter your income and
                                expected monthly rent.
                            </p>

                        </div>


                        {/* INCOME */}

                        <div className="calculator-field">

                            <label>
                                Monthly Income
                            </label>


                            <div className="calculator-input">

                                <span>
                                    ₹
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Example: 80000"
                                    value={monthlyIncome}
                                    onChange={(e) =>
                                        setMonthlyIncome(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* RENT */}

                        <div className="calculator-field">

                            <label>
                                Monthly Rent
                            </label>


                            <div className="calculator-input">

                                <span>
                                    ₹
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Example: 20000"
                                    value={monthlyRent}
                                    onChange={(e) =>
                                        setMonthlyRent(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* BUTTON */}

                        <button
                            className="calculate-btn"
                            onClick={calculateRent}
                        >
                            Calculate Rent
                        </button>


                        {/* RESULT */}

                        {rentResult && (

                            <div className="calculator-result">


                                <div className="main-result">

                                    <span>
                                        Monthly Rent
                                    </span>


                                    <strong>
                                        ₹
                                        {formatCurrency(
                                            monthlyRent
                                        )}
                                    </strong>

                                </div>


                                <div className="result-grid">


                                    <div>

                                        <span>
                                            Annual Rent
                                        </span>

                                        <strong>
                                            ₹
                                            {formatCurrency(
                                                rentResult.annualRent
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Rent / Income
                                        </span>

                                        <strong>
                                            {rentResult.rentPercentage.toFixed(
                                                1
                                            )}
                                            %
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Remaining Income
                                        </span>

                                        <strong>
                                            ₹
                                            {formatCurrency(
                                                rentResult.remainingIncome
                                            )}
                                        </strong>

                                    </div>


                                </div>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


export default Calculator;