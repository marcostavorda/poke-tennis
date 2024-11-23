export default function startMatch(player1, player2, selectedIndex, selectedName){

    const randomResult = Math.random()*1;
    let winner = randomResult > 0.5 ? player1 : player2;
    let loser = randomResult > 0.5 ? player2 : player1;

    const cols = [ 
        { field: 'set', headerName: 'Set', width: 70 },
        { field: 'winner', headerName: winner.name, width: 130 },
        { field: 'loser', headerName: loser.name, width: 130 }
    ];
    const rows = [
        { id: 1, set: 'Set 1', winner: 6, loser: Math.ceil(Math.random()*5) },
        { id: 2, set: 'Set 2', winner: 6, loser: Math.ceil(Math.random()*5) },
        { id: 3, set: 'Set 3', winner: 6, loser: Math.ceil(Math.random()*5) }
    ];
    const selectedWins = winner.index === selectedIndex && winner.name === selectedName;
        
    return { winner, loser, cols, rows, selectedWins };
}