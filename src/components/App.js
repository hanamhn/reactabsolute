import React, { useState, useEffect } from "react";
import { Navbar, Nav, Table } from "react-bootstrap";
import Select from "react-select";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://www.json-generator.com/api/json/get/bVDxTQSDQO?indent=2", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const selectList = items.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Peter Huynh Nguyen</h1>
              <p>List data</p>
              <div className="row">
                <div className="col-sm-3">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={selectList}
                  />
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-9">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Age</th>
                        <th>Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        console.log(selectedOption);
                        if (
                          selectedOption === null ||
                          item.name === selectedOption.value
                        ) {
                          return (
                            <tr key={item.guid}>
                              <td>{item.name}</td>
                              <td>{item.address}</td>
                              <td>{item.age}</td>
                              <td>{item.company}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
