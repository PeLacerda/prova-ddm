import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { cores } from '../estilos/cores';
import { useAcelerometro } from '../hooks/useAcelerometro';
import { buscarPergunta } from '../servicos/perguntas';
import { separarOpcoes } from '../util/separarOpcoes';

export default function TelaJogo() {
  const [carregando, setCarregando] = useState(true);
  const [opcoes, setOpcoes] = useState({ esquerda: '', direita: '' });
  const [escolha, setEscolha] = useState(null);
  const [esperandoCentro, setEsperandoCentro] = useState(false);
  const proximaPergunta = useRef(null);
  const { lado } = useAcelerometro(!escolha && !carregando);

  useEffect(() => {
    carregarPergunta();
  }, []);

  useEffect(() => {
    if (esperandoCentro && !lado) {
      setEsperandoCentro(false);
    }
  }, [esperandoCentro, lado]);

  useEffect(() => {
    return () => {
      if (proximaPergunta.current) {
        clearTimeout(proximaPergunta.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!lado || escolha || carregando || esperandoCentro) {
      return;
    }

    setEscolha(lado);
    proximaPergunta.current = setTimeout(() => {
      carregarPergunta();
    }, 1500);
  }, [lado, escolha, carregando, esperandoCentro]);

  async function carregarPergunta() {
    setCarregando(true);
    setEscolha(null);
    setEsperandoCentro(true);

    const pergunta = await buscarPergunta();
    setOpcoes(separarOpcoes(pergunta.data));
    setCarregando(false);
  }

  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color={cores.verde} />
        <Text style={estilos.textoCarregando}>Buscando pergunta...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.fundo}>
      <Text style={estilos.instrucao}>Incline o celular para escolher</Text>

      <View style={estilos.linha}>
        <View
          style={[
            estilos.carta,
            estilos.cartaEsquerda,
            (lado === 'esquerda' || escolha === 'esquerda') && estilos.cartaAtiva,
          ]}
        >
          <Text style={estilos.lado}>Esquerda</Text>
          <Text style={estilos.opcao}>{opcoes.esquerda}</Text>
        </View>

        <View
          style={[
            estilos.carta,
            estilos.cartaDireita,
            (lado === 'direita' || escolha === 'direita') && estilos.cartaAtiva,
          ]}
        >
          <Text style={estilos.lado}>Direita</Text>
          <Text style={estilos.opcao}>{opcoes.direita}</Text>
        </View>
      </View>

      {escolha ? (
        <Text style={estilos.resultado}>
          Você escolheu a {escolha === 'esquerda' ? 'esquerda' : 'direita'}!
        </Text>
      ) : (
        <Text style={estilos.resultado}>Mova o celular para um dos lados</Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.amarelo,
    paddingTop: 56,
    paddingHorizontal: 12,
  },
  centro: {
    flex: 1,
    backgroundColor: cores.amarelo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
    color: cores.texto,
  },
  instrucao: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 20,
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  carta: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
  },
  cartaEsquerda: {
    backgroundColor: cores.verde,
  },
  cartaDireita: {
    backgroundColor: cores.verdeEscuro,
  },
  cartaAtiva: {
    borderWidth: 4,
    borderColor: cores.branco,
  },
  lado: {
    color: cores.amarelo,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  opcao: {
    color: cores.branco,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 16,
    color: cores.texto,
    paddingVertical: 24,
    fontWeight: 'bold',
  },
});
