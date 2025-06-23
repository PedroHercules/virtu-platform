import * as React from "react";

export function useDebounce(
  callback: (value: string) => Promise<void>,
  delay = 500
) {
  const [isPending, startTransition] = React.useState(false);
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();

  const handleChange = React.useCallback(
    (value: string) => {
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        startTransition(true);
        callback(value).finally(() => startTransition(false));
      }, delay);

      setTimer(newTimer);
    },
    [callback, delay, timer]
  );

  React.useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return { isPending, handleChange };
}
