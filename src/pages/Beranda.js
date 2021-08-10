import GambarSlide from "../components/GambarSlide";
import YoutubeSlide from "../components/YoutubeSlide";
import MapsFrame from "../components/MapsFrame";

function Beranda() {
  return (
    <div>
      <div className="mx-5 my-3">
        <GambarSlide />
      </div>
      <div className="mx-5 my-3 bg-dark text-white text-center">
        <div className="p-3">
          <h2>Youtube Slide</h2>
          <span>Ini adalah youtube slide</span>
        </div>
        <YoutubeSlide />
        <br />
      </div>
      <MapsFrame />
    </div>
  );
}

export default Beranda;
