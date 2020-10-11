import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Calculator as CalculatorEntity } from './entities/Calculator';
import { Actions } from './entities/Calculator';

const CalculatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 550px;
    min-width: 320px;
    width: 35vw;
    max-width: 700px;
    &:focus {
        outline: none;
    }
`;

const ResultContainer = styled.div`
    background-color: #2b292a;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
    height: 30%;
    overflow: hidden;
`;

const Expression = styled.span`
    color: white;
    font-size: 28px;
    height: 50%;
    white-space: nowrap;
    text-align-last: end;
`;

const Result = styled(Expression)`
    color: lightgray;
    font-size: 30px;
`;

const ButtonsContainer = styled.div`
    background-color: #212123;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto;
`;

const ButtonsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
`;

type ButtonProps = {
    operator?: number;
};

const Button = styled.div<ButtonProps>`
    background-color: ${(props: ButtonProps) =>
        props.operator === 1 ? '#193543' : '#343434'};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e8e8e8;
    font-size: 26px;
    border-radius: 5px;
    margin: 10px;
    height: 100%;
    cursor: pointer;
    &:hover {
        background-color: #00d4d4;
    }
`;

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
            return addDigit({
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
