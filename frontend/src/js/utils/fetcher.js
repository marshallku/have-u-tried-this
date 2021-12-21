export default function createInstance({ baseUrl }) {
  const fetcher = {
    baseUrl,
    error(message = "Failed to fetch") {
      return {
        error: true,
        message,
      };
    },
    async get(resource) {
      try {
        const response = await fetch(`${baseUrl}${resource}`);
        const json = await response.json();

        return json;
      } catch (err) {
        return this.error(err.message);
      }
    },
    async post(resource, init) {
      try {
        const response = await fetch(`${baseUrl}${resource}`, init);
        const json = await response.json();

        return json;
      } catch (err) {
        return this.error(err.message);
      }
    },
  };

  return fetcher;
}
