import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}

export const Play: FC<PlayProps> = ({ 
  addNewGameResult
  , setTitle 
  , chosenPlayers
}) => {

    const [start, setStart] = useState(new Date().toISOString());
    // console.log(start);

    // const start = new Date().toISOString();

    const [turnNumber, setTurnNumber] = useState(1);

    useEffect(
      () => setTitle("Play Guillotine")
      , []
    );

    const nav = useNavigate();

    return (
      <div
        className='flex flex-col gap-3'
      >
        {
          chosenPlayers.map(x => (
            <button
                key={x}
                className="btn btn-lg btn-primary"
                onClick={() => {
                  addNewGameResult({
                    winner: x
                    , players: chosenPlayers
                    , start: start
                    , end: new Date().toISOString()
                  });
                  nav(-2);
                }}
            >
                {x} Won
            </button>

          ))
        }
        <p
          className='text-xs'
        >
          Play the game and tap the app ! ! !
        </p>
        <p>
          Current Turn: {turnNumber}
        </p>
        <button
          className='btn btn-link'
          onClick={() => setTurnNumber(turnNumber + 1)}
        >
          Next Turn
        </button>
      </div>
    );
  };