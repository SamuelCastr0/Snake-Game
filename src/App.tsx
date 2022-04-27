import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Engine from "./components/Engine";
import Food from "./components/Food";
import Snake from "./components/Snake";
import useGame from "./hooks/useGame";
import { Game } from "./types";

function App() {
  const { isPlaying, hasSnakeCrashed, toggleGame, restartGame, snakeDots } =
    useGame();
  return (
    <Engine>
      <Flex height="100vh" width="100vw" align="center" justify="center">
        <Box>
          {hasSnakeCrashed ? (
            <Flex justifyContent="space-between" alignItems="flex-end" mb="1">
              <Button colorScheme="red" onClick={() => restartGame()}>
                Restart
              </Button>
              <Box>Score: {snakeDots.length - 2}</Box>
            </Flex>
          ) : isPlaying ? (
            <Button colorScheme="blue" mb="1" onClick={() => toggleGame()}>
              Pause
            </Button>
          ) : (
            <Button colorScheme="green" mb="1" onClick={() => toggleGame()}>
              Play
            </Button>
          )}
          <Box
            border={`${Game.BOX_SIZE}px solid`}
            boxSizing="content-box"
            height={`${Game.ARENA_HEIGHT * Game.BOX_SIZE}px`}
            width={`${Game.ARENA_WIDTH * Game.BOX_SIZE}px`}
            position="relative"
          >
            <Snake />
            <Food />
          </Box>
        </Box>
      </Flex>
    </Engine>
  );
}

export default App;
