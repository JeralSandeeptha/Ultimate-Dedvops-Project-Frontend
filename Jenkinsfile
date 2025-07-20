pipeline {
    agent any;

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