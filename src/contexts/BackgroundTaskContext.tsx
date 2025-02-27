import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BackgroundTaskContext = createContext<any>({});

export const BackgroundTaskProvider = ({ children }: any) => {
  const tasksRef = useRef(new Map());
  const [tasks, setTasks] = useState<any>([]);

  const addTask = (id: string, callback: any, options: any = { type: "timeout" }) => {
    if (!callback || typeof callback !== "function") return;

    removeTask(id);

    let task: any;
    if (options.type === "interval") {
      task = setInterval(callback, options.delay || 1000);
    } else if (options.type === "timeout") {
      task = setTimeout(callback, options.delay || 1000);
    } else if (options.type === "multiple") {
      let count = 0;
      task = setInterval(() => {
        if (count >= options.runs) {
          clearInterval(task);
          tasksRef.current.delete(id);
        } else {
          callback();
          count++;
        }
      }, options.delay || 1000);
    } else {
      callback();
      return;
    }

    tasksRef.current.set(id, task);
    setTasks([...tasksRef.current.keys()]);
  };

  const removeTask = (id: string) => {
    if (tasksRef.current.has(id)) {
      clearInterval(tasksRef.current.get(id));
      clearTimeout(tasksRef.current.get(id));
      tasksRef.current.delete(id);
      setTasks([...tasksRef.current.keys()]);
    }
  };

  useEffect(() => {
    return () => {
      tasksRef.current.forEach((task) => {
        clearInterval(task);
        clearTimeout(task);
      });
      tasksRef.current.clear();
    };
  }, []);

  return (
    <BackgroundTaskContext.Provider value={{ addTask, removeTask, tasks }}>
      {children}
    </BackgroundTaskContext.Provider>
  );
};

export const useBackgroundTask = () => {
  return useContext(BackgroundTaskContext);
};
