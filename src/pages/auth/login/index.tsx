import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/usercontext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post("http://localhost:3000/auth/Login", {
        email: values.email,
        password: values.password,
      });
      console.log("Login successful", response.data);
      setUser(response.data);
      navigate("/dashboard");
    } catch (error: any) {
      let errorMessage = "Something Went wrong";
      if (error?.response?.data?.displayMessage?.length) {
        errorMessage = error?.response?.data?.displayMessage.join(",");
      } else if (error?.response?.data?.displayMessage) {
        errorMessage = error.response.data.displayMessage;
      }
      message.error(errorMessage);
    }
  };

  return (
    <div>
      <h2>Login </h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email Id is mandatory",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "Password is Invalid" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="#">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/signup">SignUp now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
