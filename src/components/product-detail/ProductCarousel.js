import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const ProductCarousel = ({ product }) => {
  return (
    <div>
      <Carousel>
        <div>
          <img src={product.image} />
        </div>
      </Carousel>
      <Tabs type="card">
        <TabPane style={{ height: 200 }} tab="Daha Fazla" key="1">
          {product.description && product.description}
        </TabPane>
        <TabPane style={{ height: 200 }} tab="İletişim" key="2">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductCarousel;
