*** Settings ***
Documentation     A test suite with a single test clicking that we're not satisfied
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Not Satisfied
    Open Browser To Kiosk App
    State You Were Not Satisified
    App Asks You Why You Were Not Satisfied
    [Teardown]    Close Browser
