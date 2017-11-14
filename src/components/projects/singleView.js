import React, { Component } from 'react';
import { ProjectCardWrapper } from './projectCard.style';

export default class SingleProjectView extends Component {
  render() {
    const { project, otherAttributes } = this.props;
    const name = project.name ? project.name : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = project[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoProjectCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <ProjectCardWrapper className="isoProjectCard">
        <div className="isoProjectCardHead">
          <div className="isoPersonImage">
            {project.avatar ? <img alt="#" src={project.avatar} /> : ''}
          </div>
          <h1 className="isoPersonName">
            {name}
          </h1>
        </div>
        <div className="isoProjectInfoWrapper">
          {extraInfos}
        </div>
      </ProjectCardWrapper>
    );
  }
}
