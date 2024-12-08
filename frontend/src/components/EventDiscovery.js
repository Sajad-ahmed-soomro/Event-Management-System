import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EventDiscovery.css"; // Import the styles

const EventDiscovery = () => {
  const [events, setEvents] = useState([]); // Make sure it's an empty array by default
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    keyword: "",
    location: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalEvents: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available events with pagination
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events", {
          params: { ...filters, page: pagination.page },
        });

        // Log the full response to understand its structure
        console.log(response.data);

        // Ensure the response contains 'events', 'totalPages', and 'totalEvents'
        setEvents(response.data || []); // Default to an empty array
        setPagination({
          ...pagination,
          totalPages: response.data.totalPages || 1,
          totalEvents: response.data.totalEvents || 0,
        });
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Set events to an empty array on error
      }
    };

    fetchEvents();
  }, [filters, pagination.page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleBookEvent = (eventId) => {
    navigate(`/book-event/${eventId}`);
  };

  return (
    <div className="event-discovery-container">
      <div className="event-discovery-content">
        <h1>Event Discovery</h1>
        <div className="event-discovery-filters">
          <input
            type="text"
            name="keyword"
            placeholder="Search by keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <h2>Available Events</h2>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <div className="event-list">
            <ul>
              {events.map((event) => (
                <li key={event._id}>
                  <span>{event.title}</span> - {event.category} - {event.date}
                  <button onClick={() => handleBookEvent(event._id)}>
                    Book Event
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDiscovery;
