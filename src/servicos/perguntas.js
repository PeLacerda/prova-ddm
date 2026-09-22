import axios from 'axios';
import perguntasLocais from '../dados/perguntas.json';

// API aberta: https://github.com/abaanshanid/Would-you-rather-api
const URL_API = 'https://would-you-rather-api.abaanshanid.repl.co';

export async function buscarPergunta() {
  try {
    const resposta = await axios.get(URL_API, { timeout: 6000 });
    if (resposta.data && resposta.data.data) {
      return resposta.data;
    }
    throw new Error('Resposta sem pergunta');
  } catch (_erro) {
    const indice = Math.floor(Math.random() * perguntasLocais.length);
    return perguntasLocais[indice];
  }
}
