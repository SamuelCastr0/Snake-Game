import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import useGame from "../../hooks/useGame";
import { Direction, Game } from "../../types";

export interface EngineProps {
  children: React.ReactNode;
}

const Engine = ({ children }: EngineProps) => {
  const { moveSnake, setDirection, isPlaying, toggleGame, snakeSpeed } =
    useGame();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.code) {
      case "ArrowUp":
        setDirection(Direction.UP);
        break;
      case "ArrowRight":
        setDirection(Direction.RIGHT);
        break;
      case "ArrowDown":
        setDirection(Direction.DOWN);
        break;
      case "ArrowLeft":
        setDirection(Direction.LEFT);
        break;
      default:
        console.log("undefined direction");
        break;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const gameIsValid = moveSnake();
        if (!gameIsValid) {
          clearInterval(interval);
          toggleGame();
        }
      }, snakeSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, moveSnake, setInterval, clearInterval, toggleGame]);

  return (
    <Box tabIndex={0} onKeyDown={handleKeyDown}>
      {children}
    </Box>
  );
};

export default Engine;
