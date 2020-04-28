import React from 'react';
import validator from 'validator';
import axios from "axios";

class ForgetPassword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         email_error: '', 
         response_state: ''
      }
   }

   handle_email = (event) => {
      this.setState({ email: event.target.value });
   }

   handle_validation = () => {
      let formvalid = true;
      if(this.state.email === '') {
         console.log("there");
         this.setState({email_error: 'Email is Required'});
         formvalid = false;
      }
      else {
         console.log('here');
         if(validator.isEmail(this.state.email)) this.setState({email_error: ''});
         else {
            this.setState({email_error: 'Email is not valid'});
            formvalid = false;
         }
      }
      return formvalid;
   }

   submit = () => {
      if(this.handle_validation()) {

         this.setState({response_state: 'Sending Email...'});

         var body = {
            "email": this.state.email
         };
         var url = "http://localhost:8000/users/password_mail_send";
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         };
         var data = JSON.stringify(body);
         axios.post(url, data, { headers: headers })
            .then((response) => {
               this.setState({response_state: response.data.message});
               console.log(response.data);
            })
            .catch((error) => {
               if (error.response) {
                  console.log(error.response.data); // => the response payload
                  this.setState({response_state: error.response.data.message});
                  // if (error.response.data.code) this.setState({ resonse_error: 'This Email is already exist' });
                  // else this.setState({ resonse_error: '' });
               }
            });
      }
   }

   render() {
      document.body.classList.remove('inner-page');
      const EmailValidation = this.state.email_error ? (<label className="text-danger">{this.state.email_error}</label>) : (<br />);
      const ResponseValidation = this.state.response_state ? (<label className="text-danger">{this.state.response_state}</label>) : (<br />);
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
                  <h2>Forgot Password</h2>
                  <img src="assets/images/title-line.png" alt="title-line" className="img-fluid line" />
               </div>
               {ResponseValidation}
               <div className="main">
                  <form className="auth-form">
                     <div className="form-group mb-0">
                        <label htmlFor="InputEmail">Email</label>
                        <i className="fa fa-envelope-o"></i>
                        <input required="" name="email" type="email" className="form-control" id="InputEmail" onChange={this.handle_email} placeholder="Email" />
                     </div>
                     {EmailValidation}
                     <div className="form-group">
                        <button className="btn submit" type="button" onClick={this.submit}>Send Email</button>
                     </div>
                     <div className="or-saparator"><span>or</span></div>
                     <h6 className="text-center mt-0 mb-3">Sign in with:</h6>
                     <div className="form-button text-center social-btns">
                        <button className="btn submit fb">Sign in</button>
                        <button className="btn submit ggl">Signup</button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }
}


export default ForgetPassword;