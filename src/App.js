import NavbarF from "./components/NavbarF";
import Nav from "./components/Nav";
import React, { Component } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {
  return (
    <div>
      <AuthProvider>
        <RecoilRoot>
          <Nav/>
        </RecoilRoot>
      </AuthProvider>

    </div>

  );
}

export default App;
