export const nextSlide = (currentSlide , slideLength) => {
    return ((currentSlide + 1) % slideLength);
  };

export const previousSlide = (currentSlide , slideLength) => {
    return ((currentSlide - 1 + slideLength) % slideLength);
  };