import React from 'react';
import styled from '@emotion/styled';

const AppWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f4045;
`;

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
`;

const EquationText = styled.span`
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

const ButtonWrapper = styled.div`
    background-color: #343434;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e8e8e8;
    font-size: 24px;
    border-radius: 5px;
    margin: 10px;
    height: 100%;
`;

function App() {
    return (
        <AppWrapper>
            <CalculatorContainer>
                <ResultContainer>
                    <EquationText>3+3</EquationText>
                    <ResultText>34+434</ResultText>
                </ResultContainer>
                <ButtonsContainer>
                    <ButtonsColumn>
                        <ButtonWrapper>7</ButtonWrapper>
                        <ButtonWrapper>4</ButtonWrapper>
                        <ButtonWrapper>1</ButtonWrapper>
                        <ButtonWrapper>.</ButtonWrapper>
                    </ButtonsColumn>
                    <ButtonsColumn>
                        <ButtonWrapper>8</ButtonWrapper>
                        <ButtonWrapper>5</ButtonWrapper>
                        <ButtonWrapper>6</ButtonWrapper>
                        <ButtonWrapper>0</ButtonWrapper>
                    </ButtonsColumn>
                    <ButtonsColumn>
                        <ButtonWrapper>9</ButtonWrapper>
                        <ButtonWrapper>6</ButtonWrapper>
                        <ButtonWrapper>3</ButtonWrapper>
                        <ButtonWrapper>=</ButtonWrapper>
                    </ButtonsColumn>
                    <ButtonsColumn>
                        <ButtonWrapper>Del</ButtonWrapper>
                        <ButtonWrapper>/</ButtonWrapper>
                        <ButtonWrapper>X</ButtonWrapper>
                        <ButtonWrapper>-</ButtonWrapper>
                        <ButtonWrapper>+</ButtonWrapper>
                    </ButtonsColumn>
                </ButtonsContainer>
            </CalculatorContainer>
        </AppWrapper>
    );
}

export default App;
