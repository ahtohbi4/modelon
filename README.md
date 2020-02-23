# modelon

```js
// src/models/counter.js
import createModel from 'modelon/react';

const [modelCounter, useModelCounter] = createModel(
  'counter',
  { count: 0 },
  {
    decrease({ count }) {
      return { count: count - 1 };
    },
    increase({ count }) {
      return { count: count + 1 };
    },
    reset(_store, { set }) {
      set(0);
    },
    set(_state, _actions, value) {
      return { count: value };
    },
  },
);

export {
  modelCounter,
  useModelCounter,
};
```

```jsx harmony
// src/index.js
import createStore from 'storeon';
import StoreContext from 'storeon/react/context';
import { modelCounter } from 'models/counter';

const store = createStore([modelCounter]);

render(
  <StoreContext.Provider value={store}>
    <Counter />
  </StoreContext.Provider>,
  document.body
)
```

```jsx harmony
// src/containers/Counter.js
import { useModelCounter } from 'models/counter';

const Counter = () => {
  const [counter, { decrease, increase }] = useModelCounter();

  return (
    <div>
      {counter.count}

      <button onClick={() => decrease()}>-</button>
      <button onClick={() => increase()}>+</button>
    </div>
  );
};
```
