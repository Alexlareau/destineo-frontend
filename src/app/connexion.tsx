import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Option = 'signIn' | 'signUp';


export default function ConnexionPage() {

    const [trackWidth, setTrackWidth] = useState(0);
    const optionWidth = Math.max(0, (trackWidth - 8) / 2);
  const [option, setOption] = useState<Option>('signIn');
  const slide = useRef(new Animated.Value(0)).current;

  function choisirOption(nouvelleOption: Option) {
    setOption(nouvelleOption);

    Animated.spring(slide, {
      toValue: nouvelleOption === 'signIn' ? 0 : 1,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  }

  const translationX = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, optionWidth],
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
      <View
        style={styles.slider}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            styles.indicator,
            { width: optionWidth, transform: [{ translateX: translationX }] },
          ]}
        />

        <Pressable
          style={styles.option}
          onPress={() => choisirOption('signIn')}
        >
          <Text style={styles.label}>Se connecter</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => choisirOption('signUp')}
        >
          <Text style={styles.label}>Créer un compte</Text>
        </Pressable>
      </View>

      {/* Affiche ensuite le formulaire selon l'option choisie */}
      {option === 'signIn' ? <SignIn /> : <SignUp />}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>


  );
}

function SignIn() {
  return <View>{/* Formulaire de connexion */}</View>;
}

function SignUp() {
  return <View>{/* Formulaire de création de compte */}</View>;
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: Spacing.four,
      alignItems: 'center',
      gap: Spacing.three,
      paddingBottom: BottomTabInset + Spacing.three,
      maxWidth: MaxContentWidth,
    },
    heroSection: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: Spacing.four,
      gap: Spacing.four,
    },
  slider: {
  width: '78%',
  height: '7%',
  alignSelf: 'center',
  flexDirection: 'row',
  position: 'relative',
  padding: 4,
  borderRadius: 26,
  backgroundColor: '#D1D5DB',
  overflow: 'hidden',
},

  indicator: {
  position: 'absolute',
  top: 4,
  left: 4,
  bottom: 4,
  right: 4,
  borderRadius: 22,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#9CA3AF',
},

  label: {
    // garde les autres propriétés
    color: '#111827',
    fontWeight: '600',
  },
  option: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});