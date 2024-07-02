import React, { useContext, useEffect } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Image,
} from "antd";
import classes from "./style.module.scss";
import { MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import AuthContext from "../../context/auth/context";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../paths";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { actions, loading, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });
    actions.login(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_PAGE, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.headerContainer}>
          <Image
            preview={false}
            src={`/images/logo.png`}
            width={100}
            alt={"logo"}
            style={{ marginBottom: "1rem" }}
          />
          <span
            style={{
              position: "relative",
              color: "black",
              fontSize: "1.5rem",
              opacity: "0.8",
              bottom: "6px",
              fontWeight: "600",
            }}
          >
            Hela - Admin Panel
          </span>
        </div>
        <Form
          layout="vertical"
          onFinish={onSubmit}
          className={classes.form}
          aria-autocomplete="none"
          scrollToFirstError
          autoComplete="none"
          validateMessages={{
            required: "This Field is Required",
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "string",
              },
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              className={classes.input}
              prefix={<MailOutlined className={classes.prefixIcon} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: "1rem" }}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              className={classes.input}
              prefix={<LockOutlined className={classes.prefixIcon} />}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            style={{ padding: "0", margin: "0" }}
            className={classes.footer}
          >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.submitButton}
              loading={loading.includes("login")}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
