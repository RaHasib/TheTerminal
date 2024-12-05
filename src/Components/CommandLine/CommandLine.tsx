import { Terminal } from 'primereact/terminal';
import { Header } from './components/Header/Header';
import { TitleBar } from './components/TitleBar/TitleBar';
import { AVAILABLE_COMMANDS } from './constants/commands';
import useCommandLine from './hooks/useCommandLine';

import '../../Components/CommandLine/styles/CommandLine.css';

function CommandLine() {
    useCommandLine();
    
    return (
        <div className="terminal-window">
            <TitleBar title="terminal@user: ~" />
            <Header 
                title="Welcome to the Enhanced Terminal v2.0"
                commands={AVAILABLE_COMMANDS}
            />
            <Terminal
                welcomeMessage="🖥️ System initialized. Type 'help' for commands. Ready when you are..."
                prompt="λ "
            />
        </div>
    );
}

export default CommandLine;