import { resetUsedWords } from './words';

const hintCache = new Map<string, string>();

export function clearHintCache(): void {
  hintCache.clear();
}

export function resetMatchState(): void {
  resetUsedWords();
  clearHintCache();
}

export interface FetchResult {
  url: string | null;
  isError: boolean;
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  abortSignal: AbortSignal
): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: abortSignal ?? controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      clearTimeout(timeoutId);
      return null;
    }

    const text = await response.text();
    clearTimeout(timeoutId);
    return text;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

async function fetchBingImage(word: string, abortSignal: AbortSignal): Promise<string | null> {
  const encodedWord = encodeURIComponent(word.replace(/ /g, '+'));
  const url = `https://www.bing.com/images/search?q=${encodedWord}+drawing&first=1`;

  const html = await fetchWithTimeout(url, 5000, abortSignal);
  if (!html) return null;

  const match = html.match(/murl"":"([^"]+)"/);
  if (match && match[1]) {
    return match[1].replace(/\\u0026/g, '&');
  }

  return null;
}

async function fetchWikipediaImage(word: string, abortSignal: AbortSignal): Promise<string | null> {
  const encodedWord = encodeURIComponent(word.replace(/ /g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedWord}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: abortSignal ?? controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (data.thumbnail?.source) {
      return data.thumbnail.source;
    }

    return null;
  } catch {
    return null;
  }
}

function getCategoryEmoji(word: string): string {
  const wordLower = word.toLowerCase();

  const emojiMap: Record<string, string> = {
    dog: '🐕',
    cat: '🐱',
    bird: '🐦',
    fish: '🐟',
    cow: '🐄',
    pig: '🐷',
    horse: '🐴',
    lion: '🦁',
    tiger: '🐯',
    bear: '🐻',
    wolf: '🐺',
    rabbit: '🐰',
    mouse: '🐭',
    snake: '🐍',
    frog: '🐸',
    car: '🚗',
    truck: '🚚',
    bus: '🚌',
    bike: '🚲',
    airplane: '✈️',
    boat: '⛵',
    ship: '🚢',
    train: '🚂',
    pizza: '🍕',
    burger: '🍔',
    pasta: '🍝',
    rice: '🍚',
    bread: '🍞',
    cake: '🎂',
    cookie: '🍪',
    chocolate: '🍫',
    icecream: '🍦',
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    water: '💧',
    coffee: '☕',
    tea: '🍵',
    milk: '🥛',
    juice: '🧃',
    soccer: '⚽',
    football: '🏈',
    basketball: '🏀',
    baseball: '⚾',
    tennis: '🎾',
    golf: '⛳',
    swimming: '🏊',
    running: '🏃',
    boxing: '🥊',
    christmas: '🎄',
    easter: '🥚',
    halloween: '🎃',
    birthday: '🎂',
    heart: '❤️',
    star: '⭐',
    sun: '☀️',
    moon: '🌙',
    cloud: '☁️',
    rain: '🌧️',
    snow: '❄️',
    fire: '🔥',
    tree: '🌳',
    flower: '🌸',
    house: '🏠',
    school: '🏫',
    hospital: '🏥',
    police: '👮',
    doctor: '👨‍⚕️',
    baby: '👶',
    man: '👨',
    woman: '👩',
  };

  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (wordLower.includes(key)) {
      return emoji;
    }
  }

  return '❓';
}

export async function fetchHintImage(
  word: string,
  abortSignal: AbortSignal
): Promise<FetchResult> {
  const cached = hintCache.get(word);
  if (cached) {
    return { url: cached === 'error' ? null : cached, isError: cached === 'error' };
  }

  const bingUrl = await fetchBingImage(word, abortSignal);
  if (bingUrl) {
    hintCache.set(word, bingUrl);
    return { url: bingUrl, isError: false };
  }

  const wikiUrl = await fetchWikipediaImage(word, abortSignal);
  if (wikiUrl) {
    hintCache.set(word, wikiUrl);
    return { url: wikiUrl, isError: false };
  }

  hintCache.set(word, 'error');
  return { url: null, isError: true };
}

export function getEmojiFallback(word: string): string {
  return getCategoryEmoji(word);
}

const activeControllers = new Map<string, AbortController>();

export function prefetchHintImages(words: string[]): void {
  words.forEach(word => {
    if (activeControllers.has(word)) {
      return;
    }

    if (hintCache.has(word)) {
      return;
    }

    const controller = new AbortController();
    activeControllers.set(word, controller);

    fetchHintImage(word, controller.signal).then(() => {
      activeControllers.delete(word);
    });
  });
}

export function abortAllFetches(): void {
  activeControllers.forEach(controller => {
    controller.abort();
  });
  activeControllers.clear();
}

export function abortFetch(word: string): void {
  const controller = activeControllers.get(word);
  if (controller) {
    controller.abort();
    activeControllers.delete(word);
  }
}

export function isHintCached(word: string): boolean {
  return hintCache.has(word);
}

export function getCachedHint(word: string): string | null {
  const cached = hintCache.get(word);
  if (!cached) return null;
  if (cached === 'error') return null;
  return cached;
}