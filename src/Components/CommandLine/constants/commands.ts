export type CommandType = {
    readonly icon: string;
    readonly name: string;
};

export const AVAILABLE_COMMANDS: ReadonlyArray<CommandType> = [
    { icon: '🔍', name: 'help' },
    { icon: '📅', name: 'date' },
    { icon: '⏰', name: 'time' },
    { icon: '😄', name: 'joke' },
    { icon: '💭', name: 'quote' },
    { icon: '🔢', name: 'calc' },
    { icon: '📢', name: 'echo' },
    { icon: '🧹', name: 'clear' }
] as const; 