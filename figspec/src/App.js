import React, { Component } from 'react';
import "@figspec/components";
import './App.css';
import * as apiResponse from './figma.json';
import * as pics from './img.json';
// import * as apiResponse from './demo.json';
// import { data as apiResponse } from './demo';
// import demoImage from "./64:1.svg";
import image2_5 from "./assets/2:5.svg";
import image2_9 from "./assets/2:9.svg";
import image2_13 from "./assets/2:13.svg";
import image64_1 from "./assets/64:1.svg";
import image93_14 from "./assets/93:14.svg";
import image93_32 from "./assets/93:32.svg";

class App extends Component {
  // state = {
  //   apiResponse: null,
  //   renderedImage: demoImage,
  // };
  componentDidMount() {
// console.log(FigspecFrameViewer);
    const PREFERENCES_KEY = "figspec_preferences_v1";

    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

    const demo = document.getElementById("demo");
console.log(demo);
    if (demo) {
      try {
        if (savedPreferences) {
          const value = JSON.parse(savedPreferences);

          demo.preferences = value;
        }
      } catch (error) {
        console.error("Failed to restore saved preferences");
      }
      // console.log(apiResponse);
      // this.setState({
      //   apiResponse: apiResponse,
      //   // renderedImage: "https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg",
      // });
      // demo.apiResponse = apiResponse;
      // demo.renderedImages = {
      //   "2:5": image2_5,
      //   "2:9": image2_9,
      //   "2:13": image2_13,
      //   "64:1": image64_1,
      //   "93:14": image93_14,
      //   "93:32": image93_32,
      // };
      demo.renderedImages = pics;
      // demo.renderedImage = "https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg";

      demo.addEventListener("preferencesupdate", (ev) => {
        const { preferences } = (ev).detail;

        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      });
    }
  }
  render() {
    // const { apiResponse, renderedImage } = this.state;
    return (
      // <div>
        <figspec-file-viewer 
        // link="https://www.figma.com/file/Klm6pxIZSaJFiOMX5FpTul9F/storybook-addon-designs-sample?type=design&node-id=64%3A1&mode=design&t=qv0I0EDmOnHF0knC-1" 
        // link="https://www.figma.com/design/6Twx0YAJ8fjMbKMPYFUzet/er?node-id=0-1&node-type=canvas&t=i2QSAU7O6UhJ3NEY-0"
        // link="https://www.figma.com/design/Ig0BYKoaXi5NA90poR04Gc/Untitled?node-id=0-1&t=yr2rESEbN40DS1B6-1"
        link="https://www.figma.com/proto/Ig0BYKoaXi5NA90poR04Gc/Untitled?page-id=0%3A1&node-id=1-4&node-type=canvas&viewport=1098%2C630%2C1&t=INqZWQB5WYltCpQ8-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A4"
        id="demo"></figspec-file-viewer>
      // </div>
    );
  }
}

export default App;
