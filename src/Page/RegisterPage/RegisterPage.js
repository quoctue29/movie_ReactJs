import { Button, Form, Input, InputNumber, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getUserServ } from "../../Services/userServices";
import { postUserRegisterAction } from "../../Redux/Action/action";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "../../Hook/useWindowSize";
const layout = {
  labelCol: {
    span: 8,
    offset: 0,
  },
  wrapperCol: {
    span: 16,
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

const RegisterPage = () => {
  const history = useHistory();
  let windowSize = useWindowSize();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let newValue = { ...values.user, maNhom: "GP03" };
    let onSuccess = () => {
      message.success("Đăng ký thành công");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    };

    dispatch(postUserRegisterAction(newValue, onSuccess));
  };
  const renderForm = () => {};
  return (
    <div
      className="flex items-center justify-center max-h-max w-full m-auto"
      style={{
        backgroundImage: `url(https://www.pixelstalk.net/wp-content/uploads/images6/Aesthetic-Minimalist-Wallpaper-Paper-Airplanes.png)`,
        backgroundPosition: `center bottom`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxWidth: 1200,
      }}
    >
      <div className="bg-white  max-h-max flex flex-col items-center w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 justify-center rounded-lg my-20">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="w-5/6 mt-6 max-h-max xl:h-128 flex flex-col justify-center"
        >
          <p className=" text-3xl text-center font-bold  h-16">Đăng ký</p>
          <Form.Item
            name={["user", "hoTen"]}
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
            name={["user", "taiKhoan"]}
            label="Tên đăng nhập"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "soDt"]}
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
            name={["user", "matKhau"]}
            label="Mật khẩu"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item wrapperCol={{ ...layout.labelCol, offset: 0, span: 24 }}>
            <p className=" text-xs pb-2">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookie Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
          </Form.Item> */}
          <div className="text-center mb-8">
            <button className="py-1 px-4 bg-blue-700 md:text-lg rounded-md text-white">
              Đăng ký
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

// "taiKhoan": "abc123",
//       "hoTen": "Hoang Minh",
//       "email": "khongco@gmail.com",
//       "soDT": "090909090933",
//       "matKhau": "123456",
//       "maLoaiNguoiDung": "KhachHang"
