import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FaHome, FaBoxes, FaUserCircle } from "react-icons/fa";
import Beranda from "./pages/Beranda";
import Barang from "./pages/Barang";
import CreateBarang from "./pages/CreateBarang";
import EditBarang from "./pages/EditBarang";
import Tentang from "./pages/Tentang";

function App() {
  return (
    <div>
      <Router>
        <Navbar
          collapseOnSelect
          expand="xl"
          sticky="top"
          bg="primary"
          variant="dark"
        >
          <Container>
            <Navbar.Brand>React Nautilus</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>
                    <FaHome /> Beranda
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/barang">
                  <Nav.Link>
                    <FaBoxes /> Data Barang
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/tentang">
                  <Nav.Link>
                    <FaUserCircle /> Tentang
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Beranda} />
          <Route path="/tentang" component={Tentang} />
          <Route
            path="/barang"
            render={({ match: { url } }) => (
              <div>
                <Route path={`${url}/`} component={Barang} exact />
                <Route path={`${url}/create`} component={CreateBarang} />
                <Route path={`${url}/edit`} component={EditBarang} />
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
