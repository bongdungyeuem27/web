import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as productdetailApi from "../../apis/productdetail";
import * as myToast from "../../../Common/helper/toastHelper";
import * as imageApi from "../../apis/image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function EditModal(props) {
  const [imei, setImei] = useState(props.productdetail.imei);
  const [masanpham, setMasanpham] = useState(props.productdetail.masanpham);
  const [ngaysanxuat, setNgaysanxuat] = useState(new Date(props.productdetail.ngaysanxuat));
  const [tinhtrang, setTinhtrang] = useState(props.productdetail.tinhtrang);
  const [mausac, setMausac] = useState(props.productdetail.mausac);
  const [dungluong, setDungluong] = useState(props.productdetail.dungluong);
  const [giamoi, setGiamoi] = useState(props.productdetail.giamoi);
  const [image, setImage] = useState(undefined);
  const [danhsachmausac, setDanhsachmausac] = useState([]);
  const [danhsachdungluong, setDanhsachdungluong] = useState([]);
  const [mausackhac, setMausackhac] = useState("");
  const [dungluongkhac, setDungluongkhac] = useState("");
  const [progress, setProgress] = useState(0);

  const loadMausac = (masanpham) => {
    if (masanpham === "") return;
    productdetailApi
      .timMausacBangMasanpham(masanpham)
      .then((success) => {
        if (success.status === 200) {
          setDanhsachmausac(success.data.value.$values);
          console.log(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loadDungluong = (masanpham) => {
    if (masanpham === "") return;
    productdetailApi
      .timDungluongBangMasanpham(masanpham)
      .then((success) => {
        if (success.status === 200) {
          setDanhsachdungluong(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API
  });
  function submitHandler() {
    const fd = new FormData();
    fd.append("imei", imei);
    fd.append("masanpham", masanpham);
    fd.append("ngaysanxuat", new Date(ngaysanxuat).toISOString().split("T")[0]);
    fd.append("tinhtrang", tinhtrang);
    fd.append("mausac", mausac==="Khác"?mausackhac:mausac);
    fd.append("dungluong", dungluong==="Khác"?dungluongkhac:dungluong);
    fd.append("giamoi", giamoi);
    fd.append("image", image);

    productdetailApi
      .editProductdetail(fd, runProgress)
      .then((success) => {
        props.addFunction(success.data.value);
        props.closeModal();
      })
      .catch((error) => {
        myToast.toastError("Sửa thất bại");
        console.error(error);
      });
  }

  const runProgress = (percent) => {
    if (percent === 100) {
      myToast.toastSucces("Sửa thành công");
      props.closeModal();
    }
    setProgress(percent);
  };

  return (
    <Modal
    isOpen={props.showModal}
    onRequestClose={props.closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div class="add-item-modal chitietsanpham-modal" role="document">
      <div class="">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Thêm mới chi tiết sản phẩm
          </h5>
        </div>

        <div className="form-main-add-edit">
          <div className="row mb-3">
            <span className="text-secondary text-xs font-weight-bold">
              <img
                alt=""
                style={{ width: "80px", height: "80px" }}
                src={
                  image === undefined
                    ? imageApi.image(
                        props.productdetail.image
                      )
                    : URL.createObjectURL(image)
                }
              ></img>
            </span>
          </div>
          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Image</div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <input
                className="form-control border"
                id="image"
                type="file"
                placeholder=""
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Imei</div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <input
                className="form-control border "
                id="imei"
                placeholder=""
                onChange={(e) => setImei(e.target.value)}
                value={imei}
              ></input>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Mã sản phẩm
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <input
                className="form-control border"
                type="masanpham"
                placeholder=""
                onChange={(e) => {
                  (async()=>{
                     setMasanpham(e.target.value);
                     loadDungluong(e.target.value);
                     loadMausac(e.target.value);
                  })()
                }}
                value={masanpham}
              ></input>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Ngày sản xuất
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <input
                className="form-control border"
                type="date"
                id="ngaysanxuat"
                name="trip-start"
                onChange={(e) => setNgaysanxuat(new Date(e.target.value))}
                value={ngaysanxuat.toISOString().split("T")[0]}
              ></input>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Tình trạng
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <select
                className="form-control border"
                id="tinhtrang"
                name="tinhtrang"
                placeholder=""
                onChange={(e) => {
                  setTinhtrang(e.target.value);
                }}
                value={tinhtrang}
              >
                <option value="Sẵn có">Sẵn có</option>
                <option value="Đã bán">Đã bán</option>
                <option value="Bảo hành">Bảo hành</option>
              </select>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Màu sắc</div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <select
                className="form-control border"
                id="mausac"
                name="mausac"
                placeholder=""
                onChange={(e) => {
                  setMausac(e.target.value);
                }}
                value={mausac}
              >
                {danhsachmausac.map((value) => {
                  return <option value={value.mausac}>{value.mausac}</option>;
                })}
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {mausac === "Khác" && (
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="mausackhac"
                  onChange={(e) => setMausackhac(e.target.value)}
                  value={mausackhac}
                ></input>
              </div>
            </div>
          )}
          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Dung lượng
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <select
                className="form-control border"
                id="dungluong"
                name="dungluong"
                placeholder=""
                onChange={(e) => {
                  setDungluong(e.target.value);
                }}
                value={dungluong}
              >
                {danhsachdungluong.map((value) => {
                  return (
                    <option value={value.dungluong}>{value.dungluong}</option>
                  );
                })}
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {dungluong === "Khác" && (
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="dungluongkhac"
                  onChange={(e) => setDungluongkhac(e.target.value)}
                  value={dungluongkhac}
                ></input>
              </div>
            </div>
          )}
          <div className="row mb-1">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Giá mới</div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
              <input
                className="form-control border"
                id="giamoi"
                placeholder=""
                onChange={(e) => setGiamoi(e.target.value)}
                value={giamoi}
              ></input>
            </div>
          </div>
        </div>

        <hr></hr>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: progress + "%" }}
          ></div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            onClick={props.closeModal}
          >
            Đóng
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={submitHandler}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  </Modal>
  );
}
