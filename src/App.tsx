import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App p-3">
      <button className="btn btn-primary">Hello daisyUI</button>
      <div className="card bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="rating gap-1 mt-5">
        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />
        <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
        <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
      </div>
    </div>
  );
}

export default App;
