import Slider from '_components/Slider'
import classes from './style.module.scss'

function Posters({posters}) {
  return (
    <Slider title="Posters">
    {  posters.map(poster => <img className={classes.poster} key={poster.file_path} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster.file_path}`} alt=""  loading='lazy'/> )}
    </Slider>
  )
}

export default Posters