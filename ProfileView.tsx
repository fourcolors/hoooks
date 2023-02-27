import { Profile } from "@lens-protocol/react-native-lens-ui-kit";

export default function ProfileView({ route, navigation }) {
  return <Profile profile={route.params.profile} />;
}
