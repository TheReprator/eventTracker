import React from "react";
import { View, Text, Button } from "react-native";

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: "red" }}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

