import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

const LIMIAR = 0.45;

export function useAcelerometro(ativo) {
  const [x, setX] = useState(0);
  const [lado, setLado] = useState(null);

  useEffect(() => {
    if (!ativo) {
      setLado(null);
      return;
    }

    let inscricao;

    async function iniciar() {
      const disponivel = await Accelerometer.isAvailableAsync();
      if (!disponivel) {
        return;
      }

      await Accelerometer.requestPermissionsAsync();
      Accelerometer.setUpdateInterval(100);

      inscricao = Accelerometer.addListener((dados) => {
        setX(dados.x);

        if (dados.x > LIMIAR) {
          setLado('esquerda');
        } else if (dados.x < -LIMIAR) {
          setLado('direita');
        } else {
          setLado(null);
        }
      });
    }

    iniciar();

    return () => {
      if (inscricao) {
        inscricao.remove();
      }
    };
  }, [ativo]);

  return { x, lado };
}
