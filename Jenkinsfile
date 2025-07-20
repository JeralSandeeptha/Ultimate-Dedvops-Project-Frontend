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