import React from "react";
import SearchIcon from "../../assets/searchicon.png";
import SelectArrow from "../../assets/selectArrow.png";

const Filters = ({ eventFilters, setFiltersvalue }) => {
  return (
    <div className="row">
      <div className="col-6">
        <label className="fw-bold mb-1">Search</label>
        <div className="input-with-button">
          <input
            type="text"
            className="form-control"
            placeholder="Search Events"
            value={eventFilters.search}
            onChange={(e) =>
              setFiltersvalue({
                search: e.target.value,
              })
            }
          />
          <div className="btn btn-sm search-button">
            <img src={SearchIcon} alt="" className="search-icon" />
          </div>
        </div>
      </div>
      <div className="col-6">
        <label className="fw-bold mb-1">Past Events</label>
        <select
          className="form-select"
          value={eventFilters.pastEvents}
          onChange={(e) =>
            setFiltersvalue({
              pastEvents: e.target.value,
            })
          }
          style={{
            backgroundImage: `url(${SelectArrow})`,
          }}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
