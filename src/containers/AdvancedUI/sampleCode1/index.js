import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Switch from '../../../components/uielements/switch';
import Select, { SelectOption } from '../../../components/uielements/select';
import Form from '../../../components/uielements/form';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
// import SampleCodes from '../../../components/uielements/sampleCode';
import basicStyle from '../../../config/basicStyle';
import { switchOptions, selectOptions, defaultValues } from './config';
import SampleCode, { SampleCodeToolbar } from './sampleCode.style';

const FormItem = Form.Item;
const Option = SelectOption;

export default class extends Component {
  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.selctOptions = this.selctOptions.bind(this);
    this.state = {
      ...defaultValues,
      basicOptions: {
        lineNumbers: true,
        readOnly: false,
        tabSize: 4,
        mode: 'javascript',
        theme: 'midnight',
      },
    };
  }
  updateCode(mode, value) {
    this.setState({
      [mode]: value,
    });
  }
  toggleOptions() {
    const { basicOptions } = this.state;
    return switchOptions.map((option, index) => {
      const id = option.id;
      const onChange = () => {
        basicOptions[id] = !basicOptions[id];
        this.setState(basicOptions);
      };
      return (
        <FormItem label={option.title} key={option.id}>
          <Switch
            checked={option.value === basicOptions[id]}
            onChange={onChange}
          />
        </FormItem>
      );
    });
  }
  selctOptions() {
    const { basicOptions } = this.state;
    return selectOptions.map((option, index) => {
      const id = option.id;
      const handleChange = value => {
        basicOptions[id] = isNaN(value) ? value : parseInt(value, 10);
        this.setState(basicOptions);
      };
      return (
        <FormItem label={option.title} key={option.id}>
          <Select defaultValue={`${basicOptions[id]}`} onChange={handleChange}>
            {option.options.map(opt => (
              <Option value={opt} key={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </FormItem>
      );
    });
  }
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>React Sample Code</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box title="Container Example">
              <ContentHolder>
                <SampleCodeToolbar className="isoOptionWrapper">
                  {this.toggleOptions()}
                  {this.selctOptions()}
                </SampleCodeToolbar>
                <SampleCode
                  value={this.state.container}
                  onChange={value => this.updateCode('basic', value)}
                  options={this.state.basicOptions}
                />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box title="Component Example">
              <ContentHolder>
                <SampleCodeToolbar className="isoOptionWrapper">
                  {this.toggleOptions()}
                  {this.selctOptions()}
                </SampleCodeToolbar>
                <SampleCode
                  value={this.state.component}
                  onChange={value => this.updateCode('basic', value)}
                  options={this.state.basicOptions}
                />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box title="Redux Action Example">
              <ContentHolder>
                <SampleCodeToolbar className="isoOptionWrapper">
                  {this.toggleOptions()}
                  {this.selctOptions()}
                </SampleCodeToolbar>
                <SampleCode
                  value={this.state.redux}
                  onChange={value => this.updateCode('basic', value)}
                  options={this.state.basicOptions}
                />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
