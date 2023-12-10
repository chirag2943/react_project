import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="pagelink">
        <Link className="links" to="/">
          Home
        </Link>

        {!user ? (
          <Link className="links" to="/login">
            Login
          </Link>
        ) : (
          <Link className="links" to="/createpost">
            Create Post
          </Link>
        )}
      </div>

      <div className="profile">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} />
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
    </div>
  );
};
