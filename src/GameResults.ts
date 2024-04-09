import { durationFormatter } from "human-readable";

const formatterDefault = durationFormatter();
const formatterYMD = durationFormatter({
  allowMultiples: ["y", "mo", "d"],
});

//
// Type definitions...
//
export type GameResult = {
  winner: string;
  players: string[];
  start: string;
  end: string;
  notableNoblesWithPlayers: NotableNobleWithPlayer[];
  playerPoints: [string, number][];
};

export type LeaderboardEntry = {
  wins: number;
  losses: number;
  avg: number;
  name: string;
};

export type GeneralFacts = {
  totalGames: number;
  lastPlayed: string;
  shortestGame: string;
  longestGame: string;
};

type NotableNobleWithPlayer = {
  nobleName: string;
  playerName: string;
};

export type PointFunFacts = {
  maxPointValue: number;
  maxPointPlayers: string;
  minPointValue: number;
  minPointPlayers: string;
};

//
// Exported functions...
//

export const getPreviousPlayers = (results: GameResult[]) => {
  const previousPlayers = results.flatMap((x) => x.players);

  return [...new Set(previousPlayers)].sort((a, b) => a.localeCompare(b));
};

export const getLeaderboard = (results: GameResult[]): LeaderboardEntry[] => {
  const players = getPreviousPlayers(results);

  return players
    .map((x) => getLeaderboardEntryForPlayer(results, x))
    .sort(
      // (a, b) => b.avg - a.avg

      // i-o-g
      (a, b) =>
        b.avg * 1000 + b.wins + b.losses - (a.avg * 1000 + a.wins + a.losses)
    );
};

export const getGeneralFacts = (results: GameResult[]): GeneralFacts => {
  const now = Date.now();

  const gameEndDatesInMilliseconds = results.map((x) => Date.parse(x.end));

  const gameDurationsInMilliseconds = results.map(

    // DRY - Don't Repeat Yourself
    (x) => getGameDurationInMilliseconds(x)
  );

  return {
    totalGames: results.length,
    lastPlayed: results.length
      ? `${formatterYMD(now - Math.max(...gameEndDatesInMilliseconds))} ago`
      : "n/a",
    shortestGame: results.length
      ? (formatterDefault(Math.min(...gameDurationsInMilliseconds)) as string)
      : "n/a",
    longestGame: results.length
      ? (formatterDefault(Math.max(...gameDurationsInMilliseconds)) as string)
      : "n/a",
  };
};

export const getPissBoyLeaderboard = (results: GameResult[]) => {
  const playersWithPissBoyCount = results
    .flatMap(
      (x) =>
        x.notableNoblesWithPlayers.find((x) => x.nobleName === "Piss Boy")
          ?.playerName ?? ""
    )
    .filter((x) => x.length > 0)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (acc, x) => acc.set(x, (acc.get(x) ?? 0) + 1),
      new Map<string, number>()
    );

  return [...playersWithPissBoyCount].sort((a, b) => b[1] - a[1]);
};

export const getPointFunFacts = (results: GameResult[]): PointFunFacts => {
  
  // Get all player point tuples...
  const allPlayerPoints = results.flatMap(x => x.playerPoints);

  // Map to just the points...
  const allPlayerPointValues = allPlayerPoints.map(x => x[1]);

  // Get the max/min...
  const maxPointValue = Math.max(...allPlayerPointValues);
  const minPointValue = Math.min(...allPlayerPointValues);

  // Then find the players with matching max/min 
  // and put them in a display object...
  return {
    maxPointValue
    , maxPointPlayers: allPlayerPoints
      .filter(x => x[1] === maxPointValue)
      .map(x => x[0])
      .filter((x, i, a) => a.indexOf(x) === i) // Remove dupes
      .join(', ')
    , minPointValue
    , minPointPlayers: allPlayerPoints
      .filter(x => x[1] === minPointValue)
      .map(x => x[0])
      .filter((x, i, a) => a.indexOf(x) === i) // Remove dupes
      .join(', ')
  };
};

export const getNotableNobleFunFacts = (results: GameResult[]) => {
  return [
    {
      nobles: "King Louis XVI"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["King Louis XVI"])
    }
    , {
      nobles: "Marie Antionette"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["Marie Antionette"])
    }
    , {
      nobles: "King Louis XVI + Marie Antionette"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["King Louis XVI", "Marie Antionette"])
    }
    , {
      nobles: "Count"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["Count"])
    }
    , {
      nobles: "Countess"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["Countess"])
    }
    , {
      nobles: "Count + Countess"
      , inPercentOfWins: getPercentOfWinsForNobles(results, ["Count", "Countess"])
    }
    ];
};

export const getAverageGameDurationsByPlayerCount = (grs: GameResult[]) => {

  // Group game results by player count, advanced reduce()...
  const grouped = grs.reduce(
      (acc, x) => acc.set(
          x.players.length
          //, [x]
          , [
              ...acc.get(x.players.length) ?? []
              , x
          ]
      ) 
      , new Map<number, GameResult[]>()
  );

  // const grouped = Map.groupBy(
  //     grs
  //     , (x) => x.players.length

  //     // Show off nonsense, but fun : - )) 
  //     //, (x) => x.winner.length 
  // );

  //console.log(grouped);

  // Shape the grouped results into something to display these fun facts... Includes sorting...
  return [...grouped]
      .sort((a, b) => a[0] - b[0])
      .map(x => ({
          numberOfPlayers: x[0]
          , avgGameDuration: formatterDefault(
            getAvgGameDurationInMilliseconds(x[1])
          )
      }))
  ;
};

//
// Internal functions...
//

const getLeaderboardEntryForPlayer = (
  results: GameResult[],
  player: string
): LeaderboardEntry => {
  const playerWins = results.filter((x) => x.winner === player).length;
  const playerGames = results.filter((x) =>
    x.players.some((y) => y === player)
  ).length;

  return {
    wins: playerWins,
    losses: playerGames - playerWins,

    avg: playerGames > 0 ? playerWins / playerGames : 0,

    name: player,
  };
};

const getPercentOfWinsForNobles = (
  results: GameResult[]
  , nobleNames: string[]
) => {

  const winnersNotableNobles = results.map(
    x => x.notableNoblesWithPlayers
      .filter(y => y.playerName === x.winner)
      .map(y => y.nobleName)
  );
  const noblesToCheck = new Set(nobleNames);

  const noblesInWinnersNotableNobles = winnersNotableNobles
    .filter(
      x => (noblesToCheck as any).isSubsetOf(new Set(x))
    ).length
  ;

  return ((noblesInWinnersNotableNobles / winnersNotableNobles.length) * 100).toFixed(2);

};

const getGameDurationInMilliseconds = (gr: GameResult) => Date.parse(gr.end) - Date.parse(gr.start);

const getAvgGameDurationInMilliseconds = (grs: GameResult[]) => {

    // Add up all the game durations, simple reduce()...
    const totalGameTimeInMilliseconds = grs.reduce(
        (acc, x) => acc + getGameDurationInMilliseconds(x)
        , 0
    );

    // Average is that total divided by number of games, accounting for divide by zero errors...
    return grs.length > 0
        ? totalGameTimeInMilliseconds / grs.length
        : 0
    ;
};

