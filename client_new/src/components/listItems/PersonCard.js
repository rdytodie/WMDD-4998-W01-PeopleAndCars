import { Card, Skeleton } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import UpdatePerson from "../forms/updatePerson";
import CarCard from "./CarCard";
import { GET_CARS_OF_ONE_PERSON } from "../../graphql/queries";
import { useCarOwnership } from "../../context/CarOwnershipContext";
import { Link } from "react-router-dom";
import { readMultipartBody } from "@apollo/client/link/http/parseAndCheckHttpResponse";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, firstName, lastName } = props;
  const styles = getStyles();
  const { updateCarOwnership } = useCarOwnership();

  //Sync
  const [cardKey, setCardKey] = useState(Date.now());

  useEffect(() => {
    console.log("cardKey changed:", cardKey);
  }, [cardKey]);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const { loading, error, data } = useQuery(GET_CARS_OF_ONE_PERSON, {
    variables: { personId: id },
  });

  const relatedCars = data && data.carsOfOnePerson;
  console.log(relatedCars + "Of person" + id);

  //console.log(data.carsOfOnePerson.length)
  //   console.log(data.carsOfOnePerson.length)
  return (
    <div key={cardKey}>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          <div className="person-name">
            {" "}
            {firstName} {lastName}
          </div>

          {loading && <Skeleton active />}

          {!loading && !error && relatedCars && relatedCars.length > 0
            ? relatedCars.map((car) => (
                <CarCard
                  key={car.id + cardKey}
                  car={car}
                  onCarChange={() => setCardKey(Date.now())}
                />
              ))
            : !loading && <p>This person has no car.</p>}

          {error && <p>Error: {error.message}</p>}

          <div style={styles.learnMore}>
            <Link to={`/person/${id}`}>LEARN MORE</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => {
  return {
    card: {
      width: "800px",
      margin: "0 auto",
      textAlign: "center",
      border: "1px solid gray",
    },
    learnMore: {
      textAlign: "left",
      marginTop: "10px",
    },
  };
};

export default PersonCard;
