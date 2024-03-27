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
  , "King Louis XVI"
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

  const [notableNoblesWithPlayers, setNotableNoblesWithPlayers] = useState(
    notableNobles
      .sort(
        (a, b) => a.localeCompare(b)
      )
      .map(
        x => ({
          nobleName: x
          , playerName: ""
        })
      )
  );

  const [playerPoints, setPlayerPoints] = useState<[string, number][]>(chosenPlayers.map(x => [x, 0]));

  useEffect(
    () => setTitle("Play Guillotine...")
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
      , notableNoblesWithPlayers: notableNoblesWithPlayers
      , playerPoints
    });
    nav(-2);
  };

  return (
    <div
      className='flex flex-col gap-3'
    >
      <div
        className='card bg-base-100 shadow-xl'
      >
        <div
          className='card-body overflow-x-hidden p-3'
        >
          <ul
            className='text-sm pt-3 pb-0'
          >
            <li>
              . Track some game info below
            </li>
            <li>
              . Then choose a winner
            </li>
            <li>
              . Or quit to not save your game results
            </li>
            <li>
              <a className="btn btn-link p-0 m-0 text-md" onClick={() => nav(-2)}>Quit</a>
            </li>
          </ul>

        </div>
      </div>
      {
        chosenPlayers.map(x => (
          <div
            className='card bg-base-100 shadow-xl'
          >
            <div
              className='card-body overflow-x-hidden p-3'
            >
              <h2
                className='card-title'
              >
                {x}
              </h2>
              <p
                className='text-primary'
              >
                Points
              </p>
              <div
                className="flex gap-3 items-center mb-5"
              >
                <button
                  className='btn btn-outline btn-sm btn-error font-bold text-lg'
                  onClick={() => setPlayerPoints(
                    playerPoints.map(y => [
                      y[0]
                      , y[0] === x ? y[1] - 1 : y[1]
                    ])
                  )}
                >
                  - 1
                </button>
                <h2
                  className='text-4xl font-bold mx-5 min-w-10 text-right'
                >
                  {
                    playerPoints.find(y => y[0] === x)![1]
                  }
                </h2>
                <button
                  className='btn btn-outline btn-success btn-sm font-bold text-lg'
                  onClick={() => setPlayerPoints(
                    playerPoints.map(y => [
                      y[0]
                      , y[0] === x ? y[1] + 1 : y[1]
                    ])
                  )}
                >
                  + 1
                </button>
                <button
                  className='btn btn-outline btn-success btn-sm font-bold text-lg'
                  onClick={() => setPlayerPoints(
                    playerPoints.map(y => [
                      y[0]
                      , y[0] === x ? y[1] + 5 : y[1]
                    ])
                  )}
                >
                  + 5
                </button>
              </div>
              <p
                className='text-primary'
              >
                Notable Nobles
              </p>
              <div
                className='flex flex-col my-5 gap-5'
              >
                {
                  notableNoblesWithPlayers.map(y => (
                    <div
                      key={y.nobleName}
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
                              , playerName: y.nobleName === z.nobleName 
                                ? z.playerName === x // already checked for this user so make it blank, like the noble has not been collected
                                  ? ""
                                  : x 
                                : z.playerName
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
    </div>
  );
};