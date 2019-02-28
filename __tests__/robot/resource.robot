*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary
#Library           WebpackLibrary

*** Variables ***
${SERVER}         localhost:3000
${BROWSER}        Chrome
${DELAY}          0
${INDEX URL}      http://${SERVER}/

${APP TITLE}    React App

${IPAD W}    768
${IPAD H}    1024

*** Keywords ***
Start Server
    Start Webpack    yarn start

Stop Server and Browser
    #Stop Webpack
    Close All Browsers

Open Browser To Kiosk App
    Set Selenium Speed    ${DELAY}
    Open Browser    ${INDEX URL}    ${BROWSER}
    Set Window Size    ${IPAD W}    ${IPAD H}
    Kiosk App Should Be Open

Kiosk App Should Be Open
    Title Should Be    ${APP TITLE}

Application root should be rendered
    Page Should Contain Element    xpath: //div[@id='app']/div

We display our initial question
    Page Should Contain Element    xpath: /html/body/div[@id='app']/div/div[@class='question-div ']/h2[@class='txt']
