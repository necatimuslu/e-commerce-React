import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory } from "../../services/categoryService";

const CategoryList = ({ fetchAllCategory, categories }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [count, setCount] = useState(1);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="row">
        <div className="col-md-10 offset-sm-1 col-sm-12">
          <form>
            <div className="form-group">
              <input
                type="search"
                placeholder="Aramak istediğiniz metini giriniz"
                className="form-control"
                value={keyword}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kategori adı</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {categories
          .filter((x) => x.name.toLowerCase().includes(keyword))
          .map((category) => {
            return (
              <tbody key={category._id}>
                <tr>
                  <th scope="row">{count}</th>
                  <td style={{ fontSize: 22 }}>{category.name}</td>
                  <td>
                    <button
                      onClick={async () => {
                        await deleteCategory(user.token, category._id);
                        toast.error("kategori silindi");
                        fetchAllCategory();
                      }}
                      className="btn btn-outline-danger btn-block"
                    >
                      <AiFillDelete style={{ fontSize: 23 }} />
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/admin/category-update/${category._id}`}>
                      <button className="btn btn-outline-success btn-block">
                        <MdOutlineSystemUpdateAlt style={{ fontSize: 23 }} />
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </>
  );
};

export default CategoryList;
