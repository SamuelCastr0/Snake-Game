import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateProps } from "../context";
import { actions } from "../context/ducks/game";
import { Direction, Game } from "../types";
import getRandomCoordinates from "../utils/getRandomCoodinates";

const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector(({ game }: RootStateProps) => game);

  const setSnakeDots = useCallback(
    (snakeDots: number[][]) => {
      dispatch(actions.snake(snakeDots));
    },
    [dispatch]
  );

  const setDirection = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      let directionIsValid = true;

      switch (direction) {
        case "UP":
          if (game.direction === "DOWN") directionIsValid = false;
          break;
        case "RIGHT":
          if (game.direction === "LEFT") directionIsValid = false;
          break;
        case "DOWN":
          if (game.direction === "UP") directionIsValid = false;
          break;
        case "LEFT":
          if (game.direction === "RIGHT") directionIsValid = false;
          break;
        default:
          directionIsValid = true;
      }

      if (directionIsValid) dispatch(actions.direction(direction));
    },
    [dispatch, game]
  );

  const toggleGame = useCallback(() => {
    dispatch(actions.play(!game.isPlaying));
  }, [dispatch, game]);

  const setSnakeCrash = useCallback(
    (hasCrashed: boolean) => {
      dispatch(actions.crash(hasCrashed));
    },
    [dispatch]
  );

  const restartGame = useCallback(() => {
    dispatch(actions.reset());
  }, [dispatch]);

  const speedSnakeUp = () => {
    dispatch(actions.speed(game.snakeSpeed - 10));
  };

  const SnakeAte = (snakeHead: number[]) => {
    for (let foodCoordinate of game.foodDots) {
      if (
        snakeHead[0] === foodCoordinate[0] &&
        snakeHead[1] === foodCoordinate[1]
      )
        return true;
    }

    return false;
  };

  const SnakeAteItself = (snakeHead: number[]) => {
    let hasEaten = false;
    for (let snakeCoordinate of game.snakeDots) {
      if (
        snakeHead[0] === snakeCoordinate[0] &&
        snakeHead[1] === snakeCoordinate[1]
      ) {
        hasEaten = true;
      }
    }

    return hasEaten;
  };

  const growSnake = () => {
    const snakeDots = [...game.snakeDots];
    const newDot = snakeDots[0];
    snakeDots.unshift(newDot);

    setSnakeDots(snakeDots);
  };

  const getRandomFoodCoordinates = () => {
    const coordinate = getRandomCoordinates();

    let coordinateAlreadyOcupied = true;

    while (coordinateAlreadyOcupied) {
      coordinateAlreadyOcupied = false;
      for (let foodCoordinate of game.foodDots) {
        if (
          coordinate[0] === foodCoordinate[0] &&
          coordinate[1] === foodCoordinate[1]
        )
          coordinateAlreadyOcupied = true;
      }
    }

    return coordinate;
  };

  const generateFood = () => {
    dispatch(actions.food([getRandomFoodCoordinates()]));
  };

  const handleSnakeAte = () => {
    growSnake();
    generateFood();
    speedSnakeUp();
  };

  const verifySnakePosition = useCallback((snakeHead: number[]) => {
    if (
      snakeHead[0] >= Game.ARENA_WIDTH ||
      snakeHead[0] < 0 ||
      snakeHead[1] >= Game.ARENA_HEIGHT ||
      snakeHead[1] < 0
    ) {
      return false;
    }
    return true;
  }, []);

  const gameRuler = (dots: number[][]) => {
    const SnakePositionIsValid = verifySnakePosition(dots[dots.length - 1]);

    if (SnakePositionIsValid) {
      setSnakeDots(dots);
      if (SnakeAte(dots[dots.length - 1])) handleSnakeAte();
      else if (SnakeAteItself(dots[dots.length - 1])) {
        setSnakeCrash(true);
        return false;
      }
      return true;
    } else {
      setSnakeCrash(true);
      return false;
    }
  };

  const moveSnake = useCallback(() => {
    const dots = [...game.snakeDots];
    let head = dots[dots.length - 1];
    switch (game.direction) {
      case Direction.UP:
        head = [head[0], head[1] - 1];
        break;
      case Direction.RIGHT:
        head = [head[0] + 1, head[1]];
        break;
      case Direction.DOWN:
        head = [head[0], head[1] + 1];
        break;
      case Direction.LEFT:
        head = [head[0] - 1, head[1]];
        break;
      default:
        console.log("undefined move");
    }

    dots.push(head);
    dots.shift();

    const gameIsValid = gameRuler(dots);

    return gameIsValid;
  }, [game]);

  return {
    ...game,
    setSnakeCrash,
    setDirection,
    setSnakeDots,
    moveSnake,
    restartGame,
    toggleGame,
  };
};

export default useGame;
