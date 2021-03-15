import React, { Component } from "react";
import Header from "../components/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import Button from "../components/button";
import axios from "axios";
import { API_URL, currencyFormatter } from "../helper";
import { Link } from "react-router-dom";
class Home extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/products?_limit=4&_expand=category`)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderProducts = () => {
    return this.state.data.map((val, index) => {
      return (
        <div key={index} className="col-md-3 p-2">
          <Card>
            <CardImg
              top
              width="100%"
              src={val.img}
              alt="Card image cap"
              height="200vh"
            />
            <CardBody>
              <CardTitle tag="h5">{val.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {currencyFormatter(val.price)}
              </CardSubtitle>
              <Link
                to={{ pathname: `/product/${val.id}`, state: { product: val } }}
              >
                <Button className="w-100 py-2">Details</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "100px",
      slidesToShow: 1,
      speed: 500,
      dots: true,
    };
    return (
      <div>
        <Header />
        <div className="container mt-5">
          <Slider {...settings} autoplay>
            <div>
              <div className="px-2">
                <img
                  src="https://images.unsplash.com/photo-1596568359553-a56de6970068?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1028&q=80"
                  alt="iklan1"
                  width="100%"
                  height="400px"
                />
              </div>
            </div>
            <div>
              <div className="px-2">
                <img
                  src="https://alfiaayu.files.wordpress.com/2014/11/4784-kobe_vii_tech_shoes.png?w=737"
                  alt="iklan1"
                  width="100%"
                  height="400px"
                />
              </div>
            </div>
            <div>
              <div className="px-2">
                <img
                  src="https://ahiedromdhony.files.wordpress.com/2018/05/nike_air_max_2013.jpg?w=840"
                  alt="iklan1"
                  width="100%"
                  height="400px"
                />
              </div>
            </div>
          </Slider>
        </div>
        <div>
          <section className="mt-5 py-5 ml-5">
        <h1 >Trending</h1>
        </section>
        </div>
        <section>
        <div className="d-flex w-100 px-5">
          <div className="col-6 justify-content-flex-end">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" width="115%" />
          </div>
          <div className="col-6 ">
            <img src="https://ahiedromdhony.files.wordpress.com/2018/05/nike_air_max_2013.jpg?w=840" width="99%"  />
          </div>
        </div>
        </section>

        
        <section className="container mt-5 mb-5">
          <div className="d-flex justify-content-end">
            <Link to="/products">
              <Button className="px-2 py-2 ">View All Products</Button>
            </Link>
          </div>
          <div className="row">{this.renderProducts()}</div>
        </section>
      </div>
    );
  }
}

export default Home;
