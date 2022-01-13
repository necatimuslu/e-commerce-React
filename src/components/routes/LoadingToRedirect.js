import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <p>
        Sayfaya{" "}
        <span style={{ fontSize: 40, marginLeft: 5, marginRight: 5 }}>
          {count}
        </span>{" "}
        saniye sonra yönlendiriliyorsunuz...
      </p>
    </div>
  );
};

export default LoadingToRedirect;
