import { Box } from "@chakra-ui/react";
import { Game } from "../../types";

export default function FoodDot({ ...props }) {
  return (
    <Box
      height={`${Game.BOX_SIZE}px`}
      width={`${Game.BOX_SIZE}px`}
      bg="red.500"
      borderRadius="2px"
      position="absolute"
      zIndex="1"
      {...props}
    ></Box>
  );
}
