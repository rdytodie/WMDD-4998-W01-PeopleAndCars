import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS_OF_ONE_PERSON, REMOVE_CAR } from "../../graphql/queries";
import { filter } from "lodash";

const RemoveCar = ({ id, personId, onCarRemoved }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const data = cache.readQuery({
        query: GET_CARS_OF_ONE_PERSON,
        variables: { personId },
      });

      if (!data || !data.carsOfOnePerson) {
        // Handle the case where the data is not in the cache.
        return;
      }

      const updatedCars = filter(data.carsOfOnePerson, (car) => {
        return car.id !== removeCar.id;
      });

      cache.writeQuery({
        query: GET_CARS_OF_ONE_PERSON,
        variables: { personId },
        data: {
          carsOfOnePerson: updatedCars,
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to remove this car?");
    if (result) {
      removeCar({
        variables: {
          id,
        },
      }).then(() => {
        if (onCarRemoved) {
          onCarRemoved();
        }
      });
    }

    //This is cheating
    window.location.reload();
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
