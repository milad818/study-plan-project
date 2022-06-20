import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CusNavBar.css';
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
                <Navbar.Brand>Politecnico di Torino</Navbar.Brand>
                <Navbar.Text >
                    {props.loggedIn ? <Link to="/" ><Button className='logout-button' onClick={(e) => {onLogout(e)}} >Log out</Button></Link> :
                    document.location.pathname === "/" ? <Link to="/login" ><Button className='login-button' variant='light' >Log in</Button></Link> :
                    document.location.pathname === "/login" ? "" : <Link to="/login" ><Button className='login-button' variant='light' >Log in</Button></Link> }
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default CusNavbar;