pipeline {
    agent any;

    environment {
        SONAR_TOKEN = credentials('jenkins-sonarqube-token')
    }

    stages {

        stage('Cleanup the Workspace') {
            steps {
                cleanWs();
            }
        }

        stage('Checkout from SCM') {
          steps {
            git branch: 'dev', url: 'https://github.com/JeralSandeeptha/Ultimate-Dedvops-Project-Frontend.git'
          }
        }

        stage('Install Dependencies') {
          steps {
            bat 'npm install'
          }
        }
        
        stage('Run Unit Testing') {
          steps {
            bat 'npm run test'
          }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    script {
                        def scannerHome = tool name: 'sonarqube-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                        bat """
                            ${scannerHome}\\bin\\sonar-scanner.bat ^
                            -Dsonar.projectKey=Ultimate-Dedvops-Project-Frontend ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=${env.SONAR_TOKEN}
                            -Dsonar.branch.name=dev
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // Wait for the quality gate result
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Project') {
          steps {
            bat 'npm run build'
          }
        }
    }

    post {
        success {
            echo 'Pipeline Succeded!'
        }
        failure {
            echo 'Pipeline Failed!'
        }
    }
}