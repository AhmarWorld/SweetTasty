'use client'

import React, { useState, useEffect } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Carousel.css"

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false);
  const [carouselInterval, setCarouselInterval] = useState(null);
  const [dotClicked, setDotClicked] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    drag: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef?.current.next()
    }, 3000);

    setCarouselInterval(interval);

    return () => {
      clearInterval(interval);
      setCarouselInterval(null);
    }
  }, [instanceRef, dotClicked]);

  return (
    <div className="carousel">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div
            className="keen-slider__slide number-slide1"
            style={{
              backgroundImage: `url(/slide-1.png)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="keen-slider__slide number-slide2"
            style={{
              backgroundImage: `url(/slide-2.png)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="keen-slider__slide number-slide3"
            style={{
              backgroundImage: `url(/slide-3.png)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="keen-slider__slide number-slide4"
            style={{
              backgroundImage: `url(/slide-4.png)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                  clearInterval(Number(carouselInterval));
                  setTimeout(() => {
                    setDotClicked(prev => !prev);
                  }, 10000);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
    </div>
  )
}
