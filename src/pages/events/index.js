import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import HeadingCardImg from "../../assets/Group_3840.png";
import EventsText from "../../assets/Group_3324.png";
import Filters from "../../components/filters";
import EventCard from "../../components/eventCard";
import Axios from "axios";
import "../../style/events.scss";
// import Loader from "../../components/loader";

const Events = () => {
  const [eventFilters, setEventFilters] = useState({
    search: "",
    pastEvents: true,
  });
  const [pageDetails, setPageDetails] = useState({
    pageSize: 12,
    offset: 0,
  });
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalEvent, setTotalEvent] = useState(0);

  useEffect(() => {
    getEventData();
  }, [eventFilters, pageDetails]);

  const getEventData = () => {
    setLoading(true);
    Axios.get(
      "https://iitm1blt3l.execute-api.ap-southeast-1.amazonaws.com/dev/hosted-events",
      {
        params: {
          limit: pageDetails.pageSize,
          offset: pageDetails.offset,
          search_query: eventFilters.search,
          past_events: eventFilters.pastEvents,
        },
      }
    )
      .then((res) => {
        if (
          res.data.count === eventData.length + res.data.events.length ||
          res.data.count === res.data.events.length
        ) {
          document
            .querySelector(".load-more-container")
            .classList.add("d-none");
          document
            .querySelector(".load-more-container")
            .classList.remove("d-block");
        } else {
          document
            .querySelector(".load-more-container")
            .classList.remove("d-none");
          document
            .querySelector(".load-more-container")
            .classList.add("d-block");
        }
        if (pageDetails.offset !== 0) {
          setEventData([...eventData, ...res.data.events]);
        } else {
          setEventData(res.data.events);
        }
        setTotalEvent(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadMoreEvents = () => {
    if (totalEvent > eventData.length) {
      setPageDetails({
        ...pageDetails,
        offset: eventData.length,
      });
    }
  };

  const setFiltersvalue = (params) => {
    setEventFilters({
      ...eventFilters,
      ...params,
    });
    setPageDetails({
      ...pageDetails,
      offset: 0,
    });
  };

  return (
    <>
      <div className="container py-3 event-container">
        <div className="row">
          <div className="col-12">
            <img src={Logo} alt="" height="100%" />
          </div>
          <div className="col-12 mt-3">
            <div className="card border-radius-50 heading-card d-block">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-7 col-md-9">
                    <img src={EventsText} alt="" className="events-text" />
                    <p className="font-size-18 font-weight-400 line-height-24 ml-10 heading-card-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                      aliquam, purus sit amet luctus venenatis, lectus magna
                      fringilla urna, porttitor rhoncus dolor purus non enim
                      praesent elementum facilisis leo, vel fringilla est
                      ullamcorper eget nulla facilisi etiam dignissim diam quis
                      enim lobortis scelerisque fermentum dui faucibus in ornare
                      quam viverra
                    </p>
                  </div>
                  <div className="col-12 col-sm-5 col-md-3 event-right-img-container">
                    <img
                      src={HeadingCardImg}
                      alt=""
                      className="event-right-img"
                    />
                  </div>
                </div>
              </div>
              <div className="card filter-card border-radius-15">
                <div className="card-body">
                  <Filters
                    eventFilters={eventFilters}
                    setFiltersvalue={setFiltersvalue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-items-container row mt-15">
          <div className="col-12">
            <p className="fw-bold font-size-30">
              {eventData && totalEvent > 1000
                ? "1000+"
                : totalEvent > 500
                ? "500+"
                : totalEvent > 250
                ? "250+"
                : totalEvent}{" "}
              Events
            </p>
          </div>

          <div className="col-12">
            <div className="row">
              {eventData &&
                eventData.map((eachEvent, index) => {
                  return <EventCard key={index} data={eachEvent} />;
                })}
            </div>
          </div>
          <div className="col-12 load-more-container mt-5 mb-5">
            <div className="divider" />
            <div className="load-more-button-container pl-3 pr-3">
              <button
                type="button"
                disabled={loading}
                className="btn btn-outline-secondary load-more-button border-radius-35 font-size-18"
                onClick={() => loadMoreEvents()}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
