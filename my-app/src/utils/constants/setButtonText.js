export const setButtonText = (buttonId)=>{
    let buttonText = '';
    switch (buttonId) {
      case 'left':
        return "https://img.icons8.com/?size=1x&id=39944&format=png";
       
      case 'right':
        return "https://img.icons8.com/?size=1x&id=39969&format=png";

      case 'top':
        return "https://img.icons8.com/?size=1x&id=39966&format=png"
       
      case 'bottom':
        return "https://img.icons8.com/?size=1x&id=41189&format=png";
        
      case 'turn-left':
        return "https://img.icons8.com/?size=1x&id=124347&format=png"
        
      case 'turn-right':
        return "https://img.icons8.com/?size=1x&id=39780&format=png";
        
    }
    return buttonText;
}