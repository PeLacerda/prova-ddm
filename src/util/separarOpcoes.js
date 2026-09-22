// A API devolve um texto do tipo:
// "Would you rather eat ice cream or cake?"
export function separarOpcoes(texto) {
  const limpo = String(texto || '')
    .replace(/^would you rather\s+/i, '')
    .trim();

  const partes = limpo.split(/\s+or\s+/i);

  if (partes.length >= 2) {
    return {
      esquerda: limparFinal(partes[0]),
      direita: limparFinal(partes.slice(1).join(' or ')),
    };
  }

  return {
    esquerda: limparFinal(limpo),
    direita: limparFinal(limpo),
  };
}

function limparFinal(valor) {
  return valor.trim().replace(/\?+$/, '');
}
