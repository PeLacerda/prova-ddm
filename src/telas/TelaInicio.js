import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../estilos/cores';

export default function TelaInicio({ onComecar }) {
  return (
    <View style={estilos.fundo}>
      <View style={estilos.faixaVerde} />

      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>O que você prefere?</Text>
        <Text style={estilos.subtitulo}>
          Incline o celular para a esquerda ou para a direita e escolha uma opção.
        </Text>

        <TouchableOpacity style={estilos.botao} onPress={onComecar}>
          <Text style={estilos.textoBotao}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.amarelo,
  },
  faixaVerde: {
    height: 18,
    backgroundColor: cores.verde,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    color: cores.texto,
    textAlign: 'center',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: cores.verde,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
