const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(charecterName, block, diceResult, attribute) {
  console.log(
    `${charecterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(charecter1, charecter2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco ${block}`);

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + charecter1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + charecter2.VELOCIDADE;

      await logRollResult(
        charecter1.NOME,
        "VELOCIDADE",
        diceResult1,
        charecter1.VELOCIDADE
      );

      await logRollResult(
        charecter2.NOME,
        "VELOCIDADE",
        diceResult2,
        charecter2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + charecter1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + charecter2.MANOBRABILIDADE;

      await logRollResult(
        charecter1.NOME,
        "MANOBRABILIDADE",
        diceResult1,
        charecter1.MANOBRABILIDADE
      );

      await logRollResult(
        charecter2.NOME,
        "MANOBRABILIDADE",
        diceResult2,
        charecter2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + charecter1.PODER;
      let powerResult2 = diceResult2 + charecter2.PODER;

      console.log(`${charecter1.NOME} confrontou com ${charecter2.NOME} 🥊`);

      await logRollResult(
        charecter1.NOME,
        "PODER",
        diceResult1,
        charecter1.PODER
      );

      await logRollResult(
        charecter2.NOME,
        "PODER",
        diceResult2,
        charecter2.PODER
      );

      if (powerResult1 > powerResult2 && charecter2.PONTOS > 0) {
        console.log(
          `${charecter1.NOME} venceu o confronto! ${charecter2.NOME} perdeu 1 ponto 🐢`
        );
        charecter2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && charecter2.PONTOS > 0) {
        console.log(
          `${charecter2.NOME} venceu o confronto! ${charecter1.NOME} perdeu 1 ponto 🐢`
        );
        charecter1.PONTOS--;
      }
      console.log(
        powerResult1 === powerResult2
          ? "Confronto empatado! Nenhum ponto foi perdido !"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${charecter1.NOME} marcou um ponto !`);
      charecter1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${charecter2.NOME} marcou um ponto !`);
      charecter2.PONTOS++;
    }

    console.log("------------------------------");
  }
}

async function delcareWinner(charecter1, charecter2) {
  console.log("Resultado final:");
  console.log(`${charecter1.NOME} : ${charecter1.PONTOS} ponto(s)`);
  console.log(`${charecter2.NOME} : ${charecter2.PONTOS} ponto(s)`);

  if (charecter1.PONTOS > charecter2.PONTOS)
    console.log(`${charecter1.NOME} venceu a corrida! PARABÉNS! 🏆`);
  else if (charecter2.PONTOS > charecter1.PONTOS)
    console.log(`${charecter2.NOME} venceu a corrida! PARABÉNS! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`
  );

  await playRaceEngine(player1, player2);
  await delcareWinner(player1, player2);
})();
