import React from 'react';
import validator from 'validator';
import axios from "axios";

class SignIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         email_error: '',
         password_error: '',
         response_status: ''
      };
   }

   handle_email = (event) => {
      this.setState({ email: event.target.value });
   }

   handle_password = (event) => {
      this.setState({ password: event.target.value });
   }

   handle_validate = () => {
      let formvalid = true;

      if (this.state.email === '') {
         this.setState({ email_error: 'Email is required' });
         formvalid = false;
      }
      else {
         if (validator.isEmail(this.state.email)) this.setState({ email_error: '' });
         else {
            this.setState({ email_error: 'Email is not valid' });
            formvalid = false;
         }
      }

      if (this.state.password === '') {
         this.setState({ password_error: 'Password is required' });
         formvalid = false;
      }
      else this.setState({ password_error: '' });

      return formvalid;
   }

   submit = () => {
      if (this.handle_validate()) {
         var body = {
            "email": this.state.email,
            "password": this.state.password
         };
         var url = "http://localhost:8000/users/login";
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         };
         var data = JSON.stringify(body)
         axios.post(url, data, { headers: headers })
            .then((response) => {
               this.setState({ response_status: 'Sign in successfully' });
               let teamname = response.data.user.teams[0].teamname.replace(/\s/g, '-');
               localStorage.setItem('token', response.data.token);
               localStorage.setItem('user', JSON.stringify(response.data.user));
               localStorage.setItem('teamname', response.data.user.teams[0].teamname);

               setTimeout(function () {
                  console.log(response);
               }, 1000);
               this.props.history.push(teamname.toLowerCase());
            })
            .catch((error) => {
               if (error.response) {
                  if (error.response.data.error) this.setState({ response_status: error.response.data.error });
                  else this.setState({ response_status: '' });
               }
            });
      }
   }

   render() {

      document.body.classList.remove('inner-page');
      const EmailValidation = this.state.email_error ? (<label className="text-danger">{this.state.email_error}</label>) : (<br />);
      const PasswordValidation = this.state.password_error ? (<label className="text-danger">{this.state.password_error}</label>) : (<br />);
      const ResponseValdiation = this.state.response_status ? (<label className="text-danger text-center">{this.state.response_status}</label>) : (<br />);
      return (
         <section className="auth-page">
            <div className="animation-circle-inverse">
               <i></i>
               <i></i>
               <i></i>
            </div>
            <div className="animation-circle">
               <i></i>
               <i></i>
               <i></i>
            </div>
            <div className="auth-card">
               <div className="text-center">
                  <h2>Sign In</h2>
                  <img src="assets/images/title-line.png" alt="title-line" className="img-fluid line" />
                  <p>Please Sign in With Your Personal Account Information.</p>
                  {ResponseValdiation}
               </div>
               <div className="main">
                  <form className="auth-form">
                     <div className="form-group mb-0">
                        <label htmlFor="InputEmail">Email</label>
                        <i className="fa fa-envelope-o"></i>
                        <input required="" name="email" type="email" className="form-control" id="InputEmail" onChange={this.handle_email} value={this.state.email} placeholder="Email" />
                     </div>
                     {EmailValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="InputPassword">Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="InputPassword" required="" name="password" type="password" className="form-control" onChange={this.handle_password} value={this.state.password} placeholder="Password" />
                        <a href={`${process.env.PUBLIC_URL}/forget-password`} className="forgot-pass">forgot?</a>
                     </div>
                     {PasswordValidation}
                     <div className="form-group">
                        <button className="btn submit" type="button" onClick={this.submit}>Sign in</button>
                     </div>
                     <div className="or-saparator"><span>or</span></div>
                     <h6 className="text-center mt-0 mb-3">Sign in with:</h6>
                     <div className="form-button text-center social-btns">
                        {/* <button type="submit" className="btn submit fb">Facebook</button> */}
                        <button type="submit" className="btn submit ggl">Google</button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }
}


export default SignIn;