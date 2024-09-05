import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../assets/images/logo.png';
import { useFormik } from "formik";
import { register } from "../api/userApi";
import Alert from "../components/Alert";
import { UniversalContext } from '../context/UniversalContext';
import { barrier } from "../middleware/securityMiddleware";

const Register = () => {
  const { setValue } = useContext(UniversalContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await register(values.email, values.password);
        if (response.ok) {
          setValue("AlertType", "primary");
          setValue("AlertMessage", response.message);
          setValue("AlertVisibility", true);
          barrier(setValue, navigate);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", response.message);
          setValue("AlertVisibility", true);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setValue("AlertType", "danger");
          setValue("AlertMessage", error.response.data.message);
          setValue("AlertVisibility", true);
        } else {
          console.error(error);
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="authentication-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#272e03', padding: '20px' }}>
      <Alert />
      <div className="account-pages position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div
                className="card overflow-hidden"
                style={{
                  borderRadius: '30px',  // Large rounded corners for a softer look
                  background: 'rgba(255, 255, 255, 0.1)',  // Glassmorphism effect
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  // Soft shadow for depth
                  backdropFilter: 'blur(10px)',  // Blurring background through glassmorphism
                  border: '1px solid rgba(255, 255, 255, 0.18)',  // Subtle border for definition
                }}
              >
                <div className="row g-0">
                  <div className="col-md-6 d-none d-md-block">
                    <img
                      src={'https://www.bestoflanka.com/images/recommended-stays-sri-lanka/stay-on-the-beach-sri-lanka/01.jpg'}
                      alt=""
                      className="img-fluid h-100"
                      style={{ 
                        objectFit: 'cover', 
                        borderTopLeftRadius: '30px', 
                        borderBottomLeftRadius: '30px', 
                        filter: 'brightness(0.8)'  // Darken the image slightly for contrast
                      }}
                    />
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-content-center">
                    <div className="auth-brand text-center mb-4">
                      <Link to="/">
                        <img src={logo} alt="logo" height="56" style={{ filter: 'drop-shadow(2px 4px 6px black)' }} />
                      </Link>
                    </div>
                    <div className="my-auto px-4">
                      <h4 className="fs-24 text-center mb-3" style={{ fontWeight: '700', color: '#333' }}>Free Sign Up</h4>
                      <p className="text-center text-muted mb-4">
                        Enter your email address and password to create an account.
                      </p>

                      {/* form */}
                      <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="emailaddress" className="form-label">Email address</label>
                          <input
                            className="form-control"
                            type="email"
                            id="emailaddress"
                            required
                            {...formik.getFieldProps('email')}
                            placeholder="Enter your email"
                            style={{ 
                              borderRadius: '10px', 
                              padding: '12px', 
                              border: '1px solid #ddd',
                              backgroundColor: '#f0f0f3',
                              boxShadow: 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0px 0px 0px 3px #007bff'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff'}
                          />
                          {formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                            className="form-control"
                            type="password"
                            required
                            {...formik.getFieldProps('password')}
                            placeholder="Enter your password"
                            style={{ 
                              borderRadius: '10px', 
                              padding: '12px', 
                              border: '1px solid #ddd',
                              backgroundColor: '#f0f0f3',
                              boxShadow: 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0px 0px 0px 3px #007bff'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff'}
                          />
                          {formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                          <input
                            className="form-control"
                            type="password"
                            required
                            {...formik.getFieldProps('confirmPassword')}
                            placeholder="Confirm your password"
                            style={{ 
                              borderRadius: '10px', 
                              padding: '12px', 
                              border: '1px solid #ddd',
                              backgroundColor: '#f0f0f3',
                              boxShadow: 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0px 0px 0px 3px #007bff'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff'}
                          />
                          {formik.errors.confirmPassword ? (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox-signup"
                              style={{ 
                                borderRadius: '5px', 
                                border: '1px solid #ddd',
                                backgroundColor: '#f0f0f3',
                                boxShadow: 'inset 7px 7px 14px #d1d1d3, inset -7px -7px 14px #ffffff',
                                transition: 'all 0.3s ease'
                              }}
                            />
                            <label className="form-check-label" htmlFor="checkbox-signup">
                              I accept <Link to="#" className="text-primary" style={{ textDecoration: 'underline' }}>Terms and Conditions</Link>
                            </label>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            className="btn btn-primary fw-bold w-100"
                            type="submit"
                            disabled={formik.isSubmitting}
                            style={{
                              borderRadius: '30px',
                              padding: '12px 20px',
                              background: '#007bff',
                              transition: 'all 0.3s ease',
                              color: '#fff',
                              fontWeight: '700',
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0056b3';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#007bff';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                      {/* end form */}
                    </div>
                  </div> {/* end col */}
                </div>
              </div>
            </div>
            {/* end row */}
          </div>
          <div className="text-center mt-4">
            <p className="text-dark-emphasis">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary fw-bold ms-1"
                style={{ textDecoration: 'underline' }}
              >
                <b>Log In</b>
              </Link>
            </p>
          </div>
        </div>
        {/* end container */}
      </div>
      {/* end page */}
      <Footer />
    </div>
  );
};

export default Register;
