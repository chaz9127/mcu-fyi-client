import { Phase, Media } from '../../types';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './PhaseRow.component.scss';
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../Carousel/styles.scss";
import { LeftArrow, RightArrow } from "../Carousel/arrows";
import { Link } from "react-router-dom";

type PhaseRowProps = {
  phase: Phase
}

export const PhaseRow = (props: PhaseRowProps) => {
  const { name,  media } = props.phase;
  const displayPhase = () => {
    return (
      <div className="phase-container">
        <h2 className="phase-title">{name}</h2>
        <div className="phase-results-container">
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {media.map((media: Media) => {
              return (
                <div className="phase-result">
                  <Link to={`/media/${media.name}`}>
                    <img alt={`${media.name} poster`} className="phase-result-poster" src={media.poster} />
                    <span className="phase-result-title" >{media.name}</span>
                  </Link>
                </div>
              )
            })}
          </ScrollMenu>
        </div>
      </div>
    )
  }

  return displayPhase()
}