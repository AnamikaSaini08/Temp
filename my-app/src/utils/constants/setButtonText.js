import leftArrow from '../images/leftArrow.png'
import rightArrow from '../images/rightArrow.png'
import upArrow from '../images/upArrow.png'
import downArrow from '../images/downArrow.png';


export const setButtonText = (buttonId)=>{
    let buttonText = '';
    switch (buttonId) {
      case 'left':
        return leftArrow;
       
      case 'right':
        return rightArrow;

      case 'top':
        return upArrow
       
      case 'bottom':
        return downArrow;
        
      case 'turn-left':
        return "https://img.icons8.com/?size=1x&id=124347&format=png"
        
      case 'turn-right':
        return "https://img.icons8.com/?size=1x&id=39780&format=png";
        
    }
    return buttonText;
}