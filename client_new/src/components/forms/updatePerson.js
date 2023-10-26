import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const {id,firstName,lastName} = props;
  
  useEffect(()=>{
    forceUpdate({})
  }, [])

  const [updatePerson] = useMutation(UPDATE_PERSON)

  const onFinish = values => {
    const { firstName, lastName } = values
    updatePerson({
        variables:{
            id,
            firstName,
            lastName
        }
    })

    props.onButtonClick()

  }

  
  return (
    <div>
        <h4>Updating person: {firstName} {lastName} </h4>
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName,
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="i.e. John" />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name." }]}
      >
        <Input placeholder="i.e. Smith" />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>

      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
    </div>
  );
};

export default UpdatePerson;
