import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
    {
    people{
        id
        firstName
        lastName
    }
}
`

export const GET_PERSON_DETAILS_AND_CARS = gql`
  query GetPersonDetailsAndCars($id: String!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const ADD_PERSON = gql`
mutation AddPerson($id: String!, $firstName: String!, $lastName: String!){
    addPerson(id: $id, firstName: $firstName, lastName: $lastName){
        id
        firstName
        lastName
    }
}
`

export const REMOVE_PERSON = gql`
mutation RemovePerson($id: String!){
    removePerson(id:$id){
        id
        firstName
        lastName
    }
}
`

export const UPDATE_PERSON = gql`
mutation UpdatePerson( $id: String!, $firstName: String!, $lastName: String!){
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName){
        id
        firstName
        lastName
    }
}
`

export const GET_CARS_OF_ONE_PERSON = gql`
  query carsOfOnePerson($personId: String!) {
    carsOfOnePerson(personId: $personId) {
      id
      year
      make
      model
      price
    }
  }
`;


export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
mutation UpdateCar ($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!){
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId){
        id
        year
        make
        model
        price
        personId
    }
}
`

export const REMOVE_CAR = gql`
mutation RemoveCar($id: String!){
    removeCar(id:$id){
        id
        year
        make
        model
        price
        personId
    }
}
`

