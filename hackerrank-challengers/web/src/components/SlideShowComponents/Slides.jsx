import { useState } from "react";

const Slides = ({ slides }) => {
  const [slidePosition, setSlidePosition] = useState(0);

  const handleNext = () => {
    if (slidePosition < slides.length - 1) {
      setSlidePosition(slidePosition + 1);
    }
  }

  const handlePrev = () => {
    if (slidePosition > 0) {
      setSlidePosition(slidePosition - 1);
    }
  }

  const handleRestart = () => {
    setSlidePosition(0);
  }

  return (
    <div>
        <div id="navigation" className="text-center space-x-4">
            <button
                data-testid="button-restart"
                className="px-4 py-2 text-sm border border-gray-500 text-gray-500 rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={slidePosition === 0}
                onClick={handleRestart}
            >
            Restart
            </button>
            <button
                data-testid="button-prev"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={slidePosition === 0}
                onClick={handlePrev}
            >
            Prev
            </button>
            <button
                data-testid="button-next"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={slidePosition === slides.length - 1}
                onClick={handleNext}
            >
            Next
            </button>
        </div>
        <div
            id="slide"
            className="card text-center bg-white shadow-md rounded-lg p-6 mt-4"
        >
            <h1
            data-testid="title"
            className="text-2xl font-semibold text-gray-800"
            >
                {slides[slidePosition].title}
            </h1>
            <p
            data-testid="text"
            className="mt-4 text-gray-600 text-base"
            >
                {slides[slidePosition].text}
            </p>
        </div>
    </div>
  );
}

export default Slides;