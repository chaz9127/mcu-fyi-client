import { Media as MediaType } from '../../types';
import { Media } from '../Media/Media.component';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './MediaRow.component.scss';
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../Carousel/styles.scss";
import { LeftArrow, RightArrow } from "../Carousel/arrows";

type MediaRowProps = {
  mediaList: MediaType[],
  title?: String,
}

export const MediaRow = (props: MediaRowProps) => {
  const { mediaList, title: title='' } = props;
  const displayMedia = () => {
    return (
      <div className="media-container">
        <h2 className="media-title">{title}</h2>
        <div className="media-results-container">
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {mediaList.map((media: MediaType, idx: number) => {
              return (
                <div key={idx} className="media-result">
                  <Media media={media} key={idx} />
                </div>
                  
              )
            })}
          </ScrollMenu>
        </div>
      </div>
    )
  }

  return displayMedia()
}