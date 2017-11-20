import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ProgressWidget from './progress/progress-widget';
import StickerWidget from './sticker/sticker-widget';
import VCardWidget from './vCard/vCard-widget';
import SocialWidget from './social-widget/social-widget';
import SocialProfile from './social-widget/social-profile-icon';
import userpic from '../../image/user1.png';
import { dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { StackedAreaChart } from '../Charts/recharts/charts/';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';

const tableDataList = clone(dataList);
tableDataList.size = 5;

export default class IsoWidgets extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      padding: '15px',
      overflow: 'hidden'
    };

    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];

    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500
    };
    return (
      <div style={wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={8} sm={16} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number="4"
                text="Active Projects"
                icon="ion-clipboard"
                fontColor="#ffffff"
                bgColor="#7266BA"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={16} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number="123"
                text="Completed Tasks"
                icon="ion-android-list"
                fontColor="#ffffff"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={16} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number="15"
                text="Total Users"
                icon="ion-android-person-add"
                fontColor="#ffffff"
                bgColor="#7ED320"
              />
            </IsoWidgetsWrapper>
          </Col>

        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Card Widget */}
              <CardWidget
                icon="ion-android-chat"
                iconcolor="#42A5F5"
                number={<IntlMessages id="widget.cardwidget1.number" />}
                text={<IntlMessages id="widget.cardwidget1.text" />}
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Card Widget */}
              <CardWidget
                icon="ion-music-note"
                iconcolor="#F75D81"
                number={<IntlMessages id="widget.cardwidget2.number" />}
                text={<IntlMessages id="widget.cardwidget2.text" />}
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper>
              {/* Card Widget */}
              <CardWidget
                icon="ion-trophy"
                iconcolor="#FEAC01"
                number={<IntlMessages id="widget.cardwidget3.number" />}
                text={<IntlMessages id="widget.cardwidget3.text" />}
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Progress Widget */}
              <ProgressWidget
                label={<IntlMessages id="widget.progresswidget1.label" />}
                details={<IntlMessages id="widget.progresswidget1.details" />}
                icon="ion-archive"
                iconcolor="#4482FF"
                percent={50}
                barHeight={7}
                status="active"
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Progress Widget */}
              <ProgressWidget
                label={<IntlMessages id="widget.progresswidget2.label" />}
                details={<IntlMessages id="widget.progresswidget2.details" />}
                icon="ion-pie-graph"
                iconcolor="#F75D81"
                percent={80}
                barHeight={7}
                status="active"
              />
            </IsoWidgetsWrapper>

            <IsoWidgetsWrapper>
              {/* Progress Widget */}
              <ProgressWidget
                label={<IntlMessages id="widget.progresswidget3.label" />}
                details={<IntlMessages id="widget.progresswidget3.details" />}
                icon="ion-android-download"
                iconcolor="#494982"
                percent={65}
                barHeight={7}
                status="active"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={455}>
                <StackedAreaChart {...stackConfig} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart
                  {...googleChartConfigs.BarChart}
                  chartEvents={chartEvents}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart {...googleChartConfigs.Histogram} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={8} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Chart */}
              <IsoWidgetBox height={450}>
                <GoogleChart {...googleChartConfigs.TrendLines} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450}>
                {/* Google Bar Chart */}
                <GoogleChart {...googleChartConfigs.ComboChart} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* VCard Widget */}
              <VCardWidget
                style={{ height: '450px' }}
                src={userpic}
                alt="Jhon"
                name={<IntlMessages id="widget.vcardwidget.name" />}
                title={<IntlMessages id="widget.vcardwidget.title" />}
                description={
                  <IntlMessages id="widget.vcardwidget.description" />
                }
              >
                <SocialWidget>
                  <SocialProfile
                    url="#"
                    icon="ion-social-facebook"
                    iconcolor="#3b5998"
                  />
                  <SocialProfile
                    url="#"
                    icon="ion-social-twitter"
                    iconcolor="#00aced"
                  />
                  <SocialProfile
                    url="#"
                    icon="ion-social-googleplus"
                    iconcolor="#dd4b39"
                  />
                  <SocialProfile
                    url="#"
                    icon="ion-social-linkedin-outline"
                    iconcolor="#007bb6"
                  />
                  <SocialProfile
                    url="#"
                    icon="ion-social-dribbble-outline"
                    iconcolor="#ea4c89"
                  />
                </SocialWidget>
              </VCardWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}
