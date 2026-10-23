
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export default function App() {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [result, setResult] = useState<string | null>(
    null
  );

  // Enquanto verifica a permissão
  if (!permission) {
    return <View style={styles.loading} />;
  }

  // Solicita permissão para usar a câmera
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.title}>NexScan</Text>

        <Text style={styles.subtitle}>
          Precisamos da sua permissão para acessar a câmera
          e ler QR Codes.
        </Text>

        <Button
          title="Permitir acesso à câmera"
          onPress={requestPermission}
          color="#16A34A"
        />
      </View>
    );
  }

  // Tela principal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NexScan</Text>

      <Text style={styles.subtitle}>
        {result !== null
          ? "QR Code identificado!"
          : "Posicione o QR Code dentro da moldura"}
      </Text>

      {/* Câmera e moldura */}
      <View style={styles.cameraContainer}>
        {result === null ? (
          <>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={({ data }) => {
                setResult(data);
              }}
            />

            <View
              pointerEvents="none"
              style={styles.overlay}
            >
              <View style={styles.frame} />

              <Text style={styles.scanHint}>
                Centralize o código aqui
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successIcon}>✓</Text>

            <Text style={styles.successTitle}>
              Leitura concluída
            </Text>

            <Text style={styles.successSubtitle}>
              A câmera foi pausada.
            </Text>
          </View>
        )}
      </View>

      {/* Painel de resultado */}
      <View style={styles.resultPanel}>
        <Text style={styles.resultTitle}>
          Resultado da leitura
        </Text>

        {result !== null ? (
          <>
            <ScrollView
              style={styles.resultScroll}
              nestedScrollEnabled
            >
              <Text
                selectable
                style={styles.resultText}
              >
                {result}
              </Text>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <Button
                title="Ler novamente"
                onPress={() => setResult(null)}
                color="#16A34A"
              />
            </View>
          </>
        ) : (
          <Text style={styles.waiting}>
            Aguardando leitura do QR Code...
          </Text>
        )}
      </View>

      <Text style={styles.footer}>
        NexScan • Leitor de QR Code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 16,
  },

  loading: {
    flex: 1,
    backgroundColor: "#101820",
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: "#101820",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#B8C4CE",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  cameraContainer: {
    flex: 1,
    minHeight: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1B2935",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },

  frame: {
    width: 240,
    height: 240,
    maxWidth: "85%",
    borderWidth: 3,
    borderColor: "#22C55E",
    borderRadius: 20,
  },

  scanHint: {
    position: "absolute",
    bottom: 20,
    color: "#FFFFFF",
    backgroundColor: "#101820CC",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },

  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  successIcon: {
    fontSize: 64,
    color: "#22C55E",
    fontWeight: "bold",
  },

  successTitle: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 12,
  },

  successSubtitle: {
    fontSize: 15,
    color: "#B8C4CE",
    marginTop: 8,
  },

  resultPanel: {
    backgroundColor: "#1B2935",
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    gap: 12,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  resultScroll: {
    maxHeight: 110,
  },

  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#86EFAC",
  },

  waiting: {
    fontSize: 14,
    color: "#B8C4CE",
  },

  buttonContainer: {
    marginTop: 4,
  },

  footer: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 12,
  },
});
