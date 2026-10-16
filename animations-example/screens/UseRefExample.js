import { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function UseRefExample() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  function incrementRef() {
    // Ref pakeitimas nesukelia naujo renderinimo.
    refCount.current += 1;
    console.log('ref:', refCount.current);
  }

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>useState: {stateCount}</Text>
      {/* Mokomasis pavyzdys: rodoma paskutinio renderinimo ref reikšmė. */}
      {/* eslint-disable-next-line react-hooks/refs */}
      <Text>useRef: {refCount.current}</Text>
      <Button title="+1 state" onPress={() => setStateCount((count) => count + 1)} />
      <Button title="+1 ref" onPress={incrementRef} />
    </View>
  );
}
