import React, { Component } from 'react';
import { UserCardWrapper } from './userCard.style';

export default class SingleUserView extends Component {
  render() {
    const { user, otherAttributes } = this.props;
    const name = user.name ? user.name : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = user[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoUserCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <UserCardWrapper className="isoUserCard">
        <div className="isoUserCardHead">
          <div className="isoPersonImage">
            {user.avatar ? <img alt="#" src={user.avatar} /> : ''}
          </div>
          <h1 className="isoPersonName">
            {name}
          </h1>
        </div>
        <div className="isoUserInfoWrapper">
          {extraInfos}
        </div>
      </UserCardWrapper>
    );
  }
}
