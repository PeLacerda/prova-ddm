import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TelaInicio from './src/telas/TelaInicio';
import TelaJogo from './src/telas/TelaJogo';

export default function App() {
  const [comecou, setComecou] = useState(false);

  if (!comecou) {
    return (
      <>
        <StatusBar style="dark" />
        <TelaInicio onComecar={() => setComecou(true)} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <TelaJogo />
    </>
  );
}
