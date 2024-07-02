import { Button, Col, Divider, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FieldBuilder from "../../form-components/field-builder";
import { IUser } from "../../../models/users/response";
import EndPoints from "../../../services/end-points";
import Controller from "../../form-components/controller";
import FormItem from "../../general/form-item";
import { ICourse } from "../../../models/courses/response";

interface IProps {}

const NotificationForm: React.FC<IProps> = ({}) => {
  const { setValue } = useFormContext();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userLoading, setUsersLoading] = useState(true);

  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await EndPoints.user.getAllUsersLight({});
      setUsers(data.data);
    } catch (err) {
    } finally {
      setUsersLoading(false);
    }
  };

  // useEffect(() => {
  //   getData()
  // }, [])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await EndPoints.course.getAllCoursesLight();
  //       setCourses(data.data);
  //     } catch (err) {
  //     } finally {
  //       setCoursesLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  const addAllValues = () => {};

  return (
    <>
      <Row gutter={[16, 2]}>
        <Col xs={24} lg={24}>
          <FieldBuilder
            name="title"
            label="Title"
            width="large"
            rules={{ required: true }}
            input={{
              type: "text",
            }}
          />
        </Col>
        <Col xs={24} lg={24}>
          <FormItem label="Course">
            <Select
              style={{ width: "100%" }}
              allowClear
              loading={coursesLoading}
              disabled={userLoading}
              onChange={async (val) => {
                if (val) {
                  let coursesCopy = [...courses];
                  let courseIndex = coursesCopy.findIndex(
                    (item) => item.id === val
                  );

                  if (courseIndex !== -1) {
                    setValue("users", coursesCopy[courseIndex].users);
                    setSelectedUsers(coursesCopy[courseIndex].users);
                  }
                } else {
                  setValue("users", undefined);
                  getData();
                }
              }}
              placeholder="Course"
              options={courses?.map((course: any) => {
                return { label: course.name, value: course.id };
              })}
            />
          </FormItem>
        </Col>

        <Col xs={24} lg={24}>
          {/* <FieldBuilder
            name="users"
            label="Users"
            width="large"
            rules={{ required: true }}
            input={{
              type: "multiSelect",
              loading: userLoading,
              options: user?.map((user) => {
                return {
                  label: user?.name,
                  value: user?.id,
                }
              }),
            }}
          /> */}

          <FormItem label="Users" required>
            <Controller
              name="users"
              rules={{
                required: { value: true, message: "Field is required" },
              }}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      style={{ width: "100%" }}
                      mode="multiple"
                      value={selectedUsers}
                      loading={userLoading}
                      onChange={(val) => {
                        let selected = val;
                        setSelectedUsers(selected);
                        console.log(val);

                        field.onChange(val);
                      }}
                      placeholder="Users"
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: "5px 0" }} />
                          <div
                            style={{
                              padding: "0 8px 4px",
                              textAlign: "center",
                            }}
                          >
                            <Button
                              onClick={() => {
                                let allValues: any = users.map(
                                  (item) => item.id
                                );
                                field.onChange(allValues);
                                setSelectedUsers(allValues);
                              }}
                              type="text"
                            >
                              Select All
                            </Button>
                          </div>
                        </>
                      )}
                      options={users?.map((user) => {
                        return { label: user.name, value: user.id };
                      })}
                    />
                  </>
                );
              }}
            />
          </FormItem>
        </Col>

        <Col xs={24} lg={24}>
          <FieldBuilder
            name="body"
            label="Body"
            rules={{ required: true }}
            input={{
              type: "text-area",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default NotificationForm;
