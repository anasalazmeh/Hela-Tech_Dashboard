import { Card, Col, List, Row, Typography } from "antd";
import PageHeader from "../../components/general/page-header";
import dayjs from "dayjs";
import "./style.css";
import { useEffect, useState } from "react";
// import { ICalenderStatistics } from "../../models/calendar/response"
import http from "../../api/axios";
import EndPoints from "../../services/end-points";
// import { getBookingStatus } from "../../models/bookings/enum"
import styles from "./style.module.css";

interface IStatisitics {
  userCount: number;
  studentCount: number;
  employeeCount: number;
  courseCount: number;
  seasonCount: number;
  lessonCount: number;
}

const Home = () => {
  const [statistics, setStatistics] = useState<IStatisitics>();
  const [statisticsLoading, setStatisticsLoading] = useState(false);

  // useEffect(() => {
  //   const getStatistics = async () => {
  //     try {
  //       setStatisticsLoading(true)
  //       const { data } = await http.get("/get-statistics")
  //       setStatistics(data)
  //     } catch (err) {
  //     } finally {
  //       setStatisticsLoading(false)
  //     }
  //   }
  //   getStatistics()
  // }, [])

  const [bookings, setBookings] = useState<any>();
  const [bookingDetails, setBookingDetails] = useState<any>();

  const { Title } = Typography;

  return (
    <>
      <PageHeader title={"Dashboard"} subTitle="Analytics" />
      <div className={styles.welcomeConatiner}>
        <div
          style={{
            padding: "12px",
            // display: "flex",
            // height: "100%",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <img src="/images/logo.png" alt="home" className={styles.image} />
        </div>
        <Title
          style={{ margin: "auto", textAlign: "center" }}
          className={styles.content}
          level={1}
        >
          <span className={styles.title}>
            Welcome To
            <br />
            <span className={styles.siteName}>Hela</span>
            <br />
            Control Panel
          </span>
        </Title>
      </div>
    </>
  );
};
export default Home;
