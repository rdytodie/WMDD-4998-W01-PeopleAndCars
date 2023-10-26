import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useCarOwnership } from "../../context/CarOwnershipContext";
import {
  UPDATE_CAR,
  GET_PEOPLE,
  GET_CARS_OF_ONE_PERSON,
} from "../../graphql/queries";

const UpdateCar = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { id, year, make, model, price, personId: initialPersonId } = props;

  const { data, loading, error } = useQuery(GET_PEOPLE);
  const { updateCarOwnership } = useCarOwnership();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [
      {
        query: GET_CARS_OF_ONE_PERSON,
        variables: { personId: initialPersonId },
      },
    ],
  });

  const onFinish = (values) => {
    const { year, make, model, priceInit, personId } = values;
    const finalPrice = priceInit.replace("$", "");

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price: finalPrice,
        personId,
      },
      update: (cache, { data: { updateCar } }) => {
        const currentCars = cache.readQuery({
          query: GET_CARS_OF_ONE_PERSON,
          variables: { personId },
        });

        cache.writeQuery({
          query: GET_CARS_OF_ONE_PERSON,
          variables: { personId },
          data: {
            carsOfOnePerson: [...currentCars.carsOfOnePerson, updateCar],
          },
        });
        // if (currentCars && currentCars.carsOfOnePerson) {

        // }
      },
    }).then(() => {
      props.onCarUpdated && props.onCarUpdated();
      console.log("changed");
      updateCarOwnership(id, personId);
    });

    props.onButtonClick();

    //The updating of the changed person doesn't work
    window.location.reload();
  };

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h4>
        Updating car: {year} {make} {model}
      </h4>
      <Form
        form={form}
        name="update-car-form"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          year,
          make,
          model,
          priceInit: `$${price}`,
          personId: initialPersonId,
        }}
      >
        <Form.Item
          name="year"
          rules={[{ required: true, message: "Please enter the car year." }]}
        >
          <InputNumber placeholder="i.e. 2022" />
        </Form.Item>

        <Form.Item
          name="make"
          rules={[{ required: true, message: "Please enter the car make." }]}
        >
          <Input placeholder="i.e. Toyota" />
        </Form.Item>

        <Form.Item
          name="model"
          rules={[{ required: true, message: "Please enter the car model." }]}
        >
          <Input placeholder="i.e. Corolla" />
        </Form.Item>

        <Form.Item
          name="priceInit"
          rules={[{ required: true, message: "Please enter the car price." }]}
        >
          <Input prefix="$" placeholder="i.e. 20000" />
        </Form.Item>

        <Form.Item
          name="personId"
          rules={[
            { required: true, message: "Please select the owner of the car." },
          ]}
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
                (!form.isFieldTouched("year") &&
                  !form.isFieldTouched("make") &&
                  !form.isFieldTouched("model") &&
                  !form.isFieldTouched("priceInit") &&
                  !form.isFieldTouched("personId")) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Car
            </Button>
          )}
        </Form.Item>

        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </div>
  );
};

export default UpdateCar;
