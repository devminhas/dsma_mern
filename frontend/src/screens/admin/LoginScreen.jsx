import { useState } from "react";

import { Form, Button, Container, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import useAuthStore from "../../store/authStore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const login = useAuthStore((state) => state.login);

  //   const dispatch = useDispatch();

  //const [login, { isLoading }] = useLoginMutation();

  //const { userInfo } = useSelector((state) => state.auth);

  //const { search } = useLocation();
  //const sp = new URLSearchParams(search);
  //const redirect = sp.get('redirect') || '/';

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const { data } = await axios.post("/api/users/auth", { email, password });
      login(data._id, data.name, data.email, data.isAdmin);

      setisLoading(false);
      navigate("/admin/dashboard");
    } catch (err) {
      setisLoading(false);
      toast.error(err?.response?.data?.message || err.error);
    }
  };

  return (
   <>
   <Container style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}> 
   <FormContainer size={6}>
        <Card className="shadow-lg bg-white rounded p-5" >
          <h1>Sign In</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>


            {/* {isLoading && <Loader />} */}
          </Form>
        </Card>
      </FormContainer>
   </Container>
      
      {isLoading && <Loader />}
      </>
    
  );
};

export default LoginScreen;
