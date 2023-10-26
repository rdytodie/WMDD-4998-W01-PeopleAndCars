import React from "react";
import { Card, Skeleton, Button } from "antd";
import { useQuery } from "@apollo/client";
import CarCard from "../listItems/CarCard";
import { GET_CARS_OF_ONE_PERSON } from "../../graphql/queries";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Import a new query for fetching person details
import { GET_PERSON_DETAILS_AND_CARS } from "../../graphql/queries";

const PersonDetail = (props) => {
  const { id } = useParams();
  const styles = getStyles();

  const {
    loading: personLoading,
    error: personError,
    data: personData,
  } = useQuery(GET_PERSON_DETAILS_AND_CARS, {
    variables: { id },
  });

  const {
    loading: carsLoading,
    error: carsError,
    data: carsData,
  } = useQuery(GET_CARS_OF_ONE_PERSON, {
    variables: { personId: id },
  });

  const relatedCars = carsData && carsData.carsOfOnePerson;

  return (
    <div>
      <h2>Person Detail</h2>
      <Card style={styles.card}>

        <div >
        <Link to="/">
          <Button  type="primary" style={styles.homebutton}>
            <ArrowLeftOutlined /> GO BACK HOME
          </Button>
        </Link>

        </div>

        {personLoading ? (
          <Skeleton active />
        ) : (
          <div className="person-name">
            {personData &&
              `${personData.person.firstName} ${personData.person.lastName}`}
          </div>
        )}
        {carsLoading && <Skeleton active />}

        {!carsLoading && !carsError && relatedCars && relatedCars.length > 0
          ? relatedCars.map((car) => <CarCard key={car.id} car={car} />)
          : !carsLoading && <p>This person has no car.</p>}

        {carsError && <p>Error: {carsError.message}</p>}
      </Card>
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
    homebutton:{
      marginLeft: "20px"

    },
  };
};

export default PersonDetail;
