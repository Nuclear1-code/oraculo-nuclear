function analizar() {
    const local = document.getElementById('local').value;
    const visitante = document.getElementById('visitante').value;

    const winL = parseInt(document.getElementById('winL').value);
    const drawL = parseInt(document.getElementById('drawL').value);
    const lossL = parseInt(document.getElementById('lossL').value);
    const avgGoalsL = parseFloat(document.getElementById('avgGoalsL').value);
    const avgAgainstL = parseFloat(document.getElementById('avgAgainstL').value);

    const winV = parseInt(document.getElementById('winV').value);
    const drawV = parseInt(document.getElementById('drawV').value);
    const lossV = parseInt(document.getElementById('lossV').value);
    const avgGoalsV = parseFloat(document.getElementById('avgGoalsV').value);
    const avgAgainstV = parseFloat(document.getElementById('avgAgainstV').value);

    if (!local || !visitante || isNaN(winL) || isNaN(drawL) || isNaN(lossL) ||
        isNaN(avgGoalsL) || isNaN(avgAgainstL) || isNaN(winV) || isNaN(drawV) ||
        isNaN(lossV) || isNaN(avgGoalsV) || isNaN(avgAgainstV)) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    const partidosL = winL + drawL + lossL;
    const partidosV = winV + drawV + lossV;

    const pGanL = winL / partidosL;
    const pEmpL = drawL / partidosL;
    const pPerL = lossL / partidosL;

    const pGanV = winV / partidosV;
    const pEmpV = drawV / partidosV;
    const pPerV = lossV / partidosV;

    const fuerzaLocal = ((pGanL + pPerV) / 2);
    const fuerzaEmpate = ((pEmpL + pEmpV) / 2);
    const fuerzaVisitante = ((pGanV + pPerL) / 2);

    const expectedGoals = (avgGoalsL + avgAgainstV + avgGoalsV + avgAgainstL) / 4;

    let resultado = "🏆 Predicción:\n";
    resultado += ` - % Local: ${(fuerzaLocal * 100).toFixed(1)}%\n`;
    resultado += ` - % Empate: ${(fuerzaEmpate * 100).toFixed(1)}%\n`;
    resultado += ` - % Visitante: ${(fuerzaVisitante * 100).toFixed(1)}%\n`;

    let tipo = "No clara";

    if (fuerzaEmpate > fuerzaLocal && fuerzaEmpate > fuerzaVisitante && fuerzaEmpate >= 0.5) {
        tipo = "Empate";
    } else if (Math.abs(fuerzaEmpate - fuerzaLocal) <= 0.05 &&
               Math.abs(fuerzaEmpate - fuerzaVisitante) <= 0.05) {
        tipo = "Empate";
    } else if (fuerzaLocal >= 0.55 && (fuerzaLocal - Math.max(fuerzaVisitante, fuerzaEmpate)) >= 0.10) {
        tipo = local;
    } else if (fuerzaVisitante >= 0.55 && (fuerzaVisitante - Math.max(fuerzaLocal, fuerzaEmpate)) >= 0.10) {
        tipo = visitante;
    }

    resultado += `➡️ Resultado estimado: ${tipo}\n`;
    resultado += `🎯 Goles estimados: ${expectedGoals.toFixed(2)}\n`;

    let guia = "⚠️ Zona de riesgo (no apostar)";
    if (expectedGoals <= 1.25) guia = "✅ Under 1.5";
    else if (expectedGoals >= 1.75 && expectedGoals < 2.25) guia = "✅ Over 1.5";
    else if (expectedGoals >= 2.75 && expectedGoals < 3.25) guia = "✅ Over 2.5";
    else if (expectedGoals >= 3.75 && expectedGoals < 4.25) guia = "✅ Over 3.5";
    else if (expectedGoals >= 4.75 && expectedGoals < 5.25) guia = "✅ Over 4.5";
    else if (expectedGoals >= 5.75) guia = "✅ Over 5.5";

    resultado += `🧠 Guía de apuesta por goles: ${guia}`;
    document.getElementById("resultado").textContent = resultado;
}