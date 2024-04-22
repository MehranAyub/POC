export function storeMiddleware(store: any) {
  return (next: any) => (action: any) => {
    switch (action.type) {
      default:
    }

    return next(action);
  };
}
