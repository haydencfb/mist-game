import { Game } from "../models/Game";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

export enum CardType {
  Search = "SEARCH",
  Wish = "WISH",
  Playing = "PLAYING",
  Completed = "COMPLETED",
}

interface GameCardProps {
  game: Game;
  cardType: CardType;
  button1: () => void;
  button2: () => void;
  button3: () => void;
}

const GameCard = ({
  game,
  cardType,
  button1,
  button2,
  button3,
}: GameCardProps) => {

  if (!game) {
    return <p>No game data available</p>;
  }

  const getCardType = () => {
    // Configuration for button icons based on card type
    const buttonConfig: Record<CardType, React.ElementType[]> = {
      [CardType.Search]: [
        PlaylistAddIcon,
        PlaylistPlayIcon,
        PlaylistAddCheckIcon,
      ],
      [CardType.Wish]: [
        PlaylistPlayIcon,
        PlaylistAddCheckIcon,
        PlaylistRemoveIcon,
      ],
      [CardType.Playing]: [
        PlaylistAddIcon,
        PlaylistAddCheckIcon,
        PlaylistRemoveIcon,
      ],
      [CardType.Completed]: [
        PlaylistAddIcon,
        PlaylistPlayIcon,
        PlaylistRemoveIcon,
      ],
    };

    // Default to an empty array if cardType doesn't match
    const icons = buttonConfig[cardType] || [];

    // Render the buttons dynamically
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        {icons.map((Icon, index) => (
          <IconButton
            key={index}
            onClick={[button1, button2, button3][index]}
            sx={{ "&:hover": { backgroundColor: "#6c1e23" } }}
          >
            <Icon sx={{ height: 35, width: 35, color: "#FFFFFF" }} />
          </IconButton>
        ))}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#49191E",
        color: "#FFFFFF",
        borderRadius: 4,
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 225, maxHeight: 600, maxWidth: 250, objectFit: 'cover', borderRadius: 4 }}
        image={game.image}
        alt="Game cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1}}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4">
            <strong>{game.title}</strong>
          </Typography>
          <Typography variant="subtitle1" component="div">
            <strong>Release Year: </strong>
            {game.released}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <strong>Platform: </strong>
            {game.parent_platforms
              .map((p) => p.platform.name) // Safely map over platforms
              .join(" • ")}
          </Typography>
          <Rating
            sx={{ pt: 2 }}
            name="read-only"
            precision={0.5}
            value={game.floatRating}
            readOnly
          />
        </CardContent>
      </Box>
      {getCardType()}
    </Card>
  );
};

export default GameCard;
