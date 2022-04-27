import { Box } from "@chakra-ui/react";

import useGame from "../../hooks/useGame";
import { Game } from "../../types";
import SnakeDot from "./SnakeDot";

export default function Snake() {
  const { snakeDots } = useGame();

  return (
    <Box>
      {snakeDots.map((dot, i) => (
        <SnakeDot
          key={i}
          background={i === snakeDots.length - 1 ? "green" : "purple"}
          left={`${dot[0] * Game.BOX_SIZE}px`}
          top={`${dot[1] * Game.BOX_SIZE}px`}
        />
      ))}
    </Box>
  );
}
