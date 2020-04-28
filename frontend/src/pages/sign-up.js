import React from 'react';
import axios from "axios";
import validator from 'validator';

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         confirm_password: '',
         team: '',
         email_error: '',
         password_error: '',
         confirm_password_error: '',
         team_error: '',
         resonse_error: ''
      };
   }

   handle_email = (event) => {
      this.setState({ email: event.target.value });
   }

   handle_password = (event) => {
      this.setState({ password: event.target.value });
   }

   handle_confirmPassword = (event) => {
      this.setState({ confirm_password: event.target.value });
   }

   handle_team = (event) => {
      this.setState({ team: event.target.value });
      
      if (/^[a-zA-Z0-9- ]*$/.test(event.target.value) === false) this.setState({ team_error: 'Here is not allowed characters' });
      else if (event.target.value) {
         var url = `http://localhost:8000/team/checkteam/${event.target.value}`;
         const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         };
         axios.get(url, { headers: headers })
            .then((response) => {
               console.log(response.data);
               this.setState({team_error: ''});
            })
            .catch((error) => {
               if (error.response) {
                  console.log(error.response.data); // => the response payload
                  this.setState({team_error: error.response.data.message});
               }
               console.log(error);
            });
      }
      else this.setState({team_error: ''});

   }

   handle_validation = () => {
      let formvalid = true;

      if (this.state.email === '') {
         this.setState({ email_error: 'Email is required' });
         formvalid = false;
      }
      else {
         if (validator.isEmail(this.state.email)) this.setState({ email_error: '' });
         else this.setState({ email_error: 'Email is a not valid' });
      }

      if (this.state.password === '') {
         this.setState({ password_error: 'Password is required' });
         formvalid = false;
      }
      else this.setState({ password_error: '' });

      if (this.state.confirm_password === '') {
         this.setState({ confirm_password_error: 'Confirm Password is required' });
         formvalid = false;
      }
      else {
         if (this.state.confirm_password !== this.state.password) {
            this.setState({ confirm_password_error: "Don't match with Password" });
            formvalid = false;
         }
         else this.setState({ confirm_password_error: '' });
      }

      if (this.state.team === '') {
         this.setState({ team_error: 'Team is required' });
         formvalid = false;
      }
      else if (/^[a-zA-Z0-9- ]*$/.test(this.state.team) === false) 
      {
         this.setState({ team_error: 'Here ie not allowed characters' });
         formvalid = false;
      }
      else if (this.state.team_error === 'This team already exist') {
         formvalid = false;
      }
      else this.setState({ team_error: '' });

      return formvalid;
   }

   submit = () => {
      this.setState({ resonse_error: '' });

      if (this.handle_validation()) {
         var team = {
            teamname: this.state.team,
            role: 'admin'
         }
         var body = {
            "email": this.state.email,
            "password": this.state.password,
            "teams": team
         };
         var url = "http://localhost:8000/users/signup";
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         };
         var data = JSON.stringify(body)
         axios.post(url, data, { headers: headers })
            .then((response) => {
               this.setState({ response_status: 'Sign in successfully' });
               let teamname = this.state.team.replace(/\s/g, '-');
               localStorage.setItem('token', response.data.token);
               localStorage.setItem('user', JSON.stringify(response.data.user));
               localStorage.setItem('teamname', this.state.team);
               setTimeout(function () {
                  console.log(response);
               }, 1000);
               this.props.history.push(teamname.toLowerCase());
            })
            .catch((error) => {
               if (error.response) {
                  console.log(error.response.data); // => the response payload
                  if (error.response.data.code) this.setState({ resonse_error: 'This Email is already exist' });
                  else this.setState({ resonse_error: '' });
               }
            });
      }

   }

   render() {
      document.body.classList.remove('inner-page');
      const EmailValidation = this.state.email_error ? (<label className="text-danger">{this.state.email_error}</label>) : (<br />);
      const PasswordValidation = this.state.password_error ? (<label className="text-danger">{this.state.password_error}</label>) : (<br />);
      const ConfirmPasswordValidation = this.state.confirm_password_error ? (<label className="text-danger">{this.state.confirm_password_error}</label>) : (<br />);
      const TeamValidation = this.state.team_error ? (<label className="text-danger">{this.state.team_error}</label>) : (<br />);
      const ResponseValdiation = this.state.resonse_error ? (<label className="text-danger text-center">{this.state.resonse_error}</label>) : (<br />);
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
                  <h2>Sign Up</h2>
                  <img src="assets/images/title-line.png" alt="title-line" className="img-fluid line" />
                  <p>Please Sign up With Your Personal Account Information.</p>
                  {ResponseValdiation}
               </div>
               <div className="main">
                  <form className="auth-form">
                     <div className="form-group mb-0">
                        <label htmlFor="InputEmail">Email</label>
                        <i className="fa fa-envelope-o"></i>
                        <input name="email" type="email" className="form-control" id="InputEmail" onChange={this.handle_email} placeholder="Email" required />
                     </div>
                     {EmailValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="InputPassword">Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="InputPassword" name="password" type="password" className="form-control" onChange={this.handle_password} placeholder="Password" required />
                     </div>
                     {PasswordValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <i className="fa fa-lock"></i>
                        <input id="ConfirmPassword" name="confirm_password" type="password" className="form-control" onChange={this.handle_confirmPassword} placeholder="Confirm Password" required />
                     </div>
                     {ConfirmPasswordValidation}
                     <div className="form-group mb-0">
                        <label htmlFor="InputTeam">Team</label>
                        <i className="fa fa-users"></i>
                        <input name="team" type="text" className="form-control" id="InputTeam" placeholder="Team" onChange={this.handle_team} required />
                     </div>
                     {TeamValidation}
                     <div className="form-group">
                        <button className="btn submit" type="button" onClick={this.submit}>Sign Up</button>
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


export default SignUp;