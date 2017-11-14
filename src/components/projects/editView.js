import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { ProjectCardWrapper } from './projectCard.style';
import './upload.css';

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    notification('error', 'You can only upload JPG file!', '');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification('error', 'Image must smaller than 2MB!', '');
    return false;
  }
  notification('success', 'Image uploaded successfully!', '');
  return true;
}
export default class editProjectView extends Component {
  render() {
    const { project, otherAttributes } = this.props;
    const name = project.name ? project.name : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'firstName', title: 'First Name' },
      { value: 'lastName', title: 'Last Name' },
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = project[attribute.value];
      const editProject = event => {
        project[attribute.value] = event.target.value;
        let name = '';
        if (project.firstName) {
          name = `${project.firstName} `;
        }
        if (project.lastName) {
          name = `${name}${project.lastName}`;
        }
        project.name = name;
        this.props.editProject(project);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="isoProjectCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editProject(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="isoProjectCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editProject(event)}
            />
          </div>
        );
      }
    });
    return (
      <ProjectCardWrapper className="isoProjectCard">
        <div className="isoProjectCardHead">
          <div className="isoPersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {project.avatar
                ? <img src={project.avatar} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
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
