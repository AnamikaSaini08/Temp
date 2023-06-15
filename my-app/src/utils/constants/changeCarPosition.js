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
  setFillBoxes,
  carInitialHealth,
  boxSize
) => {
  setBoxes(new Array(boxSize).fill(null));
  setCarPosition({ x: 0, y: 0 });
  setRobotDirection(new Array(0));
  setCarHealth && setCarHealth(carInitialHealth);
  if (setFilterBatteryPosition) setFilterBatteryPosition(batteryPosition);
  setFillBoxes(0);
};

export const changeCarPosition = (
  fillBoxes,
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
  carInitialHealth
) => {
  if (fillBoxes < boxSize) {
    alert("Please fill all the boxes");
    return;
  }

  setRobotDirection([]);
  let pos = { x: 0, y: 0 };
  let index = 0;
  let count = filterBatteryPosition ? filterBatteryPosition.length : 0;
  const batteryHealth = 5;
  setCarHealth && setCarHealth(carInitialHealth);

  // When Traverse all BoxSize
  const interval = setInterval(() => {
    if (index > boxSize) {
      alert("You Fail!");
      clearInterval(interval);
      return;
    }

    // When Robot Reach on Battery Position
    if (
      filterBatteryPosition &&
      filterBatteryPosition.some(
        (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y + 1
      )
    ) {
      alert("You Have Collected a Battery");
      setCarHealth(carHealthRef.current + batteryHealth);
      fun(pos.x + 1, pos.y + 1, setFilterBatteryPosition);
      count--;
    }

    // Robot Final Destination
    if (pos.x === row - 1 && pos.y === col - 1 && count === 0) {
      alert(`You won the game in ${boxSize} steps`);
      clearInterval(interval);
      //eraseBoxes();
      return;
    }

    const box = boxes[index];
    if (box === "left") {
      if (pos.x > 0) pos = { ...pos, x: pos.x - 1 };
      else {
        alert("You Fail! Robot went out of boundary.");
        clearInterval(interval);
        return;
      }
    } else if (box === "right") {
      if (pos.x < col - 1) pos = { ...pos, x: pos.x + 1 };
      else {
        alert("You Fail! Robot went out of boundary.");
        clearInterval(interval);
        return;
      }
    } else if (box === "top") {
      if (pos.y > 0) pos = { ...pos, y: pos.y - 1 };
      else {
        alert("You Fail! Robot went out of boundary.");
        clearInterval(interval);
        return;
      }
    } else if (box === "bottom") {
      if (pos.y < col - 1) pos = { ...pos, y: pos.y + 1 };
      else {
        alert("You Fail! Robot went out of boundary.");
        clearInterval(interval);
        return;
      }
    } else if (box === "turn-right") {
      handleRotateCarClockWise();
    } else if (box === "turn-left") {
      handleRotateCarAntiClockWise();
    }

    // Rest of your logic
    if (carHealthRef.current === 0) {
      alert("Robot Died");
      clearInterval(interval);
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
