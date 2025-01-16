const errorCache = new Map<string, Error>();

export function getError(key: string) {
    console.log("zbe login",errorCache.get('login'))
    return errorCache.get(key);
}

export function setError(key: string, error: Error) {
    console.log("zbe", key, "error =>",error.message)
  errorCache.set(key, error);
}

export function clearError(key: string) {
    errorCache.delete(key);
}