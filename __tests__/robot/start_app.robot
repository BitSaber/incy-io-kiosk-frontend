*** Settings ***
Documentation     A test suite which verifies our application boots correctly
Resource          resource.robot
#Suite Setup       Start Server
Suite Teardown    Stop Server and Browser

*** Test Cases ***
Application Launches
    Wait Until Keyword Succeeds    20    1    Open Browser To Kiosk App

React Renders
    Wait Until Keyword Succeeds    20    1    Application root should be rendered

We display a question
    Wait Until Keyword Succeeds    20    1    We display our initial question

