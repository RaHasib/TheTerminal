const API_ENDPOINTS = {
    JOKE: import.meta.env.VITE_JOKE_API_URL,
    QUOTE: import.meta.env.VITE_QUOTE_API_URL,
    BACKUP_QUOTE: import.meta.env.VITE_BACKUP_QUOTE_API_URL
} as const;

export const fetchJoke = async () => {
    const response = await fetch(API_ENDPOINTS.JOKE, {
        headers: {
            "Accept": "application/json"
        }
    });
    if (!response.ok) throw new Error('Joke API failed');
    const data = await response.json();
    return data.joke;
};

export const fetchQuote = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.QUOTE);
        if (!response.ok) throw new Error('Primary quote API failed');
        const quote = await response.json();
        return {
            text: quote.content,
            author: quote.author,
            type: 'primary' as const
        };
    } catch (error) {
        // backup API
        const response = await fetch(API_ENDPOINTS.BACKUP_QUOTE);
        const advice = await response.json();
        return {
            text: advice.slip.advice,
            author: 'Daily Advice',
            type: 'backup' as const
        };
    }
}; 