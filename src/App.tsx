import { PrimeReactProvider } from 'primereact/api';

import CommandLine from "./Components/CommandLine/CommandLine.tsx";

import './App.css';
function App() {

  return (
    <>
        <PrimeReactProvider>
            <div  className="App">
                <CommandLine />
            </div>

        </PrimeReactProvider>
    </>
  )
}

export default App
