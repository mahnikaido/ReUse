import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

export default function CameraScreen() {
  const [cameraActive, setCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <CameraView
          style={styles.preview}
          facing="back"
        />
      ) : (
        <Text style={styles.title}>Clique para ativar a câmera</Text>
      )}
      <Button title={cameraActive ? "Desativar Câmera" : "Ativar Câmera"} onPress={() => setCameraActive(!cameraActive)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  preview: { flex: 1 },
  title: { textAlign: 'center', fontSize: 18, marginBottom: 10 }
});
