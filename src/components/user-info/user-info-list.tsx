import React from "react";
import './user-info-list.css';

interface Properties {
    filledUserInfo: { id: string, displayName: string, username: string, email: string, password: string }[],
    onUserInfoDelete: (id: string) => void,
    onEditableInfo: ( id: string ) => void,
}

export default class UserInfoList extends React.Component<Properties, {}> {
    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <th>Display name:</th>
                    <th>Username:</th>
                    <th>Email:</th>
                    <th>Password:</th>
                    <th></th>
                </tr>
                {this.props.filledUserInfo.map(({id, displayName, username, email, password}, idx) => {
                        return (
                            <tr key={id} onClick={() => {this.props.onEditableInfo(id)}}>
                                <td>{displayName}</td>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{password}</td>
                                <td>
                                     <input type="submit" value="x" onClick={() => this.props.onUserInfoDelete(id)}/>
                                </td>
                            </tr>
                        )
                })}
                </tbody>
            </table>
        )
    }
}