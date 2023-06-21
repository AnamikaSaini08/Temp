import FailSound from "../audios/fail1.mp3";
import WinSound from "../audios/win2.mp3";
import WallHitSound from "../audios/wall_hit1.mp3";
import GetCoinSound from "../audios/Point_score.mp3";

export const playFailSound = () => {
  const audio = new Audio(FailSound);
  audio.play();
};

export const playWinSound = () => {
  const audio = new Audio(WinSound);
  audio.play();
};

export const playWallHitSound = () => {
  const audio = new Audio(WallHitSound);
  audio.play();
};

export const playGetCoinSound = () => {
  const audio = new Audio(GetCoinSound);
  audio.play();
};
