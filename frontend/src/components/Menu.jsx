import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Searchbar from './Searchbar';

function Menu() {
  
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand as={Link} to="/">Prestock</Navbar.Brand>
        <Searchbar />
        <Nav className="me-auto align-items-center">
          <Nav.Link as={Link} to="/">
            <Button className="btn-dark">Inicio</Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/impresiones">
            <Button className="btn-dark">Impresiones</Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/inventario">
            <Button className="btn-dark">Inventario</Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/morosos" data-bs-toggle="tooltip" title="Morosos"><i className="bi bi-person-fill-slash fs-4"></i></Nav.Link>
          <Nav.Link href="#configuraciones"><i className="bi bi-gear fs-4"></i></Nav.Link>
          <Nav.Link href="#logadmin"><i className="bi bi-box-arrow-right fs-4"></i></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;