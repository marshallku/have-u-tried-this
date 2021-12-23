export default function createInstance({ baseUrl, timeOut }) {
  const fetcher = {
    baseUrl,
    error(message = "Failed to fetch") {
      return {
        error: true,
        message,
      };
    },
    _dummyPromise: new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          error: true,
          message: "Took too long to fetch",
        });
      }, timeOut);
    }),
    async fetch(resource, init) {
      try {
        const response = timeOut
          ? await Promise.race([
              setTimeout(() => {}, timeOut),
              fetch(`${baseUrl}${resource}`, init),
            ])
          : await fetch(`${baseUrl}${resource}`, init);
        const json = await response.json();

        return json;
      } catch (err) {
        return this.error(err.message);
      }
    },
    async get(resource, init) {
      return this.fetch(resource, init);
    },
    async post(resource, init = { method: "POST" }) {
      if (init.method !== "POST") return this.error("Invalid method");
      return this.fetch(resource, init);
    },
  };

  return fetcher;
}
