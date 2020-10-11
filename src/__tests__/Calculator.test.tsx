import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calculator } from '../components/Calculator/Calculator';

const mockHolding = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

it('clicking a number should display it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    numberThreeButton.click();
    const expressionContainer = getByTestId('expression');
    expect(expressionContainer.textContent).toBe('3');
});

it('should display a number and then remove it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const deleteButton = getByTestId('delete');
    const expressionContainer = getByTestId('expression');
    numberThreeButton.click();
    expect(expressionContainer.textContent).toBe('3');
    deleteButton.click();
    fireEvent.mouseDown(deleteButton);
    fireEvent.mouseUp(deleteButton);
    expect(expressionContainer).toBeEmpty();
});

it('should display 2 numbers and then remove only the last one', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const numberFiveButton = getByText('5');
    const deleteButton = getByTestId('delete');
    const expressionContainer = getByTestId('expression');
    numberThreeButton.click();
    numberFiveButton.click();
    expect(expressionContainer.textContent).toBe('35');
    deleteButton.click();
    expect(expressionContainer.textContent).toBe('3');
});

it('clicking several numbers should display them', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberOneButton = getByText('1');
    const numberThreeButton = getByText('3');
    const numberSevenButton = getByText('7');
    numberOneButton.click();
    numberThreeButton.click();
    numberSevenButton.click();
    const expressionContainer = getByTestId('expression');
    expect(expressionContainer.textContent).toBe('137');
});

it('clicking all the numbers should display them', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    getByText('0').click();
    getByText('.').click();
    getByText('1').click();
    getByText('2').click();
    getByText('3').click();
    getByText('4').click();
    getByText('5').click();
    getByText('6').click();
    getByText('7').click();
    getByText('8').click();
    getByText('9').click();
    const expressionContainer = getByTestId('expression');
    expect(expressionContainer.textContent).toBe('0.123456789');
});

it('should not appear two dots when dot button is clicked twice', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const expressionContainer = getByTestId('expression');
    const dotButton = getByText('.');
    dotButton.click();
    dotButton.click();
    expect(expressionContainer.textContent).toBe('.');
});

it('should not appear two dots when there is already one in  the term', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const expressionContainer = getByTestId('expression');
    const numberOneButton = getByText('1');
    const dotButton = getByText('.');
    dotButton.click();
    numberOneButton.click();
    dotButton.click();
    expect(expressionContainer.textContent).toBe('.1');
});

it('should not be possible to put a minus after a dot', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const expressionContainer = getByTestId('expression');
    const minusButton = getByText('-');
    const dotButton = getByText('.');
    dotButton.click();
    minusButton.click();
    expect(expressionContainer.textContent).toBe('.');
});

it('clicking an operator should display it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const plusOperatorButton = getByText('+');
    const expressionContainer = getByTestId('expression');
    numberThreeButton.click();
    plusOperatorButton.click();
    expect(expressionContainer.textContent).toBe('3+');
});

it('submiting an equation should show the answer', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const plusOperatorButton = getByText('+');
    const numberSevenButton = getByText('7');
    const resultContainer = getByTestId('result');
    const EqualButton = getByText('=');
    numberThreeButton.click();
    plusOperatorButton.click();
    numberSevenButton.click();
    EqualButton.click();
    expect(resultContainer.textContent).toBe('10');
});

it('holding DEL button should clear all when released', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const plusOperatorButton = getByText('+');
    const numberSevenButton = getByText('7');
    const resultContainer = getByTestId('result');
    const expressionContainer = getByTestId('expression');
    const deleteButton = getByText('DEL');
    const EqualButton = getByText('=');
    numberThreeButton.click();
    plusOperatorButton.click();
    numberSevenButton.click();
    EqualButton.click();
    expect(resultContainer.textContent).toBe('10');
    fireEvent.mouseDown(deleteButton);
    await mockHolding(500);
    fireEvent.mouseUp(deleteButton);
    expect(resultContainer).toBeEmpty();
    expect(expressionContainer).toBeEmpty();
});

it('should display all operators and remove them', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const expressionContainer = getByTestId('expression');
    const deleteButton = getByText('DEL');
    getByText('9').click();
    getByText('/').click();
    expect(expressionContainer.textContent).toBe('9/');
    deleteButton.click();
    getByText('X').click();
    expect(expressionContainer.textContent).toBe('9*');
    deleteButton.click();
    getByText('-').click();
    expect(expressionContainer.textContent).toBe('9-');
    deleteButton.click();
    getByText('+').click();
    expect(expressionContainer.textContent).toBe('9+');
});

describe('test keyboard interaction', () => {
    it('should display all the numbers', () => {
        const { getByTestId } = render(<Calculator />);
        const expressionContainer = getByTestId('expression');
        const container = getByTestId('calculator-container');
        fireEvent.keyDown(container, { key: '0' });
        fireEvent.keyDown(container, { key: '.' });
        fireEvent.keyDown(container, { key: '1' });
        fireEvent.keyDown(container, { key: '2' });
        fireEvent.keyDown(container, { key: '3' });
        fireEvent.keyDown(container, { key: '4' });
        fireEvent.keyDown(container, { key: '5' });
        fireEvent.keyDown(container, { key: '6' });
        fireEvent.keyDown(container, { key: '7' });
        fireEvent.keyDown(container, { key: '8' });
        fireEvent.keyDown(container, { key: '9' });
        expect(expressionContainer.textContent).toBe('0.123456789');
    });

    it('should remove last digit of expression', () => {
        const { getByTestId } = render(<Calculator />);
        const expressionContainer = getByTestId('expression');
        const container = getByTestId('calculator-container');
        fireEvent.keyDown(container, { key: '0' });
        fireEvent.keyDown(container, { key: 'Backspace' });
        expect(expressionContainer.textContent).toBe('');
    });

    it('should display all the operators', () => {
        const { getByTestId } = render(<Calculator />);
        const expressionContainer = getByTestId('expression');
        const container = getByTestId('calculator-container');
        fireEvent.keyDown(container, { key: '1' });
        fireEvent.keyDown(container, { key: '+' });
        expect(expressionContainer.textContent).toBe('1+');
        fireEvent.keyDown(container, { key: 'Backspace' });
        fireEvent.keyDown(container, { key: '-' });
        expect(expressionContainer.textContent).toBe('1-');
        fireEvent.keyDown(container, { key: 'Backspace' });
        fireEvent.keyDown(container, { key: '/' });
        expect(expressionContainer.textContent).toBe('1/');
        fireEvent.keyDown(container, { key: 'Backspace' });
        fireEvent.keyDown(container, { key: '*' });
        expect(expressionContainer.textContent).toBe('1*');
    });

    it('should show the right result', () => {
        const { getByTestId } = render(<Calculator />);
        const expressionContainer = getByTestId('expression');
        const container = getByTestId('calculator-container');
        fireEvent.keyDown(container, { key: '1' });
        fireEvent.keyDown(container, { key: '-' });
        fireEvent.keyDown(container, { key: '6' });
        fireEvent.keyDown(container, { key: 'Enter' });
        expect(expressionContainer.textContent).toBe('-5');
    });
});
