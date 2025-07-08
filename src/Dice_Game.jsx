import React, { useRef, useState } from "react";

function DiceGame() {
  const [option, setOption] = useState("");
  const [lucknum, setLuckyNum] = useState(null);
  const [isRolling, setIsRolling] = useState(false); // rolling state
  const rollerRef = useRef(null);

  const handleChoices = (event) => { 
    setLuckyNum(null);
    setOption(event.target.value);
  };

  const play = () => {
    setIsRolling(true);
    rollerRef.current.style.display = "flex";
    setTimeout(() => {
      let randomValue = Math.floor(Math.random() * 11) + 2;
      setLuckyNum(randomValue);
      rollerRef.current.style.display = "none";
      setIsRolling(false);
    }, 2000);
  };

  function isWon() {
    if (option === "small") {
      return lucknum >= 2 && lucknum <= 6;
    } else if (option === "big") {
      return lucknum >= 8 && lucknum <= 12;
    } else if (option === "jackpot") {
      return lucknum === 7;
    }
    return false;
  }

  return (
    <section style={{
      background: "linear-gradient(135deg, rgb(68, 129, 155), rgb(26, 55, 64), rgb(46, 113, 142))",
      minHeight: "100vh",
      padding: "20px",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <h1 style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.5)", color: "skyblue", fontWeight: "bold", letterSpacing: "1px" }}>
          <u>DICE GAME</u>
        </h1>
      </div>
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <img src="./Dice.png" alt="Dice" style={{ height: "120px", width: "120px", borderRadius: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
      </div>
      <div className="container-fluid mt-4 d-flex justify-content-center align-items-center flex-wrap" style={{ gap: "20px" }}>
        <button className={`btn btn-lg ${option === "small" ? "btn-light" : "btn-dark"}`} value="small" onClick={handleChoices} disabled={isRolling} aria-label="Small 2-6">SMALL 2-6</button>
        <button className={`btn btn-lg ${option === "jackpot" ? "btn-light" : "btn-success"}`} value="jackpot" onClick={handleChoices} disabled={isRolling} aria-label="Jackpot 7">JACKPOT 7</button>
        <button className={`btn btn-lg ${option === "big" ? "btn-light" : "btn-info"}`} value="big" onClick={handleChoices} disabled={isRolling} aria-label="Big 8-12">BIG 8-12</button>
      </div>
      <div className="container-fluid mt-4 d-flex justify-content-center" style={{ fontFamily: "cursive" }}>
        <h2 style={{ color: "#7fffd4" }}>You Have Bet for: {option ? option.toUpperCase() : "None"}</h2>
      </div>
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <button className="btn btn-warning btn-lg" style={{ height: "60px", width: "130px", fontWeight: "bold" }} onClick={play} disabled={!option || isRolling}>
          {isRolling ? "Rolling..." : "PLAY"}
        </button>
      </div>
      {lucknum !== null && (
        <div className="container-fluid mt-4 d-flex justify-content-center" style={{ fontSize: "35px" }}>
          <span style={{ color: "#ffd700" }}>Lucky Number 👉 {lucknum}</span>
        </div>
      )}
      {lucknum !== null && (
        <div className="container-fluid mt-4 d-flex justify-content-center">
          {isWon() ? (
            <h2 className="text-success">Congratulations You Have Won 🎉🎉</h2>
          ) : (
            <h2 className="text-danger">Better Luck Next Time 🤞</h2>
          )}
        </div>
      )}
      <div ref={rollerRef} style={{ position: "fixed", top: "0", left: "0", backgroundColor: "rgba(0, 0, 0, 0.8)", height: "100vh", width: "100vw",  display: "none", justifyContent: "center", alignItems: "center", zIndex: "999", flexDirection: "column" }}>
        <img src="./dice.gif" alt="dice rolling" style={{ borderRadius: "20px", width: "250px", height: "250px", marginBottom: "20px" }} />
        <h2 style={{ color: "white", marginTop: "20px" }}>Rolling the dice...</h2>
      </div>
    </section>
  );
}

export default DiceGame;
