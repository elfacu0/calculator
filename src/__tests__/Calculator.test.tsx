import React from 'react';
import { render } from '@testing-library/react';
import { Calculator } from '../Calculator';

it('clicking a number should display it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    numberThreeButton.click();
    const expressionContainer = getByTestId('expression');
    expect(expressionContainer).toContainHTML('3');
});

it('should display the number and then remove it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const deleteButton = getByText('DEL');
    const expressionContainer = getByTestId('expression');
    numberThreeButton.click();
    expect(expressionContainer).toContainHTML('3');
    deleteButton.click();
    expect(expressionContainer).toContainHTML('');
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
    expect(expressionContainer).toContainHTML('137');
});

it('clicking an operator should display it', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const plusOperatorButton = getByText('+');
    const numberSevenButton = getByText('7');
    const expressionContainer = getByTestId('expression');
    numberThreeButton.click();
    plusOperatorButton.click();
    numberSevenButton.click();
    expect(expressionContainer).toContainHTML('3+7');
});

it('submiting an equation should show the answer', async () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const numberThreeButton = getByText('3');
    const plusOperatorButton = getByText('+');
    const numberSevenButton = getByText('7');
    const resultContainer = getByTestId('result');
    const EqualButton = getByText('=');
    EqualButton.click();
    numberThreeButton.click();
    plusOperatorButton.click();
    numberSevenButton.click();
    EqualButton.click();
    expect(resultContainer).toContainHTML('10');
});
