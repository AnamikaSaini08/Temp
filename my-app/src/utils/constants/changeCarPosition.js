import { playFailSound, playWallHitSound, playWinSound , playGetCoinSound, playWalkSound } from "./gameSounds";

let interval;
async function fun(x, y, setFilterBatteryPosition) {
  await setFilterBatteryPosition((prevFilterBatteryPosition) =>
    prevFilterBatteryPosition.filter(
      (coord) => !(coord[0] === x && coord[1] === y)
    )
  );
}
//On Click Of Reset Button
export const eraseBoxes = (
  setBoxes,
  setCarPosition,
  setRobotDirection,
  setCarHealth,
  setFilterBatteryPosition,
  batteryPosition,
  carInitialHealth,
  boxSize,
  setBoxSizeTemp,
  setBoxIndex,
  setCoins,
  setPlayButton
) => {
  setBoxes(new Array(boxSize).fill(null));
  setCarPosition({ x: 1, y: 1 });
  setRobotDirection(new Array(0));
  setCarHealth && setCarHealth(carInitialHealth);
  setFilterBatteryPosition && setFilterBatteryPosition(batteryPosition);
  clearInterval(interval);
  setBoxSizeTemp(boxSize);
  setBoxIndex(0);
  setCoins && setCoins(0);
  setPlayButton(false);
};
const showPopUpMsg = (
  setShowPopUp,
  setPopUpStatus,
  setPopUpDesc,
  interval,
  status,
  desc,
  battery
) => {
  setShowPopUp(true);
  setPopUpStatus(status);
  setPopUpDesc(desc);
  if (status === "Fail" || status === "Win" || status === "Stuck") {
    clearInterval(interval);
  }
};
export const checkEmptyBox = (
  boxes,
  boxSizeTemp,
  setPopUpDesc,
  setPopUpStatus,
  setShowPopUp
) => {
  for (let i = 0; i < boxSizeTemp; i++) {
    if (!boxes[i]) {
      setPopUpDesc("Please Fill All Box First!");
      setPopUpStatus("Fail");
      setShowPopUp(true);
      return true;
    }
  }
  return false;
};
export const changeCarPosition = (
  boxSizeTemp,
  setRobotDirection,
  filterBatteryPosition,
  setCarHealth,
  carHealthRef,
  boxes,
  setFilterBatteryPosition,
  setCarPosition,
  row,
  col,
  handleRotateCarClockWise,
  handleRotateCarAntiClockWise,
  carInitialHealth,
  setShowPopUp,
  setPopUpStatus,
  setPopUpDesc,
  obstaclePosition,
  endPosition,
  coins,
  setCoins,
  setPlayButton
) => {
  setRobotDirection([]);
  setPlayButton(true);
  let pos = { x: 1, y: 1 }; // Start at { x: 1, y: 1 }
  let index = 0;
  let robotSteps = 0;
  let coinTemp = coins;
  let count = filterBatteryPosition ? filterBatteryPosition.length : 0;
  const batteryHealth = 5;
  setCarHealth && setCarHealth(carInitialHealth);

  // Function to show popup message
  const showPopup = (status, desc, isSuccess = false) => {
    if(status === "Stuck"){
      playWallHitSound();
    }
    if(status === "Fail"){
      playFailSound();
    }
    setPlayButton(false);
    showPopUpMsg(
      setShowPopUp,
      setPopUpStatus,
      setPopUpDesc,
      interval,
      status,
      desc,
      isSuccess
    );
  };
  // When Traverse all BoxSize
  interval = setInterval(() => {
    robotSteps++;

    // Robot Final Destination
    if (pos.x === endPosition.x && pos.y === endPosition.y) {
      playWinSound();
      showPopup("Win", `Hurray! You won the game in ${robotSteps - 1} steps`);
      return;
    }
    const box = boxes[index];
    if(!box){
      clearInterval(interval);
      showPopup("Fail","You Fail! Robot destination not reached");
      return;
    }
    playWalkSound();
    if (box === "left") {
      if (pos.x > 1) {
        if (
          obstaclePosition &&
          obstaclePosition.some(
            (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y
          )
        ) {
          showPopup("Stuck", "You Fail! Robot got stuck on the way");
        } else {
          pos = { ...pos, x: pos.x - 1 };
        }
      } else {
        showPopup("Stuck", "You Fail! Robot got stuck on the way");
        return;
      }
    } else if (box === "right") {
      if (pos.x < row) {
        if (
          obstaclePosition &&
          obstaclePosition.some(
            (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y
          )
        ) {
          showPopup("Stuck", "You Fail! Robot got stuck on the way");
        } else {
          pos = { ...pos, x: pos.x + 1 };
        }
      } else {
        showPopup("Stuck", "You Fail! Robot got stuck on the way");
        return;
      }
    } else if (box === "top") {
      if (pos.y > 1) {
        if (
          obstaclePosition &&
          obstaclePosition.some(
            (coord) => coord[0] === pos.x && coord[1] === pos.y - 1
          )
        ) {
          showPopup("Stuck", "You Fail! Robot got stuck on the way");
        } else {
          pos = { ...pos, y: pos.y - 1 };
        }
      } else {
        showPopup("Stuck", "You Fail! Robot got stuck on the way");
        return;
      }
    } else if (box === "bottom") {
      if (pos.y < col) {
        if (
          obstaclePosition &&
          obstaclePosition.some(
            (coord) => coord[0] === pos.x && coord[1] === pos.y + 1
          )
        ) {
          showPopup("Stuck", "You Fail! Robot got stuck on the way");
        } else {
          pos = { ...pos, y: pos.y + 1 };
        }
      } else {
        showPopup("Stuck", "You Fail! Robot got stuck on the way");
        return;
      }
    } else if (box === "turn-right") {
      handleRotateCarClockWise();
    } else if (box === "turn-left") {
      handleRotateCarAntiClockWise();
    }
    // Rest of your logic
    if (carHealthRef.current === 0) {
      showPopup("Fail", "You Fail! Robot ran out of health");
      return;
    }
    index++;
    setCarPosition({ ...pos });
    setCarHealth && setCarHealth((prevHealth) => prevHealth - 1);
    // When Robot Reach on Battery Position
      if (
        filterBatteryPosition &&
        filterBatteryPosition.some(
          (coord) => coord[0] === pos.x && coord[1] === pos.y
        )
      ) {
        playGetCoinSound();
        setRobotDirection((prevDirection) => [
          ...prevDirection,
          `Robot Move ${box}. (Robot Collected Coin)`,
        ]);
        setCarHealth(carHealthRef.current + batteryHealth);
        fun(pos.x, pos.y, setFilterBatteryPosition);
        count--;
        setCoins(coinTemp+1);
        coinTemp++;
      }else{
        setRobotDirection((prevDirection) => [
          ...prevDirection,
          `Robot Move ${box}`,
        ]);
      }
      if (index > boxSizeTemp) {
        showPopup("Fail", "You Fail! Robot destination not reached");
        return;
      }
  }, 1000);
};