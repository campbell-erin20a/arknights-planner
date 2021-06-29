

export function toPromise(self, fn = self) {
  return (...args) =>
    new Promise((pass, fail) =>
      fn.call(
        (self === fn) ? null : self,
        ...args,
        (error, ...results) => error ? fail(error) : pass(results)
      ));
}
