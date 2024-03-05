import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
}

export const Play: FC<PlayProps> = ({ addNewGameResult, setTitle }) => {

    const [start, setStart] = useState(new Date().toISOString());

    useEffect(
      () => setTitle("Play Guillotine")
      , []
    );

    const nav = useNavigate();

    return (
      <div
        className='flex flex-col gap-3'
      >
        <button
            className="btn btn-lg btn-primary"
            onClick={() => {
              addNewGameResult({
                winner: "Tom"
                , players: [
                  "Tom"
                  , "Taylor"
                ]
                , start: start
                , end: new Date().toISOString()
              });
              nav(-2);
            }}
        >
            Done
        </button>
        <p
          className='text-xs'
        >
          Play the game and tap the app ! ! !
        </p>        
      </div>
    );
  };