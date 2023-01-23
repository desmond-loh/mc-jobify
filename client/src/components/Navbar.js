import { useState } from 'react';
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaDropbox } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

function Navbar() {

    const { toggleSidebar, logoutUser, user } = useAppContext();

    const [showLogout, setShowLogout] = useState(false);

    return (
        <Wrapper>
            <div className="nav-center">
                <button className="toggle-btn" onClick={toggleSidebar}>
                <FaAlignLeft />
                </button>

                <div>
                    <Logo />
                    <h3 className="logo-text">Dashboard</h3>
                </div>

                <div className="btn-container">
                    <button className="btn" onClick={() => setShowLogout(!showLogout)}>
                        <FaUserCircle />
                        {/* {user.name} */}
                        {user && user.name}
                        {/* {user?.name} */}
                        <FaCaretDown />
                    </button>
                    <div className={ showLogout ? "dropdown show-dropdown" : "dropdown"}>
                        <button className="dropdown-btn" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar;