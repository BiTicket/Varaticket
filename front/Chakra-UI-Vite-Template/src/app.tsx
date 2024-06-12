import React from "react";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { Routes, Route } from 'react-router-dom';
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { Ticketing } from "./pages/home/Ticketing";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <div>
      <Header isAccountVisible={isAccountReady} />
      {isAppReady ? <Home /> : <ApiLoader />}
    </div>
  );
}

export const App = withProviders(Component);