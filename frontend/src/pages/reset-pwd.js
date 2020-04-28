import React from 'react';
import axios from "axios";

class ResetPassword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         password: '',
         confirm_password: '',
         password_error: '',
         confirm_password_error: '',
         response_status: ''
      }
   }

   handle_password = (event) => {
      this.setState({ password: event.target.value });
   }

   handle_confirmPassword = (event) => {
      this.setState({ confirm_password: event.target.value });
   }

   handle_validation = () => {
      let formvalid = true;

      if (this.state.password === '') {
         this.setState({ password_error: 'New Password is required' });
         formvalid = false;
      }
      else this.setState({ password_error: '' });

      if (this.state.confirm_password === '') {
         this.setState({ confirm_password_error: 'Confirm New Password is required' });
         formvalid = false;
      }
      else {
         if (this.state.confirm_password !== this.state.password) {
            this.setState({ confirm_password_error: "Confrim Password doesn't match" });
            formvalid = false;
         }
         else this.setState({ confirm_password_error: '' });
      }

      return formvalid;

   }

   submit = () => {
      var token = this.props.match.params.token;

      if (this.handle_validation()) {
         var body = {
            "password": this.state.password
         };
         var url = "http://localhost:8000/users/reset-password/"+token;
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         };
         var data = JSON.stringify(body);
         axios.post(url, data, { headers: headers })
            .then((response) => {
               this.setState({response_status: response.data.message});
               console.log(response.data);
            })
            .catch((error) => {
               if (error.response) {
                  console.log(error.response.data); // => the response payload
                  this.setState({response_status: error.response.data.message});
                  // if (error.response.data.code) this.setState({ resonse_error: 'This Email is already exist' });
                  // else this.setState({ resonse_error: '' });
               }
            });
      }
   }

   render() {
      document.body.classList.remove('inner-page');
      const PasswordValidation = this.state.password_error ? (<label className="text-danger">{this.state.password_error}</label>) : (<br />);
      const ConfirmPasswordValidation = this.state.confirm_password_error ? (<label className="text-danger">{this.state.confirm_password_error}</label>) : (<br />);
      const ResponseValidation = this.state.response_status ? (<label className="text-danger">{this.state.response_status}</label>) : (<br />);
      console.log("location", process.env.PUBLIC_URL)
      return (
         <section className="auth-page text-center">
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
                  <h2>Reset Password</h2>
                  {/* <img src={`${process.env.PUBLIC_URL}assets/images/title-line.png`} alt="title-line" className="img-fluid line" /> */}
                  <img src={process.env.PUBLIC_URL + '/assets/images/title-line.png'} alt="title-line" className="img-fluid line" />
               </div>
               {ResponseValidation}
               <div className="main">
                  <form className="auth-form">
                     <div className="form-group mb-0">
                        <label htmlFor="InputPassword">New Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="InputPassword" name="password" type="password" className="form-control" onChange={this.handle_password} placeholder="New Password" required />
                     </div>
                     {PasswordValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="ConfirmPassword">Confirm New Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="ConfirmPassword" name="confirm_password" type="password" className="form-control" onChange={this.handle_confirmPassword} placeholder="Confirm New Password" required />
                     </div>
                     {ConfirmPasswordValidation}
                     <div className="form-group mt-5">
                        <button className="btn submit" type="button" onClick={this.submit}>Change Password</button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }
}


export default ResetPassword;