pipeline {
    agent {
        docker {
            //image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            image 'papitodev/playwright-nj-v1.50.1.noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
              sh 'npx playwright test'
             allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
