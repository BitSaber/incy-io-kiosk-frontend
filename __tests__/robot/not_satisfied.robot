*** Settings ***
Documentation     A test suite with a single test clicking that we're not satisfied
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Application Launches
    Open Browser To Kiosk App
    Current Frame Should Contain 'Oletko tyytyväinen huoneen tarvikkeisiin?'

Not Satisfied
    Open Browser To Kiosk App
    State You Were Not Satisfied
    App Asks You Why You Were Not Satisfied
    [Teardown]    Close Browser
