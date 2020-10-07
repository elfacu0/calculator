import { Actions } from '../App';

const OPERATORS = ['*', '/', '+'];

export class Calculator {
    result: string;
    expression: string[];
    currentTerm: string;
    lastDigit: string;

    constructor() {
        this.result = '';
        this.expression = [];
        this.expression = [
            '2',
            '+',
            '23',
            '*',
            '34',
            '/',
            '34',
            '+',
            '23',
            '+',
            '32',
            '*',
            '234',
        ];
        this.currentTerm = '';
        this.lastDigit = '*';
    }

    dispatch = (action: Actions) => {
        console.log(this.expression, action);
        switch (action.type) {
            case 'addNegative':
                if (this.currentTerm.includes('-') === false) {
                    this.currentTerm = '-';
                    this.expression.push(this.currentTerm);
                    this.setLastDigit();
                }
                return this.expression.join('');
            case 'addNumber':
                this.currentTerm += action.value;
                if (this.isLastDigitOperator(this.expression) === false) {
                    this.expression.pop();
                }
                this.expression.push(this.currentTerm);
                this.setLastDigit();
                return this.expression.join('');
            case 'addOperator':
                if (
                    this.isLastDigitOperator(this.expression) ||
                    this.lastDigit === '-'
                ) {
                    return this.expression.join('');
                } else {
                    this.expression.push(action.value);
                    this.currentTerm = '';
                    this.setLastDigit();
                    return this.expression.join('');
                }
            case 'removeLastDigit':
                if (this.expression.length > 0) {
                    if (this.expression[this.expression.length - 1] === '') {
                        this.expression.pop();
                    }
                    let lastTerm: string = this.expression.pop() || '';
                    lastTerm = lastTerm.substring(0, lastTerm.length - 1);
                    this.currentTerm = lastTerm;
                    this.setLastDigit();
                    if (this.currentTerm !== '') {
                        this.expression.push(lastTerm);
                    }
                }
                return this.expression.join('');
            case 'calculate':
                return this.calculate(this.expression);
            default:
                return '';
        }
    };

    calculate(expression: string[]) {
        if (this.isLastDigitOperator(expression)) {
            expression.pop();
        }
        expression = this.multiplyAndDivide(expression);
        this.result = this.sum(expression);
        this.reset();
        return this.result;
    }

    multiplyAndDivide(expression: string[]) {
        let currentTerm = 0;
        let i = 0;
        let currentTermString = '';
        let leftHalf = [];
        let rightHalf = [];
        const MultiplyAndDivideSign = ['*', '/'];
        while (i < expression.length - 1) {
            leftHalf.push(expression[i]);
            if (MultiplyAndDivideSign.includes(expression[i + 1]) === true) {
                if (expression[i + 1] === '*') {
                    currentTerm =
                        Number(expression[i]) * Number(expression[i + 2]);
                } else if (expression[i + 1] === '/') {
                    currentTerm =
                        Number(expression[i]) / Number(expression[i + 2]);
                }
                currentTermString = currentTerm.toString();
                leftHalf.pop();
                rightHalf = expression.slice(i + 3, expression.length);
                expression = leftHalf;
                leftHalf = [];
                expression.push(currentTermString);
                expression = expression.concat(rightHalf);
                i = -1;
            }
            i++;
        }
        return expression;
    }
    sum(expression: string[]) {
        let total = 0;
        let currentNumber = 0;
        for (let i = 0; i < expression.length; i++) {
            currentNumber = Number(expression[i]);
            if (OPERATORS.includes(expression[i]) === false) {
                total += currentNumber;
                console.log(total, currentNumber);
            }
        }
        this.expression = [];
        return total.toString();
    }

    setLastDigit() {
        if (this.expression.length > 0) {
            const lastTerm = this.expression[this.expression.length - 1];
            this.lastDigit = lastTerm[lastTerm.length - 1];
        }
    }

    isLastDigitOperator(expression: string[]) {
        if (OPERATORS.includes(expression[expression.length - 1]) === true) {
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.expression = [this.result];
        this.currentTerm = '';
        this.lastDigit = '*';
    }
}
