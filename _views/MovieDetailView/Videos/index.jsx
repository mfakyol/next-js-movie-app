import Slider from "_components/Slider";
import classes from "./style.module.scss";

function Videos({ videos }) {
  return (
    <div>
      <Slider title="Videos">
        {videos.map((video) => (
          <iframe
            key={video.id}
            width="320"
            height="180"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </Slider>
    </div>
  );
}

export default Videos;
