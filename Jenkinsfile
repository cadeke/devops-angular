pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps{
                // Clone repo and change dir
                git 'https://github.com/casperdekeyser/devops-angular.git'
                sh 'cd angular' 
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm build'
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