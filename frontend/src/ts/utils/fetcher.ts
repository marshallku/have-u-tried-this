export default function createInstance({ baseUrl, timeOut }: InstanceOptions) {
  const fetcher: IInstance = {
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
    async fetch(resource: string, init?: RequestInit) {
      try {
        const response = timeOut
          ? await Promise.race([
              this._dummyPromise,
              fetch(`${baseUrl}${resource}`, init),
            ])
          : await fetch(`${baseUrl}${resource}`, init);
        if ("error" in response) throw new Error(response.message);
        const json = await response.json();

        return json;
      } catch (err) {
        if (typeof err === "string") return this.error(err);
        console.log(err);
        return this.error();
      }
    },
    async get(resource: string, init?: RequestInit) {
      return this.fetch(resource, init);
    },
    async post(resource: string, init: RequestInit = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "POST";
      return this.fetch(resource, init);
    },
    async delete(resource: string, init: RequestInit = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "DELETE";
      return this.fetch(resource, init);
    },
    async put(resource: string, init: RequestInit = {}) {
      // eslint-disable-next-line no-param-reassign
      init.method = "PUT";
      return this.fetch(resource, init);
    },
  };

  return fetcher;
}
