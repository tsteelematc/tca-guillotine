import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home, AppTitle } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import {
  GameResult
  , getLeaderboard
  , getGeneralFacts
  , getPreviousPlayers
  , getPissBoyLeaderboard
  , getPointFunFacts
  , getNotableNobleFunFacts
} from './GameResults';

const dummyGameResults: GameResult[] = [
  {
    winner: "Tom"
    , players: [
      "Tom"
      , "Batu"
      , "Julia"
      , "Melisa"
      , "John"
    ]
    , start: "2024-02-28T18:10:32.123Z"
    , end: "2024-02-28T18:15:34.123Z"
    , notableNoblesWithPlayers: [
      {
        nobleName: "King Louis XVI"
        , playerName: "Batu"
      }
      , {
        nobleName: "Piss Boy"
        , playerName: "Tom"
      }
      , {
        nobleName: "Marie Antionette"
        , playerName: "Tom"
      }
    ]
    , playerPoints: [
      ["Tom", 25]
      , ["Batu", 3]
      , ["Julia", 3]
      , ["Melisa", 10]
      , ["John", 10]
    ]
  }
  , {
    winner: "John"
    , players: [
      "Batu"
      , "Julia"
      , "Melisa"
      , "John"
    ]
    , start: "2024-02-28T18:20:32.123Z"
    , end: "2024-02-28T18:47:34.123Z"
    , notableNoblesWithPlayers: [
      {
        nobleName: "Piss Boy"
        , playerName: "John"
      }
      , {
        nobleName: "King Louis XVI"
        , playerName: "John"
      }
      , {
        nobleName: "Marie Antionette"
        , playerName: "John"
      }
    ]
    , playerPoints: [
      ["Batu", 3]
      , ["Julia", 10]
      , ["Melisa", 10]
      , ["John", 20]
    ]
  }
];

const App = () => {

  // Uncomment this line to see app running without any game results...
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

  const [title, setTitle] = useState(AppTitle);

  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  const addNewGameResult = (result: GameResult) => setGameResults(
    [
      ...gameResults
      , result
    ]
  );

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        leaderboardData={getLeaderboard(gameResults)}
        generalFacts={getGeneralFacts(gameResults)}
        setTitle={setTitle}
        pissBoyLeaderboard={getPissBoyLeaderboard(gameResults)}
        pointFunFacts={getPointFunFacts(gameResults)}
        notableNobleFunFacts={getNotableNobleFunFacts(gameResults)}
      />
    },
    {
      path: "/setup",
      element: <Setup
        setTitle={setTitle}
        previousPlayers={getPreviousPlayers(gameResults)}
        setChosenPlayers={setChosenPlayers}
      />
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
      />
    },
  ]);


  return (
    <div
      className="App"
      data-theme={darkMode ? "dark" : "light"}
    >
      <div
        className='navbar bg-base-300 text-nowrap overflow-x-hidden'
      >
        {
          title === AppTitle &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
        }
        <span
          className='text-lg font-bold ml-3'
        >
          {title}
        </span>
        <div
          className='ml-auto'
        >
          <label className="swap swap-rotate">

            {/* this hidden checkbox controls the state */}
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)} 
            />

            {/* sun icon */}
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* moon icon */}
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

          </label>
        </div>
      </div>
      <div
        className='p-3'
      >
        <RouterProvider
          router={router}
        />
      </div>
    </div>
  );
}

export default App;
