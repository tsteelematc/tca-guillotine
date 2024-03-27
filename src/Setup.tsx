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

    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(
        () => setTitle("Game Setup")
        , []
    );

    const nav = useNavigate();

    const validateAndAddNewPlayer = () => {

        const existingPlayer = availablePlayers.find(x => x.name.toUpperCase() === newPlayerName.toUpperCase());

        if (
            newPlayerName.length > 0
        ) {

            if (existingPlayer) { 

                // Check the existing player
                setAvailablePlayers(
                    availablePlayers.map(x => ({
                        ...x 
                        , checked: x.name === existingPlayer.name 
                            ? true
                            : x.checked
                    }))
                );

            } else {

                // Add new player...
                setAvailablePlayers(
                    [
                        ...availablePlayers
                        , {
                            name: newPlayerName
                            , checked: true
                        }
                    ].sort((a, b) => a.name.localeCompare(b.name))
                );
            }
            setNewPlayerName("");
        }
    };

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
                    className='card-body overflow-x-hidden p-3'
                >
                    <div
                        className='flex items-center mb-5'
                    >
                        <input
                            type="text"
                            placeholder="Enter new player name"
                            className="input input-bordered w-full max-w-xs"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                        />
                        <button
                            className='btn btn-md btn-primary ml-3'
                            onClick={validateAndAddNewPlayer}
                        >
                            Add
                        </button>
                    </div>
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