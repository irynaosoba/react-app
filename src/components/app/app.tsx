import React from 'react';
import './app.css';
import '../../index.css';

import RegistrationForm from "../registration-form/registration-form";
import UserInfoList from "../user-info/user-info-list";
import {UserInfo} from "../user-info/user-info";

interface State {
    filledUserInfos: UserInfo[],
    editingIdx?: number,
}

const initialState: State = {
    filledUserInfos: []
}

export default class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = initialState;
    }

    saveUserInfo(userInfo: UserInfo){
        const idx = this.state.filledUserInfos.findIndex(el => el.id === userInfo.id)
        if (idx < 0) {
            const newRows = [
                ...this.state.filledUserInfos,
            ];
            newRows.push(userInfo)
            this.setState({filledUserInfos: newRows})
        } else {
            const newRows = [
                ...this.state.filledUserInfos.slice(0, idx),
                userInfo,
                ...this.state.filledUserInfos.slice(idx + 1),
            ];
            this.setState({filledUserInfos: newRows, editingIdx: undefined})
        }

    }

    deleteUserInfo(id: string){
        const idx = this.state.filledUserInfos.findIndex(el => el.id === id)
        const newRows = [
            ...this.state.filledUserInfos.slice(0, idx),
            ...this.state.filledUserInfos.slice(idx + 1),
        ];
        this.setState({filledUserInfos: newRows})
    }

    editUserInfo(id: string){
        const idx = this.state.filledUserInfos.findIndex(el => el.id === id);
        this.setState({editingIdx: idx})
    }

    render() {
        return (
            <div className="app">
                <RegistrationForm onSave={(userInfo) => {this.saveUserInfo(userInfo)}}
                                  editableInfo={this.state.editingIdx !== undefined ? this.state.filledUserInfos[this.state.editingIdx] : undefined}/>
                <UserInfoList filledUserInfo={this.state.filledUserInfos}
                              onUserInfoDelete={(id: string) => {this.deleteUserInfo(id)}}
                              onEditableInfo={(id: string) => {this.editUserInfo(id)}} />
            </div>
        );
    }
}