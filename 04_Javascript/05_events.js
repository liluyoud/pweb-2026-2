function mostrarResultado(texto) {
  document.getElementById("resultado").innerHTML = texto;
}

// 1. Adicionando evento onclick via JavaScript
document.getElementById("botao1").onclick = function () {
  mostrarResultado("O botão foi clicado! Este evento foi adicionado com .onclick no JavaScript.");
};

// 2. onmouseover / onmouseout
document.getElementById("caixaHover").onmouseover = function () {
  this.style.backgroundColor = "lightblue";
  mostrarResultado("Evento onmouseover disparado: o mouse entrou na caixa.");
};

document.getElementById("caixaHover").onmouseout = function () {
  this.style.backgroundColor = "white";
  mostrarResultado("Evento onmouseout disparado: o mouse saiu da caixa.");
};

// 3. onchange
document.getElementById("selecao").onchange = function () {
  mostrarResultado("Evento onchange disparado: você escolheu '" + this.value + "'.");
};

// 4. onkeyup
document.getElementById("campoTexto").onkeyup = function () {
  mostrarResultado("Evento onkeyup disparado: você digitou '" + this.value + "'.");
};
