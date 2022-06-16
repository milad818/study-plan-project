import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAccountCircleLine } from "react-icons/ri"



function CusNavbar(props) {

    function onLogout(e) {
        props.handleLogout();
        props.setLoggedIn(false);
        props.setMessage(false);

    }

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Politecnico di Torino</Navbar.Brand>
                <Navbar.Text >
                    {props.loggedIn ? <Link to="/" ><Button onClick={(e) => {onLogout(e)}} >Log out</Button></Link> :
                    document.location.pathname === "/" ? <Link to="/login" ><Button>Log in</Button></Link> : " " }
                    {/* <RiAccountCircleLine size={35}></RiAccountCircleLine> */}
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default CusNavbar;