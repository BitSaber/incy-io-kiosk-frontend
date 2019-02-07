*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${SERVER}         localhost:3000
${BROWSER}        Chrome
${DELAY}          0
${INDEX URL}      http://${SERVER}/

*** Keywords ***
Open Browser To Kiosk App
    Open Browser    ${INDEX URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Kiosk App Should Be Open

Kiosk App Should Be Open
    Title Should Be    React App

State You Were Not Satisfied
    Click Element    xpath: //button[contains(text(), 'Ei')]

App Asks You Why You Were Not Satisfied
    Element Text Should Be  //div[@class='question-div']/span   Miksi et ollut tyytyväinen?
