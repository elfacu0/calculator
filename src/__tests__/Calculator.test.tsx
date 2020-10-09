import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calculator } from '../Calculator';

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
