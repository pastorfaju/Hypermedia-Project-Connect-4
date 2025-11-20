let taulell = [];
let tornActual = 1;
let nomJugador1 = "Player 1";
let nomJugador2 = "Player 2";
let puntsJugador1 = 0;
let puntsJugador2 = 0;
let partidaEnCurs = false;
let modalitatJoc = 'pvp'; 

const files = 6;
const columnes = 7;

function actualitzarCamps() {
    const selector = document.getElementById('modalitat');
    const inputJ2 = document.getElementById('nomJ2');
    
    if (selector.value === 'pvc') {
        inputJ2.value = "IA";
        inputJ2.disabled = true;
    } else {
        inputJ2.value = "Player 2";
        inputJ2.disabled = false;
    }
}

function iniciarPartida() {
    const input1 = document.getElementById('nomJ1').value;
    const input2 = document.getElementById('nomJ2').value;
    modalitatJoc = document.getElementById('modalitat').value;
    
    if(input1) nomJugador1 = input1;
    if(input2) nomJugador2 = input2;

    document.getElementById('text-nom-j1').innerText = nomJugador1;
    document.getElementById('text-nom-j2').innerText = nomJugador2;

    document.getElementById('pantalla-configuracio').classList.add('hidden');
    document.getElementById('pantalla-joc').classList.remove('hidden');

    inicialitzarTaulell();
}

function inicialitzarTaulell() {
    taulell = [];
    const contenidor = document.getElementById('taulell-visual');
    contenidor.innerHTML = '';

    for (let f = 0; f < files; f++) {
        let fila = [];
        for (let c = 0; c < columnes; c++) {
            fila.push(0);
            const casella = document.createElement('div');
            casella.classList.add('casella');
            casella.id = f.toString() + "-" + c.toString();
            contenidor.appendChild(casella);
        }
        taulell.push(fila);
    }
    tornActual = 1;
    partidaEnCurs = true;
}

function ferTirada(col) {
    if (!partidaEnCurs) return;
    if (modalitatJoc === 'pvc' && tornActual === 2) return;

    executarMoviment(col);
}

function executarMoviment(col) {
    for (let f = files - 1; f >= 0; f--) {
        if (taulell[f][col] === 0) {
            taulell[f][col] = tornActual;
            
            const casella = document.getElementById(f.toString() + "-" + col.toString());
            if (tornActual === 1) {
                casella.classList.add('fitxa-jugador1');
            } else {
                casella.classList.add('fitxa-jugador2');
            }

            if (verificarVictoria(f, col)) {
                finalitzarPartida(false);
            } else if (verificarEmpat()) {
                finalitzarPartida(true);
            } else {
                tornActual = tornActual === 1 ? 2 : 1;
                if (modalitatJoc === 'pvc' && tornActual === 2 && partidaEnCurs) {
                    setTimeout(jugadaIA, 600);
                }
            }
            return;
        }
    }
    if (tornActual === 1) alert("Columna plena!");
}

function obtenirFilaLliure(col) {
    for (let f = files - 1; f >= 0; f--) {
        if (taulell[f][col] === 0) return f;
    }
    return -1;
}

function jugadaIA() {
    if (!partidaEnCurs) return;

    function simularTirada(jugador) {
        for (let c = 0; c < columnes; c++) {
            let f = obtenirFilaLliure(c);
            if (f !== -1) {
                taulell[f][c] = jugador;
                if (verificarVictoria(f, c)) {
                    taulell[f][c] = 0;
                    return c;
                }
                taulell[f][c] = 0;
            }
        }
        return -1;
    }

    let movimentGuanyador = simularTirada(2);
    if (movimentGuanyador !== -1) {
        executarMoviment(movimentGuanyador);
        return;
    }

    let movimentBloqueig = simularTirada(1);
    if (movimentBloqueig !== -1) {
        executarMoviment(movimentBloqueig);
        return;
    }

    let centre = Math.floor(columnes / 2);
    if (taulell[0][centre] === 0 && Math.random() > 0.3) {
        executarMoviment(centre);
        return;
    }

    let col;
    let columnaValida = false;
    while (!columnaValida) {
        col = Math.floor(Math.random() * columnes);
        if (taulell[0][col] === 0) {
            columnaValida = true;
        }
    }
    executarMoviment(col);
}

function verificarVictoria(f, c) {
    const jugador = taulell[f][c];

    function comprovarDireccio(deltaFila, deltaCol) {
        let compte = 1;
        
        let i = 1;
        while (true) {
            let fSeg = f + deltaFila * i;
            let cSeg = c + deltaCol * i;
            if (fSeg < 0 || fSeg >= files || cSeg < 0 || cSeg >= columnes || taulell[fSeg][cSeg] !== jugador) break;
            compte++;
            i++;
        }
        
        i = 1;
        while (true) {
            let fAnt = f - deltaFila * i;
            let cAnt = c - deltaCol * i;
            if (fAnt < 0 || fAnt >= files || cAnt < 0 || cAnt >= columnes || taulell[fAnt][cAnt] !== jugador) break;
            compte++;
            i++;
        }
        return compte >= 4;
    }

    return comprovarDireccio(0, 1) || comprovarDireccio(1, 0) || comprovarDireccio(1, 1) || comprovarDireccio(1, -1);
}

function verificarEmpat() {
    for (let c = 0; c < columnes; c++) {
        if (taulell[0][c] === 0) return false;
    }
    return true;
}

function finalitzarPartida(empat) {
    partidaEnCurs = false;
    if (empat) {
        alert("Empat!");
    } else {
        let guanyador;
        if (tornActual === 1) {
            guanyador = nomJugador1;
        } else {
            guanyador = nomJugador2;
        }
        
        alert("Enhorabona " + guanyador + ", has guanyat la partida!");
        
        if (tornActual === 1) puntsJugador1++;
        else puntsJugador2++;

        document.getElementById('puntuacio').innerText = puntsJugador1 + " - " + puntsJugador2;
    }
}

function reiniciarPartida() {
    inicialitzarTaulell();
}

function tornarMenu() {
    document.getElementById('pantalla-joc').classList.add('hidden');
    document.getElementById('pantalla-configuracio').classList.remove('hidden');
    puntsJugador1 = 0;
    puntsJugador2 = 0;
    document.getElementById('puntuacio').innerText = "0 - 0";
}