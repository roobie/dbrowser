function when<T>(predicate: boolean, thunk: () => T): T | undefined {
  if (predicate) return thunk();
  return void 0;
}
