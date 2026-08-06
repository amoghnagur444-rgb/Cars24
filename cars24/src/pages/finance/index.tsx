import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Percent,
  Banknote,
  HelpCircle,
  Home,
  Search,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FinancePage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("loan");
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(60);
  const [downPayment, setDownPayment] = useState(100000);

  const emi = calculateEMI(loanAmount - downPayment, 9.5, tenure);
  const totalInterest = emi * tenure - (loanAmount - downPayment);
  const totalAmount = emi * tenure;

  function calculateEMI(principal: number, annualRate: number, months: number) {
    const monthlyRate = annualRate / 12 / 100;
    if (monthlyRate === 0) return principal / months;
    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  }

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const financeOptions = [
    {
      id: "loan",
      title: "Car Loan",
      description: "Get up to 100% on-road funding with attractive interest rates",
      icon: CreditCard,
      features: [
        "Interest rates starting at 9.5% p.a.",
        "Flexible tenure up to 7 years",
        "Minimal documentation",
        "Quick approval within 24 hours",
      ],
      partners: ["HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "SBI"],
    },
    {
      id: "lease",
      title: "Car Lease",
      description: "Drive a new car without the hassle of ownership",
      icon: Shield,
      features: [
        "Fixed monthly rental",
        "Maintenance & insurance included",
        "Flexible tenure 2-5 years",
        "Option to upgrade or return",
      ],
      partners: ["ALD Automotive", "LeasePlan", "Orix", "Mahindra Finance"],
    },
    {
      id: "refinance",
      title: "Loan Refinance",
      description: "Transfer your existing car loan for better rates",
      icon: Percent,
      features: [
        "Lower interest rates",
        "Reduce monthly EMI burden",
        "Top-up loan facility",
        "Zero foreclosure charges",
      ],
      partners: ["HDFC Bank", "ICICI Bank", "Bajaj Finserv", "Tata Capital"],
    },
  ];

  const selectedFinance = financeOptions.find((f) => f.id === selectedOption);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Car Finance Solutions
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Get the best finance options for your dream car. Compare loans,
              leases, and refinance offers from top banks and NBFCs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3">
                Check Eligibility
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-orange-700 px-8 py-3"
              >
                Calculate EMI
                <Calculator className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 text-orange-500 mr-2" />
                EMI Calculator
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount: {formatINR(loanAmount - downPayment)}
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={loanAmount - downPayment}
                    onChange={(e) => setLoanAmount(Number(e.target.value) + downPayment)}
                    className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹20 Lakh</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment: {formatINR(downPayment)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={loanAmount}
                    step="10000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>{formatINR(loanAmount)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate: 9.5% p.a.
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Based on your credit profile. Actual rate may vary.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure: {tenure} months ({tenure / 12} years)
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 Year</span>
                    <span>7 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your EMI Breakdown</h2>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-4xl font-bold text-orange-600">{formatINR(emi)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatINR(loanAmount - downPayment)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatINR(totalInterest)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatINR(totalAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Down Payment</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatINR(downPayment)}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full py-3 text-lg"
                  onClick={() => setSelectedOption("loan")}
                >
                  Apply for Loan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Finance Option
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the financing solution that best fits your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {financeOptions.map((option) => (
              <div
                key={option.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  selectedOption === option.id
                    ? "border-2 border-orange-500 bg-orange-50 shadow-lg"
                    : "border border-gray-200 hover:shadow-lg hover:border-orange-300"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                {selectedOption === option.id && (
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
                <div className="mb-4">
                  <option.icon
                    className="w-10 h-10 text-orange-500 bg-orange-100 rounded-xl p-2"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Partner Banks & NBFCs</p>
                  <div className="flex flex-wrap gap-2">
                    {option.partners.map((partner, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Cars24 Finance?
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Quick Approval",
                desc: "Get loan approval within 24 hours with minimal paperwork",
              },
              {
                icon: Percent,
                title: "Best Rates",
                desc: "Compare rates from 15+ banks and NBFCs to get the lowest EMI",
              },
              {
                icon: Shield,
                title: "Zero Hidden Charges",
                desc: "Transparent pricing with no processing fee surprises",
              },
              {
                icon: HelpCircle,
                title: "Expert Guidance",
                desc: "Dedicated finance advisors to help you through the process",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Finance Your Dream Car?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Get personalized loan offers from top banks. Check your eligibility in
            minutes with no impact on your credit score.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3">
              Check Eligibility Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-orange-700 px-8 py-3"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancePage;