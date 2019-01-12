import React from "react";
import Games from "./pages/Games";
import {WebAuth} from 'auth0-js';

function App() {
  var authO = new WebAuth({
    domain: "lukekarlovich.auth0.com",
    clientID: "nd71pCE3m1lDCLKHKwyHRgh4NFTW569R"
  });
  authO.authorize({
    connection: 'google-oauth2',
    responseType:'code, token',
//https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=104565000066-q7q63bouq2ct8gj73drmpu186amn6a3f.apps.googleusercontent.com&as=Kzw1jLYOWndQVIa5BGcCYg&destination=https%3A%2F%2Flogin.auth0.com&approval_state=!ChR5VTNZSGtPRkhxUE1ZbzJSVmVMaRIfRXdHMVRnU1B3cWdhWUlreWNoTjIyM1I4b0dNRGhCWQ%E2%88%99APNbktkAAAAAXDq3cugFKQiod2vXOlcUY6JT6gd87Phu&oauthgdpr=1&xsrfsig=ChkAeAh8T-jDZ20OUciku2IlQ71JaZKJB5UBEg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU&flowName=GeneralOAuthFlow

//https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=104565000066-q7q63bouq2ct8gj73drmpu186amn6a3f.apps.googleusercontent.com&as=VFfatL-WRQanrp9eEG_7ww&destination=https%3A%2F%2Flogin.auth0.com&approval_state=!ChR1MDFTY1JsVjJEZGFCbkNsOURGVhIfZzVuM3M3a0Jmc2diWUlreWNoTjIyM1NNWVNnRGhCWQ%E2%88%99APNbktkAAAAAXDq2f01vrMZsp2Lg_7pE5T24RIeum_Uh&oauthgdpr=1&xsrfsig=ChkAeAh8T8ilWlcxRCUQK-HqlvD63vTa_362Eg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU&flowName=GeneralOAuthFlow

//todo
//server running
//
  }, function(err, authResult) {
    //do something\console.
    if(err) {
      console.log(err);
      return

    }
    console.log(authResult);
  });
  return (
    <div>
      <Games />
    </div>
  );
}

export default App;
