import React, { Component } from "react";
import Trademark from "../Trademark";
import "./style.css";
import Carousel from "react-bootstrap/Carousel";
import ProductItem from "../Product/ProductItem.js";
import * as mobileApi from "../apis/mobile";

export default class index extends Component {
  state = { hang: "", data: [] };

  renderList() {
    var result = null;
    result= this.state.data.map((value, key)=>{
      return (<ProductItem product={value} key={key}></ProductItem>);
    });

    return result;
  }

  async componentDidMount() {
    console.log(this.props.match);
    let hang = this.props.match!==undefined&& this.props.match.params.trademark;
    let data = null;
    await mobileApi
      .mobile()
      .then((success) => {
        data=success.data.value.$values ;
      })
      .catch((error) => {
        console.log(error);
      });
      this.setState({ data: data, hang: hang });
  }

  render() {
    return (
      <div className="container" id="mobile">
        <section>
          <div className="row carousel-container">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <Carousel  className="mobile-carousel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/11t-pro-595x100_1_.png"
                    alt="First slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/ip13-xx-595x100_9_.png"
                    alt="Second slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/zs-595-100-max.png"
                    alt="Third slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <Carousel className="mobile-carousel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/oppo-595-100-max_1_a-a.png"
                    alt="First slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/sw-595-100-max.png"
                    alt="Second slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn.cellphones.com.vn/media/resized//ltsoft/promotioncategory/apple-2021-590-100-max.png"
                    alt="Third slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>

          {this.state.sapxep}
          <div className="row">
            <div className="mt-3">
              <Trademark type={"mobile"} hang = {this.state.hang}></Trademark>
            </div>
          </div>
          <div className="row">
            <div>
              <a   className="recommend-item">Điện thoại phổ thông</a>
              <a  className="recommend-item">Mới ra mắt</a>
            </div>
          </div>

          <div className="row">
            <div className="block-filter">
              {/* <div className="">
                <p className="box-title">Chọn theo tiêu chí</p>
              </div>
              <div className="list-filter">
                <div className="cps-select item-filter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                  >
                    <path
                      id="filter"
                      d="M7.5,0C3.358,0,0,1.05,0,2.344V3.75L5.625,9.375v4.688c0,.518.84.938,1.875.938s1.875-.42,1.875-.937V9.375L15,3.75V2.344C15,1.05,11.642,0,7.5,0ZM1.383,2.033a6.355,6.355,0,0,1,1.425-.549A18.5,18.5,0,0,1,7.5.937a18.478,18.478,0,0,1,4.693.547,6.4,6.4,0,0,1,1.425.549,1.61,1.61,0,0,1,.414.31,1.641,1.641,0,0,1-.414.31,6.364,6.364,0,0,1-1.425.549A18.5,18.5,0,0,1,7.5,3.75,18.478,18.478,0,0,1,2.808,3.2a6.41,6.41,0,0,1-1.425-.549,1.621,1.621,0,0,1-.414-.31,1.641,1.641,0,0,1,.414-.31Z"
                      fill="#111827"
                    ></path>
                  </svg>
                  Bộ lọc
                </div>
              </div> */}

              <div className="">
                <p className="box-title">Sắp xếp theo</p>
              </div>
              <div className="list-filter">
                <div className="cps-select item-filter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-sort-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                  </svg>
                  Giá cao
                </div>

                <div className="cps-select item-filter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-sort-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                  </svg>
                  Giá thấp
                </div>

                <div className="cps-select item-filter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  Xem nhiều
                </div>
              </div>
            </div>
          </div>
          {/* list-item */}

          <div id="highlight" className="highlight section-bg">
            <div className="container list-item " data-aos="fade-up">
              <div className="row row-item">{this.renderList()}</div>
              {/* <ul>
              {this.renderList()}
              </ul> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}