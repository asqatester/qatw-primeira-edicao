pipeline {
    agent any

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
              sh 'npx playwright tests'
            }
        }
    }
}
