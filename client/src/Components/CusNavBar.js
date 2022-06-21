import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './CusNavBar.css';


function CusNavbar(props) {
    let location = useLocation()

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
                    {location.pathname === "/my-portal" ? <Link to="/" ><Button className='logout-button' onClick={(e) => {onLogout(e)}} >Log out</Button></Link> :
                    location.pathname === "/" ? <Link to="/login" ><Button className='login-button' variant='light' >Log in</Button></Link> :
                    location.pathname === "/login" ? "" : <Link to="/login" ><Button className='login-button' variant='light' >Log in</Button></Link> }
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default CusNavbar;