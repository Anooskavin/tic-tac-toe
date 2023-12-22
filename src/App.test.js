import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { checkWinner, gameHistory } from "./App"


describe("TIC TAC TOE App",()=>{
  it("Running Without Issues",()=>{
    render(<App />);
  })

  it("X and O Button Clicking With Wining Chance",()=>{
    render(<App />);
    // console.log(getByText);
    const boxButton = screen.getAllByRole('button')

    

    fireEvent.click(boxButton[2]);
    expect(boxButton[2].textContent).toBe('O');

    fireEvent.click(boxButton[6]);
    expect(boxButton[6].textContent).toBe('X');

    fireEvent.click(boxButton[1]);
    expect(boxButton[1].textContent).toBe('O');

    fireEvent.click(boxButton[7]);
    expect(boxButton[7].textContent).toBe('X');

    fireEvent.click(boxButton[0]);
    expect(boxButton[0].textContent).toBe('O');

    

    const gameBox = [['O', 'O', 'O'],['\u00A0', '\u00A0', '\u00A0'],['X', 'X', '\u00A0']]


    const result = checkWinner(gameBox);
    expect(result).toBe(true);
  })

  it("X and O Button Clicking With Draw Chance",()=>{
    render(<App />);
    // console.log(getByText);
    const boxButton = screen.getAllByRole('button')

    

    fireEvent.click(boxButton[2]);
    expect(boxButton[2].textContent).toBe('O');

    fireEvent.click(boxButton[6]);
    expect(boxButton[6].textContent).toBe('X');

    fireEvent.click(boxButton[1]);
    expect(boxButton[1].textContent).toBe('O');

    fireEvent.click(boxButton[7]);
    expect(boxButton[7].textContent).toBe('X');

    fireEvent.click(boxButton[4]);
    expect(boxButton[4].textContent).toBe('O');

    fireEvent.click(boxButton[0]);
    expect(boxButton[0].textContent).toBe('X');

    fireEvent.click(boxButton[8]);
    expect(boxButton[8].textContent).toBe('O');

    fireEvent.click(boxButton[5]);
    expect(boxButton[5].textContent).toBe('X');

    fireEvent.click(boxButton[3]);
    expect(boxButton[3].textContent).toBe('O');

    

    const gameBox = [['X', 'O', 'O'],['O', 'O', 'X'],['X', 'X', 'O']]


    const result = checkWinner(gameBox);
    expect(result).toBe(false);
  })


  it("X and O Button Clicking Undo Redo",()=>{
    const {getByText} = render(<App />);
    // console.log(getByText);
    const boxButton = screen.getAllByRole('button')

    

    fireEvent.click(boxButton[0]);
    expect(boxButton[0].textContent).toBe('O');

    fireEvent.click(boxButton[1]);
    expect(boxButton[1].textContent).toBe('X');

    fireEvent.click(boxButton[3]);
    expect(boxButton[3].textContent).toBe('O');

    fireEvent.click(boxButton[4]);
    expect(boxButton[4].textContent).toBe('X');

    fireEvent.click(boxButton[6]);
    expect(boxButton[6].textContent).toBe('O');

    

    let gameBox = [['O', 'X', '\u00A0'],[ 'O','X' ,'\u00A0'],['O', '\u00A0', '\u00A0']]


    let result = checkWinner(gameBox);
    expect(result).toBe(true);

    expect(getByText('Winner : O')).toBeInTheDocument();

    fireEvent.click(getByText("Go To 3"));

    fireEvent.click(boxButton[6]);
    expect(boxButton[6].textContent).toBe('X');

    fireEvent.click(boxButton[8]);
    expect(boxButton[8].textContent).toBe('O');

    fireEvent.click(boxButton[4]);
    expect(boxButton[4].textContent).toBe('X');

    fireEvent.click(boxButton[5]);
    expect(boxButton[5].textContent).toBe('O');

    fireEvent.click(boxButton[2]);
    expect(boxButton[2].textContent).toBe('X');

     gameBox = [['O', 'X', 'X'],[ 'O','X' ,'O'],['X', '\u00A0', 'O']]

     result = checkWinner(gameBox);
     expect(result).toBe(true);
 
     expect(getByText('Winner : X')).toBeInTheDocument();

  })

  




  

} )