import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const defaultImageSrc = "/img/aa.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    details: "",
    imageFile: null,
  });

  const [selectedNews, setSelectedNews] = useState(null);
  const [previewImage, setpreviewImage] = useState(defaultImageSrc);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]); //harkatek karygary xraya sar mama ba load betawa

  const fetchNews = async (page) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5210/api/News/getMostRecentNews?pageNumber=${page}`
      );
      setNews(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setFormData({ ...formData, imageFile: file });
      setpreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, imageFile: null });
      setpreviewImage(defaultImageSrc);
    }
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const form = new FormData();
    form.append("Title", formData.title);
    form.append("ShortDescription", formData.shortDescription);
    form.append("Details", formData.details);
    if (formData.imageFile) {
      form.append("ImageFile", formData.imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5210/api/News",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      fetchNews(currentPage);
      setFormData({
        title: "",
        shortDescription: "",
        details: "",
        imageFile: null,
      });
      setpreviewImage(defaultImageSrc);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setErrors({ message: "Unauthorized" });
        } else if (status === 400) {
          const errorMessages = Object.keys(data.errors)
            .map((key) => data.errors[key].join(", "))
            .join(", ");
          setErrors({ message: errorMessages });
        } else {
          console.log("Error status:", status);
        }
      } else {
        console.log("Network error or other:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(`http://localhost:5210/api/News/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchNews(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (news) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      shortDescription: news.shortDescription,
      details: news.details,
      imageFile: news.imageFile,
    });
    setpreviewImage(news.imageSrc || defaultImageSrc);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll smooth
    });
  };

  const handlepine = async (pin) => {
    try {
      const response = await axios.post(
        `http://localhost:5210/api/Pine/${pin}`
      );
    } catch (error) {
      console.error("handle pin error", error);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!selectedNews) return;

    const form = new FormData();
    form.append("Title", formData.title);
    form.append("ShortDescription", formData.shortDescription);
    form.append("Details", formData.details);
    if (formData.imageFile) {
      form.append("ImageFile", formData.imageFile);
    }
    try {
      await axios.put(
        `http://localhost:5210/api/News/${selectedNews.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchNews(currentPage);
      setpreviewImage(defaultImageSrc);
      setFormData({
        title: "",
        shortDescription: "",
        details: "",
        imageFile: null,
      });
      setSelectedNews(null);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setErrors({ message: "Unauthorized" });
        } else if (status === 400) {
          const errorMessages = Object.keys(data.errors)
            .map((key) => data.errors[key].join(", "))
            .join(", ");
          setErrors({ message: errorMessages });
        } else {
          console.log("Error status:", status);
        }
      } else {
        console.log("Network error or other:", error.message);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((page) => (
            <li
              className={`page-item ${
                currentPage === page + 1 ? "active" : ""
              }`}
              key={page}
              onClick={() => handlePageChange(page + 1)}
            >
              <span className="page-link">{page + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="row">
        {/* Form for adding/updating news */}
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title d-flex justify-content-center">
                News Form
              </h6>
              <form className="mb-4">
                {previewImage && (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
                {errors && (
                  <div className="text-danger">
                    <p>{errors.message}</p>
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title"
                    className="form-control mb-2"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Short Description"
                    className="form-control mb-2"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <textarea
                    placeholder="Details"
                    className="form-control"
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file mb-3"
                    id="imageFile"
                    name="imageFile"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={selectedNews ? handleUpdate : handleAdd}
                >
                  {selectedNews ? "Update News" : "Add News"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* News Cards */}
        <div className="col-md-9">
          <div className="row">
            {news.map((ne) => (
              <div className="col-md-12 mb-3" key={ne.id}>
                <div
                  className="card mb-3 mx-auto"
                  style={{ maxWidth: "540px" }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={ne.imageSrc || defaultImageSrc}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{ne.title}</h5>
                        <p className="card-text">{ne.shortDescription}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {ne.details}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="btn-group btn-group-sm"
                    role="group"
                    aria-label="Small button group"
                    style={{ width: "50%" }}
                  >
                    <button
                      className="btn btn-danger custom-btn"
                      onClick={(e) => handleDelete(ne.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-primary custom-btn"
                      onClick={() => handleEdit(ne)}
                    >
                      Update
                    </button>
                    {/* .... */}
                    <button
                      className="btn btn-primary custom-btn"
                      onClick={() => handlepine(ne.id)}
                    >
                      pine
                    </button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
