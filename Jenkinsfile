pipeline {
    agent {
        label 'dind'
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
        stage('Run tests') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Static code analysis') {
            steps {
                withSonarQubeEnv('BitSaber Sonar') {
                    script {
                        scannerHome = tool 'SonarScanner'
                    }
                    sh "${scannerHome}/bin/sonar-scanner"
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
        /* stage('Deploy to local test') { */
        /*     steps { */
        /*         script { */
        /*             lowercaseBranch = env.BRANCH_NAME.toLowerCase() */
        /*         } */
        /*         withCredentials([file(credentialsId: '2d6f0282-6e9d-4885-b209-3a8baf6cb797', variable: 'IDRSA')]) { */
        /*             sh 'cp "$IDRSA" ~/.ssh/id_rsa' */
        /*             sh 'chown $(whoami): ~/.ssh/id_rsa' */
        /*             sh 'chmod 600 ~/.ssh/id_rsa' */
        /*             sh 'ssh-keyscan bitsaber.net > ~/.ssh/known_hosts' */
        /*             sh "lftp -e \"rm -r -f ${lowercaseBranch}; mkdir ${lowercaseBranch}; mirror -R dist/ ${lowercaseBranch}/; quit;\" -u jenkins-dev-deploy, sftp://bitsaber.net/branches" */
        /*         } */
        /*     } */
        /* } */
        stage('Robot Tests') {
            environment {
                PATH = "$PATH:/opt/chromedriver/"
            }
            steps {
                sh 'cp -r dist heroku_docker/app'
                sh 'docker build --tag incy-io-kiosk-frontend .'
                sh 'docker run -d --name incy-io-kiosk-frontend -p 3000:3000 incy-io-kiosk-frontend'
                sh 'robot -d robot_reports __tests__/robot'
                sh 'docker stop incy-io-kiosk-frontend'
                step([
                    $class : 'RobotPublisher',
                    outputPath: "./robot_reports/",
                    outputFileName : "output.xml",
                    disableArchiveOutput : false,
                    reportFileName: "report.html",
                    logFileName: "log.html",
                    passThreshold : 100,
                    unstableThreshold: 95.0,
                    otherFiles : "*.png"
                ])
            }
        }
        /* stage('Deploy to staging') { */
        /*     when { */
        /*         expression { return env.BRANCH_NAME == 'develop' } */
        /*     } */
        /*     steps { */
        /*         withCredentials([file(credentialsId: '770b87fe-7835-4a6d-a769-2a7879c12b76', variable: 'HEROKUCREDS')]) { */
        /*             sh 'cp "$HEROKUCREDS" ~/.netrc' */
        /*             sh 'cd heroku_docker' */
        /*             sh 'heroku container:login' */
        /*             sh 'docker build .' */
        /*             sh 'heroku container:push web --app incy-io-kiosk-staging' */
        /*             sh 'heroku container:release web --app incy-io-kiosk-staging' */
        /*         } */
        /*     } */
        /* } */
        /* stage('Deploy to production') { */
        /*     when { */
        /*         expression { return env.BRANCH_NAME == 'master' } */
        /*     } */
        /*     steps { */
        /*         withCredentials([file(credentialsId: '770b87fe-7835-4a6d-a769-2a7879c12b76', variable: 'HEROKUCREDS')]) { */
        /*             sh 'cp "$HEROKUCREDS" ~/.netrc' */
        /*             sh 'cd heroku_docker' */
        /*             sh 'heroku container:login' */
        /*             sh 'docker build .' */
        /*             sh 'heroku container:push web --app incy-io-kiosk-production' */
        /*             sh 'heroku container:release web --app incy-io-kiosk-production' */
        /*         } */
        /*     } */
        /* } */
    }
}
