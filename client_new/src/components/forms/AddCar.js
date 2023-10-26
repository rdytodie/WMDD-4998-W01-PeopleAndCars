import { Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";

import {
  ADD_CAR,
  GET_PEOPLE,
  GET_CARS_OF_ONE_PERSON,
} from "../../graphql/queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { data, loading, error } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, priceInit, personId } = values;
    const price = priceInit.replace("$", "");

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const currentCars = cache.readQuery({
          query: GET_CARS_OF_ONE_PERSON,
          variables: { personId },
        });

        if (currentCars && currentCars.carsOfOnePerson) {
          cache.writeQuery({
            query: GET_CARS_OF_ONE_PERSON,
            variables: { personId },
            data: {
              carsOfOnePerson: [...currentCars.carsOfOnePerson, addCar],
            },
          });
        }
      },
    });
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  if (data && data.people && data.people.length === 0) {
    return (
      <div>
        No people available to associate with a car. Please add people first.
      </div>
    );
  }

  return (
    <div>
      <h3 className="title-sub">Add Car</h3>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          rules={[
            { required: true, message: "Please enter the year of the car." },
          ]}
          label={"Year"}
        >
          <Input placeholder="i.e. 2022" />
        </Form.Item>

        <Form.Item
          name="make"
          rules={[
            { required: true, message: "Please enter the make of the car." },
          ]}
          label={"Make"}
        >
          <Input placeholder="i.e. Toyota" />
        </Form.Item>

        <Form.Item
          name="model"
          rules={[
            { required: true, message: "Please enter the model of the car." },
          ]}
          label={"Model"}
        >
          <Input placeholder="i.e. Corolla" />
        </Form.Item>

        <Form.Item
          name="priceInit"
          rules={[
            { required: true, message: "Please enter the price of the car." },
          ]}
          label={"Price"}
        >
          <Input prefix="$" placeholder="i.e. 40000" />
        </Form.Item>

        <Form.Item
          name="personId"
          rules={[
            { required: true, message: "Please select the owner of the car." },
          ]}
          label={"Owner"}
        >
          <Select placeholder="Select an owner">
            {data.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
