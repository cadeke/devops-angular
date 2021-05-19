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

        stage('Build') {
            steps {
                echo 'Build the project (npm build)'
            }
        }

        stage('Testing') {
            steps {
                echo 'Run unit tests'
            }
        }

        stage('Deploying') {
            steps {
                echo 'Deploy with ansible & docker'
            }
        }
    }
}