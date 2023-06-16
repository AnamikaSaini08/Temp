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
  initialBoxSize
) => {
  setBoxes(new Array(boxSize).fill(null));
  setCarPosition({ x: 0, y: 0 });
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
  setPopUpDesc
) => {
  if (checkEmptyBox(boxes, boxSize, setPopUpDesc, setPopUpStatus, setShowPopUp))
    return;

  setRobotDirection([]);
  let pos = { x: 0, y: 0 };
  let index = 0;
  let robotSteps = 0;
  let count = filterBatteryPosition ? filterBatteryPosition.length : 0;
  const batteryHealth = 5;
  setCarHealth && setCarHealth(carInitialHealth);

  // When Traverse all BoxSize
  interval = setInterval(() => {
    if (index > boxSize) {
      showPopUpMsg(
        setShowPopUp,
        setPopUpStatus,
        setPopUpDesc,
        interval,
        "Fail",
        "You Fail!"
      );
      return;
    }

    robotSteps++;
    // When Robot Reach on Battery Position
    if (
      filterBatteryPosition &&
      filterBatteryPosition.some(
        (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y + 1
      )
    ) {
      showPopUpMsg(
        setShowPopUp,
        setPopUpStatus,
        setPopUpDesc,
        interval,
        "Hurrahhh!!!",
        "You Have Collected a Battery!",
        true
      );
      setCarHealth(carHealthRef.current + batteryHealth);
      fun(pos.x + 1, pos.y + 1, setFilterBatteryPosition);
      count--;
    }

    // Robot Final Destination
    if (pos.x === row - 1 && pos.y === col - 1 && count === 0) {
      showPopUpMsg(
        setShowPopUp,
        setPopUpStatus,
        setPopUpDesc,
        interval,
        "Win",
        `You won the game in ${robotSteps - 1} steps`
      );
      return;
    }

    const box = boxes[index];
    if (box === "left") {
      if (pos.x > 0) pos = { ...pos, x: pos.x - 1 };
      else {
        showPopUpMsg(
          setShowPopUp,
          setPopUpStatus,
          setPopUpDesc,
          interval,
          "Fail",
          "You Fail! Robot went out of boundary."
        );
        return;
      }
    } else if (box === "right") {
      if (pos.x < col - 1) pos = { ...pos, x: pos.x + 1 };
      else {
        showPopUpMsg(
          setShowPopUp,
          setPopUpStatus,
          setPopUpDesc,
          interval,
          "Fail",
          "You Fail! Robot went out of boundary."
        );
        return;
      }
    } else if (box === "top") {
      if (pos.y > 0) pos = { ...pos, y: pos.y - 1 };
      else {
        showPopUpMsg(
          setShowPopUp,
          setPopUpStatus,
          setPopUpDesc,
          interval,
          "Fail",
          "You Fail! Robot went out of boundary."
        );
        return;
      }
    } else if (box === "bottom") {
      if (pos.y < col - 1) pos = { ...pos, y: pos.y + 1 };
      else {
        showPopUpMsg(
          setShowPopUp,
          setPopUpStatus,
          setPopUpDesc,
          interval,
          "Fail",
          "You Fail! Robot went out of boundary."
        );
        return;
      }
    } else if (box === "turn-right") {
      handleRotateCarClockWise();
    } else if (box === "turn-left") {
      handleRotateCarAntiClockWise();
    }

    // Rest of your logic
    if (carHealthRef.current === 0) {
      showPopUpMsg(
        setShowPopUp,
        setPopUpStatus,
        setPopUpDesc,
        interval,
        "Fail",
        "Robot Died!"
      );
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
  }, 1000);
};

//Note in setInterval, render ke liye state bnaye h but setInterval me previous value ko get krne ke liye
//usi state ka ref variable bnaye h ar usko update krke uski value ko state variable me update kro to sync me dikhega sb.
