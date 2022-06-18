import React from "react";
import EventBackground from "../../assets/eventBackground.png";
import Place from "../../assets/place.svg";
import Mode from "../../assets/mode.svg";
import TextTruncate from "react-text-truncate";
import "../../style/events.scss";

const EventCard = (props) => {
  const { data } = props;
  return (
    <div className="col-12 col-sm-6 col-md-3 mt-2">
      <div className="card each-event-card">
        <img
          src={EventBackground}
          width="100%"
          alt=""
          className="each-event-background"
        />
        <div className="each-event-details mt-3 mb-2 mr-2 ml-2">
            <TextTruncate
              line={2}
              element="p"
              truncateText="…"
              text={data?.name}
              className="fw-bold font-size-16 event-name"
            />
          <div className="place-mode-container font-size-11 d-flex align-items-center justify-content-between flex-wrap">
            <div className="place">
              <img src={Place} alt="" className="place-pic" />
              <span className="ml-2">Raddison Blue</span>
            </div>
            <div className="mode">
              <img src={Mode} alt="" className="mode-pic" />
              <span className="ml-2">
                {data?.is_free ? "Free" : "Paid"} |{" "}
                {data?.is_virtual ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
