import Table from "@/src/components/CryptoRankExchangeComponents/Table";
import { useState } from "react";

const CryptoRankExchange = () => {
  const [amountInput, setAmountInput] = useState(null);
  const [currentValue, setCurrentValue] = useState(17042.67);
  const [errors, setErrors] = useState([]);

  const handleChangeAmountInput = (e) => {
    const current = e.target.value;
    setAmountInput(current);

    if (!current) {
      setErrors(['Amount cannot be empty'])
      return;
    }

    const numericValue = parseFloat(current);
    if (!isNaN(numericValue)) {
      setCurrentValue((prev) => (prev - current));
    }
    
    handleErrorsInput(current);
  }

  const handleErrorsInput = (value) => {
    if (!value) {
      setErrors(['Amount cannot be empty'])
    } else if (isNaN(value)) {
      setErrors(['Amount must be a valid number'])
    } else if (value < 0.01) {
      setErrors(['Amount cannot be less than $0.01'])
    } else if (value > currentValue) {
      setErrors(['Amount cannot exceed the available balance'])
    } else {
      setErrors([])
    }
  }

  return (
    <div className="flex flex-col items-center mx-auto">
      <h1 className="text-2xl font-bold mb-6">CryptoRank Exchange</h1>
      <section>
        <div className="flex flex-col items-center mt-12 px-8 text-center">
          <label className="mb-4">
            I want to exchange $ 
            <input 
              className="w-24 border border-gray-300 rounded-md px-2 py-1 mx-2" 
              data-testid="amount-input" 
              required 
              type="number" 
              placeholder="USD" 
              value={amountInput} 
              onChange={handleChangeAmountInput}
            /> 
            of my $<span className="font-semibold">{currentValue}</span>:
          </label>
          {errors.length > 0 ? errors.map((error, index) => (
            <p 
              key={index} 
              data-testid="error" 
              className="text-red-500 text-sm mt-3"
            >
              {error}
            </p>
          )) : null}
        </div>
      </section>
  
      <Table 
        amountInput={amountInput} 
        errors={errors}
      />
    </div>
  );
}

export default CryptoRankExchange;