pipeline {
    agent any;

    stages {

        stage('Cleanup the Workspace') {
            steps {
                cleanWs();
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