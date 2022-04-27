import { Box } from "@chakra-ui/react";
import useGame from "../../hooks/useGame";
import { Game } from "../../types";

import FoodDot from "./FoodDot";

export default function Food() {
  const { foodDots } = useGame();

  return (
    <Box>
      {foodDots.map((food, i) => (
        <FoodDot
          key={i}
          left={`${food[0] * Game.BOX_SIZE}px`}
          top={`${food[1] * Game.BOX_SIZE}px`}
        />
      ))}
    </Box>
  );
}
