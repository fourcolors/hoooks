import { Profile } from "@lens-protocol/react-native-lens-ui-kit";
import { useProfile } from "@lens-protocol/react";
import { View, Text } from "react-native";
import { decode } from "base-64";

export default function ProfileView({ route, navigation }) {
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Profile profile={profile} />;
}
