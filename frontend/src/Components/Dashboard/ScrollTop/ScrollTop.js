import React, { useEffect, useState } from 'react'
import "./../ScrollTop/ScrollTopStyle.css"
function ScrollTop() {

    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the scroll-to-top button when the user has scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
    <span>&uarr;</span>
  </div>
  )
}

export default ScrollTop
