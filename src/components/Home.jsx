import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [loadertopN, setloadetotN] = useState(false);

  const [mostRecent, setmostRecent] = useState([]);
  const [loaderMostR, setloadeMostR] = useState(false);

  const [pindata, setpindata] = useState([]);
  const [loaderpin, setloaderpin] = useState(false);

  const [currentPageRecent, setCurrentPageRecent] = useState(1);
  const [totalPagesRecent, setTotalPagesRecent] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDatatopNews();
    fetchDatamostRecent(currentPageRecent);
    fetchpine();
  }, [currentPageRecent]); //harkatek karygary xraya sar mama ba load betawa

  //.....fetch pin
  const fetchpine = async () => {
    try {
      setloadetotN(true);
      const response = await axios.get(
        "http://localhost:5210/api/Pine/getpinenews"
      );

      setpindata(response.data);
      setloaderpin(false);
    } catch (error) {
      console.log(error);
      setloaderpin(false);
    }
  };

  const fetchDatatopNews = async () => {
    try {
      setloadetotN(true);
      const response = await axios.get(
        "http://localhost:5210/api/News/MostReadThisWeek"
      );

      setTopNews(response.data);
      setloadetotN(false);
    } catch (error) {
      console.log(error);
      setloadetotN(false);
    }
  };

  const fetchDatamostRecent = async (page) => {
    try {
      setloadeMostR(true);
      const response = await axios.get(
        `http://localhost:5210/api/News/getMostRecentNews?pageNumber=${page}`
      );

      setmostRecent(response.data.items);
      setTotalPagesRecent(response.data.totalPages);
      setloadeMostR(false);
    } catch (error) {
      console.log(error);
      setloadeMostR(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
    increaseReader(id);
  };

  const increaseReader = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5210/api/News/IncrementReadCount/${id}`
      );
    } catch (error) {
      console.error("Error incrementing read count:", error);
    }
  };

  const handlePageChangeRecent = (page) => {
    setCurrentPageRecent(page);
  };

  const handleunpin = async (pin) => {
    try {
      const response = await axios.delete(
        `http://localhost:5210/api/Pine/${pin}`
      );
      fetchpine();
    } catch (error) {
      console.error("handle pin error", error);
    }
  };

  return (
    <div className="container text-center bg-primary text-white bg-opacity-75">
      <div className="mx-auto">pine news </div>
      <div className="container text-center">
        <div className="row">
          {pindata.map((news) => (
            <div className="col-md-4 mb-3" key={news.newsid}>
              <div
                className="card align-items-center news-card"
                style={{ outline: "none", border: "none" }}
              >
                <div class="btn-group" role="group" aria-label="Basic example">
                 
                  <button
                    type="button"
                    onClick={() => handleunpin(news.pinid)}
                     class="btn btn-primary"
                  >
                    unpine
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardClick(news.newsid)}
                    class="btn btn-primary"
                  >
                    show details
                  </button>
                </div>

                {/* ... */}
              
                <img
                  src={news.imageSrc}
                  className="card-img-top p-2"
                  alt="News"
                />
                <div className="card-body">
                  <h6 className="news-title">{`${news.title} Reader(${news.numberofRead})`}</h6>
                  <p className="news-description">{news.shortdescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div
          className="col-3 border border-black pt-1 smooth-scroll hidden-scrollbar"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <div className="card mb-2 bg-primary text-white bg-opacity-25">
            Top News
          </div>

          {loadertopN ? (
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              {topNews.map((news) => (
                <div
                  className="card align-items-center news-card "
                  key={news.id}
                  style={{ outline: "none", border: "none" }}
                  onClick={() => handleCardClick(news.id)}
                >
                  <img
                    src={news.imageSrc}
                    className="card-img-top p-1"
                    alt="News"
                  />
                  <div className="card-body">
                    <h6 className="news-title">{`${news.title} Reader(${news.numberofRead})`}</h6>
                    <p className="news-description">{news.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="col-9 border border-black pt-1"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <div className="card mb-2 bg-primary text-white bg-opacity-25">
            Most Recent News
          </div>

          <div className="row">
            {loaderMostR ? (
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              mostRecent.map((news) => (
                <div className="col-md-4 mb-3" key={news.id}>
                  <div
                    className="card align-items-center news-card"
                    style={{ outline: "none", border: "none" }}
                    onClick={() => handleCardClick(news.id)}
                  >
                    <img
                      src={news.imageSrc}
                      className="card-img-top p-2"
                      alt="News"
                    />
                    <div className="card-body">
                      <h6 className="news-title">{`${news.title} Reader(${news.numberofRead})`}</h6>
                      <p className="news-description">
                        {news.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* ..pegination */}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  className={`page-item ${
                    currentPageRecent === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      handlePageChangeRecent(currentPageRecent - 1)
                    }
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPagesRecent).keys()].map(
                  (
                    page //wak waya bleyt [...Array(totalPagesRecent).keys()] -> [1,2,3,4,5,6,7,8,9]
                  ) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPageRecent === page + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChangeRecent(page + 1)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPageRecent === totalPagesRecent ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      handlePageChangeRecent(currentPageRecent + 1)
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            {/* end pegination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
