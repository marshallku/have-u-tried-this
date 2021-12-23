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
        if (response.status === 204) return { success: true };
        const json = await response.json();

        return json;
      } catch (err) {
        return this.error(err.message);
      }
    },
    async get(resource, init) {
      return this.fetch(resource, init);
    },
    async post(resource, init = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "POST";
      return this.fetch(resource, init);
    },
    async delete(resource, init = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "DELETE";
      return this.fetch(resource, init);
    },
    async put(resource, init = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "PUT";
      return this.fetch(resource, init);
    },
  };

  return fetcher;
}
