import { Button, Form, Input, InputNumber, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getUserServ } from "../../Services/userServices";
import { postUserRegisterAction } from "../../Redux/Action/action";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "../../Hook/useWindowSize";
import { GET_USER_INFOR } from "../../Redux/Constant/constant";
import { localService } from "../../Services/localService";
const layout = {
  labelCol: {
    span: 6,
    offset: 0,
  },
  wrapperCol: {
    span: 18,
  },
};

const validateMessages = {
  required: "Bắt buộc nhập ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} không hợp lệ!",
  },
};
/* eslint-enable no-template-curly-in-string */

const UpdateUserInfor = ({
  userInfor,
  setUserInforChange,
  setModalVisible,
}) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let newValues = {
      ...values,
      maNhom: userInfor.maNhom,
      maLoaiNguoiDung: userInfor.maLoaiNguoiDung,
      soDT: values.soDt,
    };

    getUserServ
      .postUserInfor(newValues)
      .then((res) => {
        dispatch({
          type: GET_USER_INFOR,
          payload: newValues,
        });
        message.success("Thay đổi thành công");

        setUserInforChange((prev) => prev + 1);
        setModalVisible(false);
        let localUserInfor = localService.getUserInfor();
        localService.saveToStorage({
          ...newValues,
          accessToken: localUserInfor.accessToken,
        });
      })
      .catch((err) => {
        message.success("Thay đổi thất bại");
        console.log(err);
      });
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      className="w-5/6 mx-auto max-h-max xl:h-128 flex flex-col justify-center"
      initialValues={{
        hoTen: userInfor.hoTen,
        taiKhoan: userInfor.taiKhoan,
        email: userInfor.email,
        soDt: userInfor.soDT,
        matKhau: userInfor.matKhau,
      }}
    >
      <p className=" text-3xl text-center font-bold mt-12 h-16">
        Thông tin cá nhân
      </p>
      <Form.Item
        name={["hoTen"]}
        label="Họ tên"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["taiKhoan"]}
        label="Tên đăng nhập"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["email"]}
        label="Email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name={["soDt"]}
        label="Số điện thoại"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name={["matKhau"]}
        label="Mật khẩu"
        rules={[{ required: true }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <div className="text-center mb-12">
        <button className="py-1 px-4 bg-blue-700 md:text-lg rounded-md text-white">
          Cập nhật
        </button>
      </div>
    </Form>
  );
};

export default UpdateUserInfor;

// "taiKhoan": "abc123",
//       "hoTen": "Hoang Minh",
//       "email": "khongco@gmail.com",
//       "soDT": "090909090933",
//       "matKhau": "123456",
//       "maLoaiNguoiDung": "KhachHang"

//   {
//   "taiKhoan": "qwertty",
//   "hoTen": "qwer ty",
//   "email": "qwe@email.com",
//   "soDT": "128389",
//   "matKhau": "123456",
//   "maLoaiNguoiDung": "QuanTri"
// },
