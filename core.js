function injectHoot(useStoreon) {
  return function createModel(slug, initialState, actions) {
    const normalizeActionName = (name) => `${slug}::${name}`;
    let boundActions = {};

    const modelStore = (store) => {
      boundActions = Object.keys(actions).reduce(
        (result, actionName) => ({
          ...result,
          [actionName]: (payload) => store.dispatch(normalizeActionName(actionName), payload),
        }),
        {},
      );

      store.on('@init', () => ({ [slug]: initialState }));

      Object.entries(actions).forEach(([actionName, action]) => {
        store.on(
          normalizeActionName(actionName),
          ({ [slug]: subState }, payload) => {
            const newSubState = action(subState, boundActions, payload);

            console.log(`${normalizeActionName(actionName)}(${payload}): ${newSubState}`);

            if (newSubState !== undefined) {
              return { [slug]: newSubState };
            }
          },
        );
      });
    };
    const useModel = () => {
      const { [slug]: model } = useStoreon(slug);

      return [model, boundActions];
    };

    return [modelStore, useModel];
  };
}

module.exports = injectHoot;
