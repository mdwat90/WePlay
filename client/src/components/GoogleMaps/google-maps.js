import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component { 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCzjy1FwZLGMwvuBVbaGwbCX-Wig_84dlE' }}
          defaultCenter={{lat: this.props.lat, lng: this.props.lng}}
          defaultZoom= {13}
        >
          {/* <AnyReactComponent
            lat={39.7392358}
            lng={-104.990251}
            text={'Kreyser Avrora'}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;