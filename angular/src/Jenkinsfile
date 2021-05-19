pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps{
                git 'https://github.com/casperdekeyser/devops-angular.git'
            }
        }
        
        stage('Install dependencies') {
            steps {
                echo 'Install node, angular-cli, etc.'
                sh 'cd angular; ls'
            }
        }
        
        stage ('Cleanup') {
            steps {
                echo 'Done'
            }
        }
    }
}