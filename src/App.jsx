import { useState } from "react";
import VideoPlayer from "./component/VideoPlayer";

const urls = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
];

function App() {
  const [urlIndex, setUrlIndex] = useState(0);

  const nextUrl = () => {
    if (urlIndex === urls.length - 1) {
      setUrlIndex(0);
    } else {
      setUrlIndex(urlIndex + 1);
    }
  };

  const previous = () => {
    if (urlIndex === 0) {
      setUrlIndex(urls.length - 1);
    } else {
      setUrlIndex(urlIndex - 1);
    }
  };

  const currentUrl = urls[urlIndex];

  return (
    <VideoPlayer
      url={currentUrl}
      key={currentUrl}
      onNext={nextUrl}
      onPrevious={previous}
    />
  );
}

export default App;
