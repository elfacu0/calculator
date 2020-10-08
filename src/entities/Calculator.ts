export type Actions =
    | {
          type: 'addNumber' | 'addOperator' | 'addNegative';
          value: string;
      }
    | { type: 'removeLastDigit' | 'calculate' | 'clearAll' };

const OPERATORS = ['*', '/', '+'];

export class Calculator {
    result: string;
    expression: string[];
    currentTerm: string;
    lastDigit: string;

    constructor() {
        this.result = '';
        this.expression = [];
        this.currentTerm = '';
        this.lastDigit = '';
    }

    dispatch = (action: Actions) => {
        switch (action.type) {
            case 'addNegative':
                if (this.lastDigit !== '-') {
                    this.currentTerm = '-';
                    this.expression.push(this.currentTerm);
                    this.setLastDigit();
                }
                return this.expression.join('');
            case 'addNumber':
                if (this.isLastDigitOperator() === false) {
                    this.expression.pop();
                }
                this.currentTerm += action.value;
                this.expression.push(this.currentTerm);
                this.setLastDigit();
                return this.expression.join('');
            case 'addOperator':
                if (this.isLastDigitNumber() === true) {
                    this.expression.push(action.value);
                    this.currentTerm = '';
                    this.setLastDigit();
                }
                return this.expression.join('');
            case 'removeLastDigit':
                if (this.expression.length > 0) {
                    if (this.expression[this.expression.length - 1] === '') {
                        this.expression.pop();
                    }
                    let lastTerm = this.expression.pop() || '';
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
            case 'clearAll':
                return this.reset();
            default:
                return '';
        }
    };

    calculate(expression: string[]) {
        while (this.isLastDigitOperator() || this.lastDigit === '-') {
            expression.pop();
            this.setLastDigit();
        }
        expression = this.multiplyAndDivide(expression);
        this.result = this.sum(expression).toString();
        this.clearExpression();
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
            }
        }
        this.expression = [];
        return total;
    }

    setLastDigit() {
        if (this.expression.length > 0) {
            const lastTerm = this.expression[this.expression.length - 1];
            this.lastDigit = lastTerm[lastTerm.length - 1];
        }
    }

    isLastDigitOperator() {
        this.setLastDigit();
        if (OPERATORS.includes(this.lastDigit) === true) {
            return true;
        } else {
            return false;
        }
    }

    isLastDigitNumber() {
        const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.setLastDigit();
        if (NUMBERS.includes(this.lastDigit) === true) {
            return true;
        } else {
            return false;
        }
    }

    clearExpression() {
        this.expression = [this.result];
        this.currentTerm = '';
        this.lastDigit = '';
    }

    reset() {
        this.result = '';
        this.expression = [];
        this.currentTerm = '';
        this.lastDigit = '';
        return '';
    }
}
