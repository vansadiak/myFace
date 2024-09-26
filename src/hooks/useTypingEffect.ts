import { useState, useEffect, useRef } from "react";

const useTypingEffect = (
  text: string,
  speed: number = 100,
  shouldType: boolean = true
) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!shouldType) {
      setDisplayedText(text);
      return;
    }
    let index = 0;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        if (index === text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, speed);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, shouldType]);

  return displayedText;
};

export default useTypingEffect;
