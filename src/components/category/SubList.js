import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../services/subService";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubs();
    return () => {
      setSubs([]);
    };
  }, []);

  const fetchSubs = () => {
    setLoading(true);
    getSubs().then((res) => {
      setLoading(false);
      setSubs(res.data);
    });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <h4 className="text-danger text-center">Yükleniyor...</h4>
        ) : (
          <h4 className="text-center mt-2  ">Alt Kategori Listesi</h4>
        )}
        <div className="row d-flex justify-content-around ">
          {subs &&
            subs.map((s) => (
              <div
                key={s._id}
                className="col-md-3 btn btn-outline-success btn-lg btn-raised btn-block p-2 mx-1 my-2 mb-3 "
                style={{ height: "40px", fontSize: "15px" }}
              >
                <Link style={{ color: "#3D5AFE" }} to={`/sub-detail/${s._id}`}>
                  {" "}
                  {s.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SubList;
