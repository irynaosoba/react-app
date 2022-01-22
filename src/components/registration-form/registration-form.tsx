import React from "react";
import './refistration-form.css';
import nextId from "react-id-generator";
import {UserInfo} from "../user-info/user-info";

interface Properties {
    readonly onSave: (userInfo: UserInfo) => void | undefined,
    readonly editableInfo?: UserInfo,
}

interface State extends UserInfo {
}

const initialState: State = {
    id: nextId(),
    displayName: '',
    email: '',
    password: '',
    username: '',
}

export default class RegistrationForm extends React.Component<Properties, State> {
    constructor(props: Properties) {
        super(props);
        this.state = initialState;
    }

    onSave = (event: { target: HTMLInputElement } & any) => {
        event.preventDefault()
        if (!this.state.displayName && !this.state.username && !this.state.email && !this.state.password) {
            return;
        }
        this.props.onSave({
            id: this.state.id,
            displayName: this.state.displayName,
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
        })
        this.setState({...initialState, id: nextId()})
        console.log(this.state)
    }

    componentDidUpdate(prevProps: Readonly<Properties>, prevState: Readonly<State>, snapshot?: any) {
        if (!prevProps.editableInfo && this.props.editableInfo){
            this.setState({
                ...this.props.editableInfo
            })
        }
    }

    render() {
        return (
            <div>
                <form className="registration-form" onSubmit={this.onSave}>
                    <input value={this.state.displayName}
                           onChange={(event) => this.setState({displayName: event.target.value})}
                           placeholder="Display name"/>
                    <input value={this.state.username}
                           onChange={(event) => this.setState({username: event.target.value})}
                           placeholder="Username"/>
                    <input value={this.state.email}
                           onChange={(event) => this.setState({email: event.target.value})}
                           placeholder="E-mail"/>
                    <input value={this.state.password}
                           onChange={(event) => this.setState({password: event.target.value})}
                           placeholder="Password"/>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        )
    }
}