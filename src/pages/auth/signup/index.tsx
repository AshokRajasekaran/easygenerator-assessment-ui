import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/usercontext";
import axios from "axios";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      console.log("Signup successful", response.data);
      setUser(response.data);
      navigate("/dashboard");
    } catch (error: any) {
      // Handle errors (e.g., show error message)
      console.error("Signup error", JSON.stringify(error));
      console.error(
        "Signup error Response",
        JSON.stringify(error.response.data)
      );
      let errorMessage = "Something Went wrong";
      if (Array.isArray(error?.response?.data?.displayMessage)) {
        errorMessage = error?.response?.data?.displayMessage.join(",");
      } else if (error?.response?.data?.displayMessage) {
        errorMessage = error.response.data.displayMessage;
      }
      message.error(errorMessage);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div>
      <h2>SignUp </h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/,
              message: "Password must contain at least one uppercase letter, one smallcase letter, one special character, one numeric digit, minimum of 6 and maximum of 18 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
