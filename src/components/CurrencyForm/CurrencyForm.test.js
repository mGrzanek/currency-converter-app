import { render, screen, cleanup  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => { }} />);
    });
    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
      ];
      
      for(const testObj of testCases) {

        // render component
        render(<CurrencyForm action={action} />);

        // find “convert” button
        const submitButton = screen.getByText('Convert');

        // find fields elems
        const amountField = screen.getByTestId('amount');
        const fromField = screen.getByTestId('from-select');
        const toField = screen.getByTestId('to-select');

        // set test values to fields
        userEvent.type(amountField, testObj.amount);
        userEvent.selectOptions(fromField, testObj.from);
        userEvent.selectOptions(toField, testObj.to);

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // inmount component
        cleanup()
      }

       // check if action callback was called once and with proper argument
       expect(action).toHaveBeenCalledTimes(testCases.length);
       expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
       expect(action).toHaveBeenCalledWith({ amount: 20, from: 'USD', to: 'PLN' });
       expect(action).toHaveBeenCalledWith({ amount: 200, from: 'PLN', to: 'USD' });
       expect(action).toHaveBeenCalledWith({ amount: 345, from: 'USD', to: 'PLN' });
    });
});