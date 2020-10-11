import React, { useState, useRef, useEffect } from 'react';
import { Calculator as CalculatorEntity } from '../../entities/Calculator';
import { Actions } from '../../entities/Calculator';
import { CalculatorContainer } from './CalculatorContainer';
import { ResultContainer } from './ResultContainer';
import { Expression } from './Expression';
import { Result } from './Result';
import { ButtonsContainer } from './ButtonsContainer';
import { ButtonsColumn } from './ButtonsColumn';
import { Button } from './Button';

export const Calculator: React.FC = () => {
    const [calculator] = useState(new CalculatorEntity());
    const [startHoldingTime, setStartHoldingTime] = useState(new Date());
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const calculatorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (calculatorRef.current !== null) {
            calculatorRef.current.focus();
        }
    }, []);

    const addDigit = (action: Actions) => {
        setExpression(calculator.dispatch(action));
    };

    const getResult = (action: Actions) => {
        setResult(calculator.dispatch(action));
        setExpression(calculator.result);
    };

    const clearAllInput = (action: Actions) => {
        if (new Date().getTime() - startHoldingTime.getTime() > 200) {
            setResult(calculator.dispatch(action));
            setExpression(calculator.result);
        }
    };

    const handleKeyboardInput = (e: React.KeyboardEvent) => {
        const OPERATORS = ['*', '/', '+'];
        const NUMBERS = ['0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (NUMBERS.includes(e.key)) {
            return addDigit({
                type: 'addNumber',
                value: e.key,
            });
        }
        if (OPERATORS.includes(e.key)) {
            return addDigit({
                type: 'addOperator',
                value: e.key,
            });
        }
        if (e.key === '-') {
            return addDigit({
                type: 'addNegative',
                value: e.key,
            });
        }
        if (e.key === 'Backspace') {
            return addDigit({
                type: 'removeLastDigit',
            });
        }
        if (e.key === 'Enter') {
            return getResult({
                type: 'calculate',
            });
        }
    };

    return (
        <CalculatorContainer
            tabIndex={0}
            onKeyDown={(e) => handleKeyboardInput(e)}
            ref={calculatorRef}
            data-testid="calculator-container"
        >
            <ResultContainer>
                <Expression data-testid="expression">{expression}</Expression>
                <Result data-testid="result">{result}</Result>
            </ResultContainer>
            <ButtonsContainer>
                <ButtonsColumn>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '7',
                            })
                        }
                    >
                        7
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '4',
                            })
                        }
                    >
                        4
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '1',
                            })
                        }
                    >
                        1
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '.',
                            })
                        }
                    >
                        .
                    </Button>
                </ButtonsColumn>
                <ButtonsColumn>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '8',
                            })
                        }
                    >
                        8
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '5',
                            })
                        }
                    >
                        5
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '2',
                            })
                        }
                    >
                        2
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '0',
                            })
                        }
                    >
                        0
                    </Button>
                </ButtonsColumn>
                <ButtonsColumn>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '9',
                            })
                        }
                    >
                        9
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '6',
                            })
                        }
                    >
                        6
                    </Button>
                    <Button
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '3',
                            })
                        }
                    >
                        3
                    </Button>
                    <Button
                        operator={1}
                        onClick={() =>
                            getResult({
                                type: 'calculate',
                            })
                        }
                    >
                        =
                    </Button>
                </ButtonsColumn>
                <ButtonsColumn>
                    <Button
                        operator={1}
                        data-testid="delete"
                        onClick={() => {
                            addDigit({
                                type: 'removeLastDigit',
                            });
                        }}
                        onMouseDown={() => setStartHoldingTime(new Date())}
                        onMouseUp={() => {
                            clearAllInput({ type: 'clearAll' });
                        }}
                    >
                        DEL
                    </Button>
                    <Button
                        operator={1}
                        onClick={() => {
                            addDigit({
                                type: 'addOperator',
                                value: '/',
                            });
                        }}
                    >
                        /
                    </Button>
                    <Button
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addOperator',
                                value: '*',
                            })
                        }
                    >
                        X
                    </Button>
                    <Button
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addNegative',
                                value: '-',
                            })
                        }
                    >
                        -
                    </Button>
                    <Button
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addOperator',
                                value: '+',
                            })
                        }
                    >
                        +
                    </Button>
                </ButtonsColumn>
            </ButtonsContainer>
        </CalculatorContainer>
    );
};
