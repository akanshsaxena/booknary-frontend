import React, { useState, useEffect } from "react";
import jwt, { decode } from "jsonwebtoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("Action and Adventure");
  const [language, setLanguage] = useState("Hindi");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [pdf, setPDF] = useState("");
  const [thumbnailImgLink, setThumbnailImgLink] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [decoded, setDecoded] = useState({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadedImage, setIsUploadedImage] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [isUploadedPdf, setIsUploadedPdf] = useState(false);
  const [uploadPer, setUploadPer] = useState(0);
  const [uploadSuccessful, setUploadSucessful] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "readTime") {
      setReadTime(event.target.value);
    } else if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "language") {
      setLanguage(event.target.value);
    }
  };

  const uploadFile = async (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0].type === "application/pdf") {
      setPDF(event.target.files[0]);
      console.log(pdf);
    } else {
      setThumbnailImg(event.target.files[0]);
      console.log(thumbnailImg);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (e.target.name === "pdf") {
      let bucketName = "pdfs";
      let file = pdf;
      console.log(file);
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
      let uploadTask = storageRef.put(file);
      console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress < 100) {
            setIsUploadingPdf(true);
            setIsUploadedPdf(false);
            setUploadPer(progress);
          } else {
            setIsUploadingPdf(false);
            setIsUploadedPdf(true);
            setUploadPer(0);
          }
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert(`Upload failed due to ${error}`);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setPdfLink(downloadURL);
          });
        }
      );
    } else {
      let bucketName = "images";
      let file = thumbnailImg;
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress < 100) {
            setIsUploadingImage(true);
            setIsUploadedImage(false);
            setUploadPer(progress);
          } else {
            setIsUploadingImage(false);
            setIsUploadedImage(true);
            setUploadPer(0);
          }
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert(`Upload failed due to ${error}`);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setThumbnailImgLink(downloadURL);
          });
        }
      );
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");
    const decode = jwt.decode(token, {
      complete: true,
    });
    setDecoded(decode.payload);
    const response = await axios.post(
      "https://booknary-backend.herokuapp.com/api/books/upload",
      {
        authorId: decoded._id,
        title: title,
        description: description,
        readTime: readTime,
        category: category,
        language: language,
        author: decoded.name,
        thumbnailImg: thumbnailImgLink,
        pdfLink: pdfLink,
      }
    );
    const data = await response.data;
    if (data.message.includes("Success")) {
      setUploadSucessful(true);
    }
  };
  useEffect(() => {
    var config = {
      apiKey: "AIzaSyAeAI9H2e54dGWcEIl605L6RIL1jorcqaI",
      authDomain: "bookshelf-a09a5.firebaseapp.com",
      databaseURL: "https://bookshelf-a09a5.firebaseio.com",
      projectId: "bookshelf-a09a5",
      storageBucket: "bookshelf-a09a5.appspot.com",
      messagingSenderId: "863711295397",
      appId: "1:863711295397:web:d5e10ba963dfd250849a4c",
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    const token = localStorage.getItem("user");
    const decode = jwt.decode(token, {
      complete: true,
    });
    if (decode) {
      setDecoded(decode.payload);
    } else {
      history.push("/");
    }
  }, []);
  return (
    <>
      <div className="writePage">
        <h2> And here begins another journey... </h2>
        <div className="writeForm">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description
            <textarea
              value={description}
              name="description"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Read Time( in minutes)
            <input
              type="text"
              name="readTime"
              value={readTime}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Category
            <select name="category" value={category} onChange={handleChange}>
              <option value="Action and Adventure">Action and adventure</option>
              <option value="Chick lit"> Chick lit </option>
              <option value="Business/economics"> Business / economics </option>
              <option value="Children's"> Children's </option>
              <option value="Chick lit"> Chick lit </option>
              <option value="Cookbook"> Cookbook </option>
              <option value="Comic book"> Comic book </option>
              <option value="Diary"> Diary </option>
              <option value="Coming-of-age"> Coming-of-age </option>
              <option value="Crime"> Crime </option>
              <option value="Encyclopedia"> Encyclopedia </option>
              <option value="Drama"> Drama </option>
              <option value="Guide"> Guide </option>
              <option value="Fairytale"> Fairytale </option>
              <option value="Health/fitness"> Health / fitness </option>
              <option value="Fantasy"> Fantasy </option>
              <option value="History"> History </option>
              <option value="Humor"> Humor </option>
              <option value="Horror"> Horror </option>
              <option value="Mystery"> Mystery </option>
              <option value="Poetry"> Poetry </option>
              <option value="Romance"> Romance </option>
              <option value="Sports"> Sports </option>
              <option value="Others"> Others </option>
            </select>
          </label>
          <br />
          <label>
            Language
            <select
              type="text"
              name="language"
              value={language}
              onChange={handleChange}
            >
              <option value="Hindi"> Hindi </option>
              <option value="English"> English </option>
              <option value="Others"> Others </option>
            </select>
          </label>
          <br />
          <label htmlFor="uploadImage">
            Upload Thumbnail
            <input
              type="file"
              name="uploadImage"
              placeholder="Upload Thumbnail Image"
              onChange={uploadFile}
            />
            {isUploadingImage && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                }}
              >
                Uploading...{uploadPer.toFixed(0)} %
              </p>
            )}
            {isUploadedImage && (
              <p
                style={{
                  color: "green",
                  fontSize: "0.9rem",
                }}
              >
                Uploaded Sucessfully
              </p>
            )}
          </label>
          <button className="uploadBtn" name="image" onClick={handleClick}>
            Upload Image
          </button>
          <br />
          <label htmlFor="uploadPdf">
            Upload PDF
            <input
              type="file"
              name="uploadPdf"
              accept=".pdf"
              placeholder="Upload Thumbnail Image"
              onChange={uploadFile}
            />
            {isUploadingPdf && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                }}
              >
                Uploading...{uploadPer.toFixed(0)} %
              </p>
            )}
            {isUploadedPdf && (
              <p
                style={{
                  color: "green",
                  fontSize: "0.9rem",
                }}
              >
                Uploaded Sucessfully
              </p>
            )}
          </label>
          <button className="uploadBtn" name="pdf" onClick={handleClick}>
            Upload PDF
          </button>
        </div>
        <div className="lowest-div">
          <button className="finalUploadBtn" onClick={submit}>
            Create Story
          </button>
          {uploadSuccessful && (
            <h4
              id="successful-message"
              style={{
                color: "green",
                fontSize: "1.1rem",
              }}
            >
              Book Posted successfully
            </h4>
          )}
        </div>
      </div>
    </>
  );
}
