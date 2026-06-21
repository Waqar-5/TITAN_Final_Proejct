// src/hooks/useApi.js
import { useEffect, useState } from "react";

/**
 * Generic hook to call an async service function and track loading/error/data state.
 *
 * `fn` should be a function with no arguments (wrap with useCallback at the call
 * site if it needs to close over props/state) and `deps` controls when it re-runs,
 * the same way a useEffect dependency array does.
 */
export default function useApi(fn, deps = []) {
  const [state, setState] = useState({ data: null, error: null, isLoading: true });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    fn()
      .then((result) => {
        if (isCurrent) setState({ data: result, error: null, isLoading: false });
      })
      .catch((err) => {
        if (isCurrent)
          setState({ data: null, error: err.message || "Something went wrong", isLoading: false });
      });

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadToken]);

  function refetch() {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    setReloadToken((t) => t + 1);
  }

  return { data: state.data, error: state.error, isLoading: state.isLoading, refetch };
}
