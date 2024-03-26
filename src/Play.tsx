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

  const [pissBoyPlayer, setPissBoyPlayer] = useState("");

  useEffect(
    () => setTitle("Play Guillotine")
    , []
  );

  const nav = useNavigate();

  // Local helper funcs just before JSX...

  const gameOver = (winner: string) => {
    addNewGameResult({
      winner: winner
      , players: chosenPlayers
      , start: start
      , end: new Date().toISOString()
    });
    nav(-2);
  };

  return (
    <div
      className='flex flex-col gap-3'
    >
      {
        chosenPlayers.map(x => (
          <div
            key={x}
            className='card bg-base-100 shadow-xl'
          >
            <div
              className='card-body p-3'
            >
              <h2
                className='card-title'
              >
                {x}
              </h2>
              <div
                className='flex flex-col gap-3 mt-3'
              >
                <p
                  className='text-neutral-content'
                >
                  Notable Nobles
                </p>
                <div
                  className="form-control mb-5"
                >
                  <label
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-md checkbox-primary"
                      checked={x === pissBoyPlayer}
                      onChange={() => setPissBoyPlayer(x)}
                    />
                    <span
                      className="label-text ml-5 text-md"
                    >
                      Piss Boy
                    </span>
                  </label>
                </div>
              </div>
              <button
                key={x}
                className="btn btn-outline btn-primary my-3"
                onClick={() => gameOver(x)}
              >
                {x} Won
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};