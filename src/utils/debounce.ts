const DEBOUCE_TIME = 300;

export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number = DEBOUCE_TIME
) {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}