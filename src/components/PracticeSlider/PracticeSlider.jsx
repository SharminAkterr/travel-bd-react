import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
// import "./styles.css"
import Rectangle1 from "../../assets/Rectangle 1.png"
import Rectangle2 from "../../assets/Rectangle 26.png"
import Rectangle3 from "../../assets/Rectangle 27.png"
import Rectangle4 from "../../assets/Rectangle 28.png"


function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

const PracticeSlider = () => {

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <div className="h-[90vh] w-screen overflow-hidden">
            <div ref={sliderRef} className="keen-slider ">
                <div className="keen-slider__slide number-slide1 "><img className="h-[90vh] w-full" src={Rectangle1} alt="" /></div>
                <div className="keen-slider__slide number-slide2"><img className="h-[90vh] w-full" src={Rectangle2} alt="" /></div>
                <div className="keen-slider__slide number-slide3"><img className="h-[90vh] w-full" src={Rectangle3} alt="" /></div>
                <div className="keen-slider__slide number-slide4"><img className="h-[90vh] w-full" src={Rectangle4} alt="" /></div>
                <div className="keen-slider__slide number-slide1 "><img className="h-[90vh] w-full" src={Rectangle1} alt="" /></div>
                <div className="keen-slider__slide number-slide2"><img className="h-[90vh] w-full" src={Rectangle2} alt="" /></div>
                <div className="keen-slider__slide number-slide3"><img className="h-[90vh] w-full" src={Rectangle3} alt="" /></div>
                <div className="keen-slider__slide number-slide4"><img className="h-[90vh] w-full" src={Rectangle4} alt="" /></div>
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail transform -translate-y-[80%] translate-x-[50%]">
                <div className="keen-slider__slide number-slide1"><img src={Rectangle1} alt="" /></div>
                <div className="keen-slider__slide number-slide2"><img src={Rectangle2} alt="" /></div>
                <div className="keen-slider__slide number-slide3"><img src={Rectangle3} alt="" /></div>
                <div className="keen-slider__slide number-slide4"><img src={Rectangle4} alt="" /></div>
                <div className="keen-slider__slide number-slide1"><img src={Rectangle1} alt="" /></div>
                <div className="keen-slider__slide number-slide2"><img src={Rectangle2} alt="" /></div>
                <div className="keen-slider__slide number-slide3"><img src={Rectangle3} alt="" /></div>
                <div className="keen-slider__slide number-slide4"><img src={Rectangle4} alt="" /></div>
            </div>
        </div>
    );
};

export default PracticeSlider;