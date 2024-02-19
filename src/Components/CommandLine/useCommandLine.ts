import {TerminalService} from "primereact/terminalservice";
import {useEffect} from "react";

function useCommandLine() {
    const commandHandler = async (text: string) => {
        let response: string | null;
        let argsIndex: number = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch(command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;
            case 'joke':
                try {
                    const data = await fetch('https://icanhazdadjoke.com/', {
                        headers: {
                            "Accept": "application/json"
                        }
                    });
                    const joke = await data.json();
                    response = joke.joke;
                } catch (err) {
                    response = 'Sorry, could not retrieve a joke at this time.';
                }
                break;
            case 'clear':
                response =  null;
                break;
            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if(response)
            TerminalService.emit('response', response);
        else
            TerminalService.emit('clear');
    }

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);

    return {
        commandHandler
    }
}

export default useCommandLine;