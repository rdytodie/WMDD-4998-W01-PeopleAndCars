import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/updateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = (props) => {
  const { car } = props;
  const { id, year, make, model, price, personId } = car;
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  //console.log('CarCard rendered with onCarChange prop:', props.onCarChange);

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
          //Sync
          onCarUpdated={props.onCarChange}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              id={id}
              //Sync
              onCarRemoved={props.onCarChange}
            />,
          ]}
        >
          <div className="car-desc">
            {car.year} {car.make} {car.model} - ${car.price}
          </div>
        </Card>
        //   <>
        //     <div>
        //       {car.year} {car.make} {car.model} - ${car.price}
        //     </div>
        //     <EditOutlined key="edit" onClick={handleButtonClick} />
        //     <RemoveCar id={id} personId={personId} />
        //   </>
      )}
    </div>
  );
};

const getStyles = () => {
  return {
    card: {
      width: "100%",
      margin: "0 auto",
      textAlign: "center",
    },
  };
};

export default CarCard;
