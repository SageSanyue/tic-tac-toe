import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
    /*constructor(){
        super();
        this.state = {
            value: null,
        };
    }
    //添加 onClick 属性到内置的 DOM 元素 <button> 上让 React 开启了对点击事件的监听。
    //当按钮，也就是棋盘格子被点击时, React 会调用 Square 组件的 render() 方法中的 onClick 事件处理函数。
    //事件处理函数触发了传入其中的 this.props.onClick() 方法。这个方法是由 Board 传递给 Square 的。
    //Board 传递了 onClick={() => this.handleClick(i)} 给 Square，所以当 Square 中的事件处理函数触发时，其实就是触发的 Board 当中的 this.handleClick(i) 方法。
    render() {
      return (
        <button className="square" 
        onClick={() => this.props.onClick({})}>
          {this.props.value}  
        </button>
      );
    }
  }       //格子组件 Square 不再拥有自身的状态数据了。它从棋盘父组件 Board 接受数据，并且当自己被点击时通知触发父组件改变状态数据，我们称这类的组件为 受控组件。
  */
 function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
 }  //以函数定义的方式重写 Square 组件
  class Board extends React.Component {
    constructor() {
        super();
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();//用了 .slice() 方法来将之前的数组数据浅拷贝到了一个新的数组中，而不是修改已有的数组。
        //squares[i] = 'X';
        //this.setState({squares: squares});
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'x' : 'o';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        }) //每走一步棋，都需要切换 xIsNext 的值以此来实现 X 和 O 轮流落子的效果
    }

    renderSquare(i) {
      return (<Square
               value={this.state.squares[i]}
               onClick={()=>this.handleClick(i)}
               />
               );
    }
  
    render() {
      //const status = 'Next player: X';
      //const status = 'Next player:' + (this.state.xIsNext ? 'x' : 'o'); //再到 render 方法里添加一点内容来显示当前执子的一方
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      

      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  