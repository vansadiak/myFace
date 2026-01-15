import React, { useState, useEffect, useRef } from "react";

interface TypingGameProps {
  isDarkMode: boolean;
}

const phrases = [
  'const dev = "Kuldeep";',
  "nx affected --target=build",
  "git push origin main",
  "senior dev who can lead",
  "Angular | React | Next.js",
  "D3.visualize(data)",
  "monorepo.migrate(Nx)",
  "WebSocket.onmessage(render)",
  "Pyspark + GraphFrames",
  "bugs.reduce(95%)",
  "def solve(problem): pass",
  "val result = data.map(_)",
  "Vue.component('ship-it')",
  "python3 -m uvicorn main:app",
  "scala> spark.read.parquet",
  "<template v-if=\"ready\">",
  "from fastapi import FastAPI",
  "case class Engineer(ship: T)",
  "npm run dev && coffee.sip()",
  "async def fetch_and_render():",
];

const TypingGame: React.FC<TypingGameProps> = ({ isDarkMode }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Track which phrase we last counted to prevent double-counting
  const lastCountedPhrase = useRef(-1);

  const currentPhrase = phrases[phraseIndex];
  const progress = Math.min(20, Math.floor((userInput.length / currentPhrase.length) * 20));

  // Check for phrase completion
  useEffect(() => {
    if (
      userInput === currentPhrase && 
      userInput.length > 0 && 
      !showCheck && 
      !gameComplete &&
      lastCountedPhrase.current !== phraseIndex
    ) {
      lastCountedPhrase.current = phraseIndex;
      setTypedCount(prev => prev + 1);
      setShowCheck(true);
    }
  }, [userInput, currentPhrase, showCheck, gameComplete, phraseIndex]);

  // Handle advancing after checkmark is shown
  useEffect(() => {
    if (!showCheck) return;
    
    const currentIndex = phraseIndex; // Capture current index
    
    const timeout = setTimeout(() => {
      setShowCheck(false);
      setUserInput("");
      
      if (currentIndex >= phrases.length - 1) {
        setGameComplete(true);
      } else {
        setPhraseIndex(currentIndex + 1);
      }
    }, 500);
    
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCheck]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ignore if showing checkmark or game complete
      if (showCheck || gameComplete) {
        return;
      }

      // Prevent default for keys we handle
      if (
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "Backspace" ||
        (e.key.length === 1 && !e.ctrlKey && !e.metaKey)
      ) {
        e.preventDefault();
      }

      if (e.key === "Backspace") {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key === "Escape") {
        setUserInput("");
      } else if (e.key === "Tab") {
        // Start timer on first interaction
        if (!startTime) {
          setStartTime(Date.now());
        }
        // Skip to next phrase
        setUserInput("");
        if (phraseIndex >= phrases.length - 1) {
          setGameComplete(true);
        } else {
          setPhraseIndex(prev => prev + 1);
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        if (userInput.length < currentPhrase.length) {
          // Start timer on first interaction
          if (!startTime) {
            setStartTime(Date.now());
          }
          
          // Track errors
          if (e.key !== currentPhrase[userInput.length]) {
            setTotalErrors(prev => prev + 1);
          }
          
          setTotalCharsTyped(prev => prev + 1);
          setUserInput(prev => prev + e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCheck, gameComplete, phraseIndex, userInput, currentPhrase, startTime]);

  // Render character with correct/incorrect styling
  const renderChar = (char: string, index: number) => {
    if (index >= userInput.length) {
      return (
        <span key={index} className="opacity-40">
          {char}
        </span>
      );
    }

    const isCorrect = userInput[index] === char;
    return (
      <span
        key={index}
        className={isCorrect ? "opacity-100" : "text-[#FF0000] opacity-100"}
      >
        {char}
      </span>
    );
  };

  // Render progress bar
  const renderProgressBar = () => {
    const filled = "█".repeat(progress);
    const empty = "░".repeat(20 - progress);
    return (
      <span className="opacity-60">
        {filled}
        <span className="opacity-30">{empty}</span>
      </span>
    );
  };

  // Calculate final stats
  const calculateStats = () => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    const wpm = timeElapsed > 0 ? Math.round((totalCharsTyped / 5) / timeElapsed) : 0;
    const accuracy = totalCharsTyped > 0 ? Math.round(((totalCharsTyped - totalErrors) / totalCharsTyped) * 100) : 0;
    const timeInSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    const skippedCount = phrases.length - typedCount;
    return { wpm, accuracy, timeInSeconds, typedCount, skippedCount };
  };

  // Reset game
  const resetGame = () => {
    setPhraseIndex(0);
    setUserInput("");
    setShowCheck(false);
    setTypedCount(0);
    setTotalErrors(0);
    setTotalCharsTyped(0);
    setStartTime(null);
    setGameComplete(false);
    lastCountedPhrase.current = -1;
  };

  // Score panel after completing all phrases
  if (gameComplete) {
    const { wpm, accuracy, timeInSeconds, typedCount: typed, skippedCount } = calculateStats();
    const hasTyped = typed > 0;
    
    return (
      <div className="mb-10 font-mono">
        <div className="border-2 border-current p-4 mb-4">
          <div className="text-base md:text-lg mb-4 text-[#FF0000]">
            &gt; {hasTyped ? "COMPLETE_" : "SKIPPED_"}
          </div>
          
          {hasTyped ? (
            <>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl md:text-3xl font-bold">{wpm}</div>
                  <div className="text-xs opacity-60">WPM</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold">{accuracy}%</div>
                  <div className="text-xs opacity-60">ACCURACY</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold">{timeInSeconds}s</div>
                  <div className="text-xs opacity-60">TIME</div>
                </div>
              </div>
              <div className="text-xs opacity-40 text-center">
                {typed} typed{skippedCount > 0 ? ` • ${skippedCount} skipped` : ""}
              </div>
            </>
          ) : (
            <div className="text-sm opacity-60 text-center mb-4">
              No phrases typed. Try again?
            </div>
          )}
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 border-2 border-current hover-invert font-medium text-sm uppercase tracking-wide"
        >
          RESTART
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10 font-mono">
      {/* Phrase counter */}
      <div className="text-xs opacity-40 mb-2">
        {phraseIndex + 1} / {phrases.length}
      </div>

      {/* Typing area */}
      <div className="text-base md:text-lg mb-2">
        <span className="opacity-60">&gt; </span>
        {currentPhrase.split("").map(renderChar)}
        {!showCheck && userInput.length < currentPhrase.length && (
          <span className="blink-cursor">█</span>
        )}
        {showCheck && <span className="text-[#FF0000]"> ✓</span>}
      </div>

      {/* Progress bar */}
      <div className="text-xs md:text-sm tracking-widest">
        <span className="opacity-60">&gt; </span>
        {renderProgressBar()}
      </div>

      {/* Hint */}
      <div className="text-xs opacity-30 mt-4">
        [TAB] skip &bull; [ESC] reset &bull; [BACKSPACE] delete
      </div>
    </div>
  );
};

export default TypingGame;
