pipeline {
    agent {
        label 'docker'
    }
    environment {
        NODEJS_HOME = '/opt/tools/nodejs/node-v11.4.0-linux-x64'
        PATH = "/opt/tools/yarn/yarn-v1.12.3/bin:/opt/tools/nodejs/node-v11.4.0-linux-x64/bin:$PATH"
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Linter') {
            steps {
                sh 'yarn lint'
            }
        }
        stage('Run tests') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Static code analysis') {
            withCredentials([string(credentialsId: 'jenkins-slaves-sonar-token', variable: 'SONAR_AUTH_TOKEN')]) {
                steps {
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
        stage('Build Project') {
            steps {
                sh 'yarn build'
            }
        }
    }
}
