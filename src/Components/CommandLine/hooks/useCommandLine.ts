import {TerminalService} from "primereact/terminalservice";
import {useCallback, useEffect, useRef} from "react";
import * as handlers from '../handlers/commandHandlers';



function useCommandLine() {

    const loadingRef = useRef<ReturnType<typeof setInterval> | null>(null);


const startLoading = useCallback(() => {
    let dots = 0;
    TerminalService.emit('response', 'Processing');
    loadingRef.current = setInterval(() => {
        dots = (dots + 1) % 4;
        TerminalService.emit('response', `Processing${'.'.repeat(dots)}${'\u00A0'.repeat(3-dots)}`);
    }, 300);
}, []);

    const stopLoading = useCallback(() => {
        if (loadingRef.current) {
            clearInterval(loadingRef.current);
            loadingRef.current = null;
        }
    }, []);

    const commandHandler = useCallback(async (text: string) => {
        const argsIndex: number = text.indexOf(' ');
        const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
        const args = argsIndex !== -1 ? text.substring(argsIndex + 1) : '';

       
        if (['joke', 'quote'].includes(command)) {
            startLoading();
        }

        try {
            let response: string | null;

            switch(command) {
                case 'help':
                    response = handlers.helpCommand().response;
                    break;
                case 'date':
                    response = handlers.dateCommand().response;
                    break;
                case 'time':
                    response = handlers.timeCommand().response;
                    break;
                case 'joke':
                    response = (await handlers.jokeCommand()).response;
                    break;
                case 'quote':
                    response = (await handlers.quoteCommand()).response;
                    break;
                case 'calc':
                    response = handlers.calcCommand(args).response;
                    break;
                case 'echo':
                    response = handlers.echoCommand(args).response;
                    break;
                case 'clear':
                    response = handlers.clearCommand().response;
                    break;
                default:
                    response = `Unknown command: ${command}\nType 'help' to see available commands.`;
            }

            if(response)
                TerminalService.emit('response', response);
            else
                TerminalService.emit('clear');

        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    useEffect(() => {
        TerminalService.on('command', commandHandler);
        return () => {
            TerminalService.off('command', commandHandler);
            stopLoading();
        };
    }, [commandHandler, stopLoading]);

    return { commandHandler };
}

export default useCommandLine;