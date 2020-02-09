*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${Browser}  Chrome
${URL}  http://192.168.0.101:3000

*** Test Cases ***
Test Button Click
    Open Browser  ${URL}  ${Browser}
    Maximize Browser Window
    Click Button  name:exer-button-0