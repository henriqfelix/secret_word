import "./Game.css";

const Game = ({ verifyLetter }) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 0</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica: <span>Dica ...</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="BlankSquare"></span>
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras incorretas:</p>
        <span>a, </span>
        <span>b, </span>
      </div>
    </div>
  );
};

export default Game;
