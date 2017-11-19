import React, { Component } from 'react';
import { ProjectCardWrapper } from './projectCard.style';

export default class SingleProjectView extends Component {
  render() {
    const { project } = this.props;
    const title = project.title ? project.title : 'Untitled Project';
    const extraInfos = [];
    const details = [
      { value: 'title', title: 'Title' },
      { value: 'startdate', title: 'Start Date' },
      { value: 'enddate', title: 'End Date' },
      { value: 'rateofpay', title: 'Pay Rate' },
      { value: 'status', title: 'Status' },
      { value: 'notes', title: 'Notes' },
    ];
    details.forEach(attribute => {
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
            {title}
          </h1>
        </div>
        <div className="isoProjectInfoWrapper">
          {extraInfos}
        </div>
      </ProjectCardWrapper>
    );
  }
}
