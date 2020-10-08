import { Calculator as CalculatorEntity } from './Calculator';
let calculator: CalculatorEntity;

const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

beforeEach(() => {
    calculator = new CalculatorEntity();
});

describe('Sum Tests', () => {
    it('should sum 2 positive numbers and return a bigger one', () => {
        const number1 = randomNumberBetween(0, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(0, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '+',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeGreaterThanOrEqual(number1);
        expect(result).toBeGreaterThanOrEqual(number2);
        expect(result).toBe(number1 + number2);
    });

    it('should sum 2 negative numbers and return a smaller one', () => {
        const number1 = randomNumberBetween(0, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(0, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '+',
        });
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        console.log(number1, number2);
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeLessThanOrEqual(-number1);
        expect(result).toBeLessThanOrEqual(-number2);
        expect(result).toBe(-number1 - number2);
    });

    it('should sum a negative and a number and return a number bigger than negative but smaller than positive', () => {
        const number1 = randomNumberBetween(0, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(0, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '+',
        });
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeLessThanOrEqual(number1);
        expect(result).toBeGreaterThanOrEqual(-number2);
        expect(result).toBe(number1 - number2);
    });
});

describe('basic tests', () => {
    it('should calculate the right answer', () => {
        const expression = [
            '2',
            '+',
            '23',
            '*',
            '-34',
            '/',
            '34',
            '+',
            '23',
            '+',
            '32',
            '*',
            '234',
            '-3',
        ];
        calculator.expression = expression;
        let correctAnswer = eval(expression.join('')).toString();
        expect(calculator.dispatch({ type: 'calculate' })).toBe(correctAnswer);
    });
});

describe('Multiplication Tests', () => {
    it('should multiply 2 positive numbers and return a bigger one', () => {
        const number1 = randomNumberBetween(0, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(0, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '*',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeGreaterThanOrEqual(number1);
        expect(result).toBeGreaterThanOrEqual(number2);
        expect(result).toBe(number1 * number2);
    });

    it('should multiply 2 negative numbers and return a bigger positive one', () => {
        const number1 = randomNumberBetween(0, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(0, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '*',
        });
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeGreaterThanOrEqual(-number1);
        expect(result).toBeGreaterThanOrEqual(-number2);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBe(-number1 * -number2);
    });

    it('should multiply a negative and a positive number return a smllaer negative one', () => {
        const number1 = randomNumberBetween(1, 1000);
        const number1String = number1.toString();
        const number2 = randomNumberBetween(1, 1000);
        const number2String = number2.toString();
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number1String,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '*',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: number2String,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeLessThanOrEqual(-number1);
        expect(result).toBeLessThanOrEqual(number2);
        expect(result).toBeLessThanOrEqual(0);
        expect(result).toBe(-number1 * number2);
    });
});

describe('Division Tests', () => {
    it('should divide 2 positive numbers, numerator bigger than denominator', () => {
        const numerator = randomNumberBetween(100, 1000);
        const numertorString = numerator.toString();
        const denominator = randomNumberBetween(1, 10);
        const denominatorString = denominator.toString();
        calculator.dispatch({
            type: 'addNumber',
            value: numertorString,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '/',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: denominatorString,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(numerator);
        expect(result).toBe(numerator / denominator);
    });

    it('should divide 2 positive numbers, denominator bigger than numerator', () => {
        const numerator = randomNumberBetween(1, 100);
        const numertorString = numerator.toString();
        const denominator = randomNumberBetween(100, 1000);
        const denominatorString = denominator.toString();
        calculator.dispatch({
            type: 'addNumber',
            value: numertorString,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '/',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: denominatorString,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeLessThanOrEqual(1);
        expect(result).toBe(numerator / denominator);
    });

    it('should divide 2 negative number', () => {
        const numerator = randomNumberBetween(10, 100);
        const numertorString = numerator.toString();
        const denominator = randomNumberBetween(100, 1000);
        const denominatorString = denominator.toString();
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: numertorString,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '/',
        });
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: denominatorString,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeGreaterThanOrEqual(-numerator);
        expect(result).toBeGreaterThanOrEqual(-denominator);
        expect(result).toBeGreaterThan(0);
        expect(result).toBe(-numerator / -denominator);
    });

    it('should divide one positive and one negative number, should return negative number', () => {
        const numerator = randomNumberBetween(10, 100);
        const numertorString = numerator.toString();
        const denominator = randomNumberBetween(100, 1000);
        const denominatorString = denominator.toString();
        calculator.dispatch({
            type: 'addNegative',
            value: '-',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: numertorString,
        });
        calculator.dispatch({
            type: 'addOperator',
            value: '/',
        });
        calculator.dispatch({
            type: 'addNumber',
            value: denominatorString,
        });
        const result = Number(calculator.dispatch({ type: 'calculate' }));
        expect(result).toBeLessThan(0);
        expect(result).toBe(-numerator / denominator);
    });
});
