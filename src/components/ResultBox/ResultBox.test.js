import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
    it("should render without crashing", () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it("should render proper info about conversion when PLN -> USD", () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD', expectedResult: "PLN 100.00 = $28.57" },
            { amount: 20, from: 'PLN', to: 'USD', expectedResult: "PLN 20.00 = $5.71" },
            { amount: 200, from: 'PLN', to: 'USD', expectedResult: "PLN 200.00 = $57.14" },
            { amount: 345, from: 'PLN', to: 'USD', expectedResult: "PLN 345.00 = $98.57" },
        ];
        
        for(let testCase of testCases){
            render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
            const result = screen.getByTestId('result');
            expect(result).toHaveTextContent(testCase.expectedResult);
            cleanup();
        }
    });
    it("should render proper info about conversion when USD -> PLN", () => {
        const testCases = [
            { amount: 100, from: 'USD', to: 'PLN', expectedResult: "$100.00 = PLN 350.00" },
            { amount: 20, from: 'USD', to: 'PLN', expectedResult: "$20.00 = PLN 70.00" },
            { amount: 200, from: 'USD', to: 'PLN', expectedResult: "$200.00 = PLN 700.00" },
            { amount: 345, from: 'USD', to: 'PLN', expectedResult: "$345.00 = PLN 1,207.50" },
        ];

        for(let testCase of testCases){
            render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount}  />);
            const result = screen.getByTestId("result");
            expect(result).toHaveTextContent(testCase.expectedResult);
            cleanup();
        }
    });
    it("should render proper info when 'from' and 'to' have the same value", () => {
        const testCases = [
            { amount: 100, from: 'USD', to: 'USD', expectedResult: "$100.00 = $100.00" },
            { amount: 20, from: 'USD', to: 'USD', expectedResult: "$20.00 = $20.00" },
            { amount: 200, from: 'PLN', to: 'PLN', expectedResult: "PLN 200.00 = PLN 200.00" },
            { amount: 345, from: 'PLN', to: 'PLN', expectedResult: "PLN 345.00 = PLN 345.00" }
        ];

        for(let testCase of testCases){
            render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
            const result = screen.getByTestId('result');
            expect(result).toHaveTextContent(testCase.expectedResult);
            cleanup();
        }
    });
});