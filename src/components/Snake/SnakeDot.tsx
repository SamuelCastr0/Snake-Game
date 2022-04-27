import { Box } from "@chakra-ui/react";
import { Game } from "../../types";

export default function SnakeDot({ ...props }) {
  return (
    <Box
      height={`${Game.BOX_SIZE}px`}
      width={`${Game.BOX_SIZE}px`}
      bg="blackAlpha.900"
      borderRadius="2px"
      position="absolute"
      zIndex="2"
      {...props}
    ></Box>
  );
}
