import React from "react";
import { View, TextInput, Button, Text } from "react-native";

interface Props {
  search: string;
  keyword: string;
  onSearchChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSubmit: () => void;
  error?: string | null;
}

export const SearchInputs: React.FC<Props> = ({
  search,
  keyword,
  onSearchChange,
  onKeywordChange,
  onSubmit,
  error,
}) => {
  return (
    <View>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={onSearchChange}
      />

      <TextInput
        placeholder="Keyword"
        value={keyword}
        onChangeText={onKeywordChange}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Button title="Search" onPress={onSubmit} />
    </View>
  );
};

