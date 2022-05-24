import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/auth";

const PrivateOutlet = () => {

    const { signed } = useContext(AuthContext);
    
    return signed ? (
        <>
            <Navbar />
            <Container customClass="min-height">
                <Outlet />
            </Container>
            <Footer />
            </>
    ) : <Navigate to="/" />;
}
 
export default PrivateOutlet;