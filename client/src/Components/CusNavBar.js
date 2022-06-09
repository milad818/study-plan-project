import { Navbar, Container } from 'react-bootstrap';
import { RiAccountCircleLine } from "react-icons/ri"

function CusNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">ZeeGoPortal</Navbar.Brand>
                <Navbar.Text >
                    <RiAccountCircleLine size={35}></RiAccountCircleLine>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default CusNavbar;