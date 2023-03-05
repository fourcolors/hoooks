import React from "react";
import Routes from "./Routes";
import WalletConnectProvider from "react-native-walletconnect";
import { LivepeerConfig } from "@livepeer/react-native";
import LPClient from "./clients/livepeer";
import { ApolloProvider } from "@apollo/client";
import APClient from "./clients/apollo";
import { LensProvider } from "./LensContext";

export default function App() {
  return (
    <LensProvider>
      <WalletConnectProvider>
        <ApolloProvider client={APClient}>
          <LivepeerConfig client={LPClient}>
            <Routes />
          </LivepeerConfig>
        </ApolloProvider>
      </WalletConnectProvider>
    </LensProvider>
  );
}
