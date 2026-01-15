import { useState, useEffect, useRef } from "react";

const useTypingEffect = (
  text: string,
  speed: number = 100,
  delay: number = 0
) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        if (index === text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, delay]);

  return displayedText;
};

export default useTypingEffect;
