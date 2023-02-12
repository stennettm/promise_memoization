class PromiseMemoizationDemo {
    // Caching promises
    cache = new Map();

    getData (url) {
        if(!this.cache.has(url)) {
            // For demonstration purposes, the cache holds both a Promise and its return value in memory,
            // but the return value could be persisted elsewhere, e.g. localStorage if not terribly sensitive.
            // However, always at least caching a Promise in memory and returning it allows us to respond to multiple
            // widgets with the response from only a single fetch request, even if the request hasn't finished yet.
            // This is called "Promise Memoization."
            this.cache.set(url, new Promise((resolve) => {
                console.log("Making request.");
                // Let's simulate request latency
                setTimeout( () => {
                    resolve(fetch(url).then((response) => response.json()));
                }, 3000);

                // Then let's simulate a cache expiration in thirty seconds
                let self = this;
                setTimeout( () => {
                    self.cache.delete(url);
                    console.log("Cache cleared.");
                }, 30000);
            }));
        }
        return this.cache.get(url);
    }
}

const MyFancySDK = new PromiseMemoizationDemo();