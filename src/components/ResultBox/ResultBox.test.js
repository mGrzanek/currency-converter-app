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
});