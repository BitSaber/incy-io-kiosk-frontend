*** Settings ***
Documentation     A test suite with a single test clicking that we're not satisfied
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Not Satisfied
    Open Browser To Kiosk App
    There Should Exist Answers To Click
    State You Were Not Satisified
    App Asks You Why You Were Not Satisfied
    There Should Exist Answers To Click
    [Teardown]    Close Browser
