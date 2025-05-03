import {useNavigate} from 'react-router-dom';
import { useIsLoggedIn } from "./hooks/useGetIsLoggedIn";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children })  => {
  const navigate = useNavigate();
  const { data, isLoading } = useIsLoggedIn();
  if (!data) {
    navigate("/login");
  }


  return <>{children}</>;
};

export default ProtectedRoute;