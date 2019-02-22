pipeline {
    agent {
        label 'dind'
    }
    environment {
        NODEJS_HOME = '/opt/tools/nodejs/node-v11.4.0-linux-x64'
        PATH = "/opt/tools/yarn/yarn-v1.12.3/bin:/opt/tools/nodejs/node-v11.4.0-linux-x64/bin:$PATH"
        DO_AUTODEPLOY_PROD = true
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Run tests') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Static code analysis') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-slaves-sonar-token', variable: 'SONAR_AUTH_TOKEN')]) {
                    withSonarQubeEnv('BitSaber Sonar') {
                        script {
                            scannerHome = tool 'SonarScanner'
                        }
                        sh "${scannerHome}/bin/sonar-scanner -D sonar.login=\"${SONAR_AUTH_TOKEN}\""
                    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    // Requires SonarQube Scanner for Jenkins 2.7+
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Linter') {
            steps {
                sh 'yarn lint'
            }
        }
        stage('Build Project') {
            steps {
                sh 'yarn build'
            }
        }
        stage('Deploy to staging') {
            when {
                expression { return env.BRANCH_NAME == 'develop' }
            }
            steps {
                withCredentials([file(credentialsId: '770b87fe-7835-4a6d-a769-2a7879c12b76', variable: 'HEROKUCREDS')]) {
                    sh 'cp "$HEROKUCREDS" ~/.netrc'
                    sh 'cd heroku_docker'
                    sh 'heroku container:login'
                    sh 'docker build .'
                    sh 'heroku container:push web --app incy-io-kiosk-staging'
                    sh 'heroku container:release web --app incy-io-kiosk-staging'
                }
            }
        }
        stage('Deploy to production') {
            when {
                expression { return env.BRANCH_NAME == 'master' && DO_AUTODEPLOY_PROD == true }
            }
            steps {
                withCredentials([file(credentialsId: '770b87fe-7835-4a6d-a769-2a7879c12b76', variable: 'HEROKUCREDS')]) {
                    sh 'cp "$HEROKUCREDS" ~/.netrc'
                    sh 'cd heroku_docker'
                    sh 'heroku container:login'
                    sh 'docker build .'
                    sh 'heroku container:push web --app incy-io-kiosk-production'
                    sh 'heroku container:release web --app incy-io-kiosk-production'
                }
            }
        }
    }
}
