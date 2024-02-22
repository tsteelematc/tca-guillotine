import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from './GameResults';
import { FC, useEffect } from 'react';

export const AppTitle = "Guillotine Companion App";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
}

export const Home: FC<HomeProps> = ({ leaderboardData, setTitle }) => {

    useEffect(
        () => setTitle(AppTitle)
        , []
    );

    const nav = useNavigate();

    return (
        <>
            <h3>
                Home
            </h3>
            <button
                className="btn btn-secondary"
                onClick={() => nav('/setup')}
            >
                Play
            </button>
            <div
                className='card mt-3 bg-base-100 shadow-xl'
            >
                <div
                    className='card-body'
                >
                    <h2
                        className='card-title'
                    >
                        Leaderboard
                    </h2>
                    {
                        leaderboardData.length > 0
                        ? (
                            <table
                                className='table'
                            >
                                <thead>
                                    <tr>
                                        <th>W</th>
                                        <th>L</th>
                                        <th>AVG</th>
                                        <th>PLAYER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaderboardData.map(lbe => (
                                            <tr
                                                key={lbe.name}
                                            >
                                                <td>{ lbe.wins }</td>
                                                <td>{ lbe.losses }</td>
                                                <td>{ lbe.avg.toFixed(3) }</td>
                                                <td>{ lbe.name }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                        : (
                            <p>
                                Play a game to see the leaderboard!
                            </p>
                        )
                    }
                </div>
            </div>
        </>
    );
};
