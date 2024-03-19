import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (title: string) => void;
    previousPlayers: string[];
    setChosenPlayers: (players: string[]) => void;
};

export const Setup: FC<SetupProps> = ({
    setTitle
    , previousPlayers
    , setChosenPlayers
}) => {

    const [availablePlayers, setAvailablePlayers] = useState(previousPlayers.map(x => ({
        name: x
        , checked: false
    })));

    useEffect(
        () => setTitle("Game Setup")
        , []
    );

    const nav = useNavigate();

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={
                    () => {
                        setChosenPlayers(
                            availablePlayers
                                .filter(x => x.checked)
                                .map(x => x.name)
                        );
                        nav('/play');
                    }
                }
                disabled={availablePlayers.filter(x => x.checked).length < 2}
            >
                Start the Game
            </button>
            <div
                className='card bg-base-100 shadow-xl'
            >
                <div
                    className='card-body p-3'
                >
                    {
                        availablePlayers.map(x => (
                            <div 
                                className="form-control mb-5"
                                key={x.name}
                            >
                                <label 
                                    className="flex items-center cursor-pointer"
                                >
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-lg checkbox-primary"
                                        checked={x.checked} 
                                        onChange={() => setAvailablePlayers([
                                            ...availablePlayers.map(y => ({
                                                name: y.name
                                                , checked: y.name === x.name
                                                    ? !y.checked
                                                    : y.checked
                                            }))
                                        ])}
                                    />
                                    <span 
                                        className="label-text ml-5 text-lg"
                                    >
                                        {x.name}
                                    </span> 
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};