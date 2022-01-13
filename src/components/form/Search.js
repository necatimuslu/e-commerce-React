import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { BsSearch } from "react-icons/bs";
import { SEARCH_QUERY } from "../../constants/searchConstants";
const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };
  return (
    <form className="form-inline my-3 my-lg-0" onSubmit={handleSubmit}>
      <input
        style={{ border: "none", borderBottom: "1px solid #ccc" }}
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2 search-input"
        placeholder="Arama..."
      />
      <BsSearch onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
