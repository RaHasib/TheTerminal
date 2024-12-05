import { fetchJoke, fetchQuote } from '../../services/api';

export interface CommandResponse {
    response: string | null;
    loading?: boolean;
}

const FALLBACK_QUOTES = [
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

export const helpCommand = (): CommandResponse => ({
    response: `
🚀 Available Commands:
----------------------
🔍 help  : Show this help message
📅 date  : Show current date and time
⏰ time  : Show time in different formats
😄 joke  : Get a random dad joke
💭 quote : Get an inspiring quote
🔢 calc  : Calculate mathematical expression
📢 echo  : Echo back your text
🧹 clear : Clear the terminal
    `
});

export const dateCommand = (): CommandResponse => ({
    response: new Date().toLocaleString()
});

export const timeCommand = (): CommandResponse => {
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const timeFormats = [
        { 
            label: 'Your Local Time',
            time: now.toLocaleString('en-US', { 
                timeZone: userTimeZone,
                timeStyle: 'full',
                dateStyle: 'full'
            })
        },
        { 
            label: '24-hour format',
            time: now.toLocaleString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        },
        {
            label: 'UTC',
            time: now.toLocaleString('en-US', { timeZone: 'UTC' })
        },
        {
            label: 'Unix Timestamp',
            time: Math.floor(now.getTime() / 1000)
        }
    ];

    return {
        response: `⏰ Current Time Information:
------------------------
${timeFormats.map(({ label, time }) => `${label}: ${time}`).join('\n')}
------------------------
🌍 Your timezone: ${userTimeZone}`
    };
};

export const jokeCommand = async (): Promise<CommandResponse> => {
    try {
        const joke = await fetchJoke();
        return { response: `😄 ${joke}` };
    } catch (err) {
        return { response: '😕 Sorry, could not retrieve a joke at this time.' };
    }
};

export const quoteCommand = async (): Promise<CommandResponse> => {
    try {
        const quote = await fetchQuote();
        const emoji = quote.type === 'primary' ? '💭' : '💡';
        return {
            response: `${emoji} "${quote.text}"
— ${quote.author}`
        };
    } catch (err) {
        const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        return {
            response: `📚 "${randomQuote.text}"
— ${randomQuote.author}
(Offline mode)`
        };
    }
};

export const calcCommand = (args: string): CommandResponse => {
    try {
        const sanitizedArgs = args.replace(/[^0-9+\-*/().]/g, '');
        if (sanitizedArgs !== args) {
            throw new Error('Invalid characters in expression');
        }
        return { response: `${args} = ${eval(sanitizedArgs)}` };
    } catch (err) {
        return { 
            response: 'Invalid expression. Please use only numbers and basic operators (+, -, *, /).'
        };
    }
};

export const echoCommand = (args: string): CommandResponse => ({
    response: args
});

export const clearCommand = (): CommandResponse => ({
    response: null
}); 