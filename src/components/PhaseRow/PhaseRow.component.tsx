import { Phase, Media as MediaType } from '../../types';
import { Media } from '../Media/Media.component';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './PhaseRow.component.scss';
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../Carousel/styles.scss";
import { LeftArrow, RightArrow } from "../Carousel/arrows";

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
            {media.map((media: MediaType, idx: number) => {
              return (
                <div key={idx} className="phase-result">
                  <Media media={media} key={idx} />
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