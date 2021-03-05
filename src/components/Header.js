import React from "react";

export default function Header() {
  return (
    <div className="header-container">
      <div className="header">
        <h1> ठीकBaa </h1> <input type="text" name="search" />
        <label>
          Category
          <select name="category" value={category} onChange={handleChange}>
            <option value="Action and Adventure"> Action and adventure </option>
            <option value="Chick lit"> Chick lit </option>
            <option value="Business/economics"> Business / economics </option>
            <option value="Children's"> Children 's </option>
            <option value="Chick lit"> Chick lit </option>
            <option value="Cookbook"> Cookbook </option>
            <option value="Comic book"> Comic book </option>
            <option value="Diary"> Diary </option>
            <option value="Coming-of-age"> Coming - of -age </option>
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
      </div>
    </div>
  );
}
