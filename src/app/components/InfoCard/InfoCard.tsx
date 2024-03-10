import Image from "next/image";
import thumbsUp from "../../../assets/thumbsUp.svg";
import thumbsDown from "../../../assets/thumbsDown.svg";
import "./InfoCard.css";
export default function InfoCard({
  item,
  className,
}: {
  item: any;
  className: string;
}) {
  return (
    <div className={`info-card ${className}`}>
      <div className="info-card-text">
        <h1 className="num-caption">#1 Caption Generated</h1>
        <h1 className="title">{item.title}</h1>
        <div className="rating-buttons">
          {/* TODO: add upvote and downvote icons */}
          <button className="upvote-button">
            <Image src={thumbsUp} alt="Upvote" />
            <span>Upvote</span>
          </button>
          <button className="downvote-button">
            <Image src={thumbsDown} alt="Downvote" />
            <span>Downvote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
