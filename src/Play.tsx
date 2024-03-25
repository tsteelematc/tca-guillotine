import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (result: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}

const notableNobles = [
  "Piss Boy"
  , "King Louis IV"
  , "Marie Antionette"
  , "Count"
  , "Countess"
];

export const Play: FC<PlayProps> = ({
  addNewGameResult
  , setTitle
  , chosenPlayers
}) => {

  const [start, setStart] = useState(new Date().toISOString());
  // console.log(start);

  // const start = new Date().toISOString();

  const [turnNumber, setTurnNumber] = useState(1);

  // const [pissBoyPlayer, setPissBoyPlayer] = useState("");

  const [notableNoblesWithPlayers, setNotableNoblesWithPlayers] = useState(
    notableNobles
      .sort((a, b) => a.localeCompare(b))
      .map(x => ({
        nobleName: x
        , playerName: ""
      }))
  );

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
              <p
                className='text-neutral-content'
              >
                Notable Nobles
              </p>
              <div
                className='flex flex-col my-5 gap-5'
              >
                {
                  notableNoblesWithPlayers.map(y => (
                    <div
                      className="form-control"
                    >
                      <label
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={y.playerName === x}
                          onChange={() => setNotableNoblesWithPlayers(
                            notableNoblesWithPlayers.map(z => ({
                              nobleName: z.nobleName
                              , playerName: y.nobleName === z.nobleName ? x : z.playerName
                            }))
                          )}
                        />
                        <span
                          className="label-text ml-5 text-md"
                        >
                          {y.nobleName}
                        </span>
                      </label>
                    </div>
                  ))
                }
              </div>
              <button
                key={x}
                className="btn btn-outline btn-primary"
                onClick={() => gameOver(x)}
              >
                {x} Won
              </button>
            </div>
          </div>
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