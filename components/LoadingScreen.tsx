import { ActivityIndicator, View } from 'react-native';

export function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F7F3',
      }}
    >
      <ActivityIndicator color="#C85C3B" />
    </View>
  );
}
