import { useState } from "react";
import "../css/EMICalculator.css";

function PropertyCalculator({ propertyPrice, listingType }) {

    const isSale =
        listingType?.toUpperCase() === "SALE";

    // SALE
    const [downPayment, setDownPayment] = useState("");
    const [interestRate, setInterestRate] = useState("8.5");
    const [loanTenure, setLoanTenure] = useState("20");

    // RENT
    const [annualIncrease, setAnnualIncrease] = useState("5");
    const [rentYears, setRentYears] = useState("5");

    const [emiResult, setEmiResult] = useState(null);
    const [rentResult, setRentResult] = useState(null);


    const formatCurrency = (amount) => {

        return `₹${Number(amount).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        )}`;

    };


    // =================================
    // SALE → EMI
    // =================================

    const calculateEMI = () => {

        const price = Number(propertyPrice);
        const down = Number(downPayment);
        const rate = Number(interestRate);
        const years = Number(loanTenure);

        if (
            !price ||
            down < 0 ||
            down >= price ||
            rate <= 0 ||
            years <= 0
        ) {

            alert(
                "Please enter valid EMI details."
            );

            return;
        }

        const principal =
            price - down;

        const monthlyRate =
            rate / 12 / 100;

        const months =
            years * 12;

        const emi =
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
            emi * months;

        const totalInterest =
            totalPayment - principal;

        setEmiResult({
            principal,
            emi,
            totalPayment,
            totalInterest
        });

    };


    // =================================
    // RENT CALCULATOR
    // =================================

    const calculateRent = () => {

        const monthlyRent =
            Number(propertyPrice);

        const increase =
            Number(annualIncrease);

        const years =
            Number(rentYears);

        if (
            !monthlyRent ||
            increase < 0 ||
            years <= 0
        ) {

            alert(
                "Please enter valid rent details."
            );

            return;
        }


        let currentMonthlyRent =
            monthlyRent;

        let totalRent = 0;

        const yearlyData = [];


        for (
            let year = 1;
            year <= years;
            year++
        ) {

            const yearlyRent =
                currentMonthlyRent * 12;

            totalRent += yearlyRent;


            yearlyData.push({

                year,

                monthlyRent:
                    currentMonthlyRent,

                yearlyRent

            });


            currentMonthlyRent =
                currentMonthlyRent *
                (1 + increase / 100);

        }


        setRentResult({

            yearlyData,

            totalRent

        });

    };


    return (

        <div className="emi-container">

            <div className="emi-header">

                <p className="emi-eyebrow">

                    {isSale
                        ? "HOME LOAN"
                        : "RENT PLANNING"}

                </p>

                <h2>

                    {isSale
                        ? "EMI Calculator"
                        : "Rent Calculator"}

                </h2>

                <p>

                    {isSale

                        ? "Estimate your monthly home-loan payment."

                        : "Estimate how your rent may increase over time."}

                </p>

            </div>


            {/* =================================
                SALE
            ================================= */}

            {isSale ? (

                <>

                    <div className="emi-form">

                        <div className="emi-field">

                            <label>
                                Property Price
                            </label>

                            <div className="emi-readonly">

                                {formatCurrency(
                                    propertyPrice
                                )}

                            </div>

                        </div>


                        <div className="emi-field">

                            <label>
                                Down Payment
                            </label>

                            <input
                                type="number"
                                placeholder="Enter down payment"
                                value={downPayment}
                                onChange={(e) =>
                                    setDownPayment(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="emi-field">

                            <label>
                                Interest Rate (%)
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) =>
                                    setInterestRate(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="emi-field">

                            <label>
                                Loan Tenure
                            </label>

                            <select
                                value={loanTenure}
                                onChange={(e) =>
                                    setLoanTenure(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="5">
                                    5 Years
                                </option>

                                <option value="10">
                                    10 Years
                                </option>

                                <option value="15">
                                    15 Years
                                </option>

                                <option value="20">
                                    20 Years
                                </option>

                                <option value="25">
                                    25 Years
                                </option>

                                <option value="30">
                                    30 Years
                                </option>

                            </select>

                        </div>


                        <button
                            className="emi-calculate-btn"
                            onClick={calculateEMI}
                        >
                            Calculate EMI
                        </button>

                    </div>


                    {emiResult && (

                        <div className="emi-result">

                            <div className="emi-main-result">

                                <span>
                                    Monthly EMI
                                </span>

                                <strong>
                                    {formatCurrency(
                                        emiResult.emi
                                    )}
                                </strong>

                            </div>


                            <div className="emi-result-grid">

                                <div>

                                    <span>
                                        Loan Amount
                                    </span>

                                    <strong>
                                        {formatCurrency(
                                            emiResult.principal
                                        )}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Total Interest
                                    </span>

                                    <strong>
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
                                        {formatCurrency(
                                            emiResult.totalPayment
                                        )}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Loan Tenure
                                    </span>

                                    <strong>
                                        {loanTenure} Years
                                    </strong>

                                </div>

                            </div>

                        </div>

                    )}

                </>

            ) : (

                /* =================================
                   RENT
                ================================= */

                <>

                    <div className="emi-form">

                        <div className="emi-field">

                            <label>
                                Monthly Rent
                            </label>

                            <div className="emi-readonly">

                                {formatCurrency(
                                    propertyPrice
                                )}

                            </div>

                        </div>


                        <div className="emi-field">

                            <label>
                                Annual Increase (%)
                            </label>

                            <input
                                type="number"
                                step="0.5"
                                value={annualIncrease}
                                onChange={(e) =>
                                    setAnnualIncrease(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="emi-field">

                            <label>
                                Period
                            </label>

                            <select
                                value={rentYears}
                                onChange={(e) =>
                                    setRentYears(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="1">
                                    1 Year
                                </option>

                                <option value="5">
                                    5 Years
                                </option>

                                <option value="10">
                                    10 Years
                                </option>

                                <option value="15">
                                    15 Years
                                </option>

                                <option value="20">
                                    20 Years
                                </option>

                            </select>

                        </div>


                        <button
                            className="emi-calculate-btn"
                            onClick={calculateRent}
                        >
                            Calculate Rent
                        </button>

                    </div>


                    {rentResult && (

                        <div className="emi-result">

                            <div className="emi-main-result">

                                <span>
                                    Total Rent
                                </span>

                                <strong>
                                    {formatCurrency(
                                        rentResult.totalRent
                                    )}
                                </strong>

                            </div>


                            <div className="rent-table">

                                <div className="rent-table-header">

                                    <span>
                                        Year
                                    </span>

                                    <span>
                                        Monthly Rent
                                    </span>

                                    <span>
                                        Annual Rent
                                    </span>

                                </div>


                                {rentResult.yearlyData.map(
                                    (item) => (

                                        <div
                                            className="rent-table-row"
                                            key={item.year}
                                        >

                                            <span>
                                                Year {item.year}
                                            </span>

                                            <span>
                                                {formatCurrency(
                                                    item.monthlyRent
                                                )}
                                            </span>

                                            <span>
                                                {formatCurrency(
                                                    item.yearlyRent
                                                )}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </>

            )}

        </div>

    );

}

export default PropertyCalculator;