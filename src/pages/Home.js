import React from "react";
import UserProductList from "../components/list/UserProductList";
import Typewritter from "typewriter-effect";
import BestSellersList from "../components/list/BestSellersList";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/category/SubList";
const Home = () => {
  return (
    <>
      <div
        className="jumbotron text-center"
        style={{
          fontSize: 40,
          color: "#D32F2F",
          height: "130px",
        }}
      >
        <Typewritter
          options={{
            strings: [
              "Yeni ürünler...",
              "En çok satanlar...",
              "Son gelen ürünler...",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div>
        <UserProductList />
      </div>
      <div>
        <BestSellersList />
      </div>
      <div>
        <CategoryList />
      </div>
      <div>
        <SubList />
      </div>
    </>
  );
};

export default Home;
