import { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

export default function FadeInExample() {
  // Animated.Value saugomas ref, kad išliktų tas pats tarp renderinimų.
  // eslint-disable-next-line react-hooks/refs
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ padding: 20, opacity }}>
      <Text>Hello!</Text>
    </Animated.View>
  );
}
