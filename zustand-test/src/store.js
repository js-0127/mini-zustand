import { useSyncExternalStore } from "react";
function createStore(createState) {
  let state;
  let listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(state, nextState)) {
      const previousState = state;
      if (!replace) {
        state =
          typeof nextState !== "object" || nextState === null
            ? nextState
            : Object.assign({}, state, nextState);
      } else {
        state = nextState;
      }
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destory = () => {
    listeners.clear();
  };

  const api = { getState, setState, subscribe, destory };
  state = createState(setState, getState, api);
  return api;
}

export function useStore(api, selector) {
  function getState() {
    return selector(api.getState());
  }
  return useSyncExternalStore(api.subscribe, getState);
}

export function create(createState) {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
}



export const useAAAStore = create((set) => ({
  aaa: 123,
  updateAaa: (value) => set(() => ({ aaa: value })),
}));
