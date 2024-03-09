import Image from "next/image";
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
        <p className="description">{item.description}</p>
        <div className="rating-buttons">
          {/* TODO: add upvote and downvote icons */}
          <button> Upvote </button>
          <button> Downvote </button>
        </div>
      </div>
    </div>
  );
}
