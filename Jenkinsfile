pipeline {
    agent any;

    environment {
        SONAR_TOKEN = credentials('jenkins-sonarqube-token')
        APP_NAME = "ultimate-devops-project-frontend"
        RELEASE = "1.0.0"
        DOCKER_USER = "jeralsandeeptha"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }

    stages {

        stage('Cleanup the Workspace') {
            steps {
                cleanWs();
            }
        }

        stage('Checkout from SCM') {
          steps {
            git branch: 'main', url: 'https://github.com/JeralSandeeptha/Ultimate-Dedvops-Project-Frontend.git'
          }
        }

        stage('Verify the Branch') {
          steps {
            bat 'git branch'
            bat 'git log -1 --oneline'
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
                            -Dsonar.projectKey=Ultimate-DevOps-Project-Frontend ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=${env.SONAR_TOKEN}
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

        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Login to Docker Hub
                        bat "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
        
                        // Build Docker image
                        def dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
        
                        // Push tagged image
                        dockerImage.push("${IMAGE_TAG}")
        
                        // Push latest tag
                        dockerImage.push("latest")
        
                        // Logout (optional)
                        bat "docker logout"
                    }
                }
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