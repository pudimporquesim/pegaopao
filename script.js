// O código espera que todo o conteúdo html seja carragado
document.addEventListener("DOMContentLoaded", () => {
    // O código pega os elementos do html, container do jogo, pontuação, display de tempo e botão que inicia o jogo
    const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start-button");

    // define as variáveis de pontuação, tempo, tempo restante, tamanho do sprite e tempo inicial para a troca do sprite de ligar
    let score;
    let timeLeft;
    let countdown;
    let squareSize; 
    let spawnTime; 

    // função que inicia o jogo
    function startGame() {
        // Define os valores das variáveis declaradas anteriormente
        score = 0;
        timeLeft = 60;
        squareSize = 96; 
        spawnTime = 1000;
        
        // Muda os conteúdos do diplay de tempo, pontuação e do container do jogo
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        gameContainer.innerHTML = "";
        // Desabilita o botão de iniciar o jogo
        startButton.disabled = true;

        // A cada segundo, diminui timeLeft e atualiza o timer na tela. Quando o tempo acabar, chama endGame() para parar o jogo.
        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // Adiciona um sprite a área do jogo
        spawnSquare();
    }

    function spawnSquare() {
        // Se o tempo acabar não spawna
        if (timeLeft <= 0) return;

        //Cria o quadrado e adiciona a ele a classe square
        const square = document.createElement("div");
        square.classList.add("square");

        //Define largura e alturas máximas do quadrado
        const maxX = gameContainer.clientWidth - squareSize;
        const maxY = gameContainer.clientHeight - squareSize;

        // aplica a largura e altura do quadrado
        square.style.position = "absolute";
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";

        // Define aleatóriamente onde o quadrado irá aparecer
        square.style.top = Math.floor(Math.random() * maxY) + "px";
        square.style.left = Math.floor(Math.random() * maxX) + "px";

        //Define a imagem do quadrado e suas propriedades
        square.style.backgroundImage = "url('img/sprite.png')";
        square.style.backgroundSize = "contain";
        square.style.backgroundRepeat = "no-repeat";

        //Caso o quadrado seja clicado 
        square.addEventListener("click", () => {
            // aumenta 1 na pontuação, atualiza o display e remove o quadrado que foi clicado
            score++;
            scoreDisplay.textContent = score;
            square.remove();

            // Caso a pontuação seja divisível por 5 diminui o quadrado e acelara a troca de quadrado
            if (score % 5 === 0) {
                if (squareSize > 40) squareSize -= 10; 
                if (spawnTime > 300) spawnTime -= 100; 
            }
            
            //Troca o quadrado
            spawnSquare();
        });

        // Faz com que o quadrado apareça na tela do jogo
        gameContainer.appendChild(square);

        //Remove quadrados que não foram clicados dentro do tempo estipulado
        setTimeout(() => {
            if (square.parentElement) {
                square.remove();
                spawnSquare();
            }
        }, spawnTime);
    }

    // Encera o jogo
    function endGame() {
        clearInterval(countdown);
        startButton.disabled = false;
        alert("Tempo esgotado! Sua pontuação: " + score);
    }

    // Faz com que caso o botão startButton seja clicado ele chame a função startGame
    startButton.addEventListener("click", startGame);
});
