import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 11500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">	
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">

              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for not available!</p>
              </div>
                <p>You will be redirected to home shortly...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;