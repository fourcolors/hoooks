import React from "react";
import { useWalletConnect } from "react-native-walletconnect";
import * as Linking from "expo-linking";
import AnimatedButton from "./AnimatedButton";
import { getChallenge, getJwt } from "../api";
import { useLensContext } from "../LensContext";

export default function LoginButton() {
  const { signMessage, createSession, killSession, session, setSession } =
    useWalletConnect();

  const { dispatch } = useLensContext();

  const handleLogin = async () => {
    if (!session.length) {
      await createSession();
    }
  };

  const handleLogout = async () => {
    if (session.length) {
      await killSession();
    }
  };

  const handleDeepLink = async (event) => {
    if (event.url && event.url.startsWith(Linking.makeUrl("/"))) {
      const auth = await Linking.parse(event.url).getQueryParameterAsync(
        "wc-authentication"
      );
      setSession(auth);

      const address = auth[0]?.accounts[0];
      const challenge = await getChallenge(address);
      const signedChallenge = signMessage(challenge.data.challenge.text);
      const jwtData = await getJwt(signedChallenge, address);

      // double check what jwtData looks like
      console.log("jwtData", jwtData);
      dispatch("SET_JWT_TOKEN", jwtData.jwt);
      dispatch("SET_JWT_REFRESH", jwtData.jwtRefresh);
    }
  };

  React.useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
  }, []);

  return (
    <>
      {session.length ? (
        <AnimatedButton title="Logout" onPress={handleLogout} />
      ) : (
        <AnimatedButton title="Login" onPress={handleLogin} />
      )}
    </>
  );
}
