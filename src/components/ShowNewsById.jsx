import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function ShowNews() {
  const { id } = useParams();
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    fetchNewsDetails();
  }, [id]);
  
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5210/api/News/${id}`
        );
        setNewsDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!newsDetails) {
    return <div>No details found for this news.</div>;
  }

  return (
    <div className="container mt-5" >

      {/* ... */}

      <div className="card mb-3">
        <img src={newsDetails.imageSrc} className="card-img-top" alt="..."  style={{height:"200px",width:"200px"}}/>
        <div className="card-body">
          <h5 className="card-title">{newsDetails.title}</h5>
          <p className="card-text">{newsDetails.details}</p>
          <p className="card-text">
            <small class="text-body-secondary">
            
              <p>{`Read count: ${newsDetails.numberofRead}`}</p>
              <p>{`Published on: ${newsDetails.createAt}`}</p>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowNews;
