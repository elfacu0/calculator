import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Calculator as CalculatorEntity } from './entities/Calculator';
import { Actions } from './entities/Calculator';
const calculator = new CalculatorEntity();
let startHoldingTime = new Date();

const CalculatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 550px;
    min-width: 320px;
    width: 40vw;
    max-width: 800px;
`;

const ResultContainer = styled.div`
    background-color: #2b292a;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
    height: 30%;
    overflow: auto;
`;

const ExpressionText = styled.span`
    color: white;
    font-size: 28px;
`;

const ResultText = styled.span`
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

type ButtonWrapperProps = {
    operator?: number;
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
    background-color: ${(props: ButtonWrapperProps) =>
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
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const addDigit = (action: Actions) => {
        setExpression(calculator.dispatch(action));
    };

    const getResult = (action: Actions) => {
        setResult(calculator.dispatch(action));
        setExpression(calculator.result);
    };

    const clearAllInput = (action: Actions) => {
        if (new Date().getTime() - startHoldingTime.getTime() > 400) {
            setResult(calculator.dispatch(action));
            setExpression(calculator.result);
        }
    };

    return (
        <CalculatorContainer>
            <ResultContainer>
                <ExpressionText>{expression}</ExpressionText>
                <ResultText>{result}</ResultText>
            </ResultContainer>
            <ButtonsContainer>
                <ButtonsColumn>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '7',
                            })
                        }
                    >
                        7
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '4',
                            })
                        }
                    >
                        4
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '1',
                            })
                        }
                    >
                        1
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '.',
                            })
                        }
                    >
                        .
                    </ButtonWrapper>
                </ButtonsColumn>
                <ButtonsColumn>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '8',
                            })
                        }
                    >
                        8
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '5',
                            })
                        }
                    >
                        5
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '2',
                            })
                        }
                    >
                        2
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '0',
                            })
                        }
                    >
                        0
                    </ButtonWrapper>
                </ButtonsColumn>
                <ButtonsColumn>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '9',
                            })
                        }
                    >
                        9
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '6',
                            })
                        }
                    >
                        6
                    </ButtonWrapper>
                    <ButtonWrapper
                        onClick={() =>
                            addDigit({
                                type: 'addNumber',
                                value: '3',
                            })
                        }
                    >
                        3
                    </ButtonWrapper>
                    <ButtonWrapper
                        operator={1}
                        onClick={() =>
                            getResult({
                                type: 'calculate',
                            })
                        }
                    >
                        =
                    </ButtonWrapper>
                </ButtonsColumn>
                <ButtonsColumn>
                    <ButtonWrapper
                        operator={1}
                        onClick={() => {
                            addDigit({
                                type: 'removeLastDigit',
                            });
                        }}
                        onMouseDown={() => (startHoldingTime = new Date())}
                        onMouseUp={() => {
                            clearAllInput({ type: 'clearAll' });
                        }}
                    >
                        DEL
                    </ButtonWrapper>
                    <ButtonWrapper
                        operator={1}
                        onClick={() => {
                            addDigit({
                                type: 'addOperator',
                                value: '/',
                            });
                        }}
                    >
                        /
                    </ButtonWrapper>
                    <ButtonWrapper
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addOperator',
                                value: '*',
                            })
                        }
                    >
                        X
                    </ButtonWrapper>
                    <ButtonWrapper
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addNegative',
                                value: '-',
                            })
                        }
                    >
                        -
                    </ButtonWrapper>
                    <ButtonWrapper
                        operator={1}
                        onClick={() =>
                            addDigit({
                                type: 'addOperator',
                                value: '+',
                            })
                        }
                    >
                        +
                    </ButtonWrapper>
                </ButtonsColumn>
            </ButtonsContainer>
        </CalculatorContainer>
    );
};
