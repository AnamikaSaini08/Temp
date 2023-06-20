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
  setBoxSize,
  initialBoxSize,
  endPosition
) => {
  setBoxes(new Array(boxSize).fill(null));
  setCarPosition({ x: 1, y: 1 });
  setRobotDirection(new Array(0));
  setCarHealth && setCarHealth(carInitialHealth);
  setFilterBatteryPosition && setFilterBatteryPosition(batteryPosition);
  clearInterval(interval);
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
  battery &&
    setTimeout(() => {
      setShowPopUp(false);
    }, 2000);
  setPopUpStatus(status);
  setPopUpDesc(desc);
  if (status === "Fail" || status === "Win") {
    clearInterval(interval);
  }
};
export const checkEmptyBox = (
  boxes,
  boxSize,
  setPopUpDesc,
  setPopUpStatus,
  setShowPopUp
) => {
  for (let i = 0; i < boxSize; i++) {
    if (!boxes[i]) {
      setPopUpDesc("Please Fill All Box First!");
      setPopUpStatus("X");
      setShowPopUp(true);
      return true;
    }
  }
  return false;
};
export const changeCarPosition = (
  boxSize,
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
  endPosition
) => {
  if (checkEmptyBox(boxes, boxSize, setPopUpDesc, setPopUpStatus, setShowPopUp))
    return;

  setRobotDirection([]);
  let pos = { x: 1, y: 1 }; // Start at { x: 1, y: 1 }
  let index = 0;
  let robotSteps = 0;
  let count = filterBatteryPosition ? filterBatteryPosition.length : 0;
  const batteryHealth = 5;
  setCarHealth && setCarHealth(carInitialHealth);

  // Function to show popup message
  const showPopup = (status, desc, isSuccess = false) => {
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
    // When Robot Reach on Battery Position
    if (
      filterBatteryPosition &&
      filterBatteryPosition.some(
        (coord) => coord[0] === pos.x && coord[1] === pos.y
      )
    ) {
      showPopup("Hurrahhh!!!", "You Have Collected a Battery!", true);
      setCarHealth(carHealthRef.current + batteryHealth);
      fun(pos.x, pos.y, setFilterBatteryPosition);
      count--;
    }
    // Robot Final Destination
    if (pos.x === endPosition.x && pos.y === endPosition.y && count === 0) {
      showPopup("Win", `Hurray! You won the game in ${robotSteps - 1} steps`);
      return;
    }
    const box = boxes[index];
    if (box === "left") {
      if (pos.x > 1) {
        if (
          obstaclePosition &&
          obstaclePosition.some(
            (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y
          )
        ) {
          showPopup("Fail", "Oops! Robot havent reached the destination.");
        } else {
          pos = { ...pos, x: pos.x - 1 };
        }
      } else {
        showPopup("Fail", "Oops! Robot havent reached the destination.");
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
          showPopup("Fail", "Oops! Robot havent reached the destination.");
        } else {
          pos = { ...pos, x: pos.x + 1 };
        }
      } else {
        showPopup("Fail", "Oops! Robot havent reached the destination.");
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
          showPopup("Fail", "Oops! Robot havent reached the destination.");
        } else {
          pos = { ...pos, y: pos.y - 1 };
        }
      } else {
        showPopup("Fail", "Oops! Robot havent reached the destination.");
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
          showPopup("Fail", "Oops! Robot havent reached the destination.");
        } else {
          pos = { ...pos, y: pos.y + 1 };
        }
      } else {
        showPopup("Fail", "Oops! Robot havent reached the destination.");
        return;
      }
    } else if (box === "turn-right") {
      handleRotateCarClockWise();
    } else if (box === "turn-left") {
      handleRotateCarAntiClockWise();
    }
    // Rest of your logic
    if (carHealthRef.current === 0) {
      showPopup("Fail", "Robot Died!");
      return;
    }
    index++;
    setCarPosition({ ...pos });
    setCarHealth && setCarHealth((prevHealth) => prevHealth - 1);
    if (box)
      setRobotDirection((prevDirection) => [
        ...prevDirection,
        `Robot Move ${box}`,
      ]);
      if (index > boxSize) {
        showPopup("Fail", "Oops! Robot havent reached the destination.");
        return;
      }
  }, 1000);
};
