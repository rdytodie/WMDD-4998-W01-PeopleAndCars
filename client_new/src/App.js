import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import People from "./components/lists/People";
import PersonDetail from "./components/pages/PersonDetail";
import { CarOwnershipProvider } from "./context/CarOwnershipContext.js";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <CarOwnershipProvider>
      <ApolloProvider client={client}>
      <Router>
          <div className='App'>
            <Title />
            <Routes>
              <Route path="/" element={
                <>
                  <AddPerson />
                  <AddCar />
                  <h4 className='title-sub'>Records</h4>
                  <People />
                </>
              } />
              <Route path="/person/:id" element={<PersonDetail />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </CarOwnershipProvider>
  );
};

export default App;
