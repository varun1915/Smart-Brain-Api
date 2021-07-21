import React from 'react'

class Signin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: ''
        }
    }

    onEmailChange(event){
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange(event){
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:8000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then( response => response.json())
        .then(data => {
            if(data.id){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }else{
                this.props.onRouteChange('signin');
                this.setState({error: data});
            }
        })
 
    }

    render(){
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80 tc">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                <input 
                                onChange={(e) => this.onEmailChange(e)}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                required
                                />
                            </div> 
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input 
                                onChange={(e) => this.onPasswordChange(e)}    
                                className="b pa2 input-r eset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                required
                                />
                            </div>
                        </fieldset>

                        <div className="pb3" style={{'textTransform': "uppercase", 'color': "Red", 'fontWeight': "bold"}}>
                           {this.state.error} 
                        </div>
                        
                        <div className="">
                            <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a onClick={ () => this.props.onRouteChange('register')} className="f6 link dim black db" style={{'cursor': 'pointer'}}>Register</a>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;