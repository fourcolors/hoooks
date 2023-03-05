import { createReactClient } from "@livepeer/react-native";
import { studioProvider } from "livepeer/providers/studio";

const LIVEPEER_API_KEY = "a6178e57-b3d3-4ed3-b109-421998070703";

const LPClient = createReactClient({
  provider: studioProvider({ apiKey: LIVEPEER_API_KEY }),
});

export default LPClient;
