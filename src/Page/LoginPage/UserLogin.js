import { Button, Checkbox, Form, Input, message } from "antd";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserInforAction } from "../../Redux/Action/action";
import { localService } from "../../Services/localService";
import { getUserServ } from "../../Services/userServices";

const { Title } = Typography;

export default function UserLogin() {
  let dispatch = useDispatch();
  let history = useHistory();
  const onFinish = (values) => {
    getUserServ
      .postUserLogin(values)
      .then((res) => {
        dispatch(getUserInforAction(res.data.content));
        localService.saveToStorage(res.data.content);
        message.success("Đăng nhập thành công");
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch((err) => {
        message.error(err.response.data.content);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white px-6 max-h-max flex flex-col items-center w-3/4   justify-center rounded-lg">
      <Form
        className="w-3/4 mt-6 max-h-max xl:h-128 flex flex-col justify-center"
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="xl:mb-4 text-center">
          <Title className="">
            <p className="text-3xl">Đăng nhập</p>
          </Title>
        </div>
        <Form.Item
          label="Tên đăng nhập"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="mt-4">
          <div className="text-center mb-4">
            <button className="py-1 px-4 bg-blue-700 md:text-lg  rounded-md text-white">
              Đăng nhập
            </button>
          </div>

          <div className="mb-8 text-center">
            Bạn chưa có tài khoản?{" "}
            <NavLink to="/register" className=" underline text-blue-500">
              {" "}
              Đăng ký
            </NavLink>
          </div>
        </div>
      </Form>
    </div>
  );
}
