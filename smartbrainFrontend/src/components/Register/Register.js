import React from 'react'

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    }

    onNameChange(event){
        this.setState({name: event.target.value});
    }

    onEmailChange(event){
        this.setState({email: event.target.value});
    }

    onPasswordChange(event){
        this.setState({password: event.target.value});
    }

    onSubmitRegister(){
        fetch('http://localhost:8000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password 
            })
        })
        .then(response => response.json())
        .then( data => { 
            console.log('varun');
            console.log(data);
            console.log('saini');
            if(data[0].id){
                this.props.loadUser(data);
                this.props.onRouteChange('signin');
            }
            else{
                this.props.onRouteChange('register');
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
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={(e) => this.onNameChange(e)}
                                required
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={(e) => this.onEmailChange(e)}
                                required
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input 
                                className="b pa2 input-r eset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={(e) => this.onPasswordChange(e)}
                                required
                                />
                            </div>
                        </fieldset>

                        <div className="pb3" style={{'textTransform': "uppercase", 'color': "Red", 'fontWeight': "bold"}}>
                           {this.state.error} 
                        </div>

                        <div className="">
                            <input 
                            onClick={() => this.onSubmitRegister()}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;